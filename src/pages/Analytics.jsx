import { useMemo } from "react";
import { useStudy } from "../context/StudyContext";
import useXP from "../hooks/useXP";
import Page from "../components/ui/Page";
import GlassCard from "../components/ui/GlassCard";
import StatsCard from "../components/dashboard/StatsCard";
import ProgressBar from "../components/ui/ProgressBar";
import Badge from "../components/ui/Badge";

const SUBJECTS = {
  quant: {
    name: "Quantitative Aptitude",
    shortName: "Quant",

    accent: "violet",
  },
  reasoning: {
    name: "General Intelligence & Reasoning",
    shortName: "Reasoning",

    accent: "emerald",
  },
  english: {
    name: "English Comprehension",
    shortName: "English",

    accent: "sky",
  },
  gk: {
    name: "General Awareness",
    shortName: "General Awareness",

    accent: "amber",
  },
};

const MISTAKE_REASONS = ["Concept", "Calculation", "Time", "Guess"];

const REVISION_DAYS = [1, 3, 7, 15, 30];

const clamp = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, number);
};

const getDayKey = (date) => {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return [value.getFullYear(), value.getMonth(), value.getDate()].join("-");
};

const EMPTY_LIST = [];

export default function Analytics() {
  const { studyState } = useStudy();

  const { totalXP, level, currentLevelXP, xpToNextLevel, history } = useXP();

  const topics = Array.isArray(studyState.topics)
    ? studyState.topics
    : EMPTY_LIST;

  const revisions = Array.isArray(studyState.revisions)
    ? studyState.revisions
    : EMPTY_LIST;

  const activities = Array.isArray(studyState.activity)
    ? studyState.activity
    : EMPTY_LIST;

  const analytics = useMemo(() => {
    const totalTopics = topics.length;

    const completedTopics = topics.filter((topic) => topic.completed).length;

    const overallProgress = totalTopics
      ? Math.round(
          topics.reduce((total, topic) => total + clamp(topic.progress), 0) /
            totalTopics,
        )
      : 0;

    const pendingRevisions = revisions.filter(
      (revision) => !revision.completed,
    ).length;

    const completedRevisions = revisions.filter(
      (revision) => revision.completed,
    ).length;

    const notesCount = topics.reduce(
      (total, topic) =>
        total + (Array.isArray(topic.notes) ? topic.notes.length : 0),

      0,
    );

    const mistakes = topics.flatMap((topic) =>
      Array.isArray(topic.mistakes)
        ? topic.mistakes.map((mistake) => ({
            ...mistake,
            topicId: topic.id,
            topicName: topic.name,
            subject: topic.subject,
          }))
        : [],
    );

    const mistakesCount = mistakes.length;

    const frequentMistakes = mistakes.filter(
      (mistake) => mistake.frequent,
    ).length;

    const subjectProgress = Object.keys(SUBJECTS).map((subject) => {
      const subjectTopics = topics.filter((topic) => topic.subject === subject);

      const completed = subjectTopics.filter((topic) => topic.completed).length;

      const progress = subjectTopics.length
        ? Math.round(
            subjectTopics.reduce(
              (total, topic) => total + clamp(topic.progress),
              0,
            ) / subjectTopics.length,
          )
        : 0;

      const subjectMistakes = mistakes.filter(
        (mistake) => mistake.subject === subject,
      ).length;

      return {
        subject,
        name: SUBJECTS[subject].name,
        shortName: SUBJECTS[subject].shortName,

        accent: SUBJECTS[subject].accent,
        total: subjectTopics.length,
        completed,
        progress,
        mistakes: subjectMistakes,
      };
    });

    const weakTopics = [...topics]
      .filter((topic) => !topic.completed)
      .map((topic) => ({
        id: topic.id,
        name: topic.name,
        subject: topic.subject,
        progress: clamp(topic.progress),
        mistakes: Array.isArray(topic.mistakes) ? topic.mistakes.length : 0,
      }))
      .sort((first, second) => {
        if (first.progress !== second.progress) {
          return first.progress - second.progress;
        }

        return second.mistakes - first.mistakes;
      })
      .slice(0, 5);

    const mistakeReasonStats = MISTAKE_REASONS.map((reason) => ({
      reason,
      count: mistakes.filter(
        (mistake) => String(mistake.reason || "Concept") === reason,
      ).length,
    }));

    const revisionPipeline = REVISION_DAYS.map((day, index) => ({
      day,
      pending: revisions.filter(
        (revision) => Number(revision.level) === index && !revision.completed,
      ).length,
      completed: revisions.filter(
        (revision) => Number(revision.level) === index && revision.completed,
      ).length,
    }));

    return {
      totalTopics,
      completedTopics,
      overallProgress,
      pendingRevisions,
      completedRevisions,
      notesCount,
      mistakesCount,
      frequentMistakes,
      subjectProgress,
      weakTopics,
      mistakeReasonStats,
      revisionPipeline,
    };
  }, [topics, revisions]);

  const weeklyActivity = useMemo(() => {
    const today = new Date();

    const days = Array.from({ length: 7 }, (_, position) => {
      const date = new Date(today);

      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - (6 - position));

      const count = activities.filter(
        (activity) => getDayKey(activity.date) === getDayKey(date),
      ).length;

      return {
        date,
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        count,
      };
    });

    return {
      days,
      maximum: Math.max(1, ...days.map((day) => day.count)),
    };
  }, [activities]);

  const strongestSubject = [...analytics.subjectProgress].sort(
    (first, second) => second.progress - first.progress,
  )[0];

  const weakestSubject = [...analytics.subjectProgress].sort(
    (first, second) => first.progress - second.progress,
  )[0];

  const maximumMistakeCount = Math.max(
    1,
    ...analytics.mistakeReasonStats.map((item) => item.count),
  );

  return (
    <div className="relative min-h-full overflow-hidden">
      <Page className="relative py-2">
        <header className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6   md:p-5">
          <div className="relative flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">Performance Center</Badge>

                <Badge variant="info">Live Analytics</Badge>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                Preparation{" "}
                <span className="     text-cyan-200">Intelligence</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                Understand your syllabus progress, weak areas, revision load and
                recent study consistency.
              </p>
            </div>

            <div className="flex w-full max-w-sm items-center gap-4 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                  Performance Score
                </p>

                <p className="mt-1 text-3xl font-semibold text-cyan-200">
                  {analytics.overallProgress}%
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Overall syllabus completion
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Completed Topics"
            value={`${analytics.completedTopics}/${analytics.totalTopics}`}
            subtitle="Full syllabus coverage"
            accent="emerald"
          />

          <StatsCard
            title="Total XP"
            value={totalXP}
            subtitle={`${history.length} rewards recorded`}
            accent="violet"
          />

          <StatsCard
            title="Revision Due"
            value={analytics.pendingRevisions}
            subtitle={`${analytics.completedRevisions} completed`}
            accent={analytics.pendingRevisions ? "amber" : "emerald"}
          />

          <StatsCard
            title="Mistakes"
            value={analytics.mistakesCount}
            subtitle={`${analytics.frequentMistakes} frequently repeated`}
            accent="rose"
          />
        </section>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge variant="primary">Subject Intelligence</Badge>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    Subject Progress
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Compare progress across all four SSC subjects.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                    Strongest Subject
                  </p>

                  <p className="mt-2 font-semibold text-cyan-200">
                    {strongestSubject?.shortName || "None"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {analytics.subjectProgress.map((item) => (
                  <div
                    key={item.subject}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-white">
                            {item.shortName}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {item.completed}/{item.total} topics completed
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-semibold text-white">
                          {item.progress}%
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {item.mistakes} mistakes
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <ProgressBar
                        value={item.progress}
                        size="md"
                        variant={
                          item.progress >= 75
                            ? "success"
                            : item.progress >= 40
                              ? "primary"
                              : "warning"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <Badge variant="danger">Weakness Monitor</Badge>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Priority Topics
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Topics requiring the most attention.
              </p>

              <div className="mt-6 space-y-3">
                {analytics.weakTopics.length ? (
                  analytics.weakTopics.map((topic, index) => (
                    <div
                      key={topic.id || `${topic.name}-${index}`}
                      className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 font-semibold text-cyan-200">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-white">
                            {topic.name}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {SUBJECTS[topic.subject]?.shortName ||
                              topic.subject}
                            {" • "}
                            {topic.mistakes} mistakes
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-lg font-semibold text-cyan-200">
                        {topic.progress}%
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-700 p-5 text-center">
                    <h3 className="mt-4 text-lg font-semibold">
                      No weak topics found
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      All current topics are progressing well.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                  Weakest Subject
                </p>

                <p className="mt-2 text-lg font-semibold text-cyan-200">
                  {weakestSubject?.shortName || "None"}
                </p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-2">
          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <Badge variant="info">Weekly Trend</Badge>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Study Activity
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Completed actions during the last seven days.
              </p>

              <div className="mt-6 flex h-64 items-end justify-between gap-3">
                {weeklyActivity.days.map((day) => {
                  const height = Math.max(
                    8,
                    Math.round((day.count / weeklyActivity.maximum) * 100),
                  );

                  return (
                    <div
                      key={day.date.toISOString()}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <p className="mb-3 text-xs font-semibold text-zinc-300">
                        {day.count}
                      </p>

                      <div className="flex h-44 w-full items-end justify-center rounded-lg border border-white/10 bg-black/20 px-2 py-2">
                        <div
                          className="activity-bar w-full max-w-10"
                          style={{
                            height: "100%",
                            transform: `scaleY(${height / 100})`,
                          }}
                        />
                      </div>

                      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-zinc-600">
                        {day.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <Badge variant="danger">Mistake Analysis</Badge>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Why Marks Are Lost
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Mistakes grouped by their primary cause.
              </p>

              <div className="mt-6 space-y-6">
                {analytics.mistakeReasonStats.map((item) => {
                  const progress = Math.round(
                    (item.count / maximumMistakeCount) * 100,
                  );

                  return (
                    <div key={item.reason}>
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-zinc-200">
                            {item.reason}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            Recorded errors
                          </p>
                        </div>

                        <p className="text-2xl font-semibold text-cyan-200">
                          {item.count}
                        </p>
                      </div>

                      <ProgressBar
                        value={progress}
                        variant="danger"
                        size="md"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                    Total Mistakes
                  </p>

                  <p className="mt-3 text-3xl font-semibold text-white">
                    {analytics.mistakesCount}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                    Frequently Wrong
                  </p>

                  <p className="mt-3 text-3xl font-semibold text-cyan-200">
                    {analytics.frequentMistakes}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <Badge variant="warning">Revision Intelligence</Badge>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Revision Pipeline
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Spaced revision cycle across Day 1, 3, 7, 15 and 30.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {analytics.revisionPipeline.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-center"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Day {item.day}
                    </p>

                    <p className="mt-4 text-3xl font-semibold text-cyan-200">
                      {item.pending}
                    </p>

                    <p className="mt-2 text-xs text-zinc-500">Pending</p>

                    <div className="mt-4 rounded-lg bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
                      {item.completed} done
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="p-0" className="relative overflow-hidden">
            <div className="relative p-6 md:p-5">
              <Badge variant="primary">Level Intelligence</Badge>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Level {level}
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                XP progress toward your next Sentinel rank.
              </p>

              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                      Current XP
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-white">
                      {currentLevelXP}/100
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <ProgressBar
                    value={currentLevelXP}
                    variant="primary"
                    size="lg"
                    showValue
                  />
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                  {xpToNextLevel} XP required for Level {level + 1}
                </p>
              </div>

              <div className="mt-5 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                  Total Lifetime XP
                </p>

                <p className="mt-2 text-2xl font-semibold text-cyan-200">
                  {totalXP}
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </Page>
    </div>
  );
}
