/* ============================================================
   ORBIT LOGIC — SCRIPT v5 (full CMS content injection)
   ============================================================ */

(function () {
  'use strict';

  // Nav scroll
  const nav = document.getElementById('mainNav');
  if (nav) {
    const chk = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', chk, { passive: true });
    chk();
  }

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navMobile');
  function openNav() {
    drawer.classList.add('open'); toggle.classList.add('open');
    toggle.setAttribute('aria-expanded','true'); document.body.classList.add('nav-open');
    const fl = drawer.querySelector('a,button'); if (fl) fl.focus();
  }
  function closeNav() {
    drawer.classList.remove('open'); toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded','false'); document.body.classList.remove('nav-open');
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', () => drawer.classList.contains('open') ? closeNav() : openNav());
    document.addEventListener('click', e => { if (drawer.classList.contains('open') && !nav.contains(e.target) && !drawer.contains(e.target)) closeNav(); });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => { if (e.key==='Escape' && drawer.classList.contains('open')) { closeNav(); toggle.focus(); } });
  }

  // Active nav link
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = (a.getAttribute('href')||'').split('#')[0].split('/').pop();
    if (href === file) a.classList.add('active');
  });

  // Scroll animations
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = prefersReduced ? null : new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -16px 0px' });
  function observeFadeUp(root) {
    if (!io) { root.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')); return; }
    root.querySelectorAll('.fade-up').forEach(el => io.observe(el));
  }
  observeFadeUp(document);

  // FAQ accordion
  document.addEventListener('DOMContentLoaded', () => bindFAQ(document));
  function bindFAQ(root) {
    root.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(el => { el.classList.remove('open'); el.querySelector('.faq-q').setAttribute('aria-expanded','false'); });
        if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      });
    });
  }

  // Deep key: "hero.headline" -> obj.hero.headline
  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  // Apply data-c, data-html, data-href, data-placeholder
  function applyContent(merged) {
    document.querySelectorAll('[data-c]').forEach(el => {
      const val = get(merged, el.dataset.c);
      if (val !== null && val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-html]').forEach(el => {
      const val = get(merged, el.dataset.html);
      if (val !== null && val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-href]').forEach(el => {
      const val = get(merged, el.dataset.href);
      if (val !== null && val !== undefined) el.href = val;
    });
    document.querySelectorAll('[data-placeholder]').forEach(el => {
      const val = get(merged, el.dataset.placeholder);
      if (val !== null && val !== undefined) el.placeholder = val;
    });
  }

  function setInner(id, html) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html;
    observeFadeUp(el);
  }

  const ARR = `<svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  const CHK = `<svg class="trust-list-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
  const TCK = `<svg class="trust-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
  const FAQ_ICO = `<div class="faq-q-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>`;

  /* ── GLOBAL ── */
  function renderTrustStrip(g) {
    setInner('dyn-trust-strip', g.trust_strip.map(t => `<div class="trust-item">${TCK}${t}</div>`).join(''));
  }

  /* ── HOME ── */
  const SVC_ICONS = [
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  ];
  const WHY_ICONS = [
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
  ];

  function renderHomeServices(d) {
    const s = d.services_section;
    const cards = [
      {h:s.card_1_heading, b:s.card_1_body, li:[s.card_1_li_1,s.card_1_li_2,s.card_1_li_3,s.card_1_li_4]},
      {h:s.card_2_heading, b:s.card_2_body, li:[s.card_2_li_1,s.card_2_li_2,s.card_2_li_3,s.card_2_li_4]},
      {h:s.card_3_heading, b:s.card_3_body, li:[s.card_3_li_1,s.card_3_li_2,s.card_3_li_3,s.card_3_li_4]}
    ];
    setInner('dyn-home-services', cards.map((c,i) =>
      `<div class="card fade-up${i?' d'+i:''}"><div class="card-icon" aria-hidden="true">${SVC_ICONS[i]}</div><h3>${c.h}</h3><p>${c.b}</p><ul class="card-list">${c.li.map(x=>`<li>${x}</li>`).join('')}</ul></div>`
    ).join(''));
  }

  function renderHomeWhy(d) {
    const w = d.why_section;
    const cards = [
      {h:w.card_1_heading, b:w.card_1_body},
      {h:w.card_2_heading, b:w.card_2_body},
      {h:w.card_3_heading, b:w.card_3_body},
      {h:w.card_4_heading, b:w.card_4_body}
    ];
    setInner('dyn-home-why', cards.map((c,i) =>
      `<div class="feature-card fade-up${i?' d'+i:''}"><div class="feature-icon" aria-hidden="true">${WHY_ICONS[i]}</div><div class="feature-text"><h3>${c.h}</h3><p>${c.b}</p></div></div>`
    ).join(''));
  }

  function renderIndustries(d) {
    setInner('dyn-industries', d.industries_section.industries.map(ind =>
      `<div class="ind-card"><div class="ind-card-icon" aria-hidden="true">${ind.emoji}</div><p class="ind-card-name">${ind.name}</p></div>`
    ).join(''));
  }

  function renderHomeSolutions(d) {
    const s = d.solutions_section;
    setInner('dyn-home-solutions', [
      {num:s.card_1_num, h:s.card_1_heading, b:s.card_1_body},
      {num:s.card_2_num, h:s.card_2_heading, b:s.card_2_body},
      {num:s.card_3_num, h:s.card_3_heading, b:s.card_3_body}
    ].map((c,i) =>
      `<div class="solution-card fade-up${i?' d'+i:''}"><div class="sol-number" aria-hidden="true">${c.num}</div><h3>${c.h}</h3><p>${c.b}</p></div>`
    ).join(''));
  }

  function renderHomeProcess(d) {
    const p = d.process_section;
    setInner('dyn-home-process', [
      {num:p.step_1_num, h:p.step_1_heading, b:p.step_1_body},
      {num:p.step_2_num, h:p.step_2_heading, b:p.step_2_body},
      {num:p.step_3_num, h:p.step_3_heading, b:p.step_3_body},
      {num:p.step_4_num, h:p.step_4_heading, b:p.step_4_body}
    ].map((s,i) =>
      `<div class="process-item fade-up${i?' d'+i:''}"><div class="process-num" aria-label="Step ${i+1}">${s.num}</div><div class="process-body"><h3>${s.h}</h3><p>${s.b}</p></div></div>`
    ).join(''));
  }

  function renderTestimonials(d) {
    setInner('dyn-testimonials', d.testimonials_section.testimonials.map((t,i) =>
      `<div class="testimonial-card fade-up${i?' d'+i:''}"><div class="t-stars" aria-label="5 out of 5 stars">${t.stars}</div><p class="t-quote">${t.quote}</p><div class="t-author"><strong>${t.name}</strong><span>${t.detail}</span></div></div>`
    ).join(''));
  }

  function renderFAQ(d) {
    setInner('dyn-faq', d.faq_section.faqs.map((f,i) =>
      `<div class="faq-item" role="listitem"><button class="faq-q" aria-expanded="false" aria-controls="faq-${i}">${f.question}${FAQ_ICO}</button><div class="faq-a" id="faq-${i}">${f.answer}</div></div>`
    ).join(''));
    bindFAQ(document.getElementById('dyn-faq'));
  }

  /* ── SERVICES ── */
  function renderServicesSections(d) {
    [d.svc_1, d.svc_2, d.svc_3, d.svc_4, d.svc_5, d.svc_6].forEach((s,i) => {
      const b2 = s.body_2 ? `<p>${s.body_2}</p>` : '';
      setInner(`dyn-svc-${i+1}`, `
        <div class="svc-content fade-up"><span class="eyebrow">${s.eyebrow}</span><h2>${s.heading}</h2><p>${s.body_1}</p>${b2}
          <a href="${s.cta_href}" class="btn btn-primary btn-lg mt-sm">${s.cta_text} ${ARR}</a></div>
        <div class="svc-panel fade-up d2"><div class="svc-panel-title">${s.panel_title}</div>
          <ul class="card-list">${s.panel_items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`);
    });
  }

  function renderServicesTrustBar(d) {
    setInner('dyn-services-trust', d.trust_bar.map(t => `<div class="trust-item">${TCK}${t}</div>`).join(''));
  }

  /* ── SOLUTIONS ── */
  function renderSolutionsCards(d) {
    setInner('dyn-solutions', d.solutions.map((s,i) => {
      const b2 = s.body_2 ? `<p>${s.body_2}</p>` : '';
      const span = (i===6) ? ' span-2' : '';
      return `<div class="solution-card fade-up${i?' d'+Math.min(i,3):''}${span}">
        <div class="sol-number" aria-hidden="true">${s.num}</div>
        <h3>${s.heading}</h3><p>${s.body_1}</p>${b2}
        <ul class="card-list">${s.items.map(x=>`<li>${x}</li>`).join('')}</ul>
        <div class="mt-sm"><a href="${s.cta_href}" class="btn btn-outline">${s.cta_text} ${ARR}</a></div></div>`;
    }).join(''));
  }

  function renderBridgeCards(d) {
    const b = d.bridge;
    setInner('dyn-bridge-cards', [
      {icon:b.card_1_icon, h:b.card_1_heading, body:b.card_1_body, cta:b.card_1_cta, href:b.card_1_href},
      {icon:b.card_2_icon, h:b.card_2_heading, body:b.card_2_body, cta:b.card_2_cta, href:b.card_2_href},
      {icon:b.card_3_icon, h:b.card_3_heading, body:b.card_3_body, cta:b.card_3_cta, href:b.card_3_href}
    ].map((c,i) =>
      `<div class="card fade-up${i?' d'+i:''}"><div class="card-icon" aria-hidden="true">${c.icon}</div><h3>${c.h}</h3><p>${c.body}</p><a href="${c.href}" class="btn btn-ghost btn-sm mt-sm">${c.cta}</a></div>`
    ).join(''));
  }

  /* ── ABOUT ── */
  const APPROACH_ICONS = [
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93L17.66 6.34A8 8 0 1 1 6.34 17.66l-1.41 1.41A10 10 0 1 0 19.07 4.93z"/></svg>`
  ];

  function renderValueCards(d) {
    setInner('dyn-value-cards', d.values.cards.map((c,i) =>
      `<div class="value-card fade-up${i?' d'+Math.min(i,3):''}"><div class="value-card-icon" aria-hidden="true">${c.emoji}</div><h3>${c.heading}</h3><p>${c.body}</p></div>`
    ).join(''));
  }

  function renderApproachCards(d) {
    setInner('dyn-approach-cards', d.approach.cards.map((c,i) =>
      `<div class="card fade-up${i?' d'+i:''}"><div class="card-icon">${APPROACH_ICONS[i]}</div><h3>${c.heading}</h3><p>${c.body}</p></div>`
    ).join(''));
  }

  function renderAboutProcess(d) {
    setInner('dyn-about-process', d.process.steps.map((s,i) =>
      `<div class="process-item fade-up${i?' d'+i:''}"><div class="process-num">${s.num}</div><div class="process-body"><h3>${s.heading}</h3><p>${s.body}</p></div></div>`
    ).join(''));
  }

  /* ── CONTACT ── */
  function renderWalkawayBox(d) {
    setInner('dyn-walkaway', `<p class="info-box-title">${d.walkaway_box.title}</p><ul class="card-list">${d.walkaway_box.items.map(x=>`<li>${x}</li>`).join('')}</ul>`);
  }

  function renderTrustBullets(d) {
    setInner('dyn-trust-bullets', d.trust_bullets.map(t =>
      `<li class="trust-list-item">${CHK}${t}</li>`).join(''));
  }

  function renderFormSelects(d) {
    const f = d.form;
    setInner('dyn-industry-options',
      `<option value="" disabled selected>${f.industry_default}</option>` +
      f.industry_options.map(o=>`<option value="${o.value}">${o.label}</option>`).join(''));
    setInner('dyn-need-options',
      `<option value="" disabled selected>${f.need_default}</option>` +
      f.need_options.map(o=>`<option value="${o.value}">${o.label}</option>`).join(''));
  }

  /* ── THANKS ── */
  function renderThanksSteps(d) {
    setInner('dyn-thanks-steps', d.steps.map(s=>`<li>${s}</li>`).join(''));
  }

  /* ── Fetch & dispatch ── */
  async function fetchJSON(path) {
    try { const r = await fetch(path); return r.ok ? await r.json() : null; } catch { return null; }
  }

  const PAGE_MAP = {
    'index.html':'index', '':'index',
    'services.html':'services', 'solutions.html':'solutions',
    'about.html':'about', 'contact.html':'contact', 'thanks.html':'thanks'
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const pageName = PAGE_MAP[file];
    if (!pageName) return;

    const [global, pageData] = await Promise.all([
      fetchJSON('/content/global.json'),
      fetchJSON(`/content/${pageName}.json`)
    ]);
    if (!global || !pageData) return;

    // Merge: global keys accessible as "global.nav.cta_text", page keys as "hero.headline", etc.
    const merged = { ...pageData, global };
    applyContent(merged);

    renderTrustStrip(global);

    if (pageName === 'index') {
      renderHomeServices(pageData); renderHomeWhy(pageData);
      renderIndustries(pageData); renderHomeSolutions(pageData);
      renderHomeProcess(pageData); renderTestimonials(pageData);
      renderFAQ(pageData);
    }
    if (pageName === 'services') { renderServicesSections(pageData); renderServicesTrustBar(pageData); }
    if (pageName === 'solutions') { renderSolutionsCards(pageData); renderBridgeCards(pageData); }
    if (pageName === 'about') { renderValueCards(pageData); renderApproachCards(pageData); renderAboutProcess(pageData); }
    if (pageName === 'contact') { renderWalkawayBox(pageData); renderTrustBullets(pageData); renderFormSelects(pageData); }
    if (pageName === 'thanks') { renderThanksSteps(pageData); }

    observeFadeUp(document);
  });

})();
