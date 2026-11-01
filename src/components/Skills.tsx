import React, { useEffect, useRef } from "react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

interface FloatingSkill {
  element: HTMLDivElement;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationVelocity: number;
  homeRotation: number;
  width: number;
  height: number;
  phase: number;
}

interface PointerPosition {
  x: number;
  y: number;
  type: string;
}

export const Skills: React.FC = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerPosition | null>(null);
  const frameRef = useRef(0);
  const skills = SKILL_CATEGORIES.flatMap((category) => category.skills);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = false;
    let disposed = false;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let nodes: FloatingSkill[] = [];

    const placeSkills = () => {
      width = area.clientWidth;
      height = area.clientHeight;
      if (!width || !height) return;

      const columns = Math.max(2, Math.floor(width / (width <= 480 ? 100 : 120)));
      const rows = Math.ceil(skills.length / columns);
      const cellWidth = width / columns;
      const topMargin = Math.max(70, height * 0.12);
      const cellHeight = (height - topMargin - 36) / rows;

      nodes = Array.from(area.querySelectorAll<HTMLDivElement>(".floating-skill")).map((element, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const homeX = Math.max(42, Math.min(width - 42, (column + 0.5) * cellWidth));
        const homeY = Math.max(topMargin + 4, Math.min(height - 36, topMargin + (row + 0.5) * cellHeight));
        const rotation = 0;
        element.style.setProperty("--skill-scale", `${0.92 + ((index * 7) % 17) / 100}`);
        const rect = element.getBoundingClientRect();

        element.style.left = `${homeX}px`;
        element.style.top = `${homeY}px`;
        element.style.transform =
          `translate(-50%, -50%) translate3d(0, 0, 0) rotate(${rotation}deg) scale(var(--skill-scale))`;

        return {
          element,
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          vx: 0,
          vy: 0,
          rotation,
          rotationVelocity: 0,
          homeRotation: rotation,
          width: rect.width,
          height: rect.height,
          phase: index * 1.618,
        };
      });
    };

    const animate = (time: number) => {
      frameRef.current = 0;
      if (disposed || !active) return;

      const delta = Math.min((time - (previousTime || time)) / 1000, 0.032);
      previousTime = time;
      const pointer = pointerRef.current;
      const drift = reducedMotion ? 0 : time * 0.001;

      nodes.forEach((node) => {
        const phase = drift + node.phase;
        const targetX = node.homeX + Math.sin(phase * 0.82) * 2.2;
        const targetY = node.homeY + Math.cos(phase * 0.68) * 2.8;
        let ax = (targetX - node.x) * 4.2;
        let ay = (targetY - node.y) * 4.2;

        if (pointer) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const radius = pointer.type === "touch" ? 128 : 165;
          if (distance < radius) {
            const strength = (1 - distance / radius) * 1150;
            const direction = distance > 0.1 ? 1 / distance : 0;
            ax += dx * direction * strength;
            ay += dy * direction * strength;
            if (distance < 1) ax += (node.homeX < width / 2 ? -1 : 1) * strength;
          }
        }

        node.vx = (node.vx + ax * delta) * 0.91;
        node.vy = (node.vy + ay * delta) * 0.91;
        node.x += node.vx * delta;
        node.y += node.vy * delta;
        node.rotationVelocity = (node.rotationVelocity + (node.homeRotation - node.rotation) * 3.2) * 0.91;
        node.rotation += node.rotationVelocity * delta;

        const halfWidth = node.width * 0.48;
        const halfHeight = node.height * 0.48;
        if (node.x < halfWidth) {
          node.x = halfWidth;
          node.vx = Math.abs(node.vx) * 0.48;
        } else if (node.x > width - halfWidth) {
          node.x = width - halfWidth;
          node.vx = -Math.abs(node.vx) * 0.48;
        }
        if (node.y < halfHeight) {
          node.y = halfHeight;
          node.vy = Math.abs(node.vy) * 0.48;
        } else if (node.y > height - halfHeight) {
          node.y = height - halfHeight;
          node.vy = -Math.abs(node.vy) * 0.48;
        }
      });

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const overlapX = (a.width + b.width) * 0.54 - Math.abs(dx);
          const overlapY = (a.height + b.height) * 0.54 - Math.abs(dy);
          if (overlapX <= 0 || overlapY <= 0) continue;

          if (overlapX < overlapY) {
            const direction = dx < 0 ? -1 : 1;
            const separation = overlapX * 0.55;
            a.x -= direction * separation;
            b.x += direction * separation;
            const velocity = (a.vx - b.vx) * 0.18;
            a.vx -= velocity * direction;
            b.vx += velocity * direction;
          } else {
            const direction = dy < 0 ? -1 : 1;
            const separation = overlapY * 0.55;
            a.y -= direction * separation;
            b.y += direction * separation;
            const velocity = (a.vy - b.vy) * 0.18;
            a.vy -= velocity * direction;
            b.vy += velocity * direction;
          }
        }
      }

      nodes.forEach((node) => {
        node.element.style.transform =
          `translate(-50%, -50%) translate3d(${node.x - node.homeX}px, ${node.y - node.homeY}px, 0) rotate(${node.rotation}deg) scale(var(--skill-scale))`;
      });

      const moving = pointer || nodes.some((node) =>
        Math.abs(node.x - node.homeX) > 0.45 ||
        Math.abs(node.y - node.homeY) > 0.45 ||
        Math.abs(node.vx) > 1 ||
        Math.abs(node.vy) > 1
      );
      if (moving || (!reducedMotion && active)) frameRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!frameRef.current && active) frameRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = area.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        type: event.pointerType,
      };
      startAnimation();
    };

    const onPointerDown = (event: PointerEvent) => {
      onPointerMove(event);
      const pointer = pointerRef.current;
      if (!pointer) return;
      let closest: FloatingSkill | null = null;
      let nearest = 72;
      nodes.forEach((node) => {
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (distance < nearest) {
          nearest = distance;
          closest = node;
        }
      });
      if (closest) {
        const selected = closest as FloatingSkill;
        const dx = selected.x - pointer.x;
        const dy = selected.y - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        selected.vx += (dx / distance) * 360;
        selected.vy += (dy / distance) * 360;
      }
    };

    const releasePointer = () => {
      pointerRef.current = null;
      startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      placeSkills();
      startAnimation();
    });
    resizeObserver.observe(area);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) {
        placeSkills();
        startAnimation();
      } else if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    });
    intersectionObserver.observe(area);

    area.addEventListener("pointermove", onPointerMove);
    area.addEventListener("pointerdown", onPointerDown);
    area.addEventListener("pointerup", releasePointer);
    area.addEventListener("pointerleave", releasePointer);
    area.addEventListener("pointercancel", releasePointer);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      area.removeEventListener("pointermove", onPointerMove);
      area.removeEventListener("pointerdown", onPointerDown);
      area.removeEventListener("pointerup", releasePointer);
      area.removeEventListener("pointerleave", releasePointer);
      area.removeEventListener("pointercancel", releasePointer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [skills.length]);

  return (
    <section id="skills" className="py-section skills-showcase-section">
      <div className="container">
        <div className="section-title wow fadeIn">
          <h6 className="section-subtitle">Core Capabilities</h6>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Technical &amp; Professional Skills</h2>
          </div>
          <p className="section-desc">
            Modular backend logic, scalable REST APIs, reactive frontend web platforms, and collaborative engineering methodologies.
          </p>
        </div>

        <div
          ref={areaRef}
          className="floating-skills-vessel"
          role="list"
          aria-label="Interactive floating technical and professional skills"
        >
          {skills.map((skill, index) => (
            <div className="floating-skill" key={`${skill.name}-${index}`} role="listitem">
              <i className={`${skill.icon} floating-skill-icon`} style={{ color: skill.iconColor }} aria-hidden="true"></i>
              <span>{skill.name}</span>
              {skill.subtitle && <span className="floating-skill-subtitle">{skill.subtitle}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
