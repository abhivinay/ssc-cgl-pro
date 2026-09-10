import GlassCard from "../ui/GlassCard";
import AnimatedNumber from "../ui/AnimatedNumber";

export default function StatsCard({
  title,
  value,
  subtitle,
  accent = "violet",
  trend,
  className = "",
}) {
  const accents = {
    violet: {
      bg: "  ",

      text: "text-cyan-200",
    },
    emerald: {
      bg: "  ",

      text: "text-cyan-200",
    },
    amber: {
      bg: "  ",

      text: "text-cyan-200",
    },
    sky: {
      bg: "  ",

      text: "text-cyan-200",
    },
  };

  const theme = accents[accent] || accents.violet;

  return (
    <GlassCard hover className={`relative overflow-hidden ${className}`}>
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
          </h2>

          {subtitle && <p className="mt-3 text-sm text-zinc-500">{subtitle}</p>}

          {trend && (
            <div
              className={`mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold ${theme.text}`}
            >
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
