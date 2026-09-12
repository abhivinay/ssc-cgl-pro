import { useEffect, useMemo, useRef, useState } from "react";
import { createMistake } from "../../core/analytics/mistakeEngine";
import { addMistake } from "../../services/mistakeStorage";
import { createRevisionTasksFromMistakes } from "../../core/revision/revisionEngine";
import {
  addRevisionTasks,
  readRevisions,
} from "../../services/revisionStorage";

const toSafeQuestions = (value) => (Array.isArray(value) ? value : []);

const clampPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 60;

  return Math.min(100, Math.max(0, number));
};

export default function QuestionStage({
  title,
  description,
  questions = [],
  passPercentage = 60,
  onResult,
  topicId,
  subject,
  difficulty = "medium",
}) {
  const safeQuestions = toSafeQuestions(questions);
  const safePassPercentage = clampPercentage(passPercentage);

  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const startTime = useRef(null);
  const onResultRef = useRef(onResult);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const questionSetKey = useMemo(
    () =>
      safeQuestions
        .map((item, index) => String(item?.id ?? item?.question ?? index))
        .join("|"),
    [safeQuestions],
  );

  const score = useMemo(
    () =>
      safeQuestions.reduce(
        (total, item, index) =>
          total + (selected[index] === item.answer ? 1 : 0),
        0,
      ),
    [safeQuestions, selected],
  );

  const percentage = safeQuestions.length
    ? Math.round((score / safeQuestions.length) * 100)
    : 0;

  const passed = percentage >= safePassPercentage;

  const allAnswered =
    safeQuestions.length > 0 &&
    safeQuestions.every((_, index) =>
      Object.prototype.hasOwnProperty.call(selected, index),
    );

  const resetKey = JSON.stringify([topicId, difficulty, title, questionSetKey]);
  const [previousKey, setPreviousKey] = useState(resetKey);
  if (previousKey !== resetKey) {
    setPreviousKey(resetKey);
    setSelected({});
    setChecked(false);
    setSubmitting(false);
  }
  useEffect(() => {
    startTime.current = Date.now();
    onResultRef.current?.(null);
  }, [topicId, difficulty, title, questionSetKey]);

  if (!safeQuestions.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center">
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>

        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
          This stage uses the topic question bank. Add questions to the matching
          section in topicContent and they will appear automatically.
        </p>
      </div>
    );
  }

  const submit = () => {
    if (checked || submitting || !allAnswered) {
      return;
    }

    setSubmitting(true);

    const totalTime = Math.max(
      1,
      Math.round((Date.now() - startTime.current) / 1000),
    );

    const averageTime = Math.max(
      1,
      Math.round(totalTime / safeQuestions.length),
    );

    const newMistakes = [];

    safeQuestions.forEach((item, index) => {
      const selectedAnswer = selected[index];

      if (selectedAnswer !== item.answer) {
        const mistake = createMistake({
          topicId,
          subject,
          questionId: item.id ?? index + 1,
          question: item.question,
          correctAnswer: item.answer,
          selectedAnswer,
          difficulty: item.difficulty ?? difficulty,
          timeTaken: averageTime,
        });

        addMistake(mistake);
        newMistakes.push(mistake);
      }
    });

    if (newMistakes.length) {
      const revisionTasks = createRevisionTasksFromMistakes(
        newMistakes,
        readRevisions(),
      );

      addRevisionTasks(revisionTasks);
    }

    setChecked(true);
    setSubmitting(false);

    onResultRef.current?.({
      score,
      total: safeQuestions.length,
      percentage,
      passed,
    });
  };

  const retry = () => {
    onResultRef.current?.(null);
    setSelected({});
    setChecked(false);
    setSubmitting(false);
    startTime.current = Date.now();
  };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-2 text-zinc-400">{description}</p>
      </div>

      {safeQuestions.map((item, index) => (
        <div
          key={`${item.id ?? "question"}-${index}`}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-500">Question {index + 1}</p>

          <h3 className="mt-2 text-lg font-semibold">{item.question}</h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(Array.isArray(item.options) ? item.options : []).map(
              (option, optionIndex) => {
                const chosen = selected[index] === option;
                const correct = checked && option === item.answer;
                const incorrect = checked && chosen && option !== item.answer;

                return (
                  <button
                    key={`${index}-${optionIndex}-${String(option)}`}
                    type="button"
                    disabled={checked || submitting}
                    onClick={() =>
                      setSelected((previous) => ({
                        ...previous,
                        [index]: option,
                      }))
                    }
                    className={`rounded-lg border p-4 text-left transition ${
                      correct
                        ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                        : incorrect
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                          : chosen
                            ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                            : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    {option}
                  </button>
                );
              },
            )}
          </div>

          {checked && (
            <div className="mt-4 rounded-lg bg-zinc-950 p-4 text-sm leading-6 text-zinc-300">
              {item.explanation ||
                "Review the concept and solve the question again."}
            </div>
          )}
        </div>
      ))}

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        {checked ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">Score</p>

              <p
                className={`mt-1 text-3xl font-bold ${
                  passed ? "text-cyan-200" : "text-cyan-200"
                }`}
              >
                {score}/{safeQuestions.length}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                {percentage}% · {passed ? "Passed" : "Pass mark not reached"}
              </p>
            </div>

            <button
              type="button"
              onClick={retry}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold hover:border-zinc-500"
            >
              Retry
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={!allAnswered || submitting}
            onClick={submit}
            className="rounded-lg bg-cyan-900 px-6 py-3 font-semibold transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Submitting..." : "Submit Answers"}
          </button>
        )}
      </div>
    </div>
  );
}
