import AnimatedNumber from "./AnimatedNumber";
export default function ProgressBar({
  value = 0,
  label,
  showValue = false,
  size = "md",
  className = "",
  trackClassName = "",
}) {
  const progress = Math.round(Math.min(100, Math.max(0, Number(value) || 0)));
  return (
    <div className={"data-progress " + className}>
      {(label || showValue) && (
        <div className="data-progress-label">
          <span>{label}</span>
          {showValue && <AnimatedNumber value={progress} suffix="%" />}
        </div>
      )}
      <div
        className={"data-track data-track-" + size + " " + trackClassName}
        role="progressbar"
        aria-label={label || "Progress"}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ transform: "scaleX(" + progress / 100 + ")" }} />
      </div>
    </div>
  );
}
