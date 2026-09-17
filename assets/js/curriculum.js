// ZSkillup — curriculum page interactivity.
// Reads window.CURRICULUM_DATA (set inline per page) and renders either
// a semester selector (S1-S6) or a two-track selector (ACCA Fast Track).
(function () {
  var data = window.CURRICULUM_DATA;
  var mount = document.querySelector('[data-curriculum-mount]');
  if (!data || !mount) return;

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
  }

  function renderColumn(col) {
    var dotClass = col.dot === 'blue' ? 'style="background:var(--blue-dot)"' : col.dot === 'purple' ? 'style="background:var(--purple-dot)"' : 'style="background:var(--red)"';
    var items = col.items.map(function (it) {
      var text = typeof it === 'string' ? it : it.text;
      var badge = (typeof it === 'object' && it.isNew) ? ' <span class="badge" style="margin-left:6px;">NEW</span>' : '';
      return '<li><span class="li-dot" ' + dotClass + '></span>' + esc(text) + badge + '</li>';
    }).join('');
    return '<div class="curr-col"><h4><span class="li-dot" ' + dotClass + '></span>' + esc(col.label) + '</h4><ul class="curr-list">' + items + '</ul></div>';
  }

  if (data.type === 'semester') {
    var pillWrap = document.createElement('div');
    pillWrap.className = 'pill-group semester-pills';
    data.semesters.forEach(function (s) {
      var b = document.createElement('button');
      b.className = 'pill' + (s.id === 1 ? ' active' : '');
      b.textContent = s.code;
      b.setAttribute('data-sem', s.id);
      pillWrap.appendChild(b);
    });

    var panel = document.createElement('div');
    panel.className = 'curr-panel';

    function renderSemester(id) {
      var s = data.semesters.filter(function (x) { return x.id === id; })[0];
      if (!s) return;
      var cols = s.columns.map(renderColumn).join('');
      var outcomes = s.outcomes.map(function (o, i) {
        return '<span class="outcome-pill">' + esc(o) + '</span>' + (i < s.outcomes.length - 1 ? '<span class="outcome-arrow">&rarr;</span>' : '');
      }).join('');
      panel.innerHTML =
        '<div class="curr-panel-head">' +
        '  <span class="badge navy">Semester 0' + s.id + '</span>' +
        '  <h3>' + esc(s.code) + ': ' + esc(s.name) + '</h3>' +
        '  <p>' + esc(s.desc) + '</p>' +
        '</div>' +
        '<div class="curr-cols">' + cols + '</div>' +
        '<div class="curr-outcomes"><span class="outcomes-label">End of Semester Outcomes:</span><div class="outcomes-row">' + outcomes + '</div></div>';
    }

    pillWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-sem]');
      if (!btn) return;
      pillWrap.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      renderSemester(parseInt(btn.getAttribute('data-sem'), 10));
    });

    mount.appendChild(pillWrap);
    mount.appendChild(panel);
    renderSemester(1);

    // Semester journey stepper (static overview strip)
    var stepperMount = document.querySelector('[data-semester-stepper]');
    if (stepperMount) {
      stepperMount.innerHTML = data.semesters.map(function (s) {
        return '<div class="step"><span class="step-badge">' + esc(s.code) + '</span><span class="step-name">' + esc(s.name) + '</span></div>';
      }).join('<span class="step-line"></span>');
    }
  }

  if (data.type === 'tracks') {
    var tabWrap = document.createElement('div');
    tabWrap.className = 'pill-group track-pills';
    data.tracks.forEach(function (t, i) {
      var b = document.createElement('button');
      b.className = 'pill' + (i === 0 ? ' active' : '');
      b.textContent = t.label;
      b.setAttribute('data-track', t.id);
      tabWrap.appendChild(b);
    });

    var panel = document.createElement('div');
    panel.className = 'curr-panel';

    function renderTrack(id) {
      var t = data.tracks.filter(function (x) { return x.id === id; })[0];
      if (!t) return;
      var groups = t.groups.map(function (g) {
        var items = g.items.map(function (it) { return '<li><span class="li-dot" style="background:var(--red)"></span>' + esc(it) + '</li>'; }).join('');
        return '<div class="curr-col"><h4>' + esc(g.title) + '</h4><ul class="curr-list">' + items + '</ul></div>';
      }).join('');
      panel.innerHTML =
        '<div class="curr-panel-head">' +
        (t.intro ? '<p>' + esc(t.intro) + '</p>' : '') +
        (t.note ? '<div class="track-note">' + esc(t.note) + '</div>' : '') +
        '</div>' +
        '<div class="curr-cols curr-cols-wrap">' + groups + '</div>';
    }

    tabWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-track]');
      if (!btn) return;
      tabWrap.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      renderTrack(btn.getAttribute('data-track'));
    });

    mount.appendChild(tabWrap);
    mount.appendChild(panel);
    renderTrack(data.tracks[0].id);
  }
})();
