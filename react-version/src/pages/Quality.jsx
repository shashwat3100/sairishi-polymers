import React, { useState } from 'react';

export default function Quality() {
  // Accordion active state
  const [activeAccordion, setActiveAccordion] = useState({
    0: true,
    1: false,
    2: false
  });

  const toggleAccordion = (idx) => {
    setActiveAccordion((prev) => {
      // Close others and toggle selected (accordion behavior)
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      newState[idx] = !prev[idx];
      return newState;
    });
  };

  const accordionData = [
    {
      title: "1. Raw Materials Inspection & Chemical Solvents Purity Checks",
      content: "Before compounding, all organic chemical solvents (including tetrahydrofuran, methyl ethyl ketone, and cyclohexanone) and high-grade PVC, UPVC, and CPVC polymer resins are systematically checked for density, purity, and solid moisture content, ensuring strict compliance with premium ASTM manufacturing specifications."
    },
    {
      title: "2. Automatic Blending & High-Shear Sealed Mixing Reactors",
      content: "For SAHI BOND® solvent cements, we utilize advanced sealed stainless-steel blending reactors. This ensures complete isolation during high-shear mixing of CPVC, PVC, and uPVC resin powders in premium organic solvents. This process prevents dust infiltration and ensures a homogeneous, bubble-free syrup of consistent density, fast setting behavior, and extremely high bond-weld capacity."
    },
    {
      title: "3. Automated Leak-Proof Packaging & Hermetic Tube Filling Lines",
      content: "Our packaging lines utilize automated tube-filling machines and hermetic sealing presses. This continuous computer-controlled setup ensures precise filling volumes across our entire tube (20ml, 30ml, 50ml) and can (100ml, 250ml) ranges, sealing them in airtight environments to prevent solvent evaporation and guarantee a long active product shelf life."
    }
  ];

  return (
    <div>
      {/* Sub-Hero Page Header Banner */}
      <section className="hero" style={{ height: '45vh', minHeight: '350px' }} id="qualityHero">
        <div className="hero-slider-bg">
          <div className="hero-slide active" style={{ backgroundImage: "url('/assets/hero_bg.png')", filter: 'blur(2px)' }}></div>
        </div>
        <div className="container hero-container" style={{ marginTop: '20px' }}>
          <div className="badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            ZERO TOLERANCE LEAKAGE COMPLIANCE
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Quality & Facility</h1>
          <p className="hero-desc" style={{ fontSize: '1.1rem', marginBottom: 0, maxWidth: '600px' }}>
            Review our laboratory verification steps, thermal testing parameters, and advanced extruder machinery.
          </p>
        </div>
      </section>

      {/* Quality Assurance System Section */}
      <section className="section" id="qualitySystem">
        <div className="container">
          <div className="quality-intro-grid">
            <div className="intro-text">
              <h3>QC Standards</h3>
              <h2>Precision Inspection at Every Phase</h2>
              <p>
                At Saairishi Polymers Pvt. Ltd., quality is not a final milestone; it is integrated directly into our compounding and winding setups. Our products undergo rigorous testing before dispatch, maintaining zero-defect ratings across all batches.
              </p>
              <p>
                Our quality control laboratory operates standard testing setups for plastic articles, composite resins, and solvent cements:
              </p>
              
              <div className="quality-feature-list">
                {/* Item 1 */}
                <div className="quality-feature-item">
                  <div className="quality-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div className="quality-feature-text">
                    <h4>SAHI BOND® Viscosity & Curing Speed Inspection</h4>
                    <p>
                      Every batch of SAHI BOND® PVC, uPVC, and CPVC solvent cement is strictly monitored for viscosity, solids content, and curing speed, ensuring strong bonding, fast setting, and 100% leak-proof joints satisfying ASTM testing limits.
                    </p>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="quality-feature-item">
                  <div className="quality-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="quality-feature-text">
                    <h4>Hydrostatic Pressure Stress Tests</h4>
                    <p>
                      Every solvent cemented joint is subjected to intense hydrostatic pressure load tests, verifying wall welding and pressure integrity up to ASTM limits.
                    </p>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="quality-feature-item">
                  <div className="quality-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <div className="quality-feature-text">
                    <h4>Thermal & Chemical Stability Checks</h4>
                    <p>
                      We verify solvent cement performance at elevated hot and cold water temperatures, ensuring durable chemical stability under severe piping operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="quality-image-card">
              <div 
                className="quality-image-wrapper" 
                style={{ 
                  background: '#ffffff', 
                  padding: '2rem', 
                  borderRadius: '20px', 
                  boxShadow: 'var(--card-shadow)', 
                  border: '1px solid var(--border-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden', 
                  height: '350px' 
                }}
              >
                <img src="/assets/sahi_bond_cans_white.png" alt="Official SAHI BOND PVC, UPVC & CPVC Cements Packaging" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Facilities Section (Accordion list) */}
      <section className="section section-bg" id="manufacturingInfrastructure">
        <div className="container">
          <div className="section-header">
            <h2>Manufacturing Infrastructure</h2>
            <p>Equipped with advanced stainless-steel high-shear mixing reactors, automatic viscosity-meter systems, and hermetic filling packaging machinery based in Nagpur.</p>
          </div>
          
          <div className="accordion-wrapper" id="infraAccordion">
            {accordionData.map((item, idx) => (
              <div key={idx} className={`accordion-item ${activeAccordion[idx] ? 'active' : ''}`}>
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={activeAccordion[idx]}
                >
                  <h4>{item.title}</h4>
                  <span className="accordion-header-icon" style={{ transform: activeAccordion[idx] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
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
    </div>
  );
}
