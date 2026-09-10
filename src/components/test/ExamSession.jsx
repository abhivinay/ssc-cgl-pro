import { useEffect, useMemo, useState } from "react";
import usePersistentState from "../../hooks/usePersistentState";
import {
  createExam,
  normalizeQuestion,
  validQuestion,
  remainingSeconds,
  scoreExam,
  questionSignature,
} from "../../core/test/examSession";
import { addMistake } from "../../services/mistakeStorage";
import { addRevisionTask, readRevisions } from "../../services/revisionStorage";
import Button from "../ui/Button";

const restore = (value) =>
  value &&
  typeof value.id === "string" &&
  Number.isFinite(value.deadline) &&
  Array.isArray(value.questionIds) &&
  Array.isArray(value.marked) &&
  value.answers &&
  typeof value.answers === "object" &&
  (!value.finished || value.result)
    ? value
    : null;
const format = (value) =>
  `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;

export default function ExamSession({
  sessionKey,
  config = {},
  questions = [],
  onComplete,
  topicId,
  subject,
  continueLabel = "Continue",
}) {
  const normalized = useMemo(
    () => questions.map(normalizeQuestion),
    [questions],
  );
  const valid = normalized.length > 0 && normalized.every(validQuestion);
  const duration = Math.max(1, Number(config.durationMinutes) || 25);
  const [session, setSession] = usePersistentState(
    `ssc-exam:${sessionKey}`,
    restore,
  );
  const [now, setNow] = useState(Date.now);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const matching = session?.signature === questionSignature(normalized);
  const active = matching ? session : null;
  const timeLeft = active
    ? remainingSeconds(active.deadline, now)
    : duration * 60;

  useEffect(() => {
    if (!active || active.finished) return;
    const tick = () => {
      const timestamp = Date.now();
      setNow(timestamp);
      if (remainingSeconds(active.deadline, timestamp) === 0) {
        setSession((previous) =>
          previous && !previous.finished
            ? {
                ...previous,
                finished: true,
                finishedAt: timestamp,
                timedOut: true,
                result: scoreExam(normalized, previous.answers, config),
              }
            : previous,
        );
      }
    };
    tick();
    const timer = setInterval(tick, 250);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [active, normalized, config, setSession]);

  useEffect(() => {
    if (!active?.finished || !topicId) return;
    const wrong = normalized.filter(
      (q) =>
        Number.isInteger(active.answers[q.id]) &&
        active.answers[q.id] !== q.answer,
    );
    wrong.forEach((q) =>
      addMistake({
        id: `${active.id}:${q.id}`,
        topicId,
        subject,
        questionId: q.id,
        question: q.question,
        selectedAnswer: q.options[active.answers[q.id]],
        correctAnswer: q.options[q.answer],
        explanation: q.explanation || "",
        difficulty: q.difficulty || "medium",
        createdAt: active.finishedAt,
      }),
    );
    if (
      wrong.length &&
      !readRevisions().some(
        (task) => task.topicId === topicId && !task.completed,
      )
    ) {
      addRevisionTask({
        id: `exam-revision:${active.id}`,
        topicId,
        subject,
        title: config.title || topicId,
        source: "test",
        priority: "high",
        scheduledAt: Date.now(),
        completed: false,
        revisionCount: 0,
        createdAt: Date.now(),
      });
    }
  }, [
    active?.id,
    active?.finished,
    active?.answers,
    active?.finishedAt,
    normalized,
    topicId,
    subject,
    config.title,
  ]);

  const change = (update) =>
    setSession((previous) => {
      if (!previous || previous.finished) return previous;
      if (!remainingSeconds(previous.deadline))
        return {
          ...previous,
          finished: true,
          finishedAt: Date.now(),
          timedOut: true,
          result: scoreExam(normalized, previous.answers, config),
        };
      return { ...previous, ...update(previous) };
    });
  const submit = () =>
    change((previous) => ({
      finished: true,
      finishedAt: Date.now(),
      result: scoreExam(normalized, previous.answers, config),
    }));

  if (!valid)
    return (
      <section className="card p-5">
        <h2>Test unavailable</h2>
        <p>
          Complete questions and valid answer keys are required. Unreviewed
          content cannot unlock progress.
        </p>
      </section>
    );
  if (!active)
    return (
      <section className="card p-6 md:p-9 space-y-5">
        <p className="eyebrow">Timed assessment</p>
        <h2 className="text-3xl font-bold">{config.title || "Topic test"}</h2>
        <p className="text-zinc-400">
          {normalized.length} questions · {duration} minutes ·{" "}
          {config.passingPercentage ?? 70}% to pass
        </p>
        <p className="text-sm text-zinc-400">
          +{config.marksPerCorrect ?? 2} correct / −
          {config.negativeMarksPerWrong ?? 0.5} incorrect. Unanswered questions
          score zero. Answers save on this device; the timer keeps running when
          you leave.
        </p>
        {session && !matching && (
          <p role="status">
            The question set changed. Your previous attempt is retained until
            you start a new one.
          </p>
        )}
        <Button
          onClick={() => {
            setNow(Date.now());
            setSession(createExam(normalized, duration));
          }}
        >
          Start Topic Test
        </Button>
      </section>
    );

  if (active.finished) {
    const result = active.result;
    return (
      <section className="space-y-6">
        <div className="card p-6 md:p-9 space-y-5">
          <p className="eyebrow">
            {active.timedOut
              ? "Time ended · auto-submitted"
              : "Assessment complete"}
          </p>
          <h2 className="text-3xl font-bold">
            {result.passed ? "Test passed" : "Review and retry"}
          </h2>
          <p className="text-3xl font-semibold text-cyan-200">
            {result.score}{" "}
            <span className="text-lg text-zinc-400">/ {result.totalMarks}</span>
          </p>
          <p>
            {result.correctAnswers} correct · {result.wrongAnswers} wrong ·{" "}
            {result.unanswered} unanswered · {result.percentage.toFixed(1)}%
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setConfirmSubmit(false);
                setNow(Date.now());
                setSession(createExam(normalized, duration));
              }}
            >
              Retry Test
            </Button>
            {result.passed && onComplete && (
              <Button
                onClick={() =>
                  onComplete({
                    ...result,
                    attemptId: active.id,
                    confirmed: true,
                  })
                }
              >
                {continueLabel}
              </Button>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold">Answer review</h3>
        {normalized.map((q, i) => (
          <details className="card p-5" key={q.id}>
            <summary className="cursor-pointer">
              {i + 1}. {q.question} —{" "}
              {active.answers[q.id] === q.answer
                ? "Correct"
                : Number.isInteger(active.answers[q.id])
                  ? "Incorrect"
                  : "Unanswered"}
            </summary>
            <p className="mt-4 text-cyan-200">
              Correct answer: {q.options[q.answer]}
            </p>
            <p className="mt-2">{q.explanation}</p>
            {q.romanTelugu && (
              <p className="mt-2 text-zinc-400">{q.romanTelugu}</p>
            )}
          </details>
        ))}
      </section>
    );
  }
  const index = Math.min(
    Math.max(0, active.currentIndex),
    normalized.length - 1,
  );
  const question = normalized[index];
  return (
    <section className="space-y-5">
      <div className="card p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">{config.title || "Topic test"}</p>
          <h2 className="text-xl font-bold mt-2">
            Question {index + 1} of {normalized.length}
          </h2>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Time Remaining</p>
          <p
            role="timer"
            aria-label="Time remaining"
            className={`text-3xl font-mono ${timeLeft < 60 ? "text-cyan-200" : "text-cyan-200"}`}
          >
            {format(timeLeft)}
          </p>
        </div>
      </div>
      <fieldset className="card p-6">
        <legend className="sr-only">Answer question {index + 1}</legend>
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <label
              key={optionIndex}
              className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${active.answers[question.id] === optionIndex ? "border-cyan-300 bg-cyan-300/10" : "border-white/10"}`}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                checked={active.answers[question.id] === optionIndex}
                onChange={() =>
                  change((previous) => ({
                    answers: {
                      ...previous.answers,
                      [question.id]: optionIndex,
                    },
                  }))
                }
              />
              <span>
                {String.fromCharCode(65 + optionIndex)}. {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => change(() => ({ currentIndex: index - 1 }))}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            change((previous) => {
              const answers = { ...previous.answers };
              delete answers[question.id];
              return { answers };
            })
          }
        >
          Clear answer
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            change((previous) => ({
              marked: previous.marked.includes(question.id)
                ? previous.marked.filter((id) => id !== question.id)
                : [...previous.marked, question.id],
            }))
          }
        >
          {active.marked.includes(question.id)
            ? "Unmark review"
            : "Mark for review"}
        </Button>
        <Button
          disabled={index === normalized.length - 1}
          onClick={() => change(() => ({ currentIndex: index + 1 }))}
        >
          Save and Next
        </Button>
      </div>
      <nav aria-label="Question navigator" className="flex flex-wrap gap-2">
        {normalized.map((q, i) => (
          <button
            key={q.id}
            aria-label={`Question ${i + 1}${active.marked.includes(q.id) ? ", marked for review" : ""}`}
            aria-current={index === i ? "step" : undefined}
            onClick={() => change(() => ({ currentIndex: i }))}
            className={`h-11 w-11 rounded-lg border ${index === i ? "border-cyan-200" : "border-white/10"} ${active.marked.includes(q.id) ? "bg-cyan-300/10" : Number.isInteger(active.answers[q.id]) ? "bg-cyan-300/10" : "bg-white/5"}`}
          >
            {i + 1}
          </button>
        ))}
      </nav>
      {confirmSubmit ? (
        <div
          className="card p-5 space-y-4"
          role="group"
          aria-label="Confirm submission"
        >
          <p>
            {normalized.length - Object.keys(active.answers).length} questions
            unanswered. Submit now?
          </p>
          <div className="flex gap-3">
            <Button onClick={submit}>Confirm submission</Button>
            <Button variant="secondary" onClick={() => setConfirmSubmit(false)}>
              Keep working
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setConfirmSubmit(true)}>Submit Test</Button>
      )}
    </section>
  );
}
