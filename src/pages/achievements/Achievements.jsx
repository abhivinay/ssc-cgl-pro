import { useMemo } from "react";
import AchievementCard from "../../components/achievements/AchievementCard";
import achievements from "../../data/achievements/achievements";
import { analyticsManager } from "../../services";
import { normalize } from "../../engine/xp/xpEngine";

export default function Achievements() {
  const analytics = useMemo(() => analyticsManager.get(), []);
  const xpData = normalize(analytics.totalXP || 0);
  const unlockedCount = achievements.filter(
    (item) => xpData.level >= item.level,
  ).length;
  const completion = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Milestones
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Achievements</h1>
        <p className="mt-2 text-zinc-400">
          Unlock badges by increasing your level and maintaining study
          consistency.
        </p>
      </div>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Current Level</p>
          <p className="mt-2 text-3xl font-bold text-cyan-200">
            {xpData.level}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Unlocked</p>
          <p className="mt-2 text-3xl font-bold text-cyan-200">
            {unlockedCount}/{achievements.length}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-500">Completion</p>
          <p className="mt-2 text-3xl font-bold text-cyan-200">{completion}%</p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            currentLevel={xpData.level}
          />
        ))}
      </section>
    </div>
  );
}
