import { useEffect, useMemo, useRef, useState } from "react";

const clampDuration = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 60;

  return Math.max(1, Math.min(3600, Math.floor(number)));
};

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remaining = String(safeSeconds % 60).padStart(2, "0");

  return `${minutes}:${remaining}`;
};

export default function BrainTimer(props) {
  return (
    <BrainTimerSession key={clampDuration(props.duration ?? 60)} {...props} />
  );
}

function BrainTimerSession({
  duration = 60,
  running = true,
  onComplete,
  onTick,
}) {
  const safeDuration = clampDuration(duration);
  const [timeLeft, setTimeLeft] = useState(safeDuration);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (!running || completedRef.current) return;

    if (timeLeft <= 0) {
      completedRef.current = true;
      onCompleteRef.current?.();
      return;
    }

    const timer = setTimeout(() => {
      const next = Math.max(0, timeLeft - 1);
      setTimeLeft(next);
      onTickRef.current?.(next);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, running]);

  const progress = useMemo(
    () =>
      Math.max(0, Math.min(100, Math.round((timeLeft / safeDuration) * 100))),
    [timeLeft, safeDuration],
  );

  const urgent = timeLeft <= 10;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Time Remaining
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${
              urgent ? "text-cyan-200" : "text-cyan-200"
            }`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-lg bg-zinc-800">
        <div
          className={`h-full rounded-lg transition-all duration-500 ${
            urgent ? "bg-cyan-900" : "bg-cyan-900"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
