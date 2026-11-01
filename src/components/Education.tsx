import React from "react";
import { EDUCATION } from "../data/portfolioData";

const Education: React.FC = () => (
  <section id="education" className="py-section wow section-land">
    <div className="container">
      <div className="section-title wow fadeIn">
        <h6 className="section-subtitle">Academics</h6>
        <div className="d-rotate">
          <h2 className="section-heading rotate-text">Educational Qualifications</h2>
        </div>
        <p className="section-desc">Strong academic foundation in computer science and problem-solving.</p>
      </div>

      <div className="edu-grid">
        {EDUCATION.map((edu, idx) => {
          const angleClass = idx % 2 === 0 ? "angle-left" : "angle-right";
          return (
            <div
              key={idx}
              className={`edu-card wow ${angleClass} tilt-card hover-this`}
              data-delay={`${idx * 0.16}s`}
            >
              <div className="edu-header">
                <div>
                  <span className="edu-badge" style={{ background: edu.badgeColor }}>
                    {edu.badge}
                  </span>
                  <h4 className="fw-bold mb-1">{edu.degree}</h4>
                  <h6 className="text-primary">{edu.field}</h6>
                </div>
                <div className="scores-col">
                  {edu.scores.map((s) => (
                    <span key={s.label} className="score-pill">
                      {s.label}: {s.value}
                    </span>
                  ))}
                </div>
              </div>
              <hr />
              {edu.details.map((d, i) => (
                <p key={i} className="text-muted mb-2">
                  <i className={`${d.icon} text-primary me-2`}></i>
                  {d.text}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Education;