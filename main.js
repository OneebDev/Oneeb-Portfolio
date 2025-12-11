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
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name')?.trim(),
                email: formData.get('email')?.trim(),
                subject: formData.get('subject')?.trim(),
                message: formData.get('message')?.trim(),
            };

            if (!payload.name || !payload.email || !payload.subject || !payload.message) {
                alert('Please fill in all required fields before sending your message.');
                return;
            }

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
                    alert('Sorry, something went wrong while sending your message. Please try again in a moment or email me directly at oneeb590@gmail.com.');
                    return;
                }

                alert('Thank you for reaching out! Your message has been sent successfully.');
                contactForm.reset();
            } catch (err) {
                console.error('Contact form error:', err);
                alert('Unexpected error sending your message. Please try again, or email me directly at oneeb590@gmail.com.');
            }
        });
    }
});
