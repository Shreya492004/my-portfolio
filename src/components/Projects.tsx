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
        <video width="100%" controls autoPlay>
          <source src={src} type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      </div>
    </div>
  </div>
);

// Featured projects showcased in alternating browser mockups (01 to 05)
const FEATURED_PROJECTS = [
  {
    ...PROJECTS[0],
    domain: "mydoo.in",
    liveUrl: "https://mydoo.in/",
  },
  {
    ...PROJECTS[1],
    domain: "bougainville.resort",
    liveUrl: "https://shreya492004.github.io/Bougainville-resort/",
  },
  {
    ...PROJECTS[2],
    domain: "londonstar.edu",
    liveUrl: "https://shreya492004.github.io/tution-12-8-26/",
  },
  {
    ...PROJECTS[3],
    domain: "conferhub.net",
    liveUrl: "http://66u.ff8.mytemp.website/dr/conferenceManagement_final/home.php",
  },
  {
    ...PROJECTS[4],
    domain: "health-schedule.app",
    liveUrl: "https://github.com/Shreya492004",
  },
];

// More Work rows (06, 07, 08)
const MORE_WORK = [
  {
    index: "06",
    name: "Real-Time Traffic Prediction & Congestion Control",
    category: "AI & Computer Vision Model",
    tags: ["Python", "OpenCV", "XGBoost", "Flask"],
    link: "https://github.com/Shreya492004/Smart-Traffic-Prediction",
    linkText: "View on GitHub",
  },
  {
    index: "07",
    name: "Imperial Info System Client Modules",
    category: "Enterprise Full Stack Web Platform",
    tags: ["NestJS", "React", "TypeScript", "PostgreSQL"],
    link: "#contact",
    linkText: "Discuss Architecture",
  },
  {
    index: "08",
    name: "Conference Reviewer Pipeline & RBAC Auth Gate",
    category: "Security & Relational Data Tier",
    tags: ["PHP", "MySQL", "RBAC", "Bootstrap"],
    link: "https://github.com/Shreya492004",
    linkText: "View Code",
  },
];

export const Projects: React.FC = () => {
  const [modal, setModal] = useState<{ title: string; src: string } | null>(null);

  return (
    <section className="work work__section" id="projects" aria-labelledby="work-title">
      {/* Section Header */}
      <div className="container work__header wow fadeIn">
        <p className="label section-label">
          <span className="section-label__index">02</span>
          <span>Selected work</span>
        </p>
        <h2 className="display work__title" id="work-title">
          Selected work<span className="accent">.</span>
        </h2>
        <p className="work__note">
          Production web platforms, client portals, responsive applications, and full-stack architecture built with modern frameworks and robust databases.
        </p>
      </div>

      {/* Alternating Stacked Project Cards */}
      <div className="work__stack">
        {FEATURED_PROJECTS.map((project, idx) => {
          const isFlip = idx % 2 === 1;
          const numberStr = `0${idx + 1}`;
          const isVideo = project.demo?.type === "video";

          return (
            <article
              key={project.title}
              className={`project ${isFlip ? "project--flip" : ""} wow fadeIn`}
              data-delay={`${0.15 + (idx % 2) * 0.1}s`}
              aria-labelledby={`project-${idx}`}
            >
              {/* Massive Ghost Number in background */}
              <span className="project__ghost" aria-hidden="true">
                {numberStr}
              </span>

              <div className="container project__inner">
                {/* Project Info Column */}
                <div className="project__info">
                  <p className="label project__meta">
                    <span className="project__number">{numberStr}</span>
                    <span className="project__total">/ 05</span>
                    <span className="project__status project__status--live">
                      <span className="status-dot"></span> Live
                    </span>
                  </p>

                  <h3 className="project__title" id={`project-${idx}`}>
                    {project.title}
                  </h3>

                  <p className="label project__category">{project.tag} Platform</p>

                  <p className="project__description">{project.description}</p>

                  {/* Technology Tags */}
                  <ul className="tags" aria-label="Technologies">
                    {project.tech.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Arrow Links */}
                  <div className="project__links">
                    {isVideo ? (
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
                        href={project.liveUrl}
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
                    )}

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

                {/* Browser Mockup Preview Column */}
                <div className="project__preview">
                  <a
                    className="preview"
                    href={project.liveUrl}
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
                    {/* Browser Window Header Bar */}
                    <span className="preview__bar" aria-hidden="true">
                      <span className="preview__dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      <span className="preview__domain">{project.domain}</span>
                    </span>

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

      {/* More Work Index Table (Pravin Sam Style) */}
      <div className="container work-index wow fadeInUp" data-delay="0.2s">
        <h3 className="label work-index__title" id="more-work">
          More work &amp; Research
        </h3>

        <ul className="work-index__list">
          {MORE_WORK.map((item) => (
            <li key={item.index} className="work-row">
              <span className="work-row__index">{item.index}</span>

              <div className="work-row__heading">
                <h4 className="work-row__name">{item.name}</h4>
                <p className="work-row__category">{item.category}</p>
              </div>

              <ul className="work-row__tags" aria-label="Technologies">
                {item.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="work-row__action">
                <a
                  className="link-arrow"
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.linkText}
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
            </li>
          ))}
        </ul>

        {/* More on GitHub CTA */}
        <div className="work-index__footer">
          <a
            className="work-index__more hover-this"
            href="https://github.com/Shreya492004"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub
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

      {modal && <VideoModal title={modal.title} src={modal.src} onClose={() => setModal(null)} />}
    </section>
  );
};

export default Projects;