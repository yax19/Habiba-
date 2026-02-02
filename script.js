// Scroll progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// Animated counting for statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Trigger counter animation for stat numbers
            if (entry.target.classList.contains('stat-item')) {
                const number = entry.target.querySelector('.stat-number');
                if (!number.classList.contains('counted')) {
                    number.classList.add('counted');
                    animateCounter(number);
                }
            }
        }
    });
}, { threshold: 0.2 });

// Observe all cards and stat items
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card, .stat-item, .impact-item').forEach(el => {
        observer.observe(el);
    });
});

// Copy to clipboard function
function copyToClipboard(text, element) {
    // Find the actual text from the element
    const strongElement = element.querySelector('strong');
    const actualText = strongElement ? strongElement.textContent : text;

    navigator.clipboard.writeText(actualText).then(() => {
        const message = document.getElementById('copiedMessage');
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
        }, 2000);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
