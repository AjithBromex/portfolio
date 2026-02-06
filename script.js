document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all hidden elements
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // === SHOOTING STAR TRAIL CURSOR ===
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = [
        "#0ea5e9", "#22d3ee", "#38bdf8", "#60a5fa", "#818cf8",
        "#c084fc", "#e879f9", "#f472b6", "#fb7185", "#f43f5e"
    ]; // Gradient from Blue to Pink

    // Create 15 trail circles
    for (let i = 0; i < 15; i++) {
        const circle = document.createElement("div");
        circle.classList.add("trail-dot");
        circle.style.backgroundColor = colors[i % colors.length]; // Cycle colors
        document.body.appendChild(circle);

        circles.push({
            x: 0,
            y: 0,
            element: circle
        });
    }

    // Initialize positions relative to first mouse move
    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateTrail() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            // Move subsequent circles towards the previous one (or mouse)
            circle.element.style.left = x - 12 + "px"; // Offset to center 
            circle.element.style.top = y - 12 + "px";

            // Scale down based on index
            circle.element.style.transform = `scale(${(circles.length - index) / circles.length})`;

            circle.x = x;
            circle.y = y;

            // The next circle chases this one
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3; // Speed factor
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();



    // === SMOOTH TYPING TEXT EFFECT ===
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const roles = ["AI Student", "Developer", "DevOps Enthusiast", "Tech Explorer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40; // Fast delete
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal type
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }


    // === 3D TILT EFFECT (OPTIMIZED) ===
    const tiltElements = document.querySelectorAll('.project-card');

    tiltElements.forEach(card => {
        let rect = card.getBoundingClientRect();
        let isHovering = false;

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            rect = card.getBoundingClientRect(); // Calculate only once on enter
            // Re-calculate if window was resized (optional but safer)
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            // Use requestAnimationFrame for smooth 60fps updates
            requestAnimationFrame(() => {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Reduced rotation intensity for smoother feel
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Handle resize to update rects
    window.addEventListener('resize', () => {
        tiltElements.forEach(card => {
            // We'll let the next mouseenter handle the update to keep this light
        });
    });

    // === HAMBURGER MENU ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
