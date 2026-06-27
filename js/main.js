// Main JavaScript for 3D Artist Portfolio

// ============================================
// SECTION NAVIGATION & ACTIVE MENU
// ============================================

(function () {
    const sections = document.querySelectorAll('.horizontal-section');
    const navLinks = document.querySelectorAll('#verticalNavMenu a');
    const scrollWrapper = document.querySelector('#app-scroll');
    let currentActiveId = 'home';

    // Fungsi untuk menyembunyikan semua section dan hanya menampilkan yang dipilih
    function showOnlySelectedSection(sectionId) {
        // Sembunyikan SEMUA section terlebih dahulu
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Tampilkan section yang dipilih
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'flex';

            // Tambahkan animasi halus
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(10px)';

            // Force reflow
            void targetSection.offsetWidth;

            targetSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';

            // Scroll ke atas konten utama
            if (scrollWrapper) {
                scrollWrapper.scrollTo({ top: 0, behavior: 'instant' });
            }

            // Update active menu
            currentActiveId = sectionId;
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('data-section-id');
                if (href === sectionId) {
                    link.classList.add('active');
                }
            });

            // Re-initialize Swiper jika section home ditampilkan
            if (sectionId === 'home') {
                setTimeout(() => {
                    if (window.clientSwiperInstance) {
                        window.clientSwiperInstance.update();
                        window.clientSwiperInstance.autoplay.start();
                    }
                }, 100);
            }

            // Re-initialize Swiper jika section about ditampilkan (testimonial)
            if (sectionId === 'about') {
                setTimeout(() => {
                    if (window.testimonialSwiperInstance) {
                        window.testimonialSwiperInstance.update();
                        window.testimonialSwiperInstance.autoplay.start();
                    }
                }, 100);
            }
        }
    }

    // Navigation menu click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const sectionId = link.getAttribute('data-section-id');
            if (sectionId) {
                showOnlySelectedSection(sectionId);
            }
        });
    });

    // Button navigation (untuk tombol di dalam section)
    const navButtons = document.querySelectorAll('[data-nav-section]');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const sectionName = btn.getAttribute('data-nav-section');
            if (sectionName) {
                showOnlySelectedSection(sectionName);
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (scrollWrapper) {
                scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Tampilkan home section pertama kali
    showOnlySelectedSection('home');

    // Update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.innerText = new Date().getFullYear();
    }

    // Mobile sidebar toggle
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('dashboardSidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 &&
                sidebar.classList.contains('mobile-open') &&
                !sidebar.contains(e.target) &&
                e.target !== toggleBtn &&
                !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        });
    }

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Tambahkan CSS untuk transisi section
    const style = document.createElement('style');
    style.textContent = `
        .horizontal-section {
            transition: opacity 0.3s ease, transform 0.3s ease;
            will-change: opacity, transform;
        }
    `;
    document.head.appendChild(style);

})();

// ============================================
// SWIPER INITIALIZATION
// ============================================

function initSwipers() {
    if (typeof Swiper === 'undefined') {
        setTimeout(initSwipers, 100);
        return;
    }

    // Client Slider
    const clientSwiperElement = document.querySelector('.client-swiper');
    if (clientSwiperElement) {
        window.clientSwiperInstance = new Swiper('.client-swiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            centeredSlides: false,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.client-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: false,
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                },
            },
        });
    }

    // Testimonial Slider - Enhanced
    const testimonialSwiperElement = document.querySelector('.testimonial-swiper');
    if (testimonialSwiperElement) {
        window.testimonialSwiperInstance = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: true,
            centeredSlides: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.testimonial-swiper .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            // Smooth transition
            speed: 600,
            // Grab cursor
            grabCursor: true,
        });
    }
}

// Initialize Swipers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwipers);
} else {
    initSwipers();
}

// Re-initialize on window load untuk memastikan
window.addEventListener('load', function () {
    if (window.clientSwiperInstance) {
        window.clientSwiperInstance.update();
    }
    if (window.testimonialSwiperInstance) {
        window.testimonialSwiperInstance.update();
    }
});

// ============================================
// WORK SECTION FILTER FUNCTIONALITY
// ============================================

(function initWorkFilter() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFilter);
    } else {
        setupFilter();
    }

    function setupFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        if (!filterBtns.length || !portfolioCards.length) return;

        // Filter function
        function filterProjects(category) {
            let visibleCount = 0;

            portfolioCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    // Show card with animation
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    card.offsetHeight; // Force reflow
                    card.style.animation = `fadeInUp 0.5s ease-out ${visibleCount * 0.05}s backwards`;
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide view more button based on visible count
            const viewMoreBtn = document.querySelector('.work-view-more');
            if (viewMoreBtn) {
                if (visibleCount <= 6) {
                    viewMoreBtn.style.display = 'block';
                } else {
                    viewMoreBtn.style.display = 'none';
                }
            }
        }

        // Add click event to filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Apply filter with animation class
                const grid = document.querySelector('.portfolio-grid-enhanced');
                if (grid) {
                    grid.classList.add('filter-transition');
                    setTimeout(() => {
                        filterProjects(filterValue);
                        grid.classList.remove('filter-transition');
                    }, 50);
                } else {
                    filterProjects(filterValue);
                }
            });
        });

        // Load More functionality
        const loadMoreBtn = document.querySelector('.work-view-more .btn');
        if (loadMoreBtn) {
            let currentVisible = 6;
            const totalCards = portfolioCards.length;

            // Initially hide cards beyond 6
            if (totalCards > 6) {
                portfolioCards.forEach((card, index) => {
                    if (index >= 6) {
                        card.style.display = 'none';
                    }
                });
            } else {
                loadMoreBtn.style.display = 'none';
            }

            loadMoreBtn.addEventListener('click', function (e) {
                e.preventDefault();

                let newVisible = currentVisible + 3;
                let newlyShown = 0;

                portfolioCards.forEach((card, index) => {
                    if (index >= currentVisible && index < newVisible && card.style.display === 'none') {
                        card.style.display = 'block';
                        card.style.animation = `fadeInUp 0.5s ease-out ${newlyShown * 0.1}s backwards`;
                        newlyShown++;
                    }
                });

                currentVisible = newVisible;

                // Hide button if all cards are visible
                if (currentVisible >= totalCards) {
                    loadMoreBtn.style.display = 'none';
                }

                // Update button text with count
                const remaining = totalCards - currentVisible;
                if (remaining > 0) {
                    loadMoreBtn.innerHTML = `<i class="ti-arrow-down"></i> Load ${Math.min(3, remaining)} More Projects (${remaining} left)`;
                }
            });
        }

        // Trigger initial filter to show proper count
        filterProjects('all');
    }
})();

// Add CSS animation for filter transition
const filterAnimationStyle = document.createElement('style');
filterAnimationStyle.textContent = `
    .filter-transition {
        transition: all 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Hover effect enhancement for cards */
    .portfolio-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .portfolio-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    /* Smooth scroll for filter */
    .work-filter {
        scroll-margin-top: 20px;
    }
`;
document.head.appendChild(filterAnimationStyle);

// ============================================
// SERVICES SECTION - ENHANCED INTERACTIVITY
// ============================================

(function initEnhancedServices() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupServices);
    } else {
        setupServices();
    }

    function setupServices() {
        // Add hover sound effect simulation (visual only)
        const serviceCards = document.querySelectorAll('.service-card-enhanced');
        
        // Ripple effect on click
        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on CTA button
                if (e.target.closest('.service-cta')) return;
                
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('service-ripple');
                ripple.style.left = `${e.clientX - card.getBoundingClientRect().left}px`;
                ripple.style.top = `${e.clientY - card.getBoundingClientRect().top}px`;
                
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple style
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .service-ripple {
                position: absolute;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle, rgba(108, 99, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            }
            
            @keyframes rippleAnimation {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(-50%, -50%) scale(15);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        // Add intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all service cards for scroll animation
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
})();

// ============================================
// TEAM SECTION - ENHANCED INTERACTIVITY (No Modal)
// ============================================

(function initEnhancedTeam() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTeam);
    } else {
        setupTeam();
    }

    function setupTeam() {
        // Add 3D tilt effect on team cards
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            // Tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
            
            // Add subtle entrance animation reset on hover out
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease';
            });
        });

        // Add intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all team card inner elements
        const cardInners = document.querySelectorAll('.team-card .team-card-inner');
        cardInners.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Optional: Add click handler for social icons (prevent default)
        const socialLinks = document.querySelectorAll('.social-icon');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // You can replace this with actual social links
                console.log('Social link clicked:', link.getAttribute('title'));
            });
        });
    }
})();

// ============================================
// BLOG SECTION - FILTER & NEWSLETTER
// ============================================

(function initEnhancedBlog() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupBlog);
    } else {
        setupBlog();
    }

    function setupBlog() {
        // Blog Filter Functionality
        const filterBtns = document.querySelectorAll('.blog-filter-btn');
        const blogCards = document.querySelectorAll('.blog-card-enhanced');
        
        if (filterBtns.length && blogCards.length) {
            function filterBlogPosts(category) {
                let visibleCount = 0;
                
                blogCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        card.style.animation = `blogCardFadeIn 0.5s ease-out ${visibleCount * 0.1}s backwards`;
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active state
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Get filter value
                    const filterValue = this.getAttribute('data-blog-filter');
                    
                    // Apply filter with animation
                    const grid = document.querySelector('.blog-grid-enhanced');
                    if (grid) {
                        grid.style.opacity = '0.5';
                        setTimeout(() => {
                            filterBlogPosts(filterValue);
                            grid.style.opacity = '1';
                        }, 150);
                    } else {
                        filterBlogPosts(filterValue);
                    }
                });
            });
            
            // Initial filter
            filterBlogPosts('all');
        }
        
        // Newsletter Form Handler
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                if (email) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.textContent = '✓ Thanks for subscribing! Check your inbox.';
                    successMsg.style.cssText = `
                        color: #4caf50;
                        font-size: 0.85rem;
                        margin-top: 1rem;
                        text-align: center;
                    `;
                    
                    newsletterForm.reset();
                    
                    // Remove any existing message
                    const existingMsg = newsletterForm.parentElement.querySelector('.newsletter-success');
                    if (existingMsg) existingMsg.remove();
                    
                    successMsg.classList.add('newsletter-success');
                    newsletterForm.parentElement.appendChild(successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }
            });
        }
        
        // Add hover parallax effect on blog images
        const blogImages = document.querySelectorAll('.blog-image-wrapper');
        blogImages.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img) {
                wrapper.addEventListener('mousemove', (e) => {
                    const rect = wrapper.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    const moveX = (x - 0.5) * 10;
                    const moveY = (y - 0.5) * 10;
                    img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
                });
                
                wrapper.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1) translate(0, 0)';
                });
            }
        });
        
        // Add intersection observer for scroll animations
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.blog-card-enhanced').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        // Add click handlers for read more links
        const readMoreLinks = document.querySelectorAll('.blog-read-more');
        readMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Article clicked:', link.closest('.blog-card-enhanced')?.querySelector('.blog-title')?.textContent);
                // You can replace with actual article navigation
            });
        });
    }
})();

// ============================================
// CONTACT SECTION - FORM VALIDATION (Compact)
// ============================================

(function initEnhancedContact() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupContact);
    } else {
        setupContact();
    }

    function setupContact() {
        const form = document.getElementById('enhancedContactForm');
        if (!form) return;

        const submitBtn = document.getElementById('contactSubmitBtn');
        const statusMessage = document.getElementById('formStatusMessage');
        
        // Form validation function
        function validateField(field, type) {
            const value = field.value.trim();
            const errorDiv = document.querySelector(`.form-error[data-for="${field.id}"]`);
            
            if (!value) {
                showError(field, errorDiv, 'This field is required');
                return false;
            }
            
            if (type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, errorDiv, 'Enter a valid email');
                    return false;
                }
            }
            
            if (type === 'name' && value.length < 2) {
                showError(field, errorDiv, 'Name must be at least 2 characters');
                return false;
            }
            
            if (type === 'subject' && value.length < 3) {
                showError(field, errorDiv, 'Subject must be at least 3 characters');
                return false;
            }
            
            if (type === 'message' && value.length < 10) {
                showError(field, errorDiv, 'Message must be at least 10 characters');
                return false;
            }
            
            hideError(field, errorDiv);
            return true;
        }
        
        function showError(field, errorDiv, message) {
            field.style.borderColor = '#f44336';
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.classList.add('visible');
            }
        }
        
        function hideError(field, errorDiv) {
            field.style.borderColor = '';
            if (errorDiv) {
                errorDiv.classList.remove('visible');
            }
        }
        
        // Add real-time validation
        const nameField = document.getElementById('contactName');
        const emailField = document.getElementById('contactEmail');
        const subjectField = document.getElementById('contactSubject');
        const messageField = document.getElementById('contactMessage');
        
        if (nameField) {
            nameField.addEventListener('input', () => validateField(nameField, 'name'));
        }
        if (emailField) {
            emailField.addEventListener('input', () => validateField(emailField, 'email'));
        }
        if (subjectField) {
            subjectField.addEventListener('input', () => validateField(subjectField, 'subject'));
        }
        if (messageField) {
            messageField.addEventListener('input', () => validateField(messageField, 'message'));
        }
        
        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const isNameValid = nameField ? validateField(nameField, 'name') : true;
            const isEmailValid = emailField ? validateField(emailField, 'email') : true;
            const isSubjectValid = subjectField ? validateField(subjectField, 'subject') : true;
            const isMessageValid = messageField ? validateField(messageField, 'message') : true;
            
            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                return;
            }
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            // Simulate submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                form.reset();
                
                if (statusMessage) {
                    statusMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    statusMessage.classList.add('success');
                }
                
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    
                    if (statusMessage) {
                        statusMessage.classList.remove('success');
                        statusMessage.textContent = '';
                    }
                    
                    [nameField, emailField, subjectField, messageField].forEach(field => {
                        if (field) field.style.borderColor = '';
                    });
                }, 3000);
            }
        });
        
        // Social link click handlers
        const socialLinks = document.querySelectorAll('.contact-social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const social = link.getAttribute('data-social');
                console.log(`Social link clicked: ${social}`);
            });
        });
        
        // Intersection observer for animations
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            card.style.transition = `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`;
            observer.observe(card);
        });
        
        const formElement = document.querySelector('.contact-form-compact');
        if (formElement) {
            formElement.style.opacity = '0';
            formElement.style.transform = 'translateY(15px)';
            formElement.style.transition = 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s';
            observer.observe(formElement);
        }
    }
})();

// ============================================
// THREE.JS 3D BACKGROUND
// ============================================

import * as THREE from 'three';
import { GLTFLoader } from '../js/GLTFLoader.js';

function initThreeJS() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510);
    scene.fog = new THREE.FogExp2(0x050510, 0.008);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none';

    scene.add(new THREE.AmbientLight(0x404060, 1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);

    const neonLight1 = new THREE.PointLight(0x6c63ff, 1.5, 15);
    neonLight1.position.set(-2, 1, 2);
    scene.add(neonLight1);

    const neonLight2 = new THREE.PointLight(0xff66cc, 1.5, 15);
    neonLight2.position.set(2, 1, 2);
    scene.add(neonLight2);

    const loader = new GLTFLoader();
    let face;
    loader.load('../3dfile/Astronaut.glb', function (gltf) {
        face = gltf.scene;
        face.scale.set(2, 2, 2);
        face.position.set(0, -2.2, 0);
        face.traverse((child) => {
            if (child.isMesh) {
                child.material.metalness = 0.7;
                child.material.roughness = 0.3;
                child.material.emissive = new THREE.Color(0x2a1e5a);
                child.material.emissiveIntensity = 0.6;
            }
        });
        scene.add(face);
    });

    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 100;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x88aaff, size: 0.05, transparent: true, opacity: 0.6 }));
    scene.add(stars);

    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        particlePos[i * 3] = (Math.random() - 0.5) * 20;
        particlePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0xff66cc, size: 0.08, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
    scene.add(particles);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        if (face) {
            face.rotation.y += 0.01;
            face.rotation.x = Math.sin(time * 0.5) * 0.2;
        }

        stars.rotation.y += 0.0008;
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;

        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        camera.position.x = Math.sin(time * 0.3) * 0.5;
        camera.position.y = 1.5 + Math.sin(time * 0.2) * 0.2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

document.addEventListener('DOMContentLoaded', initThreeJS);