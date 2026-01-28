document.addEventListener('DOMContentLoaded', () => {
    
    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

    // ===== SCROLL REVEAL ANIMATION =====
    const faders = document.querySelectorAll('.fade');

    const revealOnScroll = () => {
        faders.forEach(section => {
            const pos = section.getBoundingClientRect().top;
            const screen = window.innerHeight / 1.15;

            if (pos < screen) {
                section.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on load

    // ===== MOUSE PARALLAX FOR ORBS =====
    const orbs = document.querySelectorAll('.orb');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        orbs.forEach((orb, index) => {
            const intensity = (index + 1) * 40;
            const rotateX = y * 10;
            const rotateY = x * 10;
            orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px) rotate(${rotateY}deg)`;
        });
    });

    // ===== TYPEWRITER EFFECT =====
    const typewriterElement = document.querySelector('.home-text h3');
    if (typewriterElement) {
        const originalText = typewriterElement.innerText;
        typewriterElement.innerText = '';
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                typewriterElement.innerText += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 800);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SKILL ITEMS STAGGER ANIMATION =====
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR PERFORMANCE =====
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade').forEach(el => observer.observe(el));
    }

    // ===== TILT EFFECT ON CARDS (DESKTOP ONLY) =====
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.project-card, .contact-card, .stat');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ===== CONSOLE EASTER EGG =====
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to Ajith NP\'s Portfolio', 'color: #38bdf8; font-size: 14px;');
});
