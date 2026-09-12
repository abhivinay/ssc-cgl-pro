import { useEffect, useEffectEvent } from "react";

export default function AchievementPopup({
  achievement,
  onClose,
  duration = 4000,
}) {
  const closePopup = useEffectEvent(() => onClose?.());
  useEffect(() => {
    if (!achievement) return;

    const timer = setTimeout(
      () => {
        closePopup();
      },
      Math.max(1000, Number(duration) || 4000),
    );

    return () => clearTimeout(timer);
  }, [achievement, duration]);

  if (!achievement) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 top-5 z-[120] mx-auto max-w-md"
    >
      <div className="overflow-hidden rounded-lg border border-cyan-300/30 bg-zinc-900/95  ">
        <div className="h-1    " />

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Achievement Unlocked
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {achievement.title || "New Achievement"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {achievement.description || "You unlocked a new milestone."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onClose?.()}
              aria-label="Close achievement popup"
              className="shrink-0 rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
