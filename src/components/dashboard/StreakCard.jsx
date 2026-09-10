import { useMemo } from "react";
import { useStudy } from "../../context/StudyContext";
import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";

const formatMinutes = (minutes) => {
  const value = Math.max(0, Number(minutes) || 0);
  const hours = Math.floor(value / 60);
  const remaining = value % 60;

  if (!hours) return `${remaining}m`;
  if (!remaining) return `${hours}h`;

  return `${hours}h ${remaining}m`;
};

const getDayKey = (date) => {
  const value = new Date(date);
  return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
};

const EMPTY_LIST = [];

export default function StreakCard() {
  const { studyState, dashboard } = useStudy();

  const currentStreak = Math.max(0, Number(dashboard.streak) || 0);

  const bestStreak = Math.max(
    currentStreak,
    Number(studyState.bestStreak) || 0,
  );

  const todayStudy = Math.max(
    0,
    Number(dashboard.todayStudyTime ?? dashboard.studyMinutes) || 0,
  );

  const totalStudy = Math.max(
    0,
    Number(studyState.totalStudyTime ?? dashboard.totalStudyMinutes) || 0,
  );

  const activity = Array.isArray(studyState.activity)
    ? studyState.activity
    : EMPTY_LIST;

  const weeklyActivity = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - (6 - index));

      const count = activity.filter(
        (item) => getDayKey(item.date) === getDayKey(date),
      ).length;

      return {
        date,
        label: date.toLocaleDateString(undefined, {
          weekday: "short",
        }),
        count,
      };
    });
  }, [activity]);

  const maximumActivity = Math.max(
    1,
    ...weeklyActivity.map((day) => day.count),
  );

  const nextMilestone =
    currentStreak < 7
      ? 7
      : currentStreak < 14
        ? 14
        : currentStreak < 30
          ? 30
          : currentStreak < 60
            ? 60
            : 100;

  const milestoneProgress = Math.min(
    100,
    Math.round((currentStreak / nextMilestone) * 100),
  );

  const stats = [
    {
      label: "Best Streak",
      value: `${bestStreak} days`,

      accent: "amber",
    },
    {
      label: "Today&apos;s Study",
      value: formatMinutes(todayStudy),

      accent: "sky",
    },
    {
      label: "Total Study",
      value: formatMinutes(totalStudy),

      accent: "violet",
    },
  ];

  return (
    <GlassCard hover padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 md:p-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="warning">Consistency</Badge>

            <p className="mt-5 text-sm font-medium text-zinc-400">
              Current Study Streak
            </p>

            <div className="mt-2 flex items-end gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {currentStreak}
              </h2>

              <p className="mb-2 text-lg font-bold text-cyan-200">days</p>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              Keep showing up every day to protect your momentum.
            </p>
          </div>

          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20    text-3xl ">
            <span className="relative "></span>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Next Milestone
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {nextMilestone}-Day Streak
              </p>
            </div>

            <p className="text-2xl font-semibold text-cyan-200">
              {milestoneProgress}%
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-lg bg-zinc-800">
            <div
              className="h-full rounded-lg    transition-all duration-700"
              style={{
                width: `${milestoneProgress}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            {Math.max(0, nextMilestone - currentStreak)} days remaining
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Last 7 Days
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-300">
                Weekly consistency
              </p>
            </div>

            <span className="text-xs font-semibold text-zinc-500">
              Activity heatmap
            </span>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2">
            {weeklyActivity.map((day) => {
              const intensity = Math.max(0.12, day.count / maximumActivity);

              return (
                <div key={day.date.toISOString()} className="text-center">
                  <div
                    title={`${day.label}: ${day.count} activities`}
                    className="aspect-square rounded-xl border border-cyan-300/10 transition "
                    style={{
                      backgroundColor: `rgba(245,158,11,${intensity})`,
                    }}
                  />

                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                    {day.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {item.label}
                </p>
              </div>

              <p className="mt-3 text-xl font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
