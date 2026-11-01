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
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for stats count-up
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

  // Geekfolio mouse-tracking parallax for hero decorative elements
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.04;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.04;
    };

    const updateParallax = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translate3d(${-currentX * 0.8}px, ${-currentY * 0.8}px, 0)`;
      }
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${currentX * 1.5}px, ${currentY * 1.5}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-role">
              <span className="pulse-dot"></span> Available for Opportunities
            </div>

            <div className="d-rotate animated">
              <h1 className="hero-title rotate-text">
                Hello, I&apos;m <span className="highlight-text">Shreya</span>
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
            <div className="hero-image-wrapper" ref={heroImageRef}>
              <div className="blob-bg" ref={blobRef}></div>
              
              {/* Floating Tech Badges */}
              <div className="hero-float-badge float-top-left float-anim">
                <i className="fa-solid fa-code text-primary"></i>
                <span>Full Stack Dev</span>
              </div>
              <div className="hero-float-badge float-bottom-right float-anim-rev">
                <i className="fa-solid fa-feather text-primary"></i>
                <span>NestJS &amp; Spring Boot</span>
              </div>
              
              <div className="hero-img-frame">
                <img
                  src="/shryportfolio.jpeg"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"; }}
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