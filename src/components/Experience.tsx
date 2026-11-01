import React from "react";
import { EXPERIENCE } from "../data/portfolioData";

const Experience: React.FC = () => (
  <section id="experience" className="py-section section-alt experience-section wow section-land">
    <div className="container">
      <div className="section-title wow fadeIn">
        <h6 className="section-subtitle">Career &amp; Trajectory</h6>
        <div className="d-rotate">
          <h2 className="section-heading rotate-text">Work Experience &amp; Internships</h2>
        </div>
        <p className="section-desc">Hands-on production work, real client projects, and engineering training.</p>
      </div>

      <div className="timeline-container">
        {EXPERIENCE.map((item, idx) => {
          const angleClass = idx % 2 === 0 ? "angle-left" : "angle-right";
          return (
            <div
              key={idx}
              className={`timeline-item${item.featured ? " featured" : ""} wow ${angleClass}`}
              data-delay={`${idx * 0.14}s`}
            >
              <div className="timeline-marker hover-this">
                <i className={item.type === "job" ? "fa-solid fa-briefcase" : "fa-solid fa-graduation-cap"}></i>
              </div>
              <div className="timeline-card tilt-card">
                <div className="timeline-header">
                  <div>
                    <h4 className="fw-bold mb-0">{item.title}</h4>
                    <h6 className="text-primary fw-semibold mb-0">{item.company}</h6>
                  </div>
                  <span className={`period-badge ${item.featured ? "badge-primary" : "badge-secondary"}`}>
                    {item.period}
                  </span>
                </div>
                <ul className="text-muted mb-0 ps-3">
                  {item.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Experience;