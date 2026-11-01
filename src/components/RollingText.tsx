import React from "react";

interface RollingTextProps {
  children: string;
  className?: string;
}

/**
 * RollingText: Recreates the Geekfolio navigation and text hover roll effect.
 * Each character is split and duplicated vertically in two layers.
 * On hover, both layers translate up with staggered cubic-bezier delays.
 */
export const RollingText: React.FC<RollingTextProps> = ({ children, className = "" }) => {
  const letters = Array.from(children);

  return (
    <span className={`rolling-text ${className}`.trim()}>
      <span className="block">
        {letters.map((l, i) => (
          <span
            key={`top-${i}`}
            className="letter"
            style={{ transitionDelay: `${i * 0.015}s` }}
          >
            {l === " " ? "\u00a0" : l}
          </span>
        ))}
      </span>
      <span className="block" aria-hidden="true">
        {letters.map((l, i) => (
          <span
            key={`bot-${i}`}
            className="letter"
            style={{ transitionDelay: `${i * 0.015}s` }}
          >
            {l === " " ? "\u00a0" : l}
          </span>
        ))}
      </span>
    </span>
  );
};

export default RollingText;
