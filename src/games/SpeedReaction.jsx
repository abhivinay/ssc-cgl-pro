import useGameViewport from "../hooks/useGameViewport";
import { useEffect, useState } from "react";
import useSpeedReaction from "../hooks/useSpeedReaction";

const TOTAL_ROUNDS = 5;

export default function SpeedReaction({ difficulty = "easy", onComplete }) {
  const { state, revealSignal, submitClick, nextRound, finishGame } =
    useSpeedReaction({ difficulty });
  const viewportRef = useGameViewport(state.round);

  const [canClick, setCanClick] = useState(false);

  const [previousRound, setPreviousRound] = useState(state.challenge.id);
  if (previousRound !== state.challenge.id) {
    setPreviousRound(state.challenge.id);
    setCanClick(false);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      revealSignal();
      setCanClick(true);
    }, state.challenge.delay);

    return () => clearTimeout(timer);
  }, [state.round, state.challenge.id, state.challenge.delay, revealSignal]);

  const handleClick = () => {
    const updated = submitClick(Date.now());

    setCanClick(false);

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
      updated.lastResult.valid ? 1000 : 1200,
    );
  };

  return (
    <div
      ref={viewportRef}
      tabIndex={-1}
      data-game="SpeedReaction"
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
    >
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-cyan-200">
          Speed Reaction
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Round {state.round} / {TOTAL_ROUNDS}
        </h2>
      </div>

      <button
        type="button"
        disabled={!canClick}
        onClick={handleClick}
        className={"reaction-target " + (canClick ? "is-ready" : "")}
      >
        <strong>{canClick ? "CLICK NOW!" : "Wait for the signal"}</strong>
        <small>
          {canClick
            ? "Press Enter, Space or click"
            : "Keep your attention here"}
        </small>
      </button>

      {state.lastResult && (
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
          <p
            className={`text-xl font-bold ${
              state.lastResult.valid ? "text-cyan-200" : "text-cyan-200"
            }`}
          >
            {state.lastResult.valid ? " Good!" : " Too Early!"}
          </p>

          {state.lastResult.valid && (
            <p className="mt-3 text-zinc-400">
              Reaction
              <strong className="ml-2">
                {state.lastResult.reactionTime} ms
              </strong>
            </p>
          )}

          <p className="mt-2 text-zinc-400">
            Rating
            <strong className="ml-2">{state.lastResult.rating}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
