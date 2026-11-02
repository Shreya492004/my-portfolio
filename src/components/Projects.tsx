import React, { useState } from "react";
import { PROJECTS } from "../data/portfolioData";

interface VideoModalProps {
  title: string;
  src: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ title, src, onClose }) => (
  <div className="modal-overlay fadeIn" onClick={onClose}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header-bar">
        <h5>{title}</h5>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
      </div>
      <div className="modal-body-box">
        <video width="100%" controls autoPlay muted playsInline preload="auto">
          <source src={src} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </div>
    </div>
  </div>
);

export const Projects: React.FC = () => {
  const [modal, setModal] = useState<{ title: string; src: string } | null>(null);

  // Smooth alternating directional scroll-reveal animation
  const getRevealClass = (idx: number) => {
    const cycle = idx % 4;
    switch (cycle) {
      case 0:
        return "project-reveal-right";
      case 1:
        return "project-reveal-left";
      case 2:
        return "project-reveal-bottom";
      case 3:
        return "project-reveal-top";
      default:
        return "project-reveal-bottom";
    }
  };

  return (
    <section className="work work__section wow section-land" id="projects" aria-labelledby="work-title">
      {/* Section Header */}
      <div className="container work__header wow fadeIn">
        <p className="label section-label">
          <span className="section-label__index">02</span>
          <span>Projects</span>
        </p>
        <h2 className="display work__title" id="work-title">
          Featured Projects<span className="accent">.</span>
        </h2>
        <p className="work__note">
          Production web platforms, client portals, responsive applications, and full-stack architecture built with modern frameworks and robust databases.
        </p>
      </div>

      {/* Stacked Project Cards with Balanced Proportions */}
      <div className="work__stack">
        {PROJECTS.map((project, idx) => {
          const isFlip = idx % 2 === 1;
          const numberStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
          const isVideo = project.demo?.type === "video";
          const revealClass = getRevealClass(idx);
          const totalStr = PROJECTS.length < 10 ? `0${PROJECTS.length}` : `${PROJECTS.length}`;

          return (
            <article
              key={project.title}
              className={`project ${isFlip ? "project--flip" : ""} ${idx === 0 ? "project--glitter-entry" : ""} wow ${revealClass}`}
              data-delay={`${0.1 + (idx % 2) * 0.08}s`}
              aria-labelledby={`project-${idx}`}
            >
              {/* Ghost Number in background */}
              <span className="project__ghost" aria-hidden="true">
                {numberStr}
              </span>

              <div className="container project__inner">
                {/* Project Info Column */}
                <div className="project__info">
                  <p className="label project__meta">
                    <span className="project__count">
                      <span className="project__number">{numberStr}</span>
                      <span className="project__total">/ {totalStr}</span>
                    </span>
                    <span className="project__status project__status--live">
                      <span className="status-dot"></span> Active
                    </span>
                  </p>

                  <h3 className="project__title" id={`project-${idx}`}>
                    {project.title}
                  </h3>

                  <p className="label project__category">{project.tag} Platform</p>

                  <p className="project__description">{project.description}</p>

                  {/* Key Contributions */}
                  {project.contributions && project.contributions.length > 0 && (
                    <ul className="project__contributions-list">
                      {project.contributions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}

                  {/* Technology Tags */}
                  <ul className="tags" aria-label="Technologies">
                    {project.tech.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Links */}
                  <div className="project__links">
                    {project.showDemoButton !== false && (isVideo ? (
                      <button
                        type="button"
                        className="link-arrow"
                        onClick={() =>
                          setModal({
                            title: (project.demo as any).demoTitle || project.title,
                            src: (project.demo as any).src,
                          })
                        }
                      >
                        Watch Demo Video
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
                      </button>
                    ) : (
                      <a
                        className="link-arrow"
                        href={(project.demo as any)?.href || project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit site
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
                    ))}

                    <a
                      className="link-arrow link-arrow--secondary"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
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

                <div className="project__preview">
                  <a
                    className="preview"
                    href={(project.demo as any)?.href || project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (isVideo) {
                        e.preventDefault();
                        setModal({
                          title: (project.demo as any).demoTitle || project.title,
                          src: (project.demo as any).src,
                        });
                      }
                    }}
                    aria-label={`Preview of ${project.title}`}
                  >
                    {/* Viewport Image Canvas */}
                    <span className="preview__viewport">
                      <img
                        className="preview__canvas"
                        src={project.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = project.fallbackImage;
                        }}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                      />
                      <span className="preview__tag-badge">{project.tag}</span>
                    </span>

                    {/* Hover Floating Action Badge */}
                    <span className="preview__cursor" aria-hidden="true">
                      {isVideo ? "Play Demo" : "Visit site"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right"
                      >
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {modal && <VideoModal title={modal.title} src={modal.src} onClose={() => setModal(null)} />}
    </section>
  );
};

export default Projects;