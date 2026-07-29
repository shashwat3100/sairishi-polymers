import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
      <div className="container header-container">
        <Link to="/" className="logo" id="logoLink">
          <div className="logo-icon">
            <img src="/assets/png_saairishi.png" alt="Saairishi Polymers Logo" />
          </div>
          <div className="logo-text">
            <span>SAAIRISHI</span>
            <span className="logo-sub">POLYMERS PVT. LTD.</span>
          </div>
        </Link>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          id="menuToggle" 
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} id="mainNav">
          <ul className="nav-list">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Company Profile
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Our Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/quality" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Quality & Testing
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <Link to="/contact" className="contact-btn" id="navQuoteBtn">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
