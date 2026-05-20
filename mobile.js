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
// NAV TILE ICONS — geometric SVG, matches desktop fc-card holo style
// ============================================================
function getMobNavIcon(type, sz) {
  sz = sz || 36;
  var fid = 'mni' + type;
  var flt = '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="' + sz + '" height="' + sz + '" class="holo-icon" style="display:block;overflow:visible">' + flt + '<g filter="url(#' + fid + ')">';
  var close = '</g></svg>';
  var s  = 'fill:none;stroke:var(--mg-color)';
  var sf = 'fill:var(--mg-color)';
  var d  = ';opacity:0.42';

  var map = {
    challenge:
      open +
      '<polygon points="28,3 13,25 21,25 16,45 35,21 27,21" style="stroke-width:1.7;stroke-linejoin:round;' + s + '"/>' +
      '<line x1="26" y1="9" x2="21" y2="25" style="stroke-width:0.7;' + s + d + '"/>' +
      '<line x1="27" y1="21" x2="19" y2="39" style="stroke-width:0.7;' + s + d + '"/>' +
      '<circle cx="28" cy="3" r="2.2" style="' + sf + '"/>' +
      '<circle cx="16" cy="45" r="2.2" style="' + sf + '"/>' +
      close,

    revision:
      open +
      '<rect x="8" y="10" width="22" height="30" rx="3" style="stroke-width:1;' + s + d + '"/>' +
      '<rect x="14" y="8" width="22" height="30" rx="3" style="stroke-width:1.5;' + s + '"/>' +
      '<line x1="14" y1="17" x2="36" y2="17" style="stroke-width:0.8;' + s + d + '"/>' +
      '<circle cx="21" cy="25" r="2.2" style="' + sf + '"/>' +
      '<circle cx="29" cy="32" r="2.2" style="' + sf + '"/>' +
      '<circle cx="14" cy="8" r="1.8" style="' + sf + ';opacity:0.55"/>' +
      '<circle cx="36" cy="38" r="1.8" style="' + sf + ';opacity:0.55"/>' +
      close,

    tools:
      open +
      '<circle cx="24" cy="24" r="11" style="stroke-width:1.5;' + s + '"/>' +
      '<circle cx="24" cy="24" r="4.5" style="stroke-width:1.1;' + s + '"/>' +
      '<circle cx="24" cy="24" r="2" style="' + sf + '"/>' +
      '<rect x="21.5" y="2" width="5" height="6" rx="1.5" style="' + sf + ';opacity:0.8"/>' +
      '<rect x="21.5" y="40" width="5" height="6" rx="1.5" style="' + sf + ';opacity:0.8"/>' +
      '<rect x="2" y="21.5" width="6" height="5" rx="1.5" style="' + sf + ';opacity:0.8"/>' +
      '<rect x="40" y="21.5" width="6" height="5" rx="1.5" style="' + sf + ';opacity:0.8"/>' +
      close,

    glitch:
      open +
      // Grid background lines
      '<line x1="24" y1="4" x2="24" y2="44" style="stroke-width:0.6;' + s + d + '"/>' +
      '<line x1="4" y1="24" x2="44" y2="24" style="stroke-width:0.6;' + s + d + '"/>' +
      // Source node
      '<circle cx="9" cy="9" r="4.5" style="' + sf + '"/>' +
      // Signal path (connected segments)
      '<line x1="13" y1="9" x2="24" y2="9" style="stroke-width:2;stroke-linecap:round;' + s + '"/>' +
      '<line x1="24" y1="9" x2="24" y2="20" style="stroke-width:2;stroke-linecap:round;' + s + '"/>' +
      // Glitch break (gap with cross marks)
      '<line x1="21" y1="22" x2="24" y2="20" style="stroke-width:1.2;' + s + '"/>' +
      '<line x1="27" y1="22" x2="24" y2="20" style="stroke-width:1.2;' + s + '"/>' +
      '<line x1="21" y1="26" x2="24" y2="28" style="stroke-width:1.2;' + s + '"/>' +
      '<line x1="27" y1="26" x2="24" y2="28" style="stroke-width:1.2;' + s + '"/>' +
      // Continue path
      '<line x1="24" y1="28" x2="24" y2="39" style="stroke-width:2;stroke-linecap:round;' + s + '"/>' +
      '<line x1="24" y1="39" x2="37" y2="39" style="stroke-width:2;stroke-linecap:round;' + s + '"/>' +
      // Target node (outline)
      '<circle cx="41" cy="39" r="4.5" style="stroke-width:1.6;' + s + '"/>' +
      '<circle cx="41" cy="39" r="2" style="' + sf + ';opacity:0.55"/>' +
      close,

    profile:
      open +
      '<circle cx="24" cy="15" r="9" style="stroke-width:1.5;' + s + '"/>' +
      '<circle cx="24" cy="15" r="3.5" style="' + sf + '"/>' +
      '<circle cx="24" cy="15" r="6.5" style="stroke-width:0.6;' + s + d + '"/>' +
      '<path d="M6,45 Q6,30 24,30 Q42,30 42,45" style="stroke-width:1.5;stroke-linecap:round;' + s + '"/>' +
      '<line x1="6" y1="45" x2="42" y2="45" style="stroke-width:0.7;' + s + d + '"/>' +
      close,

    premium:
      open +
      '<polyline points="5,37 5,20 15,30 24,7 33,30 43,20 43,37" style="stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;' + s + '"/>' +
      '<line x1="5" y1="37" x2="43" y2="37" style="stroke-width:1.8;stroke-linecap:round;' + s + '"/>' +
      '<line x1="5" y1="42" x2="43" y2="42" style="stroke-width:1;stroke-linecap:round;' + s + d + '"/>' +
      '<circle cx="24" cy="7" r="2.8" style="' + sf + '"/>' +
      '<circle cx="5" cy="20" r="2" style="' + sf + '"/>' +
      '<circle cx="43" cy="20" r="2" style="' + sf + '"/>' +
      close
  };

  return map[type] || '';
}

// ============================================================
// MOBILE HOME GRID
// ============================================================
function renderMobileHub() {
  if (!isMobile()) return;
  var panel = document.getElementById('main-content');
  if (!panel) return;

  _removeMobileSectionChrome();
  document.body.classList.remove('mob-in-section');
  if (typeof stopHubCanvas === 'function') stopHubCanvas();

  var xp     = (typeof state !== 'undefined' && state.xp)     || 0;
  var streak = (typeof state !== 'undefined' && state.streak)  || 0;
  var floorsComplete = 0;
  var totalDone = 0, totalSecs = 0;

  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f, fi) {
      f.sections.forEach(function(s) {
        totalSecs++;
        if (state && state.completed && state.completed[s.id]) totalDone++;
      });
      if (typeof isFloorComplete === 'function' && isFloorComplete(fi)) floorsComplete++;
    });
  }
  var overallPct = totalSecs > 0 ? Math.round(totalDone / totalSecs * 100) : 0;

  var fi = (state && state.currentFloor) ? state.currentFloor - 1 : 0;
  var currentFloor = (typeof FLOORS !== 'undefined' && FLOORS[fi]) ? FLOORS[fi] : null;
  var currentDone = 0, currentTotal = 0;
  if (currentFloor) {
    currentTotal = currentFloor.sections.length;
    currentFloor.sections.forEach(function(s) {
      if (state && state.completed && state.completed[s.id]) currentDone++;
    });
  }
  var learnColor = (currentFloor && currentFloor.color) ? currentFloor.color : '#c8a96e';
  var learnBtn = currentDone > 0 ? 'Continue to Floors' : 'Begin';
  var floorPct = currentTotal > 0 ? Math.round(currentDone / currentTotal * 100) : 0;

  var revDue = 0;
  if (typeof srsCounts === 'function') {
    var counts = srsCounts();
    revDue = (counts.due || 0) + (counts.fresh || 0);
  }
  var chalTs = parseInt(localStorage.getItem('codebook_challenge_ts') || '0');
  var chalDone = chalTs > 0 && (Date.now() - chalTs < 86400000);

  function _hexGlow(hex, a) {
    if (!hex || hex[0] !== '#') return 'rgba(200,169,110,' + (a || 0.28) + ')';
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (a || 0.28) + ')';
  }

  var glow = _hexGlow(learnColor, 0.35);
  var icon = (typeof getFloorIcon === 'function' && currentFloor) ? getFloorIcon(fi, 56) : '';

  var html = '<div class="mob-grid-wrap">';

  // Hero card
  html +=
    '<div class="mob-hero-card" style="--mg-color:' + learnColor + ';--mg-glow:' + glow + '" onclick="renderMobileFloorList()">' +
      '<div class="mob-hero-floor-label">FLOOR ' + (fi + 1) + '</div>' +
      '<div class="mob-hero-title">' + (currentFloor ? (typeof escHtml === 'function' ? escHtml(currentFloor.title) : currentFloor.title) : 'Start Learning') + '</div>' +
      '<div class="mob-hero-icon">' + icon + '</div>' +
      '<div class="mob-hero-count">' + currentDone + '/' + currentTotal + ' Sections Complete</div>' +
      '<div class="mob-hero-bar-wrap">' +
        '<div class="mob-hero-bar"><div class="mob-hero-bar-fill" style="width:' + floorPct + '%"></div></div>' +
        '<span class="mob-hero-pct">' + floorPct + '%</span>' +
      '</div>' +
      '<div class="mob-hero-slogan">Seven Floors. One Goal.</div>' +
      '<div class="mob-hero-slogan-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<button class="mob-hero-cta" style="background:' + learnColor + '">' + learnBtn + ' →</button>' +
    '</div>';

  // 2-col grid
  var tiles = [
    { color: '#f0a832', iconType: 'challenge', badge: 'CHALLENGES', title: 'Daily Challenges', hint: chalDone ? 'Done for today ✓' : 'New challenge ready', action: 'mobNavTo(\'challenge\')' },
    { color: '#64c8a0', iconType: 'revision',  badge: 'REVISION',   title: 'Revision Centre',  hint: revDue > 0 ? revDue + ' cards due' : 'All caught up',      action: 'mobNavTo(\'revision\')' },
    { color: '#7eb8c8', iconType: 'tools',     badge: 'TOOLS',      title: 'Tools',            hint: 'Speed round & more',                                       action: 'mobNavTo(\'tools\')' },
    { color: '#d46eb8', iconType: 'glitch',    badge: 'GLITCH',     title: 'Glitch Mode',      hint: 'Route the signal',                                         action: 'mobNavTo(\'glitch\')' },
    { color: '#8888ff', iconType: 'profile',   badge: 'PROFILE',    title: 'Profile',          hint: 'Stats, notes & badges',                                    action: 'mobNavTo(\'profile\')' },
    { color: '#e0c060', iconType: 'premium',   badge: 'PREMIUM',    title: 'Premium',          hint: 'Unlock everything',                                        action: 'mobNavTo(\'premium\')' },
  ];

  html += '<div class="mob-grid-cells">';
  tiles.forEach(function(t) {
    var tglow   = _hexGlow(t.color, 0.18);
    var tborder = _hexGlow(t.color, 0.30);
    var tbg     = _hexGlow(t.color, 0.08);
    html +=
      '<div class="mob-grid-tile" style="--mg-color:' + t.color + ';--mg-glow:' + tglow + ';--mg-border:' + tborder + ';--mg-bg:' + tbg + '" onclick="' + t.action + '">' +
        '<div class="mg-accent"></div>' +
        '<div class="mg-badge">' + t.badge + '</div>' +
        '<div class="mg-icon-lg">' + getMobNavIcon(t.iconType, 38) + '</div>' +
        '<div class="mg-title-lg">' + t.title + '</div>' +
        '<div class="mg-hint">' + t.hint + '</div>' +
      '</div>';
  });
  html += '</div>';

  html += '</div>';
  panel.innerHTML = html;
  panel.scrollTop = 0;
  var mainCol = document.getElementById('main-col');
  if (mainCol) mainCol.scrollTop = 0;
}

// ============================================================
// NAV HELPER — tap non-Learn tile
// ============================================================
function mobNavTo(tab) {
  if (typeof switchTopNav === 'function') {
    switchTopNav(tab, document.getElementById('tnav-' + tab));
  }

  function resetScroll() {
    var mainCol = document.getElementById('main-col');
    if (mainCol) mainCol.scrollTop = 0;
    var panel = document.getElementById('panel-' + tab);
    if (panel) panel.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // Reset immediately and again after render completes
  resetScroll();
  setTimeout(resetScroll, 60);
  setTimeout(resetScroll, 180);

  // Inject back-to-hub bar
  setTimeout(function() {
    if (document.getElementById('mob-panel-back')) return;
    var bar = document.createElement('div');
    bar.id = 'mob-panel-back';
    bar.className = 'mob-panel-back';
    bar.innerHTML = '<button class="mob-panel-back-btn" onclick="mobBackToHub()">&#8592; Home</button>';
    document.body.appendChild(bar);
  }, 60);

  // Init Glitch Mode game when its panel is shown
  if (tab === 'glitch') {
    setTimeout(function() {
      if (typeof GlitchGame !== 'undefined') GlitchGame.init('glitch-canvas');
    }, 120);
  }
}

function mobBackToHub() {
  var bar = document.getElementById('mob-panel-back');
  if (bar) bar.remove();
  if (typeof GlitchGame !== 'undefined') GlitchGame.destroy();
  if (typeof switchTopNav === 'function') {
    switchTopNav('learn', document.getElementById('tnav-learn'));
  }
  var mainCol = document.getElementById('main-col');
  if (mainCol) mainCol.scrollTop = 0;
  window.scrollTo(0, 0);
  renderMobileHub();
}

// ============================================================
// MOBILE FLOOR LIST (tapped from Learn tile)
// ============================================================
function renderMobileFloorList() {
  if (!isMobile()) return;
  var panel = document.getElementById('main-content');
  if (!panel) return;

  function _hexGlow(hex, a) {
    if (!hex || hex[0] !== '#') return 'rgba(200,169,110,' + (a || 0.28) + ')';
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (a || 0.28) + ')';
  }

  var html = '<div class="mob-fl-list">';

  // Sticky back bar
  html += '<div class="mob-fl-back-bar">' +
    '<button class="mob-fl-back-btn" onclick="renderMobileHub()">&#8592; Home</button>' +
    '<div class="mob-fl-back-title">Your Learning Path</div>' +
  '</div>';

  html +=
    '<div class="mob-fl-hero-hdr">' +
      '<div class="mob-hub-path-label">YOUR LEARNING PATH</div>' +
      '<div class="mob-hub-headline">Seven Floors.<br>One Goal.</div>' +
      '<div class="mob-hub-subline">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<div class="mob-hub-prog-row">' +
        '<div class="mob-hub-prog-bar"><div class="mob-hub-prog-fill" style="width:' + (function(){
          var td=0,ts=0;
          if(typeof FLOORS!=='undefined')FLOORS.forEach(function(f){f.sections.forEach(function(s){ts++;if(state&&state.completed&&state.completed[s.id])td++;});});
          return ts>0?Math.round(td/ts*100):0;
        })() + '%"></div></div>' +
        '<span class="mob-hub-prog-pct">' + (function(){
          var td=0,ts=0;
          if(typeof FLOORS!=='undefined')FLOORS.forEach(function(f){f.sections.forEach(function(s){ts++;if(state&&state.completed&&state.completed[s.id])td++;});});
          return ts>0?Math.round(td/ts*100):0;
        })() + '% complete</span>' +
      '</div>' +
    '</div>';

  // Floor cards
  if (typeof FLOORS !== 'undefined') {
    FLOORS.forEach(function(f, floorIdx) {
      var color = f.color || '#c8a96e';
      var glow  = _hexGlow(color, 0.24);
      var done  = typeof isFloorComplete === 'function' && isFloorComplete(floorIdx);
      var fi    = (state && state.currentFloor) ? state.currentFloor - 1 : 0;
      var isActive = !done && floorIdx === fi;

      var secDone  = 0;
      f.sections.forEach(function(s) {
        if (state && state.completed && state.completed[s.id]) secDone++;
      });
      var pct = Math.round(secDone / f.sections.length * 100);

      var statusText, statusCls;
      if (done)     { statusText = '&#10003; Complete'; statusCls = 'mob-fl-status-done';   }
      else if (isActive && secDone > 0) { statusText = 'In Progress'; statusCls = 'mob-fl-status-active'; }
      else          { statusText = 'Available';    statusCls = 'mob-fl-status-open';   }

      var btnText = done ? 'Review' : secDone > 0 ? 'Continue' : 'Start';
      var cardCls = 'mob-fl-card' + (isActive ? ' mob-fl-card-active' : '') + (done ? ' mob-fl-card-done' : '');

      var icon = (typeof getFloorIcon === 'function') ? getFloorIcon(floorIdx, 38) : '';

      html +=
        '<div class="' + cardCls + '" style="--fc-color:' + color + ';--fc-glow:' + glow + '">' +
          '<div class="mob-fl-accent"></div>' +
          '<div class="mob-fl-top">' +
            '<div class="mob-fl-left">' +
              '<div class="mob-fl-icon">' + icon + '</div>' +
              '<div class="mob-fl-meta">' +
                '<div class="mob-fl-badge-row">' +
                  '<span class="mob-fl-num">Floor ' + (floorIdx + 1) + '</span>' +
                  '<span class="mob-fl-status ' + statusCls + '">' + statusText + '</span>' +
                '</div>' +
                '<div class="mob-fl-title">' + (typeof escHtml === 'function' ? escHtml(f.title) : f.title) + '</div>' +
                (f.subtitle ? '<div class="mob-fl-sub">' + (typeof escHtml === 'function' ? escHtml(f.subtitle) : f.subtitle) + '</div>' : '') +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="mob-fl-prog-row">' +
            '<div class="mob-fl-bar"><div class="mob-fl-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<span class="mob-fl-pct">' + secDone + ' / ' + f.sections.length + ' sections</span>' +
          '</div>' +
          '<button class="mob-fl-btn" onclick="goToFloor(' + floorIdx + ')">' + btnText + ' &#8594;</button>' +
        '</div>';
    });
  }

  html += '</div>';
  panel.innerHTML = html;

  // Scroll to top
  panel.scrollTop = 0;
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
    '<button class="mob-section-back" onclick="mobGoToFloorList()">&#8592; Learn</button>' +
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
    '<button class="mob-nav-next" onclick="nextSection(' + fi + ',' + si + ')">' + (isLast ? 'Finish &#10003;' : '&#8594;') + '</button>';

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

// Back from section → floor list
function mobGoToFloorList() {
  closeSectionSheet();
  _removeMobileSectionChrome();
  document.body.classList.remove('mob-in-section');
  if (typeof stopNarration === 'function') stopNarration();
  renderMobileFloorList();
}

// Back from anywhere → home grid
function mobGoToHub() {
  closeSectionSheet();
  _removeMobileSectionChrome();
  document.body.classList.remove('mob-in-section');
  if (typeof stopNarration === 'function') stopNarration();
  if (typeof stopHubCanvas === 'function') stopHubCanvas();
  renderMobileHub();
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
