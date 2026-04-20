/* ============================================================
   MR. MENDEZ MATH — script.js
   Handles: theme toggle, nav scroll, mobile menu, fade-in
   No libraries. Edit freely.
============================================================ */


// ── THEME TOGGLE ─────────────────────────────────────────────
// Default: follows system (prefers-color-scheme)
// Manual toggle saves to localStorage and overrides system.

const html = document.documentElement;

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  html.classList.toggle('is-light', theme === 'light');
  html.classList.toggle('is-dark',  theme === 'dark');
}

// Run immediately to prevent flash of wrong theme
(function initTheme() {
  const saved = localStorage.getItem('mendez-theme');
  applyTheme(saved || getSystemTheme());
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || getSystemTheme();
      const next    = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('mendez-theme', next);
    });
  }

  // If OS theme changes and user hasn't set a manual preference, follow it
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('mendez-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});


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
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade').forEach(el => io.observe(el));


// ── ACTIVE NAV LINK ──────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});


// ── PORTFOLIO MODE ───────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
if (params.get('portfolio') === 'true') {
  document.body.classList.add('portfolio-mode');
}
