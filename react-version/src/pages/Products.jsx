import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { showToast } from '../utils/toast';

const WEB3FORMS_ACCESS_KEY = "eb829016-5b8c-4660-8a51-b768601b488a"; // Replace with your actual key from https://web3forms.com/

const PRODUCTS_DATA = [
  {
    id: 'solvent-pvc',
    category: 'pvc',
    title: 'SAHI BOND PVC Solvent Cement',
    desc: 'Specially formulated for PVC pipe applications with strong adhesion and smooth flow. Engineered for strong bonding, fast setting, and long-lasting leak-proof piping joints.',
    canImage: '/assets/pvc_can.jpg',
    tubeImage: '/assets/pvc_tube.jpg',
    specs: {
      'Material Compatibility': 'PVC Pipes & Fittings',
      'Available Packaging': 'Tubes (20ml, 30ml, 50ml) | Cans (100ml, 250ml)',
      'Performance Features': 'Strong Bonding, Fast Setting, Long Lasting Performance',
      'Viscosity': 'Medium Syrupy Liquid',
      'Color': 'Clear / Blue / Green',
      'Standards Compliance': 'ASTM D2564 Grade'
    }
  },
  {
    id: 'solvent-cpvc',
    category: 'cpvc',
    title: 'SAHI BOND CPVC Solvent Cement',
    desc: 'High-strength bonding solution suitable for hot & cold water CPVC piping systems. Delivers fast setting, long-lasting performance, smooth application, and contractor-trusted quality.',
    canImage: '/assets/cpvc_can.jpg',
    tubeImage: '/assets/cpvc_tube.jpg',
    specs: {
      'Material Compatibility': 'CPVC Pipes & Fittings',
      'Available Packaging': 'Tubes (20ml, 30ml, 50ml) | Cans (100ml, 250ml)',
      'Performance Features': 'Hot & Cold Water Compliant, High Thermal Stability',
      'Viscosity': 'Heavy Bodied Liquid',
      'Color': 'Orange / Yellow',
      'Standards Compliance': 'ASTM F493 Grade'
    }
  },
  {
    id: 'solvent-upvc',
    category: 'upvc',
    title: 'SAHI BOND UPVC Solvent Cement',
    desc: 'Designed for UPVC plumbing systems with quick setting and leak-proof performance. Ideal for rigid UPVC pressure networks and pipe installations.',
    canImage: '/assets/upvc_can.jpg',
    tubeImage: '/assets/upvc_blue_tube.jpg',
    purpleTubeImage: '/assets/upvc_purple_tube.jpg',
    specs: {
      'Material Compatibility': 'UPVC Pipes & Fittings',
      'Available Packaging': 'Tubes (20ml, 30ml, 50ml) | Cans (100ml, 250ml)',
      'Performance Features': 'Fast Drying Formula, High Pressure Seal, Easy Flow',
      'Viscosity': 'Medium Bodied Liquid',
      'Color': 'Clear / Grey',
      'Standards Compliance': 'BS EN 14680 Compliant'
    }
  }
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  
  // Format state per product (e.g. { 'solvent-pvc': 'can', 'solvent-upvc': 'tube-blue' })
  const [productFormats, setProductFormats] = useState({});
  // Fade status per product to control transitions
  const [productFades, setProductFades] = useState({});
  // Selected product to display in details modal
  const [modalProduct, setModalProduct] = useState(null);
  
  // Modal Enquiry Form State
  const [modalEnquiry, setModalEnquiry] = useState({
    ClientName: '',
    ClientEmail: '',
    ClientPhone: '',
    ClientMessage: ''
  });

  // Load URL changes and populate initial formats
  useEffect(() => {
    const initialFormats = {};
    const initialFades = {};
    PRODUCTS_DATA.forEach(p => {
      initialFormats[p.id] = 'can';
      initialFades[p.id] = true;
    });
    setProductFormats(initialFormats);
    setProductFades(initialFades);
  }, []);

  // Format click handler with animation
  const handleFormatChange = (prodId, newFormat) => {
    if (productFormats[prodId] === newFormat) return;

    setProductFades(prev => ({ ...prev, [prodId]: false }));
    setTimeout(() => {
      setProductFormats(prev => ({ ...prev, [prodId]: newFormat }));
      setProductFades(prev => ({ ...prev, [prodId]: true }));
    }, 200);
  };

  // Get active format image path
  const getProductImage = (product) => {
    const format = productFormats[product.id] || 'can';
    if (format === 'can') return product.canImage;
    if (format === 'tube') return product.tubeImage;
    if (format === 'tube-blue') return product.tubeImage;
    if (format === 'tube-purple') return product.purpleTubeImage;
    return product.canImage;
  };

  // Handle open modal
  const openDetailsModal = (product) => {
    setModalProduct(product);
    setModalEnquiry({
      ClientName: '',
      ClientEmail: '',
      ClientPhone: '',
      ClientMessage: `Please send me a detailed quote for ${product.title}.`
    });
  };

  // Handle close modal
  const closeDetailsModal = () => {
    setModalProduct(null);
  };

  // Modal enquiry form changes
  const handleModalFormChange = (e) => {
    const { name, value } = e.target;
    setModalEnquiry(prev => ({ ...prev, [name]: value }));
  };

  // Modal enquiry submission
  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    if (!modalEnquiry.ClientName || !modalEnquiry.ClientEmail || !modalEnquiry.ClientPhone || !modalEnquiry.ClientMessage) {
      showToast("Please fill in all details.");
      return;
    }

    showToast("Sending quote request... Please wait.");

    const web3FormData = new FormData();
    web3FormData.append("access_key", WEB3FORMS_ACCESS_KEY);
    web3FormData.append("subject", `Quote Request for ${modalProduct.title}`);
    web3FormData.append("from_name", "Saairishi Polymers Website");
    web3FormData.append("InquiredProduct", modalProduct.title);
    Object.entries(modalEnquiry).forEach(([key, value]) => {
      web3FormData.append(key, value);
    });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const submissions = JSON.parse(localStorage.getItem('saairishi_enquiries') || '[]');
        const newSubmission = {
          ...modalEnquiry,
          InquiredProduct: modalProduct.title,
          id: Date.now(),
          submittedAt: new Date().toISOString()
        };
        submissions.push(newSubmission);
        localStorage.setItem('saairishi_enquiries', JSON.stringify(submissions));

        closeDetailsModal();
        showToast(`Quote request for ${modalProduct.title} sent successfully!`);
      } else {
        showToast("Error sending request. Please try again.");
      }
    })
    .catch(err => {
      console.error(err);
      showToast("Connection error. Could not send request.");
    });
  };

  // Dynamic filter lists
  const handleCategoryFilter = (cat) => {
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  // Filtered dataset
  const filteredProducts = PRODUCTS_DATA.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate counts for categories sidebar
  const getCategoryCount = (cat) => {
    if (cat === 'all') return PRODUCTS_DATA.length;
    return PRODUCTS_DATA.filter(p => p.category === cat).length;
  };

  return (
    <div>
      {/* Sub-Hero Page Header Banner */}
      <section className="hero" style={{ height: '45vh', minHeight: '350px' }} id="productsHero">
        <div className="hero-slider-bg">
          <div className="hero-slide active" style={{ backgroundImage: "url('/assets/hero_bg.png')", filter: 'blur(2px)' }}></div>
        </div>
        <div className="container hero-container" style={{ marginTop: '20px' }}>
          <div className="badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            COMPLIANT WITH ASTM & BS EN STANDARDS
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Products Catalog</h1>
          <p className="hero-desc" style={{ fontSize: '1.1rem', marginBottom: 0, maxWidth: '600px' }}>
            Filter through our commercial ranges, review engineering specifications sheets, and request instant proposals.
          </p>
        </div>
      </section>

      {/* Interactive Product Directory Section */}
      <section className="section" id="productCatalog">
        <div className="container">
          <div className="product-catalog-layout">
            
            {/* Search & Filters Sidebar */}
            <aside className="catalog-sidebar">
              {/* Search Widget */}
              <div className="sidebar-widget">
                <h3>Live Search</h3>
                <div className="search-box">
                  <input 
                    type="text" 
                    id="catalogSearch" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords..." 
                  />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
              
              {/* Categories Filter Widget */}
              <div className="sidebar-widget">
                <h3>Segments</h3>
                <div className="filter-list">
                  <button 
                    className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('all')}
                  >
                    <span>All Products</span>
                    <span className="filter-count">{getCategoryCount('all')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'pvc' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('pvc')}
                  >
                    <span>PVC Solvent Cement</span>
                    <span className="filter-count">{getCategoryCount('pvc')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'upvc' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('upvc')}
                  >
                    <span>UPVC Solvent Cement</span>
                    <span className="filter-count">{getCategoryCount('upvc')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${activeCategory === 'cpvc' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('cpvc')}
                  >
                    <span>CPVC Solvent Cement</span>
                    <span className="filter-count">{getCategoryCount('cpvc')}</span>
                  </button>
                </div>
              </div>
              
              {/* Support Card Widget */}
              <div className="sidebar-widget" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: 'var(--text-light)', border: 'none' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Bespoke Design?</h4>
                <p style={{ color: 'rgba(248,250,252,0.8)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  We fabricate custom diameter FRP vessels and custom chemical grade linings. Get in touch with our technical design desk today.
                </p>
                <Link to="/contact" className="contact-btn" style={{ borderColor: 'var(--accent)', color: 'var(--text-light)', display: 'block', textAlign: 'center', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  Contact Technical Team
                </Link>
              </div>

              {/* Private Label Widget */}
              <div className="sidebar-widget" style={{ background: 'rgba(59, 98, 255, 0.05)', border: '1px dashed var(--accent)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Job Work & Manufacturing</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Saairishi Polymers Pvt. Ltd. is open for Job Work Manufacturing of SAHI BOND solvent cements.
                </p>
                
                <strong style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Available Packaging:</strong>
                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1.1rem', marginBottom: '1rem', listStyleType: 'square', lineHeight: 1.5 }}>
                  <li>20ml Tube</li>
                  <li>30ml Tube</li>
                  <li>50ml Tube / 50ml Can</li>
                  <li>100ml Can</li>
                  <li>250ml Can</li>
                </ul>
                
                <Link to="/contact?subject=jobwork" className="contact-btn" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', display: 'block', textAlign: 'center', fontSize: '0.85rem', padding: '0.5rem 1rem', width: '100%', fontWeight: 600, background: 'transparent' }}>
                  Inquire Partnerships
                </Link>
              </div>
            </aside>
            
            {/* Main Products View Grid */}
            <div className="products-wrapper">
              <div className="products-grid" id="productsGrid" style={{ display: filteredProducts.length > 0 ? 'grid' : 'none' }}>
                {filteredProducts.map(product => {
                  const hasThreeFormats = !!product.purpleTubeImage;
                  const currentFormat = productFormats[product.id] || 'can';
                  const currentFade = productFades[product.id] !== false;

                  return (
                    <div className={`product-card select-${product.category}`} key={product.id}>
                      <div className="product-image-container">
                        <img 
                          src={getProductImage(product)} 
                          alt={product.title} 
                          className="fade-transition"
                          style={{
                            opacity: currentFade ? 1 : 0,
                            transition: 'opacity 0.2s ease-in-out'
                          }}
                        />
                        <span className="product-category-tag">{product.category}</span>
                        
                        {hasThreeFormats ? (
                          <div className="product-format-bar">
                            <button 
                              className={`format-btn ${currentFormat === 'can' ? 'active' : ''}`}
                              onClick={() => handleFormatChange(product.id, 'can')}
                            >
                              Cans
                            </button>
                            <button 
                              className={`format-btn ${currentFormat === 'tube-blue' ? 'active' : ''}`}
                              onClick={() => handleFormatChange(product.id, 'tube-blue')}
                            >
                              Blue Tube
                            </button>
                            <button 
                              className={`format-btn ${currentFormat === 'tube-purple' ? 'active' : ''}`}
                              onClick={() => handleFormatChange(product.id, 'tube-purple')}
                            >
                              Purple Tube
                            </button>
                          </div>
                        ) : (
                          <div className="product-format-bar">
                            <button 
                              className={`format-btn ${currentFormat === 'can' ? 'active' : ''}`}
                              onClick={() => handleFormatChange(product.id, 'can')}
                            >
                              Cans
                            </button>
                            <button 
                              className={`format-btn ${currentFormat === 'tube' ? 'active' : ''}`}
                              onClick={() => handleFormatChange(product.id, 'tube')}
                            >
                              Tubes
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="product-details">
                        <h3>{product.title}</h3>
                        <p className="product-desc">{product.desc}</p>
                        <div className="product-meta-list">
                          <span className="product-meta-tag">
                            {Object.keys(product.specs)[0]}: {Object.values(product.specs)[0]}
                          </span>
                          <span className="product-meta-tag">
                            {Object.keys(product.specs)[1]}: {Object.values(product.specs)[1]}
                          </span>
                        </div>
                        <button 
                          className="product-cta-btn open-details-btn"
                          onClick={() => openDetailsModal(product)}
                        >
                          View Specifications
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Custom Empty State */}
              <div 
                className="no-results" 
                id="noResults"
                style={{ display: filteredProducts.length === 0 ? 'block' : 'none' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <path d="M16 16v1a2 2 0 0 1-2 2h-1" />
                </svg>
                <h3>No Matching Products Found</h3>
                <p>Try refining your search keyword or selecting a different segment filter.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Overlay Specifications Sheet Modal Component */}
      {modalProduct && (
        <div className="modal-overlay active" id="detailsModal" onClick={(e) => e.target.id === 'detailsModal' && closeDetailsModal()}>
          <div className="modal-content">
            <div className="modal-body">
              <button 
                className="modal-close-btn" 
                id="modalCloseBtn" 
                aria-label="Close modal"
                onClick={closeDetailsModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="modal-product-detail">
                <div className={`modal-product-visuals ${modalProduct.purpleTubeImage ? 'three-visuals' : ''}`}>
                  <div className="visual-card">
                    <span className="visual-badge">Can Packaging</span>
                    <div className="visual-img-container">
                      <img src={modalProduct.canImage} alt={`${modalProduct.title} Can`} />
                    </div>
                  </div>
                  
                  {modalProduct.purpleTubeImage ? (
                    <>
                      <div className="visual-card">
                        <span className="visual-badge">Purple Tube & Box</span>
                        <div className="visual-img-container">
                          <img src={modalProduct.purpleTubeImage} alt={`${modalProduct.title} Purple Tube`} />
                        </div>
                      </div>
                      <div className="visual-card">
                        <span className="visual-badge">Blue Tube & Box</span>
                        <div className="visual-img-container">
                          <img src={modalProduct.tubeImage} alt={`${modalProduct.title} Blue Tube`} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="visual-card">
                      <span className="visual-badge">Tube & Box</span>
                      <div className="visual-img-container">
                        <img src={modalProduct.tubeImage} alt={`${modalProduct.title} Tube`} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="modal-product-info">
                  <span className="modal-tag">{modalProduct.category}</span>
                  <h2>{modalProduct.title}</h2>
                  <p>{modalProduct.desc}</p>
                  
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    Technical Specifications
                  </h3>
                  <table className="modal-specs-table">
                    <tbody>
                      {Object.entries(modalProduct.specs).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    Quick Corporate Inquiry
                  </h3>
                  
                  <form className="validate-form" id="modalEnquiryForm" onSubmit={handleModalFormSubmit}>
                    <input type="hidden" name="InquiredProduct" value={modalProduct.title} />
                    <div className="form-grid" style={{ gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="ClientName" 
                          value={modalEnquiry.ClientName}
                          onChange={handleModalFormChange}
                          placeholder="Your Name" 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="ClientEmail" 
                          value={modalEnquiry.ClientEmail}
                          onChange={handleModalFormChange}
                          placeholder="Your Email Address" 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <input 
                          type="tel" 
                          className="form-control" 
                          name="ClientPhone" 
                          value={modalEnquiry.ClientPhone}
                          onChange={handleModalFormChange}
                          placeholder="Mobile Number" 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <textarea 
                          className="form-control" 
                          name="ClientMessage" 
                          value={modalEnquiry.ClientMessage}
                          onChange={handleModalFormChange}
                          placeholder="Detailed Specifications / Quantity required..." 
                          style={{ minHeight: '80px' }} 
                          required
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="form-submit-btn" style={{ padding: '0.8rem 1.5rem' }}>
                      Submit Instant Quote Request
                    </button>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
