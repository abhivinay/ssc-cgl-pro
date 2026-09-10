import { useStudy } from "../../context/StudyContext";
import SyncIndicator from "./SyncIndicator";
export default function SentinelEntry({ onEnter }) {
  const { studyState } = useStudy();
  const hour = new Date().getHours();
  return (
    <main className="sentinel-entry">
      <header className="entry-header">
        <div className="sentinel-brand">
          <strong>SSC Sentinel</strong>
          <span>Preparation command center</span>
        </div>
        <SyncIndicator />
      </header>
      <div className="entry-layout">
        <section className="entry-copy">
          <p className="eyebrow">A deliberate start</p>
          <h1>
            {hour < 12
              ? "Good morning"
              : hour < 17
                ? "Good afternoon"
                : "Good evening"}
            {studyState.name ? ", " + studyState.name : ""}.
          </h1>
          <p>Your preparation is ready. Continue to begin.</p>
          <button className="primary-btn" onClick={onEnter}>
            Continue to your session
          </button>
          <p className="entry-caption">
            Your study plan, practice and progress in one place.
          </p>
        </section>
        <section className="entry-sequence" aria-label="Your preparation flow">
          <h2 className="eyebrow">The daily sequence</h2>
          {[
            [
              "01",
              "Prepare",
              "Five focused exercises in attention and recall.",
            ],
            ["02", "Study", "Continue your next topic and daily mission."],
            [
              "03",
              "Review",
              "Test your understanding and revisit what matters.",
            ],
          ].map(([number, title, detail]) => (
            <div className="entry-step" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      <footer>
        <span>SSC CGL</span>
        <span>Consistency, measured.</span>
      </footer>
    </main>
  );
}
