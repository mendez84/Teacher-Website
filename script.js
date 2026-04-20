/* ============================================================
   MR. MENDEZ — script.js
   Handles: nav scroll, mobile menu, fade-in, portfolio toggle
   No libraries. Edit freely.
============================================================ */

// ── NAV SCROLL ──────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
});

// ── MOBILE MENU ─────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

mobileClose?.addEventListener('click', closeMobile);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobile));

function closeMobile() {
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── FADE IN ON SCROLL ────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade').forEach(el => io.observe(el));

// ── ACTIVE NAV LINK (highlight current page) ─────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── PORTFOLIO MODE ───────────────────────────────────────────
// Add ?portfolio=true to the URL to unlock the portfolio section and nav link
// OR add class="portfolio-mode" to <body> to always show it
const params = new URLSearchParams(window.location.search);
if (params.get('portfolio') === 'true') {
  document.body.classList.add('portfolio-mode');
}
