import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import RollingText from "./RollingText";
import { useMagnetic } from "../hooks/useMagnetic";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC<{ pageReady: boolean }> = ({ pageReady }) => {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const themeBtnRef = useMagnetic<HTMLButtonElement>(15);
  const resumeBtnRef = useMagnetic<HTMLAnchorElement>(15);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollY = window.pageYOffset;
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const offset = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 75;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <nav className={`navbar nav-launch${pageReady ? " nav-launch-ready" : ""}${scrolled ? " scrolled nav-scroll" : ""}`} id="mainNavbar">
      <div className="container nav-container">
        <a className="navbar-brand" href="#home" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}>
          <span className="logo-circle">S</span>
          <span className="brand-text">Shreya</span>
        </a>

        <div className="nav-right">
          <button
            ref={themeBtnRef}
            className="theme-toggle-btn hover-this"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"} style={isDark ? { color: "#fbbf24" } : undefined}></i>
          </button>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>

        <div className={`nav-menu${menuOpen ? " open" : ""}`}>
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item">
                <a
                  className={`nav-link${activeSection === item.href.slice(1) ? " active" : ""}`}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  <RollingText>{item.label}</RollingText>
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a
                ref={resumeBtnRef}
                href="/Shreya S.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-custom btn-sm hover-this"
              >
                <i className="fa-solid fa-file-arrow-down" style={{ marginRight: 6 }}></i>Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;