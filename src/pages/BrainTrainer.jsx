import BrainSession from "../components/brain/BrainSession";
export default function BrainTrainer() {
  return (
    <div className="brain-workspace">
      <header className="brain-heading">
        <div>
          <p className="eyebrow">Daily preparation</p>
          <h1>Brain Trainer</h1>
        </div>
        <p>Five exercises. One focused start.</p>
      </header>
      <BrainSession />
    </div>
  );
}
