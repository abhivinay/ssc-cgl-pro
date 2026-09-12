import { useState, useEffect } from "react";

export default function FocusTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <section className="timer-panel">
      <p className="eyebrow">Focus session</p>
      <h1>Time to concentrate.</h1>
      <div className="focus-clock">
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>
      <button onClick={() => setIsRunning(!isRunning)} className="primary-btn">
        {isRunning ? "Pause" : "Start Focus Session"}
      </button>
      <p className="text-zinc-400 mt-6">Pomodoro Technique • 25 min focus</p>
    </section>
  );
}
