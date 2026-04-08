/* ============================================================
   MR. MENDEZ — script.js
   
   This file handles:
   1. Nav scroll behavior
   2. Mobile menu
   3. Fade-in animations on scroll
   4. Portfolio mode toggle
   
   Everything is plain JS — no libraries needed.
============================================================ */


// ============================================================
// 1. NAV — adds "scrolled" class when user scrolls down
//    This triggers the frosted glass effect in CSS
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 2. MOBILE MENU — hamburger open/close
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent scroll when menu is open
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});

// Close menu when any link is tapped
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ============================================================
// 3. FADE-IN ANIMATIONS — elements with class "fade-in"
//    animate into view as the user scrolls down
// ============================================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0.1,       // trigger when 10% of element is visible
  rootMargin: '0px 0px -40px 0px' // slight offset so it triggers before fully in view
});

fadeEls.forEach(el => observer.observe(el));


// ============================================================
// 4. PORTFOLIO MODE TOGGLE
//
//    The portfolio section is hidden by default.
//    To show it during job application season, either:
//
//    OPTION A — Add class manually:
//      Open index.html and change <body> to <body class="portfolio-mode">
//
//    OPTION B — Uncomment the line below to turn it on via JS:
//      document.body.classList.add('portfolio-mode');
//
//    OPTION C — Use a URL parameter: ?portfolio=true
//      Visit yourdomain.com?portfolio=true to preview
//      This way the page stays clean for students by default
// ============================================================

// URL parameter check — add ?portfolio=true to the URL to activate
const params = new URLSearchParams(window.location.search);
if (params.get('portfolio') === 'true') {
  document.body.classList.add('portfolio-mode');
}

// Uncomment this line to force portfolio mode on for everyone:
// document.body.classList.add('portfolio-mode');


// ============================================================
// 5. ACTIVE NAV LINK — highlights current section in nav
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--accent-light)';
    }
  });
});
