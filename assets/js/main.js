// ZSkillup — shared site behavior (header, mobile nav, misc)
(function () {
  var header = document.querySelector('[data-site-header]');
  var nav = document.querySelector('[data-site-nav]');
  var toggle = document.querySelector('[data-nav-toggle]');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close mobile nav when a link is tapped
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Brochure / enquiry form — client-side only (no backend in this repo)
  document.querySelectorAll('[data-brochure-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = 'Thank you! We’ll be in touch ✓';
        btn.disabled = true;
        setTimeout(function () {
          btn.innerHTML = original;
          btn.disabled = false;
          form.reset();
        }, 3200);
      }
    });
  });
})();
