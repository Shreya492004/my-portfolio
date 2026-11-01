import { useEffect, useRef } from "react";

/**
 * Hook for Geekfolio magnetic hover effect (.hover-this).
 * Moves the element slightly toward the mouse cursor when hovering over it.
 */
export const useMagnetic = <T extends HTMLElement = HTMLElement>(strength: number = 25) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch/reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      const xMove = (x / w) * (strength * 2) - strength;
      const yMove = (y / h) * (strength * 2) - strength;

      el.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
      el.style.transition = "transform 0.15s ease-out";
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
};
