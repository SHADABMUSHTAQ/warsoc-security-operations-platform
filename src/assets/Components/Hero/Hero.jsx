import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SocDashboard from "./SocDashboard";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper" id="home">
      {/* Background Glow Effects */}
      <div className="hero-glow glow-left"></div>
      <div className="hero-glow glow-right"></div>

      <div className="hero-container">
        
        {/* Left Side: Text Content */}
        <div className="hero-text">
          {/* <div className="badge-container">
            <span className="badge-icon"><ShieldCheck size={14} /></span>
            <span className="badge-text">Stay secure. Stay compliant.</span>
          </div> */}

          <h1>
            See the threat.
            <br />
            Secure what <span className="gradient-text">matters.</span>
          </h1>
          
          <p>
            Explore security activity, evidence workflows, and browser-based AI event triage in this hackathon prototype.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Get Started <ArrowRight size={18} />
            </button>
            <button className="btn-primary" onClick={() => navigate("/ai-triage")}>
              Try AI Event Triage <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <strong>4</strong>
              <span>AI event categories</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>32</strong>
              <span>synthetic training examples</span>
            </div>
          </div>
        </div>

        {/* Landing-page dashboard preview. */}
        <div className="hero-visual">
          <SocDashboard />
        </div>

      </div>
    </div>
  );
}

export default Hero;
