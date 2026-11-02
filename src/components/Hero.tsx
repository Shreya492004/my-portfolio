import React, { useRef, useEffect, useState } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { TYPING_PHRASES, STATS, SOCIAL_LINKS } from "../data/portfolioData";

interface AnimatedNumberProps {
  val: string;
  trigger: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ val, trigger }) => {
  const [display, setDisplay] = useState(val);

  useEffect(() => {
    if (!trigger) return;

    // Parse numeric part and suffix
    const match = val.match(/^([\d.]+)(.*)$/);
    if (!match) return;

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetNum * eased;

      if (isFloat) {
        setDisplay(currentVal.toFixed(1) + suffix);
      } else {
        setDisplay(Math.floor(currentVal) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(val);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, val]);

  return <span>{trigger ? display : val}</span>;
};

const Hero: React.FC = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  useTypingEffect(TYPING_PHRASES, typingRef);

  const [counted, setCounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          setCounted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-role">
              <span className="pulse-dot"></span> Available for Opportunities
            </div>

            <div className="hero-name-lockup">
              <p className="hero-role">FULL STACK DEVELOPER</p>
              <h1 className="hero-title hero-name" aria-label="Shreya S.">
                <span className="hero-name-line hero-name-line--solid" aria-hidden="true">
                  {Array.from("Shreya\u00a0S.").map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="hero-name-letter"
                      style={{ animationDelay: `${index * 0.12}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            <h2 className="typing-container">
              <span ref={typingRef} className="typing-text"></span>
              <span className="cursor">&nbsp;</span>
            </h2>

            <p className="hero-desc">
              Full Stack Developer building robust web systems using{" "}
              <strong>Java, Spring Boot, React, NestJS, Node.js</strong>, and modern databases.
              Currently working on real-world web applications and turning complex requirements into clean architectures.
            </p>

            <div className="hero-btns">
              <a
                href="#contact"
                className="btn btn-primary-custom hover-this"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Hire Me
              </a>
              <a href="/Shreya S.pdf" download="Shreya S.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom hover-this">
                Download Resume
              </a>
              <a
                href="#projects"
                className="btn btn-dark-custom hover-this"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                View Projects
              </a>
            </div>

            <div className="hero-stats" ref={statsRef}>
              {STATS.map((stat) => (
                <div key={stat.label} className="counter-box hover-this">
                  <h3>
                    <AnimatedNumber val={stat.value} trigger={counted} />
                  </h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="social-links">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover-this"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-image-wrapper hover-this">
              <div className="hero-img-frame">
                <img
                  src="/shry-cutout-clean.png"
                  className="hero-img"
                  alt="Shreya - Full Stack Developer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;