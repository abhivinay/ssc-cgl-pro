const clampPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, Math.round(number)));
};

export default function AchievementCard({ achievement }) {
  const unlocked = Boolean(achievement?.completed);
  const progress = Number(achievement?.progress) || 0;
  const target = Math.max(1, Number(achievement?.target) || 1);
  const percentage = clampPercentage((progress / target) * 100);

  return (
    <div
      className={`rounded-lg border p-5 transition ${
        unlocked
          ? "border-cyan-300/30 bg-cyan-300/10"
          : "border-zinc-800 bg-zinc-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-lg px-3 py-1 text-xs font-semibold ${
            unlocked
              ? "bg-cyan-300/10 text-cyan-200"
              : "bg-zinc-800 text-zinc-500"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold">
        {achievement?.title || "Achievement"}
      </h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">
        {achievement?.description ||
          "Complete the required milestone to unlock this achievement."}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500">Progress</span>

          <span className="font-semibold text-zinc-300">
            {Math.min(progress, target)}/{target}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-lg bg-zinc-800">
          <div
            className={`h-full rounded-lg transition-all duration-500 ${
              unlocked ? "bg-cyan-900" : "bg-cyan-900"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
