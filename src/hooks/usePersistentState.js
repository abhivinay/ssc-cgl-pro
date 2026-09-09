import { useCallback, useMemo, useSyncExternalStore } from "react";
import { readJSON, writeJSON, subscribeStorage } from "../services/safeStorage";

// Updates read the latest committed value. No side effects in React updaters.
export default function usePersistentState(key, initialize) {
  const getSnapshot = useCallback(() => {
    try { return localStorage.getItem(key); } catch { return null; }
  }, [key]);
  const raw = useSyncExternalStore(subscribeStorage, getSnapshot, () => null);
  const state = useMemo(() => {
    // raw invalidates this memo when another provider or tab commits a change.
    void raw;
    return initialize(readJSON(key));
  }, [raw, key, initialize]);
  const setState = useCallback(update => {
    const previous = initialize(readJSON(key));
    const next = typeof update === "function" ? update(previous) : update;
    if (next !== previous) writeJSON(key, next);
    return next;
  }, [key, initialize]);
  return [state, setState];
}
