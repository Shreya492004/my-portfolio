import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const displayedSkills =
    activeCategory === "All"
      ? SKILL_CATEGORIES.flatMap((c) => c.skills)
      : SKILL_CATEGORIES.find((c) => c.title === activeCategory)?.skills || [];

  const getFilterLabel = (cat: string) => {
    if (cat === "Programming & Web Technologies") return "Web & Backend";
    if (cat === "Soft Skills & Methodology") return "Soft Skills";
    return cat;
  };

  return (
    <section id="skills" className="py-section skills-showcase-section">
      <div className="container">
        <div className="section-title wow fadeIn">
          <h6 className="section-subtitle">Core Capabilities</h6>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Technical &amp; Professional Skills</h2>
          </div>
          <p className="section-desc">
            Modular backend logic, scalable REST APIs, reactive frontend web platforms, and collaborative methodologies.
          </p>

          {/* Category Filter Pills */}
          <div className="skills-filter-row wow zoom-in" data-delay="0.1s">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`skill-filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {getFilterLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Falling Skills Grid - Keyed to activeCategory to trigger smooth cascade on filter change */}
        <div key={activeCategory} className="skills-falling-grid">
          {displayedSkills.map((skill, sIdx) => {
            const delay = `${(sIdx % 8) * 0.05}s`;

            return (
              <div
                key={`${activeCategory}-${skill.name}`}
                className="skill-card-animated fall-down-card hover-this"
                style={{
                  animationDelay: delay,
                  "--item-idx": sIdx,
                } as React.CSSProperties}
              >
                <div className="skill-card-glow"></div>
                <div className="skill-icon-wrap">
                  <i className={`${skill.icon} fa-2x`} style={{ color: skill.iconColor }}></i>
                </div>
                <h6 className="skill-title">{skill.name}</h6>
                {skill.subtitle && <span className="skill-desc">{skill.subtitle}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;