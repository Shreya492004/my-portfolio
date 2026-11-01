import React, { useRef, useEffect, useState } from "react";

export const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const trackHologram = (event: React.PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    section.style.setProperty("--holo-x", `${event.clientX - bounds.left}px`);
    section.style.setProperty("--holo-y", `${event.clientY - bounds.top}px`);
  };

  const resetHologram = () => {
    sectionRef.current?.style.setProperty("--holo-x", "50%");
    sectionRef.current?.style.setProperty("--holo-y", "40%");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          // Re-triggerable when scrolling out
          const rect = entry.boundingClientRect;
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            setInView(false);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-page-section ${inView ? "page-zoom-enter" : "page-zoom-initial"}`}
      id="about"
      aria-labelledby="about-title"
      onPointerMove={trackHologram}
      onPointerLeave={resetHologram}
    >
      <div className="container about-page-container">
        {/* Page Tag Indicator */}
        <div className="about-page-tag">
          <span className="about-page-number">01</span>
          <span className="about-page-divider">/</span>
          <span className="about-page-category">PROFILE &amp; PHILOSOPHY</span>
        </div>

        {/* Full-Stack Software Developer Content */}
        <div className="about-page-content">
          <div className="about-role-pill">
            <span className="pulse-dot"></span> Full Stack Software Developer
          </div>

          <h2 className="about-page-headline" id="about-title">
            Architecting <span className="highlight-gradient">modular backend systems</span>, resilient APIs, and responsive digital interfaces.
          </h2>

          <div className="about-page-body">
            <p>
              I am a passionate Full Stack Developer with practical engineering experience building production-grade web systems across the <strong>Java</strong>, <strong>NestJS</strong>, and <strong>React</strong> ecosystems. I specialize in designing structured REST APIs, optimizing relational data pipelines in <strong>PostgreSQL</strong> and <strong>MySQL</strong>, and crafting fluid, accessible client interfaces in <strong>TypeScript</strong>.
            </p>
            <p>
              I am currently working at <strong>Imperial Info System</strong>, contributing to customer-facing platforms, database design, backend APIs, and reliable full-stack workflows.
            </p>
          </div>

          {/* Technical Focus Chips */}
          <div className="about-focus-tags">
            <span className="focus-tag">
              <i className="fa-solid fa-code"></i> Full Stack Engineering
            </span>
            <span className="focus-tag">
              <i className="fa-regular fa-building"></i> Imperial Info System
            </span>
            <span className="focus-tag">
              <i className="fa-solid fa-server"></i> Java &amp; Spring Boot
            </span>
            <span className="focus-tag">
              <i className="fa-solid fa-feather"></i> NestJS &amp; Node.js
            </span>
            <span className="focus-tag">
              <i className="fab fa-react"></i> React &amp; TypeScript
            </span>
            <span className="focus-tag">
              <i className="fa-solid fa-database"></i> PostgreSQL &amp; MySQL
            </span>
          </div>

          {/* Action CTAs */}
          <div className="about-page-actions">
            <a
              className="btn btn-primary-custom hover-this"
              href="/Shreya S.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-file-pdf me-2"></i>
              View Full Resume
            </a>

            <a
              className="btn btn-dark-custom hover-this"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <i className="fa-regular fa-paper-plane me-2"></i>
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;