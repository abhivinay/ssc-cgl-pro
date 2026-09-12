import { useEffect } from "react";

export default function BrainAchievementPopup({
  achievement,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!achievement) return;

    const timer = setTimeout(
      () => {
        onClose?.();
      },
      Math.max(1000, Number(duration) || 4000),
    );

    return () => clearTimeout(timer);
  }, [achievement, duration, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-x-4 top-5 z-[130] mx-auto max-w-md">
      <div className="overflow-hidden rounded-lg border border-cyan-300/30 bg-zinc-900/95  ">
        <div className="h-1    " />

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Brain Achievement Unlocked
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {achievement?.title || "New Brain Achievement"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {achievement?.description ||
                  "You reached a new Brain Trainer milestone."}
              </p>

              {achievement?.xp > 0 && (
                <p className="mt-3 font-bold text-cyan-200">
                  +{achievement.xp} XP
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onClose?.()}
              aria-label="Close brain achievement popup"
              className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            >
              Close brain achievement popup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
