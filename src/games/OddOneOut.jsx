import useGameViewport from "../hooks/useGameViewport";
import { memoryToken } from "../presentation/memoryTokens";
import { useState } from "react";
import useOddOneOut from "../hooks/useOddOneOut";

const TOTAL_ROUNDS = 5;

export default function OddOneOut({ difficulty = "easy", onComplete }) {
  const { state, submitAnswer, nextRound, finishGame } = useOddOneOut({
    difficulty,
  });
  const viewportRef = useGameViewport(state.round);

  const [selected, setSelected] = useState("");

  const handleSubmit = () => {
    if (selected === "") return;

    const updated = submitAnswer(selected);

    setSelected("");

    if (updated.round >= TOTAL_ROUNDS) {
      const summary = finishGame(updated);

      onComplete?.({
        correctAnswers: summary.correctAnswers,
        wrongAnswers: summary.wrongAnswers,
        totalAttempts: summary.totalAttempts,
        accuracy: summary.accuracy,
        score: summary.score,
        reactionTime: summary.reactionTime,
      });

      return;
    }

    setTimeout(
      () => {
        nextRound();
      },
      updated.lastResult.correct ? 900 : 1200,
    );
  };

  return (
    <div
      ref={viewportRef}
      tabIndex={-1}
      data-game="OddOneOut"
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
    >
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-cyan-200">
          Odd One Out
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Round {state.round} / {TOTAL_ROUNDS}
        </h2>

        <p className="mt-2 text-zinc-500">Select the odd one out.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {state.question.items.map((item, index) => (
          <button
            key={index}
            type="button"
            aria-pressed={selected === item}
            onClick={() => setSelected(item)}
            className={`rounded-lg border p-6 text-3xl font-bold transition ${
              selected === item
                ? "border-cyan-300/40 bg-cyan-900"
                : "border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
            }`}
          >
            {memoryToken(item)}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={selected === ""}
        onClick={handleSubmit}
        className="mt-6 w-full rounded-lg bg-cyan-900 py-4 text-lg font-bold transition hover:bg-cyan-900 disabled:opacity-40"
      >
        Submit
      </button>

      {state.lastResult && (
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
          <p
            className={`text-xl font-bold ${
              state.lastResult.correct ? "text-cyan-200" : "text-cyan-200"
            }`}
          >
            {state.lastResult.correct ? " Correct!" : " Wrong!"}
          </p>

          <p className="mt-3 text-zinc-400">
            Correct Answer
            <strong className="ml-2">
              {memoryToken(state.lastResult.expected)}
            </strong>
          </p>

          <p className="mt-2 text-zinc-400">
            Accuracy
            <strong className="ml-2">{state.lastResult.accuracy}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}
