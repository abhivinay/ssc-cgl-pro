import { useStudy } from "../../context/StudyContext";
import GlassCard from "../ui/GlassCard";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";

export default function LevelCard() {
  const { dashboard } = useStudy();

  const level = Math.max(1, Number(dashboard.level) || 1);

  const xp = Math.max(0, Number(dashboard.xp) || 0);

  const levelStart = (level - 1) * 500;
  const nextLevelXP = level * 500;
  const currentXP = Math.max(0, xp - levelStart);

  const progress = Math.max(
    0,
    Math.min(100, Math.round((currentXP / 500) * 100)),
  );

  const remaining = Math.max(0, nextLevelXP - xp);

  return (
    <GlassCard hover className="relative min-h-[260px] overflow-hidden">
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="primary">Level Progress</Badge>

            <p className="mt-5 text-sm font-medium text-zinc-400">
              Current Level
            </p>

            <div className="mt-2 flex items-end gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {level}
              </h2>

              <span className="mb-2 text-sm font-semibold text-cyan-200">
                Commander
              </span>
            </div>
          </div>

          <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-cyan-300/20    text-3xl ">
            <span className="relative"></span>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                XP Progress
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {currentXP} / 500 XP
              </p>
            </div>

            <p className="text-2xl font-semibold text-cyan-200">{progress}%</p>
          </div>

          <ProgressBar value={progress} size="lg" variant="primary" />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3">
          <div>
            <p className="text-xs text-zinc-500">Next milestone</p>

            <p className="mt-1 text-sm font-semibold text-zinc-200">
              Level {level + 1}
            </p>
          </div>

          <p className="text-sm font-bold text-cyan-200">{remaining} XP left</p>
        </div>
      </div>
    </GlassCard>
  );
}
