import { useMemo } from "react";
import useMistakes from "../hooks/useMistakes";
import {
  getAverageTime,
  getRecentMistakes,
  getTotalMistakes,
  getWeakTopics,
  groupBySubject,
  groupByTopic,
} from "../core/analytics/dashboardEngine";

export default function Mistakes() {
  const { mistakes, clearAllMistakes } = useMistakes();

  const analytics = useMemo(
    () => ({
      total: getTotalMistakes(mistakes),
      averageTime: getAverageTime(mistakes),
      subjects: groupBySubject(mistakes),
      topics: groupByTopic(mistakes),
      weakTopics: getWeakTopics(mistakes),
      recent: getRecentMistakes(mistakes),
    }),
    [mistakes],
  );

  const handleClear = () => {
    const confirmed = window.confirm(
      "Clear all saved mistakes? This action cannot be undone.",
    );

    if (!confirmed) return;

    clearAllMistakes();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Performance Analytics
          </p>

          <h1 className="mt-2 text-3xl font-bold">Mistake Dashboard</h1>

          <p className="mt-2 text-zinc-400">
            Review incorrect answers and identify weak subjects and topics.
          </p>
        </div>

        <button
          type="button"
          disabled={!mistakes.length}
          onClick={handleClear}
          className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear History
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Mistakes" value={analytics.total} />

        <StatCard label="Average Time" value={`${analytics.averageTime}s`} />

        <StatCard label="Weak Topics" value={analytics.weakTopics.length} />

        <StatCard
          label="Subjects Affected"
          value={Object.keys(analytics.subjects).length}
        />
      </div>

      {!mistakes.length ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 text-center">
          <h2 className="mt-4 text-2xl font-bold">No mistakes recorded</h2>

          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            Complete practice or PYQ stages. Incorrect answers will appear here
            automatically.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <AnalyticsCard title="Mistakes by Subject">
              <div className="space-y-4">
                {Object.entries(analytics.subjects)
                  .sort((a, b) => b[1] - a[1])
                  .map(([subject, count]) => (
                    <ProgressRow
                      key={subject}
                      label={subject || "Unknown"}
                      value={count}
                      maximum={analytics.total}
                    />
                  ))}
              </div>
            </AnalyticsCard>

            <AnalyticsCard title="Weakest Topics">
              <div className="space-y-3">
                {analytics.weakTopics.map((item, index) => (
                  <div
                    key={item.topicId}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 font-bold text-cyan-200">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {formatTopic(item.topicId)}
                        </p>

                        <p className="text-sm text-zinc-500">
                          Topic ID: {item.topicId}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-xl bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-200">
                      {item.count} mistakes
                    </span>
                  </div>
                ))}
              </div>
            </AnalyticsCard>
          </div>

          <AnalyticsCard title="Recent Mistakes">
            <div className="space-y-4">
              {analytics.recent.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                        {item.subject || "Unknown Subject"} ·{" "}
                        {formatTopic(item.topicId)}
                      </p>

                      <h3 className="mt-2 font-semibold">{item.question}</h3>
                    </div>

                    <span className="rounded-xl bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3">
                      <p className="text-xs uppercase tracking-wider text-cyan-200">
                        Your Answer
                      </p>

                      <p className="mt-1 text-sm font-medium text-cyan-200">
                        {item.selectedAnswer || "Not answered"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3">
                      <p className="text-xs uppercase tracking-wider text-cyan-200">
                        Correct Answer
                      </p>

                      <p className="mt-1 text-sm font-medium text-cyan-200">
                        {item.correctAnswer}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
                    <span className="rounded-lg bg-zinc-900 px-3 py-2">
                      Difficulty: {item.difficulty || "medium"}
                    </span>

                    <span className="rounded-lg bg-zinc-900 px-3 py-2">
                      Time: {item.timeTaken || 0}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}

function AnalyticsCard({ title, children }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function ProgressRow({ label, value, maximum }) {
  const percentage = maximum ? Math.round((value / maximum) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-medium">{label}</p>

        <p className="text-sm text-zinc-400">
          {value} · {percentage}%
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-lg bg-zinc-800">
        <div
          className="h-full rounded-lg bg-cyan-900"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function formatTopic(topicId) {
  return String(topicId || "Unknown")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(timestamp) {
  if (!timestamp) return "Unknown date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
