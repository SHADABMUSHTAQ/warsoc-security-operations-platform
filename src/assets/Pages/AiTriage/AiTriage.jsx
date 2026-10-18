import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BrainCircuit, Play, ShieldCheck } from "lucide-react";
import { classifySecurityEvent, TRAINING_EXAMPLES } from "../../../ai/eventClassifier";
import "./AiTriage.css";

const samples = [
  "Encoded PowerShell command detected on workstation",
  "Multiple failed authentication attempts from a new source",
  "Endpoint contacted a low-reputation outbound destination",
  "Scheduled backup completed successfully on the workstation",
];

const guidance = {
  "credential abuse": "Review authentication history, affected accounts, and source address before escalating.",
  "script execution": "Inspect the command line, parent process, and endpoint timeline before escalating.",
  "network anomaly": "Review destination reputation, traffic volume, and related endpoint activity.",
  "routine activity": "Check surrounding context; routine classification does not prove an event is safe.",
  unknown: "Try a more descriptive, non-sensitive event. The small demo vocabulary cannot classify this input reliably.",
};

export default function AiTriage() {
  const [input, setInput] = useState(samples[0]);
  const [result, setResult] = useState(null);

  const analyze = (event) => {
    event.preventDefault();
    setResult(classifySecurityEvent(input));
  };

  return (
    <main className="ai-triage-page">
      <div className="ai-triage-wrap">
        <Link to="/" className="ai-triage-back"><ArrowLeft size={17} /> Back to WarSOC</Link>
        <header className="ai-triage-header">
          <span className="ai-triage-kicker"><BrainCircuit size={18} /> Browser-based ML demo</span>
          <h1>AI Event Triage</h1>
          <p>Enter a short security event to see how a locally trained text classifier groups it for analyst review. No backend or API key is needed.</p>
        </header>

        <div className="ai-triage-grid">
          <section className="ai-triage-card">
            <h2>Analyze an event</h2>
            <p>Choose a synthetic example or enter non-sensitive test text.</p>
            <div className="ai-triage-samples">
              {samples.map((sample, index) => <button key={sample} type="button" onClick={() => { setInput(sample); setResult(null); }}>Example {index + 1}</button>)}
            </div>
            <form onSubmit={analyze}>
              <label htmlFor="ai-event-text">Security event text</label>
              <textarea id="ai-event-text" value={input} onChange={(event) => { setInput(event.target.value); setResult(null); }} maxLength={500} rows={5} placeholder="Describe a sample security event..." required />
              <button className="ai-triage-run" type="submit" disabled={!input.trim()}><Play size={16} /> Analyze with local model</button>
            </form>
          </section>

          <section className="ai-triage-card ai-triage-result" aria-live="polite">
            <h2>Model output</h2>
            {!result && <p className="ai-triage-empty">Select an example and run the model to see a classification.</p>}
            {result && <>
              <span className="ai-triage-label">{result.label}</span>
              <p>{guidance[result.label]}</p>
              {result.evidence.length > 0 && <p><strong>Indicative words:</strong> {result.evidence.join(", ")}</p>}
              <p><strong>Known-word coverage:</strong> {Math.round(result.coverage * 100)}% of input tokens.</p>
              <p className="ai-triage-caution">This is a text-category suggestion, not a threat verdict or calibrated risk score. An analyst must verify the context.</p>
            </>}
          </section>
        </div>

        <div className="ai-triage-method"><ShieldCheck size={20} /><p><strong>How it works:</strong> Multinomial Naive Bayes is trained in your browser on {TRAINING_EXAMPLES.length} synthetic labelled examples. It compares word frequencies across four event categories. No text is sent to a server. The small sample dataset limits accuracy and should not be used on real security operations.</p></div>
      </div>
    </main>
  );
}
