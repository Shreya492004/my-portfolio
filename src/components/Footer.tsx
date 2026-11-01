import React from "react";

const Footer: React.FC = () => (
  <footer className="footer footer-container">
    <div className="container">
      <div className="footer-top wow fadeIn">
        <div>
          <h4 className="fw-bold mb-1 brand-text-footer">Shreya</h4>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 0 }}>
            Full Stack Developer building clean, robust, and scalable software.
          </p>
        </div>
        <div className="footer-social">
          <a
            href="https://github.com/Shreya492004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover-this"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/shreya004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover-this"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="mailto:sshreyas471@gmail.com"
            aria-label="Email"
            className="hover-this"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom wow fadeIn" data-delay="0.2s">
        <span>&copy; 2026 Shreya. All rights reserved.</span>
        <span>Designed &amp; Built with React + TypeScript &amp; Vite</span>
      </div>
    </div>
  </footer>
);

export default Footer;