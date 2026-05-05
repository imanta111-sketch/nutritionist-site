document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    const openMobileMenu = () => mobileMenu.classList.add('active');
    const closeMobileMenu = () => mobileMenu.classList.remove('active');

    burger.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // FAQ accordion
    document.querySelectorAll('.faq__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form submission
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBtn = document.getElementById('modalBtn');

    const showModal = () => successModal.classList.add('active');
    const hideModal = () => successModal.classList.remove('active');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));

        form.reset();
        showModal();
    });

    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);
    modalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
            closeMobileMenu();
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.service-card, .result-card, .how__step, .about__content, .about__image, .contact__info, .contact__form'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        observer.observe(el);
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
