import React from "react";
import "./Partners.css";

export default function Partners() {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-header">
        <h2 className="gradient-text">Built for security workflows</h2>
        <p>
          Explore event triage, endpoint visibility, and evidence workflows in one interface.
        </p>
        <img
          src="/demo-security-illustration.png"
          alt="Abstract cybersecurity illustration"
          className="demo-security-illustration"
        />
      </div>

    </section>
  );
}
