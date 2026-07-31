/* =========================================================
   EcoQuartier — Interactions JavaScript
   - Menu responsive (burger)
   - Compteur animé (page d'accueil)
   - Filtre de projets (page projets)
   - Validation de formulaire (page contact)
   - Orbe qui suit le curseur
   - Apparition au scroll (textes + cartes)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initAnimatedCounters();
  initProjectFilters();
  initContactForm();
  initCursorGlow();
  initScrollReveal();
});

/* ---------- Menu responsive ---------- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Ferme le menu quand on choisit un lien (mobile)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });

  // Ferme le menu si on repasse en affichage desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Compteur animé (chiffres clés accueil) ---------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

/* ---------- Filtre de projets ---------- */
function initProjectFilters() {
  const filterBar = document.getElementById('projectFilters');
  const grid = document.getElementById('projectGrid');
  if (!filterBar || !grid) return;

  const buttons = filterBar.querySelectorAll('[data-filter]');
  const cards = grid.querySelectorAll('.project-card');
  const noResults = document.getElementById('noResults');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;

    buttons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.getAttribute('data-filter');
    let visibleCount = 0;

    cards.forEach((card) => {
      const match = filter === 'tous' || card.getAttribute('data-category') === filter;
      card.classList.toggle('is-hidden', !match);
      if (match) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  });
}

/* ---------- Validation de formulaire (contact) ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const status = document.getElementById('formStatus');
  if (!form || !submitBtn) return;

  const fields = Array.from(form.querySelectorAll('input, select, textarea'));

  const updateFieldState = (field) => {
    const group = field.closest('.form-group');
    if (!group) return;
    const valid = field.checkValidity();
    group.classList.toggle('has-error', !valid && field.value.length > 0 || (!valid && field.type === 'checkbox'));
  };

  const updateSubmitState = () => {
    submitBtn.disabled = !form.checkValidity();
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      updateFieldState(field);
      updateSubmitState();
    });
    field.addEventListener('blur', () => updateFieldState(field));
  });

  updateSubmitState();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      fields.forEach(updateFieldState);
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Merci pour votre inscription !';
    submitBtn.classList.add('btn-success');

    if (status) {
      status.textContent = "Votre demande a bien été envoyée. Nous revenons vers vous sous 48h.";
      status.classList.add('is-visible');
    }

    setTimeout(() => {
      form.reset();
      fields.forEach((field) => field.closest('.form-group')?.classList.remove('has-error'));
      submitBtn.textContent = originalLabel;
      submitBtn.classList.remove('btn-success');
      updateSubmitState();
      if (status) status.classList.remove('is-visible');
    }, 3000);
  });
}

/* ---------- Orbe qui suit le curseur ---------- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  if (reduceMotion || !hasHover) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateGlow = () => {
    // Interpolation pour un effet "lazy follow" fluide
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  };
  requestAnimationFrame(animateGlow);
}

/* ---------- Apparition au scroll (textes + cartes) ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .card, .event-card, .form-card');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach((el) => observer.observe(el));
}
