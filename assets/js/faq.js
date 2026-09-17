// ZSkillup — shared FAQ render engine (category tabs, numbered accordion, load more).
// Expects window.ZFAQ_DATA = { categories: [{ key, label, questions: [{ q, a }] }] }
(function () {
  window.ZFAQRender = function (mount, opts) {
    opts = opts || {};
    var data = window.ZFAQ_DATA;
    if (!data || !mount) return;

    var PAGE_SIZE = opts.pageSize || 5;

    function esc(s) { return String(s); }

    // ---- Preview mode: flat list, one/two per category, no tabs, no load-more ----
    if (opts.preview) {
      var flat = [];
      data.categories.forEach(function (c) {
        c.questions.slice(0, 2).forEach(function (q) { flat.push(q); });
      });
      flat = flat.slice(0, opts.limit || 6);
      var listHtml = flat.map(function (item, i) {
        return faqItemHtml(item, i, 'p');
      }).join('');
      mount.innerHTML = '<div class="faq-list">' + listHtml + '</div>';
      bindAccordion(mount);
      return;
    }

    // ---- Full mode: tabs + numbered accordion + load more ----
    var state = { catIndex: 0, shown: PAGE_SIZE };

    var tabWrap = document.createElement('div');
    tabWrap.className = 'pill-group faq-tabs';
    data.categories.forEach(function (c, i) {
      var b = document.createElement('button');
      b.className = 'pill' + (i === 0 ? ' active' : '');
      b.textContent = c.label + ' (' + c.questions.length + ')';
      b.setAttribute('data-cat', i);
      tabWrap.appendChild(b);
    });

    var listWrap = document.createElement('div');
    listWrap.className = 'faq-list mt-24';

    var moreWrap = document.createElement('div');
    moreWrap.className = 'faq-more';

    var totalAll = data.categories.reduce(function (sum, c) { return sum + c.questions.length; }, 0);

    function renderList() {
      var cat = data.categories[state.catIndex];
      var items = cat.questions.slice(0, state.shown);
      listWrap.innerHTML = items.map(function (item, i) { return faqItemHtml(item, i, cat.key); }).join('');
      bindAccordion(listWrap);
      moreWrap.innerHTML = '';
      if (state.shown < cat.questions.length) {
        var btn = document.createElement('button');
        btn.className = 'btn btn-outline';
        btn.innerHTML = 'Load More Questions <span aria-hidden="true">&darr;</span>';
        btn.addEventListener('click', function () {
          state.shown += PAGE_SIZE;
          renderList();
        });
        moreWrap.appendChild(btn);
      }
      var caption = document.createElement('p');
      caption.className = 'faq-count';
      caption.innerHTML = 'Showing ' + items.length + ' of ' + cat.questions.length + ' questions <span class="dot">&bull;</span> ' + totalAll + ' total';
      moreWrap.appendChild(caption);
    }

    tabWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      tabWrap.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      state.catIndex = parseInt(btn.getAttribute('data-cat'), 10);
      state.shown = PAGE_SIZE;
      renderList();
    });

    mount.appendChild(tabWrap);
    mount.appendChild(listWrap);
    mount.appendChild(moreWrap);
    renderList();
  };

  function faqItemHtml(item, i, groupKey) {
    var num = String(i + 1).padStart(2, '0');
    var body = '<p>' + item.a + '</p>';
    if (item.bullets && item.bullets.length) {
      body += '<ul class="faq-bullets">' + item.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
    }
    return (
      '<div class="faq-item">' +
      '  <button class="faq-q" aria-expanded="false">' +
      '    <span class="faq-num">' + num + '</span>' +
      '    <span class="faq-q-text">' + item.q + '</span>' +
      '    <span class="faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path class="faq-toggle-v" d="M12 5v14"/><path d="M5 12h14"/></svg></span>' +
      '  </button>' +
      '  <div class="faq-a">' + body + '</div>' +
      '</div>'
    );
  }

  function bindAccordion(scope) {
    scope.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }
})();
