import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

const DEFAULT_ACHIEVEMENTS = [
  {
    title: "7 Day Streak",
    description: "Study for 7 consecutive days.",

    progress: 100,
    unlocked: true,
    color: "amber",
  },
  {
    title: "1000 XP Club",
    description: "Earn 1000 total XP.",

    progress: 82,
    unlocked: false,
    color: "violet",
  },
  {
    title: "Memory Master",
    description: "Complete every Brain Trainer game.",

    progress: 46,
    unlocked: false,
    color: "cyan",
  },
  {
    title: "PYQ Crusher",
    description: "Solve 500 Previous Year Questions.",

    progress: 65,
    unlocked: false,
    color: "emerald",
  },
];

export default function AchievementCard({ items = DEFAULT_ACHIEVEMENTS }) {
  return (
    <GlassCard hover padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="warning">Achievements</Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Your Journey
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Unlock achievements by staying consistent.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item, index) => {
            const progress = Math.max(
              0,
              Math.min(100, Number(item.progress) || 0),
            );

            const colors = {
              amber: " ",
              violet: " ",
              cyan: " ",
              emerald: " ",
            };

            return (
              <div
                key={index}
                className={`group rounded-lg border p-5 transition duration-300 ${
                  item.unlocked
                    ? "border-cyan-300/20 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                          {item.description}
                        </p>
                      </div>

                      <div>
                        {item.unlocked ? (
                          <span className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-200">
                            Unlocked
                          </span>
                        ) : (
                          <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-semibold uppercase tracking-wider text-zinc-500">
                          Progress
                        </span>

                        <span className="font-bold text-zinc-300">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-lg bg-zinc-800">
                        <div
                          className={`h-full rounded-lg  ${colors[item.color]} transition-all duration-700`}
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
