import { useEffect } from "react";

/**
 * Continuous Scroll Reveal Hook:
 * Active while moving down and scrolling up always.
 * Adds .animated when entering viewport, and removes it when exiting,
 * allowing elements to animate dynamically in both scroll directions.
 * Accepts triggerKey to immediately evaluate all visible elements when the page loads.
 */
export const useScrollReveal = (triggerKey?: boolean) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document
        .querySelectorAll(
          ".wow, .imago, .d-rotate, .reveal-on-scroll, .angle-left, .angle-right, .tilt-up, .zoom-in, .fall-down, .project-reveal-right, .project-reveal-left, .project-reveal-bottom, .project-reveal-top"
        )
        .forEach((el) => el.classList.add("animated"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("animated");
          } else {
            // Re-triggerable: remove animated when out of bounds so it replays smoothly when scrolling back!
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              el.classList.remove("animated");
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        ".wow, .imago, .d-rotate, .reveal-on-scroll, .angle-left, .angle-right, .tilt-up, .zoom-in, .fall-down, .card-banner-frame, .section-land, .project-reveal-right, .project-reveal-left, .project-reveal-bottom, .project-reveal-top"
      );
      elements.forEach((el) => {
        observer.observe(el);
        // If element is already inside the viewport on load, activate it immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("animated");
        }
      });
    };

    observeElements();
    const timer1 = setTimeout(observeElements, 100);
    const timer2 = setTimeout(observeElements, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, [triggerKey]);
};

export default useScrollReveal;
