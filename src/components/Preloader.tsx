import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onFinish?: () => void;
}

/**
 * Geekfolio SVG Morphing Preloader with Dynamic Angular Reveal:
 * - Animated percentage progress counter (0 -> 100%)
 * - Staggered glowing letter title
 * - SVG Wave Morphing (Curve -> Flat)
 * - Triggers 3D perspective angular entrance for the page
 */
export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState<"loading" | "morphing" | "sliding" | "done">(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "done";
    }
    return "loading";
  });

  const [pathD, setPathD] = useState("M0,1005S175,995,500,995s500,5,500,5V0H0Z");

  // Animate counter from 0 to 100
  useEffect(() => {
    if (stage === "done") {
      onFinish?.();
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const countLoop = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setPercent(p);
      if (p < 100) {
        requestAnimationFrame(countLoop);
      }
    };

    requestAnimationFrame(countLoop);
  }, [stage, onFinish]);

  useEffect(() => {
    if (stage === "done") return;

    // Step 1: Counter & letter pulse runs for 1.3s
    const textTimer = setTimeout(() => {
      setStage("morphing");
      // Step 2: SVG morphs into curve
      setPathD("M0 502S175 272 500 272s500 230 500 230V0H0Z");

      const flatTimer = setTimeout(() => {
        // Morphs into flat top
        setPathD("M0 2S175 1 500 1s500 1 500 1V0H0Z");
        setStage("sliding");

        // Notify parent / trigger angular page reveal
        onFinish?.();

        const doneTimer = setTimeout(() => {
          setStage("done");
        }, 650);

        return () => clearTimeout(doneTimer);
      }, 450);

      return () => clearTimeout(flatTimer);
    }, 1300);

    return () => clearTimeout(textTimer);
  }, [stage, onFinish]);

  if (stage === "done") return null;

  const letters = ["S", "H", "R", "E", "Y", "A"];

  return (
    <div className={`loader-wrap ${stage === "sliding" ? "slide-out" : ""}`}>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="loader-svg">
        <path d={pathD} className="loader-path" />
      </svg>
      <div className={`loader-wrap-heading ${stage !== "loading" ? "hide-text" : ""}`}>
        <div className="loader-badge">
          <span className="star-icon">✦</span> PORTFOLIO 2026
        </div>
        <div className="load-text">
          {letters.map((char, idx) => (
            <span key={idx} style={{ animationDelay: `${idx * 0.08}s` }}>
              {char}
            </span>
          ))}
          <span className="text-primary">.</span>
        </div>
        <div className="loader-counter-bar">
          <div className="loader-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
        <div className="loader-percent">{percent}%</div>
        <div className="loader-sub">Full Stack Developer • Java • Spring Boot • NestJS</div>
      </div>
    </div>
  );
};

export default Preloader;
