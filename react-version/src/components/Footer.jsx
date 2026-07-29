import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            <div className="logo-icon">
              <img src="/assets/png_saairishi.png" alt="Saairishi Polymers Logo" />
            </div>
            <div className="logo-text">
              <span style={{ color: 'var(--text-light)' }}>SAAIRISHI</span>
              <span className="logo-sub">POLYMERS PVT. LTD.</span>
            </div>
          </Link>
          <p>Innovative manufacturers and distributors of premium SAHI BOND® CPVC, UPVC, and PVC solvent cements in Khamla, Nagpur.</p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/saairishi_polymers?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              className="social-icon" 
              aria-label="Instagram" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/saairishi-polymers/" 
              className="social-icon" 
              aria-label="LinkedIn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Quick Navigation</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                Company Profile
              </Link>
            </li>
            <li>
              <Link to="/products" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                Our Products
              </Link>
            </li>
            <li>
              <Link to="/quality" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                Quality Standards
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Core Segments</h3>
          <ul className="footer-links">
            <li>
              <Link to="/products?cat=pvc" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                PVC Solvent Cement
              </Link>
            </li>
            <li>
              <Link to="/products?cat=upvc" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                UPVC Solvent Cement
              </Link>
            </li>
            <li>
              <Link to="/products?cat=cpvc" className="footer-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" />
                </svg>{' '}
                CPVC Solvent Cement
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Registered Office</h3>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="footer-contact-text">
              <p>Plot No 67, Kannamwar Nagar, Khamla, Nagpur - 440025, Maharashtra, India</p>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="footer-contact-text">
              <p>
                <a href="tel:+917757944804">+91 77579 44804</a><br />
                <a href="tel:+918626077471">+91 86260 77471</a>
              </p>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="footer-contact-text">
              <p>
                <a href="mailto:saairishipolymerspvtltd@gmail.com">saairishipolymerspvtltd@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Saairishi Polymers Private Limited. All Rights Reserved.</p>
        <p>Designed to Premium Engineering Standards</p>
      </div>
    </footer>
  );
}
