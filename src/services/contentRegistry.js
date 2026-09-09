import { normalizeQuestion, validQuestion } from "../core/test/examSession";
const modules = {
  "number system": () => import("../data/content/quant/number-system"),
  percentage: () => import("../data/content/quant/percentage"),
  "ratio & proportion": () => import("../data/content/quant/ratio-and-proportion"),
  average: () => import("../data/content/quant/average"),
  "profit & loss": () => import("../data/content/quant/profit-and-loss"),
  "simple interest": () => import("../data/content/quant/simple-compound-interest"),
  "compound interest": () => import("../data/content/quant/simple-compound-interest"),
  "ancient history": () => import("../data/content/gk/ancient-history"),
};
export const hasAuthoredContent = topic => Boolean(modules[String(topic?.name).toLowerCase()]);
const questions = value => (Array.isArray(value) ? value : value?.questions || []).map(normalizeQuestion);
const threshold = (value, fallback) => value?.passingPercentage ?? value?.passing?.minimumAccuracy ?? (value?.passingScore && value?.questions?.length ? 100 * value.passingScore / value.questions.length : fallback);

export function normalizeContent(raw, topic) {
  const source = raw.modules || raw;
  const test = source.topicTest || {};
  const testConfig = test.config || test;
  const pyqs = questions(raw.pyqs || source.pyqs).filter(q => q.verified === true && validQuestion(q));
  return {
    ...source, id: topic.id, name: topic.name, subject: topic.subject,
    structuredLearn: !source.learn?.introduction && !source.lessons,
    conceptCheck: questions(source.conceptCheck),
    practice: { level1: questions(source.practice?.level1 || source.level1), level2: questions(source.practice?.level2 || source.level2), level3: questions(source.practice?.level3 || source.level3) },
    passing: { conceptCheck: threshold(source.conceptCheck, 70), level1: threshold(source.level1, 70), level2: threshold(source.level2, 75), level3: threshold(source.level3, 80) },
    topicTest: { config: { ...testConfig, durationMinutes: testConfig.durationMinutes || testConfig.timeLimitMinutes || 25, passingPercentage: threshold(testConfig, 70) }, questions: questions(test.questions) },
    pyqs,
  };
}
export async function loadTopicContent(topic) {
  const loader = modules[String(topic?.name).toLowerCase()];
  return loader ? normalizeContent((await loader()).default, topic) : null;
}
