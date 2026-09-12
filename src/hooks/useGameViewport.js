import { useEffect, useRef } from "react";
// Presentation only: no timers, saved state or scoring are changed here.
export default function useGameViewport(roundKey) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
    ref.current?.focus({ preventScroll: true });
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const animation = !reduced?.matches
      ? ref.current?.animate?.(
          [
            { opacity: 0.4, transform: "translateY(4px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 180, easing: "ease-out" },
        )
      : null;
    const stop = () => {
      if (reduced.matches) animation?.cancel();
    };
    reduced?.addEventListener?.("change", stop);
    return () => {
      animation?.cancel();
      reduced?.removeEventListener?.("change", stop);
    };
  }, [roundKey]);
  return ref;
}
