import AnimatedNumber from "./AnimatedNumber";
export default function StatCard({
  label,
  value,

  trend,
  trendLabel,
  accent = "violet",
  className = "",
}) {
  const accents = {
    violet: "  text-cyan-200 border-cyan-300/20",
    emerald: "  text-cyan-200 border-cyan-300/20",
    amber: "  text-cyan-200 border-cyan-300/20",
    sky: "  text-cyan-200 border-cyan-300/20",
    rose: "  text-cyan-200 border-cyan-300/20",
  };

  return (
    <div
      className={`stat-composition relative overflow-hidden p-6  ${
        accents[accent] || accents.violet
      } ${className}`}
    >
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-400">{label}</p>

          <p className="mt-3 text-3xl font-semibold text-white">
            {typeof value === "number" ? (
              <AnimatedNumber value={value} />
            ) : (
              value
            )}
          </p>

          {trendLabel && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
              <span
                className={
                  Number(trend) >= 0 ? "text-cyan-200" : "text-cyan-200"
                }
              >
                {Number(trend) >= 0 ? "" : ""} {Math.abs(Number(trend) || 0)}%
              </span>

              <span className="text-zinc-500">{trendLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
