import AnimatedNumber from "../components/ui/AnimatedNumber";
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import useXP from "../hooks/useXP";
import SyncIndicator from "../components/layout/SyncIndicator";
export default function Dashboard() {
  const { studyState, dashboard, dailyMission, dueRevisions } = useStudy();
  const { totalXP, level, xpToNextLevel } = useXP();
  const missions = Array.isArray(dailyMission) ? dailyMission : [];
  const topics = Array.isArray(studyState.topics) ? studyState.topics : [];
  const complete = missions.filter((m) => m.completed).length;
  const subjects = [
    ["quant", "Quantitative Aptitude"],
    ["reasoning", "Reasoning"],
    ["english", "English"],
    ["gk", "General Awareness"],
  ];
  return (
    <div className="command-dashboard">
      <header className="command-title">
        <div>
          <p className="eyebrow">Daily overview</p>
          <h1>Your preparation, in focus.</h1>
          <p>Continue the work that moves your preparation forward.</p>
        </div>
        <SyncIndicator />
      </header>
      <section className="command-metrics" aria-label="Your progress">
        {[
          [
            "Study today",
            <AnimatedNumber
              value={Math.max(0, Number(dashboard.studyMinutes) || 0)}
              suffix=" min"
            />,
            "Recorded study time",
          ],
          [
            "Daily missions",
            complete + " / " + missions.length,
            "Topics completed",
          ],
          [
            "Current streak",
            <AnimatedNumber value={dashboard.streak || 0} suffix=" days" />,
            "Consecutive study days",
          ],
          [
            "Revision queue",
            <AnimatedNumber value={dueRevisions?.length || 0} />,
            "Scheduled for recall",
          ],
        ].map(([label, value, detail]) => (
          <div className="command-metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </section>
      <div className="command-columns">
        <section className="command-panel mission-panel">
          <div className="panel-heading">
            <p className="eyebrow">01 / Next session</p>
            <span className="status-label">
              {studyState.brainTrainerCompleted
                ? "Study available"
                : "Warm-up pending"}
            </span>
          </div>
          <h2>
            {studyState.brainTrainerCompleted
              ? "Continue your daily mission."
              : "Begin with a clear mind."}
          </h2>
          <p>
            {studyState.brainTrainerCompleted
              ? "Pick up your next topic, study the material and check your understanding."
              : "Complete five exercises in attention and recall to open your daily study workspace."}
          </p>
          <Link
            className="primary-btn"
            to={
              studyState.brainTrainerCompleted ? "/missions" : "/brain-trainer"
            }
          >
            {studyState.brainTrainerCompleted
              ? "Open daily mission"
              : "Begin Brain Trainer"}
          </Link>
          <div className="mission-foot">
            {complete} completed / {Math.max(0, missions.length - complete)}{" "}
            remaining today
          </div>
        </section>
        <section className="command-panel">
          <div className="panel-heading">
            <h2>Subject readiness</h2>
            <Link to="/syllabus">View syllabus</Link>
          </div>
          <p className="panel-description">
            Completed topics across your syllabus.
          </p>
          <div className="subject-rows">
            {subjects.map(([id, label]) => {
              const list = topics.filter(
                (t) =>
                  String(t.subject).toLowerCase() === id ||
                  (id === "gk" &&
                    ["ga", "general awareness"].includes(
                      String(t.subject).toLowerCase(),
                    )),
              );
              const done = list.filter((t) => t.completed).length;
              const pct = list.length
                ? Math.round((done / list.length) * 100)
                : 0;
              return (
                <Link to="/syllabus" className="subject-row" key={id}>
                  <div>
                    <span>{label}</span>
                    <small>
                      {done} / {list.length}
                    </small>
                  </div>
                  <div
                    className="command-track"
                    role="progressbar"
                    aria-label={label}
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <i
                      style={{
                        width: "100%",
                        transform: "scaleX(" + pct / 100 + ")",
                      }}
                    />
                  </div>
                  <span className="subject-insight">
                    {list.find((t) => t.unlocked && !t.completed)?.name
                      ? "Continue: " +
                        list.find((t) => t.unlocked && !t.completed).name
                      : done === list.length && list.length
                        ? "All topics completed. Revisit the syllabus."
                        : list.length -
                          done +
                          " topics remaining in this subject."}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="rank-row">
            <span>
              Level <strong>{level}</strong>
            </span>
            <div>
              <strong>
                <AnimatedNumber value={totalXP} suffix=" XP" />
              </strong>
              <small>{xpToNextLevel} XP to next level</small>
            </div>
          </div>
        </section>
      </div>
      <section className="command-panel">
        <div className="panel-heading">
          <h2>Continue your work</h2>
          <span className="eyebrow">02 / Study tools</span>
        </div>
        <div className="command-tools">
          {[
            ["PYQ practice", "Questions from 2019–2025.", "/pyq-practice"],
            ["Revision", "Revisit earlier learning.", "/revision"],
            ["Focus session", "Set aside uninterrupted time.", "/focus-timer"],
            ["Study planner", "Arrange the work ahead.", "/planner"],
          ].map(([title, description, path], index) => (
            <Link to={path} className="command-tool" key={path}>
              <span className="tool-number">0{index + 1}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
