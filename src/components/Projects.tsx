import React, { useState, useMemo } from "react";
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
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">&times;</button>
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

const CATEGORIES = ["All", "Full Stack", "Responsive Web", "EdTech", "PHP / MySQL", "Java Full Stack", "AI & ML"];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modal, setModal] = useState<{ title: string; src: string } | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.tag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(p.tag.toLowerCase())
    );
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-section section-alt projects-showcase-section">
      <div className="container">
        <div className="section-title wow fadeIn">
          <h6 className="section-subtitle">Portfolio</h6>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Featured Projects</h2>
          </div>
          <p className="section-desc">
            Production web platforms, client portals, responsive applications, and full-stack architecture.
          </p>

          {/* Filter Tabs */}
          <div className="portfolio-filter-tabs wow zoom-in" data-delay="0.1s">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards with High-Res Banner Images */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => {
            const angleType = idx % 2 === 0 ? "angle-left" : "angle-right";
            return (
              <div
                key={project.title}
                className={`project-card wow ${angleType} tilt-card`}
                data-delay={`${(idx % 3) * 0.12}s`}
              >
                {/* 16:9 Banner Image Container */}
                <div className="project-banner-wrapper">
                  <img
                    src={project.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = project.fallbackImage;
                    }}
                    className="project-banner-img"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="banner-overlay-gradient"></div>
                  <span
                    className="project-tag-badge"
                    style={project.tagColor ? { background: project.tagColor } : undefined}
                  >
                    {project.tag}
                  </span>
                </div>

                <div className="project-body">
                  <h4 className="fw-bold">{project.title}</h4>
                  <p className="text-muted small mb-3">{project.description}</p>
                  
                  <h6 className="fw-bold mt-auto mb-1">Key Contributions:</h6>
                  <ul className="text-muted small ps-3 mb-3">
                    {project.contributions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>

                  <div className="tech-pills mb-3">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark btn-sm hover-this"
                    >
                      <i className="fab fa-github me-1"></i>GitHub
                    </a>
                    {project.demo?.type === "video" && (
                      <button
                        className="btn btn-primary-custom btn-sm hover-this"
                        onClick={() =>
                          setModal({
                            title:
                              project.demo!.type === "video" ? (project.demo as any).demoTitle : "",
                            src: (project.demo as any).src,
                          })
                        }
                      >
                        <i className="fa-solid fa-play me-1"></i>Demo Video
                      </button>
                    )}
                    {project.demo?.type === "link" && (
                      <a
                        href={(project.demo as any).href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-custom btn-sm hover-this"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square me-1"></i>Live Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && <VideoModal title={modal.title} src={modal.src} onClose={() => setModal(null)} />}
    </section>
  );
};

export default Projects;