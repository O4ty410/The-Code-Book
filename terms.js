// terms.js — Key term tooltips

var _termMap = null;
function getTermMap() {
  if (_termMap) return _termMap;
  _termMap = {};
  if (typeof REVISION_CARDS !== 'undefined') {
    REVISION_CARDS.forEach(function(c) {
      _termMap[c.term.toLowerCase()] = c.def;
    });
  }
  return _termMap;
}

function _ensureTooltip() {
  var t = document.getElementById('kt-tooltip');
  if (t) return t;
  t = document.createElement('div');
  t.id = 'kt-tooltip';
  t.setAttribute('role', 'tooltip');
  document.body.appendChild(t);
  document.addEventListener('mouseover', function(e) {
    var el = e.target.closest ? e.target.closest('.kt-hl') : null;
    if (!el) return;
    var def = getTermMap()[el.dataset.kt] || '';
    if (!def) return;
    t.textContent = def;
    t.classList.add('kt-visible');
    var r = el.getBoundingClientRect();
    var top = r.top - t.offsetHeight - 8;
    if (top < 6) top = r.bottom + 8;
    var left = r.left + r.width / 2 - t.offsetWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - t.offsetWidth - 8));
    t.style.left = left + 'px';
    t.style.top = top + 'px';
  });
  document.addEventListener('mouseout', function(e) {
    var el = e.target.closest ? e.target.closest('.kt-hl') : null;
    if (!el) return;
    t.classList.remove('kt-visible');
  });
  document.addEventListener('touchstart', function(e) {
    var el = e.target.closest ? e.target.closest('.kt-hl') : null;
    if (!el) { t.classList.remove('kt-visible'); return; }
    var def = getTermMap()[el.dataset.kt] || '';
    if (!def) return;
    e.preventDefault();
    t.textContent = def;
    t.classList.add('kt-visible');
    var r = el.getBoundingClientRect();
    var top = r.top - t.offsetHeight - 8;
    if (top < 6) top = r.bottom + 8;
    var left = r.left + r.width / 2 - t.offsetWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - t.offsetWidth - 8));
    t.style.left = left + 'px';
    t.style.top = top + 'px';
  }, { passive: false });
  return t;
}

function highlightKeyTerms(containerEl) {
  _ensureTooltip();
  var map = getTermMap();
  var terms = Object.keys(map);
  if (!terms.length) return;
  // Sort longest first to avoid partial matches (e.g. "variable" before "var")
  terms.sort(function(a, b) { return b.length - a.length; });
  // Build a single regex alternation, escaped
  var escaped = terms.map(function(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  var re = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');
  var skip = { CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, BUTTON: 1, TEXTAREA: 1, A: 1, KT: 1 };
  function walk(node) {
    if (node.nodeType === 1) {
      if (skip[node.tagName]) return;
      if (node.classList && node.classList.contains('kt-hl')) return;
      Array.from(node.childNodes).forEach(walk);
    } else if (node.nodeType === 3) {
      var txt = node.nodeValue;
      if (!re.test(txt)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment();
      var last = 0, m;
      re.lastIndex = 0;
      while ((m = re.exec(txt)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = 'kt-hl';
        span.dataset.kt = m[0].toLowerCase();
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      if (node.parentNode) node.parentNode.replaceChild(frag, node);
    }
  }
  walk(containerEl);
}
