import ProgressBar from "./ProgressBar";
export default function ProgressRing({
  value = 0,
  label,
  showValue = true,
  className = "",
}) {
  return (
    <div className={"progress-summary " + className}>
      <ProgressBar value={value} label={label} showValue={showValue} />
    </div>
  );
}
