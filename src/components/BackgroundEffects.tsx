import React, { useEffect, useRef } from "react";

interface UpwardDot {
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

const DOT_PALETTE = [
  { core: "rgba(99, 102, 241, ", glow: "rgba(99, 102, 241, 0.18)" },
  { core: "rgba(6, 182, 212, ", glow: "rgba(6, 182, 212, 0.2)" },
  { core: "rgba(168, 85, 247, ", glow: "rgba(168, 85, 247, 0.14)" },
  { core: "rgba(20, 184, 166, ", glow: "rgba(20, 184, 166, 0.16)" },
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
    const count = Math.min(Math.floor((width * height) / 42000), 30);
    const dots: UpwardDot[] = [];

    for (let i = 0; i < count; i++) {
      const palette = DOT_PALETTE[Math.floor(Math.random() * DOT_PALETTE.length)];
      const z = 0.3 + Math.random() * 0.7;
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (1.2 + Math.random() * 2.6) * z,
        vx: (Math.random() - 0.5) * 0.2 * z,
        vy: (-0.08 - Math.random() * 0.18) * z,
        alpha: 0.1 + Math.random() * 0.12,
        color: palette.core,
        glowColor: palette.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
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
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.pulsePhase += dot.pulseSpeed;

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        const pulse = Math.sin(dot.pulsePhase) * 0.035;
        const currentAlpha = Math.max(0.04, Math.min(0.24, dot.alpha + pulse));
        const glowRadius = dot.radius * (3 + dot.z * 1.5);
        const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowRadius);
        glow.addColorStop(0, `${dot.color}${currentAlpha * 0.5})`);
        glow.addColorStop(0.4, dot.glowColor);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}${currentAlpha})`;
        ctx.shadowColor = dot.glowColor;
        ctx.shadowBlur = 3 * dot.z;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = `${dot.color}${currentAlpha * 0.55})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
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
