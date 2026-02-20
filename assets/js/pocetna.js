// Smooth scroll za interne linkove
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            const el = document.querySelector(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Mobile meni toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
}

// Hamburger animacija (opciono)
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const spans = navToggle.querySelectorAll('span');
        if (!spans.length) return;

        if (navToggle.classList.contains('open')) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}

// Simple tilt effect za .tilt kartice
const tiltEls = document.querySelectorAll('.tilt');

tiltEls.forEach(card => {
    const height = card.clientHeight;
    const width = card.clientWidth;

    card.addEventListener('mousemove', (event) => {
        const xVal = event.layerX;
        const yVal = event.layerY;
        const yRotation = 10 * ((xVal - width / 2) / width);
        const xRotation = -10 * ((yVal - height / 2) / height);
        const transformString = `perspective(700px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        card.style.transform = transformString;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
    });
});

// Glitch tekst data-text
document.querySelectorAll('.glitch').forEach(el => {
    if (!el.getAttribute('data-text')) {
        el.setAttribute('data-text', el.textContent.trim());
    }
});
