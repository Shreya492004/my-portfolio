import React, { useEffect, useRef } from "react";

interface FloatingBubble {
  x: number;
  y: number;
  z: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const BUBBLE_PALETTE = [
  { core: "rgba(99, 102, 241, ", glow: "rgba(99, 102, 241, 0.08)" },
  { core: "rgba(6, 182, 212, ", glow: "rgba(6, 182, 212, 0.1)" },
  { core: "rgba(168, 85, 247, ", glow: "rgba(168, 85, 247, 0.08)" },
  { core: "rgba(20, 184, 166, ", glow: "rgba(20, 184, 166, 0.08)" },
];

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = Math.min(Math.max(Math.floor((width * height) / 28000), 18), 48);
    const bubbles: FloatingBubble[] = [];

    for (let i = 0; i < count; i++) {
      const palette = BUBBLE_PALETTE[Math.floor(Math.random() * BUBBLE_PALETTE.length)];
      const z = 0.55 + Math.random() * 0.45;
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (2 + Math.random() * 2.5) * z,
        vx: (Math.random() - 0.5) * 0.18 * z,
        vy: (-0.28 - Math.random() * 0.4) * z,
        alpha: 0.2 + Math.random() * 0.16,
        color: palette.core,
        glowColor: palette.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
      });
    }

    let animId: number;
    let isHidden = false;

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (isHidden) return;
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((bubble) => {
        bubble.pulsePhase += bubble.pulseSpeed;
        bubble.x += bubble.vx + Math.sin(bubble.pulsePhase) * 0.18;
        bubble.y += bubble.vy;

        if (bubble.x < -bubble.radius * 2) bubble.x = width + bubble.radius * 2;
        if (bubble.x > width + bubble.radius * 2) bubble.x = -bubble.radius * 2;
        if (bubble.y < -bubble.radius * 2) {
          bubble.y = height + bubble.radius * 2;
          bubble.x = Math.random() * width;
        }

        const pulse = Math.sin(bubble.pulsePhase) * 0.04;
        const currentAlpha = Math.max(0.12, Math.min(0.4, bubble.alpha + pulse));
        const glowRadius = bubble.radius * 2.8;
        const glow = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, glowRadius);
        glow.addColorStop(0, `${bubble.color}${currentAlpha * 0.16})`);
        glow.addColorStop(0.55, bubble.glowColor);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const bubbleFill = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.35,
          bubble.y - bubble.radius * 0.4,
          0,
          bubble.x,
          bubble.y,
          bubble.radius,
        );
        bubbleFill.addColorStop(0, `${bubble.color}${currentAlpha * 0.04})`);
        bubbleFill.addColorStop(0.72, `${bubble.color}${currentAlpha * 0.1})`);
        bubbleFill.addColorStop(1, `${bubble.color}${currentAlpha * 0.24})`);

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubbleFill;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${bubble.color}${currentAlpha * 0.85})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.22,
          bubble.y - bubble.radius * 0.22,
          bubble.radius * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="portfolio-ambient-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-particle-canvas" />
    </div>
  );
};

export default BackgroundEffects;
