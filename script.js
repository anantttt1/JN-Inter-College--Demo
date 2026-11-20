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
  const motionImages = $$('.intro-image-wrap img,.campus-photos img,.life-feature img,.life-tile img,.gallery-item img,.admissions-photo img');
  function updateScrollMotion() {
    motionFrame = 0;
    $('.header').classList.toggle('scrolled', window.scrollY > 8);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.setProperty('--scroll-progress', `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    motionImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > innerHeight + 80) return;
      const offset = ((rect.top + rect.height / 2 - innerHeight / 2) / innerHeight) * -12;
      img.style.setProperty('--scroll-shift', `${offset.toFixed(1)}px`);
    });
  }
  window.addEventListener('scroll', () => { if (!motionFrame) motionFrame = requestAnimationFrame(updateScrollMotion); }, { passive: true });
  updateScrollMotion();
  const revealTargets = $$('.intro-layout,.values-row,.manifesto-content,.section-heading-row,.learning-card,.campus-layout,.facility-line,.life-feature,.life-tile,.gallery-item,.event-row,.contact-layout');
  revealTargets.forEach(el => {
    el.classList.add('reveal');
    const siblings = [...el.parentElement.children].filter(sibling => sibling.matches('.learning-card,.gallery-item,.event-row,.values-row>div,.life-tile,.campus-photos figure'));
    const order = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--reveal-delay', `${Math.min(order, 5) * 85}ms`);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('visible'));
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

  // Pointer controlled 3D tilt for larger screens; touch and reduced-motion users keep a calm layout.
  const tiltQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (tiltQuery.matches) {
    const tiltItems = $$('.learning-card,.gallery-item,.life-feature,.life-tile,.campus-photos figure,.event-row,.contact-form,.admissions-photo,.intro-image-wrap,.admission-process div,.button');
    tiltItems.forEach(el => {
      el.classList.add('tilt-surface');
      el.addEventListener('pointermove', event => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - .5;
        const y = (event.clientY - box.top) / box.height - .5;
        const tilt = el.matches('.button,.admission-process div') ? 7 : 5;
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
  }
})();
