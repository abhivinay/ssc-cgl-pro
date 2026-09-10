import { useCallback, useMemo } from "react";
import usePersistentState from "./usePersistentState";
import { createBrainSession, completeCurrentGame, getCurrentGameType, isBrainSessionComplete, markBrainSessionRewarded, startGame } from "../core/brain/sessionEngine";
import { getDailyBrainPlan, getDateKey } from "../core/brain/dailyGenerator";
import { completeDailyBrainSession, readBrainState, saveDailyBrainSession, normalizeState } from "../services/brainStorage";

export default function useBrainTrainer() {
  const todayKey = getDateKey();
  const [storageState] = usePersistentState("ssc-brain-trainer", normalizeState);
  const session = storageState.dailySession?.dateKey === todayKey ? storageState.dailySession : null;
  const dailyPlan = useMemo(() => getDailyBrainPlan({ date: new Date(`${todayKey}T12:00:00`), count: 5 }), [todayKey]);
  const completedToday = storageState.history.some(item => item.dateKey === todayKey && isBrainSessionComplete(item));
  const startDailySession = useCallback(() => {
    const latest = readBrainState();
    const existing = latest.dailySession?.dateKey === todayKey ? latest.dailySession : latest.history.find(item => item.dateKey === todayKey);
    if (existing) { saveDailyBrainSession(existing); return existing; }
    const created = createBrainSession({ games: dailyPlan.games, dateKey: dailyPlan.dateKey, duration: dailyPlan.estimatedDuration });
    saveDailyBrainSession(created); return created;
  }, [dailyPlan, todayKey]);
  const startCurrentGame = useCallback((options = {}) => {
    const current = readBrainState().dailySession;
    if (!current || current.activeGame || isBrainSessionComplete(current)) return;
    saveDailyBrainSession(startGame(current, { ...options, gameType: options.gameType || getCurrentGameType(current) }));
  }, []);
  const finishCurrentGame = useCallback(result => {
    const current = readBrainState().dailySession;
    if (!current?.activeGame || (result.gameId && result.gameId !== current.activeGame.id)) return;
    const updated = completeCurrentGame(current, result);
    saveDailyBrainSession(updated);
    if (isBrainSessionComplete(updated)) completeDailyBrainSession(updated);
  }, []);
  const markRewarded = useCallback(() => {
    const current = readBrainState().dailySession;
    if (current) saveDailyBrainSession(markBrainSessionRewarded(current));
  }, []);
  const resetCurrentSession = useCallback(() => {
    const current = readBrainState().dailySession;
    if (isBrainSessionComplete(current)) return readBrainState();
    return saveDailyBrainSession(null);
  }, []);
  return { dailyPlan, session, currentGameType: getCurrentGameType(session), completedToday, isSessionActive: session?.status === "active", isSessionComplete: isBrainSessionComplete(session), totalSessions: storageState.totalSessions, bestScore: storageState.bestScore, brainXP: storageState.totalXP, history: storageState.history, startDailySession, startCurrentGame, finishCurrentGame, markRewarded, resetCurrentSession, refresh: readBrainState };
}
