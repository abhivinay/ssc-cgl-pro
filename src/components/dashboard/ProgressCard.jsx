import { useStudy } from "../../context/StudyContext";
import useXP from "../../hooks/useXP";
import GlassCard from "../ui/GlassCard";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";

export default function ProgressCard() {
  const { dashboard } = useStudy();

  const { totalXP, level, currentLevelXP, xpToNextLevel } = useXP();

  const revisionDue = Array.isArray(dashboard.revisionDue)
    ? dashboard.revisionDue
    : [];

  const progress = Math.max(
    0,
    Math.min(100, Number(dashboard.overallProgress) || 0),
  );

  const cards = [
    {
      title: "Overall Progress",
      value: `${progress}%`,
      subtitle: `${dashboard.completedTopics}/${dashboard.totalTopics} Topics`,

      accent: "emerald",
    },
    {
      title: "Current Level",
      value: level,
      subtitle: `${xpToNextLevel} XP Left`,

      accent: "amber",
    },
    {
      title: "Total XP",
      value: totalXP,
      subtitle: `${currentLevelXP}/100 XP`,

      accent: "violet",
    },
    {
      title: "Revision Due",
      value: revisionDue.length,
      subtitle: "Pending Tasks",

      accent: "sky",
    },
  ];

  return (
    <GlassCard hover padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 md:p-5">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="primary">Mission Progress</Badge>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Progress Overview
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Your overall SSC preparation status.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Completion
            </p>

            <p className="mt-2 text-3xl font-semibold text-cyan-200">
              {progress}%
            </p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar
            value={progress}
            variant="success"
            size="lg"
            showValue
            label={`${dashboard.completedTopics}/${dashboard.totalTopics} Topics Completed`}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5 transition duration-300  hover:border-white/20"
            >
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                      {card.title}
                    </p>

                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      {card.value}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
