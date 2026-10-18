import React, { useState } from 'react';
import { ShieldAlert, Headset, MapPin, Send, Building2, CheckCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { formatApiError } from '../../../utils/apiError';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      inquiry_type: String(formData.get("inquiryType") || ""),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    try {
      await apiClient.post("/sales/contact", payload);
      setIsSubmitted(true);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(formatApiError(error, "Unable to submit your request. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow"></div>

      <div className="contact-container">
        {/* Left Side - SIEM Info */}
        <div className="contact-info">
          <span className="section-badge">Hackathon Demo</span>
          <h2>
            Explore the <span className="highlight-text">WarSOC Prototype</span>
          </h2>
          <p className="contact-description">
            This form is for demo feedback and hackathon discussion only. It does not provide emergency response or production support.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-box">
                <Headset size={20} />
              </div>
              <div>
                <h4>Project Demo</h4>
                <p>Prototype workflow</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box alert-box">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4>Support Scope</h4>
                <p>No production support in this prototype</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Project Stage</h4>
                <p>Hackathon prototype</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - B2B Lead Form */}
        <div className="contact-form-wrapper">
          
          {/* Agar form submit ho gaya hai to Success Message dikhaye */}
          {isSubmitted ? (
            <div className="success-message" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle size={50} color="#64ffda" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: '#e6f1ff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Request Received!</h3>
              <p style={{ color: '#8892b0' }}>Thank you for reaching out. Our security team will contact you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="submit-btn" 
                style={{ marginTop: '2rem', width: 'auto' }}
              >
                Send Another Request
              </button>
            </div>
          ) : (
            // Warna normal form dikhaye
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Demo Feedback</h3>
              <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
              
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="company">Organization (optional)</label>
                  <div className="input-with-icon">
                    <input type="text" id="company" name="company" placeholder="Optional" style={{paddingLeft: '32px'}} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Optional" />
              </div>

              <div className="form-group">
                <label htmlFor="inquiryType">How can we help you?</label>
                <select id="inquiryType" name="inquiryType" defaultValue="" required>
                  <option value="" disabled>Select an option...</option>
                  <option value="demo">Demo walkthrough</option>
                  <option value="compliance">Feature feedback</option>
                  <option value="incident">Prototype question</option>
                  <option value="partnership">Hackathon discussion</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Details</label>
                <textarea id="message" name="message" rows="3" placeholder="Share feedback about the prototype..." required></textarea>
              </div>

              {error && <p className="privacy-note" style={{ color: '#ff6b6b' }}>{error}</p>}
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Request"} 
                {!isSubmitting && <Send size={16} style={{ marginLeft: '8px' }} />}
              </button>            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
