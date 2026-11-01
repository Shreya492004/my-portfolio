import React, { useEffect, useRef } from "react";

interface UpwardDot {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  trailLength: number;
  phase: number;
  sparkle: boolean;
  alpha: number;
  baseAlpha: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const DOT_PALETTE = [
  { core: "rgba(99, 102, 241, ", glow: "rgba(99, 102, 241, 0.24)" },
  { core: "rgba(6, 182, 212, ", glow: "rgba(6, 182, 212, 0.28)" },
  { core: "rgba(168, 85, 247, ", glow: "rgba(168, 85, 247, 0.22)" },
  { core: "rgba(34, 211, 238, ", glow: "rgba(34, 211, 238, 0.24)" },
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

    // Subtle, small glowing dots moving gently from bottom to top
    const count = Math.min(Math.floor((width * height) / 48000), 30);
    const dots: UpwardDot[] = [];

    for (let i = 0; i < count; i++) {
      const palette = DOT_PALETTE[Math.floor(Math.random() * DOT_PALETTE.length)];
      const baseAlpha = 0.18 + Math.random() * 0.2;
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.9 + Math.random() * 1.1,
        vy: -0.28 - Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.18,
        trailLength: 8 + Math.random() * 17,
        phase: Math.random() * Math.PI * 2,
        sparkle: Math.random() > 0.72,
        alpha: baseAlpha,
        baseAlpha,
        color: palette.core,
        glowColor: palette.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
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

      dots.forEach((dot) => {
        dot.y += dot.vy;
        dot.phase += dot.pulseSpeed;
        dot.pulsePhase += dot.pulseSpeed;
        dot.x += dot.vx + Math.sin(dot.phase) * 0.14;

        // Wrap holographic streaks from top to bottom.
        if (dot.y < -10) {
          dot.y = height + 10;
          dot.x = Math.random() * width;
        }

        const pulse = Math.sin(dot.pulsePhase) * 0.08;
        const currentAlpha = Math.max(0.08, Math.min(0.45, dot.baseAlpha + pulse));
        const tailX = dot.x - dot.vx * dot.trailLength * 2;
        const tailY = dot.y - dot.vy * dot.trailLength;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(dot.x, dot.y);
        ctx.strokeStyle = dot.glowColor;
        ctx.lineWidth = dot.radius * 1.4;
        ctx.lineCap = "round";
        ctx.shadowColor = dot.glowColor;
        ctx.shadowBlur = 7;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}${Math.min(0.85, currentAlpha + 0.25)})`;
        ctx.fill();

        if (dot.sparkle) {
          ctx.translate(dot.x, dot.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
          ctx.fillRect(-dot.radius * 0.55, -dot.radius * 0.55, dot.radius * 1.1, dot.radius * 1.1);
        }
        ctx.restore();
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
