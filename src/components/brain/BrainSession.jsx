import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import useBrainTrainer from "../../hooks/useBrainTrainer";
import MentalMath from "../../games/MentalMath";
import NumberMemory from "../../games/NumberMemory";
import VisualMemory from "../../games/VisualMemory";
import PatternRecognition from "../../games/PatternRecognition";
import SequenceRecall from "../../games/SequenceRecall";
import SpeedReaction from "../../games/SpeedReaction";
import OddOneOut from "../../games/OddOneOut";
import DirectionMemory from "../../games/DirectionMemory";
import SymbolMemory from "../../games/SymbolMemory";
import BrainProgress from "./BrainProgress";
import BrainResult from "./BrainResult";
import { GAME_TYPES } from "../../core/brain/gameEngine";

const EMPTY_LIVE_STATS = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalAttempts: 0,
  accuracy: 0,
};

const EMPTY_LIST = [];

export default function BrainSession() {
  const navigate = useNavigate();
  const {
    session,
    dailyPlan,
    currentGameType,
    startDailySession,
    startCurrentGame,
    finishCurrentGame,
    isSessionComplete,
  } = useBrainTrainer();

  const [liveGameStats, setLiveGameStats] = useState(EMPTY_LIVE_STATS);

  const currentGameIndex = Math.max(0, Number(session?.currentGameIndex) || 0);

  const completedResults = Array.isArray(session?.results)
    ? session.results
    : EMPTY_LIST;

  const completedStats = useMemo(() => {
    return completedResults.reduce(
      (result, item) => ({
        score: result.score + (Number(item?.score) || 0),
        correctAnswers:
          result.correctAnswers + (Number(item?.correctAnswers) || 0),
        wrongAnswers: result.wrongAnswers + (Number(item?.wrongAnswers) || 0),
      }),
      {
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      },
    );
  }, [completedResults]);

  useEffect(() => {
    if (!session || session.activeGame || isSessionComplete) {
      return;
    }

    const nextGame = session.games?.[currentGameIndex];

    if (nextGame) {
      startCurrentGame({
        gameType: nextGame,
      });
    }
  }, [session, currentGameIndex, startCurrentGame, isSessionComplete]);

  const activeGameId = session?.activeGame?.id;
  const [previousGameId, setPreviousGameId] = useState(activeGameId);
  if (previousGameId !== activeGameId) {
    setPreviousGameId(activeGameId);
    setLiveGameStats(EMPTY_LIVE_STATS);
  }

  const handleGameComplete = (result) => {
    finishCurrentGame({ ...result, gameId: session?.activeGame?.id });
    setLiveGameStats(EMPTY_LIVE_STATS);
  };

  if (!session) {
    return (
      <section className="brain-start">
        <p className="eyebrow">Daily preparation</p>
        <h2>Five exercises. One focused session.</h2>
        <p>
          Train attention, recall and calculation before continuing your study
          plan.
        </p>
        <Button onClick={startDailySession}>Start Brain Training</Button>
      </section>
    );
  }

  if (isSessionComplete) {
    return (
      <div className="space-y-6">
        <BrainResult session={session} />
        <Button fullWidth size="lg" onClick={() => navigate("/dashboard")}>
          Enter Command Center
        </Button>
      </div>
    );
  }

  const activeGame = session.activeGame;

  const totalGames = Math.max(
    1,
    dailyPlan?.games?.length || session.games?.length || 1,
  );

  const sessionScore =
    completedStats.score + (Number(liveGameStats.score) || 0);

  const sessionCorrect =
    completedStats.correctAnswers + (Number(liveGameStats.correctAnswers) || 0);

  const sessionWrong =
    completedStats.wrongAnswers + (Number(liveGameStats.wrongAnswers) || 0);

  return (
    <div className="space-y-6">
      <BrainProgress
        currentGame={Math.min(currentGameIndex + 1, totalGames)}
        totalGames={totalGames}
        gameTitle={activeGame?.title || "Preparing Game"}
        score={sessionScore}
        correctAnswers={sessionCorrect}
        wrongAnswers={sessionWrong}
      />

      {currentGameType === GAME_TYPES.MENTAL_MATH && activeGame && (
        <MentalMath
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          duration={activeGame.duration || 60}
          onProgress={setLiveGameStats}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.NUMBER_MEMORY && activeGame && (
        <NumberMemory
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.VISUAL_MEMORY && activeGame && (
        <VisualMemory
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.PATTERN_RECOGNITION && activeGame && (
        <PatternRecognition
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.SEQUENCE_RECALL && activeGame && (
        <SequenceRecall
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.SPEED_REACTION && activeGame && (
        <SpeedReaction
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.ODD_ONE_OUT && activeGame && (
        <OddOneOut
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.DIRECTION_MEMORY && activeGame && (
        <DirectionMemory
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType === GAME_TYPES.SYMBOL_MEMORY && activeGame && (
        <SymbolMemory
          key={activeGame.id}
          difficulty={activeGame.difficulty || "easy"}
          onComplete={handleGameComplete}
        />
      )}

      {currentGameType &&
        currentGameType !== GAME_TYPES.MENTAL_MATH &&
        currentGameType !== GAME_TYPES.NUMBER_MEMORY &&
        currentGameType !== GAME_TYPES.VISUAL_MEMORY &&
        currentGameType !== GAME_TYPES.PATTERN_RECOGNITION &&
        currentGameType !== GAME_TYPES.SEQUENCE_RECALL &&
        currentGameType !== GAME_TYPES.SPEED_REACTION &&
        currentGameType !== GAME_TYPES.ODD_ONE_OUT &&
        currentGameType !== GAME_TYPES.DIRECTION_MEMORY &&
        currentGameType !== GAME_TYPES.SYMBOL_MEMORY && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center">
            <h2 className="mt-4 text-2xl font-bold">
              {activeGame?.title || "Brain Game"}
            </h2>

            <p className="mt-3 text-zinc-400">
              This game is ready in the daily rotation and its playable
              component will be added next.
            </p>

            <button
              type="button"
              onClick={() =>
                handleGameComplete({
                  correctAnswers: 0,
                  wrongAnswers: 0,
                  totalAttempts: 0,
                  reactionTime: 0,
                  score: 0,
                })
              }
              className="mt-6 rounded-lg bg-cyan-900 px-6 py-3 font-semibold transition hover:bg-cyan-900"
            >
              Skip Game
            </button>
          </div>
        )}
    </div>
  );
}
