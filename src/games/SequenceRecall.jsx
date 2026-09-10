import useGameViewport from "../hooks/useGameViewport";
import { memoryToken, memorySequence } from "../presentation/memoryTokens";
import { useEffect, useMemo, useState } from "react";
import useSequenceRecall from "../hooks/useSequenceRecall";

const TOTAL_ROUNDS = 5;

export default function SequenceRecall({ difficulty = "easy", onComplete }) {
  const { state, submitAnswer, nextRound, finishGame } = useSequenceRecall({
    difficulty,
  });
  const viewportRef = useGameViewport(state.round);

  const [memorize, setMemorize] = useState(true);
  const [selected, setSelected] = useState([]);

  const [previousRound, setPreviousRound] = useState(state.round);
  if (previousRound !== state.round) {
    setPreviousRound(state.round);
    setMemorize(true);
    setSelected([]);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setMemorize(false);
    }, state.challenge.displayDuration);

    return () => clearTimeout(timer);
  }, [state.round, state.challenge.displayDuration]);

  const options = useMemo(() => {
    const values = [...state.challenge.sequence];

    const unique = [...new Set(values)];

    return state.challenge.options || unique;
  }, [state.challenge.sequence, state.challenge.options]);

  const toggle = (item) => {
    if (memorize) return;

    setSelected((previous) => {
      if (previous.includes(item)) {
        return previous.filter((value) => value !== item);
      }

      return [...previous, item];
    });
  };

  const handleSubmit = () => {
    const updated = submitAnswer(selected);

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
      updated.lastResult.correct ? 1000 : 1200,
    );
  };

  return (
    <div
      ref={viewportRef}
      tabIndex={-1}
      data-game="SequenceRecall"
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
    >
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-cyan-200">
          Sequence Recall
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Round {state.round} / {TOTAL_ROUNDS}
        </h2>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5 text-center">
        {memorize ? (
          <p className="text-3xl tracking-normal">
            {memorySequence(state.challenge.sequence)}
          </p>
        ) : (
          <p className="text-2xl text-zinc-500">Tap items in the same order.</p>
        )}
      </div>

      {!memorize && (
        <div className="mt-6 grid grid-cols-4 gap-4">
          {options.map((item) => (
            <button
              key={memoryToken(item)}
              type="button"
              aria-pressed={selected.includes(item)}
              onClick={() => toggle(item)}
              className={`rounded-lg border p-5 text-2xl font-bold transition ${
                selected.includes(item)
                  ? "border-cyan-300/40 bg-cyan-900"
                  : "border-zinc-700 bg-zinc-950 hover:bg-zinc-800"
              }`}
            >
              {memoryToken(item)}
            </button>
          ))}
        </div>
      )}

      {!memorize && (
        <button
          type="button"
          disabled={selected.length !== state.challenge.sequence.length}
          onClick={handleSubmit}
          className="mt-6 w-full rounded-lg bg-cyan-900 py-4 text-lg font-bold transition hover:bg-cyan-900 disabled:opacity-40"
        >
          Submit
        </button>
      )}

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
            Accuracy
            <strong className="ml-2">{state.lastResult.accuracy}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}
