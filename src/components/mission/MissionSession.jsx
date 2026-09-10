import useMissionSession from "../../hooks/useMissionSession";
import { formatTime, getProgress } from "../../engine/timer/timerEngine";

const STAGE_LABELS = {
  learn: "Learn",
  conceptCheck: "Concept Check",
  level1: "Level 1",
  level2: "Level 2",
  level3: "Level 3",
  topicTest: "Topic Test",
  pyq: "PYQ",
  revision: "Revision",
};

export default function MissionSession({ preset = "pomodoro" }) {
  const { session, timer, start, pause, resume, stop, complete, available } =
    useMissionSession(preset);

  if (!available || !session || !timer) {
    return (
      <section className="rounded-lg border border-white/10 bg-zinc-900/70 p-6">
        <p className="text-sm text-zinc-400">No active mission available.</p>
      </section>
    );
  }

  const progress = getProgress(timer);
  const running = session.status === "running";
  const paused = session.status === "paused";
  const stopped = session.status === "stopped";
  const completed = session.completed;
  const canStart = session.status === "idle" || stopped;
  const canComplete = !completed;

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-900/70 p-6  ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Active Mission
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {session.topicName}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase text-zinc-300">
                {session.subject}
              </span>
              <span className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                {STAGE_LABELS[session.stage] || session.stage}
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium capitalize text-zinc-300">
                {session.status}
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Preset
            </p>
            <p className="mt-1 font-semibold capitalize text-zinc-200">
              {String(session.preset).replace(/([A-Z])/g, " $1")}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-6">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold tracking-tight text-white sm:text-3xl">
              {formatTime(timer.remaining)}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {timer.completed
                ? "Timer completed"
                : running
                  ? "Focus session running"
                  : paused
                    ? "Session paused"
                    : "Ready to begin"}
            </p>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-lg bg-white/10">
            <div
              className="h-full rounded-lg bg-cyan-900 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>{progress.toFixed(0)}% complete</span>
            <span>{formatTime(timer.duration)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {canStart && (
            <button
              type="button"
              onClick={start}
              className="rounded-xl bg-cyan-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
            >
              Start
            </button>
          )}
          {running && (
            <button
              type="button"
              onClick={pause}
              className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
            >
              Pause
            </button>
          )}
          {paused && (
            <button
              type="button"
              onClick={resume}
              className="rounded-xl bg-cyan-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900"
            >
              Resume
            </button>
          )}
          {(running || paused) && (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
            >
              Stop
            </button>
          )}
          <button
            type="button"
            onClick={complete}
            disabled={!canComplete}
            className="rounded-xl bg-cyan-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {completed ? "Stage Completed" : "Complete Stage"}
          </button>
        </div>
      </div>
    </section>
  );
}
