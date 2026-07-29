/**
 * Saairishi Polymers Pvt. Ltd. - Website Core Client-Side Logic
 */

// Web3Forms Integration Config
const WEB3FORMS_ACCESS_KEY = "eb829016-5b8c-4660-8a51-b768601b488a"; // Replace with your actual key from https://web3forms.com/

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initHeroSlider();
    initActiveNavLinks();
    initForms();
    initModals();
    initProductCatalog();
    initAccordions();
    initHeroProductFlasher();
    initAutoScrollOnParams();
});

/* ==========================================================================
   Smooth Auto-Scroll to Targets on Query Parameters
   ========================================================================== */
function initAutoScrollOnParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const cat = urlParams.get('cat');
    
    if (subject) {
        const formCard = document.querySelector('.contact-form-card') || document.getElementById('detailedContactEnquiry');
        if (formCard) {
            setTimeout(() => {
                formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        }
    } else if (cat) {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            setTimeout(() => {
                productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    }
}

/* ==========================================================================
   Header Scroll Styling Transitions
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page is loaded scrolled down
}

/* ==========================================================================
   Mobile Responsive Navigation Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
}

/* ==========================================================================
   Automated Hero Background Carousel
   ========================================================================== */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, slideInterval);
}

/* ==========================================================================
   Smart Active State Highlighting for Navigation
   ========================================================================== */
function initActiveNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Simple matching logic
        if (currentPath.endsWith(linkPath) || 
           (currentPath === '/' && linkPath === 'index.html') ||
           (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================================================
   Premium Enquiry and Contact Form Validations
   ========================================================================== */
function initForms() {
    const forms = document.querySelectorAll('.validate-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check HTML5 validations
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Extract Form data
            const formData = new FormData(form);
            
            // Append Web3Forms credentials
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", "New Enquiry from Saairishi Website");
            formData.append("from_name", "Saairishi Polymers Website");
            
            const dataObj = {};
            formData.forEach((value, key) => {
                dataObj[key] = value;
            });
            
            showToast("Sending enquiry... Please wait.");
            
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Backup locally
                    const submissions = JSON.parse(localStorage.getItem('saairishi_enquiries') || '[]');
                    dataObj.id = Date.now();
                    dataObj.submittedAt = new Date().toISOString();
                    submissions.push(dataObj);
                    localStorage.setItem('saairishi_enquiries', JSON.stringify(submissions));
                    
                    // Reset the form inputs
                    form.reset();
                    
                    // Close details modal if open
                    const activeModal = document.querySelector('.modal-overlay.active');
                    if (activeModal) {
                        activeModal.classList.remove('active');
                    }
                    
                    showToast("Enquiry sent successfully! We will contact you shortly.");
                } else {
                    showToast("Error sending enquiry. Please check Web3Forms configuration.");
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Connection error. Could not send enquiry.");
            });
        });
    });
}

/* ==========================================================================
   Custom Beautiful Success Toast Alert
   ========================================================================== */
function showToast(message) {
    // Find or create toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Create toast structure
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger CSS animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto-remove toast after 4.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4500);
}

/* ==========================================================================
   Stateful Overlay Modals & Tabs
   ========================================================================== */
function initModals() {
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });
    
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    
    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                overlay.classList.remove('active');
            });
        }
    });
}

/* ==========================================================================
   Dynamic Search, Category Filters, and Modal Detail Hydration
   ========================================================================== */
// Centralized Product Database for Dynamic Rendering
const PRODUCTS_DATA = [
    {
        id: 'solvent-pvc',
        category: 'pvc',
        title: 'SAHI BOND PVC Solvent Cement',
        desc: 'Specially formulated for PVC pipe applications with strong adhesion and smooth flow. Engineered for strong bonding, fast setting, and long-lasting leak-proof piping joints.',
        canImage: 'assets/pvc_can.jpg',
        tubeImage: 'assets/pvc_tube.jpg',
        image: 'assets/pvc_can.jpg',
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
        canImage: 'assets/cpvc_can.jpg',
        tubeImage: 'assets/cpvc_tube.jpg',
        image: 'assets/cpvc_can.jpg',
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
        canImage: 'assets/upvc_can.jpg',
        tubeImage: 'assets/upvc_blue_tube.jpg',
        purpleTubeImage: 'assets/upvc_purple_tube.jpg',
        image: 'assets/upvc_can.jpg',
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

function initProductCatalog() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('catalogSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');
    
    if (!productsGrid) return;
    
    let activeCategory = 'all';
    
    // Parse URL parameters for category filters
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        activeCategory = catParam;
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === activeCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    let searchQuery = '';
    
    // Function to render matching product cards
    const renderProducts = () => {
        productsGrid.innerHTML = '';
        let matchingCount = 0;
        
        PRODUCTS_DATA.forEach(product => {
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery) || 
                                 product.desc.toLowerCase().includes(searchQuery);
            
            if (matchesCategory && matchesSearch) {
                matchingCount++;
                const card = document.createElement('div');
                card.className = `product-card select-${product.category}`;
                card.setAttribute('data-id', product.id);
                
                const hasThreeFormats = !!product.purpleTubeImage;
                const formatBarHTML = hasThreeFormats ? `
                    <div class="product-format-bar">
                        <button class="format-btn active" data-format="can" data-id="${product.id}">Cans</button>
                        <button class="format-btn" data-format="tube-blue" data-id="${product.id}">Blue Tube</button>
                        <button class="format-btn" data-format="tube-purple" data-id="${product.id}">Purple Tube</button>
                    </div>
                ` : `
                    <div class="product-format-bar">
                        <button class="format-btn active" data-format="can" data-id="${product.id}">Cans</button>
                        <button class="format-btn" data-format="tube" data-id="${product.id}">Tubes</button>
                    </div>
                `;
                
                card.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.canImage}" alt="${product.title}" id="img-${product.id}" class="fade-transition">
                        <span class="product-category-tag">${product.category}</span>
                        ${formatBarHTML}
                    </div>
                    <div class="product-details">
                        <h3>${product.title}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-meta-list">
                            <span class="product-meta-tag">${Object.keys(product.specs)[0]}: ${Object.values(product.specs)[0]}</span>
                            <span class="product-meta-tag">${Object.keys(product.specs)[1]}: ${Object.values(product.specs)[1]}</span>
                        </div>
                        <button class="product-cta-btn open-details-btn">View Specifications</button>
                    </div>
                `;
                
                // Format switching event listeners
                const productImg = card.querySelector(`#img-${product.id}`);
                const formatBtns = card.querySelectorAll(`.format-btn`);
                
                formatBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation(); // prevent opening details modal
                        if (btn.classList.contains('active')) return;
                        
                        const format = btn.getAttribute('data-format');
                        let targetSrc = '';
                        
                        if (format === 'can') {
                            targetSrc = product.canImage;
                        } else if (format === 'tube') {
                            targetSrc = product.tubeImage;
                        } else if (format === 'tube-blue') {
                            targetSrc = product.tubeImage;
                        } else if (format === 'tube-purple') {
                            targetSrc = product.purpleTubeImage;
                        }
                        
                        if (targetSrc && productImg) {
                            productImg.style.opacity = '0';
                            setTimeout(() => {
                                productImg.src = targetSrc;
                                productImg.style.opacity = '1';
                            }, 200);
                            
                            formatBtns.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                        }
                    });
                });
                
                // Add event listener to open detail modal
                card.querySelector('.open-details-btn').addEventListener('click', () => {
                    hydrateAndOpenDetailModal(product);
                });
                
                productsGrid.appendChild(card);
            }
        });
        
        // Show/hide no results message
        if (matchingCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    };
    
    // Category click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter');
            renderProducts();
        });
    });
    
    // Live Search handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderProducts();
        });
    }
    
    // Set counts next to side category tags dynamically
    filterBtns.forEach(btn => {
        const cat = btn.getAttribute('data-filter');
        const countBadge = btn.querySelector('.filter-count');
        if (countBadge) {
            const count = cat === 'all' ? PRODUCTS_DATA.length : 
                          PRODUCTS_DATA.filter(p => p.category === cat).length;
            countBadge.textContent = count;
        }
    });

    // Initial render
    renderProducts();
}

/* ==========================================================================
   Hydrate Details Modal with Spec Sheets
   ========================================================================== */
function hydrateAndOpenDetailModal(product) {
    let modal = document.getElementById('detailsModal');
    if (!modal) return;
    
    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;
    
    // Hydrate Specs Table HTML
    let tableRowsHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
        tableRowsHTML += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
        `;
    }
    
    // Set Modal Body HTML dynamically
    const hasThreeVisuals = !!product.purpleTubeImage;
    let visualsHTML = `
        <div class="visual-card">
            <span class="visual-badge">Can Packaging</span>
            <div class="visual-img-container">
                <img src="${product.canImage}" alt="${product.title} Can">
            </div>
        </div>
    `;
    
    if (hasThreeVisuals) {
        visualsHTML += `
            <div class="visual-card">
                <span class="visual-badge">Purple Tube & Box</span>
                <div class="visual-img-container">
                    <img src="${product.purpleTubeImage}" alt="${product.title} Purple Tube">
                </div>
            </div>
            <div class="visual-card">
                <span class="visual-badge">Blue Tube & Box</span>
                <div class="visual-img-container">
                    <img src="${product.tubeImage}" alt="${product.title} Blue Tube">
                </div>
            </div>
        `;
    } else {
        visualsHTML += `
            <div class="visual-card">
                <span class="visual-badge">Tube & Box</span>
                <div class="visual-img-container">
                    <img src="${product.tubeImage}" alt="${product.title} Tube">
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="modal-product-detail">
            <div class="modal-product-visuals ${hasThreeVisuals ? 'three-visuals' : ''}">
                ${visualsHTML}
            </div>
            <div class="modal-product-info">
                <span class="modal-tag">${product.category}</span>
                <h2>${product.title}</h2>
                <p>${product.desc}</p>
                
                <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem; border-bottom: 1.5px solid var(--border-color); padding-bottom: 0.4rem;">Technical Specifications</h3>
                <table class="modal-specs-table">
                    <tbody>
                        ${tableRowsHTML}
                    </tbody>
                </table>
                
                <h3 style="font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1.5px solid var(--border-color); padding-bottom: 0.4rem;">Quick Corporate Inquiry</h3>
                <form class="validate-form" id="modalEnquiryForm">
                    <input type="hidden" name="InquiredProduct" value="${product.title}">
                    <div class="form-grid" style="grid-template-columns: 1fr; gap: 0.5rem;">
                        <div class="form-group" style="margin-bottom: 0.75rem;">
                            <input type="text" class="form-control" name="ClientName" placeholder="Your Name" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 0.75rem;">
                            <input type="email" class="form-control" name="ClientEmail" placeholder="Your Email Address" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 0.75rem;">
                            <input type="tel" class="form-control" name="ClientPhone" placeholder="Mobile Number" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <textarea class="form-control" name="ClientMessage" placeholder="Detailed Specifications / Quantity required..." style="min-height: 80px;" required>Please send me a detailed quote for ${product.title}.</textarea>
                        </div>
                    </div>
                    <button type="submit" class="form-submit-btn" style="padding: 0.8rem 1.5rem;">Submit Instant Quote Request</button>
                </form>
            </div>
        </div>
    `;
    
    // Add close handler to new modal close button
    const closeBtn = modalBody.querySelector('#modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Bind form validation logic to the freshly injected dynamic modal form
    const dynamicForm = modalBody.querySelector('#modalEnquiryForm');
    if (dynamicForm) {
        dynamicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!dynamicForm.checkValidity()) {
                dynamicForm.reportValidity();
                return;
            }
            
            const formData = new FormData(dynamicForm);
            
            // Append Web3Forms credentials
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", `Quote Request for ${product.title}`);
            formData.append("from_name", "Saairishi Polymers Website");
            
            const dataObj = {};
            formData.forEach((value, key) => {
                dataObj[key] = value;
            });
            
            showToast("Sending request... Please wait.");
            
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const submissions = JSON.parse(localStorage.getItem('saairishi_enquiries') || '[]');
                    dataObj.id = Date.now();
                    dataObj.submittedAt = new Date().toISOString();
                    submissions.push(dataObj);
                    localStorage.setItem('saairishi_enquiries', JSON.stringify(submissions));
                    
                    modal.classList.remove('active');
                    showToast(`Quote request for ${product.title} sent successfully!`);
                } else {
                    showToast("Error sending request. Please try again.");
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Connection error. Could not send request.");
            });
        });
    }
    
    // Open the modal
    modal.classList.add('active');
}

/* ==========================================================================
   Collapsible Accordion Panels for Infrastructure & Quality
   ========================================================================== */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const body = item.querySelector('.accordion-body');
            if (!body) return;
            
            const isActive = item.classList.contains('active');
            
            // Close all sibling accordions in this wrapper
            const parent = item.closest('.accordion-wrapper');
            if (parent) {
                parent.querySelectorAll('.accordion-item').forEach(sib => {
                    sib.classList.remove('active');
                    const sibBody = sib.querySelector('.accordion-body');
                    if (sibBody) sibBody.style.maxHeight = null;
                });
            }
            
            // Toggle active state
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                body.style.maxHeight = null;
            }
        });
    });
    
    // Auto-expand any active accordion items on page load
    document.querySelectorAll('.accordion-item.active').forEach(item => {
        const body = item.querySelector('.accordion-body');
        if (body) {
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
}

/* ==========================================================================
   Dynamic Product Flasher Slider inside Hero Landing Banner
   ========================================================================== */
function initHeroProductFlasher() {
    const flasherImg = document.getElementById("flasherImg");
    const flasherTitle = document.getElementById("flasherTitle");
    const flasherCategory = document.getElementById("flasherCategory");
    const flasherDesc = document.getElementById("flasherDesc");
    const dots = document.querySelectorAll(".flasher-dot");
    
    if (!flasherImg) return;
    
    const flasherData = [
        {
            title: "SAHI BOND PVC Cement",
            category: "PVC Solvent Cement",
            desc: "Specially formulated for PVC pipe applications with strong adhesion and smooth flow.",
            images: ["assets/pvc_can.jpg", "assets/pvc_tube.jpg"]
        },
        {
            title: "SAHI BOND UPVC Cement",
            category: "UPVC Solvent Cement",
            desc: "Designed for UPVC plumbing systems with quick setting and leak-proof performance.",
            images: ["assets/upvc_can.jpg", "assets/upvc_blue_tube.jpg", "assets/upvc_purple_tube.jpg"]
        },
        {
            title: "SAHI BOND CPVC Cement",
            category: "CPVC Solvent Cement",
            desc: "High-strength bonding solution suitable for hot & cold water CPVC piping systems.",
            images: ["assets/cpvc_can.jpg", "assets/cpvc_tube.jpg"]
        }
    ];

    let currentProductIndex = 0;
    let currentImageIndex = 0;

    function rotateFlasher() {
        // Cycle image index first inside the same product
        currentImageIndex++;
        if (currentImageIndex >= flasherData[currentProductIndex].images.length) {
            // Shift to next product
            currentImageIndex = 0;
            currentProductIndex = (currentProductIndex + 1) % flasherData.length;
        }
        
        const prod = flasherData[currentProductIndex];
        
        // Fade out
        flasherImg.style.opacity = "0";
        flasherImg.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            // Update details
            flasherImg.src = prod.images[currentImageIndex];
            flasherTitle.textContent = prod.title;
            
            // Adjust label text specifically for UPVC blue and purple
            let customLabel = prod.category;
            if (currentProductIndex === 1) {
                customLabel += currentImageIndex === 0 ? " (Can)" : currentImageIndex === 1 ? " (Blue Tube)" : " (Purple Tube)";
            } else {
                customLabel += currentImageIndex === 0 ? " (Can)" : " (Tube)";
            }
            
            flasherCategory.textContent = customLabel;
            flasherDesc.textContent = prod.desc;
            
            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === currentProductIndex) {
                    dot.style.width = "24px";
                    dot.style.background = "var(--accent)";
                } else {
                    dot.style.width = "8px";
                    dot.style.background = "rgba(8, 23, 43, 0.15)";
                }
            });
            
            // Fade in
            flasherImg.style.opacity = "1";
            flasherImg.style.transform = "scale(1)";
        }, 400);
    }
    
    // Add dot click event listeners for quick navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            if (isNaN(index) || index === currentProductIndex) return;
            
            currentProductIndex = index;
            currentImageIndex = 0;
            
            const prod = flasherData[currentProductIndex];
            
            // Trigger transition instantly
            flasherImg.style.opacity = "0";
            flasherImg.style.transform = "scale(0.95)";
            
            setTimeout(() => {
                flasherImg.src = prod.images[currentImageIndex];
                flasherTitle.textContent = prod.title;
                flasherCategory.textContent = prod.category + " (Can)";
                flasherDesc.textContent = prod.desc;
                
                dots.forEach((d, idx) => {
                    if (idx === currentProductIndex) {
                        d.style.width = "24px";
                        d.style.background = "var(--accent)";
                    } else {
                        d.style.width = "8px";
                        d.style.background = "rgba(8, 23, 43, 0.15)";
                    }
                });
                
                flasherImg.style.opacity = "1";
                flasherImg.style.transform = "scale(1)";
            }, 300);
        });
    });

    // Start interval
    setInterval(rotateFlasher, 2500);
}
