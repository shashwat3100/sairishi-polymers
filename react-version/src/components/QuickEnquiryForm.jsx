import React, { useState } from 'react';
import { showToast } from '../utils/toast';

const WEB3FORMS_ACCESS_KEY = "eb829016-5b8c-4660-8a51-b768601b488a"; // Replace with your actual key from https://web3forms.com/

export default function QuickEnquiryForm({ initialSegment = "", onSuccess }) {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    ProductSegment: initialSegment,
    Specifications: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify validity
    if (!formData.Name || !formData.Phone || !formData.Email || !formData.ProductSegment || !formData.Specifications) {
      showToast("Please fill in all required fields.");
      return;
    }

    showToast("Sending enquiry... Please wait.");

    const web3FormData = new FormData();
    web3FormData.append("access_key", WEB3FORMS_ACCESS_KEY);
    web3FormData.append("subject", "New Enquiry from Website");
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
          Name: '',
          Phone: '',
          Email: '',
          ProductSegment: '',
          Specifications: ''
        });

        showToast("Enquiry sent successfully! We will contact you shortly.");

        if (onSuccess) {
          onSuccess();
        }
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
    <form className="validate-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label style={{ color: 'var(--accent)' }}>Contact Person Name *</label>
          <input 
            type="text" 
            className="form-control" 
            name="Name" 
            placeholder="Enter full name" 
            value={formData.Name}
            onChange={handleChange}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-light)' }} 
            required 
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'var(--accent)' }}>Mobile / Contact Number *</label>
          <input 
            type="tel" 
            className="form-control" 
            name="Phone" 
            placeholder="Enter 10-digit number" 
            value={formData.Phone}
            onChange={handleChange}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-light)' }} 
            required 
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'var(--accent)' }}>Corporate Email *</label>
          <input 
            type="email" 
            className="form-control" 
            name="Email" 
            placeholder="Enter email address" 
            value={formData.Email}
            onChange={handleChange}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-light)' }} 
            required 
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'var(--accent)' }}>Select Product Segment *</label>
          <select 
            className="form-control" 
            name="ProductSegment" 
            value={formData.ProductSegment}
            onChange={handleChange}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-light)', height: '47px' }} 
            required
          >
            <option value="" disabled style={{ backgroundColor: 'var(--primary)' }}>-- Choose a product --</option>
            <option value="solvent_pvc" style={{ backgroundColor: 'var(--primary)' }}>SAHI BOND PVC Solvent Cement</option>
            <option value="solvent_upvc" style={{ backgroundColor: 'var(--primary)' }}>SAHI BOND UPVC Solvent Cement</option>
            <option value="solvent_cpvc" style={{ backgroundColor: 'var(--primary)' }}>SAHI BOND CPVC Solvent Cement</option>
            <option value="private_label" style={{ backgroundColor: 'var(--primary)' }}>Private Labeling & Job Work</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label style={{ color: 'var(--accent)' }}>Detailed Requirements / Material Specifications *</label>
          <textarea 
            className="form-control" 
            name="Specifications" 
            placeholder="Specify thickness, dimensions, grade, or expected order volume..." 
            value={formData.Specifications}
            onChange={handleChange}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-light)', minHeight: '100px' }} 
            required
          ></textarea>
        </div>
      </div>
      <button type="submit" className="form-submit-btn" style={{ marginTop: '1rem' }}>Generate Commercial Quote</button>
    </form>
  );
}
