import React, { useState } from "react";

interface Metric {
  number: string;
  label: string;
  sub: string;
  icon: string;
}

interface Pillar {
  icon: string;
  badge: string;
  title: string;
  desc: string;
  tags: string[];
}

const METRICS: Metric[] = [
  {
    number: "1+",
    label: "Years Experience",
    sub: "Imperial Info System",
    icon: "fa-solid fa-briefcase",
  },
  {
    number: "5+",
    label: "Production Projects",
    sub: "Client & Scaled Web Apps",
    icon: "fa-solid fa-code-branch",
  },
  {
    number: "8.0",
    label: "CGPA Distinction",
    sub: "Anna University (B.E. CSE)",
    icon: "fa-solid fa-graduation-cap",
  },
  {
    number: "10+",
    label: "Technologies",
    sub: "Full-Stack Mastery",
    icon: "fa-solid fa-cubes-stacked",
  },
];

const PILLARS: Pillar[] = [
  {
    icon: "fa-solid fa-layer-group",
    badge: "Architecture",
    title: "Clean Full-Stack Architecture",
    desc: "Designing decoupled, maintainable systems using NestJS, Spring Boot, and React with TypeScript. Emphasizing SOLID principles and clean separation of concerns.",
    tags: ["NestJS", "Spring Boot", "React", "TypeScript"],
  },
  {
    icon: "fa-solid fa-database",
    badge: "Persistence",
    title: "Relational Database Design",
    desc: "Schema normalization (3NF), complex SQL indexing, query optimization, and ACID transactional integrity across PostgreSQL and MySQL instances.",
    tags: ["PostgreSQL", "MySQL", "Indexing", "ACID"],
  },
  {
    icon: "fa-solid fa-shield-halved",
    badge: "Security",
    title: "Defensive API & Security Design",
    desc: "Implementing granular RBAC access controls, stateless JWT authentication, validation pipes, centralized exception filters, and proactive rate limiting.",
    tags: ["JWT", "RBAC", "RESTful APIs", "Validation"],
  },
  {
    icon: "fa-solid fa-bolt",
    badge: "Execution",
    title: "Agile & Fast Delivery",
    desc: "Sprint-driven development, automated CI/CD readiness, proactive code reviews, Git workflows, and delivering high-uptime business value continuously.",
    tags: ["Agile/Scrum", "Git Workflows", "CI/CD", "Optimization"],
  },
];

const INFO_ITEMS = [
  { label: "Role", value: "Full Stack Developer", icon: "fa-solid fa-laptop-code" },
  { label: "Company", value: "Imperial Info System", icon: "fa-regular fa-building" },
  { label: "Education", value: "B.E. CSE (8.0 CGPA)", icon: "fa-solid fa-graduation-cap" },
  { label: "University", value: "Anna University", icon: "fa-solid fa-building-columns" },
  { label: "Location", value: "Nagercoil, Tamil Nadu", icon: "fa-solid fa-location-dot" },
  { label: "Languages", value: "English, Tamil", icon: "fa-solid fa-language" },
];

const CORE_STACK_PREVIEW = [
  "NestJS",
  "Spring Boot",
  "React 19",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "Node.js",
  "Docker",
];

export const About: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <section id="about" className="py-section section-alt about-section-pro">
      <div className="container">
        {/* Section Header */}
        <div className="section-title wow fadeIn">
          <span className="pro-chip">
            <i className="fa-solid fa-sparkles me-2"></i>BIOGRAPHY &amp; ARCHITECTURE
          </span>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Engineering Story &amp; Mindset</h2>
          </div>
          <p className="section-desc">
            A dedicated Full Stack Developer combining structured backend architecture with intuitive, high-performance user experiences.
          </p>
        </div>

        {/* 1. Bento Metrics Banner */}
        <div className="about-bento-metrics">
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className="bento-metric-card wow fadeInUp hover-this"
              data-delay={`${0.1 + idx * 0.08}s`}
            >
              <div className="bento-metric-icon">
                <i className={metric.icon}></i>
              </div>
              <div className="bento-metric-content">
                <span className="bento-metric-number">{metric.number}</span>
                <span className="bento-metric-label">{metric.label}</span>
                <span className="bento-metric-sub">{metric.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Main Bento Dual-Card Section */}
        <div className="about-bento-grid">
          {/* Bento Tile Left: Narrative Bio & Spotlight */}
          <div className="bento-hero-card wow angle-left" data-delay="0.2s">
            <div className="bento-card-glow"></div>
            <div>
              <div className="bento-badge-status">
                <span className="pulse-dot"></span> Available for Opportunities
              </div>
              <h3 className="bento-hero-headline">
                Crafting <span className="highlight-text">modular backend logic</span> &amp; scalable web systems.
              </h3>
              <p className="bento-hero-text">
                I am a Full Stack Developer with practical engineering experience building web platforms across the <strong>Java</strong> and <strong>Node/NestJS</strong> ecosystems. From designing normalized entity relationships in <strong>PostgreSQL</strong> and <strong>MySQL</strong> to implementing reactive, clean dashboards with <strong>React</strong> and <strong>TypeScript</strong>, I take pride in building software that is maintainable, secure, and performant.
              </p>
              <p className="bento-hero-text">
                Currently working at <strong>Imperial Info System</strong>, I collaborate on client applications, optimize SQL database queries, build reusable component architectures, and automate communication pipelines.
              </p>

              {/* Core Stack Mini-Pills */}
              <div className="bento-tech-preview">
                <span className="bento-tech-label">Primary Stack:</span>
                {CORE_STACK_PREVIEW.map((tech) => (
                  <span key={tech} className="bento-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="bento-actions-row">
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

          {/* Bento Tile Right: Profile Dossier & Direct One-Click Copy Triggers */}
          <div className="bento-dossier-card wow angle-right" data-delay="0.25s">
            <div>
              <div className="bento-dossier-header">
                <span className="bento-dossier-title">
                  <i className="fa-solid fa-fingerprint"></i> Profile Dossier
                </span>
                <span className="bento-dossier-status">
                  <i className="fa-solid fa-shield-check me-1"></i> Verified
                </span>
              </div>

              {/* Quick Profile Attribute Grid */}
              <div className="bento-info-list">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label} className="bento-info-row">
                    <div className="bento-info-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="bento-info-text">
                      <span className="bento-info-label">{item.label}</span>
                      <span className="bento-info-val" title={item.value}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Quick-Copy Triggers for Email & Phone */}
            <div className="bento-contact-triggers">
              {/* Email Card */}
              <div
                className="bento-copy-card hover-this"
                onClick={() => handleCopy("email", "sshreyas471@gmail.com")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCopy("email", "sshreyas471@gmail.com");
                  }
                }}
                aria-label="Copy email address"
              >
                <div className="bento-copy-left">
                  <div className="bento-copy-icon">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <div className="bento-copy-info">
                    <span className="bento-copy-title">Email Address</span>
                    <span className="bento-copy-val">sshreyas471@gmail.com</span>
                  </div>
                </div>
                <span className={`bento-copy-badge ${copiedKey === "email" ? "is-copied" : ""}`}>
                  <i
                    className={
                      copiedKey === "email" ? "fa-solid fa-check text-success" : "fa-regular fa-copy"
                    }
                  ></i>{" "}
                  {copiedKey === "email" ? "Copied" : "Copy"}
                </span>
              </div>

              {/* Phone Card */}
              <div
                className="bento-copy-card hover-this"
                onClick={() => handleCopy("phone", "+91 8248530828")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCopy("phone", "+91 8248530828");
                  }
                }}
                aria-label="Copy phone number"
              >
                <div className="bento-copy-left">
                  <div className="bento-copy-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="bento-copy-info">
                    <span className="bento-copy-title">Phone Number</span>
                    <span className="bento-copy-val">+91 8248530828</span>
                  </div>
                </div>
                <span className={`bento-copy-badge ${copiedKey === "phone" ? "is-copied" : ""}`}>
                  <i
                    className={
                      copiedKey === "phone" ? "fa-solid fa-check text-success" : "fa-regular fa-copy"
                    }
                  ></i>{" "}
                  {copiedKey === "phone" ? "Copied" : "Copy"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Technical Pillars Bento Grid (4 Cards) */}
        <div className="bento-pillars-header wow fadeInUp" data-delay="0.15s">
          <span className="pro-chip">
            <i className="fa-solid fa-code me-2"></i>ENGINEERING PILLARS
          </span>
          <h3 className="bento-pillars-title">Architectural Standards &amp; Philosophy</h3>
        </div>

        <div className="about-bento-pillars">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bento-pillar-card wow fadeInUp hover-this"
              data-delay={`${0.2 + idx * 0.08}s`}
            >
              <div className="bento-pillar-top">
                <div className="bento-pillar-icon">
                  <i className={pillar.icon}></i>
                </div>
                <span className="bento-pillar-badge">{pillar.badge}</span>
              </div>
              <h4 className="bento-pillar-title">{pillar.title}</h4>
              <p className="bento-pillar-desc">{pillar.desc}</p>
              <div className="bento-pillar-tags">
                {pillar.tags.map((t) => (
                  <span key={t} className="bento-pillar-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;