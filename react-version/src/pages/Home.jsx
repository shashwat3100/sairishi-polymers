import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickEnquiryForm from '../components/QuickEnquiryForm';

export default function Home() {
  // Hero background slider index
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const heroBgs = [
    '/assets/hero_bg.png',
    '/assets/solvent_cement.png',
    '/assets/frp_tank.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Hero product flasher state
  const flasherData = [
    {
      title: "SAHI BOND PVC Cement",
      category: "PVC Solvent Cement",
      desc: "Specially formulated for PVC pipe applications with strong adhesion and smooth flow.",
      images: ["/assets/pvc_can.jpg", "/assets/pvc_tube.jpg"]
    },
    {
      title: "SAHI BOND UPVC Cement",
      category: "UPVC Solvent Cement",
      desc: "Designed for UPVC plumbing systems with quick setting and leak-proof performance.",
      images: ["/assets/upvc_can.jpg", "/assets/upvc_blue_tube.jpg", "/assets/upvc_purple_tube.jpg"]
    },
    {
      title: "SAHI BOND CPVC Cement",
      category: "CPVC Solvent Cement",
      desc: "High-strength bonding solution suitable for hot & cold water CPVC piping systems.",
      images: ["/assets/cpvc_can.jpg", "/assets/cpvc_tube.jpg"]
    }
  ];

  const [flasherProductIdx, setFlasherProductIdx] = useState(0);
  const [flasherImageIdx, setFlasherImageIdx] = useState(0);
  const [flasherFade, setFlasherFade] = useState(true);

  // Auto rotation of product flasher
  useEffect(() => {
    const timer = setInterval(() => {
      setFlasherFade(false);
      setTimeout(() => {
        setFlasherImageIdx((prevImgIdx) => {
          const currentProd = flasherData[flasherProductIdx];
          const nextImgIdx = prevImgIdx + 1;
          
          if (nextImgIdx >= currentProd.images.length) {
            // Move to next product, reset image index to 0
            setFlasherProductIdx((prevProdIdx) => (prevProdIdx + 1) % flasherData.length);
            return 0;
          }
          return nextImgIdx;
        });
        setFlasherFade(true);
      }, 400); // Wait for fade-out to finish
    }, 2500);

    return () => clearInterval(timer);
  }, [flasherProductIdx]);

  // Dot click handler for flasher
  const handleFlasherDotClick = (index) => {
    if (index === flasherProductIdx) return;
    setFlasherFade(false);
    setTimeout(() => {
      setFlasherProductIdx(index);
      setFlasherImageIdx(0);
      setFlasherFade(true);
    }, 300);
  };

  // Get custom label text for the flasher product
  const getFlasherLabel = () => {
    const prod = flasherData[flasherProductIdx];
    let label = prod.category;
    if (flasherProductIdx === 1) {
      label += flasherImageIdx === 0 ? " (Can)" : flasherImageIdx === 1 ? " (Blue Tube)" : " (Purple Tube)";
    } else {
      label += flasherImageIdx === 0 ? " (Can)" : " (Tube)";
    }
    return label;
  };

  return (
    <div>
      {/* Animated Slider Hero Section */}
      <section className="hero" id="homeHero">
        <div className="hero-slider-bg">
          {heroBgs.map((bg, idx) => (
            <div
              key={bg}
              className={`hero-slide ${idx === heroBgIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url('${bg}')` }}
            ></div>
          ))}
        </div>
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                INCORPORATED IN 2025 | Nagpur, MH
              </div>
              <h1 className="hero-title">
                Engineered Solvent Cements for <span>Industrial Strength</span>
              </h1>
              <p className="hero-desc">
                Saairishi Polymers Pvt. Ltd. is a trusted corporate leader in Nagpur, specializing in manufacturing SAHI BOND® premium PVC, UPVC, and CPVC solvent cements. Engineered for strong bonding, fast setting, and long-lasting performance.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary" id="heroProductsBtn">
                  Explore Catalog
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link to="/contact" className="btn btn-secondary" id="heroContactBtn">
                  Request Fast Quote
                </Link>
              </div>
            </div>

            <div
              className="hero-flasher-card"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(59, 98, 255, 0.15)',
                borderRadius: '28px',
                boxShadow: '0 20px 50px rgba(8, 23, 43, 0.2)',
                padding: '2.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                aspectRatio: '1 / 1.1',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--primary)',
                  color: 'var(--text-light)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  zIndex: 5,
                  boxShadow: '0 4px 10px rgba(8, 23, 43, 0.15)'
                }}
              >
                Live Showcase
              </div>

              <div
                className="flasher-image-container"
                style={{
                  width: '100%',
                  height: '55%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1.25rem',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(8, 23, 43, 0.05)',
                  padding: '1rem',
                  boxSizing: 'border-box'
                }}
              >
                <img
                  id="flasherImg"
                  src={flasherData[flasherProductIdx].images[flasherImageIdx]}
                  alt={flasherData[flasherProductIdx].title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    opacity: flasherFade ? 1 : 0,
                    transform: flasherFade ? 'scale(1)' : 'scale(0.95)'
                  }}
                />
              </div>

              <div className="flasher-details" style={{ textAlign: 'center', width: '100%' }}>
                <span
                  id="flasherCategory"
                  style={{
                    background: 'rgba(59, 98, 255, 0.1)',
                    color: 'var(--accent)',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    display: 'inline-block',
                    marginBottom: '0.5rem'
                  }}
                >
                  {getFlasherLabel()}
                </span>
                <h3
                  id="flasherTitle"
                  style={{
                    color: 'var(--primary)',
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  {flasherData[flasherProductIdx].title}
                </h3>
                <p
                  id="flasherDesc"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    marginBottom: '1.25rem',
                    lineHeight: 1.5,
                    minHeight: '54px'
                  }}
                >
                  {flasherData[flasherProductIdx].desc}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }} id="flasherDots">
                  {flasherData.map((_, idx) => (
                    <span
                      key={idx}
                      className={`flasher-dot ${idx === flasherProductIdx ? 'active' : ''}`}
                      onClick={() => handleFlasherDotClick(idx)}
                      style={{
                        width: idx === flasherProductIdx ? '24px' : '8px',
                        height: '6px',
                        background: idx === flasherProductIdx ? 'var(--accent)' : 'rgba(8, 23, 43, 0.15)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="section" id="aboutIntro">
        <div className="container" style={{ GavMaxWidth: '800px' }}>
          <div className="intro-text" style={{ textAlign: 'center' }}>
            <h3>Who We Are</h3>
            <h2>Setting New Benchmarks in Polymer Technology</h2>
            <p>
              Saairishi Polymers Pvt. Ltd. proudly presents <strong>SAHI BOND</strong>, a high-performance range of solvent cements specially designed for plumbing, construction, and industrial applications.
            </p>
            <p>
              We aim to provide premium quality products at competitive pricing for dealers, distributors, plumbers, and contractors across India.
            </p>
            <div
              className="intro-features"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem 2.5rem',
                maxWidth: '750px',
                margin: '2.5rem auto 0'
              }}
            >
              <div className="feature-check" style={{ justifyContent: 'center', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', stroke: 'var(--accent)', strokeWidth: '2.5' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Strong and reliable bonding
              </div>
              <div className="feature-check" style={{ justifyContent: 'center', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', stroke: 'var(--accent)', strokeWidth: '2.5' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Fast setting performance
              </div>
              <div className="feature-check" style={{ justifyContent: 'center', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', stroke: 'var(--accent)', strokeWidth: '2.5' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Leak-proof joints
              </div>
              <div className="feature-check" style={{ justifyContent: 'center', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', stroke: 'var(--accent)', strokeWidth: '2.5' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Long-lasting durability
              </div>
              <div className="feature-check" style={{ justifyContent: 'center', fontSize: '1.05rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', stroke: 'var(--accent)', strokeWidth: '2.5' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Contractor trusted quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Product Categories Section */}
      <section className="section section-bg" id="categoriesShowcase">
        <div className="container">
          <div className="section-header">
            <h2>Product Categories</h2>
            <p>Engineered to deliver high performance in extreme industrial environments, plumbing networks, and bulk logistics.</p>
          </div>

          <div
            className="categories-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              maxWidth: '1050px',
              margin: '0 auto'
            }}
          >
            {/* Category 1 - PVC */}
            <div className="category-card" id="catCardPVC" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center', borderRadius: '20px' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem', background: 'rgba(59, 98, 255, 0.08)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>SAHI BOND PVC Cement</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Specially formulated for PVC pipe applications with strong adhesion and smooth flow.</p>
              <Link to="/products?cat=pvc" className="category-link" style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore PVC Cement
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* Category 2 - UPVC */}
            <div className="category-card" id="catCardUPVC" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center', borderRadius: '20px' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem', background: 'rgba(59, 98, 255, 0.08)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>SAHI BOND UPVC Cement</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Designed for UPVC plumbing systems with quick setting and leak-proof performance.</p>
              <Link to="/products?cat=upvc" className="category-link" style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore UPVC Cement
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* Category 3 - CPVC */}
            <div className="category-card" id="catCardCPVC" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center', borderRadius: '20px' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem', background: 'rgba(59, 98, 255, 0.08)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>SAHI BOND CPVC Cement</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>High-strength bonding solution suitable for hot & cold water CPVC piping systems.</p>
              <Link to="/products?cat=cpvc" className="category-link" style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore CPVC Cement
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAHI BOND Premium Brand Showcase Section */}
      <section className="section sahibond-promo-section" id="sahiBondPromo">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
            {/* Left: Product Details */}
            <div style={{ textAlign: 'left' }}>
              <div className="sahibond-brand-logo-wrapper" style={{ margin: '0 0 1.5rem 0' }}>
                <img src="/assets/sahi_bond_logo.png" alt="SAHI BOND LOGO" className="sahibond-brand-logo" />
              </div>
              <p style={{ color: '#3fe7d4', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                The Everlasting Bond
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, lineHeight: 1.6 }}>
                Premium Solvent Cement by Saairishi Polymers Pvt. Ltd.
              </p>

              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  marginBottom: '2rem',
                  textAlign: 'left',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              >
                <strong style={{ color: 'var(--text-light)', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  Suitable for:
                </strong>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#3fe7d4', fontWeight: 500, fontSize: '0.95rem' }}>
                  <span>✔ PVC Pipes & Fittings</span>
                  <span>✔ UPVC Pipes & Fittings</span>
                  <span>✔ CPVC Pipes & Fittings</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-light)', fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                Strong Bonding | Fast Setting | Long Lasting Performance
              </p>
              <p style={{ color: 'var(--accent)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 0 }}>
                Available at Wholesale Prices
              </p>
            </div>

            {/* Right: Enhanced Product Presentation Card */}
            <div style={{ position: 'relative' }}>
              <div
                className="sahibond-card-presentation"
                style={{
                  background: '#ffffff',
                  border: '6px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '28px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  transform: 'rotate(1deg)',
                  transition: 'var(--transition)',
                  aspectRatio: '4/5',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '2rem 1.5rem'
                }}
              >
                <div style={{ width: '100%', height: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/assets/sahi_bond_cans_white.png" alt="SAHI BOND Cans" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ width: '80%', height: '1px', background: 'rgba(8, 23, 43, 0.08)', margin: '0.5rem auto' }}></div>
                <div style={{ width: '100%', height: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/assets/sahi_bond_tubes_white.jpg" alt="SAHI BOND Tubes & Boxes" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(8, 23, 43, 0.9) 0%, rgba(8, 23, 43, 0.0) 100%)',
                    padding: '1.5rem 1.5rem 1rem',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  <span style={{ background: 'var(--accent)', color: 'var(--text-light)', fontSize: '0.75rem', padding: '0.35rem 0.85rem', borderRadius: '50px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', display: 'inline-block', marginBottom: '0.25rem' }}>
                    Official Product Showcase
                  </span>
                  <h4 style={{ color: 'var(--text-light)', fontSize: '1.1rem', margin: 0, fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    SAHI BOND® PVC, UPVC & CPVC Cans & Tubes
                  </h4>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '100%', height: '100%', border: '2px dashed rgba(255, 255, 255, 0.15)', borderRadius: '28px', zIndex: -1, transform: 'rotate(-2deg)', pointerEvents: 'none' }}></div>
            </div>
          </div>

          {/* Why Choose SAHI BOND Grid */}
          <h3 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
            Why Choose SAHI BOND?
          </h3>
          <div className="sahibond-grid">
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>Strong & Durable Bonding</h4>
              <p>Formulated with virgin polymers for ultimate structural bond weld capacity and shear strength.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4>Fast Drying Formula</h4>
              <p>Designed for rapid curing, cutting down installation time and pressure test delay.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h4>Leak-Proof Joint Performance</h4>
              <p>Ensures robust chemical fusion, forming 100% leak-proof welds under high thermal pressure.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4>Smooth Application</h4>
              <p>Optimized viscosity prevents dripping or bubble pockets, resulting in clean joints.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4>Trusted by Contractors</h4>
              <p>Highly endorsed by leading engineers, plumbers, and structural builders across Maharashtra.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <h4>High Repeat Usage Product</h4>
              <p>Exceptional quality control guarantees high customer satisfaction and repeat commercial demand.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h4>Competitive Pricing</h4>
              <p>Offers the perfect balance of premium performance and economical wholesale pricing.</p>
            </div>
            <div className="sahibond-feature-card">
              <div className="sahibond-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h4>Reliable Quality Standards</h4>
              <p>Manufactured under strict ISO-compliant guidelines using high-grade solvents.</p>
            </div>
          </div>

          {/* Industries & Applications Section */}
          <div style={{ marginTop: '4.5rem', marginBottom: '4.5rem' }}>
            <h3 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
              Industries & Applications
            </h3>
            <p style={{ color: 'rgba(248,250,252,0.75)', textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', fontSize: '0.95rem' }}>
              Our high-performance solvent cements are engineered for exceptional performance in various fields:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🏠</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Residential Plumbing</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Perfect for residential home water lines and plumbing grids.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🏢</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Commercial Plumbing</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Robust bonding for multi-story towers and commercial assets.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🏭</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Industrial Piping</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Resistant to high chemical corrosion, pressure and extreme heat.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>💧</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Water Supply Systems</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Leak-proof sealing for agricultural and municipal supply nets.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🏗</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Construction Projects</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Heavy-duty reliability for commercial structural pipeline fits.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🔧</span>
                <strong style={{ color: 'var(--text-light)', fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Pipe Fittings Installation</strong>
                <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.6)', margin: 0 }}>Quick drying fusion ensuring fast, contractor-approved weld sets.</p>
              </div>
            </div>
          </div>

          {/* Opportunities Grid: Dealer & Third-Party Manufacturing */}
          <div className="sahibond-opportunities">
            {/* Dealer & Distributor Card */}
            <div className="opportunity-box">
              <h3>Dealer & Distributor <span>Opportunity</span></h3>
              <p className="opportunity-subdesc">We are expanding our dealer and distributor network across India.</p>

              <div className="opportunity-list">
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Strong Business Margins</h5>
                    <p>Generous margin structures ensuring strong returns on investment for regional distributor hubs.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Fast Moving Product Line</h5>
                    <p>Consistently high demand in building and plumbing works ensures rapid product turnover.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Marketing & Branding Support</h5>
                    <p>We provide marketing materials, on-site dealer boards, technical folders, and catalogs.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Long-Term Growth Opportunity</h5>
                    <p>Partner with an expanding brand to establish a stable and scalable wholesale market position.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Attractive Business Schemes</h5>
                    <p>Access exclusive quarterly and annual sales target bonuses and distributor schemes.</p>
                  </div>
                </div>
              </div>
              <Link to="/contact?subject=distributor" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Become a Partner
              </Link>
            </div>

            {/* Third-Party Job Work Card */}
            <div className="opportunity-box">
              <h3>Third-Party <span>Manufacturing</span></h3>
              <p className="opportunity-subdesc" style={{ marginBottom: '1.25rem', fontWeight: 600, color: 'var(--accent)' }}>
                Saairishi Polymers Pvt. Ltd. is also open for Job Work Manufacturing for:
              </p>
              <ul style={{ margin: '0 0 2rem 1.25rem', color: 'rgba(248, 250, 252, 0.9)', listStyleType: 'disc', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>PVC Solvent Cement</li>
                <li>UPVC Solvent Cement</li>
                <li>CPVC Solvent Cement</li>
              </ul>

              <p className="opportunity-subdesc" style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                We provide:
              </p>
              <div className="opportunity-list" style={{ marginTop: 0, marginBottom: '2rem' }}>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Custom Branding Support</h5>
                    <p>Complete design and branding support to print private labels under your proprietary brand names.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Quality Manufacturing</h5>
                    <p>Compounded in high-shear blending reactors ensuring high quality, density, and consistency.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Competitive Pricing</h5>
                    <p>Optimized production operations ensuring high margins for private labeling brands.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Reliable Supply Capacity</h5>
                    <p>Large-volume chemical storage and raw material feeds for consistent and stable supply.</p>
                  </div>
                </div>
                <div className="opportunity-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="opportunity-item-text">
                    <h5>Multiple Packaging Options</h5>
                    <p>Available in tubes and cans across a comprehensive range of custom sizes.</p>
                  </div>
                </div>
              </div>

              {/* Packaging Badges */}
              <div className="packaging-specs-list" style={{ marginTop: 0, marginBottom: '1.5rem' }}>
                <div className="packaging-type">
                  <h6 style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Available Packaging:</h6>
                  <div className="packaging-badges">
                    <span className="packaging-badge">20ml Tube</span>
                    <span className="packaging-badge">30ml Tube</span>
                    <span className="packaging-badge">50ml Tube / 50ml Can</span>
                    <span className="packaging-badge">100ml Can</span>
                    <span className="packaging-badge">250ml Can</span>
                  </div>
                </div>

                <div className="packaging-type" style={{ marginTop: '0.75rem' }}>
                  <h6 style={{ color: '#3fe7d4', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Suitable for:</h6>
                  <div className="packaging-badges">
                    <span className="packaging-badge" style={{ background: 'rgba(63, 231, 212, 0.08)', borderColor: 'rgba(63, 231, 212, 0.2)', color: '#3fe7d4' }}>Dealers</span>
                    <span className="packaging-badge" style={{ background: 'rgba(63, 231, 212, 0.08)', borderColor: 'rgba(63, 231, 212, 0.2)', color: '#3fe7d4' }}>Distributors</span>
                    <span className="packaging-badge" style={{ background: 'rgba(63, 231, 212, 0.08)', borderColor: 'rgba(63, 231, 212, 0.2)', color: '#3fe7d4' }}>Private Label Brands</span>
                    <span className="packaging-badge" style={{ background: 'rgba(63, 231, 212, 0.08)', borderColor: 'rgba(63, 231, 212, 0.2)', color: '#3fe7d4' }}>Plumbing Product Companies</span>
                  </div>
                </div>
              </div>

              <p style={{ color: 'rgba(248, 250, 252, 0.75)', fontSize: '0.85rem', lineHeight: 1.5, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', fontStyle: 'italic' }}>
                For business inquiries and manufacturing partnerships, contact us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request a Call/Quote Glassmorphic widget */}
      <section className="section" id="quoteCallToAction">
        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="contact-form-card" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: 'var(--text-light)', border: 'none' }}>
            <h3 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.2rem' }}>Quick Industrial Enquiry</h3>
            <p style={{ color: 'rgba(248, 250, 252, 0.7)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              Submit your specifications below. Our engineering desk will revert within 2 business hours with a complete commercial proposal.
            </p>
            
            <QuickEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
