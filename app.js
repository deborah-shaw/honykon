/**
 * Hony Kon Irrigation Website - Interactive JavaScript
 * Single file for all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Preloader.init();
    Navigation.init();
    Animations.init();
    Accordion.init();
    Portfolio.init();
    ContactForm.init();
    Counter.init();
    BackToTop.init();
    ScrollEffects.init();
    InteractiveElements.init();
});

/**
 * Preloader Module
 */
const Preloader = {
    init() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        // Hide preloader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 800);
        });
    }
};

/**
 * Navigation Module
 */
const Navigation = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.mobileBtn = document.querySelector('.mobile-menu-btn');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.mobileClose = document.querySelector('.mobile-nav-close');
        this.mobileOverlay = document.querySelector('.mobile-nav-overlay');
        
        this.handleScroll();
        this.bindEvents();
        this.setActiveLink();
        this.initDropdownHover();
        this.initMobileToroToggle(); // <--- Initialize the new toggle here
    },
    
    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu
        if (this.mobileBtn) {
            this.mobileBtn.addEventListener('click', () => this.openMobileMenu());
        }
        
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // We target all links inside the mobile navigation
        const allMobileLinks = document.querySelectorAll('.mobile-nav-links a');
        allMobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // We use the existing closeMobileMenu function you already defined
                this.closeMobileMenu();
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });
    },

    // --- NEW METHOD FOR TORO TOGGLE ---
    initMobileToroToggle() {
        // Target the specific arrow icon instead of the whole row
        const arrowToggle = document.querySelector('.arrow-icon-toggle');
        const toroSubItems = document.querySelector('.toro-sub-items');

        if (arrowToggle && toroSubItems) {
            arrowToggle.addEventListener('click', (e) => {
                // Prevent the click from affecting parent links
                e.preventDefault();
                e.stopPropagation();
                
                const isHidden = toroSubItems.style.display === 'none' || toroSubItems.style.display === '';
                
                // Toggle visibility
                toroSubItems.style.display = isHidden ? 'block' : 'none';
                
                // Rotate the arrow icon
                arrowToggle.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
                arrowToggle.style.transition = 'transform 0.3s ease';
            });
        }
    },

    handleScroll() {
        if (!this.navbar) return;
        
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    openMobileMenu() {
        if (this.mobileNav) this.mobileNav.classList.add('open');
        if (this.mobileOverlay) this.mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    },
    
    closeMobileMenu() {
        if (this.mobileNav) this.mobileNav.classList.remove('open');
        if (this.mobileOverlay) this.mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    },
    
    setActiveLink() {
        // Set active state based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === '/' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
    
    initDropdownHover() {
        // Add hover delay for dropdowns on desktop
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            let timeout;
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
            });
            dropdown.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.opacity = '0';
                }, 200);
            });
        });
    },
    
    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
};

/**
 * Animations Module
 */
const Animations = {
    init() {
        this.observeElements();
        this.initParallax();
        this.initTypeWriter();
    },
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },
    
    initParallax() {
        // Simple parallax effect for hero sections
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxElements = document.querySelectorAll('.hero::before, .hero-water-animation');
            parallaxElements.forEach(el => {
                if (el) {
                    el.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            });
        });
    },
    
    initTypeWriter() {
        const typeElements = document.querySelectorAll('.type-writer');
        typeElements.forEach(el => {
            const text = el.getAttribute('data-text') || el.textContent;
            el.textContent = '';
            let i = 0;
            const speed = parseInt(el.getAttribute('data-speed')) || 50;
            
            const type = () => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };
            
            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.disconnect();
                }
            });
            observer.observe(el);
        });
    }
};

/**
 * Accordion Module
 */
const Accordion = {
    init() {
        // 1. Handle Main Accordions
        const mainItems = document.querySelectorAll('.accordion-item');
        mainItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', (e) => {
                    // Prevent click from bubbling if needed, 
                    // though not strictly necessary for the top level
                    this.toggle(item, '.accordion-item');
                });
            }
        });

        // 2. Handle Sub-Accordions (Nested)
        const subItems = document.querySelectorAll('.sub-accordion-item');
        subItems.forEach(subItem => {
            const subHeader = subItem.querySelector('.sub-accordion-header');
            if (subHeader) {
                subHeader.addEventListener('click', (e) => {
                    // Stop the click from triggering the parent accordion's toggle
                    e.stopPropagation(); 
                    this.toggle(subItem, '.sub-accordion-item');
                });
            }
        });
    },

    toggle(item, selector) {
        const isActive = item.classList.contains('active');

        // Close only siblings within the same level/parent
        const parentContainer = item.parentElement;
        parentContainer.querySelectorAll(`${selector}.active`).forEach(activeItem => {
            if (activeItem !== item) {
                activeItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
    }
};

/**
 * Portfolio Module
 */
const Portfolio = {
    init() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
        
        // Modal functionality for portfolio items
        this.portfolioItems.forEach(item => {
            item.addEventListener('click', () => this.openModal(item));
        });
    },
    
    filter(btn) {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items with animation
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    },
    
    openModal(item) {
        const title = item.querySelector('h4')?.textContent || '';
        const desc = item.querySelector('p')?.textContent || '';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            cursor: pointer;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            z-index: 1;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        const close = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        }, { once: true });
    }
};

/**
 * Contact Form Module
 */
const ContactForm = {
    init() {
        const forms = document.querySelectorAll('.contact-form form, form[data-validate]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
        
        // Real-time validation
        document.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    },
    
    handleSubmit(e, form) {
        e.preventDefault();
        
        if (this.validateForm(form)) {
            this.submitForm(form);
        }
    },
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = '此欄位為必填';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '請輸入有效的電子郵件地址';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\-\+\(\)\s]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = '請輸入有效的電話號碼';
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    },
    
    showError(field, message) {
        field.style.borderColor = '#f44336';
        
        // Remove existing error
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Add new error message
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #f44336; font-size: 0.85rem; display: block; margin-top: 5px;';
        field.parentElement.appendChild(error);
    },
    
    clearError(field) {
        field.style.borderColor = '';
        const error = field.parentElement.querySelector('.error-message');
        if (error) error.remove();
    },
    
    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitBtn?.textContent || '提交';
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner" style="width: 20px; height: 20px; border-width: 2px; display: inline-block; vertical-align: middle; margin-right: 8px;"></span>處理中...';
        }
        
        // Simulate form submission
        setTimeout(() => {
            Toast.show('表單提交成功！我們會盡快與您聯繫。');
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }, 1500);
    }
};

/**
 * Counter Animation Module
 */
const Counter = {
    init() {
        const counters = document.querySelectorAll('.counter[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    },
    
    animate(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        update();
    }
};

/**
 * Back to Top Module
 */
const BackToTop = {
    init() {
        this.btn = document.querySelector('.back-to-top');
        if (!this.btn) return;
        
        window.addEventListener('scroll', () => this.toggle());
        this.btn.addEventListener('click', () => this.scrollToTop());
    },
    
    toggle() {
        if (window.scrollY > 500) {
            this.btn.classList.add('visible');
        } else {
            this.btn.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/**
 * Scroll Effects Module
 */
const ScrollEffects = {
    init() {
        this.initProgressBar();
        this.initRevealOnScroll();
    },
    
    initProgressBar() {
        // Reading progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    },
    
    initRevealOnScroll() {
        const reveals = document.querySelectorAll('[data-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, delay);
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        
        reveals.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
};

/**
 * Interactive Elements Module
 */
const InteractiveElements = {
    init() {
        this.initCards();
        this.initButtons();
        this.initLazyLoading();
        this.initCopyToClipboard();
    },
    
    initCards() {
        // 3D tilt effect for cards
        document.querySelectorAll('.card, .product-card, .feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => this.tiltCard(e, card));
            card.addEventListener('mouseleave', () => this.resetCard(card));
        });
    },
    
    tiltCard(e, card) {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    },
    
    resetCard(card) {
        card.style.transform = '';
    },
    
    initButtons() {
        // Ripple effect for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRipple(e, btn));
        });
    },
    
    createRipple(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    },
    
    initLazyLoading() {
        // Lazy load images
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.src = el.getAttribute('data-lazy');
                    el.removeAttribute('data-lazy');
                    observer.unobserve(el);
                }
            });
        });
        
        lazyElements.forEach(el => observer.observe(el));
    },
    
    initCopyToClipboard() {
        // Copy functionality for contact info
        document.querySelectorAll('[data-copy]').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                const text = el.getAttribute('data-copy');
                navigator.clipboard?.writeText(text).then(() => {
                    Toast.show('已複製到剪貼簿！');
                });
            });
        });
    }
};

/**
 * Toast Notification Utility
 */
const Toast = {
    show(message, duration = 3000) {
        let toast = document.querySelector('.toast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
};

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Clear the form
window.onpageshow = () => document.querySelector('form')?.reset();

document.head.appendChild(style);