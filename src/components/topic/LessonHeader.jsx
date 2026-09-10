import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";

const clamp = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(100, Math.max(0, Math.round(number)));
};

const formatDifficulty = (value) => {
  const difficulty = String(value || "medium").toLowerCase();

  const labels = {
    beginner: "Beginner",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    "ssc-level": "SSC Level",
  };

  return labels[difficulty] || value || "Medium";
};

const getDifficultyVariant = (value) => {
  const difficulty = String(value || "").toLowerCase();

  if (difficulty === "hard" || difficulty === "ssc-level") {
    return "danger";
  }

  if (difficulty === "medium") {
    return "warning";
  }

  return "success";
};

const getImportanceVariant = (value) => {
  const importance = String(value || "").toLowerCase();

  if (importance === "very-high" || importance === "high") {
    return "warning";
  }

  if (importance === "medium") {
    return "info";
  }

  return "default";
};

export default function LessonHeader({
  title = "Lesson",
  subtitle = "Interactive learning session",
  currentCard = 1,
  totalCards = 1,
  progress = 0,
  estimatedMinutes = 0,
  difficulty = "medium",
  importance = "high",
  subject = "SSC",
}) {
  const safeTotal = Math.max(1, Number(totalCards) || 1);

  const safeCurrent = Math.min(
    safeTotal,
    Math.max(1, Number(currentCard) || 1),
  );

  const safeProgress = clamp(progress);

  const safeMinutes = Math.max(0, Number(estimatedMinutes) || 0);

  return (
    <header className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-6   md:p-5">
      <div className="relative">
        <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">Interactive Lesson</Badge>

              <Badge variant="info">{subject}</Badge>

              <Badge variant={getDifficultyVariant(difficulty)}>
                {formatDifficulty(difficulty)}
              </Badge>

              <Badge variant={getImportanceVariant(importance)}>
                {String(importance || "medium")
                  .replaceAll("-", " ")
                  .toUpperCase()}{" "}
                IMPORTANCE
              </Badge>
            </div>

            <div className="mt-6 flex items-start gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Lesson
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                  {title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 xl:w-80 xl:shrink-0">
            <HeaderMetric label="Card" value={`${safeCurrent}/${safeTotal}`} />

            <HeaderMetric
              label="Estimated Time"
              value={safeMinutes ? `${safeMinutes} min` : "—"}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Lesson Progress
              </p>

              <p className="mt-1 text-sm font-semibold text-zinc-300">
                Card {safeCurrent} of {safeTotal}
              </p>
            </div>

            <p className="text-2xl font-semibold text-cyan-200">
              {safeProgress}%
            </p>
          </div>

          <ProgressBar value={safeProgress} size="lg" variant="primary" />
        </div>
      </div>
    </header>
  );
}

function HeaderMetric({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {label}
        </p>

        <span className="text-xl"></span>
      </div>

      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
