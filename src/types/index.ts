export interface Stat { value: string; label: string; }
export interface SocialLink { icon: string; href: string; label: string; }
export interface Skill { icon: string; iconColor: string; name: string; subtitle?: string; }
export interface SkillCategory { icon: string; title: string; skills: Skill[]; }
export interface ExperienceItem { type: "job" | "internship"; title: string; company: string; period: string; bullets: string[]; featured?: boolean; }
export interface EducationItem { badge: string; badgeColor: string; degree: string; field: string; details: { icon: string; text: string }[]; }
export interface Project { title: string; description: string; tag: string; tagColor?: string; image: string; fallbackImage: string; contributions: string[]; tech: string[]; github: string; demo?: { type: "video"; src: string; demoTitle: string } | { type: "link"; href: string }; }
export interface ContactInfo { icon: string; label: string; value: string; href?: string; }