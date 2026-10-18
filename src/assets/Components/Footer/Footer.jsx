import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom"; 
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-ambient" aria-hidden="true">
        <span className="footer-orbit footer-orbit-one" />
        <span className="footer-orbit footer-orbit-two" />
        <span className="footer-scanline" />
      </div>
      <div className="footer-container">
        
        {/* Top Section: Brand & Navigation */}
        <div className="footer-top">
          
          {/* Brand Info */}
          <div className="footer-brand-section">
            <div className="brand-logo">
              <img src="/Logo.png" alt="WarSOC" className="fot-logo"/>
              {/* <Shield size={28} color="#64ffda" className="brand-icon" /> */}
            </div>
            <p className="brand-desc">
              A cybersecurity monitoring and evidence-management hackathon prototype.
            </p>
            <div className="social-links">
              <span className="demo-footer-note">Hackathon prototype · Browser-based AI triage</span>
            </div>
          </div>

          {/* Functional Links Grid */}
          <div className="footer-links-grid">
            <div className="link-column">
              <h4>Platform</h4>
              <ul>
                <li><HashLink smooth to="/#home">Home</HashLink></li>
                <li><HashLink smooth to="/#features">Features</HashLink></li>
                <li><HashLink smooth to="/#pricing">Pricing</HashLink></li>
              </ul>
            </div>

            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><HashLink smooth to="/#about">About Us</HashLink></li>
                <li><HashLink smooth to="/#contact">Contact Sales</HashLink></li>
                <li><HashLink smooth to="/login">Login Portal</HashLink></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} WarSOC — Hackathon Prototype. Not a production service.</p>
          <div className="legal-links">
            <HashLink smooth to="/#contact">Support</HashLink>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
