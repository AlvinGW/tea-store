// global.js

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  // Toggle mobile menu open/close
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', !expanded);
  });

  // Close menu on nav link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tea-card");

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
  });

  cards.forEach((card) => {
    fadeInObserver.observe(card);
  });
});
// Fade-in animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector('.about-container');

  function revealOnScroll() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
      aboutSection.classList.add('visible');
    }
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // trigger on load
});
// Fade-in each benefit card on scroll
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.benefit-card');

  function revealCards() {
    const triggerBottom = window.innerHeight - 100;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealCards);
  revealCards(); // on load
});
// testimonials fade-in on scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

testimonialCards.forEach(card => observer.observe(card));
