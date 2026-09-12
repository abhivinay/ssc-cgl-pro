const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
};

export default function BrainStats({
  score = 0,
  correctAnswers = 0,
  wrongAnswers = 0,
  reactionTime = 0,
}) {
  const safeCorrect = safeNumber(correctAnswers);
  const safeWrong = safeNumber(wrongAnswers);
  const totalAttempts = safeCorrect + safeWrong;

  const accuracy = totalAttempts
    ? Math.round((safeCorrect / totalAttempts) * 100)
    : 0;

  const reactionText = reactionTime
    ? `${(safeNumber(reactionTime) / 1000).toFixed(2)}s`
    : "—";

  const stats = [
    {
      label: "Score",
      value: safeNumber(score),
    },
    {
      label: "Correct",
      value: safeCorrect,
    },
    {
      label: "Wrong",
      value: safeWrong,
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
    },
    {
      label: "Attempts",
      value: totalAttempts,
    },
    {
      label: "Reaction",
      value: reactionText,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">{item.label}</p>
          </div>

          <p className="mt-3 text-3xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
