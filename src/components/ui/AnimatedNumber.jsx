import { useEffect, useRef } from "react";
export default function AnimatedNumber({ value, suffix = "" }) {
  const numeric = Number(value),
    valid = Number.isFinite(numeric),
    node = useRef(null),
    displayed = useRef(valid ? numeric : 0);
  useEffect(() => {
    if (!valid) return;
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let frame = 0,
      start = null;
    const from = displayed.current;
    const finish = () => {
      cancelAnimationFrame(frame);
      displayed.current = numeric;
      if (node.current) node.current.textContent = numeric.toLocaleString();
    };
    const tick = (now) => {
      start ??= now;
      const progress = Math.min(1, (now - start) / 360),
        next = Math.round(from + (numeric - from) * (1 - (1 - progress) ** 3));
      displayed.current = progress === 1 ? numeric : next;
      if (node.current)
        node.current.textContent = displayed.current.toLocaleString();
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const changed = () => {
      if (media.matches) finish();
    };
    if (media?.matches || from === numeric) finish();
    else frame = requestAnimationFrame(tick);
    media?.addEventListener?.("change", changed);
    return () => {
      cancelAnimationFrame(frame);
      media?.removeEventListener?.("change", changed);
    };
  }, [numeric, valid]);
  if (!valid)
    return (
      <>
        {value}
        {suffix}
      </>
    );
  return (
    <span aria-label={numeric.toLocaleString() + suffix}>
      <span ref={node} aria-hidden="true">
        {numeric.toLocaleString()}
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
