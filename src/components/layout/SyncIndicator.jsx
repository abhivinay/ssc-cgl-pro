import { useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { getSyncStatus, subscribeSync } from "../../services/progressSync";
export default function SyncIndicator() {
  const state = useSyncExternalStore(
    subscribeSync,
    getSyncStatus,
    getSyncStatus,
  );
  const saved = state.phase === "saved",
    waiting = ["connecting", "saving"].includes(state.phase);
  const label = saved
    ? "Saved to disk"
    : waiting
      ? "Syncing progress"
      : "Device copy only";
  return (
    <Link
      to="/settings"
      className="sync-indicator"
      aria-label={"Progress storage: " + label}
    >
      <span
        className={"status-line " + (saved ? "is-saved" : "")}
        aria-hidden="true"
      />
      {label}
    </Link>
  );
}
