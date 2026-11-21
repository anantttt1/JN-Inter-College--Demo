(() => {
  const config = window.SCHOOL_CONFIG || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  let language = localStorage.getItem('jn-language') || 'hi';
  let activeGalleryItem = null;

  function applyConfig() {
    const name = config.name || 'JN INTER COLLEGE';
    const short = config.shortName || 'JN';
    $$('.brand-copy strong').forEach(el => el.textContent = name);
    $$('.crest b').forEach(el => el.textContent = short);
    $$('.signature').forEach(el => el.textContent = short);
    $$('.footer-bottom>span:first-child').forEach(el => {
      el.innerHTML = `© ${config.year || '2026'} ${name} <i>·</i> <span data-en="DESIGN PREVIEW — DEMO PLACEHOLDERS" data-hi="डिज़ाइन प्रीव्यू — डेमो प्लेसहोल्डर">डिज़ाइन प्रीव्यू — डेमो प्लेसहोल्डर</span>`;
    });
    $$('.stat-num[data-count]').forEach((el, i) => {
      const stat = config.stats && config.stats[i];
      if (stat && stat.value != null) { el.dataset.count = stat.value; el.dataset.suffix = stat.suffix || ''; }
    });
    $$('.stat-label').forEach((el, i) => {
      const stat = config.stats && config.stats[i];
      if (stat && stat.en && stat.hi) { el.dataset.en = stat.en; el.dataset.hi = stat.hi; }
    });
    // Leadership cards: any field given in config.leaders[i] replaces the sample content (same order as on the page).
    $$('.leader-card').forEach((card, i) => {
      const leader = config.leaders && config.leaders[i];
      if (!leader) return;
      const photo = $('.leader-photo>img', card);
      if (leader.photo && photo) {
        // A real photo fills the frame (cover); if the file path is wrong we fall back to the illustrated portrait.
        const original = photo.getAttribute('src');
        card.classList.add('has-photo');
        photo.dataset.fallback = 'true'; // skip the generic image fallback; restore our own illustration instead
        photo.addEventListener('error', () => { card.classList.remove('has-photo'); photo.src = original; }, { once: true });
        photo.src = leader.photo;
      }
      [['.leader-name', 'name'], ['.leader-post', 'role'], ['.leader-message', 'message']].forEach(([selector, key]) => {
        const el = $(selector, card), en = leader[`${key}En`], hi = leader[`${key}Hi`];
        if (el && en && hi) { el.dataset.en = en; el.dataset.hi = hi; }
      });
      if (card.id === 'leader-principal') {
        const note = $('.principal-name');
        if (note && leader.nameEn && leader.nameHi && leader.roleEn && leader.roleHi) {
          note.dataset.en = `${leader.nameEn} · ${leader.roleEn}`; note.dataset.hi = `${leader.nameHi} · ${leader.roleHi}`;
        }
        const avatar = $('.principal-note .avatar img');
        if (leader.photo && avatar) {
          const originalAvatar = avatar.getAttribute('src');
          avatar.dataset.fallback = 'true';
          avatar.addEventListener('error', () => { avatar.src = originalAvatar; }, { once: true });
          avatar.src = leader.photo;
        }
      }
    });
    const detailEls = $$('.contact-details b');
    if (detailEls[0] && config.address) detailEls[0].textContent = config.address;
    if (detailEls[1] && config.phone) detailEls[1].textContent = config.phone;
    if (detailEls[2] && config.email) detailEls[2].textContent = config.email;
    document.title = `${name} — ${language === 'hi' ? 'ज्ञान, संस्कार, संभावना' : 'Knowledge, Character, Possibility'}`;
  }
  function setLanguage(next) {
    language = next;
    localStorage.setItem('jn-language', language);
    document.documentElement.lang = language;
    document.body.classList.toggle('hindi', language === 'hi');
    $$('[data-en][data-hi]').forEach(el => {
      const value = el.dataset[language];
      if (value != null) el.innerHTML = value;
    });
    $$('[data-placeholder-en][data-placeholder-hi]').forEach(el => el.placeholder = el.dataset[`placeholder${language === 'hi' ? 'Hi' : 'En'}`]);
    $$('[data-aria-en][data-aria-hi]').forEach(el => el.setAttribute('aria-label', el.dataset[`aria${language === 'hi' ? 'Hi' : 'En'}`]));
    $$('[data-alt-en][data-alt-hi]').forEach(el => el.alt = el.dataset[`alt${language === 'hi' ? 'Hi' : 'En'}`]);
    $('.lang-en').classList.toggle('active', language === 'en');
    $('.lang-hi').classList.toggle('active', language === 'hi');
    document.title = `${config.name || 'JN INTER COLLEGE'} — ${language === 'hi' ? 'ज्ञान, संस्कार, संभावना' : 'Knowledge, Character, Possibility'}`;
    if (activeGalleryItem) showLightbox(activeGalleryItem);
  }
  applyConfig(); setLanguage(language);
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.append(progressBar);
  $('.lang-switch').addEventListener('click', () => setLanguage(language === 'hi' ? 'en' : 'hi'));
  const menuButton = $('.menu-toggle'), nav = $('.nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', language === 'hi' ? (open ? 'मेन्यू बंद करें' : 'मेन्यू खोलें') : (open ? 'Close menu' : 'Open menu'));
  });
  $$('.nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', language === 'hi' ? 'मेन्यू खोलें' : 'Open menu'); }));
  let motionFrame = 0;
  const motionImages = $$('.campus-photos img,.life-feature>img,.manifesto>img,.admissions-photo img');
  motionImages.forEach(img => img.classList.add('parallax-img'));
  function updateScrollMotion() {
    motionFrame = 0;
    $('.header').classList.toggle('scrolled', window.scrollY > 8);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.setProperty('--scroll-progress', `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    motionImages.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > innerHeight + 80) return;
      const max = Math.min(rect.height * .055, 34);
      const norm = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
      const offset = Math.max(-max, Math.min(max, norm * -max * 2));
      img.style.setProperty('--scroll-shift', `${offset.toFixed(1)}px`);
    });
  }
  window.addEventListener('scroll', () => { if (!motionFrame) motionFrame = requestAnimationFrame(updateScrollMotion); }, { passive: true });
  updateScrollMotion();
  // Scroll reveal: every block flies in from its own direction, with a stagger between siblings.
  const fxFor = (el, index) => {
    if (el.matches('.learning-card,.leader-card')) return 'flip';
    if (el.matches('.gallery-item,.stat-card')) return 'zoom';
    if (el.matches('.life-feature,.admissions-photo')) return 'left';
    if (el.matches('.life-tile,.admissions-panel')) return 'right';
    if (el.matches('.event-row')) return index % 2 ? 'right' : 'left';
    return '';
  };
  const staggerSelector = '.learning-card,.leader-card,.gallery-item,.event-row,.stat-card,.life-tile';
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('visible');
        revealObserver.unobserve(el);
        setTimeout(() => el.classList.add('revealed'), 1900);
      }), { threshold: .08 })
    : null;
  function jnReveal(targets) {
    [...targets].forEach(el => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      const siblings = [...el.parentElement.children].filter(sibling => sibling.matches(staggerSelector));
      const order = Math.max(0, siblings.indexOf(el));
      const fx = fxFor(el, order);
      if (fx) el.dataset.fx = fx;
      el.style.setProperty('--reveal-delay', `${Math.min(order, 5) * 90}ms`);
      if (revealObserver) revealObserver.observe(el); else el.classList.add('visible', 'revealed');
    });
  }
  window.jnReveal = jnReveal;
  // Keep the "01 / 02 / 03" section numbers in page order (the 3D campus section is inserted after this script runs).
  window.jnRenumber = () => $$('.section-kicker>span:first-child').forEach((el, i) => {
    const label = el.firstChild;
    if (label && label.nodeType === 3) label.textContent = `${String(i + 1).padStart(2, '0')} / `;
  });
  window.jnRenumber();
  jnReveal($$('.intro-layout,.values-row,.manifesto-content,.section-heading-row,.stat-card,.leader-card,.learning-card,.campus-layout,.facility-line,.life-feature,.life-tile,.gallery-item,.event-row,.contact-layout,.admissions-photo,.admissions-panel'));

  // Count-up numbers in the "at a glance" strip.
  const formatNum = n => Math.round(n).toLocaleString('en-IN');
  const countEls = $$('.stat-num[data-count]');
  function runCounter(el) {
    const end = Number(el.dataset.count) || 0, suffix = el.dataset.suffix || '';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = formatNum(end) + suffix; return; }
    const begin = performance.now(), duration = 2200;
    const tick = now => {
      const t = Math.min(1, (now - begin) / duration);
      el.textContent = formatNum(t === 1 ? end : end * (1 - Math.pow(2, -10 * t))) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { runCounter(entry.target); countObserver.unobserve(entry.target); }
    }), { threshold: .5 });
    countEls.forEach(el => { el.textContent = '0' + (el.dataset.suffix || ''); countObserver.observe(el); });
  } else countEls.forEach(el => { el.textContent = formatNum(el.dataset.count) + (el.dataset.suffix || ''); });
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    $$('.filter').forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    $$('.gallery-item').forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
    $('.gallery-count').textContent = `01 — ${String($$('.gallery-item:not(.hidden)').length).padStart(2, '0')}`;
  }));
  const lightbox = $('.lightbox'), galleryItems = $$('.gallery-item');
  function showLightbox(item) {
    activeGalleryItem = item;
    const image = $('img', item);
    $('figure img', lightbox).src = item.dataset.full || image.src;
    $('figure img', lightbox).alt = image.alt;
    $('figcaption', lightbox).textContent = $('span', item).textContent;
    $('.lightbox-count').textContent = `${String(galleryItems.indexOf(item) + 1).padStart(2, '0')} / ${galleryItems.length}`;
    lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; $('.lightbox-close').focus();
  }
  function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; activeGalleryItem = null; }
  function moveLightbox(direction) {
    let i = galleryItems.indexOf(activeGalleryItem);
    for (let step = 0; step < galleryItems.length; step++) { i = (i + direction + galleryItems.length) % galleryItems.length; if (!galleryItems[i].classList.contains('hidden')) return showLightbox(galleryItems[i]); }
  }
  galleryItems.forEach(item => item.addEventListener('click', () => showLightbox(item)));
  $('.lightbox-close').addEventListener('click', closeLightbox);
  $('.lightbox-prev').addEventListener('click', () => moveLightbox(-1)); $('.lightbox-next').addEventListener('click', () => moveLightbox(1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (!lightbox.classList.contains('open')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') moveLightbox(-1); if (event.key === 'ArrowRight') moveLightbox(1); });
  const dialog = $('.enquiry-dialog');
  $('#open-enquiry').addEventListener('click', () => dialog.showModal()); $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    $('.form-status', form).textContent = language === 'hi' ? 'धन्यवाद! यह केवल डेमो पुष्टि है — संदेश कहीं भेजा नहीं गया।' : 'Thank you! This is a demo confirmation — your note was not sent anywhere.';
    form.reset();
  });
  $$('img').forEach(img => img.addEventListener('error', () => {
    if (img.dataset.fallback) return; img.dataset.fallback = 'true';
    img.src = 'assets/image-fallback.svg';
  }));
  // Images that already failed before this script ran never fire a new error event, so swap them now.
  $$('img').forEach(img => { if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) img.dispatchEvent(new Event('error')); });

  // Pointer controlled 3D tilt for larger screens; touch and reduced-motion users keep a calm layout.
  const tiltQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (tiltQuery.matches) {
    const tiltItems = $$('.learning-card,.leader-card,.gallery-item,.life-feature,.life-tile,.event-row,.contact-form,.intro-image-wrap,.stat-card');
    tiltItems.forEach(el => {
      el.classList.add('tilt-surface');
      el.addEventListener('pointermove', event => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - .5;
        const y = (event.clientY - box.top) / box.height - .5;
        const tilt = el.matches('.stat-card,.learning-card') ? 10 : 6;
        el.style.setProperty('--light-x', `${((x + .5) * 100).toFixed(1)}%`);
        el.style.setProperty('--light-y', `${((y + .5) * 100).toFixed(1)}%`);
        el.style.setProperty('--tilt-x', `${(-y * tilt).toFixed(2)}deg`);
        el.style.setProperty('--tilt-y', `${(x * tilt).toFixed(2)}deg`);
      });
      el.addEventListener('pointerleave', () => {
        el.style.removeProperty('--tilt-x');
        el.style.removeProperty('--tilt-y');
        el.style.removeProperty('--light-x');
        el.style.removeProperty('--light-y');
      });
    });

    // Soft light that follows the cursor, hero shapes that drift with it, and magnetic buttons.
    const glow = document.createElement('div');
    glow.className = 'cursor-glow'; glow.setAttribute('aria-hidden', 'true'); document.body.append(glow);
    let glowX = 0, glowY = 0, glowFrame = 0;
    window.addEventListener('pointermove', event => {
      glowX = event.clientX; glowY = event.clientY; glow.classList.add('on');
      if (!glowFrame) glowFrame = requestAnimationFrame(() => {
        glowFrame = 0;
        glow.style.setProperty('--gx', `${glowX}px`); glow.style.setProperty('--gy', `${glowY}px`);
      });
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('on'));
    const hero = $('.hero'), shapes = $('.float-shapes');
    if (hero && shapes) {
      hero.addEventListener('pointermove', event => {
        const box = hero.getBoundingClientRect();
        shapes.style.setProperty('--mx', ((event.clientX - box.left) / box.width - .5).toFixed(3));
        shapes.style.setProperty('--my', ((event.clientY - box.top) / box.height - .5).toFixed(3));
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { shapes.style.setProperty('--mx', 0); shapes.style.setProperty('--my', 0); });
    }
    $$('.button,.nav-cta').forEach(el => {
      el.addEventListener('pointermove', event => {
        const box = el.getBoundingClientRect();
        el.style.translate = `${((event.clientX - box.left - box.width / 2) * .18).toFixed(1)}px ${((event.clientY - box.top - box.height / 2) * .3).toFixed(1)}px`;
      });
      el.addEventListener('pointerleave', () => { el.style.translate = ''; });
    });
  }
})();
