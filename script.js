// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll(
        '.about-text, .stat, .skill-category, .project-card, .achievement-card, .responsibility-card, .contact-card'
    );
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Typing effect for hero tagline (optional enhancement)
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let index = 0;
    function type() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        }
    }
    
    // Start typing after hero animations
    setTimeout(type, 1200);
}

// Add smooth reveal animation for stats
const statNumbers = document.querySelectorAll('.stat h3');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Check if the value contains a decimal point
        if (end.toString().includes('.')) {
            element.textContent = (progress * parseFloat(end)).toFixed(2);
        } else {
            element.textContent = Math.floor(progress * parseInt(end)) + (end.toString().includes('+') ? '+' : '');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseFloat(text.replace(/[^0-9.]/g, ''));
            entry.target.textContent = '0';
            animateValue(entry.target, 0, number, 2000);
            
            // Add back the '+' if it was there
            if (text.includes('+')) {
                setTimeout(() => {
                    entry.target.textContent = entry.target.textContent + '+';
                }, 2000);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Add particle effect to hero section (optional)
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add cursor trail effect (optional - can be removed if too distracting)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

if (circles.length === 0) {
    // Create cursor circles if needed
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.position = 'fixed';
        circle.style.width = '5px';
        circle.style.height = '5px';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(99, 102, 241, 0.3)';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9999';
        circle.style.transition = 'transform 0.1s ease-out';
        document.body.appendChild(circle);
    }
}

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cThis portfolio was built with passion for AI and Machine Learning', 'color: #8b5cf6; font-size: 14px;');
console.log('%cFeel free to reach out: prashanttakale0988@gmail.com', 'color: #ec4899; font-size: 12px;');
