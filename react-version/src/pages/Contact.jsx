import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { showToast } from '../utils/toast';

const WEB3FORMS_ACCESS_KEY = "eb829016-5b8c-4660-8a51-b768601b488a"; // Replace with your actual key from https://web3forms.com/

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject') || '';

  // Form State
  const [formData, setFormData] = useState({
    ClientName: '',
    ClientEmail: '',
    ClientPhone: '',
    ClientInquiryType: '',
    ClientMessage: ''
  });

  // Pre-fill subject based on URL query param
  useEffect(() => {
    let inquiryType = '';
    let message = '';
    
    if (subjectParam === 'distributor') {
      inquiryType = 'distributor';
      message = 'I am interested in becoming a dealer/distributor for SAHI BOND solvent cements in my region. Please send commercial terms.';
    } else if (subjectParam === 'jobwork') {
      inquiryType = 'jobwork';
      message = 'I would like to inquire about Private Labeling & Job Work manufacturing services for solvent cements.';
    } else if (subjectParam === 'quote') {
      inquiryType = 'quote';
      message = 'Please provide a pricing proposal for SAHI BOND solvent cements.';
    }

    setFormData(prev => ({
      ...prev,
      ClientInquiryType: inquiryType,
      ClientMessage: message
    }));

    // Auto-scroll to the form card smoothly on mobile screens if subject is pre-filled
    if (subjectParam) {
      setTimeout(() => {
        const formCard = document.getElementById('detailedContactEnquiry');
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  }, [subjectParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.ClientName || !formData.ClientEmail || !formData.ClientPhone || !formData.ClientInquiryType || !formData.ClientMessage) {
      showToast("Please fill in all required fields.");
      return;
    }

    showToast("Sending enquiry... Please wait.");

    const web3FormData = new FormData();
    web3FormData.append("access_key", WEB3FORMS_ACCESS_KEY);
    web3FormData.append("subject", "Corporate Enquiry - Saairishi Polymers");
    web3FormData.append("from_name", "Saairishi Polymers Website");
    Object.entries(formData).forEach(([key, value]) => {
      web3FormData.append(key, value);
    });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Mock backend save in LocalStorage
        const submissions = JSON.parse(localStorage.getItem('saairishi_enquiries') || '[]');
        const newSubmission = {
          ...formData,
          id: Date.now(),
          submittedAt: new Date().toISOString()
        };
        submissions.push(newSubmission);
        localStorage.setItem('saairishi_enquiries', JSON.stringify(submissions));

        // Reset Form
        setFormData({
          ClientName: '',
          ClientEmail: '',
          ClientPhone: '',
          ClientInquiryType: '',
          ClientMessage: ''
        });

        showToast("Corporate enquiry sent successfully! We will contact you shortly.");
      } else {
        showToast("Error sending enquiry. Please try again.");
      }
    })
    .catch(err => {
      console.error(err);
      showToast("Connection error. Could not send enquiry.");
    });
  };

  return (
    <div>
      {/* Sub-Hero Page Header Banner */}
      <section className="hero" style={{ height: '45vh', minHeight: '350px' }} id="contactHero">
        <div className="hero-slider-bg">
          <div className="hero-slide active" style={{ backgroundImage: "url('/assets/hero_bg.png')", filter: 'blur(2px)' }}></div>
        </div>
        <div className="container hero-container" style={{ marginTop: '20px' }}>
          <div className="badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            ACTIVE RESPONSE SYSTEM
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Contact Technical Team</h1>
          <p className="hero-desc" style={{ fontSize: '1.1rem', marginBottom: 0, maxWidth: '600px' }}>
            Connect directly with our Nagpur corporate desk or manufacturing floor managers for sales and pricing.
          </p>
        </div>
      </section>

      {/* Contact Details and Enquiry Form */}
      <section className="section" id="contactForms">
        <div className="container">
          <div className="contact-grid">
            
            {/* Info Cards Column */}
            <div className="contact-info-cards">
              <h3>Direct Channels</h3>
              
              {/* Card 1 */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <h4>Registered Office</h4>
                  <p>Plot No 67, Kannamwar Nagar, Khamla, Nagpur - 440025, Maharashtra, India</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <h4>Quick Sales Desk</h4>
                  <p>
                    <a href="tel:+917757944804">+91 77579 44804</a><br />
                    <a href="tel:+918626077471">+91 86260 77471</a>
                  </p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info-text">
                  <h4>Corporate Mail</h4>
                  <p>
                    <a href="mailto:saairishipolymerspvtltd@gmail.com">saairishipolymerspvtltd@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form Card */}
            <div className="contact-form-card">
              <h3>Submit Commercial Request</h3>
              <p>Enter your contact details and project details. A technical sales engineer will process your request promptly.</p>
              
              <form className="validate-form" id="detailedContactEnquiry" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Contact Person Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="ClientName" 
                      placeholder="Enter first & last name" 
                      value={formData.ClientName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Corporate Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="ClientEmail" 
                      placeholder="e.g. name@company.com" 
                      value={formData.ClientEmail}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="ClientPhone" 
                      placeholder="Enter 10-digit mobile" 
                      value={formData.ClientPhone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Nature of Inquiry *</label>
                    <select 
                      className="form-control" 
                      name="ClientInquiryType" 
                      value={formData.ClientInquiryType}
                      onChange={handleChange}
                      style={{ height: '47px' }} 
                      required
                    >
                      <option value="" disabled>-- Select subject --</option>
                      <option value="quote">Instant pricing quote</option>
                      <option value="distributor">Dealership / Distributorship query</option>
                      <option value="jobwork">Private Labeling / Job Work query</option>
                      <option value="technical">Chemical standards information</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Project Description / Required Quantities *</label>
                    <textarea 
                      className="form-control" 
                      name="ClientMessage" 
                      value={formData.ClientMessage}
                      onChange={handleChange}
                      placeholder="Describe chemical exposure requirements, piping system specifications, size diameters, or required quantity..." 
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="form-submit-btn">Submit Corporate Inquiry</button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
