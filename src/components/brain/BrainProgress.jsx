export default function BrainProgress({
  currentGame = 1,
  totalGames = 5,
  gameTitle = "Brain Game",
  score = 0,
  correctAnswers = 0,
  wrongAnswers = 0,
}) {
  const total = Math.max(1, Number(totalGames) || 1),
    current = Math.min(total, Math.max(1, Number(currentGame) || 1));
  const correct = Math.max(0, Number(correctAnswers) || 0),
    wrong = Math.max(0, Number(wrongAnswers) || 0),
    attempts = correct + wrong;
  return (
    <section className="brain-session-bar" aria-label="Session progress">
      <div className="brain-session-position">
        <span className="eyebrow">
          Game {current} of {total}
        </span>
        <strong>
          {gameTitle === "Symbol Memory" ? "Token Memory" : gameTitle}
        </strong>
        <div
          className="session-segments"
          aria-label={current - 1 + " completed games"}
        >
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={
                i < current - 1
                  ? "is-complete"
                  : i === current - 1
                    ? "is-current"
                    : ""
              }
            />
          ))}
        </div>
      </div>
      <dl>
        {[
          ["Score", Math.max(0, Number(score) || 0)],
          ["Correct", correct],
          ["Wrong", wrong],
          [
            "Accuracy",
            (attempts ? Math.round((correct / attempts) * 100) : 0) + "%",
          ],
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
