import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
export default function AmbientCanvas({ children }) {
  const root = useRef(null),
    light = useRef(null),
    transition = useRef(null),
    navigate = useNavigate();
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)"),
      desktop = window.matchMedia?.(
        "(hover: hover) and (pointer: fine) and (min-width: 801px)",
      );
    const element = root.current;
    let frame = 0,
      x = 0,
      y = 0,
      button = null,
      bounds = null,
      enabled = false;
    const resetButton = () => {
      button?.style.removeProperty("--magnet-x");
      button?.style.removeProperty("--magnet-y");
      button?.style.removeProperty("--spot-x");
      button?.style.removeProperty("--spot-y");
      button = null;
      bounds = null;
    };
    const paint = () => {
      frame = 0;
      if (!enabled) return;
      if (light.current) {
        light.current.style.transform =
          "translate3d(" + (x - 300) + "px," + (y - 230) + "px,0)";
        light.current.style.opacity = "1";
      }
      if (button && bounds) {
        const px = x - bounds.left,
          py = y - bounds.top;
        button.style.setProperty(
          "--magnet-x",
          Math.max(-2, Math.min(2, (px - bounds.width / 2) * 0.035)) + "px",
        );
        button.style.setProperty(
          "--magnet-y",
          Math.max(-2, Math.min(2, (py - bounds.height / 2) * 0.035)) + "px",
        );
        button.style.setProperty("--spot-x", px + "px");
        button.style.setProperty("--spot-y", py + "px");
      }
    };
    const move = (event) => {
      if (!enabled || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      const next = event.target.closest?.(".primary-btn,.button-primary");
      if (next !== button) {
        resetButton();
        if (next && !next.disabled) {
          button = next;
          bounds = next.getBoundingClientRect();
        }
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      resetButton();
      if (light.current) light.current.style.opacity = "0";
    };
    const configure = () => {
      enabled = Boolean(desktop?.matches && !reduced?.matches);
      leave();
    };
    configure();
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, true);
    window.addEventListener("resize", leave);
    reduced?.addEventListener?.("change", configure);
    desktop?.addEventListener?.("change", configure);
    return () => {
      leave();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave, true);
      window.removeEventListener("resize", leave);
      reduced?.removeEventListener?.("change", configure);
      desktop?.removeEventListener?.("change", configure);
      transition.current?.skipTransition?.();
    };
  }, []);
  const route = (event) => {
    if (
      !document.startViewTransition ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = event.target.closest?.("a[href]");
    if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, window.location.href);
    if (
      url.origin !== window.location.origin ||
      url.pathname === window.location.pathname
    )
      return;
    event.preventDefault();
    transition.current?.skipTransition?.();
    try {
      transition.current = document.startViewTransition(() =>
        flushSync(() => navigate(url.pathname + url.search + url.hash)),
      );
      transition.current.finished?.catch?.(() => {});
    } catch {
      navigate(url.pathname + url.search + url.hash);
    }
  };
  return (
    <div className="ambient-canvas" ref={root} onClickCapture={route}>
      <div className="ambient-ribbons" aria-hidden="true" />
      <div className="cursor-light" ref={light} aria-hidden="true" />
      {children}
    </div>
  );
}
