export default function StageFooter({
  currentStage,
  isCompleted,
  requiresPass,
  canComplete,
  onComplete,
}) {
  return (
    <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-bold">{currentStage.name} stage</p>

          <p className="mt-1 text-sm text-zinc-500">
            {isCompleted
              ? "This stage has already been completed."
              : requiresPass && !canComplete
                ? "Reach the required pass mark to complete this stage."
                : `Complete this stage to earn ${currentStage.xp} XP.`}
          </p>
        </div>

        <button
          type="button"
          disabled={!canComplete}
          onClick={onComplete}
          className="rounded-lg bg-cyan-900 px-6 py-3 font-semibold transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
        >
          {isCompleted ? "Stage Completed" : `Complete ${currentStage.name}`}
        </button>
      </div>
    </div>
  );
}
