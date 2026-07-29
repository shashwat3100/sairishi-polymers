import React, { useState } from 'react';

export default function About() {
  // Accordion active state
  const [activeAccordion, setActiveAccordion] = useState({
    0: true,
    1: true,
    2: true
  });

  const toggleAccordion = (idx) => {
    setActiveAccordion((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const timelineData = [
    {
      title: "January 2025 — Official Incorporation",
      content: "Saairishi Polymers Pvt. Ltd. was incorporated in Nagpur, Maharashtra. Set up register desk in Khamla and initiated formulation setup for PVC cements."
    },
    {
      title: "Mid 2025 — FRP Integration & Testing Lab",
      content: "Expanded operations by launching custom fiberglass reinforced plastic (FRP) cylindrical chemical vessels and organic agricultural vermicompost tanks, establishing a state-of-the-art testing lab."
    },
    {
      title: "2026 & Beyond — Nationwide Distributor Networks",
      content: "Strengthening active distribution channels across India for solvent segments and custom linings, focusing on supporting heavy agricultural and pipe manufacturing hubs in Maharashtra."
    }
  ];

  return (
    <div>
      {/* Sub-Hero Page Header Banner */}
      <section className="hero" style={{ height: '45vh', minHeight: '350px' }} id="aboutHero">
        <div className="hero-slider-bg">
          <div className="hero-slide active" style={{ backgroundImage: "url('/assets/hero_bg.png')", filter: 'blur(2px)' }}></div>
        </div>
        <div className="container hero-container" style={{ marginTop: '20px' }}>
          <div className="badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            ESTABLISHED IN MAHARASHTRA
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Corporate Profile</h1>
          <p className="hero-desc" style={{ fontSize: '1.1rem', marginBottom: 0, maxWidth: '600px' }}>
            Learn more about the engineering vision, structural capabilities, and leadership team behind Saairishi Polymers.
          </p>
        </div>
      </section>

      {/* Corporate Overview Section */}
      <section className="section" id="corporateOverview">
        <div className="container">
          <div className="intro-grid" style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
            <div className="intro-text">
              <h3>Our Foundation</h3>
              <h2>Empowering Indian Industry With Premium Engineering</h2>
              <p>
                Incorporated on January 13, 2025, in the major industrial center of Nagpur, Maharashtra, Saairishi Polymers Private Limited was built upon a clear goal: to design and deliver high-strength, premium plastic articles, solvent cements, and FRP chemical storage systems that meet complex engineering specifications.
              </p>
              <p>
                Operating as a dealer and distributor for leading solvent segments, as well as an independent manufacturer, we have successfully optimized our product lines. Today, our solutions protect civil infrastructure pipelines, secure logistics supply lines, and store corrosive agents across chemical complexes.
              </p>
            </div>
            
            <div className="quality-image-card">
              <div className="quality-image-wrapper" style={{ height: '300px' }}>
                <img src="/assets/hero_bg.png" alt="Saairishi Manufacturing Layout" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Segment with exact user data */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }} id="aboutUsExact">
        <div className="container">
          <div className="intro-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="intro-text">
              <span style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1.5px', display: 'block', marginBottom: '0.5rem' }}>
                About Us
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>About Saairishi Polymers Pvt. Ltd.</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Saairishi Polymers Pvt. Ltd. proudly presents <strong>SAHI BOND</strong>, a high-performance range of solvent cements specially designed for plumbing, construction, and industrial applications.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: 0 }}>
                We aim to provide premium quality products at competitive pricing for dealers, distributors, plumbers, and contractors across India.
              </p>
            </div>
            
            <div className="about-deliver-card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontSize: '1.4rem' }}>⚙</span> Our Products Are Manufactured To Deliver:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>✔</span> Strong and reliable bonding
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>✔</span> Fast setting performance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>✔</span> Leak-proof joints
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>✔</span> Long-lasting durability
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>✔</span> Contractor trusted quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy (Vision, Mission, Values) Grid */}
      <section className="section section-bg" id="philosophyShowcase">
        <div className="container">
          <div className="section-header">
            <h2>Our Corporate Philosophy</h2>
            <p>Guided by rigid engineering values and ethical distribution standards, we focus on client trust.</p>
          </div>
          
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {/* Card 1 */}
            <div className="category-card" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>To manufacture and supply next-generation polymer products and composite containers utilizing virgin, non-recycled raw materials that provide maximum service life in severe commercial environments.</p>
            </div>
            
            {/* Card 2 */}
            <div className="category-card" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>To become a leading manufacturer in central India for composite FRP systems and heavy industrial adhesives, driving eco-friendly formulations that minimize VOC emissions without sacrificing bond strength.</p>
            </div>
            
            {/* Card 3 */}
            <div className="category-card" style={{ padding: '2.5rem', textAlign: 'center', alignItems: 'center' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>Quality Policy</h3>
              <p>Every solvent batch and molded tank is subjected to systematic chemical checks, volumetric leak analysis, and stress tests to ensure adherence to international ASTM and ISO specifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board Section */}
      <section className="section" id="leadershipBoard">
        <div className="container">
          <div className="section-header">
            <h2>Our Board of Directors</h2>
            <p>Guided by experienced corporate minds in polymer technologies and distributor logistics in Nagpur.</p>
          </div>
          
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', maxWidth: '900px', margin: '0 auto', gap: '3rem' }}>
            {/* Director 1 */}
            <div className="category-card" style={{ textAlign: 'center', alignItems: 'center', padding: '3rem 2rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(19,177,158,0.25)', border: '3px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/saahiel_malewar.png" alt="Saahiel Malewar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: '0.25rem' }}>Saahiel Malewar</h3>
              <span style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'block' }}>
                Director & Co-Founder
              </span>
              <p>Brings advanced expertise in polymer formulation engineering and technical raw material sourcing, managing our core solvent cements research and manufacturing desk.</p>
            </div>
            
            {/* Director 2 */}
            <div className="category-card" style={{ textAlign: 'center', alignItems: 'center', padding: '3rem 2rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(19,177,158,0.25)' }}>
                RI
              </div>
              <h3 style={{ marginBottom: '0.25rem' }}>Rishinath Ishwar</h3>
              <span style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'block' }}>
                Director & Co-Founder
              </span>
              <p>Directs our logistics, marketing distribution frameworks, and pan-India dealer relationships, ensuring that our products reach structural clients efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="section section-bg" id="companyTimeline">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="section-header">
            <h2>Our Growth Path</h2>
            <p>A brief history of our quick milestones and long-term targets.</p>
          </div>
          
          <div className="accordion-wrapper" style={{ gap: '1.5rem' }}>
            {timelineData.map((item, idx) => (
              <div key={idx} className={`accordion-item ${activeAccordion[idx] ? 'active' : ''}`}>
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={activeAccordion[idx]}
                >
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: idx === 0 ? 'var(--accent)' : 'var(--primary)' }}>
                    {item.title}
                  </h4>
                  <span className="accordion-header-icon" style={{ transform: activeAccordion[idx] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '18px', height: '18px' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </button>
                <div 
                  className="accordion-body" 
                  style={{ 
                    maxHeight: activeAccordion[idx] ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.35s ease'
                  }}
                >
                  <div className="accordion-body-content" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Products Portfolio Section */}
      <section className="section" id="upcomingProducts">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="sahibond-sub" style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem', textAlign: 'center' }}>
              More Products Coming Soon
            </span>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.2rem' }}>Upcoming Products</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Saairishi Polymers Pvt. Ltd. is continuously expanding its product portfolio with new high-quality plumbing and polymer solutions. Stay connected with us for exciting upcoming product launches.
            </p>
          </div>
          
          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '900px', margin: '0 auto', gap: '2.5rem' }}>
            {/* Product 1 */}
            <div className="category-card" style={{ textAlign: 'center', alignItems: 'center', padding: '2.5rem 2rem' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M8 12h8" />
                </svg>
              </div>
              <h3>Advanced Polymer Fittings</h3>
              <p>High-grade PVC & CPVC structural pipe fittings and industrial valves engineered for heavy commercial networks.</p>
            </div>
            
            {/* Product 2 */}
            <div className="category-card" style={{ textAlign: 'center', alignItems: 'center', padding: '2.5rem 2rem' }}>
              <div className="category-icon" style={{ margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Specialty Sealants & Joints</h3>
              <p>Eco-friendly silicone and rubber sealants designed for extreme sealing in high-pressure construction and plumbing projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
