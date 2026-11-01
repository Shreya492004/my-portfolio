import React from "react";

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  "Full Stack Developer",
  "Java & Spring Boot",
  "React & TypeScript",
  "NestJS & Node.js",
  "REST APIs & Microservices",
  "PostgreSQL & MySQL",
  "Python & AI/ML",
  "Clean Architecture",
];

export const Marquee: React.FC<MarqueeProps> = ({ items = DEFAULT_ITEMS, reverse = false }) => {
  return (
    <div className="main-marqv" aria-label="Key Technologies and Domains">
      <div className={`slide-horizontal ${reverse ? "revers" : ""}`}>
        <div className="box">
          {items.map((item, index) => (
            <span key={`group1-${index}`} className="item">
              <span className="star-icon">✦</span>
              <span className="text">{item}</span>
            </span>
          ))}
          {items.map((item, index) => (
            <span key={`group2-${index}`} className="item" aria-hidden="true">
              <span className="star-icon">✦</span>
              <span className="text">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
