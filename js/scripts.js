/*!
 * Trio Luxury Homes - Custom Scripts
 */

window.addEventListener('DOMContentLoaded', event => {

    // =====================================
    // NAVBAR SHRINK FUNCTION
    // =====================================
    const navbarShrink = function() {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // =====================================
    // COLLAPSE RESPONSIVE NAVBAR
    // =====================================
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // =====================================
    // PORTFOLIO FILTER FUNCTIONALITY
    // =====================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        // Support space-separated multi-category (e.g. "sold custom-build")
                        const categories = (item.getAttribute('data-category') || '').split(' ');
                        if (categories.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // =====================================
    // CONTACT FORM HANDLING
    // =====================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                reason: document.getElementById('reason').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.reason) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Send to FormSubmit.co which will email all three addresses
            fetch('https://formsubmit.co/ajax/spatel@realestatesagar.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.reason,
                    _cc: 'sitkaventures@gmail.com,info@trioluxuryhomes.com',
                    _subject: 'New Contact Form Submission - Trio Luxury Homes',
                    _template: 'table'
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        });
    }

    // =====================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for # links (like collapse toggles)
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================
    // FADE IN ANIMATIONS ON SCROLL
    // =====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to specific sections
    const fadeElements = document.querySelectorAll('.intro-section, .approach-item, .process-step, .value-item');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // =====================================
    // SOCIAL LINKS SCROLL COLOR CHANGE
    // =====================================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

});
