import useGameViewport from "../../hooks/useGameViewport";
const number = (value) =>
  Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
export default function BrainResult({ session }) {
  const viewportRef = useGameViewport(session?.id);
  const results = Array.isArray(session?.results) ? session.results : [];
  const correct = results.reduce(
      (sum, item) => sum + number(item.correctAnswers),
      0,
    ),
    wrong = results.reduce((sum, item) => sum + number(item.wrongAnswers), 0);
  const attempts = correct + wrong,
    accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const score = results.reduce((sum, item) => sum + number(item.score), 0),
    xp = results.reduce((sum, item) => sum + number(item.xp), 0);
  const timed = results.filter((item) => number(item.reactionTime) > 0);
  const reaction = timed.length
    ? Math.round(
        timed.reduce((sum, item) => sum + number(item.reactionTime), 0) /
          timed.length,
      )
    : 0;
  const seconds =
    session?.startedAt && session?.completedAt
      ? Math.max(
          0,
          Math.round(
            (Number(session.completedAt) - Number(session.startedAt)) / 1000,
          ),
        )
      : 0;
  const grade =
    accuracy >= 95
      ? "S"
      : accuracy >= 90
        ? "A+"
        : accuracy >= 80
          ? "A"
          : accuracy >= 70
            ? "B"
            : accuracy >= 60
              ? "C"
              : "D";
  return (
    <section ref={viewportRef} tabIndex={-1} className="brain-result">
      <header>
        <p className="eyebrow">Session complete</p>
        <h2>Ready to study.</h2>
        <p>Your daily warm-up is complete. Today’s mission is unlocked.</p>
      </header>
      <dl className="result-metrics">
        {[
          [
            "Games",
            results.length +
              "/" +
              Math.max(results.length, session?.games?.length || 0),
          ],
          ["Score", score],
          ["Accuracy", accuracy + "%"],
          ["XP earned", xp],
          ["Attempts", attempts],
          ["Correct", correct],
          ["Wrong", wrong],
          [
            "Average reaction",
            reaction ? (reaction / 1000).toFixed(2) + "s" : "—",
          ],
          ["Time", Math.floor(seconds / 60) + "m " + (seconds % 60) + "s"],
          ["Grade", grade],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
