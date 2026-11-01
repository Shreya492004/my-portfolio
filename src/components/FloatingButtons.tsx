import React, { useState, useEffect, useRef } from "react";

export const FloatingButtons: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop(scroll > 150);

      if (height > 0) {
        const progress = pathLength - (scroll * pathLength) / height;
        path.style.strokeDashoffset = `${Math.max(0, Math.min(pathLength, progress))}`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="https://wa.me/918248530828"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsappBtn"
        aria-label="Chat on WhatsApp"
        className="hover-this"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      <div
        id="backToTop"
        className={`progress-wrap cursor-pointer ${showTop ? "active-progress show" : ""}`}
        onClick={scrollToTop}
        role="button"
        tabIndex={0}
        aria-label="Back to top"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            scrollToTop();
          }
        }}
      >
        <svg className="progress-circle" viewBox="-1 -1 102 102" aria-hidden="true">
          <path
            ref={pathRef}
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          />
        </svg>
        <span className="progress-arrow-icon" aria-hidden="true">
          <i className="fa-solid fa-arrow-up"></i>
        </span>
      </div>
    </>
  );
};

export default FloatingButtons;