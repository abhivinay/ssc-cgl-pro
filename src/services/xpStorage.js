import { readJSON, writeJSON } from "./safeStorage";

export function readXP() {
  const study = readJSON("studyState", {});
  const legacy = readJSON("ssc-sentinel-xp", {});
  return {
    totalXP: Math.max(0, Number(study.xp) || 0, study.schemaVersion === 2 ? 0 : Number(legacy.totalXP) || 0),
    history: Array.isArray(study.xpHistory) ? study.xpHistory : Array.isArray(legacy.history) ? legacy.history : [],
  };
}

export function writeXP(state) {
  const totalXP = Number(state.totalXP);
  if (!Number.isFinite(totalXP) || totalXP < 0 || !Array.isArray(state.history)) throw new Error("Invalid XP state");
  writeJSON("studyState", { ...readJSON("studyState", {}), schemaVersion: 2, xp: totalXP, xpHistory: state.history });
  return state;
}

export function addXP({ amount, reason, sourceId = null }) {
  const state = readXP();
  if (!Number.isFinite(amount) || amount <= 0) return state;
  if (sourceId && state.history.some(item => item.sourceId === sourceId)) return state;
  const entry = { id: crypto.randomUUID(), amount, reason, sourceId, createdAt: Date.now() };
  return writeXP({ totalXP: state.totalXP + amount, history: [entry, ...state.history] });
}

export const clearXP = () => writeXP({ totalXP: 0, history: [] });
export const getXPHistory = limit => typeof limit === "number" ? readXP().history.slice(0, limit) : readXP().history;
export default { readXP, writeXP, addXP, clearXP, getXPHistory };
