import { useState, useEffect } from 'react';

export default function FocusTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="max-w-md mx-auto text-center mt-20">
      <div className="text-8xl font-mono font-bold mb-10">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="bg-violet-600 hover:bg-violet-700 px-12 py-4 rounded-full text-xl font-medium"
      >
        {isRunning ? 'Pause' : 'Start Focus Session'}
      </button>
      <p className="text-zinc-400 mt-6">Pomodoro Technique • 25 min focus</p>
    </div>
  );
}