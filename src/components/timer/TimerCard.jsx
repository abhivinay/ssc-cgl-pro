import {
  formatTime,
  getProgress,
  TIMER_PRESETS,
} from "../../engine/timer/timerEngine";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
export default function TimerCard({
  timer,
  selectedPreset,
  onPresetChange,
  onStart,
  onPause,
  onReset,
}) {
  return (
    <section className="timer-panel">
      <header>
        <p className="eyebrow">Study timer</p>
        <h2>{TIMER_PRESETS[selectedPreset]?.label || "Study session"}</h2>
      </header>
      <p className="focus-clock">{formatTime(timer.remaining)}</p>
      <p role="status">
        {timer.completed
          ? "Session complete"
          : timer.running
            ? "In progress"
            : "Ready"}
      </p>
      <ProgressBar
        value={getProgress(timer)}
        label="Session progress"
        showValue
      />
      <div className="timer-presets">
        {Object.entries(TIMER_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            aria-pressed={selectedPreset === key}
            onClick={() => onPresetChange(key)}
          >
            <span>{preset.label}</span>
            <small>{preset.minutes} min</small>
          </button>
        ))}
      </div>
      <div className="action-row">
        {timer.running ? (
          <Button onClick={onPause}>Pause session</Button>
        ) : (
          <Button onClick={onStart} disabled={timer.completed}>
            Start focus session
          </Button>
        )}
        <Button variant="secondary" onClick={onReset}>
          Reset
        </Button>
      </div>
    </section>
  );
}
