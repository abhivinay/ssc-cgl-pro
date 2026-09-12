import { getLevelTitle, normalize } from "../../engine/xp/xpEngine";

export default function XPCard({ xp = 0 }) {
  const data = normalize(xp);
  const title = getLevelTitle(data.level);

  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
            Experience
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Level {data.level}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">{title}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-zinc-300">
            {data.currentLevelXP} XP
          </span>
          <span className="text-zinc-500">{data.nextLevelXP} XP</span>
        </div>

        <div className="h-3 overflow-hidden rounded-lg bg-zinc-800">
          <div
            className="h-full rounded-lg bg-cyan-900 transition-all duration-500"
            style={{ width: `${data.progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-zinc-400">Total XP</p>
          <p className="text-lg font-bold text-white">{data.totalXP}</p>
        </div>
      </div>
    </section>
  );
}
