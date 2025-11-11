import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-inner container">
        <div className="brand-footer">
          <div>
            <h2 id="footer-heading" className="brand-title">
              Cine Sphere
            </h2>
            <p className="brand-tagline">
              A modern movie discovery app built to explore, stream, and learn about your favorite films and shows — crafted to demonstrate front-end development expertise.
            </p>
          </div>

        </div>

        <nav className="footer-links" aria-label="Footer">
          <ul className="link-group">
            <li><a href="https://your-resume-link" target="_blank" rel="noopener noreferrer">Resume</a></li>
            <li><a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="credit">
          © {year} Nikhil Kachi · Built with React · Data from TMDB.
        </p>
        
      </div>
    </footer>
  );
}

export default Footer;
