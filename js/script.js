/* ═══════════════════════════════════════════════════════════
   NXT LTS — script.js v4
   1. Theme Enforcer (defeats inline styles on AR pages)
   2. SVG Icon Injector
   3. Rolling Digit Counter
   4. Nav Shrink
   5. FAQ Accordion
   6. Language Toggle
   7. Contact Form
   8. Scroll Reveal
   9. Services Carousel
   10. Visitor Counter
   11. Cursor Glow
   ═══════════════════════════════════════════════════════════ */

/* ── 1. THEME ENFORCER ──────────────────────────────────────
   Arabic pages with inline <style> blocks override the CSS.
   We inject an overriding <style> tag at runtime, AFTER all
   existing styles, to restore the dark theme with certainty.
   ─────────────────────────────────────────────────────────── */
(function enforceTheme() {
  const isRTL = document.documentElement.dir === 'rtl'
             || document.documentElement.lang === 'ar';
  if (!isRTL) return;

  const style = document.createElement('style');
  style.id = 'nxtlts-theme-enforcer';
  style.textContent = `
    html { background: #050810 !important; }
    body {
      background: #050810 !important;
      color: #f0f4ff !important;
      font-family: 'IBM Plex Sans Arabic','Noto Sans Arabic',sans-serif !important;
      margin: 0 !important; padding: 0 !important;
    }
    .nav {
      position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important;
      z-index: 200 !important; display: flex !important; align-items: center !important;
      justify-content: space-between !important; padding: 18px 60px !important;
      background: rgba(5,8,16,0.72) !important;
      backdrop-filter: blur(28px) saturate(180%) !important;
      border-bottom: 1px solid rgba(124,58,237,0.16) !important;
      box-shadow: none !important;
    }
    .nav.scrolled { padding: 11px 60px !important; background: rgba(5,8,16,0.97) !important; }
    .nav-brand img { height: 40px !important; }
    .nav-links {
      display: flex !important; list-style: none !important;
      gap: 34px !important; margin: 0 !important; padding: 0 !important;
    }
    .nav-links a { color: #8b9fc0 !important; text-decoration: none !important; font-size: 13.5px !important; }
    .nav-links a:hover { color: #f0f4ff !important; }
    .btn-nav {
      background: linear-gradient(135deg,#6d28d9,#a855f7) !important;
      color: white !important; padding: 10px 22px !important; border-radius: 10px !important;
      border: none !important; cursor: pointer !important; font-weight: 700 !important;
      font-size: 13.5px !important; font-family: 'IBM Plex Sans Arabic',sans-serif !important;
      box-shadow: 0 0 22px rgba(124,58,237,0.3) !important;
      display: inline-block !important; text-decoration: none !important;
    }
    .lang-btn {
      background: rgba(255,255,255,0.05) !important;
      border: 1px solid rgba(255,255,255,0.06) !important;
      color: #f0f4ff !important; padding: 8px 16px !important; border-radius: 10px !important;
      font-size: 12.5px !important; font-weight: 600 !important; cursor: pointer !important;
    }
    .page-hero {
      background: radial-gradient(ellipse 90% 70% at 50% 0%,rgba(109,40,217,0.16),transparent 70%) !important;
      color: #f0f4ff !important; padding: 140px 60px 80px !important;
    }
    .page-hero h1 { color: #f0f4ff !important; }
    .page-hero p { color: #8b9fc0 !important; }
    .section { background: transparent !important; padding: 100px 60px !important; }
    .contact-info, .form-card {
      background: #0a0f1e !important;
      border: 1px solid rgba(124,58,237,0.16) !important;
      border-radius: 24px !important; color: #f0f4ff !important; box-shadow: none !important;
    }
    .contact-info h3, .form-card h3 { color: #f0f4ff !important; }
    .contact-info > p, .form-card > p { color: #8b9fc0 !important; }
    .contact-item span { color: #8b9fc0 !important; }
    .contact-item strong { color: #f0f4ff !important; }
    .contact-icon { background: rgba(124,58,237,0.1) !important; border-color: rgba(124,58,237,0.2) !important; color: #c084fc !important; }
    .form-group label { color: #8b9fc0 !important; }
    .form-group input, .form-group select, .form-group textarea {
      background: rgba(255,255,255,0.04) !important;
      border: 1px solid rgba(255,255,255,0.06) !important;
      color: #f0f4ff !important; border-radius: 12px !important;
      font-family: 'IBM Plex Sans Arabic',sans-serif !important;
    }
    .form-submit {
      background: linear-gradient(135deg,#6d28d9,#a855f7) !important;
      color: white !important; border: none !important; border-radius: 12px !important;
      padding: 15px 28px !important; cursor: pointer !important; font-weight: 700 !important;
      font-family: 'IBM Plex Sans Arabic',sans-serif !important; width: 100% !important;
    }
    .toast {
      background: linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.08)) !important;
      border: 1px solid rgba(16,185,129,0.35) !important;
      color: #f0f4ff !important;
      transform: translateY(80px) !important; opacity: 0 !important;
    }
    .toast.show { transform: translateY(0) !important; opacity: 1 !important; }
    .footer {
      background: #0a0f1e !important;
      border-top: 1px solid rgba(124,58,237,0.16) !important;
      padding: 64px 60px 0 !important;
      display: grid !important; grid-template-columns: 2fr 1fr 1fr 1fr !important;
      gap: 60px !important; color: #f0f4ff !important; margin-top: 0 !important;
    }
    .footer p, .footer span { color: #8b9fc0 !important; }
    .footer h5 { color: #f0f4ff !important; }
    .footer a { color: #8b9fc0 !important; }
    .footer a:hover { color: #f0f4ff !important; }
    .footer-bottom { color: #4a5a7a !important; border-top: 1px solid rgba(124,58,237,0.16) !important; }
    .footer-bottom span { color: #4a5a7a !important; }
    .btn-primary {
      background: linear-gradient(135deg,#6d28d9,#a855f7 60%,#9333ea) !important;
      color: white !important; border: none !important;
      box-shadow: 0 0 28px rgba(124,58,237,0.35) !important;
    }
    .btn-outline { background: rgba(255,255,255,0.03) !important; color: #f0f4ff !important; border: 1px solid rgba(255,255,255,0.14) !important; }
    .svc-card { background: linear-gradient(145deg,#0a0f1e,#0f1628) !important; border-color: rgba(124,58,237,0.16) !important; }
    .svc-card-body h3 { color: #f0f4ff !important; }
    .svc-card-body p { color: #8b9fc0 !important; }
    .why-card { background: linear-gradient(145deg,#0a0f1e,rgba(15,22,40,0.8)) !important; border-color: rgba(124,58,237,0.16) !important; }
    .why-card h4 { color: #f0f4ff !important; }
    .why-card p { color: #8b9fc0 !important; }
    .faq-item { background: #0a0f1e !important; border-color: rgba(124,58,237,0.16) !important; }
    .stats-bar { background: #0a0f1e !important; border-color: rgba(124,58,237,0.16) !important; }
    .stat-label { color: #8b9fc0 !important; }
    .section-label { color: #c084fc !important; }
    .section-title { color: #f0f4ff !important; }
    .section-sub { color: #8b9fc0 !important; }
    .cta-section { background: linear-gradient(135deg,rgba(109,40,217,0.07),rgba(34,211,238,0.03)) !important; border-top: 1px solid rgba(124,58,237,0.16) !important; }
    .cta-section h2 { color: #f0f4ff !important; }
    .cta-section p { color: #8b9fc0 !important; }
    .hero-content { color: #f0f4ff !important; }
    .hero { background: transparent !important; }
    @media(max-width:1024px){
      .nav { padding: 14px 24px !important; }
      .nav-links { display: none !important; }
      .section { padding: 70px 24px !important; }
      .page-hero { padding: 130px 24px 70px !important; }
      .footer { grid-template-columns: 1fr 1fr !important; padding: 40px 24px 0 !important; }
    }
    @media(max-width:640px){
      .footer { grid-template-columns: 1fr !important; }
    }
  `;
  // Append LAST to <head> so it wins specificity order
  document.head.appendChild(style);
})();

/* ── 2. SVG ICON INJECTOR ───────────────────────────────────
   Replaces emoji text nodes in .why-icon, .contact-icon,
   .toast-icon, and .lang-btn with clean SVG icons.
   ─────────────────────────────────────────────────────────── */
const SVG_ICONS = {
  '🎯': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  '🤝': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  '📈': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  '🌍': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  '✓':  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  '📧': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  '💼': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  '🛠️': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  '📍': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  '✅': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  '🌐': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

function injectIcons() {
  // .why-icon and .contact-icon: replace text with SVG
  document.querySelectorAll('.why-icon, .contact-icon').forEach(el => {
    const key = el.textContent.trim();
    if (SVG_ICONS[key]) {
      el.innerHTML = SVG_ICONS[key];
    }
  });

  // .toast-icon
  document.querySelectorAll('.toast-icon').forEach(el => {
    const key = el.textContent.trim();
    if (SVG_ICONS[key]) {
      el.innerHTML = SVG_ICONS[key];
      el.style.color = '#10b981';
    }
  });

  // Language button globe emoji → SVG
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.innerHTML.includes('🌐')) {
      const globeSpan = `<span style="display:inline-flex;align-items:center;width:14px;height:14px;color:var(--purple3,#c084fc)">${SVG_ICONS['🌐']}</span>`;
      btn.innerHTML = btn.innerHTML.replace('🌐', globeSpan);
    }
  });
}

/* ── 3. ROLLING DIGIT COUNTER ───────────────────────────────
   Preserved exactly from original implementation
   ─────────────────────────────────────────────────────────── */
function buildRollingCounter(container) {
  const target = container.dataset.target;
  const suffix = container.dataset.suffix || '';
  const digits = target.toString().split('');
  const REEL_H = 76;
  container.innerHTML = '';
  digits.forEach((finalDigit, i) => {
    const slot = document.createElement('div');
    slot.className = 'digit-slot';
    const reel = document.createElement('div');
    reel.className = 'digit-reel';
    for (let n = 0; n <= 9; n++) {
      const span = document.createElement('span');
      span.textContent = n;
      reel.appendChild(span);
    }
    slot.appendChild(reel);
    container.appendChild(slot);
    const delay = i * 140, dur = 1000 + i * 100, idx = parseInt(finalDigit, 10);
    reel.style.transform = 'translateY(0)';
    setTimeout(() => {
      reel.style.transition = `transform ${dur}ms cubic-bezier(0.12,0.82,0.30,1.0)`;
      reel.style.transform  = `translateY(-${idx * REEL_H}px)`;
    }, delay + 80);
  });
  if (suffix) {
    const s = document.createElement('span');
    s.className = 'stat-suffix'; s.textContent = suffix;
    s.style.opacity = '0'; s.style.transition = 'opacity 0.5s ease';
    container.appendChild(s);
    setTimeout(() => { s.style.opacity = '1'; }, digits.length * 140 + 1100);
  }
}
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.built) {
      e.target.dataset.built = '1';
      buildRollingCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-wrap').forEach(el => cObs.observe(el));

/* ── 4. NAV SHRINK ─────────────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── 5. FAQ ACCORDION ──────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

/* ── 6. LANGUAGE TOGGLE ────────────────────────────────────── */
/*
  Folder structure:
    /index.html                       EN home
    /about.html                       EN about
    /contact.html                     EN contact
    /services/automation.html         EN service pages
    /ar/index.html                    AR home
    /ar/about.html                    AR about
    /ar/contact.html                  AR contact
    /ar/services/automation.html      AR service pages

  EN pages have: data-lang="ar"  → go to /ar/...
  AR pages have: data-lang="en"  → go back to /...
*/// ── script.js ──
// ── script.js ──
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const targetLang = this.dataset.lang; // "ar" or "en"
      const pathname = window.location.pathname;

      // Normalize: remove trailing slash, get clean segments
      const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);

      // Detect current context
      const isAr      = segments.includes('ar');
      const isService = segments.includes('services');
      const file      = segments[segments.length - 1] || 'index.html';

      // Find the root (the folder that contains index.html, ar/, services/)
      // Strategy: build absolute path from the known folder structure
      let root = '';

      if (isAr && isService) {
        // e.g. /something/ar/services/chatbots.html → root is /something
        const arIndex = segments.indexOf('ar');
        root = '/' + segments.slice(0, arIndex).join('/');
        if (root === '/') root = '';
      } else if (isAr) {
        // e.g. /something/ar/index.html → root is /something
        const arIndex = segments.indexOf('ar');
        root = '/' + segments.slice(0, arIndex).join('/');
        if (root === '/') root = '';
      } else if (isService) {
        // e.g. /something/services/chatbots.html → root is /something
        const svcIndex = segments.indexOf('services');
        root = '/' + segments.slice(0, svcIndex).join('/');
        if (root === '/') root = '';
      } else {
        // e.g. /something/index.html → root is /something
        root = '/' + segments.slice(0, -1).join('/');
        if (root === '/') root = '';
      }

      let newPath = '';

      if (targetLang === 'ar' && !isAr) {
        if (isService) newPath = root + '/ar/services/' + file;
        else           newPath = root + '/ar/' + file;
      }

      if (targetLang === 'en' && isAr) {
        if (isService) newPath = root + '/services/' + file;
        else           newPath = root + '/' + file;
      }

      if (newPath) window.location.href = newPath;
    });
  });
});
/* ── 7. CONTACT FORM ───────────────────────────────────────── */
const form  = document.querySelector('.contact-form');
const toast = document.querySelector('.toast');
if (form && toast) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4200);
    form.reset();
  });
}

/* ── 8. SCROLL REVEAL ──────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

function revealEl(sel, cls, step) {
  document.querySelectorAll(sel).forEach((el, i) => {
    if (!el.closest('.hero') && !el.closest('.page-hero') && !el.closest('.services-carousel')) {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
        el.classList.add(cls);
        el.dataset.delay = String(i * (step || 70));
        revObs.observe(el);
      }
    }
  });
}
revealEl('.why-card',             'reveal', 80);
revealEl('.faq-item',             'reveal', 60);
revealEl('.stat-block',           'reveal', 100);
revealEl('.contact-info',         'reveal', 100);
revealEl('.form-card',            'reveal', 160);
revealEl('.section-title',        'reveal', 0);
revealEl('.section-sub',          'reveal', 60);
revealEl('.section-label',        'reveal', 0);
revealEl('.cta-section h2',       'reveal', 0);
revealEl('.cta-section p',        'reveal', 80);
revealEl('.cta-btns',             'reveal', 140);
revealEl('.process-step',         'reveal', 80);
revealEl('.feat-list',            'reveal', 100);

// Two-column about-style sections: text left, image right
document.querySelectorAll('.section').forEach(sec => {
  const divs = Array.from(sec.children).filter(c => c.tagName === 'DIV');
  if (divs.length === 2) {
    const [a, b] = divs;
    const notRev = el => !el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right');
    if (notRev(a) && !a.closest('.hero')) { a.classList.add('reveal-left'); revObs.observe(a); }
    if (notRev(b) && !b.closest('.hero')) { b.classList.add('reveal-right'); revObs.observe(b); }
  }
});

/* ── 9. SERVICES CAROUSEL ──────────────────────────────────── */
(function buildCarousel() {
  const grid = document.querySelector('.services-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.svc-card, .card'));
  if (!cards.length) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'services-carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'services-carousel';

  // Double the cards for seamless infinite loop
  const allCards = [...cards, ...cards.map(c => {
    const clone = c.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  })];

  allCards.forEach(card => {
    card.style.opacity    = '1';
    card.style.transform  = 'none';
    card.style.transition = 'transform 0.4s var(--ease-bounce,cubic-bezier(0.34,1.56,0.64,1)), box-shadow 0.4s, border-color 0.4s';
    track.appendChild(card);
  });

  wrapper.appendChild(track);
  grid.replaceWith(wrapper);

  // Speed up on hover, restore on leave
  wrapper.addEventListener('mouseenter', () => track.style.animationDuration = '14s');
  wrapper.addEventListener('mouseleave', () => track.style.animationDuration = '38s');
  wrapper.addEventListener('touchstart', () => track.style.animationPlayState = 'paused', { passive: true });
  wrapper.addEventListener('touchend',   () => track.style.animationPlayState = 'running', { passive: true });
})();

// Staggered svc-card fade (non-carousel only)
document.querySelectorAll('.svc-card, .card').forEach((el, i) => {
  if (el.closest('.services-carousel')) return; // skip carousel cards
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  const o = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; o.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  o.observe(el);
});

/* ── 10. VISITOR COUNTER ───────────────────────────────────── */
(function visitorCounter() {
  try {
    let count = parseInt(localStorage.getItem('nxtlts_vc') || '0', 10);
    if (!sessionStorage.getItem('nxtlts_vs')) {
      count++;
      localStorage.setItem('nxtlts_vc', String(count));
      sessionStorage.setItem('nxtlts_vs', '1');
    }
    const fb = document.querySelector('.footer-bottom');
    if (fb && count > 0) {
      const el = document.createElement('span');
      el.className = 'visitor-counter';
      el.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>${count.toLocaleString()}</span>`;
      fb.appendChild(el);
    }
  } catch(e) { /* localStorage unavailable — fail silently */ }
})();

/* ── 11. CURSOR GLOW (desktop) ─────────────────────────────── */
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed','width:340px','height:340px','border-radius:50%',
    'background:radial-gradient(circle,rgba(109,40,217,0.05) 0%,transparent 70%)',
    'pointer-events:none','z-index:0','mix-blend-mode:screen',
    'transform:translate(-50%,-50%)','left:-600px','top:-600px',
    'transition:left 1.4s cubic-bezier(0.2,0,0,1),top 1.4s cubic-bezier(0.2,0,0,1)',
  ].join(';');
  document.body.appendChild(glow);
  let tick = false;
  window.addEventListener('mousemove', e => {
    if (!tick) {
      requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
        tick = false;
      });
      tick = true;
    }
  }, { passive: true });
}

/* ── SMOOTH ANCHOR SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── INIT ─────────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectIcons);
} else {
  injectIcons();
}

document.querySelector("form")

const scriptURL = "https://script.google.com/macros/s/AKfycbzsI1p_-t79J2VotCjeAYZjKw_DGs279nf3iuF33fiJT2UZekFzfXsp_FvQXGTu10WQUQ/exec";

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
      name:    document.getElementById("name").value,
      email:   document.getElementById("email").value,
      phone:   document.getElementById("phone").value,
      message: document.getElementById("message").value
    };

    const btn = this.querySelector("button[type=submit]");
    if (btn) { btn.textContent = "Sending..."; btn.disabled = true; }

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      if (btn) { btn.textContent = "✅ Message Sent!"; }
      contactForm.reset();
      setTimeout(() => { if (btn) { btn.textContent = "Send Message"; btn.disabled = false; } }, 3000);
    }).catch(() => {
      if (btn) { btn.textContent = "❌ Failed. Try again."; btn.disabled = false; }
    });
  });
}