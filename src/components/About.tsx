import React, { useState } from "react";

interface Highlight {
  icon: string;
  badge: string;
  title: string;
  desc: string;
  tags: string[];
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: "fa-solid fa-layer-group",
    badge: "Core Stack",
    title: "Clean Full-Stack Architecture",
    desc: "Designing decoupled, maintainable systems using NestJS, Spring Boot, and React with TypeScript. Emphasizing SOLID principles and clean separation of concerns.",
    tags: ["NestJS", "Spring Boot", "React", "TypeScript"],
  },
  {
    icon: "fa-solid fa-database",
    badge: "Persistence",
    title: "Relational Database Design",
    desc: "Schema normalization (3NF), query optimization, indexing, and transactional integrity across enterprise PostgreSQL and MySQL instances.",
    tags: ["PostgreSQL", "MySQL", "Indexing", "ACID"],
  },
  {
    icon: "fa-solid fa-shield-halved",
    badge: "Security",
    title: "Secure API Development",
    desc: "Implementing RBAC access control, stateless JWT token authentication, request validation pipes, defensive error handling, and rate limiting.",
    tags: ["JWT", "RBAC", "RESTful APIs", "Validation"],
  },
  {
    icon: "fa-solid fa-bolt",
    badge: "Execution",
    title: "Agile & Fast Iteration",
    desc: "Sprint-driven development, automated CI/CD readiness, proactive code reviews, and delivering high-uptime business value continuously.",
    tags: ["Agile/Scrum", "Git Workflows", "CI/CD", "Optimization"],
  },
];

const INFO_ITEMS = [
  { label: "Name", value: "Shreya", icon: "fa-regular fa-user" },
  { label: "Role", value: "Full Stack Developer", icon: "fa-solid fa-laptop-code" },
  { label: "Company", value: "Imperial Info System", icon: "fa-regular fa-building" },
  { label: "Education", value: "B.E CSE (8.0 CGPA)", icon: "fa-solid fa-graduation-cap" },
  { label: "University", value: "Anna University", icon: "fa-solid fa-building-columns" },
  { label: "Location", value: "Nagercoil, Tamil Nadu", icon: "fa-solid fa-location-dot" },
  { label: "Languages", value: "English, Tamil", icon: "fa-solid fa-language" },
  { label: "Email", value: "sshreyas471@gmail.com", icon: "fa-regular fa-envelope", copyable: true },
  { label: "Phone", value: "+91 8248530828", icon: "fa-solid fa-phone", copyable: true },
];

export const About: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="about" className="py-section section-alt about-section-pro">
      <div className="container">
        {/* Section Header */}
        <div className="section-title wow fadeIn">
          <h6 className="section-subtitle">Biography &amp; Architecture</h6>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Engineering Story</h2>
          </div>
          <p className="section-desc">
            A dedicated engineer combining structured backend engineering with intuitive, responsive frontend architecture.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="about-pro-grid">
          {/* Left Column: Technical Focus Cards */}
          <div className="about-pro-left">
            <div className="about-col-header wow fadeInUp" data-delay="0.1s">
              <span className="pro-chip">
                <i className="fa-solid fa-code text-primary me-2"></i>Technical Pillars
              </span>
              <h3 className="pro-col-title">How I Build Software</h3>
            </div>

            <div className="about-highlights-stack">
              {HIGHLIGHTS.map((item, idx) => (
                <div
                  key={item.title}
                  className="pro-highlight-card wow angle-left hover-this"
                  data-delay={`${0.15 + idx * 0.08}s`}
                >
                  <div className="pro-card-glow"></div>
                  <div className="pro-card-top">
                    <div className="pro-icon-box">
                      <i className={item.icon}></i>
                    </div>
                    <span className="pro-card-badge">{item.badge}</span>
                  </div>
                  <h5 className="pro-card-title">{item.title}</h5>
                  <p className="pro-card-desc">{item.desc}</p>
                  <div className="pro-tag-list">
                    {item.tags.map((t) => (
                      <span key={t} className="pro-tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Bio & Information Terminal */}
          <div className="about-pro-right">
            {/* Bio Card */}
            <div className="pro-bio-card wow angle-right" data-delay="0.2s">
              <div className="pro-badge-status">
                <span className="pulse-dot"></span> Available for Opportunities
              </div>
              <h3 className="pro-bio-headline">
                Crafting <span className="highlight-text">modular backend logic</span> &amp; scalable web systems.
              </h3>
              <p className="text-muted pro-bio-text">
                I am a Full Stack Developer with practical engineering experience building web platforms across the Java and Node/NestJS ecosystems. From managing database entity relations with PostgreSQL/MySQL to implementing reactive, clean web dashboards with React and TypeScript, I take pride in building software that is maintainable, secure, and performant.
              </p>
              <p className="text-muted pro-bio-text">
                Currently working at <strong>Imperial Info System</strong>, I collaborate on live client applications, optimize database queries, build reusable component architectures, and automate communication pipelines.
              </p>

              {/* Quick Info Grid with Copy Buttons */}
              <div className="pro-info-grid">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label} className="pro-info-item">
                    <div className="pro-info-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="pro-info-details">
                      <span className="pro-info-label">{item.label}</span>
                      <span className="pro-info-val">{item.value}</span>
                    </div>
                    {item.copyable && (
                      <button
                        type="button"
                        className="pro-info-copy-btn"
                        onClick={() => handleCopy(item.label, item.value)}
                        title={`Copy ${item.label}`}
                        aria-label={`Copy ${item.label}`}
                      >
                        <i
                          className={
                            copiedKey === item.label
                              ? "fa-solid fa-check text-success"
                              : "fa-regular fa-copy"
                          }
                        ></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pro-actions-row">
                <a
                  href="/Shreya S.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-custom hover-this"
                >
                  <i className="fa-solid fa-file-pdf me-2"></i>View Full Resume
                </a>
                <a
                  href="#contact"
                  className="btn btn-outline-custom hover-this"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <i className="fa-regular fa-paper-plane me-2"></i>Let&apos;s Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;