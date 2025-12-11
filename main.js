document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector(".typing");
    if (typingElement) {
        new Typed(".typing", {
            strings: ["", "Full-Stack Developer", "React Developer"],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }

    const nav = document.querySelector(".nav");
    if (!nav) return;
    
    const navList = nav.querySelectorAll("li"),
        totalNavList = navList.length,
        allSection = document.querySelectorAll(".section"),
        totalSection = allSection.length;

    for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function(e) {
            e.preventDefault();
            removeBackSection();
            for (let j = 0; j < totalNavList; j++) {
                if (navList[j].querySelector("a").classList.contains("active")) {
                    addBackSection(j);
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);
            if (window.innerWidth < 1200) {
                asideSectionTogglerBtn();
            }
        });
    }

    function removeBackSection() {
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }
    }

    function addBackSection(num) {
        allSection[num].classList.add("back-section");
    }

    function showSection(element) {
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active");
    }

    function updateNav(element) {
        for (let i = 0; i < totalNavList; i++) {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }

    const hireMeBtn = document.querySelector(".hire-me");
    if (hireMeBtn) {
        hireMeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        });
    }

    const aboutMeBtn = document.querySelector(".about-me");
    if (aboutMeBtn) {
        aboutMeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        });
    }

    const portfolioMeBtn = document.querySelector(".portfolio-me");
    if (portfolioMeBtn) {
        portfolioMeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        });
    }

    const navTogglerBtn = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");

    if (navTogglerBtn && aside) {
        navTogglerBtn.addEventListener("click", () => {
            asideSectionTogglerBtn();
        });
    }

    function asideSectionTogglerBtn() {
        if (aside) aside.classList.toggle("open");
        if (navTogglerBtn) navTogglerBtn.classList.toggle("open");
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.toggle("open");
        }
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .skill-item, .portfolio-item, .contact-info-item').forEach(el => {
        observer.observe(el);
    });

    const skillBars = document.querySelectorAll('.progress-in');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            // Remove existing error styling
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (field.type === 'email' && value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (field.name === 'name' && value && value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (field.name === 'message' && value && value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }

            if (!isValid) {
                field.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errorMessage;
                field.parentNode.appendChild(errorDiv);
            }

            return isValid;
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validateForm() {
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            return isValid;
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                // Show a more user-friendly error message
                showNotification('Please correct the errors in the form before submitting.', 'error');
                return;
            }

            // Disable submit button and show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            }

            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name')?.trim(),
                email: formData.get('email')?.trim(),
                subject: formData.get('subject')?.trim(),
                message: formData.get('message')?.trim(),
            };

            try {
                const res = await fetch('/api/send-contact-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok || !data.success) {
                    showNotification('Sorry, something went wrong while sending your message. Please try again in a moment or email me directly at oneeb590@gmail.com.', 'error');
                    return;
                }

                // Show success notification instead of alert
                showNotification('Thank you for reaching out! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Clear any validation errors
                contactForm.querySelectorAll('.error').forEach(field => {
                    field.classList.remove('error');
                });
                contactForm.querySelectorAll('.error-message').forEach(msg => {
                    msg.remove();
                });

            } catch (err) {
                console.error('Contact form error:', err);
                showNotification('Unexpected error sending your message. Please try again, or email me directly at oneeb590@gmail.com.', 'error');
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
            }
        });
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fa fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }
});
