import type { SkillCategory, ExperienceItem, EducationItem, Project, ContactInfo, Stat, SocialLink } from "../types";

export const TYPING_PHRASES = [
  "Full Stack Developer",
  "Java & Spring Boot Engineer",
  "NestJS & React Developer",
  "Software Engineer",
];

export const STATS: Stat[] = [
  { value: "5+", label: "Projects Built" },
  { value: "3", label: "Internships" },
  { value: "8.0", label: "B.E. CGPA" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: "fab fa-github", href: "https://github.com/Shreya492004", label: "GitHub" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/shreya004", label: "LinkedIn" },
  { icon: "fas fa-envelope", href: "mailto:sshreyas471@gmail.com", label: "Email" },
  { icon: "fas fa-phone", href: "tel:+918248530828", label: "Phone" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "fa-solid fa-code",
    title: "Programming & Web Technologies",
    skills: [
      { icon: "fab fa-java", iconColor: "#dc3545", name: "Java" },
      { icon: "fab fa-js", iconColor: "#ffc107", name: "JavaScript" },
      { icon: "fa-solid fa-code", iconColor: "#3178c6", name: "TypeScript", subtitle: "Typed JS" },
      { icon: "fab fa-react", iconColor: "#0dcaf0", name: "React" },
      { icon: "fa-solid fa-feather", iconColor: "#dc3545", name: "NestJS" },
      { icon: "fab fa-node-js", iconColor: "#198754", name: "Node.js" },
      { icon: "fa-solid fa-leaf", iconColor: "#198754", name: "Spring Boot" },
      { icon: "fab fa-html5", iconColor: "#dc3545", name: "HTML5" },
      { icon: "fab fa-css3-alt", iconColor: "#0d6efd", name: "CSS3" },
      { icon: "fab fa-bootstrap", iconColor: "#7952b3", name: "Bootstrap" },
      { icon: "fab fa-php", iconColor: "#0d6efd", name: "PHP" },
      { icon: "fa-solid fa-network-wired", iconColor: "#6c757d", name: "REST APIs" },
    ],
  },
  {
    icon: "fa-solid fa-database",
    title: "Databases & Tools",
    skills: [
      { icon: "fa-solid fa-database", iconColor: "#0d6efd", name: "MySQL" },
      { icon: "fa-solid fa-server", iconColor: "#0dcaf0", name: "PostgreSQL" },
      { icon: "fab fa-github", iconColor: "currentColor", name: "GitHub" },
      { icon: "fa-solid fa-paper-plane", iconColor: "#dc3545", name: "Postman" },
      { icon: "fa-solid fa-cubes", iconColor: "#ffc107", name: "Maven" },
      { icon: "fa-solid fa-laptop-code", iconColor: "#0d6efd", name: "IntelliJ IDEA" },
      { icon: "fa-solid fa-laptop-file", iconColor: "#7952b3", name: "Visual Studio", subtitle: "IDE & Dev Environment" },
    ],
  },
  {
    icon: "fa-solid fa-people-arrows",
    title: "Soft Skills & Methodology",
    skills: [
      { icon: "fas fa-comments", iconColor: "#0dcaf0", name: "Communication", subtitle: "Verbal & Written" },
      { icon: "fas fa-lightbulb", iconColor: "#ffc107", name: "Problem Solving" },
      { icon: "fas fa-arrows-spin", iconColor: "#0d6efd", name: "Agile & Scrum", subtitle: "Sprints & Stand-ups" },
      { icon: "fas fa-users-gear", iconColor: "#198754", name: "Team Collaboration" },
      { icon: "fas fa-bolt", iconColor: "#dc3545", name: "Adaptability" },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    type: "job",
    title: "Full Stack Developer",
    company: "Imperial Info System Pvt. Ltd.",
    period: "August 2026 – Present",
    featured: true,
    bullets: [
      "Working as a Full Stack Developer on live, real-world customer-facing web platforms.",
      "Developing and maintaining full-stack architecture across frontend modules and backend services.",
      "Managing, designing, retrieving, and optimizing relational application data in production databases.",
      "Identifying, profiling, and fixing defects to improve overall performance, responsiveness, and uptime.",
      "Collaborating with cross-functional teams to translate user stories into functional features.",
    ],
  },
  {
    type: "internship",
    title: "PHP & Web Technologies Intern",
    company: "YOSAM ERP Developers",
    period: "1st July 2026 – 1st Aug 2026",
    bullets: [
      "Contributed to a comprehensive Conference Management System using PHP, MySQL, HTML, CSS, and JavaScript.",
      "Built responsive web views, author submission workflows, and database handlers.",
      "Acquired practical debugging experience in end-to-end full stack web architecture.",
    ],
  },
  {
    type: "internship",
    title: "Python Full Stack Development Intern",
    company: "Agile Info Tech",
    period: "23rd June 2025 – 23rd July 2025",
    bullets: [
      "Engineered modular web components using Python, HTML, and CSS.",
      "Maintained clean Git branching, PR reviews, and version control on GitHub.",
    ],
  },
  {
    type: "internship",
    title: "Python & Data Science Intern",
    company: "Srishti Campus",
    period: "14th Feb 2024 – 5th March 2024",
    bullets: [
      "Learned foundational Python programming, structured data processing, and analysis paradigms.",
      "Investigated exploratory data analysis (EDA) techniques using numerical libraries.",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    badge: "Engineering",
    badgeColor: "#0d6efd",
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    scores: [{ label: "CGPA", value: "8.0" }],
    details: [
      { icon: "fas fa-university", text: "Ponjesly College of Engineering, Nagercoil" },
      { icon: "fas fa-award", text: "Affiliated to Anna University" },
      { icon: "fas fa-calendar", text: "2022 - 2026" },
    ],
  },
  {
    badge: "Schooling",
    badgeColor: "#198754",
    degree: "HSC & SSLC",
    field: "Higher Secondary & Secondary Education",
    scores: [
      { label: "HSC", value: "75%" },
      { label: "SSLC", value: "71.8%" },
    ],
    details: [
      { icon: "fas fa-school", text: "Christuraja Matriculation Higher Secondary School" },
      { icon: "fas fa-location-dot", text: "Marthandam, Tamil Nadu" },
      { icon: "fas fa-check-double", text: "Completed with distinction in Mathematics & Science" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Mydoo – School Management Platform",
    description: "A centralized administrative platform enabling school operations, geolocation lookups, role-based security, and notifications.",
    tag: "Full Stack",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Built Admin Panel with React & TypeScript for school operational management.",
      "Engineered NestJS backend REST APIs for profile and admission handling.",
      "Integrated PostgreSQL with TypeORM for relation schemas and constraints.",
      "Implemented RBAC authentication and automated notifications.",
    ],
    tech: ["React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM"],
    github: "https://github.com/Shreya492004",
    demo: { type: "link", href: "https://mydoo.in/" },
  },
  {
    title: "Bougainville Resort – Luxury Resort Portal",
    description: "High-conversion, luxury beach resort website with interactive suite browsing, reservation links, and amenities showcases.",
    tag: "Responsive Web",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Designed modern visual components for room bookings, pricing, and guest reviews.",
      "Engineered intuitive navigation and direct reservation links.",
      "Ensured 100% responsiveness across phone, tablet, and widescreen monitors.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    github: "https://github.com/Shreya492004/Bougainville-Resort-By-The-Sea",
    demo: { type: "link", href: "https://shreya492004.github.io/Bougainville-resort/" },
  },
  {
    title: "London Star Education – Tuition Platform",
    description: "Dynamic tutoring and academic platform showcasing tutor rosters, enrollment forms, timetable views, and course catalogs.",
    tag: "EdTech",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Created structured course modules, tutor profiles, and fee schedules.",
      "Integrated interactive student inquiry capture and tutor sign-up forms.",
      "Delivered fluid layout navigation with clean UI accessibility.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    github: "https://github.com/Shreya492004",
    demo: { type: "link", href: "https://shreya492004.github.io/tution-12-8-26/" },
  },
  {
    title: "ConferHub – Conference Management System",
    description: "Full-featured conference management portal handling research submissions, reviewer allocations, and schedule updates.",
    tag: "PHP / MySQL",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Constructed admin control panels to coordinate papers and reviewer pipelines.",
      "Engineered user authentication, role separation, and author dashboards.",
      "Designed relational MySQL schemas for fast relational querying.",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/Shreya492004",
    demo: { type: "link", href: "http://66u.ff8.mytemp.website/dr/conferenceManagement_final/home.php" },
  },
  {
    title: "Hospital & Doctor Appointment Booking System",
    description: "Healthcare scheduling suite with doctor dashboards, patient booking pipelines, calendar slots, and administrative views.",
    tag: "Java Full Stack",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Built backend appointment scheduling logic and REST controllers with Spring Boot.",
      "Connected MySQL relational database for slots, doctors, and patient records.",
      "Designed responsive user interfaces using Bootstrap and JavaScript.",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Bootstrap"],
    github: "https://github.com/Shreya492004",
    demo: { type: "video", src: "vid1.mp4", demoTitle: "Hospital Management & Doctor Appointment Booking Preview" },
  },
  {
    title: "Real-Time Traffic Prediction & Congestion Control",
    description: "Intelligent vision pipeline for vehicle detection and dynamic traffic congestion forecasting using live and historical feeds.",
    tag: "AI & ML",
    tagColor: "rgba(220,38,38,0.85)",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&auto=format&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1200&auto=format&fit=crop&q=85",
    contributions: [
      "Built congestion analysis models with OpenCV and XGBoost algorithms.",
      "Developed a Flask web portal displaying traffic metrics and heat alerts.",
      "Trained and validated historical data sets to minimize traffic estimation error.",
    ],
    tech: ["Python", "XGBoost", "OpenCV", "Flask", "NumPy"],
    github: "https://github.com/Shreya492004/Smart-Traffic-Prediction",
    demo: { type: "link", href: "https://github.com/Shreya492004/Smart-Traffic-Prediction" },
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  { icon: "fas fa-phone", label: "Phone", value: "+91 8248530828", href: "tel:+918248530828" },
  { icon: "fas fa-envelope", label: "Email", value: "sshreyas471@gmail.com", href: "mailto:sshreyas471@gmail.com" },
  { icon: "fas fa-location-dot", label: "Location", value: "Nagercoil, Tamil Nadu, India" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn", value: "linkedin.com/in/shreya004", href: "https://www.linkedin.com/in/shreya004" },
  { icon: "fab fa-github", label: "GitHub", value: "github.com/Shreya492004", href: "https://github.com/Shreya492004" },
];