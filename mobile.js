// mobile.js — Dedicated mobile layout
// Runs after helpers.js; before curriculum.js and app.js.
// All functions defined here are global (classic script, shared scope).

var _mobSwipeStartX = 0;
var _mobSwipeStartY = 0;
var _mobSwipeFi = 0;
var _mobSwipeSi = 0;

function isMobile() {
  return window.innerWidth <= 900;
}

function initMobileLayout() {
  _checkMobileClass();
  window.addEventListener('resize', _checkMobileClass);
}

function _checkMobileClass() {
  if (isMobile()) {
    document.body.classList.add('is-mobile');
  } else {
    document.body.classList.remove('is-mobile');
    _removeMobileSectionChrome();
    document.body.classList.remove('mob-in-section');
  }
}

// ============================================================
// MOBILE HUB
// ============================================================
function renderMobileHub() {
  if (!isMobile()) return;
  var panel = document.getElementById('panel-learn');
  if (!panel) return;

  _removeMobileSectionChrome();
  document.body.classList.remove('mob-in-section');

  var totalDone = 0, totalSecs = 0;
  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f) {
      f.sections.forEach(function(s) {
        totalSecs++;
        if (state.completed && state.completed[s.id]) totalDone++;
      });
    });
  }
  var overallPct = totalSecs > 0 ? Math.round(totalDone / totalSecs * 100) : 0;
  var name = (typeof state !== 'undefined' && state.playerName) ||
             localStorage.getItem('codebook_player_name') || '';
  var xp = (typeof state !== 'undefined' && state.xp) || 0;
  var streak = (typeof state !== 'undefined' && state.streak) || 0;

  var html = '<div class="mob-hub">';

  // Header
  html += '<div class="mob-hub-header">' +
    '<div class="mob-hub-greeting">Hey' + (name ? ', ' + (typeof escHtml === 'function' ? escHtml(name) : name) : '') + '.</div>' +
    '<div class="mob-hub-meta">' +
      '<div class="mob-hub-bar"><div class="mob-hub-bar-fill" style="width:' + overallPct + '%"></div></div>' +
      '<span class="mob-hub-pct">' + overallPct + '% complete</span>' +
    '</div>' +
    '<div class="mob-hub-stats">' +
      '<span class="mob-hub-chip">⚡ ' + xp + ' XP</span>' +
      '<span class="mob-hub-chip">🔥 ' + streak + (streak === 1 ? ' day' : ' days') + '</span>' +
    '</div>' +
  '</div>';

  // Floor cards
  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f, fi) {
      var isComplete = typeof isFloorComplete === 'function' && isFloorComplete(fi);
      var isCurrent = fi === ((state && state.currentFloor || 1) - 1);
      var done = 0;
      f.sections.forEach(function(s) { if (state && state.completed && state.completed[s.id]) done++; });
      var pct = Math.round(done / f.sections.length * 100);
      var color = f.color || '#c8a96e';

      var statusLabel = isComplete ? 'Complete' : isCurrent && done > 0 ? 'In progress' : done > 0 ? 'Started' : 'Available';
      var badgeCls = isComplete ? 'mob-badge-done' : isCurrent ? 'mob-badge-active' : 'mob-badge-idle';
      var btnText = isComplete ? 'Review' : done > 0 ? 'Continue' : 'Start';
      var cardCls = 'mob-floor-card' + (isCurrent ? ' mob-floor-active' : '') + (isComplete ? ' mob-floor-done' : '');

      html += '<div class="' + cardCls + '" style="--fc-color:' + color + '">' +
        '<div class="mob-floor-top">' +
          '<span class="mob-floor-num">Floor ' + (fi + 1) + '</span>' +
          '<span class="mob-floor-badge ' + badgeCls + '">' + statusLabel + '</span>' +
        '</div>' +
        '<div class="mob-floor-title">' + (typeof escHtml === 'function' ? escHtml(f.title) : f.title) + '</div>' +
        (f.subtitle ? '<div class="mob-floor-sub">' + (typeof escHtml === 'function' ? escHtml(f.subtitle) : f.subtitle) + '</div>' : '') +
        '<div class="mob-floor-progress">' +
          '<div class="mob-floor-bar"><div class="mob-floor-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<span class="mob-floor-pct">' + done + ' / ' + f.sections.length + ' sections</span>' +
        '</div>' +
        '<button class="mob-floor-btn" onclick="goToFloor(' + fi + ')">' + btnText + ' →</button>' +
      '</div>';
    });
  }

  html += '</div>';
  panel.innerHTML = html;
}

// ============================================================
// MOBILE SECTION CHROME (header + footer)
// ============================================================
function renderMobileSectionChrome() {
  if (!isMobile()) return;

  _removeMobileSectionChrome();

  var fi = (typeof state !== 'undefined' && state.currentFloor) ? state.currentFloor - 1 : 0;
  var si = (typeof state !== 'undefined') ? (state.currentSection || 0) : 0;
  if (typeof FLOORS === 'undefined' || !FLOORS[fi]) return;
  var floor = FLOORS[fi];
  var section = floor.sections[si];
  if (!section) return;

  document.body.classList.add('mob-in-section');

  // Sticky header
  var header = document.createElement('div');
  header.id = 'mob-section-header';
  header.className = 'mob-section-header';
  header.innerHTML =
    '<button class="mob-section-back" onclick="mobGoToHub()">&#8592; Floor ' + (fi + 1) + '</button>' +
    '<div class="mob-section-title">' + (typeof escHtml === 'function' ? escHtml(section.title) : section.title) + '</div>' +
    '<button class="mob-section-listen" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')">&#128266;</button>';

  // Fixed footer
  var footer = document.createElement('div');
  footer.id = 'mob-section-footer';
  footer.className = 'mob-section-footer';

  var dots = floor.sections.map(function(s, i) {
    var done = !!(state && state.completed && state.completed[s.id]);
    var active = i === si;
    return '<div class="mob-sec-dot' + (done ? ' mob-sec-dot-done' : '') + (active ? ' mob-sec-dot-active' : '') + '"></div>';
  }).join('');

  var isLast = si === floor.sections.length - 1;
  footer.innerHTML =
    '<button class="mob-nav-prev" onclick="prevSection(' + fi + ',' + si + ')"' + (si === 0 ? ' disabled' : '') + '>&#8592;</button>' +
    '<button class="mob-sec-dots-btn" onclick="showSectionSheet(' + fi + ',' + si + ')" title="All sections">' + dots + '</button>' +
    '<button class="mob-nav-next" onclick="' + (isLast ? 'nextSection(' + fi + ',' + si + ')' : 'nextSection(' + fi + ',' + si + ')') + '">' + (isLast ? 'Finish &#10003;' : '&#8594;') + '</button>';

  document.body.appendChild(header);
  document.body.appendChild(footer);

  // Touch swipe on the main content
  _mobSwipeFi = fi;
  _mobSwipeSi = si;
  var el = document.getElementById('panel-learn') || document.getElementById('main-content');
  if (el) {
    el.removeEventListener('touchstart', _mobTouchStart);
    el.removeEventListener('touchend', _mobTouchEnd);
    el.addEventListener('touchstart', _mobTouchStart, { passive: true });
    el.addEventListener('touchend', _mobTouchEnd, { passive: true });
  }
}

function _removeMobileSectionChrome() {
  var h = document.getElementById('mob-section-header');
  var f = document.getElementById('mob-section-footer');
  if (h) h.remove();
  if (f) f.remove();
}

function mobGoToHub() {
  closeSectionSheet();
  _removeMobileSectionChrome();
  document.body.classList.remove('mob-in-section');
  if (typeof renderMobileHub === 'function') renderMobileHub();
  if (typeof stopNarration === 'function') stopNarration();
  if (typeof stopHubCanvas === 'function') stopHubCanvas();
}

// ============================================================
// BOTTOM SHEET — section picker
// ============================================================
function showSectionSheet(fi, si) {
  var existing = document.getElementById('mob-section-sheet');
  if (existing) { closeSectionSheet(); return; }
  if (typeof FLOORS === 'undefined' || !FLOORS[fi]) return;
  var floor = FLOORS[fi];

  var backdrop = document.createElement('div');
  backdrop.id = 'mob-sheet-backdrop';
  backdrop.className = 'mob-sheet-backdrop';
  backdrop.onclick = closeSectionSheet;
  document.body.appendChild(backdrop);

  var sheet = document.createElement('div');
  sheet.id = 'mob-section-sheet';
  sheet.className = 'mob-section-sheet';

  var items = floor.sections.map(function(s, i) {
    var done = !!(state && state.completed && state.completed[s.id]);
    var active = i === si;
    var itemCls = 'mob-sheet-item' + (active ? ' mob-sheet-item-active' : '') + (done ? ' mob-sheet-item-done' : '');
    return '<button class="' + itemCls + '" onclick="goToSection(' + fi + ',' + i + ');closeSectionSheet();setTimeout(renderMobileSectionChrome,80)">' +
      '<span class="mob-sheet-dot">' + (done ? '&#10003;' : (i + 1)) + '</span>' +
      '<span class="mob-sheet-name">' + (typeof escHtml === 'function' ? escHtml(s.title) : s.title) + '</span>' +
    '</button>';
  }).join('');

  sheet.innerHTML =
    '<div class="mob-sheet-handle"></div>' +
    '<div class="mob-sheet-title">Floor ' + (fi + 1) + ' &mdash; ' + (typeof escHtml === 'function' ? escHtml(floor.title) : floor.title) + '</div>' +
    '<div class="mob-sheet-list">' + items + '</div>';

  document.body.appendChild(sheet);
  requestAnimationFrame(function() {
    backdrop.classList.add('mob-sheet-backdrop-open');
    sheet.classList.add('mob-sheet-open');
  });
}

function closeSectionSheet() {
  var sheet = document.getElementById('mob-section-sheet');
  var backdrop = document.getElementById('mob-sheet-backdrop');
  if (sheet) {
    sheet.classList.remove('mob-sheet-open');
    setTimeout(function() { if (sheet.parentNode) sheet.remove(); }, 320);
  }
  if (backdrop) {
    backdrop.classList.remove('mob-sheet-backdrop-open');
    setTimeout(function() { if (backdrop.parentNode) backdrop.remove(); }, 320);
  }
}

// ============================================================
// SWIPE NAVIGATION
// ============================================================
function _mobTouchStart(e) {
  _mobSwipeStartX = e.touches[0].clientX;
  _mobSwipeStartY = e.touches[0].clientY;
}

function _mobTouchEnd(e) {
  var dx = e.changedTouches[0].clientX - _mobSwipeStartX;
  var dy = e.changedTouches[0].clientY - _mobSwipeStartY;
  if (Math.abs(dx) < 55 || Math.abs(dy) > Math.abs(dx) * 0.8) return;
  if (dx < 0) {
    nextSection(_mobSwipeFi, _mobSwipeSi);
  } else {
    prevSection(_mobSwipeFi, _mobSwipeSi);
  }
}

// ============================================================
// INIT — called once app is ready
// ============================================================
window.addEventListener('DOMContentLoaded', initMobileLayout);
