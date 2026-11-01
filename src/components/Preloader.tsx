import React, { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onFinish?: () => void;
}

interface HoloDot {
  x: number;
  y: number;
  z: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulsePhase: number;
}

const HOLO_COLORS = [
  { core: "rgba(99, 102, 241, ", glow: "rgba(99, 102, 241, 0.45)" },   // Indigo
  { core: "rgba(6, 182, 212, ", glow: "rgba(6, 182, 212, 0.55)" },    // Cyan
  { core: "rgba(168, 85, 247, ", glow: "rgba(168, 85, 247, 0.4)" },   // Electric Violet
  { core: "rgba(20, 184, 166, ", glow: "rgba(20, 184, 166, 0.45)" },  // Teal
];

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const finishedRef = useRef(false);
  const [stage, setStage] = useState<"loading" | "zoomReveal" | "done">(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "done";
    }
    return "loading";
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating Holographic Dots Background
  useEffect(() => {
    if (stage === "done") return;
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

    const dotCount = Math.min(Math.floor((width * height) / 24000), 50);
    const dots: HoloDot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const colorScheme = HOLO_COLORS[Math.floor(Math.random() * HOLO_COLORS.length)];
      const z = 0.3 + Math.random() * 0.7;
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (1.2 + Math.random() * 2.6) * z,
        vx: (Math.random() - 0.5) * 0.4 * z,
        vy: (-0.15 - Math.random() * 0.35) * z, // gentle upward drift
        alpha: 0.25 + Math.random() * 0.45,
        color: colorScheme.core,
        glowColor: colorScheme.glow,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.pulsePhase += dot.pulseSpeed;

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        const pulse = Math.sin(dot.pulsePhase) * 0.2;
        const currentAlpha = Math.max(0.1, Math.min(0.9, dot.alpha + pulse));

        const glowRad = dot.radius * (4 + dot.z * 2);
        const grad = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          glowRad
        );
        grad.addColorStop(0, `${dot.color}${currentAlpha * 0.85})`);
        grad.addColorStop(0.4, dot.glowColor);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glowRad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = dot.glowColor;
        ctx.shadowBlur = 6 * dot.z;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stage]);

  // Animate counter from 0 to 100
  useEffect(() => {
    if (stage === "done") {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
      }
      return;
    }
    if (stage !== "loading") return;

    const duration = 1200;
    const start = performance.now();
    let animationFrame = 0;

    const countLoop = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setPercent(p);
      if (p < 100) {
        animationFrame = requestAnimationFrame(countLoop);
      }
    };

    animationFrame = requestAnimationFrame(countLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [stage, onFinish]);

  // Transition: smoothly zoom in and reveal website underneath
  useEffect(() => {
    if (stage !== "loading") return;

    const zoomTimer = window.setTimeout(() => {
      setStage("zoomReveal");
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
      }
    }, 1550);

    return () => window.clearTimeout(zoomTimer);
  }, [stage, onFinish]);

  useEffect(() => {
    if (stage !== "zoomReveal") return;
    const exitTimer = window.setTimeout(() => setStage("done"), 900);
    return () => window.clearTimeout(exitTimer);
  }, [stage]);

  if (stage === "done") return null;

  const letters = Array.from("Shreya S.");

  return (
    <div
      className={`loader-wrap ${stage === "zoomReveal" ? "loader-zoom-out" : ""}`}
      aria-live="polite"
    >
      {/* Floating Holographic Background Dots */}
      <canvas ref={canvasRef} className="loader-holo-canvas" aria-hidden="true" />

      <div className={`loader-wrap-heading ${stage === "zoomReveal" ? "hide-text" : ""}`}>
        <div className="loader-badge">
          <span className="star-icon">✦</span> PORTFOLIO 2026
        </div>
        <div className="loader-sub">FULL STACK DEVELOPER</div>
        <div className="load-text">
          {letters.map((char, idx) => (
            <span key={idx} style={{ animationDelay: `${idx * 0.12}s` }}>
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </div>
        <div className="loader-counter-bar">
          <div className="loader-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
        <div className="loader-percent">{percent}%</div>
      </div>
    </div>
  );
};

export default Preloader;
