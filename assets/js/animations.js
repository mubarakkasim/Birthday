/**
 * animations.js
 * Handles scroll-triggered animations for a premium feel.
 */

document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Typing effect for specialized elements
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(el => {
        if (el.dataset.text) {
            typeWriter(el, el.dataset.text, 0);
        }
    });
});

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 50);
    }
}
