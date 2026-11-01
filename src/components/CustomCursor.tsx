import React, { useEffect, useState, useRef } from "react";

/**
 * Geekfolio Custom Cursor:
 * Features a central dot and trailing circle with mix-blend-mode difference.
 * Expands to cursor-active state when hovering over links, buttons, and interactive cards.
 * Automatically disabled on touch / mobile devices.
 */
export const CustomCursor: React.FC = () => {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Spring/lerp trailing for circle
    const loop = () => {
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * 0.18;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * 0.18;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    // Hover detection on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, .btn, .theme-toggle-btn, .counter-box, .skill-card, .project-card, .timeline-card, .cursor-pointer, input, textarea"
      );
      setActive(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={circleRef}
        className={`custom-cursor-circle ${visible ? "is-visible" : ""} ${active ? "cursor-active" : ""}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
