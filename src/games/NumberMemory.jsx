import useGameViewport from "../hooks/useGameViewport";
import { useEffect, useRef, useState } from "react";
import useNumberMemory from "../hooks/useNumberMemory";

export default function NumberMemory({ difficulty = "easy", onComplete }) {
  const { state, submitAnswer, nextRound, finishGame } = useNumberMemory({
    difficulty,
  });
  const viewportRef = useGameViewport(state.round);

  const [answer, setAnswer] = useState("");
  const [showNumber, setShowNumber] = useState(true);

  const inputRef = useRef(null);
  const transitionRef = useRef(null);
  const submittedRound = useRef(null);
  useEffect(() => () => clearTimeout(transitionRef.current), []);

  const [previousRound, setPreviousRound] = useState(state.round);
  if (previousRound !== state.round) {
    setPreviousRound(state.round);
    setShowNumber(true);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNumber(false);
    }, state.displayDuration);

    return () => clearTimeout(timer);
  }, [state.round, state.displayDuration]);

  useEffect(() => {
    if (!showNumber) inputRef.current?.focus({ preventScroll: true });
  }, [showNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showNumber || submittedRound.current === state.round || !answer.trim())
      return;
    submittedRound.current = state.round;

    const result = submitAnswer(answer);

    setAnswer("");

    if (result.round >= 5) {
      const summary = finishGame(result);
      const attempts = summary.correctAnswers + summary.wrongAnswers;
      onComplete?.({
        ...summary,
        totalAttempts: attempts,
        accuracy: attempts
          ? Math.round((summary.correctAnswers / attempts) * 100)
          : 0,
      });
      return;
    }
    transitionRef.current = setTimeout(() => nextRound(), 1000);
  };

  return (
    <div
      ref={viewportRef}
      tabIndex={-1}
      data-game="NumberMemory"
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
    >
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-cyan-200">
          Number Memory
        </p>

        <h2 className="mt-3 text-3xl font-bold">Round {state.round}</h2>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="number-display">
          {showNumber ? state.currentValue : "Recall the number"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          aria-label="Remembered number"
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={showNumber}
          placeholder="Enter Number"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-5 py-4 text-center text-2xl outline-none focus:border-cyan-300/40"
        />

        <button
          type="submit"
          disabled={showNumber}
          className="w-full rounded-lg bg-cyan-900 py-4 text-lg font-bold transition hover:bg-cyan-900 disabled:opacity-50"
        >
          Submit
        </button>
      </form>

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
            Expected: <strong>{state.lastResult.expected}</strong>
          </p>

          <p className="mt-1 text-zinc-400">
            Accuracy: <strong>{state.lastResult.digitAccuracy}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}
