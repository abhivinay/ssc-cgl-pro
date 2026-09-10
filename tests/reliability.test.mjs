import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { createProgressStore } from "../server/progressStore.js";

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: "http://localhost:5173/", pretendToBeVisual: true });
for (const key of ["window", "document", "navigator", "localStorage", "sessionStorage", "CustomEvent", "Event", "HTMLElement", "SVGElement", "Element", "Node", "MutationObserver", "getComputedStyle"]) Object.defineProperty(globalThis, key, { value: dom.window[key], configurable: true, writable: true });
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
dom.window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const load = path => vite.ssrLoadModule(path);
const storage = await load("/src/services/safeStorage.js");
const exam = await load("/src/core/test/examSession.js");
const { StudyProvider, useStudy } = await load("/src/context/StudyContext.jsx");
const { default: useXP } = await load("/src/hooks/useXP.js");
let root;
const container = document.getElementById("root");
const mount = async element => {
  if (root) await React.act(async () => root.unmount());
  root = createRoot(container);
  await React.act(async () => root.render(element));
};
const reset = async () => { if (root) { await React.act(async () => root.unmount()); root = null; } localStorage.clear(); sessionStorage.clear(); };
let captured;
function Probe() { captured = { study: useStudy(), xp: useXP() }; return React.createElement("p", null, captured.xp.totalXP); }
const mountStudy = () => mount(React.createElement(StudyProvider, null, React.createElement(Probe)));
after(async () => { await reset(); await vite.close(); dom.window.close(); });

test("XP updates immediately, with no duplicate stage rewards", async () => {
  await reset(); await mountStudy();
  await React.act(async () => captured.study.completeStage("quant-1", "learn"));
  const earned = captured.study.studyState.xp;
  assert.ok(earned > 0); assert.equal(captured.xp.totalXP, earned);
  await React.act(async () => captured.study.completeStage("quant-1", "learn"));
  assert.equal(captured.xp.totalXP, earned);
});

test("stage guard blocks skips and failed or missing assessment evidence", async () => {
  await reset(); await mountStudy();
  await React.act(async () => captured.study.completeStage("quant-1", "level3", { passed: true, accuracy: 100 }));
  assert.equal(captured.study.studyState.xp, 0);
  await React.act(async () => captured.study.completeStage("quant-1", "learn"));
  await React.act(async () => captured.study.completeStage("quant-1", "concept-check", { passed: false, accuracy: 20 }));
  assert.equal(captured.study.studyState.topics[0].stages.conceptCheck, false);
  await React.act(async () => captured.study.completeStage("quant-1", "concept-check"));
  assert.equal(captured.study.studyState.topics[0].stages.conceptCheck, false);
});

test("final topic stage unlocks next topic and schedules visible revision", async () => {
  await reset(); await mountStudy();
  await React.act(async () => captured.study.setStudyState(previous => ({ ...previous, topics: previous.topics.map(topic => topic.id === "quant-1" ? { ...topic, stages: Object.fromEntries(captured.study.stages.map(stage => [stage, stage !== "revision"])) } : topic) })));
  await React.act(async () => captured.study.completeStage("quant-1", "revision", { completed: true, overallProgress: 100 }));
  assert.equal(captured.study.studyState.topics.find(topic => topic.id === "quant-1").completed, true);
  assert.equal(captured.study.studyState.topics.find(topic => topic.id === "quant-2").unlocked, true);
  const { readRevisions } = await load("/src/services/revisionStorage.js");
  assert.equal(readRevisions().filter(task => task.topicId === "quant-1").length, 1);
  assert.ok(Number.isFinite(readRevisions()[0].scheduledAt));
});

test("legacy XP migration is conservative and reload-stable", async () => {
  await reset(); localStorage.setItem("studyState", JSON.stringify({ xp: 40 })); localStorage.setItem("ssc-sentinel-xp", JSON.stringify({ totalXP: 70, history: [] }));
  await mountStudy(); assert.equal(captured.study.studyState.xp, 70);
  await React.act(async () => captured.study.addStudyMinutes(1)); await mountStudy(); assert.equal(captured.study.studyState.xp, 70);
});

test("five-game completion updates study gate and awards once per date", async () => {
  await reset(); await mountStudy();
  const engine = await load("/src/core/brain/sessionEngine.js");
  const { getDailyBrainPlan } = await load("/src/core/brain/dailyGenerator.js");
  const brain = await load("/src/services/brainStorage.js");
  const plan = getDailyBrainPlan();
  let session = engine.createBrainSession({ games: plan.games, dateKey: plan.dateKey });
  for (const gameType of plan.games) { session = engine.startGame(session, { gameType }); session = engine.completeCurrentGame(session, { correctAnswers: 4, wrongAnswers: 1 }); }
  await React.act(async () => brain.completeDailyBrainSession(session));
  const xp = captured.xp.totalXP;
  assert.ok(xp > 0); assert.equal(captured.study.studyState.brainTrainerCompleted, true);
  await React.act(async () => brain.completeDailyBrainSession({ ...session, id: "a-second-session" }));
  assert.equal(captured.xp.totalXP, xp); assert.equal(brain.readBrainState().totalSessions, 1);
});

test("incomplete brain sessions cannot unlock the gate", async () => {
  await reset(); const brain = await load("/src/services/brainStorage.js");
  brain.completeDailyBrainSession({ id: "invalid", status: "completed", completedAt: Date.now(), results: [], games: [], xpEarned: 500 });
  assert.equal(brain.readBrainState().totalXP, 0);
});

test("answer normalization handles numeric indexes, letters and exact option text", () => {
  const base = { id: "q", question: "2 + 2?", options: ["1", "2", "3", "4"] };
  assert.equal(exam.normalizeQuestion({ ...base, answer: 3 }).answer, 3);
  assert.equal(exam.normalizeQuestion({ ...base, correctAnswer: "D" }).answer, 3);
  assert.equal(exam.normalizeQuestion({ ...base, answer: "4" }).answer, 3);
  assert.equal(exam.validQuestion(exam.normalizeQuestion({ ...base, answer: null })), false);
});

test("negative marks, zero penalty and unanswered questions are scored correctly", () => {
  const qs = ["a", "b", "c"].map(id => ({ id, answer: 1 }));
  const result = exam.scoreExam(qs, { a: 1, b: 0 });
  assert.equal(result.score, 1.5); assert.equal(result.unanswered, 1); assert.equal(result.passed, false);
  assert.equal(exam.scoreExam(qs, { a: 1, b: 0 }, { negativeMarksPerWrong: 0 }).score, 2);
  assert.equal(exam.scoreExam([], {}).passed, false);
});

test("exam deadline survives remount and expired attempts auto-submit", async () => {
  await reset();
  const { default: ExamSession } = await load("/src/components/test/ExamSession.jsx");
  const props = { sessionKey: "timer-test", config: { durationMinutes: 1 }, questions: [{ id: "q", question: "2 + 2?", options: ["4", "3", "2", "1"], answer: 0 }] };
  await mount(React.createElement(ExamSession, props));
  await React.act(async () => [...container.querySelectorAll("button")].find(button => button.textContent.includes("Start Topic Test")).click());
  const before = storage.readJSON("ssc-exam:timer-test");
  await React.act(async () => new Promise(resolve => setTimeout(resolve, 1100)));
  assert.notEqual(container.querySelector('[role="timer"]').textContent, "1:00");
  await mount(React.createElement(ExamSession, props));
  assert.equal(storage.readJSON("ssc-exam:timer-test").deadline, before.deadline);
  await React.act(async () => storage.writeJSON("ssc-exam:timer-test", { ...before, deadline: Date.now() - 1 }));
  assert.equal(storage.readJSON("ssc-exam:timer-test").finished, true);
  assert.equal(storage.readJSON("ssc-exam:timer-test").result.unanswered, 1);
});

test("source provenance and confidence survive repeated normalization", async () => {
  const { normalizeReviewQuestion, canApproveQuestion } = await load("/src/services/reviewStorage.js");
  const normalized = normalizeReviewQuestion({ confidence: 0.99, source: { paper: "paper.pdf", page: 2 } });
  assert.equal(normalized.confidence, 99); assert.equal(normalized.source, "paper.pdf · page 2");
  assert.equal(normalizeReviewQuestion(normalized).confidence, 99);
  assert.deepEqual(normalized.sourceDetails, { paper: "paper.pdf", page: 2 }); assert.equal(canApproveQuestion(normalized), false);
});

test("retry rejects non-retryable errors and honors bounded delay policy", async () => {
  const { retry } = await load("/src/utils/retry.js"); let attempts = 0, delayCalls = 0;
  await assert.rejects(retry(async () => { attempts++; throw Object.assign(new Error("bad input"), { retryable: false }); }, { initialDelay: 0 }));
  assert.equal(attempts, 1);
  attempts = 0;
  assert.equal(await retry(async () => { if (++attempts < 2) throw new Error("transient"); return "ok"; }, { getDelay: () => { delayCalls++; return 0; } }), "ok");
  assert.equal(delayCalls, 1);
});

test("backup rejects foreign keys and malformed study data", async () => {
  const { validateEntries, parseBackup } = await load("/src/services/backupFormat.js");
  assert.throws(() => validateEntries({ GEMINI_API_KEY: "secret" }));
  assert.throws(() => validateEntries({ studyState: 'not-json' }));
  assert.throws(() => parseBackup('{"format":"other","version":1,"entries":{}}'));
  assert.deepEqual(Object.keys(validateEntries({ studyState: '{"xp":10,"topics":[]}' })), ["studyState"]);
  assert.deepEqual(Object.keys(validateEntries({ studyState: '{"xp":10,"topics":{"quant":{"progress":25}}}' })), ["studyState"]);
});

test("disk store persists across instances, rotates recovery and rejects stale writes", () => {
  const directory = mkdtempSync(join(tmpdir(), "ssc-progress-test-"));
  const first = createProgressStore(directory); assert.equal(first.read().revision, 0);
  first.write({ studyState: '{"xp":10}' }, 0);
  const reloaded = createProgressStore(directory); assert.equal(reloaded.read().entries.studyState, '{"xp":10}');
  assert.throws(() => reloaded.write({ studyState: '{"xp":99}' }, 0), error => error.status === 409);
  reloaded.write({ studyState: '{"xp":20}' }, 1);
  assert.equal(JSON.parse(readFileSync(join(directory, "progress.previous.json"))).entries.studyState, '{"xp":10}');
  writeFileSync(join(directory, "progress.json"), "damaged");
  assert.throws(() => reloaded.write({ studyState: '{"xp":0}' }, 2));
  assert.equal(readFileSync(join(directory, "progress.json"), "utf8"), "damaged");
});

test("all connected Quant modules have valid practice and test question contracts", async () => {
  const { loadTopicContent } = await load("/src/services/contentRegistry.js");
  for (const name of ["Number System", "Percentage", "Ratio & Proportion", "Average", "Profit & Loss", "Simple Interest", "Compound Interest"]) {
    const content = await loadTopicContent({ id: name, name, subject: "quant" });
    assert.ok(content.learn, name);
    for (const [stage, questions] of Object.entries({ conceptCheck: content.conceptCheck, ...content.practice, topicTest: content.topicTest.questions })) {
      assert.ok(questions.length > 0, `${name}: ${stage}`);
      assert.deepEqual(questions.filter(q => !exam.validQuestion(q)).map(q => q.id), [], `${name}: ${stage} invalid answer keys`);
    }
    assert.equal(content.pyqs.length, 0, "Do not invent verified PYQs");
  }
});

test("revision cycles use new IDs so later completions can earn distinct rewards", async () => {
  const { scheduleNextRevision } = await load("/src/core/revision/revisionEngine.js");
  const task = { id: "first", revisionCount: 0, completed: true };
  const next = scheduleNextRevision(task); assert.notEqual(next.id, task.id); assert.equal(next.completed, false); assert.ok(next.scheduledAt > Date.now());
});

test("practice answer and position restore after remount", async () => {
  await reset();
  const { default: QuestionStage } = await load("/src/components/topic/QuestionStage.jsx");
  const props = { title: "Saved practice", questions: [{ id: "practice-q", question: "Two plus two?", options: ["4", "3", "2", "1"], answer: 0 }] };
  await mount(React.createElement(QuestionStage, props));
  await React.act(async () => [...container.querySelectorAll("button")].find(button => button.textContent.trim().endsWith("4")).click());
  await React.act(async () => [...container.querySelectorAll("button")].find(button => button.textContent.includes("Submit Answer")).click());
  await mount(React.createElement(QuestionStage, props));
  const saved = storage.readJSON(`ssc-practice:${exam.questionSignature(props.questions)}`);
  assert.equal(saved.answers.length, 1); assert.equal(saved.answers[0].correct, true); assert.equal(saved.showExplanation, true);
});

test("Sentinel entry and daily warm-up gate precede the dashboard", async () => {
  await reset();
  const { MemoryRouter } = await import("react-router-dom");
  const { default: AppShell } = await load("/src/components/layout/AppShell.jsx");
  const child = React.createElement("p", null, "Study workspace");
  await mount(React.createElement(StudyProvider, null, React.createElement(MemoryRouter, { initialEntries: ["/dashboard"] }, React.createElement(AppShell, null, child))));
  assert.match(container.textContent, /Your preparation is ready/);
  await React.act(async () => [...container.querySelectorAll("button")].find(button => button.textContent.includes("Continue")).click());
  assert.equal(sessionStorage.getItem("ssc-sentinel-entered"), "1");
  assert.ok(container.querySelector(".standalone-brain"));
  assert.equal(container.querySelector(".app-navigation"), null);
});

test("corrupt study bytes are retained before recovery is committed", async () => {
  await reset(); localStorage.setItem("studyState", "broken-json"); localStorage.setItem("studyState:recovery", '{"xp":50}');
  assert.equal(storage.readJSON("studyState").xp, 50);
  storage.writeJSON("studyState", { xp: 50 });
  assert.equal(localStorage.getItem("studyState:corrupt"), "broken-json");
});

test("PYQ answers and position survive remount while HOLD rows stay excluded", async () => {
  await reset();
  const originalFetch=globalThis.fetch;
  const row={subject:'Quant',topic:'Numbers',source:{year:2024,date:'2024-09-01',shift:'1',questionNumber:1},options:['Two','Three','Four','Five'],answer:'A',images:[],optionImages:{}};
  globalThis.fetch=async()=>({ok:true,json:async()=>[{...row,id:'hold',question:'Held question',hold:true},{...row,id:'one',question:'First question'},{...row,id:'two',question:'Second question'}]});
  try {
    const {default:PyqPractice}=await load('/src/pages/PyqPractice.jsx');
    await mount(React.createElement(PyqPractice));
    assert.doesNotMatch(container.textContent,/Held question/);
    await React.act(async()=>container.querySelector('input[type=radio]').click());
    await React.act(async()=>[...container.querySelectorAll('button')].find(b=>b.textContent==='Check answer').click());
    assert.match(container.textContent,/Correct\. Answer: A/);
    await React.act(async()=>[...container.querySelectorAll('button')].find(b=>b.textContent==='Next question').click());
    await mount(React.createElement(PyqPractice));
    assert.match(container.textContent,/Second question/);
    await React.act(async()=>[...container.querySelectorAll('button')].find(b=>b.textContent==='Previous').click());
    assert.match(container.textContent,/Correct\. Answer: A/);
    assert.equal(container.querySelector('input[type=radio]').matches(':disabled'),true);
    assert.match(container.textContent,/1 answered · 1 correct/);
  } finally { await reset(); globalThis.fetch=originalFetch; }
});

test("main app routes render without error-boundary fallbacks", async () => {
  await reset();
  const originalFetch=globalThis.fetch;
  globalThis.fetch=async()=>{throw new Error("Offline fixture");};
  const {default:App}=await load("/src/App.jsx");
  const {getDateKey}=await load("/src/core/brain/dailyGenerator.js");
  localStorage.setItem("studyState",JSON.stringify({brainCompletedDate:getDateKey()}));
  sessionStorage.setItem("ssc-sentinel-entered","1");
  try{
    for(const route of ["/dashboard","/syllabus","/topic/quant-1/learn","/test/classification-practice-1","/test/classification-practice-1/result","/notes","/planner","/mock-tests","/revision","/mistakes","/brain-trainer","/content-studio/review","/content-studio/extractor","/analytics","/progress","/missions","/achievements","/timer","/settings"]){
      window.history.replaceState({},"",route);
      await mount(React.createElement(App));
      await React.act(async()=>new Promise(resolve=>setTimeout(resolve,80)));
      for(let wait=0;wait<60&&container.textContent.includes("Loading your workspace");wait++)await React.act(async()=>new Promise(resolve=>setTimeout(resolve,80)));
      assert.doesNotMatch(container.textContent,/Loading your workspace/,route);
      assert.doesNotMatch(container.textContent,/This screen could not load/,route);
      assert.ok(container.textContent.trim().length>20,route);
    }
  }finally{await reset();globalThis.fetch=originalFetch;}
});

test("brain timer ticks once in StrictMode and resets when its duration changes", async () => {
  await reset();
  const { default: BrainTimer } = await load("/src/components/brain/BrainTimer.jsx");
  const ticks = [];
  const element = duration => React.createElement(React.StrictMode, null,
    React.createElement(BrainTimer, { duration, onTick: value => ticks.push(value) }));
  await mount(element(5));
  await React.act(async () => new Promise(resolve => setTimeout(resolve, 1100)));
  assert.deepEqual(ticks, [4]);
  assert.match(container.textContent, /0:04/);
  await React.act(async () => root.render(element(9)));
  assert.match(container.textContent, /0:09/);
});

test("PYQ visual failures block saving and clear when moving to another question", async () => {
  await reset();
  const originalFetch = globalThis.fetch;
  const row = { subject: 'Quant', topic: 'Numbers', source: { year: 2024 }, options: ['1', '2', '3', '4'], answer: 'A', optionImages: {} };
  globalThis.fetch = async () => ({ ok: true, json: async () => [
    { ...row, id: 'figure', question: 'Synthetic figure question', images: ['fixture.png'] },
    { ...row, id: 'text', question: 'Synthetic text question', images: [] },
  ] });
  try {
    const { default: PyqPractice } = await load('/src/pages/PyqPractice.jsx');
    await mount(React.createElement(PyqPractice));
    await React.act(async () => container.querySelector('img').dispatchEvent(new Event('error')));
    assert.equal(container.querySelector('fieldset').disabled, true);
    assert.equal(localStorage.getItem('ssc-pyq-attempts'), null);
    await React.act(async () => [...container.querySelectorAll('button')].find(b => b.textContent === 'Next question').click());
    assert.equal(container.querySelector('fieldset').disabled, false);
    assert.doesNotMatch(container.textContent, /Required visual content is unavailable/);
    assert.equal(container.querySelector('input').checked, false);
  } finally { await reset(); globalThis.fetch = originalFetch; }
});
