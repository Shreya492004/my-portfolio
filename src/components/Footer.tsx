const Footer: React.FC = () => {
  return (
    <footer className="footer footer-container">
      <div className="container">
        <div className="footer-grid wow fadeIn">
          <div className="footer-col footer-col-brand">
            <h4 className="brand-text-footer">Shreya</h4>
            <p className="footer-tagline">
              Full Stack Developer building clean, robust, and scalable web software with Java, NestJS, and React.
            </p>
            <div className="footer-social-icons">
              <a
                href="https://github.com/shreya492004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="footer-social-link hover-this"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/shreya004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="footer-social-link hover-this"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="mailto:sshreyas471@gmail.com"
                aria-label="Email"
                className="footer-social-link hover-this"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <nav className="footer-col footer-navigation" aria-label="Footer navigation">
            <h5 className="footer-col-title">
              Explore
            </h5>
            <ul className="footer-nav-list">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom wow fadeIn" data-delay="0.2s">
          <span>&copy; 2026 Shreya. All rights reserved.</span>
          <span>Full Stack Developer • Java • NestJS • React</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;