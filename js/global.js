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
// === Footer Reveal on Scroll ===
const footerColumns = document.querySelectorAll('.footer-column');

const revealFooter = () => {
  footerColumns.forEach(col => {
    const top = col.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      col.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealFooter);
window.addEventListener('load', revealFooter);
