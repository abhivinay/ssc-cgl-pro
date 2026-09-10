import { useEffect, useEffectEvent, useRef } from "react";
import { formatTime, getProgress } from "../../engine/timer/timerEngine";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
export default function FocusOverlay({
  open,
  timer,
  task = "Focus session",
  subject = "SSC CGL",
  onPause,
  onResume,
  onStop,
}) {
  const panelRef = useRef(null);
  const stop = useEffectEvent(() => onStop?.());
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const panel = panelRef.current;
    const buttons = () => [...panel.querySelectorAll("button:not(:disabled)")];
    buttons()[0]?.focus();
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        stop();
      }
      if (event.key !== "Tab") return;
      const list = buttons(),
        first = list[0],
        last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    panel.addEventListener("keydown", keydown);
    return () => {
      panel.removeEventListener("keydown", keydown);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);
  if (!open) return null;
  return (
    <section
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      className="focus-overlay"
      aria-label="Focus session"
    >
      <header>
        <span>SSC Sentinel / Focus</span>
        <Button variant="ghost" onClick={onStop}>
          Close focus mode
        </Button>
      </header>
      <div className="focus-content">
        <p className="eyebrow">{subject}</p>
        <h1>{task}</h1>
        <p className="focus-clock">{formatTime(timer.remaining)}</p>
        <p role="status">
          {timer.completed
            ? "Session complete"
            : timer.running
              ? "Session in progress"
              : "Session paused"}
        </p>
        <ProgressBar
          value={getProgress(timer)}
          label="Session progress"
          showValue
        />
        <div className="action-row">
          {timer.running ? (
            <Button onClick={onPause}>Pause</Button>
          ) : (
            <Button onClick={onResume} disabled={timer.completed}>
              Resume
            </Button>
          )}
          <Button variant="secondary" onClick={onStop}>
            End session
          </Button>
        </div>
        <p className="muted">
          {Math.ceil(timer.remaining / 60)} minutes remaining
        </p>
      </div>
    </section>
  );
}
