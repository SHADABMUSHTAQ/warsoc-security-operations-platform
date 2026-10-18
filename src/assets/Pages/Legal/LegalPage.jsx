import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./LegalPage.css";

const documents = {
  privacy: {
    title: "Privacy Policy",
    intro: "WarSOC is a hackathon prototype. The public AI event triage page trains and runs a small text classifier entirely in your browser. Event text entered on that page is not sent to a server.",
    sections: [
      { heading: "1. Public AI triage", paragraphs: ["The classifier uses synthetic labelled examples bundled with the application. Enter only non-sensitive test text; the model is not intended for real security decisions."] },
      { heading: "2. Authenticated workspace", paragraphs: ["Dashboard, endpoint, evidence, and compliance views require a connected backend and an authorized account. This frontend does not bundle fabricated operational records or replace unavailable backend data with sample data."] },
      { heading: "3. Information you provide", paragraphs: ["Avoid uploading real credentials, customer logs, payment details, or confidential information to a prototype environment. A deployment operator is responsible for publishing its actual data-processing and retention practices before handling real data."] },
      { heading: "4. Availability", paragraphs: ["This prototype makes no production availability, security, retention, regulatory, or incident-response commitment. Backend-dependent features may be unavailable during review."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "WarSOC is presented for hackathon evaluation. The public classifier and other prototype screens illustrate the project; they are not a production security service.",
    sections: [
      { heading: "1. Evaluation use", paragraphs: ["Use the application only with non-sensitive test inputs unless a deployment operator has separately provided appropriate production terms and safeguards."] },
      { heading: "2. Model limitations", paragraphs: ["The browser-based classifier is trained on a small synthetic dataset. Its categories and indicative words are suggestions for review, not verified findings, calibrated risk scores, or automated incident-response decisions."] },
      { heading: "3. Backend dependencies", paragraphs: ["Operational screens require an available backend, valid authentication, and authorized data access. No mock records are supplied when these services are unavailable."] },
      { heading: "4. No service commitments", paragraphs: ["The prototype does not promise uptime, monitoring coverage, support response times, compliance certification, court-admissible evidence, or retention guarantees."] },
    ],
  },
};

const sectionId = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function LegalPage({ type: routeType }) {
  const { type: paramType } = useParams();
  const type = routeType || paramType;
  const document = documents[type];
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    window.document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");
    window.addEventListener("storage", syncTheme);
    window.addEventListener("focus", syncTheme);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("focus", syncTheme);
    };
  }, []);

  if (!document) return <Navigate to="/" replace />;

  const words = document.title.split(" ");
  const accent = words.pop();

  return (
    <main className={`legal-page legal-${theme}`}>
      <header className="legal-topbar"><Link to="/" className="legal-back-link"><ArrowLeft size={17} /> Back to WarSOC</Link></header>
      <nav className="legal-tabs" aria-label="Legal documents">
        <Link className={type === "privacy" ? "active" : ""} to="/privacy">Privacy Policy</Link>
        <Link className={type === "terms" ? "active" : ""} to="/terms">Terms of Service</Link>
      </nav>
      <section className="legal-hero"><div className="legal-hero-inner">
        <h1>{words.join(" ")} <span>{accent}</span></h1>
        <p>WarSOC Hackathon Prototype</p>
        <dl className="legal-meta-grid">
          <div><dt>Status</dt><dd>Prototype only</dd></div>
          <div><dt>Last Updated</dt><dd>October 18, 2026</dd></div>
          <div><dt>Version</dt><dd>Demo</dd></div>
        </dl>
      </div></section>
      <section className="legal-document-wrap">
        <aside className="legal-sidebar" aria-label={`${document.title} sections`}>
          <p>On this page</p>
          <a href="#overview">Overview</a>
          {document.sections.map((section) => <a href={`#${sectionId(section.heading)}`} key={section.heading}>{section.heading.replace(/^\d+\.\s*/, "")}</a>)}
        </aside>
        <article className="legal-document">
          <div className="legal-lead" id="overview"><p>{document.intro}</p></div>
          {document.sections.map((section) => <section className="legal-section-row" id={sectionId(section.heading)} key={section.heading}>
            <h2>{section.heading}</h2>
            <div className="legal-section-copy">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>)}
          <footer className="legal-document-footer"><span>© 2026 WarSOC — Hackathon Prototype</span></footer>
        </article>
      </section>
    </main>
  );
}
