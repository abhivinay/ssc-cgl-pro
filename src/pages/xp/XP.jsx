import { useMemo, useState } from "react";
import XPCard from "../../components/xp/XPCard";
import { addXP, getReward, removeXP } from "../../engine/xp/xpEngine";
import { analyticsManager } from "../../services";

const actions = [
  { key: "learn", label: "Complete Learning" },
  { key: "practice", label: "Complete Practice" },
  { key: "analysis", label: "Analyze Mistakes" },
  { key: "revision", label: "Complete Revision" },
  { key: "brainTrainer", label: "Brain Trainer" },
  { key: "topicTest", label: "Topic Test" },
  { key: "mockTest", label: "Mock Test" },
  { key: "dailyMission", label: "Daily Mission" },
];

export default function XP() {
  const initialAnalytics = useMemo(() => analyticsManager.get(), []);
  const [xp, setXP] = useState(initialAnalytics.totalXP || 0);
  const [message, setMessage] = useState("");

  const saveXP = (value) => {
    setXP(value);
    analyticsManager.update({ totalXP: value });
  };

  const earnXP = (action) => {
    const result = addXP(xp, action);
    const reward = getReward(action);
    saveXP(result.totalXP);
    analyticsManager.addActivity({
      type: "xp",
      title: `Earned ${reward} XP`,
      description: actions.find((item) => item.key === action)?.label || action,
      createdAt: new Date().toISOString(),
    });
    setMessage(`+${reward} XP earned`);
    setTimeout(() => setMessage(""), 2000);
  };

  const deductXP = () => {
    const result = removeXP(xp, 50);
    saveXP(result.totalXP);
    setMessage("-50 XP removed");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Progress System
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">XP & Level</h1>
        <p className="mt-2 text-zinc-400">
          Earn experience by completing study activities and daily missions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <XPCard xp={xp} />

        <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">XP Rewards</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Test the XP system using study actions.
              </p>
            </div>
            {message && (
              <span className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-200">
                {message}
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {actions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => earnXP(action.key)}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-white">{action.label}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      +{getReward(action.key)} XP
                    </p>
                  </div>
                </div>
                <span className="text-cyan-200">+</span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <button
              type="button"
              onClick={deductXP}
              disabled={xp === 0}
              className="rounded-lg border border-cyan-300/30 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Remove 50 XP
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
