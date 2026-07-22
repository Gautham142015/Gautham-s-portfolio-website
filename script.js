document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. LIVE RUNNING CLOCK
       ========================================================================== */
    function updateClock() {
        const clockEl = document.getElementById('system-clock');
        if (clockEl) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* ==========================================================================
       1. LOADING SCREEN
       ========================================================================== */
    const loader = document.getElementById('loader');
    
    // Simulate loading completion
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            revealElements();
        }, 1200);
    });

    // Fallback if load event doesn't fire
    setTimeout(() => {
        if (loader.style.visibility !== 'hidden') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            revealElements();
        }
    }, 3000);

    /* ==========================================================================
       2. SCROLL PROGRESS & STICKY NAVBAR
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';

        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }

        if (window.scrollY > 600) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       3. CUSTOM MOUSE GLOW CURSOR (Desktop Only)
       ========================================================================== */
    const cursorDot = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');

    if (window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorGlow.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        const hoverables = document.querySelectorAll('a, button, .btn-project-link, input, textarea');
        
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorDot.style.backgroundColor = '#00f0ff';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(112, 0, 255, 0.08) 50%, transparent 100%)';
            });
            item.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorDot.style.backgroundColor = '#fff';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 114, 255, 0.15) 0%, rgba(112, 0, 255, 0.05) 50%, transparent 100%)';
            });
        });
    } else {
        cursorDot.style.display = 'none';
        cursorGlow.style.display = 'none';
    }

    /* ==========================================================================
       4. MOBILE MENU & HAMBURGER TOGGLE
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav-download');

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('open');
        hamburger.classList.toggle('open', !isOpen);
        navMenu.classList.toggle('open', !isOpen);
        hamburger.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    /* ==========================================================================
       5. HERO SECTION TYPING ANIMATION
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Technical Product Manager",
        "AI-Native Product Strategist",
        "Conversational AI & Enterprise SaaS"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        setTimeout(type, 1500);
    }

    /* ==========================================================================
       6. HERO BACKGROUND PARTICLES (Canvas)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 40;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 114, 255, 0.4)' : 'rgba(168, 85, 247, 0.3)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    if (canvas) {
        initParticles();
        animateParticles();
    }

    /* ==========================================================================
       7. REVEAL-ON-SCROLL & NAVIGATION LINK HIGHLIGHTING
       ========================================================================== */
    const revealObjs = document.querySelectorAll('.reveal-element');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');

    function revealElements() {
        const triggerBottom = window.innerHeight * 0.85;

        revealObjs.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealElements);

    const sectionObserverOptions = {
        root: null,
        threshold: 0.25,
        rootMargin: "-10% 0px -40% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    /* ==========================================================================
       8. STATS COUNTER ANIMATION
       ========================================================================== */
    const statsSection = document.getElementById('statistics');
    const counterElements = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const stepTime = Math.max(Math.floor(duration / target), 30);
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = current + suffix;
                }
            }, stepTime);
        });
    }

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       9. SKILLS ANIMATION CLEANUP
       ========================================================================== */
    // Progress bars animations removed as skills list tags do not require progress bars
    
    /* =========================================================================='
       10. BUTTON RIPPLE EFFECT
       ========================================================================== */
    const rippleButtons = document.querySelectorAll('.ripple-effect');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rippleSpan = document.createElement('span');
            rippleSpan.classList.add('ripple');
            rippleSpan.style.left = `${x}px`;
            rippleSpan.style.top = `${y}px`;

            this.appendChild(rippleSpan);

            setTimeout(() => {
                rippleSpan.remove();
            }, 600);
        });
    });

    /* ==========================================================================
       11. CONTACT FORM VALIDATION & ANIMATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSubmit = document.getElementById('form-submit');
    const formStatus = document.getElementById('form-status');

    function validateField(inputElement) {
        let isValid = true;

        if (inputElement.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(inputElement.value.trim());
        } else {
            isValid = inputElement.value.trim() !== "";
        }

        const parent = inputElement.parentElement;
        if (!isValid) {
            parent.classList.add('invalid');
        } else {
            parent.classList.remove('invalid');
        }

        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');

            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isMessageValid = validateField(messageInput);

            if (isNameValid && isEmailValid && isMessageValid) {
                formSubmit.disabled = true;
                const buttonText = formSubmit.querySelector('span');
                const originalText = buttonText.textContent;
                buttonText.textContent = "Sending...";

                setTimeout(() => {
                    formSubmit.disabled = false;
                    buttonText.textContent = originalText;

                    formStatus.textContent = "Message sent successfully! Thank you, Gautham will reach out soon.";
                    formStatus.className = "form-status success";

                    contactForm.reset();

                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, 1500);
            } else {
                formStatus.textContent = "Please resolve form fields errors before resubmitting.";
                formStatus.className = "form-status error";
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('invalid')) {
                    validateField(input);
                }
            });
        });
    }
    /* ==========================================================================
       13. PROFILE HOVER GREET BUBBLE
       ========================================================================== */
    const profileImg = document.querySelector('.profile-img');
    const speechBubble = document.getElementById('profile-bubble');

    if (profileImg && speechBubble) {
        // Trigger bubble on mouseenter
        profileImg.addEventListener('mouseenter', () => {
            speechBubble.classList.add('active');
        });

        // Hide bubble on mouseleave
        profileImg.addEventListener('mouseleave', () => {
            speechBubble.classList.remove('active');
        });

        // Touch support
        profileImg.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            speechBubble.classList.toggle('active');
        });

        document.addEventListener('touchstart', () => {
            speechBubble.classList.remove('active');
        });
    }
});