/* ============================================
   NEXTLINE — Main JavaScript
   ============================================ */

/* ── Nav Toggle (Mobile) ─────────────────── */
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ── Scroll Fade-in (Intersection Observer) ─ */
function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ── Stagger grid children ───────────────── */
function staggerCards() {
  document.querySelectorAll('.articles-grid, .voices-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.classList.add('fade-in');
      child.dataset.delay = i * 80;
    });
  });
}

/* ── Newsletter form ─────────────────────── */
function initNewsletter() {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter__input');
    const btn   = form.querySelector('.newsletter__btn');

    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#C8102E';
      input.focus();
      return;
    }

    btn.textContent = '✓ Subscribed';
    btn.style.background = '#1a1a1a';
    input.value = '';
    input.disabled = true;
    btn.disabled = true;
  });
}

/* ── Submit Form Validation ──────────────── */
function initSubmitForm() {
  const form = document.getElementById('submitForm');
  if (!form) return;

  const successPanel = document.getElementById('formSuccess');
  const fields = {
    name:     { el: document.getElementById('name'),     msg: document.getElementById('nameError'),     rule: v => v.trim().length >= 2 },
    email:    { el: document.getElementById('email'),    msg: document.getElementById('emailError'),    rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    title:    { el: document.getElementById('title'),    msg: document.getElementById('titleError'),    rule: v => v.trim().length >= 5 },
    category: { el: document.getElementById('category'), msg: document.getElementById('categoryError'), rule: v => v !== '' },
    content:  { el: document.getElementById('content'),  msg: document.getElementById('contentError'),  rule: v => v.trim().length >= 100 },
  };

  // Live validation feedback
  Object.values(fields).forEach(({ el, msg, rule }) => {
    if (!el) return;
    el.addEventListener('blur', () => validateField(el, msg, rule));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(el, msg, rule);
    });
  });

  // Character counter for content
  const contentEl = document.getElementById('content');
  const charCount = document.getElementById('charCount');
  if (contentEl && charCount) {
    contentEl.addEventListener('input', () => {
      const len = contentEl.value.trim().length;
      charCount.textContent = `${len} characters ${len < 100 ? '(minimum 100)' : '✓'}`;
      charCount.style.color = len >= 100 ? '#555' : '#C8102E';
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([, { el, msg, rule }]) => {
      if (!el) return;
      if (!validateField(el, msg, rule)) valid = false;
    });

    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Simulate submit
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    setTimeout(() => {
      form.style.display = 'none';
      if (successPanel) {
        successPanel.classList.add('visible');
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1200);
  });

  function validateField(el, msgEl, rule) {
    const valid = rule(el.value);
    el.classList.toggle('error', !valid);
    if (msgEl) msgEl.classList.toggle('visible', !valid);
    return valid;
  }
}

/* ── Smooth anchor links ─────────────────── */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Share buttons ───────────────────────── */
function initShareButtons() {
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const url    = encodeURIComponent(location.href);
      const title  = encodeURIComponent(document.title);

      const urls = {
        twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        copy:     null,
      };

      if (action === 'copy') {
        navigator.clipboard.writeText(location.href).then(() => {
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.textContent = '🔗 Copy link'; }, 2000);
        });
      } else if (urls[action]) {
        window.open(urls[action], '_blank', 'width=600,height=400');
      }
    });
  });
}

/* ── Init ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  staggerCards();
  initFadeIn();
  initNewsletter();
  initSubmitForm();
  initSmoothLinks();
  initShareButtons();
});