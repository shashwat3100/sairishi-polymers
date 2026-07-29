import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Quality from './pages/Quality';
import Contact from './pages/Contact';
import QuickEnquiryForm from './components/QuickEnquiryForm';

// Premium UX Helper: Reset scroll position to top on page navigation and query updates
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Instant reset to prevent visual jumping
    });
  }, [pathname, search]);

  return null;
}

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Global Navigation Header */}
      <Header />
      
      {/* Route Switchboard */}
      <main style={{ flexGrow: 1, minHeight: '100vh', paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all redirection to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      
      {/* Floating Pulse Message Quote Button for Mobile */}
      <button 
        className="floating-quote-btn" 
        onClick={() => setIsQuoteModalOpen(true)}
        aria-label="Get a Quote"
        style={{ border: 'none', outline: 'none' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Global Quote Overlay Modal Component */}
      {isQuoteModalOpen && (
        <div 
          className="modal-overlay active" 
          id="globalQuoteModal" 
          style={{ zIndex: 3000 }}
          onClick={(e) => e.target.id === 'globalQuoteModal' && setIsQuoteModalOpen(false)}
        >
          <div className="modal-content enquiry-modal">
            <div className="modal-body">
              <button 
                className="modal-close-btn" 
                aria-label="Close modal"
                onClick={() => setIsQuoteModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div style={{ color: 'var(--primary)' }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--primary)', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                  Quick Enquiry Quote
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.5' }}>
                  Submit your material specifications below. Our Nagpur engineering desk will revert within 2 hours.
                </p>
                <div className="contact-form-card" style={{ padding: 0, border: 'none', boxShadow: 'none', background: 'transparent' }}>
                  <QuickEnquiryForm initialSegment="solvent_pvc" onSuccess={() => setIsQuoteModalOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Premium Footer */}
      <Footer />
    </Router>
  );
}
