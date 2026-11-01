import React, { useState } from "react";

export const About: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sshreyas471@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="section about about__section" id="about" aria-labelledby="about-title">
      <div className="container">
        {/* Numbered Section Label */}
        <p className="label section-label wow fadeIn">
          <span className="section-label__index">01</span>
          <span>About</span>
        </p>

        {/* Pravin Sam Inspired Dual-Column Layout */}
        <div className="about__layout">
          {/* Left Column: Bold Statement */}
          <h2 className="about__statement wow fadeInUp" id="about-title" data-delay="0.1s">
            I turn complex ideas into digital experiences that feel{" "}
            <span className="about__emphasis">simple,</span>{" "}
            <span className="about__emphasis">intuitive,</span> and{" "}
            <span className="about__emphasis">effortless.</span>
          </h2>

          {/* Right Column: Aside with Narrative Bio & Stats */}
          <div className="about__aside wow fadeInUp" data-delay="0.2s">
            <p className="about__bio">
              I&apos;m a Full Stack Developer based in Nagercoil &amp; Chennai with a strong foundation in full-stack architecture, clean coding, and scalable web platforms. I specialize in turning complex requirements into responsive, modular interfaces with <strong>React</strong> and <strong>TypeScript</strong>, supported by resilient backends in <strong>NestJS</strong>, <strong>Java Spring Boot</strong>, and <strong>PostgreSQL / MySQL</strong>.
            </p>
            <p className="about__bio">
              Currently engineering at <strong>Imperial Info System</strong>, I collaborate across live client platforms, API communication pipelines, database normalization, and automated workflows.
            </p>

            {/* Quick Dossier Chips */}
            <div className="about__dossier-chips">
              <span className="about__chip">
                <i className="fa-solid fa-laptop-code"></i> Full Stack Developer
              </span>
              <span className="about__chip">
                <i className="fa-regular fa-building"></i> Imperial Info System
              </span>
              <span className="about__chip">
                <i className="fa-solid fa-graduation-cap"></i> B.E. CSE (8.0 CGPA)
              </span>
              <span className="about__chip">
                <i className="fa-solid fa-location-dot"></i> Nagercoil &amp; Chennai
              </span>
            </div>

            {/* Stats Definition List */}
            <dl className="stats">
              <div className="stats__item">
                <dt className="label">Web Applications</dt>
                <dd className="stats__value">5+</dd>
              </div>
              <div className="stats__item">
                <dt className="label">Years of experience</dt>
                <dd className="stats__value">1+</dd>
              </div>
              <div className="stats__item">
                <dt className="label">Academic Merit</dt>
                <dd className="stats__value">8.0</dd>
              </div>
            </dl>

            {/* Action Links */}
            <div className="about__actions">
              <a
                className="link-arrow"
                href="/Shreya S.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>

              <button
                type="button"
                className={`about__copy-pill ${copied ? "is-copied" : ""}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                <i
                  className={
                    copied ? "fa-solid fa-check text-success" : "fa-regular fa-envelope"
                  }
                ></i>
                {copied ? "Email Copied!" : "sshreyas471@gmail.com"}
              </button>

              <a
                className="link-arrow link-arrow--secondary"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;