import React, { useEffect, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerFine.matches || reducedMotion.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    const target: CursorPosition = { x: -100, y: -100 };
    const follower: CursorPosition = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const render = () => {
      frame = 0;
      follower.x += (target.x - follower.x) * 0.18;
      follower.y += (target.y - follower.y) * 0.18;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`;
      glow.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`;

      if (visible && Math.hypot(target.x - follower.x, target.y - follower.y) > 0.25) {
        frame = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      glow.classList.add("is-visible");
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerLeave = () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
      glow.classList.remove("is-visible");
    };

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="holo-cursor-layer" aria-hidden="true">
      <span ref={glowRef} className="holo-cursor-glow" />
      <span ref={ringRef} className="holo-cursor-ring" />
      <span ref={dotRef} className="holo-cursor-dot" />
    </div>
  );
};

export default CustomCursor;
