import GlassCard from "../ui/GlassCard";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const clamp = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(number)));
};

export default function LessonFinish({
  title = "Lesson Complete",
  message = "You completed this interactive lesson.",
  accuracy = 0,
  xpEarned = 0,
  timeSpentSeconds = 0,
  cardsCompleted = 0,
  totalCards = 0,
  onRestart,
  onContinue,
}) {
  const safeAccuracy = clamp(accuracy);
  const safeXP = Math.max(0, Number(xpEarned) || 0);
  const safeCards = Math.max(0, Number(cardsCompleted) || 0);
  const safeTotal = Math.max(safeCards, Number(totalCards) || 0);

  const totalSeconds = Math.max(0, Math.round(Number(timeSpentSeconds) || 0));

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  const grade =
    safeAccuracy >= 90
      ? "Excellent"
      : safeAccuracy >= 75
        ? "Very Good"
        : safeAccuracy >= 60
          ? "Completed"
          : "Needs Review";

  return (
    <GlassCard padding="p-0" className="relative overflow-hidden">
      <div className="relative p-6 text-center md:p-5">
        <div className="mt-6 flex justify-center">
          <Badge variant="success">Lesson Completed</Badge>
        </div>

        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
          {message}
        </p>

        <p className="mt-5 text-lg font-semibold text-cyan-200">{grade}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ResultCard
            label="Accuracy"
            value={`${safeAccuracy}%`}
            accent="violet"
          />

          <ResultCard label="XP Earned" value={`+${safeXP}`} accent="amber" />

          <ResultCard
            label="Time Spent"
            value={`${minutes}m ${seconds}s`}
            accent="sky"
          />

          <ResultCard
            label="Cards Completed"
            value={`${safeCards}/${safeTotal}`}
            accent="emerald"
          />
        </div>

        <div className="mt-6 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Next Step
          </p>

          <p className="mt-2 text-xl font-semibold text-cyan-200">
            Continue to the next learning stage
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          {onRestart && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onRestart}
            >
              Restart Lesson
            </Button>
          )}

          {onContinue && (
            <Button type="button" size="lg" onClick={onContinue}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function ResultCard({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 text-left">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </p>
      </div>

      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
