import { useEffect, useRef } from "react";
// Presentation only: no timers, saved state or scoring are changed here.
export default function useGameViewport(roundKey) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView?.({ block: "nearest", behavior: "instant" });
    ref.current?.focus({ preventScroll: true });
  }, [roundKey]);
  return ref;
}
