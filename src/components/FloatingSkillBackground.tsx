import React from "react";

interface FloatingTag {
  name: string;
  icon: string;
  top: string;
  left: string;
  color: string;
  delay: string;
  duration: string;
  animType: "float-1" | "float-2" | "float-3";
}

const HOLOGRAPHIC_TAGS: FloatingTag[] = [
  { name: "Java", icon: "fab fa-java", top: "14%", left: "88%", color: "#fb923c", delay: "1.5s", duration: "16s", animType: "float-2" },
  { name: "Spring Boot", icon: "fa-solid fa-leaf", top: "24%", left: "6%", color: "#4ade80", delay: "3s", duration: "18s", animType: "float-3" },
  { name: "NestJS", icon: "fa-solid fa-feather", top: "32%", left: "84%", color: "#ff5e57", delay: "0.8s", duration: "15s", animType: "float-1" },
  { name: "React", icon: "fab fa-react", top: "42%", left: "3%", color: "#22d3ee", delay: "2.2s", duration: "17s", animType: "float-2" },
  { name: "PostgreSQL", icon: "fa-solid fa-server", top: "50%", left: "90%", color: "#818cf8", delay: "4s", duration: "19s", animType: "float-3" },
  { name: "MySQL", icon: "fa-solid fa-database", top: "58%", left: "5%", color: "#2dd4bf", delay: "1.8s", duration: "16s", animType: "float-1" },
  { name: "REST APIs", icon: "fa-solid fa-network-wired", top: "66%", left: "86%", color: "#f43f5e", delay: "3.2s", duration: "18s", animType: "float-2" },
  { name: "Docker", icon: "fab fa-docker", top: "74%", left: "4%", color: "#38bdf8", delay: "2s", duration: "15s", animType: "float-3" },
  { name: "Node.js", icon: "fab fa-node-js", top: "82%", left: "88%", color: "#86efac", delay: "0.5s", duration: "17s", animType: "float-1" },
  { name: "Git", icon: "fab fa-git-alt", top: "90%", left: "7%", color: "#fb7185", delay: "2.7s", duration: "16s", animType: "float-2" },
  { name: "Full Stack", icon: "fa-solid fa-cubes", top: "96%", left: "82%", color: "#c084fc", delay: "1.2s", duration: "18s", animType: "float-3" },
];

export const FloatingSkillBackground: React.FC = () => {
  return (
    <div className="bg-floating-skills-layer" aria-hidden="true">
      {HOLOGRAPHIC_TAGS.map((tag, idx) => (
        <div
          key={idx}
          className={`holographic-skill-pill holo-${tag.animType}`}
          style={{
            top: tag.top,
            left: tag.left,
            animationDelay: tag.delay,
            animationDuration: tag.duration,
          }}
        >
          <span className="holo-shimmer"></span>
          <i className={tag.icon} style={{ color: tag.color }}></i>
          <span className="holo-tag-text">{tag.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FloatingSkillBackground;
