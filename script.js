/* ============================================================
   MR. MENDEZ MATH — script.js
   Handles: theme toggle, nav scroll, mobile menu,
            fade-in, back-to-top, dynamic year/durations,
            external link targeting, keyboard accessibility
============================================================ */


// ── THEME TOGGLE ─────────────────────────────────────────────
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

  // Theme toggle button
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || getSystemTheme();
      const next    = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('mendez-theme', next);
    });
  }

  // Follow OS theme changes if user hasn't manually set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('mendez-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  // ── NAV SCROLL ─────────────────────────────────────────────
  const nav = document.querySelector('nav');
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
    // Back to top button visibility
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  // ── MOBILE MENU ────────────────────────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function closeMobile() {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  });

  mobileClose?.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobile));

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) closeMobile();
  });


  // ── BACK TO TOP ────────────────────────────────────────────
  const btt = document.getElementById('backToTop');
  btt?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ── FADE IN ON SCROLL ──────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade').forEach(el => io.observe(el));


  // ── ACTIVE NAV LINK ────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });


  // ── EXTERNAL LINKS → NEW TAB ───────────────────────────────
  // Any link pointing outside the site opens in a new tab automatically
  const siteHost = location.hostname;
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // External if starts with http and not same host
    if (href.startsWith('http') && !href.includes(siteHost)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });


  // ── DYNAMIC FOOTER YEAR ────────────────────────────────────
  // Updates every page footer year automatically
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });


  // ── DYNAMIC POSITION DURATIONS (portfolio page) ────────────
  // Calculates "X yrs Y mos" dynamically from data attributes
  // Usage: <span class="duration" data-start="2022-08" data-end="present"></span>
  document.querySelectorAll('.duration[data-start]').forEach(el => {
    const startStr = el.getAttribute('data-start');
    const endStr   = el.getAttribute('data-end');

    const [sYear, sMon] = startStr.split('-').map(Number);
    let eYear, eMon;

    if (!endStr || endStr === 'present') {
      const now = new Date();
      eYear = now.getFullYear();
      eMon  = now.getMonth() + 1;
    } else {
      [eYear, eMon] = endStr.split('-').map(Number);
    }

    let months = (eYear - sYear) * 12 + (eMon - sMon);
    const years = Math.floor(months / 12);
    const mos   = months % 12;

    let label = '';
    if (years > 0) label += `${years} yr${years > 1 ? 's' : ''}`;
    if (mos > 0)   label += (label ? ' ' : '') + `${mos} mo${mos > 1 ? 's' : ''}`;
    el.textContent = label || '< 1 mo';
  });


  // ── PORTFOLIO: EXPERIENCE CARD TOGGLE ─────────────────────
  // Keyboard accessible — Enter/Space opens cards
  document.querySelectorAll('.exp-header').forEach(header => {
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', header.closest('.exp-card')?.classList.contains('open') ? 'true' : 'false');

    const toggle = () => {
      const card = header.closest('.exp-card');
      const isOpen = card.classList.toggle('open');
      header.setAttribute('aria-expanded', isOpen.toString());
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });


  // ── PORTFOLIO: TAB SWITCHING ───────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById('tab-' + target)?.classList.add('active');
    });

    // Keyboard nav for tabs
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
  });


  // ── PORTFOLIO: STATS COUNTER ANIMATION ────────────────────
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
          const target   = parseInt(el.dataset.target);
          const duration = 1200;
          const step     = target / (duration / 16);
          let current    = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
            if (current >= target) {
              el.textContent = target + (target >= 100 ? '+' : '');
              clearInterval(timer);
            }
          }, 16);
        });
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) statsObserver.observe(statsRow);


  // ── PORTFOLIO MODE ────────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  if (params.get('portfolio') === 'true') {
    document.body.classList.add('portfolio-mode');
  }

}); // end DOMContentLoaded
