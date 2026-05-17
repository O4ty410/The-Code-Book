let isLoggedIn = false;
let isGuest = false;
let currentFloor = 1;

let sageIdleTimer = null;

// Shared AudioContext \u2014 created once on first use to avoid browser limits
let _sharedAudioCtx = null;
function getAudioContext() {
  if (!_sharedAudioCtx) {
    _sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (_sharedAudioCtx.state === 'suspended') {
    _sharedAudioCtx.resume();
  }
  return _sharedAudioCtx;
}

var _sageOwlId = 0;
function sageOwlSVG(w, h) {
  var id = ++_sageOwlId;
  w = w || 60; h = h || 66;
  var B = 'M22,22 L14,4 L30,17 Q50,11 70,17 L86,4 L78,22 Q92,36 90,57 Q86,78 50,88 Q14,78 10,57 Q8,36 22,22 Z';
  return (
    '<svg viewBox="0 0 100 110" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">' +
    '<defs>' +
      '<radialGradient id="sob' + id + '" cx="44" cy="34" r="62" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0%" stop-color="#22eeff"/>' +
        '<stop offset="38%" stop-color="#0070cc"/>' +
        '<stop offset="72%" stop-color="#002c68"/>' +
        '<stop offset="100%" stop-color="#000d22"/>' +
      '</radialGradient>' +
      '<filter id="sgf' + id + '" x="-25%" y="-25%" width="150%" height="150%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<filter id="sef' + id + '" x="-80%" y="-80%" width="260%" height="260%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
    '</defs>' +
    '<path d="' + B + '" fill="url(#sob' + id + ')"/>' +
    '<path d="' + B + '" fill="rgba(160,60,255,0.09)"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,210,255,0.65)" stroke-width="2.5" filter="url(#sgf' + id + ')"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,220,255,0.5)" stroke-width="1"/>' +
    '<ellipse cx="50" cy="47" rx="24" ry="22" fill="rgba(0,10,36,0.52)" stroke="rgba(0,150,255,0.15)" stroke-width="0.8"/>' +
    '<circle cx="36" cy="43" r="11" fill="#000800"/>' +
    '<g filter="url(#sef' + id + ')">' +
      '<circle cx="36" cy="43" r="11" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="36" cy="43" r="7.5" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="36" cy="43" r="4.2" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="36" cy="43" r="2" fill="#000800"/>' +
    '<circle cx="38.5" cy="40.5" r="1.3" fill="rgba(255,255,255,0.88)"/>' +
    '<circle cx="64" cy="43" r="11" fill="#000800"/>' +
    '<g filter="url(#sef' + id + ')">' +
      '<circle cx="64" cy="43" r="11" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="64" cy="43" r="7.5" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="64" cy="43" r="4.2" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="64" cy="43" r="2" fill="#000800"/>' +
    '<circle cx="66.5" cy="40.5" r="1.3" fill="rgba(255,255,255,0.88)"/>' +
    '<polygon points="50,55 44,63 56,63" fill="#cce6f4" stroke="rgba(0,130,200,0.3)" stroke-width="0.5"/>' +
    '<line x1="50" y1="68" x2="50" y2="84" stroke="#00ff88" stroke-width="1.2" stroke-opacity="0.72"/>' +
    '<line x1="50" y1="72" x2="38" y2="72" stroke="#00ff88" stroke-width="1" stroke-opacity="0.62"/>' +
    '<line x1="38" y1="72" x2="33" y2="77" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="72" x2="62" y2="72" stroke="#00ff88" stroke-width="1" stroke-opacity="0.62"/>' +
    '<line x1="62" y1="72" x2="67" y2="77" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="79" x2="41" y2="79" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="79" x2="59" y2="79" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<circle cx="50" cy="72" r="2" fill="#00ff88" fill-opacity="0.85"/>' +
    '<circle cx="38" cy="72" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '<circle cx="62" cy="72" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '<circle cx="50" cy="79" r="2" fill="#00ff88" fill-opacity="0.85"/>' +
    '<circle cx="41" cy="79" r="1.2" fill="#00ff88" fill-opacity="0.62"/>' +
    '<circle cx="59" cy="79" r="1.2" fill="#00ff88" fill-opacity="0.62"/>' +
    '<circle cx="50" cy="84" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '</svg>'
  );
}

var sectionGateState = {};
var matchSelected = {};

function matchClick(mid, side, idx) {
  if (side === 'left') {
    var el = document.getElementById('match-l-' + mid + '-' + idx);
    if (!el || el.classList.contains('correct')) return;
    document.querySelectorAll('#' + mid + ' .match-left-item').forEach(function(e) {
      if (!e.classList.contains('correct')) e.classList.remove('selected');
    });
    matchSelected[mid] = (matchSelected[mid] === idx) ? null : idx;
    if (matchSelected[mid] !== null) el.classList.add('selected');
  } else {
    var leftIdx = matchSelected[mid];
    if (leftIdx === null || leftIdx === undefined) return;
    var rightEl = document.getElementById('match-r-' + mid + '-' + idx);
    if (!rightEl || rightEl.classList.contains('correct')) return;
    var pairIdx = parseInt(rightEl.getAttribute('data-pair'));
    if (pairIdx === leftIdx) {
      var leftEl = document.getElementById('match-l-' + mid + '-' + leftIdx);
      if (leftEl) { leftEl.classList.remove('selected'); leftEl.classList.add('correct'); }
      rightEl.classList.add('correct');
      matchSelected[mid] = null;
      var remaining = document.querySelectorAll('#' + mid + ' .match-left-item:not(.correct)');
      if (remaining.length === 0) {
        var done = document.getElementById('match-done-' + mid);
        if (done) done.style.display = 'block';
        awardXP(15, 'match-' + mid, window.innerWidth / 2, 300);
      }
    } else {
      rightEl.classList.add('wrong');
      setTimeout(function() {
        rightEl.classList.remove('wrong');
        document.querySelectorAll('#' + mid + ' .match-left-item').forEach(function(e) {
          if (!e.classList.contains('correct')) e.classList.remove('selected');
        });
        matchSelected[mid] = null;
      }, 600);
    }
  }
}
// ── SAGE API CONFIG ────────────────────────────────────────────────────────
// To enable live AI responses, set your Anthropic API key here.
// Leave as null to use built-in contextual guidance instead.
const SAGE_API_KEY = null;
const SAGE_TOTAL_USES = 10;

let state = {
  currentFloor: 1,
  currentSection: 0,
  completed: {},
  quizAnswered: {},
  quizMultiState: {},
  totalSeconds: 0,
  sessionLog: [],
  xp: 0,
  streak: 0,
  lastVisit: null,
  xpAwarded: {},
  timerRunning: false,
  timerSeconds: 25 * 60,
  timerInterval: null,
  sessionSeconds: 0,
  sectionStartTime: null,
  sageUsesLeft: SAGE_TOTAL_USES,
  challengesDone: {},
  streakProtectedToday: false,
  revKnown: {}
};
state.playerName = localStorage.getItem("codebook_player_name") || null;

function loadState() {
  try {
    const saved = localStorage.getItem('codebook_v1');
    if (saved) {
      const s = JSON.parse(saved);
      state.currentFloor = s.currentFloor || 1;
      state.currentSection = parseInt(s.currentSection) || 0;
      state.completed = s.completed || {};
      state.quizAnswered = s.quizAnswered || {};
      state.quizMultiState = s.quizMultiState || {};
      state.totalSeconds = s.totalSeconds || 0;
      state.sessionLog = s.sessionLog || [];
      state.xp = s.xp || 0;
      state.streak = s.streak || 0;
      state.lastVisit = s.lastVisit || null;
      state.xpAwarded = s.xpAwarded || {};
      state.checklistDone = s.checklistDone || {};
      state.sageUsesLeft = (s.sageUsesLeft !== undefined) ? s.sageUsesLeft : SAGE_TOTAL_USES;
      state.challengesDone = s.challengesDone || {};
      state.streakProtectedToday = s.streakProtectedToday || false;
      state.revKnown = s.revKnown || {};
    }
  }  catch(e) {}
}

function pruneCodeCache() {
  // Remove saved code for sections already marked complete to free storage space
  Object.keys(localStorage)
    .filter(function(k) { return k.startsWith('code_'); })
    .forEach(function(k) {
      var sid = k.slice(5);
      if (state.completed && state.completed[sid]) localStorage.removeItem(k);
    });
}

function saveState() {
  var payload = JSON.stringify({
    currentFloor: state.currentFloor,
    currentSection: state.currentSection,
    completed: state.completed,
    quizAnswered: state.quizAnswered,
    quizMultiState: state.quizMultiState || {},
    totalSeconds: state.totalSeconds,
    sessionLog: state.sessionLog,
    xp: state.xp,
    streak: state.streak,
    lastVisit: state.lastVisit,
    xpAwarded: state.xpAwarded,
    checklistDone: state.checklistDone || {},
    sageUsesLeft: state.sageUsesLeft,
    challengesDone: state.challengesDone || {},
    streakProtectedToday: state.streakProtectedToday || false,
    revKnown: state.revKnown || {}
  });
  try {
    localStorage.setItem('codebook_v1', payload);
  } catch(e) {
    // Quota exceeded — prune completed-section code caches and retry once
    pruneCodeCache();
    try { localStorage.setItem('codebook_v1', payload); } catch(e2) {}
  }
}



let currentUser = null;
let authMode = 'login';

function togglePasswordVisibility(inputId, btn) {
  var input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '\uD83D\uDE48'; // \uD83D\uDE48
    btn.title = 'Hide password';
  } else {
    input.type = 'password';
    btn.textContent = '\uD83D\uDC41'; // \uD83D\uDC41
    btn.title = 'Show password';
  }
}

// ── Landing canvas: twinkling code background ──────────────────────────────

var _landingRAF = null;

function startLandingCanvas() {
  var canvas = document.getElementById('landing-canvas');
  if (!canvas) return;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  canvas._lcResize = resize;
  window.addEventListener('resize', resize);

  // [x_frac, y_frac, text]
  var lines = [
    [0.01, 0.04, 'function fetchData(url) {'],
    [0.01, 0.07, '  return fetch(url)'],
    [0.01, 0.09, '    .then(r => r.json())'],
    [0.01, 0.11, '    .catch(err => null);'],
    [0.01, 0.13, '}'],
    [0.01, 0.22, 'const state = { user: null, xp: 0 };'],
    [0.01, 0.25, 'localStorage.setItem(key,'],
    [0.01, 0.27, '  JSON.stringify(state));'],
    [0.01, 0.35, 'try {'],
    [0.01, 0.37, '  const v = JSON.parse(raw);'],
    [0.01, 0.39, '  setState(v);'],
    [0.01, 0.41, '} catch(e) { return false; }'],
    [0.01, 0.50, 'for (let i = 0; i < n; i++) {'],
    [0.01, 0.52, '  if (arr[i] > max) max = arr[i];'],
    [0.01, 0.54, '}'],
    [0.01, 0.63, 'const lerp = (a, b, t) =>'],
    [0.01, 0.65, '  a + (b - a) * Math.max(0,'],
    [0.01, 0.67, '    Math.min(1, t));'],
    [0.01, 0.76, 'return false;'],
    [0.01, 0.80, 'export { lerp, clamp, round };'],
    [0.01, 0.87, 'returnValue = setStateValue(key, v);'],
    [0.72, 0.03, 'const main = async () => {'],
    [0.72, 0.05, '  const n = parseInt(input);'],
    [0.72, 0.07, '  for (let i=2; i<=n; i++) {'],
    [0.72, 0.09, '    fib[i] = fib[i-1]+fib[i-2];'],
    [0.72, 0.11, '  }'],
    [0.72, 0.13, '  return fib[n];'],
    [0.72, 0.15, '};'],
    [0.72, 0.24, 'SELECT id, username, email,'],
    [0.72, 0.26, '       created_at'],
    [0.72, 0.28, 'FROM users'],
    [0.72, 0.30, 'WHERE active = 1'],
    [0.72, 0.32, 'ORDER BY created_at DESC'],
    [0.72, 0.34, 'LIMIT 50;'],
    [0.72, 0.43, 'const cloneDeep = (obj) => {'],
    [0.72, 0.45, '  if (typeof obj !== "object")'],
    [0.72, 0.47, '    return obj;'],
    [0.72, 0.49, '  return JSON.parse('],
    [0.72, 0.51, '    JSON.stringify(obj)'],
    [0.72, 0.53, '  );'],
    [0.72, 0.55, '};'],
    [0.72, 0.64, 'function quickSort(arr) {'],
    [0.72, 0.66, '  if (!arr.length) return arr;'],
    [0.72, 0.68, '  const pivot = arr[Math.floor('],
    [0.72, 0.70, '    arr.length / 2)];'],
    [0.72, 0.72, '  const left  = arr.filter(x => x < pivot);'],
    [0.72, 0.74, '  const right = arr.filter(x => x > pivot);'],
    [0.72, 0.76, '  return [...quickSort(left),'],
    [0.72, 0.78, '    pivot, ...quickSort(right)];'],
    [0.72, 0.80, '}'],
  ];

  var ls = lines.map(function() {
    return {
      phase:     Math.random() * Math.PI * 2,
      speed:     0.25 + Math.random() * 0.9,
      baseAlpha: 0.16 + Math.random() * 0.12,
      spark:     0,
      sparkDecay: 1.2 + Math.random() * 1.4,
      sparkColor: Math.random() > 0.5 ? 0 : 1, // 0=cyan, 1=green
    };
  });

  // Schedule random spark events
  function spark() {
    var idx = Math.floor(Math.random() * ls.length);
    ls[idx].spark = 0.65 + Math.random() * 0.35;
    canvas._lcSpark = setTimeout(spark, 60 + Math.random() * 200);
  }
  spark();

  var t0 = performance.now() / 1000;
  var lastT = t0;

  function draw() {
    var now = performance.now() / 1000;
    var dt  = Math.min(0.05, now - lastT);
    lastT   = now;
    var t   = now - t0;
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');

    // Background gradient
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   '#000a18');
    bg.addColorStop(0.5, '#000d22');
    bg.addColorStop(1,   '#000814');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.font = '11px "IBM Plex Mono",Consolas,monospace';
    ctx.textBaseline = 'top';

    lines.forEach(function(line, i) {
      var s = ls[i];
      var twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
      var a = s.baseAlpha * (0.35 + 0.65 * twinkle);

      if (s.spark > 0) {
        s.spark = Math.max(0, s.spark - dt * s.sparkDecay);
      }

      var glowing = s.spark > 0.05;
      var fa = Math.min(0.95, a + s.spark * 0.75);

      ctx.save();
      if (glowing) {
        ctx.shadowColor = s.sparkColor === 0
          ? 'rgba(0,230,255,' + (s.spark * 0.95).toFixed(2) + ')'
          : 'rgba(0,255,160,' + (s.spark * 0.95).toFixed(2) + ')';
        ctx.shadowBlur = 12 + s.spark * 24;
      } else {
        ctx.shadowColor = 'rgba(80,200,195,0.35)';
        ctx.shadowBlur = 4;
      }
      ctx.fillStyle = 'rgba(80,200,195,' + fa.toFixed(3) + ')';
      ctx.fillText(line[2], line[0] * W, line[1] * H);
      ctx.restore();
    });

    _landingRAF = requestAnimationFrame(draw);
  }

  draw();
}

function stopLandingCanvas() {
  if (_landingRAF) { cancelAnimationFrame(_landingRAF); _landingRAF = null; }
  var canvas = document.getElementById('landing-canvas');
  if (canvas) {
    if (canvas._lcResize) { window.removeEventListener('resize', canvas._lcResize); canvas._lcResize = null; }
    if (canvas._lcSpark)  { clearTimeout(canvas._lcSpark); canvas._lcSpark = null; }
  }
}

// ── Hub canvas: twinkling code background (theme-coloured) ─────────────────

var _hubRAF = null;

function getHubThemeRGB() {
  var id = getProfTheme();
  var map = {
    'cosmic-blue':   [0, 180, 255],
    'aurora-teal':   [0, 220, 160],
    'royal-violet':  [168, 85, 247],
    'ember-crimson': [255, 80, 80],
    'obsidian-gold': [200, 169, 110],
  };
  return map[id] || [0, 180, 255];
}

function startHubCanvas() {
  stopHubCanvas();
  var canvas = document.getElementById('hub-canvas');
  if (!canvas) return;

  var rgb = getHubThemeRGB();
  var cr = rgb[0], cg = rgb[1], cb = rgb[2];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  canvas._hcResize = resize;
  window.addEventListener('resize', resize);

  var lines = [
    // Left column
    [0.01, 0.02, 'import { useState, useEffect } from "react";'],
    [0.01, 0.04, 'function fetchData(url) {'],
    [0.01, 0.06, '  return fetch(url)'],
    [0.01, 0.08, '    .then(r => r.json())'],
    [0.01, 0.10, '    .catch(err => null);'],
    [0.01, 0.12, '}'],
    [0.01, 0.18, 'const state = { user: null, xp: 0 };'],
    [0.01, 0.20, 'localStorage.setItem(key,'],
    [0.01, 0.22, '  JSON.stringify(state));'],
    [0.01, 0.28, 'try {'],
    [0.01, 0.30, '  const v = JSON.parse(raw);'],
    [0.01, 0.32, '  setState(v);'],
    [0.01, 0.34, '} catch(e) { return false; }'],
    [0.01, 0.40, 'for (let i = 0; i < n; i++) {'],
    [0.01, 0.42, '  if (arr[i] > max) max = arr[i];'],
    [0.01, 0.44, '}'],
    [0.01, 0.50, 'const lerp = (a, b, t) =>'],
    [0.01, 0.52, '  a + (b - a) * Math.max(0,'],
    [0.01, 0.54, '    Math.min(1, t));'],
    [0.01, 0.60, 'return false;'],
    [0.01, 0.63, 'export { lerp, clamp, round };'],
    [0.01, 0.70, 'const debounce = (fn, ms) => {'],
    [0.01, 0.72, '  let timer;'],
    [0.01, 0.74, '  return (...args) => {'],
    [0.01, 0.76, '    clearTimeout(timer);'],
    [0.01, 0.78, '    timer = setTimeout(fn, ms);'],
    [0.01, 0.80, '  };'],
    [0.01, 0.82, '};'],
    [0.01, 0.88, 'returnValue = setStateValue(key, v);'],
    [0.01, 0.91, 'class EventEmitter {'],
    [0.01, 0.93, '  on(e, fn) { (this._m[e] ||= []).push(fn); }'],
    [0.01, 0.95, '}'],
    // Centre column
    [0.37, 0.05, 'type User = {'],
    [0.37, 0.07, '  id: number;'],
    [0.37, 0.09, '  name: string;'],
    [0.37, 0.11, '  role: "admin" | "user";'],
    [0.37, 0.13, '};'],
    [0.37, 0.20, 'async function getUser(id) {'],
    [0.37, 0.22, '  const res = await fetch('],
    [0.37, 0.24, '    `/api/users/${id}`'],
    [0.37, 0.26, '  );'],
    [0.37, 0.28, '  return res.json();'],
    [0.37, 0.30, '}'],
    [0.37, 0.37, 'const [count, setCount]'],
    [0.37, 0.39, '  = useState(0);'],
    [0.37, 0.41, 'useEffect(() => {'],
    [0.37, 0.43, '  document.title = count;'],
    [0.37, 0.45, '}, [count]);'],
    [0.37, 0.52, 'function memoize(fn) {'],
    [0.37, 0.54, '  const cache = new Map();'],
    [0.37, 0.56, '  return function(...a) {'],
    [0.37, 0.58, '    const k = JSON.stringify(a);'],
    [0.37, 0.60, '    if (cache.has(k)) return cache.get(k);'],
    [0.37, 0.62, '    const r = fn(...a);'],
    [0.37, 0.64, '    cache.set(k, r); return r;'],
    [0.37, 0.66, '  };'],
    [0.37, 0.68, '}'],
    [0.37, 0.75, 'const pipe = (...fns) =>'],
    [0.37, 0.77, '  x => fns.reduce('],
    [0.37, 0.79, '    (v, f) => f(v), x'],
    [0.37, 0.81, '  );'],
    [0.37, 0.88, 'module.exports = { pipe };'],
    // Right column
    [0.73, 0.02, 'const main = async () => {'],
    [0.73, 0.04, '  const n = parseInt(input);'],
    [0.73, 0.06, '  for (let i=2; i<=n; i++) {'],
    [0.73, 0.08, '    fib[i] = fib[i-1]+fib[i-2];'],
    [0.73, 0.10, '  }'],
    [0.73, 0.12, '  return fib[n];'],
    [0.73, 0.14, '};'],
    [0.73, 0.21, 'SELECT id, username, email,'],
    [0.73, 0.23, '       created_at'],
    [0.73, 0.25, 'FROM users'],
    [0.73, 0.27, 'WHERE active = 1'],
    [0.73, 0.29, 'ORDER BY created_at DESC'],
    [0.73, 0.31, 'LIMIT 50;'],
    [0.73, 0.38, 'const cloneDeep = (obj) => {'],
    [0.73, 0.40, '  if (typeof obj !== "object")'],
    [0.73, 0.42, '    return obj;'],
    [0.73, 0.44, '  return JSON.parse('],
    [0.73, 0.46, '    JSON.stringify(obj)'],
    [0.73, 0.48, '  );'],
    [0.73, 0.50, '};'],
    [0.73, 0.57, 'function quickSort(arr) {'],
    [0.73, 0.59, '  if (!arr.length) return arr;'],
    [0.73, 0.61, '  const pivot = arr[Math.floor('],
    [0.73, 0.63, '    arr.length / 2)];'],
    [0.73, 0.65, '  const left  = arr.filter('],
    [0.73, 0.67, '    x => x < pivot);'],
    [0.73, 0.69, '  const right = arr.filter('],
    [0.73, 0.71, '    x => x > pivot);'],
    [0.73, 0.73, '  return [...quickSort(left),'],
    [0.73, 0.75, '    pivot, ...quickSort(right)];'],
    [0.73, 0.77, '}'],
    [0.73, 0.84, 'git commit -m "feat: add hub canvas"'],
    [0.73, 0.87, 'git push origin main'],
    [0.73, 0.91, 'npm run build && npm test'],
    [0.73, 0.94, 'docker compose up --build'],
  ];

  var ls = lines.map(function() {
    return {
      phase:      Math.random() * Math.PI * 2,
      speed:      0.25 + Math.random() * 0.9,
      baseAlpha:  0.18 + Math.random() * 0.12,
      spark:      0,
      sparkDecay: 1.2 + Math.random() * 1.4,
    };
  });

  function scheduleSpark() {
    var idx = Math.floor(Math.random() * ls.length);
    ls[idx].spark = 0.65 + Math.random() * 0.35;
    canvas._hcSpark = setTimeout(scheduleSpark, 60 + Math.random() * 220);
  }
  scheduleSpark();

  var t0 = performance.now() / 1000;
  var lastT = t0;

  function draw() {
    var now = performance.now() / 1000;
    var dt  = Math.min(0.05, now - lastT);
    lastT   = now;
    var t   = now - t0;
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, W, H);
    ctx.font = '11px "IBM Plex Mono",Consolas,monospace';
    ctx.textBaseline = 'top';

    lines.forEach(function(line, i) {
      var s = ls[i];
      var twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
      var a = s.baseAlpha * (0.35 + 0.65 * twinkle);
      if (s.spark > 0) s.spark = Math.max(0, s.spark - dt * s.sparkDecay);
      var glowing = s.spark > 0.05;
      var fa = Math.min(0.95, a + s.spark * 0.6);

      ctx.save();
      if (glowing) {
        ctx.shadowColor = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (s.spark * 0.9).toFixed(2) + ')';
        ctx.shadowBlur  = 12 + s.spark * 20;
      } else {
        ctx.shadowColor = 'rgba(' + cr + ',' + cg + ',' + cb + ',0.20)';
        ctx.shadowBlur  = 3;
      }
      ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + fa.toFixed(3) + ')';
      ctx.fillText(line[2], line[0] * W, line[1] * H);
      ctx.restore();
    });

    _hubRAF = requestAnimationFrame(draw);
  }

  draw();
}

function stopHubCanvas() {
  if (_hubRAF) { cancelAnimationFrame(_hubRAF); _hubRAF = null; }
  var canvas = document.getElementById('hub-canvas');
  if (canvas) {
    if (canvas._hcResize) { window.removeEventListener('resize', canvas._hcResize); canvas._hcResize = null; }
    if (canvas._hcSpark)  { clearTimeout(canvas._hcSpark); canvas._hcSpark = null; }
  }
}

function showAuthFromLanding() {
  // Check if user has already started \u2014 skip auth and go straight in
  const sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  const completedCount = Object.keys(state.completed).filter(function(k) {
    return sectionIds.has(k) && state.completed[k];
  }).length;
  const hasStarted = completedCount > 0 || state.currentSection > 0 || state.currentFloor > 1 || state.xp > 0;
  if (hasStarted) {
    // Returning user — go straight into the app
    loadState();
    updateStreak();
    stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('app').style.display = 'block';
    applyTheme();
    launchApp();
  } else {
    // New user — show onboarding or auth
    stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
    const hasOnboarded = localStorage.getItem('codebook_onboarded');
    if (!hasOnboarded) {
      showOnboarding();
    } else {
      document.getElementById('auth-screen').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
}
function switchTab(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (mode === 'login' && i === 0) || (mode === 'signup' && i === 1));
  });
  document.getElementById('auth-submit').textContent = mode === 'login' ? 'Sign In' : 'Create Account';
  document.getElementById('auth-message').textContent = '';
  const usernameField = document.getElementById('auth-username');
  if (usernameField) usernameField.style.display = mode === 'signup' ? 'block' : 'none';
  const forgotLink = document.getElementById('forgot-link');
  if (forgotLink) forgotLink.style.display = mode === 'signup' ? 'none' : 'block';
}

async function showLeaderboard() {
  const overlay = document.getElementById('leaderboard-overlay');
  overlay.style.display = 'flex';
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Leaderboard unavailable.</div>';
  try {
    const rows = null;
    if (!rows || rows.length === 0) {
      list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">No entries yet. Be the first!</div>';
      return;
    }
    const medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
    list.innerHTML = rows.map((r, i) => `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--surface);border:1px solid ${i === 0 ? '#c8a96e' : i === 1 ? '#aaaaaa' : i === 2 ? '#cd7f32' : 'var(--border)'};border-radius:10px;${i === 0 ? 'box-shadow:0 0 20px rgba(200,169,110,0.15);' : ''}">
        <div style="font-size:${i < 3 ? '24px' : '14px'};width:36px;text-align:center;font-family:'IBM Plex Mono',monospace;color:var(--text-muted);">${medals[i] || '' + (i+1) + ''}</div>
        <div style="flex:1;">
          <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:15px;">${r.username || 'Anonymous'}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--floor3);">\uD83D\uDD25 ${r.streak || 0} day streak</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:18px;color:var(--accent);font-weight:700;">${r.xp || 0}</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:1px;">XP</div>
        </div>
      </div>
    `).join('');
  } catch(e) {
    list.innerHTML = '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--text-muted);text-align:center;padding:40px 0;">Could not load leaderboard.</div>';
  }
}

function hideLeaderboard() {
  document.getElementById('leaderboard-overlay').style.display = 'none';
}

function showResetForm(token) {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'none';
  const overlay = document.getElementById('reset-overlay');
  overlay.style.display = 'flex';
  overlay.dataset.token = token;
}

async function submitNewPassword() {
  const password = document.getElementById('reset-password').value;
  const confirm = document.getElementById('reset-password-confirm').value;
  const msg = document.getElementById('reset-message');
  const token = document.getElementById('reset-overlay').dataset.token;

  if (!password || password.length < 6) {
    msg.textContent = 'Password must be at least 6 characters.';
    msg.className = 'auth-message error';
    return;
  }
  if (password !== confirm) {
    msg.textContent = 'Passwords do not match.';
    msg.className = 'auth-message error';
    return;
  }

  msg.textContent = 'Updating password...';
  msg.className = 'auth-message';

  try {
    msg.textContent = 'Password reset is not available.';
    msg.className = 'auth-message error';
  } catch(e) {
    msg.textContent = 'Something went wrong. Please try again.';
    msg.className = 'auth-message error';
  }
}

function populateDashboard() {
  // Apply saved profile colour theme to body on startup
  applyProfThemeToBody(getProfTheme());
  // Apply saved cover screen theme (independent from app theme)
  applyCoverTheme(getCoverTheme());

  // Show the landing overlay and start animated canvas
  var landing = document.getElementById('new-user-landing');
  if (landing) {
    landing.style.display = 'block';
    landing.style.position = 'fixed';
    landing.style.top = '0';
    landing.style.left = '0';
    landing.style.width = '100vw';
    landing.style.height = '100vh';
    landing.style.zIndex = '99999';
    landing.style.background = 'transparent';
    startLandingCanvas();
  }
  var cover = document.getElementById('cover');
  if (cover) cover.style.display = 'none';
}

function trackDailySection() {
  const today = new Date().toDateString();
  const todayKey = 'daily_sections_' + (today) + '';
  const current = parseInt(localStorage.getItem(todayKey) || '0');
  const newCount = current + 1;
  localStorage.setItem(todayKey, newCount);

  const dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
  if (newCount === dailyGoal) {
    setTimeout(() => showSessionComplete(newCount), 1200);
  }
}

let sessionXpStart = 0;

function showSessionComplete(sectionsToday) {
  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const fi = state.currentFloor - 1;
  const si = state.currentSection;
  const floor = FLOORS[fi];
  const nextSi = si + 1;
  const nextSection = floor?.sections[nextSi];
  const nextFloor = FLOORS[fi + 1];

  let tomorrowText = '';
  if (nextSection) tomorrowText = nextSection.title;
  else if (nextFloor) tomorrowText = 'Start of ' + (nextFloor.title) + '';
  else tomorrowText = 'You\'ve completed the entire curriculum!';

  const greetings = [
    "That's a session, " + (name || "friend") + ".",
    "Well done today" + (name ? ", " + name : "") + ".",
    "Another day done" + (name ? ", " + name : "") + ".",
    "Consistent" + (name ? ", " + name : "") + ". That's everything."
  ];

  const xpToday = state.xp - (sessionXpStart || 0);

  document.getElementById('session-title').textContent = greetings[Math.floor(Math.random() * greetings.length)];
  document.getElementById('session-message').textContent = 'Your daily goal is done. Come back tomorrow and keep the momentum going.';
  document.getElementById('session-xp-earned').textContent = '+' + (Math.max(0, xpToday)) + '';
  document.getElementById('session-streak').textContent = '' + (state.streak) + '\uD83D\uDD25';
  document.getElementById('session-sections').textContent = sectionsToday;
  document.getElementById('session-tomorrow').textContent = tomorrowText;
  document.getElementById('session-complete').style.display = 'flex';
}

function closeSessionComplete(done) {
  document.getElementById('session-complete').style.display = 'none';
  if (done) {
    document.getElementById('app').style.display = 'none';
    document.getElementById('cover').style.display = 'flex';
    populateDashboard();
  }
}

function showPrivacy() {
  document.getElementById('privacy-overlay').style.display = 'flex';
}

function hidePrivacy() {
  document.getElementById('privacy-overlay').style.display = 'none';
}

async function handleForgotPassword() {
  const email = document.getElementById('auth-email').value.trim();
  const msg = document.getElementById('auth-message');
  if (!email) {
    msg.textContent = 'Enter your email address first, then tap Forgot your password.';
    msg.className = 'auth-message error';
    return;
  }
  msg.textContent = 'Password reset is not available.';
  msg.className = 'auth-message error';
}

function continueAsGuest() {
  loadState();
  updateStreak();
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('cover').style.display = 'flex';
  const coverUser = document.getElementById('cover-user');
  if (coverUser) coverUser.style.display = 'none';
  populateDashboard();
}

async function handleAuth() {
  loadState();
  updateStreak();
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

async function onUserLoggedIn() {
  loadState();
  updateStreak();
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  stopLandingCanvas(); document.getElementById('new-user-landing').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

async function saveToSupabase() {
}

async function signOut() {
  currentUser = null;
  localStorage.removeItem('codebook_user');
  localStorage.removeItem('codebook_v1');
  document.getElementById('user-bar').style.display = 'none';
  document.getElementById('app').style.display = 'none';
  var ag = document.querySelector('.app-grid'); if (ag) ag.style.display = 'none';
  document.getElementById('cover').style.display = 'none';
  document.getElementById('cover-user').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('auth-email').value = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-message').textContent = '';
}

// \u2500\u2500\u2500 GLOBAL ERROR HANDLER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
window.addEventListener('error', function(e) {
});
window.addEventListener('unhandledrejection', function(e) {
});
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'QUIT_TO_HUB') {
    renderGamePanel();
  }
});
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

window.addEventListener('load', async () => {

  // Check for password reset token in URL
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', '?'));
  const accessToken = params.get('access_token');
  const type = params.get('type');

  if (accessToken && type === 'recovery') {
    showResetForm(accessToken);
    return;
  }

  populateDashboard();
});

// --- XP + LEVEL + STREAK SYSTEM ---

const LEVELS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 200 },
  { level: 3, xp: 500 },
  { level: 4, xp: 900 },
  { level: 5, xp: 1500 },
  { level: 6, xp: 2300 },
  { level: 7, xp: 3400 },
  { level: 8, xp: 4700 },
  { level: 9, xp: 6000 }
];

function getStreakMultiplier() {
  if (state.streak >= 10) return 2;
  if (state.streak >= 6)  return 1.5;
  if (state.streak >= 3)  return 1.2;
  return 1;
}

function getCurrentLevel() {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (state.xp >= l.xp) current = l;
  }
  return current;
}

function getNextLevel() {
  const cur = getCurrentLevel();
  return LEVELS.find(l => l.level === cur.level + 1) || null;
}

function getSectionXP(fi) {
  var byFloor = [25, 35, 50, 65, 80, 100, 125];
  return byFloor[fi] !== undefined ? byFloor[fi] : 25;
}

function getFloorXP(fi) {
  var byFloor = [150, 200, 300, 400, 500, 600, 750];
  return byFloor[fi] !== undefined ? byFloor[fi] : 250;
}

function awardXP(amount, key, x, y) {
  if (key && state.xpAwarded[key]) return;
  const multiplier = getStreakMultiplier();
  const earned = Math.round(amount * multiplier);
  const prevLevel = getCurrentLevel().level;
  state.xp += earned;
  if (key) state.xpAwarded[key] = true;
  saveState();
  updateXPPanel();
  showFloatingXP('+' + (earned) + ' XP', x, y);
  const newLevel = getCurrentLevel().level;
  if (newLevel > prevLevel) showLevelUp(newLevel);
}

function showFloatingXP(text, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = text;
  el.style.left = (x || window.innerWidth / 2) + 'px';
  el.style.top = (y || 200) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function showLevelUp(level) {
  const overlay = document.createElement('div');
  overlay.className = 'levelup-overlay';
  overlay.innerHTML = `
    <div class="levelup-title">Level ${level}</div>
    <div class="levelup-sub">YOU JUST LEVELLED UP</div>
    <button class="levelup-btn" onclick="this.parentElement.remove()">Keep Going</button>
  `;
  document.body.appendChild(overlay);
}

function updateXPPanel() {
  const panel = document.getElementById('xp-panel');
  if (panel) panel.style.display = state.xp > 0 ? 'flex' : 'none';
  const cur = getCurrentLevel();
  const next = getNextLevel();
  const xpEl = document.getElementById('current-xp');
  const lvlEl = document.getElementById('current-level');
  const fillEl = document.getElementById('level-fill');
  const nextEl = document.getElementById('xp-to-next');
  const streakEl = document.getElementById('streak-count');
  if (xpEl) xpEl.textContent = state.xp;
  if (lvlEl) lvlEl.textContent = cur.level;
  if (streakEl) streakEl.textContent = state.streak;
  if (next) {
    const range = next.xp - cur.xp;
    const progress = state.xp - cur.xp;
    const pct = Math.min(100, Math.round((progress / range) * 100));
    if (fillEl) fillEl.style.width = pct + '%';
    if (nextEl) nextEl.textContent = next.xp - state.xp;
  } else {
    if (fillEl) fillEl.style.width = '100%';
    if (nextEl) nextEl.textContent = 'MAX';
  }

  // Sync new layout sidebar
  if (typeof updateTopChips === 'function') updateTopChips();
  if (typeof updateLeftStats === 'function') updateLeftStats();
}
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastVisit === yesterday) {
    state.streak += 1;
    state.streakProtectedToday = false; // reset for new day
  } else if (state.lastVisit !== null) {
    state.streak = 0;
    state.streakProtectedToday = false;
  }
  state.lastVisit = today;
  saveState();
}

function markStreakProtected() {
  if (state.streakProtectedToday) return;
  state.streakProtectedToday = true;
  saveState();
  if (state.streak >= 1) showStreakToast(state.streak);
}

function showStreakToast(days) {
  var existing = document.getElementById('streak-toast');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.id = 'streak-toast';
  var emoji = days >= 30 ? '\ud83c\udfc6' : days >= 14 ? '\u26a1' : days >= 7 ? '\ud83d\udd25' : '\ud83d\udd25';
  var msg = days === 1 ? 'Streak started! Come back tomorrow.' :
            days < 7  ? days + ' day streak \u2014 keep going.' :
            days < 14 ? days + ' day streak \u2014 you\'re building a habit.' :
            days < 30 ? days + ' day streak \u2014 exceptional consistency.' :
                        days + ' day streak \u2014 you\'re unstoppable.';
  toast.innerHTML =
    '<div class="streak-toast-icon">' + emoji + '</div>' +
    '<div class="streak-toast-text"><strong>' + msg + '</strong>' +
    '<div class="streak-toast-sub">Streak protected for today.</div></div>' +
    '<button class="streak-toast-close" onclick="this.parentElement.remove()">\u00d7</button>';
  toast.className = 'streak-toast';
  document.body.appendChild(toast);
  setTimeout(function() { if (toast.parentElement) toast.remove(); }, 5000);
}

function startSectionTimer(sectionId) {
  state.sectionStartTime = Date.now();
  setTimeout(() => {
    const key = 'read-' + (sectionId) + '';
    if (!state.xpAwarded[key]) {
      awardXP(10, key, window.innerWidth - 100, 100);
    }
  }, 20000);
}

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return '' + (h) + 'h ' + (m) + 'm';
  return '' + (m) + 'm';
}

function updateTimeLog() {
  const el = document.getElementById('time-log');
  if (!el) return;
  const total = formatTime(state.totalSeconds);
  const sessions = state.sessionLog.length;
  el.innerHTML = '<span>' + (total) + ' total</span><span>' + (sessions) + ' session' + (sessions !== 1 ? 's' : '') + '</span>';
}
  function checkOnboarding() {
  const hasOnboarded = localStorage.getItem('codebook_onboarded');

  if (!hasOnboarded) {
    showOnboarding();
    return;
  }
}



const today = new Date().toDateString();

function startBook() {
  loadState();
  updateStreak();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
  const challengeDone = localStorage.getItem('codebook_challenge_done_' + today);
  if (!challengeDone) {
    setTimeout(() => showDailyChallenge(), 800);
  }
}

function launchApp() {
  // Snapshot XP at session start so the end-of-session screen shows
  // only XP earned this session, not all-time XP.
  sessionXpStart = state.xp;

  // Hide the landing screen and cover
  var landing = document.getElementById('new-user-landing');
  if (landing) landing.style.display = 'none';

  var cover = document.getElementById('cover');
  if (cover) cover.style.display = 'none';

  // Hide auth screen
  var authScreen = document.getElementById('auth-screen');
  if (authScreen) authScreen.style.display = 'none';

  // Show the app grid
  var appGrid = document.querySelector('.app-grid');
  if (appGrid) appGrid.style.display = 'grid';

  // Show mobile bottom bar
  var mobileBar = document.getElementById('mobile-bottom-bar');
  if (mobileBar) mobileBar.style.display = '';

  // Render content
  renderNav();
  renderLearnHub();
  updateTimeLog();
  updateXPPanel();
  resetSageIdleTimer();

  // Wire up new layout sidebars
  setTimeout(function() {
    renderAllNav();
    initSageSidebarSync();
    patchRenderNav();
    updateAchievements();
    updateDailyGoalBar();
    updateLeftStats();
    updateTopChips();
  }, 80);
}
// --- ONBOARDING SYSTEM ---
let onboardingData = { name: '', experience: '', time: '' };

function showOnboarding() {
  document.getElementById('onboarding').style.display = 'flex';
}

function onboardingNext(step) {
  if (step === 1) {
    const name = document.getElementById('onboarding-name').value.trim();
    if (!name) return;
    onboardingData.name = name;
    state.playerName = name;
    document.getElementById('onboarding-step-1').style.display = 'none';
    document.getElementById('onboarding-step-2').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Nice to meet you, ' + (name) + '.';
    document.getElementById('onboarding-body').textContent = 'Let me understand where you\'re starting from.';
  }
}

function onboardingSelect(field, value) {
  onboardingData[field] = value;
  if (field === 'experience') {
    document.getElementById('onboarding-step-2').style.display = 'none';
    document.getElementById('onboarding-step-3').style.display = 'block';
    document.getElementById('onboarding-title').textContent = 'Almost there.';
    document.getElementById('onboarding-body').textContent = 'Last question \u2014 and then we begin.';
  } else if (field === 'goal') {
    onboardingData.goal = value;
    localStorage.setItem('codebook_goal', value);

    document.getElementById('onboarding-step-3').style.display = 'none';
    document.getElementById('onboarding-step-4').style.display = 'block';

    const messages = {
      never: { title: 'You\'re in the right place, ' + onboardingData.name + '.', msg: 'Starting from zero is actually an advantage. No bad habits to unlearn. We\'ll build everything from the ground up, one clear step at a time.' },
      tried: { title: 'This time will be different, ' + onboardingData.name + '.', msg: 'Whatever stopped you before \u2014 the overwhelm, the confusion, the loss of momentum \u2014 this was built specifically for that. Sage is here every time you get stuck.' },
      some:  { title: 'Good. Let\'s build on that, ' + onboardingData.name + '.', msg: 'You\'ve got a foundation. Now we give it structure. Work at your own pace \u2014 skip ahead if something\'s easy, slow down when it\'s not.' }
    };

    const goalMessages = {
      job:       'Your goal is clear. By the end of this, you\'ll have the foundations employers actually look for.',
      project:   'The best reason to learn. Every section moves you closer to building something real.',
      understand:'That\'s a great place to start. Understanding is the foundation everything else is built on.',
      unsure:    'That\'s fine. Most people start there. Keep going and it\'ll become clear.'
    };

    const m = messages[onboardingData.experience] || messages.never;
    document.getElementById('onboarding-welcome').textContent = m.title;
    document.getElementById('onboarding-message').textContent = goalMessages[value] + ' ' + m.msg;
  }
}

function finishOnboarding() {
  localStorage.setItem('codebook_onboarded', 'true');
  localStorage.setItem('codebook_player_name', onboardingData.name);
  state.playerName = onboardingData.name;
  document.getElementById('onboarding').style.display = 'none';
  if (localStorage.getItem('codebook_guest')) {
    startAsGuest();
  } else {
    document.getElementById('auth-screen').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// --- DAILY CHALLENGE SYSTEM ---
const DAILY_CHALLENGES = [
  { title: "What does HTML stand for?", question: "Choose the correct answer:", options: ["Hyper Text Markup Language", "High Text Making Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correct: 0, explanation: "HTML stands for HyperText Markup Language. It is the standard language used to create and structure content on the web.", xp: 20 },
  { title: "CSS stands for...", question: "Choose the correct answer:", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 1, explanation: "CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.", xp: 20 },
  { title: "Which tag creates a heading?", question: "Which HTML tag creates the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2, explanation: "The h1 tag creates the largest heading. Headings go from h1 (largest) to h6 (smallest).", xp: 20 },
  { title: "What is a variable?", question: "In coding, a variable is...", options: ["A type of HTML tag", "A named container that stores a value", "A CSS property", "A type of loop"], correct: 1, explanation: "A variable is a named container that stores a value. You can think of it like a labelled box that holds information your code can use and change.", xp: 20 },
  { title: "What does a loop do?", question: "A loop in code...", options: ["Creates a circular design", "Connects to the internet", "Repeats a set of instructions", "Stores data in a database"], correct: 2, explanation: "A loop repeats a set of instructions until a condition tells it to stop. Think of it like a washing machine cycle that keeps going until the cycle is complete.", xp: 20 },
  { title: "What is a function?", question: "A function in coding is...", options: ["A type of variable", "A reusable block of instructions with a name", "A CSS animation", "A database query"], correct: 1, explanation: "A function is a named, reusable block of instructions. You define it once and can call it as many times as you need \u2014 like pressing a button on a vending machine.", xp: 20 },
  { title: "What does JavaScript do?", question: "JavaScript is primarily used to...", options: ["Style web pages", "Create database tables", "Add behaviour and interactivity to web pages", "Set up servers"], correct: 2, explanation: "JavaScript adds behaviour to web pages. HTML provides structure, CSS provides style, and JavaScript makes things happen when users interact with the page.", xp: 20 },
  { title: "What is the DOM?", question: "The DOM in web development refers to...", options: ["A CSS layout system", "A type of server", "The Document Object Model - a live map of the page JavaScript can change", "A database format"], correct: 2, explanation: "The Document Object Model (DOM) is a live tree structure of your HTML that JavaScript can read and modify in real time - changing text, styles, and structure without reloading the page.", xp: 20 },
  { title: "What does an API do?", question: "An API is used to...", options: ["Style web pages", "Let two programs talk to each other and share data", "Write HTML structure", "Store passwords"], correct: 1, explanation: "An API lets two pieces of software communicate. When a weather app shows you the forecast, it used an API to ask a weather service for that data.", xp: 20 },
  { title: "What is a boolean?", question: "A boolean value in code can only be...", options: ["A number or a letter", "True or false", "A list of items", "A colour value"], correct: 1, explanation: "A boolean is the simplest data type - it is either true or false. Conditions and if-statements are built on booleans.", xp: 20 },
  { title: "What does \"debugging\" mean?", question: "Debugging means...", options: ["Writing new features", "Finding and fixing errors in code", "Deleting old code", "Speeding up a program"], correct: 1, explanation: "Debugging is the process of finding, understanding, and fixing errors (bugs) in your code. Every developer debugs - it is the job.", xp: 20 },
  { title: "What is a string?", question: "In coding, a string is...", options: ["A type of loop", "A sequence of characters - text", "A CSS measurement unit", "A database table"], correct: 1, explanation: "A string is text data wrapped in quotes. \"Hello world\" is a string. Strings are one of the most common data types in any language.", xp: 20 },
  { title: "What does \"responsive\" mean in web design?", question: "A responsive website...", options: ["Loads very fast", "Adapts its layout to different screen sizes", "Has animated elements", "Uses a database"], correct: 1, explanation: "A responsive website adjusts its layout automatically depending on the screen size - looks good on a phone, tablet, and desktop without separate versions.", xp: 20 },
  { title: "What is version control?", question: "Version control (like Git) is used to...", options: ["Speed up websites", "Track changes to code over time", "Style HTML", "Compress images"], correct: 1, explanation: "Version control tracks every change made to your code. Git is the most popular tool - you can always go back to a working version and collaborate without overwriting each other.", xp: 20 },

  // Floor 1 \u2014 Foundation
  { title: "What is a server?", question: "In web development, a server is...", options: ["A type of browser plugin", "A computer that stores and sends files when requested", "A CSS layout technique", "A JavaScript framework"], correct: 1, explanation: "A server is a computer that waits for requests and responds by sending back files. When you visit a website, a server somewhere in the world receives your request and sends back the HTML, CSS, and JS files your browser needs.", xp: 20 },
  { title: "What does a browser do?", question: "A web browser's main job is to...", options: ["Write HTML files", "Request files from servers and display them to the user", "Store websites on your computer", "Connect you directly to other users"], correct: 1, explanation: "A browser sends requests to servers, receives files back, and renders them visually on screen. It reads HTML for structure, CSS for style, and JavaScript for behaviour \u2014 turning code into the visual pages you see.", xp: 20 },
  { title: "Sequential execution", question: "What does \"sequential execution\" mean in code?", options: ["Code runs in random order", "Code runs in parallel on multiple processors", "Code runs line by line from top to bottom", "Code only runs when clicked"], correct: 2, explanation: "Sequential execution means the computer reads and runs instructions one at a time, top to bottom. It does not skip ahead or assume anything. The order you write code matters enormously because of this.", xp: 20 },
  { title: "What is a condition in code?", question: "A condition in programming means...", options: ["A type of HTML tag", "A rule that says: if this is true, do this \u2014 otherwise do that", "A way to repeat instructions", "A named block of reusable code"], correct: 1, explanation: "A condition is a decision point. \"If it is raining, take an umbrella, otherwise leave it at home.\" In code this is written as an if/else statement. Conditions are one of the three universal building blocks of all programming.", xp: 20 },

  // Floor 2 \u2014 HTML & CSS
  { title: "HTML tag structure", question: "Which of these is the correct HTML structure?", options: ["<p>Hello/p>", "<p>Hello</p>", "p>Hello</p>", "<p Hello>"], correct: 1, explanation: "Every HTML element has an opening tag, content, and a closing tag. The closing tag has a forward slash before the element name. <p>Hello</p> is the correct pattern \u2014 open, content, close.", xp: 20 },
  { title: "What does CSS stand for?", question: "CSS controls which aspect of a webpage?", options: ["The structure and content", "The visual appearance and layout", "The interactive behaviour", "The server-side logic"], correct: 1, explanation: "CSS (Cascading Style Sheets) controls how HTML elements look \u2014 colours, fonts, sizes, spacing, layout. Without CSS, every website would look like a plain text document.", xp: 20 },
  { title: "The box model", question: "In CSS, the \"box model\" refers to...", options: ["A 3D animation technique", "How every element is treated as a box with margin, border, padding, and content", "A way to create modal popups", "A CSS grid layout method"], correct: 1, explanation: "Every HTML element is a box. The CSS box model defines the space around and inside that box: content (the actual stuff), padding (space inside the border), border (the edge), and margin (space outside the border).", xp: 20 },
  { title: "Inline vs block elements", question: "What is the difference between a block and inline HTML element?", options: ["Block elements are invisible, inline elements are visible", "Block elements start on a new line and take full width; inline elements flow within text", "Block elements need JavaScript; inline elements do not", "There is no difference"], correct: 1, explanation: "Block elements like <div>, <p>, and <h1> start on a new line and stretch the full width. Inline elements like <span>, <a>, and <strong> flow within text without breaking to a new line. Understanding this prevents many layout headaches.", xp: 20 },
  { title: "CSS specificity", question: "If two CSS rules target the same element, which one wins?", options: ["The first one written always wins", "The more specific selector wins", "The shorter rule wins", "They are always combined"], correct: 1, explanation: "CSS specificity determines which rule applies when multiple rules target the same element. An ID selector beats a class selector beats an element selector. When specificity is equal, the last rule written wins. This is the \"Cascading\" in CSS.", xp: 20 },

  // Floor 3 \u2014 JavaScript
  { title: "let vs const", question: "What is the difference between let and const in JavaScript?", options: ["let is faster than const", "const cannot be reassigned after declaration; let can", "They are identical", "const only works with numbers"], correct: 1, explanation: "const declares a variable whose value cannot be reassigned. let declares a variable that can change. Use const by default and let when you know the value needs to change. This makes your code easier to reason about.", xp: 20 },
  { title: "What is the DOM?", question: "JavaScript uses the DOM to...", options: ["Connect to databases", "Read and change the HTML currently on screen", "Style elements with CSS", "Send emails"], correct: 1, explanation: "The Document Object Model (DOM) is a live map of the HTML on the page. JavaScript can read and modify it in real time \u2014 changing text, hiding elements, adding new ones \u2014 without refreshing the page.", xp: 20 },
  { title: "Event listeners", question: "What does addEventListener do in JavaScript?", options: ["Adds a new HTML element", "Waits for a specific user action and runs code when it happens", "Connects to an external API", "Styles an element on hover"], correct: 1, explanation: "addEventListener tells the browser: when this specific thing happens (a click, a keypress, a scroll), run this function. It is the foundation of interactive web pages \u2014 everything that responds to user input uses event listeners.", xp: 20 },
  { title: "Array methods", question: "What does the .filter() method do to a JavaScript array?", options: ["Sorts the array alphabetically", "Returns a new array containing only elements that pass a test", "Removes the last element", "Combines two arrays"], correct: 1, explanation: ".filter() creates a new array with only the elements for which your test function returns true. For example, numbers.filter(n => n > 10) returns only numbers greater than 10. It does not modify the original array.", xp: 20 },

  // Floor 4 \u2014 Independence
  { title: "What is localStorage?", question: "localStorage in the browser allows you to...", options: ["Store data on a server", "Save small amounts of data that persists between page refreshes", "Share data between different users", "Compress images"], correct: 1, explanation: "localStorage is a browser feature that lets you save key-value pairs locally on the user's device. Unlike regular variables, localStorage data survives page refreshes and browser restarts \u2014 useful for saving preferences, drafts, or progress.", xp: 20 },
  { title: "JSON", question: "JSON is used in web development to...", options: ["Style HTML elements", "Format and transfer structured data between systems", "Run server-side code", "Create animations"], correct: 1, explanation: "JSON (JavaScript Object Notation) is a text format for representing structured data. It looks like a JavaScript object and is used to send data between a frontend and a backend, or to store structured data in localStorage.", xp: 20 },
  { title: "What is debugging?", question: "The browser Developer Console is used to...", options: ["Edit the website permanently", "See JavaScript errors, log output, and inspect the page", "Speed up page loading", "Write CSS"], correct: 1, explanation: "The Developer Console (opened with F12) shows JavaScript errors with line numbers, lets you log values with console.log(), and allows you to inspect and modify the live DOM. It is your most important debugging tool.", xp: 20 },
  { title: "Reading error messages", question: "When JavaScript throws a \"ReferenceError\", it means...", options: ["The page has no internet connection", "You tried to use a variable or function that has not been defined", "A CSS rule is invalid", "The HTML is malformed"], correct: 1, explanation: "A ReferenceError means JavaScript cannot find what you are referring to. Usually this means a typo in a variable name, using a variable before declaring it, or calling a function that does not exist. The error message tells you the name it could not find.", xp: 20 },

  // Floor 5 \u2014 Full Stack
  { title: "Frontend vs Backend", question: "Which of these tasks belongs to the backend?", options: ["Styling a button with CSS", "Animating a dropdown menu", "Securely processing a payment", "Choosing a font family"], correct: 2, explanation: "The backend handles tasks that must be done securely and away from the user's browser \u2014 things like processing payments, validating credentials, querying a database, or running sensitive business logic. The frontend is everything the user sees directly.", xp: 20 },
  { title: "What is SQL?", question: "SQL is primarily used to...", options: ["Style web pages", "Build mobile apps", "Query and manage relational databases", "Write server-side JavaScript"], correct: 2, explanation: "SQL (Structured Query Language) is the language for communicating with relational databases. It lets you create tables, insert data, retrieve specific records, update values, and delete data. Every major web application uses SQL or a similar query language.", xp: 20 },
  { title: "HTTP methods", question: "In a REST API, a POST request is used to...", options: ["Retrieve data", "Create new data", "Delete existing data", "Update all records"], correct: 1, explanation: "REST APIs use HTTP methods to indicate the type of action: GET retrieves data, POST creates new data, PUT/PATCH updates existing data, DELETE removes data. These map directly to the CRUD operations (Create, Read, Update, Delete) of a database.", xp: 20 },
  { title: "What is an API key?", question: "An API key is used to...", options: ["Encrypt user passwords", "Identify and authenticate who is making a request to an API", "Speed up API responses", "Format JSON data"], correct: 1, explanation: "An API key is a unique identifier passed with requests to an external API. It tells the API who is making the request, allows the provider to track usage, and lets them block keys that are misused or over their rate limit. Never expose API keys in public code.", xp: 20 },
  { title: "Git commit", question: "What does \"git commit\" do?", options: ["Sends your code to GitHub", "Saves a permanent snapshot of your current changes with a message", "Creates a new branch", "Merges two branches together"], correct: 1, explanation: "A commit is a saved snapshot of your code at a specific point in time, with a message describing what changed. It is local \u2014 it lives on your machine until you push. Think of commits as save points in a game that you can always return to.", xp: 20 },

  // Floor 6 \u2014 Specialisation
  { title: "What is React?", question: "React is best described as...", options: ["A CSS framework", "A backend web server", "A JavaScript library for building user interfaces from reusable components", "A database management tool"], correct: 2, explanation: "React is a JavaScript library created by Facebook for building UIs. It lets you break your interface into reusable components, each managing its own state. When state changes, React efficiently updates only the affected parts of the page.", xp: 20 },
  { title: "Component state", question: "In React, \"state\" refers to...", options: ["The CSS styles of a component", "Data that belongs to a component and can change over time", "The server location of the app", "The HTML structure of the page"], correct: 1, explanation: "State is data that lives inside a component and can change. When state changes, React re-renders the component to reflect the new data. This is the core idea behind reactive UIs \u2014 the display automatically stays in sync with the data.", xp: 20 },
  { title: "What is Node.js?", question: "Node.js allows developers to...", options: ["Write CSS with JavaScript syntax", "Run JavaScript on the server, outside of a browser", "Build native mobile apps", "Manage SQL databases directly"], correct: 1, explanation: "Node.js is a runtime that lets JavaScript run on a server rather than just in a browser. This means you can use JavaScript for both the frontend and the backend \u2014 one language across your entire stack.", xp: 20 },
  { title: "REST vs GraphQL", question: "The main advantage of GraphQL over REST is...", options: ["It is faster in all situations", "The client can request exactly the data it needs, no more, no less", "It does not require a server", "It only works with React"], correct: 1, explanation: "REST APIs return fixed data structures per endpoint \u2014 sometimes more than you need, sometimes less. GraphQL lets the client define exactly what data it wants in a single query, reducing over-fetching and under-fetching. It is particularly useful for complex UIs with varied data needs.", xp: 20 },

  // Floor 7 \u2014 Professional Grade
  { title: "What is code review?", question: "The main purpose of a code review is to...", options: ["Count lines of code written", "Check spelling in comments", "Have another developer examine your code for quality, bugs, and improvements", "Measure how fast the code runs"], correct: 2, explanation: "Code review is when one or more developers read and critique another's code before it is merged. It catches bugs, improves code quality, spreads knowledge across the team, and ensures the codebase stays consistent. It is standard practice in all professional development teams.", xp: 20 },
  { title: "What is system design?", question: "System design in software engineering is about...", options: ["Choosing colour schemes for an app", "Deciding which font to use", "Planning how the components of a large application fit together to handle scale and failure", "Writing the first version of code quickly"], correct: 2, explanation: "System design is the process of planning how an application's components \u2014 databases, servers, caches, queues, APIs \u2014 fit together to be reliable, scalable, and maintainable. Senior developers are often distinguished by their system design thinking.", xp: 20 },
  { title: "What is caching?", question: "Caching in web development means...", options: ["Deleting old files regularly", "Storing copies of frequently requested data so future requests are faster", "Encrypting sensitive user data", "Compressing images for faster loading"], correct: 1, explanation: "Caching stores a copy of data closer to where it is needed \u2014 in memory, a CDN, or the browser. Instead of fetching the same data from a database on every request, a cache serves it instantly. It is one of the most effective ways to make applications faster and more scalable.", xp: 20 },
  { title: "What makes clean code?", question: "Which of these is the best indicator of clean code?", options: ["It has no comments at all", "Another developer can understand what it does without explanation", "It is written in as few lines as possible", "It uses advanced language features"], correct: 1, explanation: "Clean code communicates its intent clearly to any developer who reads it. Good naming, small focused functions, and logical structure matter more than brevity or cleverness. The goal is code that is easy to understand, modify, and debug \u2014 often by yourself six months later.", xp: 20 }
];

// \u2500\u2500 SHARED CHALLENGE MODAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// All challenge modes use this single helper to open the modal.
// xpKey is a unique string to prevent awarding XP twice for the same question.
function _openChallengeModal(challenge, headingText, subText, xpKey) {
  document.getElementById('challenge-title').textContent = headingText;
  document.getElementById('challenge-body').textContent = subText;
  document.getElementById('challenge-question').textContent = challenge.question;
  document.getElementById('challenge-result').style.display = 'none';

  document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b){ b.remove(); });

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.innerHTML = '';
  challenge.options.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.style.cssText = 'padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:14px;cursor:pointer;text-align:left;transition:all 0.2s ease;width:100%;';
    btn.textContent = opt;
    btn.addEventListener('click', function() {
      answerChallenge(i, challenge.correct, challenge.xp, challenge.explanation, xpKey);
    });
    optionsEl.appendChild(btn);
  });

  document.getElementById('daily-challenge').style.display = 'flex';
}

// \u2500\u2500 DAILY CHALLENGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Advances one question per calendar day. Deterministic but changes daily.
function showDailyChallenge() {
  var today = new Date().toDateString();
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var challenge = DAILY_CHALLENGES[daysSinceEpoch % DAILY_CHALLENGES.length];
  _openChallengeModal(
    challenge,
    challenge.title,
    "Complete today's challenge and earn +" + challenge.xp + ' bonus XP.',
    'challenge-' + today
  );
  localStorage.setItem('codebook_challenge_done_' + today, 'true');
}

function answerChallenge(chosen, correct, xp, explanation, xpKey) {
  var today = new Date().toDateString();
  // Use provided xpKey (unique per question+mode), fall back to today for daily
  var key = xpKey || ('challenge-' + today);

  var buttons = document.querySelectorAll('#challenge-options button');
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === correct) btn.style.borderColor = 'var(--success)';
    else if (i === chosen && chosen !== correct) btn.style.borderColor = 'var(--floor3)';
  });

  var resultEl = document.getElementById('challenge-result');
  resultEl.style.display = 'block';

  if (chosen === correct) {
    resultEl.style.background = 'rgba(110,200,126,0.08)';
    resultEl.style.border = '1px solid var(--success)';
    resultEl.style.color = 'var(--text-dim)';
    resultEl.innerHTML = '<strong style="color:var(--success)">Correct! +' + xp + ' XP</strong><br><br>' + explanation;
    awardXP(xp, key, window.innerWidth / 2, 200);
  } else {
    resultEl.style.background = 'rgba(200,126,154,0.08)';
    resultEl.style.border = '1px solid var(--floor3)';
    resultEl.style.color = 'var(--text-dim)';
    resultEl.innerHTML = '<strong style="color:var(--floor3)">Not quite.</strong><br><br>' + explanation;
  }

  // Mark daily challenge done in localStorage only for the daily mode
  if (!xpKey || xpKey.indexOf('challenge-') === 0) {
    localStorage.setItem('codebook_challenge_done_' + today, 'true');
  }

  setTimeout(function() {
    document.querySelectorAll('#daily-challenge .auth-btn').forEach(function(b){ b.remove(); });
    var closeBtn = document.createElement('button');
    closeBtn.className = 'auth-btn';
    closeBtn.textContent = 'Continue learning \u2192';
    closeBtn.onclick = closeDailyChallenge;
    closeBtn.style.marginTop = '8px';
    var lastChild = document.querySelector('#daily-challenge > div > div:last-child');
    if (lastChild) lastChild.prepend(closeBtn);
  }, 500);
}

function closeDailyChallenge() {
  document.getElementById('daily-challenge').style.display = 'none';
}

// --- FLOOR CELEBRATION SYSTEM ---
const FLOOR_MESSAGES = [
  { icon: '\uD83C\uDF93', sage: 'You now understand what the internet is, how computers read instructions, and the logic behind every program ever written. Most people who try to learn to code never properly understand these things. You do. That is not nothing.' },
  { icon: '\uD83C\uDFA8', sage: 'HTML describes what content is. CSS controls how it looks. The browser renders both. You\'ve built real pages that look the way you intended. The visual web is no longer something that happens to you \u2014 it\'s something you make.' },
  { icon: '\u26A1', sage: 'JavaScript. Events. The DOM. Functions that respond to the world. This is where most learners stop \u2014 it gets hard and they step back. You didn\'t. Everything from here is built on what you just proved you can do.' },
  { icon: '\uD83D\uDD28', sage: 'No scaffold. No step-by-step. A brief and a blank editor. You produced working code. That is the developer mindset \u2014 not knowing everything, but knowing how to figure it out. That skill is permanent.' },
  { icon: '\uD83C\uDF10', sage: 'Frontend. Backend. Database. Authentication. Deployment. You built the whole thing. Full stack is a title people throw around loosely. You\'ve now earned the right to use it precisely.' },
  { icon: '\uD83C\uDFAF', sage: 'The fork in the road is behind you. You chose a direction and went deep enough to become genuinely valuable in it. Generalists are useful. Specialists are sought after. You know which you\'re becoming.' },
  { icon: '\uD83C\uDFC6', sage: 'Floor 7. You started from nothing and you built your way here. Every floor, every section, every debugging session at midnight \u2014 that distance is yours. Nobody can take the understanding back out of your head.' }
];

function showFloorCelebration(floorIndex) {
  var floor = FLOORS[floorIndex];
  var msg = FLOOR_MESSAGES[floorIndex];
  var name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  var nextFloor = FLOORS[floorIndex + 1] || null;
  var floorColor = floor.color || '#c8a96e';

  // Calculate floor stats
  var sectionsTotal = floor.sections.length;
  var sectionsCompleted = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
  var xpOnFloor = floor.sections.reduce(function(sum, s) {
    return sum + (state.xpAwarded['complete-' + s.id] ? getSectionXP(floorIndex) : 0);
  }, 0) + (state.xpAwarded['floor-' + floorIndex] ? getFloorXP(floorIndex) : 0);
  var level = getCurrentLevel().level;

  var el = document.getElementById('floor-celebration');
  el.innerHTML =
    '<div class="fc-overlay" style="--fc-color:' + floorColor + '">' +
      // Hero
      '<div class="fc-hero">' +
        '<div class="fc-hero-glow"></div>' +
        '<div class="fc-icon" id="fc-icon">' + msg.icon + '</div>' +
        '<div class="fc-label">FLOOR COMPLETE</div>' +
        '<div class="fc-title" id="fc-title">' + floor.title + '</div>' +
        '<div class="fc-tag">' + floor.tag + '</div>' +
      '</div>' +
      // Stats grid
      '<div class="fc-stats">' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val" id="fc-stat-sections">0/' + sectionsTotal + '</div>' +
          '<div class="fc-stat-label">Sections</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val" id="fc-stat-xp">0</div>' +
          '<div class="fc-stat-label">XP this floor</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val">' + state.streak + '\uD83D\uDD25</div>' +
          '<div class="fc-stat-label">Day streak</div>' +
        '</div>' +
        '<div class="fc-stat">' +
          '<div class="fc-stat-val">Lvl ' + level + '</div>' +
          '<div class="fc-stat-label">Current level</div>' +
        '</div>' +
      '</div>' +
      // Sage quote
      '<div class="fc-sage">' +
        '<div class="fc-sage-owl">' + sageOwlSVG(38, 42) + '</div>' +
        '<div class="fc-sage-text" id="fc-sage-text"></div>' +
      '</div>' +
      // Next floor preview
      (nextFloor
        ? '<div class="fc-next" style="border-color:' + (nextFloor.color||'#c8a96e') + '33">' +
            '<div class="fc-next-label">NEXT UP</div>' +
            '<div class="fc-next-title" style="color:' + (nextFloor.color||'#c8a96e') + '">Floor ' + nextFloor.id + ' \u2014 ' + nextFloor.title + '</div>' +
            '<div class="fc-next-sub">' + nextFloor.subtitle + '</div>' +
          '</div>'
        : '<div class="fc-next fc-next-final">You\'ve reached the top floor. The building is complete.</div>'
      ) +
      // Buttons
      '<div class="fc-actions">' +
        '<button class="fc-btn-primary" onclick="closeCelebration()">' +
          (nextFloor ? 'Continue to Floor ' + nextFloor.id + ' \u2192' : 'You\'re done \u2713') +
        '</button>' +
        '<button class="fc-btn-share" onclick="shareAchievement()">Share this achievement</button>' +
      '</div>' +
    '</div>';

  el.style.display = 'flex';

  // Animate stats counting up
  animateCount('fc-stat-sections', 0, sectionsCompleted, sectionsTotal, 800);
  animateCount('fc-stat-xp', 0, xpOnFloor, null, 1000);

  // Typewrite Sage message
  setTimeout(function() { typewriteText('fc-sage-text', msg.sage, 18); }, 600);

  // Particle burst in floor color
  setTimeout(function() { burstFloorParticles(floorColor); }, 200);
  setTimeout(function() { burstFloorParticles(floorColor); }, 700);
}

function animateCount(elId, from, to, outOf, duration) {
  var el = document.getElementById(elId);
  if (!el) return;
  var start = Date.now();
  var suffix = outOf !== null ? '/' + outOf : '';
  function tick() {
    var elapsed = Date.now() - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(from + (to - from) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function typewriteText(elId, text, msPerChar) {
  var el = document.getElementById(elId);
  if (!el) return;
  var i = 0;
  el.textContent = '';
  function next() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(next, msPerChar);
    }
  }
  next();
}

function burstFloorParticles(color) {
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight * 0.28;
  for (var i = 0; i < 20; i++) {
    var p = document.createElement('div');
    p.className = 'fc-particle';
    var angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5);
    var dist = 60 + Math.random() * 120;
    var tx = Math.cos(angle) * dist;
    var ty = Math.sin(angle) * dist - 40;
    var size = 4 + Math.random() * 6;
    var dur = 0.7 + Math.random() * 0.6;
    p.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + size + 'px;' +
      'background:' + color + ';border-radius:50%;position:fixed;pointer-events:none;z-index:9999;' +
      'animation:fcParticle ' + dur + 's ease-out forwards;' +
      '--tx:' + tx + 'px;--ty:' + ty + 'px;';
    document.body.appendChild(p);
    setTimeout(function(el) { el.remove(); }, dur * 1000 + 100, p);
  }
}

function closeCelebration() {
  document.getElementById('floor-celebration').style.display = 'none';
}

function shareAchievement() {
  const name = state.playerName || localStorage.getItem('codebook_player_name') || 'Someone';
  const floor = FLOORS[state.currentFloor - 1];
  const text = '' + (name) + ' just completed "' + (floor.title) + '" on The Code Book with ' + (state.xp) + ' XP. Learning to code one step at a time. https://the-code-book.netlify.app';
  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard \u2014 paste it wherever you want to share.'));
  }
}

// --- STREAK PROTECTION ---
function checkStreakProtection() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const twoDaysAgo = new Date(Date.now() - 172800000).toDateString();

  if (state.lastVisit === twoDaysAgo && state.streak > 0) {
    // Grace period \u2014 one day missed, show recovery option
    showStreakRecovery();
  }
}

function showStreakRecovery() {
  if (state.streak < 3) return; // Only show for meaningful streaks
  const banner = document.createElement('div');
  banner.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--floor3);border-radius:12px;padding:16px 20px;z-index:5000;max-width:320px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4);`;
  banner.innerHTML = `
    <div style="font-size:24px;margin-bottom:8px;">\uD83D\uDD25</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:14px;margin-bottom:6px;">Streak in danger</div>
    <div style="font-size:13px;color:var(--text-dim);margin-bottom:14px;">Complete one section today to keep your ${state.streak} day streak alive.</div>
    <button onclick="this.parentElement.remove()" style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:1px;padding:10px 20px;background:var(--floor3);border:none;color:white;border-radius:6px;cursor:pointer;">Protect my streak</button>
  `;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 8000);
}

// --- PROGRESS NUDGE SYSTEM ---
function checkProgressNudge(fi, si) {
  const floor = FLOORS[fi];
  const halfway = Math.floor(floor.sections.length / 2);
  if (si === halfway) {
    showProgressNudge(fi, si);
  }
}

function showProgressNudge(fi, si) {
  const key = 'nudge-halfway-' + (fi) + '';
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, 'true');

  const name = state.playerName || localStorage.getItem('codebook_player_name') || '';
  const nudge = document.createElement('div');
  nudge.style.cssText = `position:fixed;bottom:80px;right:16px;background:var(--surface);border:1px solid var(--accent);border-radius:12px;padding:16px 20px;z-index:5000;max-width:260px;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:fadeUp 0.4s ease;`;
  nudge.innerHTML = `
    <div style="margin-bottom:8px;">${sageOwlSVG(22, 24)}</div>
    <div style="font-family:'Lato',sans-serif;font-weight:700;color:var(--text);font-size:13px;margin-bottom:6px;">${name ? 'Halfway there, ' + (name) + '!' : 'Halfway there!'}</div>
    <div style="font-size:12px;color:var(--text-dim);line-height:1.6;">You\'re halfway through this floor. The hard part is behind you.</div>
    <button onclick="this.parentElement.remove()" style="margin-top:10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;padding:6px 14px;background:transparent;border:1px solid var(--accent);color:var(--accent);border-radius:4px;cursor:pointer;">Keep going</button>
  `;
  document.body.appendChild(nudge);
  setTimeout(() => nudge.remove && nudge.remove(), 6000);
}

// --- GUEST MODE ---
function showGuestNamePrompt() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('guest-name-overlay').style.display = 'flex';
}

function hideGuestNamePrompt() {
  document.getElementById('guest-name-overlay').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'flex';
}

function confirmGuestName() {
  var name = document.getElementById('guest-name-input').value.trim();
  if (!name) { name = onboardingData.name || 'Guest'; }
  localStorage.setItem('codebook_guest_name', name);
  localStorage.setItem('codebook_guest', 'true');
  onboardingData.name = name;
  state.playerName = name;

  document.getElementById('guest-name-overlay').style.display = 'none';
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';

  // Already onboarded — go straight into the app
  if (localStorage.getItem('codebook_onboarded')) {
    startAsGuest();
    return;
  }

  // First-time guest — collect experience/goal before starting
  document.getElementById('onboarding-step-1').style.display = 'none';
  document.getElementById('onboarding-step-2').style.display = 'block';
  document.getElementById('onboarding-title').textContent = 'Welcome, ' + name + '.';
  document.getElementById('onboarding-body').textContent = 'A few quick questions before we begin.';
  document.getElementById('onboarding').style.display = 'flex';
}

function showGuestLockPopup() {
  document.getElementById('guest-lock-overlay').style.display = 'flex';
}

function hideGuestLockPopup() {
  document.getElementById('guest-lock-overlay').style.display = 'none';
}

function startAsGuest() {
  localStorage.setItem('codebook_guest', 'true');
  isGuest = true;
  document.getElementById('auth-screen').style.display = 'none';
  document.body.style.overflow = '';
  loadState();
  updateStreak();
  document.getElementById('cover').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  applyTheme();
  launchApp();
}

function checkGuestSavePrompt() {
  const isGuest = localStorage.getItem('codebook_guest');
  const prompted = localStorage.getItem('codebook_guest_prompted');
  if (isGuest && !prompted) {
    // Count only real section completions, not checklist items
    const sectionIds = new Set();
    FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
    const completedSections = Object.keys(state.completed).filter(function(k) {
      return sectionIds.has(k) && state.completed[k];
    }).length;
    if (completedSections >= 3) {
      localStorage.setItem('codebook_guest_prompted', 'true');
      showGuestSavePrompt();
    }
  }
}

function showGuestSavePrompt() {
  const prompt = document.createElement('div');
  prompt.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9000;display:flex;align-items:center;justify-content:center;padding:24px;`;
  prompt.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--accent);border-radius:16px;padding:32px;max-width:340px;text-align:center;">
      <div style="margin-bottom:16px;display:flex;justify-content:center;">${sageOwlSVG(46, 51)}</div>
      <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--accent);font-style:italic;margin-bottom:12px;">Save your progress?</div>
      <div style="font-size:14px;color:var(--text-dim);line-height:1.8;margin-bottom:24px;">You\'ve completed 3 sections. Create a free account to make sure you never lose your progress.</div>
      <button onclick="this.closest('div[style*=fixed]').remove();document.getElementById('auth-screen').style.display='flex';switchTab('signup');" style="width:100%;padding:16px;background:var(--accent);border:none;border-radius:8px;color:var(--bg);font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:2px;cursor:pointer;margin-bottom:10px;">CREATE FREE ACCOUNT</button>
      <button onclick="this.closest('div[style*=fixed]').remove();" style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text-muted);background:transparent;border:none;cursor:pointer;">Continue without saving</button>
    </div>
  `;
  document.body.appendChild(prompt);
}

function renderNav() {
  const nav = document.getElementById('floor-nav');
  if (!nav) return;
  nav.innerHTML = FLOORS.map(function(f, fi) {
    var isUnlocked = true; // all floors unlocked
    var isGuestLocked = false;
    var isActive = fi === state.currentFloor - 1;
    var isComplete = isFloorComplete(fi);
    var sections = isActive ? f.sections.map(function(s, si) {
      var isDone = state.completed[s.id];
      var isActiveSec = si === state.currentSection;
      return '<span class="section-link ' + (isDone ? 'done' : '') + ' ' + (isActiveSec ? 'active' : '') + '" onclick="goToSection(' + fi + ',' + si + ')">' + s.title + '</span>';
    }).join('') : '';
    return '<div class="floor-nav-item ' + (isUnlocked ? 'unlocked' : '') + ' ' + (isActive ? 'active' : '') + ' ' + (isComplete ? 'completed' : '') + ' ' + (isGuestLocked ? 'guest-locked' : '') + '" onclick="goToFloor(' + fi + ')">' +
      '<div class="floor-nav-header">' +
      '<div class="floor-num" style="color:' + f.color + '">' + (isGuestLocked ? '&#128274;' : isComplete ? '2713' : fi + 1) + '</div>' +
      '<div class="floor-nav-label">' + f.title + (isGuestLocked ? ' 2014 Account required' : '') + '</div>' +
      '</div>' +
      (isActive ? '<div class="floor-sections">' + sections + '</div>' : '') +
      '</div>';
  }).join('');
  updateProgress();
  renderBuildingMap();
}

function isFloorComplete(fi) {
  if (fi < 0) return true;
  return FLOORS[fi].sections.every(s => state.completed[s.id]);
}

function updateProgress() {
  // Build a set of valid section IDs so we only count real sections
  const sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  const total = sectionIds.size;
  const done = Object.keys(state.completed).filter(function(k) { return sectionIds.has(k) && state.completed[k]; }).length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  // Sync new layout
  var lsp = document.getElementById('ls-progress');
  if (lsp) lsp.textContent = pct + '%';
}
function showSageFloorIntro(fi) {
  var existing = document.getElementById('sage-floor-intro-overlay');
  if (existing) existing.remove();
  var floor = FLOORS[fi];
  if (!floor) { goToFloor(fi); return; }

  var introTexts = [
    'Before you write a single line of code, let me make sure you understand how the internet actually works — and why it works that way.<br><br>In Floor 1 we cover how browsers talk to servers, what HTML, CSS and JavaScript actually are, and the three ideas that every program ever written is built on: conditions, loops and functions.<br><br>Five sections. No prior experience needed. Take your time with each one.'
  ];
  var text = introTexts[fi] || 'This floor builds directly on everything you have learned so far. Each section is designed to be completed in one sitting.';

  var el = document.createElement('div');
  el.id = 'sage-floor-intro-overlay';
  el.innerHTML = [
    '<div class="sfi-card">',
      '<div class="sfi-owl">' + sageOwlSVG(64, 70) + '</div>',
      '<div class="sfi-sage-label">SAGE</div>',
      '<div class="sfi-floor-badge">FLOOR ' + (fi + 1) + ' — ' + floor.title.toUpperCase() + '</div>',
      '<p class="sfi-message">' + text + '</p>',
      '<div class="sfi-question">Are you ready to begin?</div>',
      '<button class="sfi-ready-btn" onclick="document.getElementById(\'sage-floor-intro-overlay\').remove();goToFloor(' + fi + ')">I am ready</button>',
      '<button class="sfi-back-btn" onclick="document.getElementById(\'sage-floor-intro-overlay\').remove()">Not yet — take me back</button>',
    '</div>'
  ].join('');
  document.body.appendChild(el);
}

function goToFloor(fi) {
  stopNarration();

  // Capture prevFloor BEFORE mutating state so direction is calculated correctly
  var prevFloor = state.currentFloor - 1;
  var direction = fi > prevFloor ? 'up' : 'down';
  var mainContent = document.getElementById('main-content');
  var mainCol = document.getElementById('main-col') || mainContent;

  function slideIn() {
    state.currentFloor = fi + 1;
    state.currentSection = 0;
    saveState();
    renderNav();
    renderFloor(fi, 0);

    if (mainContent) {
      mainContent.style.overflow = 'hidden';
      mainContent.classList.remove('elevator-up', 'elevator-down', 'slide-out-up', 'slide-out-down');
      void mainContent.offsetWidth; // reflow
      mainContent.classList.add(direction === 'up' ? 'elevator-up' : 'elevator-down');
      setTimeout(function() {
        mainContent.classList.remove('elevator-up', 'elevator-down');
        mainContent.style.overflow = '';
      }, 560);
    }

    if (mainCol) mainCol.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  if (mainContent && prevFloor !== fi) {
    mainContent.classList.remove('elevator-up', 'elevator-down', 'slide-out-up', 'slide-out-down');
    void mainContent.offsetWidth;
    mainContent.classList.add(direction === 'up' ? 'slide-out-down' : 'slide-out-up');
    setTimeout(slideIn, 240);
  } else {
    slideIn();
  }
}
function goToSection(fi, si) {
  stopNarration();
  state.currentFloor = fi + 1;
  state.currentSection = si;
  saveState();
  renderNav();
  renderFloor(fi, si);
}

// \u2500\u2500\u2500 EDITOR DEFAULTS \u2500\u2500\u2500
var editorDefaults = {
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #0a0a0a; color: white; font-family: sans-serif; padding: 20px; }\n    h1 { color: #c8a96e; }\n  </style>\n</head>\n<body>\n  <h1>I built this.</h1>\n  <p>Day one. Already making things.</p>\n</body>\n</html>',
  css: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nh1 {\n  color: #c8a96e;\n  font-size: 48px;\n  font-family: Georgia, serif;\n}\n.card {\n  background: #1a1a1a;\n  padding: 24px;\n  border-radius: 12px;\n}\n</style>\n</head>\n<body style="background:#0a0a0a;padding:20px;">\n  <h1>Style me</h1>\n  <div class="card">I am a card</div>\n</body>\n</html>',
  js: '<!DOCTYPE html>\n<html>\n<body style="background:#0a0a0a;color:white;font-family:sans-serif;padding:20px;">\n<button onclick="go()" style="padding:12px 24px;background:#c8a96e;border:none;cursor:pointer;border-radius:6px;font-size:16px;">Click Me</button>\n<p id="msg" style="margin-top:16px;color:#999;">Nothing happened yet.</p>\n<sc' + 'ript>\nfunction go() {\n  document.getElementById("msg").innerText = "You just ran JavaScript.";\n  document.getElementById("msg").style.color = "#c8a96e";\n}\n</sc' + 'ript>\n</body>\n</html>'
};

function getEditorDefaults(section) {

    if (!section) {
        return { code: "", filename: "", challenges: [] };
    }

    if (section.code && section.code.lang) {
        var lang = section.code.lang.toLowerCase().trim();

        if (lang.includes("html")) lang = "html";
        else if (lang.includes("css")) lang = "css";
        else if (lang.includes("js") || lang.includes("javascript")) lang = "js";

        var code = section.code.starter || editorDefaults[lang];

        if (!code) {
            return { code: "// unknown language", filename: "file.txt", challenges: [] };
        }

        var filenameMap = {
            html: "index.html",
            css: "style.css",
            js: "script.js"
        };

        return {
            code: code,
            filename: filenameMap[lang] || "file.txt",
            challenges: section.code.challenges || []
        };
    }

    // section exists but has no code block
    return { code: "", filename: "", challenges: [] };
}

function renderSectionStrip(fi, si) {
  var floor = FLOORS[fi];
  if (!floor) return '';
  var color = floor.color || '#c8a96e';
  var html = '<div class="section-strip">';
  floor.sections.forEach(function(sec, i) {
    var isDone = !!state.completed[sec.id];
    var isCurrent = i === si;
    var cls = 'section-strip-item' +
      (isCurrent ? ' ss-active' : '') +
      (isDone && !isCurrent ? ' ss-done' : '');
    var style = isCurrent
      ? ' style="color:' + color + ';border-color:' + color + '"'
      : '';
    html += '<div class="' + cls + '"' + style +
      ' onclick="goToSection(' + fi + ',' + i + ')">' +
      (isDone && !isCurrent ? '✓ ' : '') +
      (i + 1) + '. ' + sec.title +
      '</div>';
  });
  html += '</div>';
  return html;
}

function loadSection(f1, s1) {

var floor = FLOORS[f1];
if (!floor) { return; }

var si = parseInt(s1) || 0;
var section = floor.sections[si];
if (!section) section = floor.sections[0];
if (!section) { return; }

  var isDone = state.completed[section.id];
  var editorDef = getEditorDefaults(section);

  if (!sectionGateState[section.id]) {
    var quizGateDone = isDone || !section.quiz;
    if (!quizGateDone && section.quiz && section.quiz.questions) {
      var _ms = state.quizMultiState && state.quizMultiState[section.id];
      if (_ms && _ms.done) {
        var _total = section.quiz.questions.length;
        var _score = 0;
        section.quiz.questions.forEach(function(q, qi) { if (_ms.answers[qi] === q.correct) _score++; });
        if (_score >= Math.ceil(_total * 0.7)) quizGateDone = true;
      }
    }
    sectionGateState[section.id] = { read: true, code: false, quiz: quizGateDone };
  }
  var gate = sectionGateState[section.id];
  var allDone = gate.read && gate.code && gate.quiz;
  var showEditor = !!(section.code);
  var showQuiz = !!(section.quiz || section.checklist);

  // Tab bar + go-back button
  var fi = state.currentFloor - 1;

  // Progress dots (locked inside sticky header)
  var dots = '<div class="section-progress-dots" style="--floor-color:' + (floor.color||'#c8a96e') + '">';
  floor.sections.forEach(function(sec, i) {
    var dotCls = i === si ? 'spd-dot spd-current' : (state.completed[sec.id] ? 'spd-dot spd-done' : 'spd-dot');
    dots += '<div class="' + dotCls + '" title="' + (i+1) + '. ' + sec.title + '" onclick="goToSection(' + fi + ',' + i + ')"></div>';
  });
  dots += '</div>';

  var tabs = '<div class="section-sticky-header">' +
    '<div class="section-tabs-bar">' +
    '<button class="section-tab-btn active" onclick="switchSectionTab(\'read\',\'' + section.id + '\',this)">Read</button>' +
    (showEditor ? '<button class="section-tab-btn" onclick="switchSectionTab(\'code\',\'' + section.id + '\',this)">Code Editor</button>' : '') +
    (showQuiz ? '<button class="section-tab-btn" onclick="switchSectionTab(\'quiz\',\'' + section.id + '\',this)">Quiz</button>' : '') +
    '<button class="section-tab-btn notes-tab-btn" onclick="switchSectionTab(\'notes\',\'' + section.id + '\',this)">📝 Notes</button>' +
    '</div>' +
    dots +
    '</div>' +
    '<div class="go-back-wrap"><button class="go-back-btn" onclick="renderLearnHub()">&#8592; Go Back</button></div>';

  // READ
   var r = '<div class="floor-hero" data-floor="' + (fi+1) + '">' +
    '<div class="floor-tag" style="color:' + floor.color + '">' + floor.tag + '</div>' +
    '<div class="floor-title">' + floor.title + '<br><em>' + floor.subtitle + '</em></div>' +
    '<div class="floor-meta">' +
    '<div class="floor-meta-item"><div class="floor-meta-label">SECTION</div><div class="floor-meta-value">' + (si+1) + ' of ' + floor.sections.length + '</div></div>' +
    '<div class="floor-meta-item floor-meta-listen"><button class="listen-btn" id="listen-btn-' + section.id + '" onclick="toggleNarration(\'' + section.id + '\')"><span class="listen-dot"></span>&#9654; Listen</button></div>' +
    '<div class="floor-meta-item"><div class="floor-meta-label">OFFLINE</div><div class="floor-meta-value floor-meta-offline"><span class="offline-dot-pulse"></span>Available</div></div>' +
    '</div>' +
    '<div class="floor-section-title">' + section.title + '</div>' +
    '</div>' +
    '<div class="section-content">' +
    (section.hint ? '<button class="hint-btn" onclick="toggleHint(\'hint-' + section.id + '\')" title="Need help?">?</button>' : '');

  if (section.hint) {
    r += '<div class="hint-box" id="hint-' + section.id + '">' +
      '<div class="owl-wrap"><div class="owl-avatar">' + sageOwlSVG(30, 33) + '</div>' +
      '<div class="owl-bubble"><div class="owl-name">SAGE &mdash; YOUR GUIDE</div>' +
      '<div class="hint-text">' + section.hint.replace(/\n/g, '<br>') + '</div></div></div></div>';
  }

  r += '<div class="section-body">' + section.body.replace(/\n/g, '<br><br>') + '</div>';

  if (section.callout) {
    var cIcon = section.callout.type === 'focus' ? '🎯' : section.callout.type === 'warning' ? '⚠️' : '💡';
    r += '<div class="callout ' + (section.callout.type || '') + '">' +
      '<div class="callout-icon-row"><span class="callout-icon">' + cIcon + '</span>' +
      '<div class="callout-label">' + section.callout.label + '</div></div>' +
      '<div class="callout-text">' + section.callout.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.code && section.code.lines) {
    r += '<div class="code-block"><div class="code-header">' +
      '<div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>' +
      '<div class="code-lang">' + section.code.lang + '</div></div>' +
      '<div class="code-body">' + section.code.lines.join('\n') + '</div></div>';
  }
  if (section.callout2) {
    var c2Icon = section.callout2.type === 'focus' ? '🎯' : section.callout2.type === 'warning' ? '⚠️' : '💡';
    r += '<div class="callout ' + (section.callout2.type || '') + '">' +
      '<div class="callout-icon-row"><span class="callout-icon">' + c2Icon + '</span>' +
      '<div class="callout-label">' + section.callout2.label + '</div></div>' +
      '<div class="callout-text">' + section.callout2.text.replace(/\n/g, '<br>') + '</div></div>';
  }
  if (section.match) {
    var mt = section.match;
    var mid = 'match-' + section.id;
    var scrambled = mt.pairs.map(function(_, i) { return (i + 1) % mt.pairs.length; });
    r += '<div class="match-activity" id="' + mid + '">' +
      '<div class="match-label">QUICK MATCH</div>' +
      '<div class="match-prompt">' + mt.prompt + '</div>' +
      '<div class="match-cols">' +
      '<div class="match-col">';
    mt.pairs.forEach(function(pair, i) {
      r += '<div class="match-item match-left-item" id="match-l-' + mid + '-' + i + '" onclick="matchClick(\'' + mid + '\',\'left\',' + i + ')">' + pair.term + '</div>';
    });
    r += '</div><div class="match-col">';
    scrambled.forEach(function(pairIdx, displayIdx) {
      r += '<div class="match-item match-right-item" id="match-r-' + mid + '-' + displayIdx + '" data-pair="' + pairIdx + '" onclick="matchClick(\'' + mid + '\',\'right\',' + displayIdx + ')">' + mt.pairs[pairIdx].def + '</div>';
    });
    r += '</div></div>' +
      '<div class="match-complete" id="match-done-' + mid + '" style="display:none">&#10003; All matched correctly. +15 XP</div>' +
      '</div>';
  }

  if (section.checklist) {
    r += '<div class="checklist-card"><div class="checklist-card-label">BEFORE YOU CONTINUE</div><ul class="checklist">';
    section.checklist.forEach(function(item, ci) {
      var key = section.id + '-' + ci;
      var checked = (state.checklistDone || {})[key];
      r += '<li class="' + (checked ? 'checked' : '') + '" onclick="toggleCheck(\'' + key + '\',this)">' +
        '<div class="check-box">' + (checked ? '&#10003;' : '') + '</div>' + item + '</li>';
    });
    r += '</ul></div>';
  }

  // Sage Ask button
  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;
  r += '<div class="sage-ask-strip">' +
    '<div class="sage-ask-owl">' + sageOwlSVG(24, 26) + '</div>' +
    '<div class="sage-ask-info">' +
      '<div class="sage-ask-label">Stuck? Ask Sage</div>' +
      '<div class="sage-ask-sub">' + usesLeft + ' question' + (usesLeft !== 1 ? 's' : '') + ' remaining</div>' +
    '</div>' +
    (usesLeft > 0
      ? '<button class="sage-ask-btn" onclick="openSageChat(\'' + section.id + '\',' + fi + ')">Ask</button>'
      : '<div class="sage-ask-empty">Used up — work through it yourself.</div>') +
    '</div>';

  r += '</div>';

  // CODE EDITOR
  var savedCode = localStorage.getItem('code_' + section.id) || editorDef.code;
  var c = '<div class="section-inner-pad">' +
    '<div style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:700;margin-bottom:6px;">Live Code Editor</div>' +
    '<div style="font-size:14px;color:var(--text-dim);margin-bottom:20px;">Write code on the left. See it render live on the right.</div>' +
    '<div class="editor-wrapper">' +
    '<div class="editor-topbar">' +
    '<div class="editor-mac-dots"><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div><div class="editor-mac-dot"></div></div>' +
    '<div class="editor-filename">' + editorDef.filename + '</div>' +
    '<div class="editor-action-row">' +
    '<button class="editor-reset-btn" onclick="resetEditor(\'' + section.id + '\')">&#8634; Reset</button>' +
    '<button class="editor-run-btn" onclick="runEditor(\'' + section.id + '\')">&#9654; Run</button>' +
    '</div></div>' +
    '<div class="editor-split">' +
    '<div class="editor-code-pane">' +
    '<div class="editor-line-nums" id="lines-' + section.id + '">1</div>' +
    '<textarea class="editor-textarea" id="editor-' + section.id + '" spellcheck="false"' +
    ' oninput="editorInput(\'' + section.id + '\')" onkeydown="handleEditorTab(event)">' +
    escHtml(savedCode) + '</textarea></div>' +
    '<div class="editor-preview-pane">' +
    '<div class="editor-preview-label">PREVIEW</div>' +
    '<iframe class="editor-preview-iframe" id="preview-' + section.id + '"></iframe>' +
    '</div></div>' +
    '<div class="editor-console" id="console-' + section.id + '">' +
    '<div class="editor-console-line">&#9658; Click Run or edit to preview</div></div></div>' +
    '<div class="editor-challenges"><div class="editor-challenge-label">TRY THESE</div>';
  var allChDone = true;
  ((editorDef && editorDef.challenges) || []).forEach(function(ch, ci) {
    var chKey = section.id + '-ch-' + ci;
    var done = !!(state.challengesDone && state.challengesDone[chKey]);
    if (!done) allChDone = false;
    c += '<div class="editor-challenge-item ' + (done ? 'ch-done' : '') + '" id="chitem-' + chKey + '">' +
      '<button class="ch-check-btn" onclick="toggleChallenge(\'' + chKey + '\',' + fi + ',' + si + ')" title="' + (done ? 'Mark incomplete' : 'Mark done') + '">' +
      (done ? '✓' : '○') + '</button>' +
      '<span class="ch-text">' + ch + '</span></div>';
  });
  if ((editorDef && editorDef.challenges || []).length === 0) allChDone = true;
  c += '</div></div>';

  // QUIZ
  var answered = state.quizAnswered[section.id];
  var _msCheck = (state.quizMultiState && state.quizMultiState[section.id]) || null;
  var _quizAnswered = (answered !== undefined) ||
    (_msCheck && (_msCheck.done || Object.keys(_msCheck.answers || {}).length > 0));
  var _holoCard = true;
  var q = '<div class="section-inner-pad">';
  if (!_holoCard) {
    q += '<div style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:700;margin-bottom:6px;">Knowledge Check</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-bottom:24px;">Answer to unlock the section and earn XP.</div>';
  }
  if (_holoCard) {
    q += '<div class="holo-quiz-card">' +
      '<div class="holo-quiz-inner' + (_quizAnswered ? ' holo-answered' : '') + '">' +
      '<div class="holo-quiz-back">' +
      '<div class="hq-corner hq-corner-tl"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
      '<div class="hq-center">' +
      sageOwlSVG(90, 99) +
      '<div class="holo-quiz-back-label">SAGE</div>' +
      '<div class="holo-quiz-back-sublabel">QUIZ</div>' +
      '</div>' +
      '<div class="holo-quiz-back-tagline">KNOWLEDGE IS POWER</div>' +
      '<div class="hq-corner hq-corner-br"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
      '</div>' +
      '<div class="holo-quiz-front">';
  }
  if (section.quiz) {
    var qz = section.quiz;
    if (qz.questions && Array.isArray(qz.questions)) {
      // Multi-question quiz
      var ms = (state.quizMultiState && state.quizMultiState[section.id]) || { current: 0, answers: {}, done: false };
      var totalQs = qz.questions.length;
      if (ms.done) {
        var msScore = 0;
        qz.questions.forEach(function(ques, qi) { if (ms.answers[qi] === ques.correct) msScore++; });
        var msPassed = msScore >= Math.ceil(totalQs * 0.7);
        q += '<div class="quiz-block">' +
          '<div class="quiz-label">KNOWLEDGE CHECK COMPLETE</div>' +
          '<div class="quiz-multi-results">' +
          '<div class="quiz-results-score">' + msScore + '<span> / ' + totalQs + '</span></div>' +
          '<div class="quiz-results-label">' + (msPassed ? 'Nicely done.' : 'Keep studying.') + '</div>' +
          '<div class="quiz-results-msg">' + (msPassed ? 'Section unlocked — mark it complete when ready.' : 'Review the material above, then try again.') + '</div>' +
          (!msPassed ? '<button class="quiz-retry-btn" onclick="retryMultiQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">Retry Quiz</button>' : '') +
          '</div></div>';
      } else {
        var cur = ms.current;
        var curQ = qz.questions[cur];
        var curAnswered = ms.answers && ms.answers[cur] !== undefined ? ms.answers[cur] : undefined;
        var pct = Math.round(cur / totalQs * 100);
        var mQzState = curAnswered !== undefined ? (curAnswered === curQ.correct ? 'correct' : 'wrong') : 'unanswered';
        q += '<div class="quiz-block" data-quiz-state="' + mQzState + '">' +
          '<div class="quiz-multi-header">' +
          '<div class="quiz-label">KNOWLEDGE CHECK</div>' +
          '<div class="quiz-multi-progress-label">Question ' + (cur + 1) + ' of ' + totalQs + '</div>' +
          '</div>' +
          '<div class="quiz-multi-bar"><div class="quiz-multi-bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="quiz-question">' + curQ.question + '</div>' +
          '<div class="quiz-options">';
        curQ.options.forEach(function(opt, oi) {
          var cls = '';
          if (curAnswered !== undefined) {
            if (oi === curQ.correct) cls = 'correct';
            else if (oi === curAnswered) cls = 'wrong';
          }
          var icon = '<span class="quiz-opt-icon">' + (cls === 'correct' ? '✓' : cls === 'wrong' ? '✗' : '') + '</span>';
          q += '<button class="quiz-option ' + cls + '" style="--i:' + oi + '" onclick="answerMultiQuiz(\'' + section.id + '\',' + cur + ',' + oi + ',' + fi + ',' + si + ')"' +
            (curAnswered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
        });
        var mFbHeader = '';
        if (curAnswered !== undefined) {
          var mFbCorrect = curAnswered === curQ.correct;
          mFbHeader = '<div class="quiz-feedback-header ' + (mFbCorrect ? 'correct' : 'wrong') + '">' +
            '<span class="quiz-feedback-icon">' + (mFbCorrect ? '✓' : '✗') + '</span>' +
            '<span class="quiz-feedback-title">' + (mFbCorrect ? 'Correct!' : 'Not quite.') + '</span>' +
            '</div><div class="quiz-feedback-body">' + curQ.feedback + '</div>';
        }
        q += '</div>' +
          '<div class="quiz-feedback ' + (curAnswered !== undefined ? 'visible' : '') + '">' +
          mFbHeader + '</div>';
        if (curAnswered !== undefined) {
          var isLast = cur === totalQs - 1;
          var mCurWrong = curAnswered !== curQ.correct;
          if (mCurWrong) {
            q += '<button class="quiz-retry-btn quiz-retry-inline" onclick="retryMultiQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">&#8635; Try Again</button>';
          }
          q += '<button class="quiz-next-btn" onclick="' + (isLast ? 'finishMultiQuiz' : 'nextMultiQuiz') + '(\'' + section.id + '\',' + fi + ',' + si + ')">' +
            (isLast ? 'See Results' : 'Next Question →') + '</button>';
        }
        q += '</div>';
      }
    } else {
      // Single-question quiz
      var qzState = answered !== undefined ? (answered === qz.correct ? 'correct' : 'wrong') : 'unanswered';
      q += '<div class="quiz-block" data-quiz-state="' + qzState + '"><div class="quiz-label">KNOWLEDGE CHECK</div>' +
        '<div class="quiz-question">' + qz.question + '</div><div class="quiz-options">';
      ((qz && qz.options) || []).forEach(function(opt, oi) {
        var cls = '';
        if (answered !== undefined) {
          if (oi === qz.correct) cls = 'correct';
          else if (oi === answered) cls = 'wrong';
        }
        var icon = '<span class="quiz-opt-icon">' + (cls === 'correct' ? '✓' : cls === 'wrong' ? '✗' : '') + '</span>';
        q += '<button class="quiz-option ' + cls + '" style="--i:' + oi + '" onclick="answerQuizTabbed(\'' + section.id + '\',' + oi + ',' + qz.correct + ',' + fi + ',' + si + ')"' +
          (answered !== undefined ? ' disabled' : '') + '>' + icon + opt + '</button>';
      });
      var fbHeader = '';
      if (answered !== undefined) {
        var fbCorrect = answered === qz.correct;
        fbHeader = '<div class="quiz-feedback-header ' + (fbCorrect ? 'correct' : 'wrong') + '">' +
          '<span class="quiz-feedback-icon">' + (fbCorrect ? '✓' : '✗') + '</span>' +
          '<span class="quiz-feedback-title">' + (fbCorrect ? 'Correct!' : 'Not quite.') + '</span>' +
          '</div><div class="quiz-feedback-body">' + qz.feedback + '</div>';
      }
      q += '</div><div class="quiz-feedback ' + (answered !== undefined ? 'visible' : '') + '" id="qf-' + section.id + '">' +
        fbHeader + '</div>' +
        (answered !== undefined && answered !== qz.correct
          ? '<button class="quiz-retry-btn quiz-retry-inline" onclick="retrySingleQuiz(\'' + section.id + '\',' + fi + ',' + si + ')">&#8635; Try Again</button>'
          : '') +
        '</div>';
    }
  } else {
    q += '<div class="quiz-block"><div class="quiz-label">READING SECTION</div>' +
      '<div style="font-size:14px;color:var(--text-dim);margin-top:8px;">Complete the reading, then mark as done below.</div></div>';
  }
  if (_holoCard) {
    q += '</div></div></div>'; // close holo-quiz-front, holo-quiz-inner, holo-quiz-card
  }
  q += '</div>';

  // NOTES
  var noteVal = localStorage.getItem('note_' + section.id) || '';
  var noteWords = noteVal.trim() ? noteVal.trim().split(/\s+/).length : 0;
  var n = '<div class="notes-panel">' +
    '<div class="notes-header">' +
      '<div class="notes-header-left">' +
        '<div>' +
          '<div class="notes-title">Your Notes</div>' +
          '<div class="notes-subtitle">Explain what you learned in your own words</div>' +
        '</div>' +
      '</div>' +
      '<div class="notes-save-status" id="notes-saved-' + section.id + '">Saved</div>' +
    '</div>' +
    '<div class="notes-prompt-card">' +
      '<div class="notes-prompt-q">What\'s the one thing to remember about <em>' + escHtml(section.title) + '</em>?</div>' +
      '<div class="notes-prompt-hint">No jargon. If you can explain it simply, you understand it.</div>' +
    '</div>' +
    '<textarea class="notes-textarea" id="notes-ta-' + section.id + '" placeholder="Start with the main idea, then say why it matters..." oninput="onNoteInput(\'' + section.id + '\')">' + escHtml(noteVal) + '</textarea>' +
    '<div class="notes-footer">' +
      '<span class="notes-wc-wrap">' +
        '<span class="notes-wordcount' + (noteWords >= 30 ? ' notes-wc-active' : '') + '" id="notes-wc-' + section.id + '">' + noteWords + ' word' + (noteWords !== 1 ? 's' : '') + '</span>' +
        '<span class="notes-wc-check' + (noteWords >= 30 ? ' visible' : '') + '" id="notes-wc-check-' + section.id + '">&#10003;</span>' +
      '</span>' +
      '<span class="notes-footer-hint">Auto-saved to your browser</span>' +
    '</div>' +
    '</div>';

  // GATE
  var g = '<div class="gate-box' + (isDone ? ' complete' : '') + '">' +
    '<div class="gate-label">TO COMPLETE THIS SECTION</div>' +
    '<div class="gate-checks">' +
    '<div class="gate-check-row done" id="gate-read-' + section.id + '"><div class="gate-check-dot">&#10003;</div>Read the section</div>' +
    '<div class="gate-check-row ' + (gate.code ? 'done' : '') + '" id="gate-code-' + section.id + '"><div class="gate-check-dot">' + (gate.code ? '&#10003;' : '') + '</div>Try the code editor</div>' +
    '<div class="gate-check-row ' + (gate.quiz ? 'done' : '') + '" id="gate-quiz-' + section.id + '"><div class="gate-check-dot">' + (gate.quiz ? '&#10003;' : '') + '</div>' + (section.quiz ? 'Pass the knowledge check' : 'Complete the checklist') + '</div>' +
    '</div>' +
    '<button class="complete-btn" id="complete-btn-' + section.id + '" onclick="completeSection(\'' + section.id + '\',' + fi + ',' + si + ')"' + (isDone ? ' disabled' : '') + '>' +
    (isDone ? '&#10003; Section Complete' : 'Mark as Complete \u2192 +' + getSectionXP(fi) + ' XP') +
    '</button></div>';

  // NAV
  var nav = '<div class="section-nav">' +
    '<button class="nav-btn" onclick="prevSection(' + fi + ',' + si + ')"' + ((fi === 0 && si === 0) ? ' disabled' : '')  + '>&#8592; Previous</button>' +
    '<button class="nav-btn primary" onclick="nextSection(' + fi + ',' + si + ')">' +
  ((fi === FLOORS.length - 1 && si === floor.sections.length - 1)
  ? (fi < FLOORS.length - 1 ? 'Next Floor \u2192' : 'Complete')
  : 'Next \u2192') +
    '</button></div>';

if (!isLoggedIn && !isGuest) {
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('cover').style.display = 'none';
  document.body.style.overflow = 'hidden';
  return;
}
  document.getElementById('main-content').innerHTML = tabs +
    '<div class="section-panel active" id="spanel-read-' + section.id + '">' + r + '</div>' +
    (showEditor ? '<div class="section-panel" id="spanel-code-' + section.id + '">' + c + '</div>' : '') +
    (showQuiz ? '<div class="section-panel" id="spanel-quiz-' + section.id + '">' + q + '</div>' : '') +
    '<div class="section-panel" id="spanel-notes-' + section.id + '">' + n + '</div>' +
    g + nav;

  var _mc = document.getElementById('main-content');
  if (_mc) {
    _mc.classList.remove('section-slide-out-left', 'section-slide-out-right');
    _mc.classList.remove('section-slide-in', 'section-slide-in-left');
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        if (_mc) _mc.classList.add('section-slide-in');
      });
    });
  }
  document.getElementById('main-content').scrollTop = 0;
  window.scrollTo(0, 0);
  startSectionTimer(section.id);
  checkProgressNudge(fi, si);
  checkStreakProtection();
  if (showEditor) setTimeout(function() { initEditor(section.id, editorDef.code); }, 100);
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function switchSectionTab(tab, sectionId, btn) {
  var mc = document.getElementById('main-content');
  mc.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
  mc.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById('spanel-' + tab + '-' + sectionId);
  if (panel) panel.classList.add('active');
  if (tab === 'code') {
    var fi = state.currentFloor - 1;
    var section = FLOORS[fi].sections[state.currentSection];
    setTimeout(function() {
      initEditor(sectionId, getEditorDefaults(section).code);
      markGate(sectionId, 'code');
    }, 150);
    sageMessage('Write code. Break it. Fix it. That process is the actual learning.', 'tip');
  }
  if (tab === 'quiz') sageMessage('Take your time. The explanation after the answer matters as much as getting it right.', 'tip');
  if (tab === 'read') sageMessage('Read it like a road sign. Extract the pattern. Move on.', 'encourage');
  if (tab === 'notes') {
    updateNoteWordCount(sectionId);
    sageMessage('Writing what you learned in your own words is the best revision tool there is.', 'tip');
  }
}

function onNoteInput(sectionId) {
  updateNoteWordCount(sectionId);
  var ind = document.getElementById('notes-saved-' + sectionId);
  if (ind) { ind.textContent = 'Saving…'; ind.classList.remove('saved'); }
  clearTimeout(window._noteSaveTimer);
  window._noteSaveTimer = setTimeout(function() { saveNote(sectionId); }, 500);
}

function saveNote(sectionId) {
  var ta = document.getElementById('notes-ta-' + sectionId);
  if (!ta) return;
  localStorage.setItem('note_' + sectionId, ta.value);
  var ind = document.getElementById('notes-saved-' + sectionId);
  if (ind) { ind.textContent = 'Saved'; ind.classList.add('saved'); }
}

function updateNoteWordCount(sectionId) {
  var ta = document.getElementById('notes-ta-' + sectionId);
  var wc = document.getElementById('notes-wc-' + sectionId);
  var check = document.getElementById('notes-wc-check-' + sectionId);
  if (!ta || !wc) return;
  var words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
  wc.textContent = words + ' word' + (words !== 1 ? 's' : '');
  if (words >= 30) {
    wc.classList.add('notes-wc-active');
    if (check) check.classList.add('visible');
  } else {
    wc.classList.remove('notes-wc-active');
    if (check) check.classList.remove('visible');
  }
}

function openNotesReview() {
  var notesHtml = '';
  var totalNotes = 0;
  FLOORS.forEach(function(floor, fi) {
    var floorNotes = [];
    floor.sections.forEach(function(sec) {
      var note = localStorage.getItem('note_' + sec.id);
      if (note && note.trim()) {
        floorNotes.push({ title: sec.title, note: note });
        totalNotes++;
      }
    });
    if (floorNotes.length > 0) {
      notesHtml += '<div class="nr-floor-group">';
      notesHtml += '<div class="nr-floor-title" style="color:' + (floor.color || '#c8a96e') + '">Floor ' + (fi + 1) + ' — ' + floor.title + '</div>';
      floorNotes.forEach(function(item) {
        notesHtml += '<div class="nr-note-item">' +
          '<div class="nr-section-title">' + escHtml(item.title) + '</div>' +
          '<div class="nr-note-text">' + escHtml(item.note).replace(/\n/g, '<br>') + '</div>' +
          '</div>';
      });
      notesHtml += '</div>';
    }
  });
  if (totalNotes === 0) {
    notesHtml = '<div class="nr-empty">' +
      '<div class="nr-empty-icon">📝</div>' +
      '<div class="nr-empty-text">No notes yet. As you work through sections, jot down what you\'ve learned in the Notes tab — it\'ll all appear here for review.</div>' +
      '</div>';
  }
  var overlay = document.getElementById('notes-review-overlay');
  if (!overlay) return;
  overlay.innerHTML = '<div class="nr-panel">' +
    '<div class="nr-header">' +
      '<div class="nr-header-left">' +
        '<div class="nr-title">Your Notes</div>' +
        '<div class="nr-sub">' + totalNotes + ' note' + (totalNotes !== 1 ? 's' : '') + ' across your journey</div>' +
      '</div>' +
      '<button class="nr-close" onclick="closeNotesReview()">&#x2715;</button>' +
    '</div>' +
    '<div class="nr-body">' + notesHtml + '</div>' +
    '</div>';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeNotesReview() {
  var overlay = document.getElementById('notes-review-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function markGate(sectionId, key) {
  if (!sectionGateState[sectionId]) sectionGateState[sectionId] = { read: true, code: false, quiz: false };
  if (sectionGateState[sectionId][key]) return;
  sectionGateState[sectionId][key] = true;
  var el = document.getElementById('gate-' + key + '-' + sectionId);
  if (el) {
    el.classList.add('done');
    var dot = el.querySelector('.gate-check-dot');
    if (dot) {
      dot.innerHTML = '&#10003;';
      dot.style.animation = 'none';
      requestAnimationFrame(function() { dot.style.animation = 'checkTick 0.3s ease'; });
    }
  }
  var gate = sectionGateState[sectionId];
  if (gate.read && gate.code && gate.quiz) {
    var btn = document.getElementById('complete-btn-' + sectionId);
    if (btn && !btn.disabled) btn.textContent = 'Mark as Complete \u2192 +' + getSectionXP(state.currentFloor - 1) + ' XP';
    sageMessage('All gates cleared. Mark this section complete when ready.', 'celebrate');
  }
}

function answerQuizTabbed(sectionId, chosen, correct, fi, si) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
    markGate(sectionId, 'quiz');
    var secName = FLOORS[fi] && FLOORS[fi].sections[si] ? FLOORS[fi].sections[si].title : sectionId;
    logActivity('quiz', 'Quiz: ' + secName, 15);
  }
  renderFloor(fi, si);
  setTimeout(function() {
    var quizPanel = document.getElementById('spanel-quiz-' + sectionId);
    if (quizPanel) {
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ if (b.textContent === 'Quiz') b.classList.add('active'); });
      quizPanel.classList.add('active');
    }
  }, 50);
}

function _focusQuizPanel(sectionId) {
  setTimeout(function() {
    var quizPanel = document.getElementById('spanel-quiz-' + sectionId);
    if (quizPanel) {
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
      document.querySelectorAll('.section-tab-btn').forEach(function(b){ if (b.textContent === 'Quiz') b.classList.add('active'); });
      quizPanel.classList.add('active');
    }
  }, 50);
}

function answerMultiQuiz(sectionId, qIndex, chosen, fi, si) {
  if (!state.quizMultiState) state.quizMultiState = {};
  if (!state.quizMultiState[sectionId]) state.quizMultiState[sectionId] = { current: 0, answers: {}, done: false };
  var ms = state.quizMultiState[sectionId];
  if (ms.answers[qIndex] !== undefined) return;
  ms.answers[qIndex] = chosen;
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function nextMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState || !state.quizMultiState[sectionId]) return;
  state.quizMultiState[sectionId].current++;
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function finishMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState || !state.quizMultiState[sectionId]) return;
  var ms = state.quizMultiState[sectionId];
  ms.done = true;
  var section = FLOORS[fi] && FLOORS[fi].sections[si];
  if (section && section.quiz && section.quiz.questions) {
    var total = section.quiz.questions.length;
    var score = 0;
    section.quiz.questions.forEach(function(ques, qi) { if (ms.answers[qi] === ques.correct) score++; });
    if (score >= Math.ceil(total * 0.7)) {
      awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
      markGate(sectionId, 'quiz');
      logActivity('quiz', 'Quiz: ' + section.title, 15);
    }
  }
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function retryMultiQuiz(sectionId, fi, si) {
  if (!state.quizMultiState) state.quizMultiState = {};
  state.quizMultiState[sectionId] = { current: 0, answers: {}, done: false };
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

function retrySingleQuiz(sectionId, fi, si) {
  delete state.quizAnswered[sectionId];
  saveState();
  renderFloor(fi, si);
  _focusQuizPanel(sectionId);
}

var editorTimers = {};

function initEditor(sectionId, defaultCode) {
  var ta = document.getElementById('editor-' + sectionId);
  if (!ta) return;
  var saved = localStorage.getItem('code_' + sectionId);
  // Use saved code if available, otherwise fall back to the provided default
  ta.value = saved || defaultCode || '';
  updateEditorLines(sectionId);
  runEditorCode(sectionId);
}

function editorInput(sectionId) {
  updateEditorLines(sectionId);
  var ta = document.getElementById('editor-' + sectionId);
  if (ta) localStorage.setItem('code_' + sectionId, ta.value);
  clearTimeout(editorTimers[sectionId]);
  editorTimers[sectionId] = setTimeout(function(){ runEditorCode(sectionId); }, 700);
}

function runEditor(sectionId) {
  runEditorCode(sectionId);
  markGate(sectionId, 'code');
}

function runEditorCode(sectionId) {
  var ta = document.getElementById('editor-' + sectionId);
  var frame = document.getElementById('preview-' + sectionId);
  var con = document.getElementById('console-' + sectionId);
  if (!ta || !frame) return;
  try {
    frame.srcdoc = ta.value;
    if (con) con.innerHTML = '<div class="editor-console-line ok">&#9658; Rendered successfully</div>';
    markGate(sectionId, 'code');
  } catch(e) {
    if (con) con.innerHTML = '<div class="editor-console-line err">&#9658; Error: ' + e.message + '</div>';
  }
}

function resetEditor(sectionId) {
  var fi = state.currentFloor - 1;
  var section = FLOORS[fi].sections[state.currentSection];
  var ta = document.getElementById('editor-' + sectionId);
  if (ta) {
    ta.value = getEditorDefaults(section).code;
    localStorage.removeItem('code_' + sectionId);
    updateEditorLines(sectionId);
    runEditorCode(sectionId);
  }
}

function updateEditorLines(sectionId) {
  var ta = document.getElementById('editor-' + sectionId);
  var nums = document.getElementById('lines-' + sectionId);
  if (!ta || !nums) return;
  var lines = ta.value.split('\n').length;
  var html = '';
  for (var i = 1; i <= Math.max(lines, 10); i++) html += i + '<br>';
  nums.innerHTML = html;
}

function handleEditorTab(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    var t = e.target;
    var s = t.selectionStart;
    t.value = t.value.substring(0, s) + '  ' + t.value.substring(t.selectionEnd);
    t.selectionStart = t.selectionEnd = s + 2;
    updateEditorLines(t.id.replace('editor-', ''));
  }
}



function switchTopNav(tab, btn) {
  // Update top bar tabs
  document.querySelectorAll('.top-nav-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn && btn.classList && btn.classList.contains('top-nav-tab')) btn.classList.add('active');

  // Update mobile bottom bar
  document.querySelectorAll('.mob-nav-btn').forEach(function(b){ b.classList.remove('active'); });
  var mobMap = { learn: 'mob-learn', build: 'mob-build', challenge: 'mob-challenge', map: 'mob-map', tools: 'mob-tools', premium: 'mob-premium', profile: 'mob-profile', revision: 'mob-revision' };
  if (mobMap[tab]) {
    var mb = document.getElementById(mobMap[tab]);
    if (mb) mb.classList.add('active');
  }

  // Premium full-page mode — hide sidebars when on premium tab
  if (tab === 'premium') {
    document.body.classList.add('premium-mode');
  } else {
    document.body.classList.remove('premium-mode');
  }

  // Learn space mode — deep space background on main col
  if (tab === 'learn') {
    document.body.classList.add('learn-mode');
  } else {
    document.body.classList.remove('learn-mode');
  }

  // Profile mode — theme tint on main col only when on profile tab
  if (tab === 'profile') {
    document.body.classList.add('profile-mode');
  } else {
    document.body.classList.remove('profile-mode');
  }

  // Game mode — full viewport, no sidebars
  if (tab === 'game') {
    document.body.classList.add('game-mode');
  } else {
    document.body.classList.remove('game-mode');
  }

  // Reset revision deck when navigating away
  if (tab !== 'revision') _revDealtSession = false;

  // Show/hide panels
  document.querySelectorAll('.top-panel').forEach(function(p){ p.classList.remove('active'); });
  var mainContent = document.getElementById('main-content');
  var ls = document.getElementById('left-sidebar');

  if (tab === 'learn') {
    if (mainContent) mainContent.style.display = '';
    renderLearnHub();
  } else {
    stopHubCanvas();
    if (mainContent) mainContent.style.display = 'none';
    if (ls) ls.style.display = 'none';
    var panel = document.getElementById('panel-' + tab);
    if (panel) {
      panel.classList.add('active');
      if (tab === 'build') renderBuildPanel();
      if (tab === 'challenge') renderChallengePanel();
      if (tab === 'map') renderMapPanel();
      if (tab === 'tools') renderToolsPanel();
      if (tab === 'premium') renderPremiumPanel();
      if (tab === 'profile') renderProfilePanel();
      if (tab === 'game') renderGamePanel();
      if (tab === 'revision') renderRevisionPanel();
    }
  }

  // Scroll to top
  var mainCol = document.getElementById('main-col');
  if (mainCol) mainCol.scrollTop = 0;
}
function setMobActive(btn) {
  document.querySelectorAll('.mob-nav-btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
}

function toggleSidebar() {
  var sb = document.getElementById('left-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.toggle('open');
  if (ov) ov.classList.toggle('visible');
}

function closeSidebar() {
  var sb = document.getElementById('left-sidebar');
  var ov = document.getElementById('sidebar-overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
}

var FLOOR_COLORS = ['#c8a96e','#7eb8c8','#c87e9a','#9a7ec8','#7ec8a9','#c8967e','#e8d5a0'];

function renderVisualBuilding() {
  var wrap = document.getElementById('vb-building');
  if (!wrap) return;
  var roof = wrap.querySelector('.vb-roof');
  wrap.innerHTML = '';
  if (roof) { wrap.appendChild(roof); } else {
    var r = document.createElement('div');
    r.className = 'vb-roof';
    wrap.appendChild(r);
  }
  for (var i = FLOORS.length - 1; i >= 0; i--) {
    var color = FLOOR_COLORS[i] || '#c8a96e';
    var isUnlocked = true; // all floors unlocked
    var isActive = (state.currentFloor - 1) === i;
    var isComplete = isFloorComplete(i);
    var div = document.createElement('div');
    div.className = 'vb-floor-row' +
      (isActive ? ' vb-active' : '') +
      (isUnlocked ? ' vb-unlocked' : ' vb-locked');
    div.style.setProperty('--floor-color', color);
    if (isUnlocked) {
      div.onclick = (function(fi){ return function(){ goToFloor(fi); closeSidebar(); }; })(i);
    }
    div.innerHTML = '<div class="vb-wins"><div class="vb-win"></div><div class="vb-win"></div><div class="vb-win"></div></div>' +
      (isComplete ? '<div class="vb-fnum">\u2713</div>' : '');
    wrap.appendChild(div);
  }
}

function renderLeftNav() {
  var nav = document.getElementById('left-floor-nav');
  if (!nav) return;
  nav.innerHTML = '';

  var fi = state.currentFloor - 1;
  var floor = FLOORS[fi];
  if (!floor) return;
  var floorColor = floor.color || '#c8a96e';
  var floorNum = (fi + 1 < 10 ? '0' : '') + (fi + 1);

  // Set floor colour as a CSS variable so section items can use it
  nav.style.setProperty('--floor-color', floorColor);

  // Floor identity header
  var identity = document.createElement('div');
  identity.className = 'left-floor-identity';
  identity.innerHTML =
    '<div class="left-floor-id-tag" style="color:' + floorColor + '">FLOOR ' + floorNum + '</div>' +
    '<div class="left-floor-id-name">' + floor.title + '</div>' +
    '<div class="left-floor-id-divider" style="background:' + floorColor + '"></div>';
  nav.appendChild(identity);

  // Sections for current floor
  var secList = document.createElement('div');
  secList.className = 'left-section-list';
  floor.sections.forEach(function(sec, si) {
    var isDone = !!state.completed[sec.id];
    var isCurrent = si === state.currentSection;
    var item = document.createElement('div');
    item.className = 'left-section-item' + (isCurrent ? ' current' : '') + (isDone ? ' done' : '');
    item.innerHTML = '<div class="left-section-dot"></div>' + sec.title;
    item.onclick = (function(fii, sii){ return function(){ goToSection(fii, sii); closeSidebar(); }; })(fi, si);
    secList.appendChild(item);
  });
  nav.appendChild(secList);
}

function renderRightNav() {
  var fi = state.currentFloor - 1;
  var floor = FLOORS[fi];
  var label = document.getElementById('rs-floor-label');
  if (label) label.textContent = 'FLOOR ' + state.currentFloor + ' \u2014 SECTIONS';
  var list = document.getElementById('rs-section-list');
  if (list) {
    list.innerHTML = '';
    floor.sections.forEach(function(sec, si) {
      var isDone = !!state.completed[sec.id];
      var isCurrent = si === state.currentSection;
      var item = document.createElement('div');
      item.className = 'sec-progress-item' + (isCurrent ? ' sp-active' : '') + (isDone ? ' sp-done' : '');
      item.innerHTML = '<div class="sp-dot">' + (isDone ? '&#10003;' : (si+1)) + '</div><span>' + sec.title + '</span>';
      item.onclick = (function(sii){ return function(){ goToSection(fi, sii); }; })(si);
      list.appendChild(item);
    });
  }
  updateDailyGoalBar();
  updateAchievements();
  updateTopChips();
  updateLeftStats();
}

function updateTopChips() {
  var xp = document.getElementById('top-xp-chip');
  var st = document.getElementById('top-streak-chip');
  if (xp) xp.textContent = '\u26a1 ' + (state.xp || 0) + ' XP';
  if (st) st.textContent = '\uD83D\uDD25 ' + (state.streak || 0);
}

function getLevelName(n) {
  return ['','Curious','Learning','Building','Fluent','Advanced','Expert','Master'][n] || '';
}

function updateLeftStats() {
  var lvl = getCurrentLevel();
  var idx = 0;
  for (var i = 0; i < LEVELS.length; i++) { if (LEVELS[i] === lvl) { idx = i; break; } }
  var nextLvl = LEVELS[idx + 1];
  var lsLevel = document.getElementById('ls-level');
  var lsStreak = document.getElementById('ls-streak');
  var lsBar = document.getElementById('ls-xp-bar');
  var lsProgress = document.getElementById('ls-progress');
  if (lsLevel) lsLevel.textContent = lvl.level + ' \u2014 ' + getLevelName(lvl.level);
  if (lsStreak) lsStreak.textContent = '\uD83D\uDD25 ' + (state.streak || 0) + ' days';
  if (lsBar && nextLvl) {
    var pct = Math.min(100, Math.round(((state.xp - lvl.xp) / (nextLvl.xp - lvl.xp)) * 100));
    lsBar.style.width = pct + '%';
  }
  if (lsProgress) {
    var total = 0, done = 0;
    FLOORS.forEach(function(f){ f.sections.forEach(function(s){ total++; if (state.completed[s.id]) done++; }); });
    lsProgress.textContent = Math.round((done/total)*100) + '%';
  }
}

function updateDailyGoalBar() {
  var today = new Date().toDateString();
  var todayKey = 'daily_sections_' + today;
  var todaySecs = parseInt(localStorage.getItem(todayKey) || '0');
  var goal = parseInt(localStorage.getItem('codebook_daily_goal') || '1');
  var pct = Math.min(100, Math.round((todaySecs / goal) * 100));
  var remaining = Math.max(0, goal - todaySecs);
  var bar = document.getElementById('rs-goal-bar');
  var txt = document.getElementById('rs-goal-text');
  var pctEl = document.getElementById('rs-goal-pct');
  var sub = document.getElementById('rs-goal-sub');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = todaySecs + ' of ' + goal + ' sections';
  if (pctEl) pctEl.textContent = pct + '%';
  if (sub) sub.textContent = remaining > 0 ? remaining + ' more to hit your daily goal' : 'Daily goal complete! \uD83C\uDF89';
}

function updateAchievements() {
  var items = document.querySelectorAll('.ach-item');
  var checks = [
    isFloorComplete(0),
    (state.streak || 0) >= 7,
    Object.keys(localStorage).some(function(k){ return k.indexOf('code_') === 0; }),
    isFloorComplete(1),
    isFloorComplete(6),
    (state.streak || 0) >= 30
  ];
  items.forEach(function(item, i) {
    if (checks[i]) item.classList.remove('ach-locked');
    else item.classList.add('ach-locked');
  });
}

function updateSageSidebar(text) {
  var el = document.getElementById('sage-sidebar-text');
  if (!el || !text) return;
  el.style.opacity = '0';
  setTimeout(function() { el.textContent = text; el.style.opacity = '1'; }, 200);
}

function renderAllNav() {
  renderVisualBuilding();
  renderLeftNav();
  renderRightNav();
}

function initSageSidebarSync() {
  var orig = window.sageMessage;
  if (orig) {
    window.sageMessage = function(text, mood) {
      orig.call(this, text, mood);
      updateSageSidebar(text);
    };
  }
}

// Patch renderNav to also update sidebars
// Guard flag prevents infinite recursion (renderNav -> renderAllNav -> renderLeftNav -> goToFloor -> renderNav)
var _origRenderNav = null;
var _renderNavRunning = false;
function patchRenderNav() {
  _origRenderNav = window.renderNav;
  if (_origRenderNav) {
    window.renderNav = function() {
      if (_renderNavRunning) return;
      _renderNavRunning = true;
      try {
        _origRenderNav();
        renderAllNav();
      } finally {
        _renderNavRunning = false;
      }
    };
  }
}

function answerQuiz(sectionId, chosen, correct) {
  state.quizAnswered[sectionId] = chosen;
  if (chosen === correct) {
    awardXP(15, 'quiz-' + sectionId, window.innerWidth / 2, 300);
  }
  const fi = state.currentFloor - 1;
  const si = state.currentSection;
  renderFloor(fi, si);
}

function toggleCheck(key, el) {
  // Checklist items are stored in a separate dict so they don't pollute
  // state.completed (which tracks section completion) or distort progress %.
  if (!state.checklistDone) state.checklistDone = {};
  state.checklistDone[key] = !state.checklistDone[key];
  el.classList.toggle('checked');
  el.querySelector('.check-box').textContent = state.checklistDone[key] ? '\u2713' : '';
  if (state.checklistDone[key]) {
    el.classList.add('just-checked');
    setTimeout(() => el.classList.remove('just-checked'), 400);
    const rect = el.getBoundingClientRect();
    awardXP(30, 'check-' + key, rect.left + rect.width / 2, rect.top);
  }
  saveState();
}

// \u2500\u2500 ACTIVITY TRACKING \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function logActivity(type, label, xp) {
  var log = JSON.parse(localStorage.getItem('codebook_activity') || '[]');
  log.unshift({
    type: type,
    label: label,
    xp: xp || 0,
    time: Date.now()
  });
  // Keep last 20 entries
  if (log.length > 20) log = log.slice(0, 20);
  localStorage.setItem('codebook_activity', JSON.stringify(log));
}

function getActivityLog() {
  return JSON.parse(localStorage.getItem('codebook_activity') || '[]');
}

function timeAgo(ts) {
  var diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return 'just now';
  if (diff < 60) return diff + 'm ago';
  var h = Math.floor(diff / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

// \u2500\u2500 FLOOR 1 LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var FC_FLOOR_TOPICS = [
  ['How the Internet Actually Works', 'How a Computer Reads Instructions', 'The Logic Behind All Code', 'Your First Look at Real Code', 'Floor 1 Check — Explain It Back'],
  ['What HTML Is', 'What CSS Is', 'How a Browser Renders Code', 'Building Your First Page', 'Styling Basics', 'The Box Model', 'Flexbox Layout', 'Building a Real Component', 'Profile Page Project', 'Solo Project — No Template'],
  ['What JavaScript Does', 'Variables and Data Types', 'Logic and Conditions', 'Functions', 'Loops', 'Arrays and Objects', 'DOM Manipulation', 'Events', 'Error Handling and Debugging', 'Guided To-Do List Project', 'Solo Interactive Project', 'Floor Check'],
  ['How Developers Think', 'Reading Documentation', 'What APIs Are', 'Fetch and Async/Await', 'Local Storage', 'Error Handling at Scale', 'Git and Version Control', 'Debugging Like a Developer', 'Weather App with Real API', 'Quiz App with Score Tracking', 'Solo Project — No Brief', 'Code Review of Own Work'],
  ['What Full Stack Means', 'How Servers Work', 'Databases', 'Authentication', 'Node and Express', 'Connecting to a Database', 'Building a REST API', 'Environment Variables and Security', 'Deployment', 'Connecting Frontend to Backend', 'Guided Full Stack Notes App', 'Adding Authentication', 'Deploying It Live', 'Solo Full Stack Project'],
  ['The Fork in the Road', 'Frontend Engineering', 'Backend Engineering', 'Full Stack vs Specialised', 'Mobile Development', 'DevOps and Cloud Infrastructure', 'Data Engineering', 'AI and ML Engineering', 'Security Engineering', 'Building a Portfolio That Works', 'Technical Interview Preparation', 'Open Source Contribution', 'Building in Public', 'Choosing Your First Role'],
  ['Your First Week', 'Reading a Large Codebase', 'Code Reviews', 'Technical Debt and Refactoring', 'System Design', 'Engineering in Teams', 'Production and On-Call', 'The Career Ladder', 'Engineering Leadership', 'The Long Game']
];

var FC_FLOOR_ICONS = ['🧠', '🌐', '⚡', '💡', '🔧', '🚀', '🏆'];

var FC_SAGE_POSES = [
  // Floor 1: Classic lecturer — cane angled forward, owl facing right
  { flip: 1,  angle: 28,  quote: 'Every expert started exactly here. Take your time.' },
  // Floor 2: Leaning in — cane pointing at the page
  { flip: 1,  angle: 50,  quote: 'The web is three files working together. Simple as that.' },
  // Floor 3: Energetic — cane thrust forward
  { flip: -1, angle: -30, quote: 'This floor changes everything. Pay close attention.' },
  // Floor 4: Thoughtful — cane horizontal like a pointer
  { flip: 1,  angle: 80,  quote: 'This is where you start thinking like a developer.' },
  // Floor 5: Firm — cane planted straight down
  { flip: 1,  angle: 10,  quote: 'Front end. Back end. One mind.' },
  // Floor 6: Surveying — cane swept wide
  { flip: -1, angle: -55, quote: 'Many paths open from here. All of them good.' },
  // Floor 7: Triumphant — cane raised high like a scepter
  { flip: 1,  angle: -70, quote: 'Your final floor. You have come a long way.' },
];


function toggleFloorInfo(fi) {
  var overlay = document.getElementById('fc-modal-overlay');
  if (!overlay) return;
  var floor = FLOORS[fi];
  if (!floor) return;
  var color = floor.color || '#c8a96e';
  var r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  var glow = 'rgba('+r+','+g+','+b+',0.35)';
  var modal = document.getElementById('fc-modal');
  modal.style.setProperty('--fc-modal-color', color);
  modal.style.setProperty('--fc-modal-glow', glow);
  document.getElementById('fc-modal-badge').textContent = 'FLOOR ' + (fi + 1);
  document.getElementById('fc-modal-badge').style.color = color;
  document.getElementById('fc-modal-icon').textContent = FC_FLOOR_ICONS[fi] || '📚';
  document.getElementById('fc-modal-title').textContent = floor.title;
  var topics = FC_FLOOR_TOPICS[fi] || [];
  document.getElementById('fc-modal-list').innerHTML = topics.map(function(t) { return '<li>' + t + '</li>'; }).join('');
  var pose = FC_SAGE_POSES[fi] || FC_SAGE_POSES[0];
  var sageEl = document.getElementById('fc-modal-sage');
  if (sageEl) {
    sageEl.innerHTML =
      '<div class="fc-sage-figure">' +
        '<span class="fc-sage-owl" style="transform:scaleX(' + pose.flip + ')">' + sageOwlSVG(38, 42) + '</span>' +
        '<div class="fc-sage-cane" style="transform:rotate(' + pose.angle + 'deg)"></div>' +
      '</div>' +
      '<div class="fc-sage-quote">' + pose.quote + '</div>';
  }
  overlay.classList.remove('fc-modal-hidden');
  document.body.style.overflow = 'hidden';
}

function closeFloorModal() {
  var overlay = document.getElementById('fc-modal-overlay');
  if (overlay) overlay.classList.add('fc-modal-hidden');
  document.body.style.overflow = '';
}

function getFloorIcon(fi) {
  var fid = 'hfi' + fi;
  var flt = '<defs><filter id="' + fid + '" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var open = '<svg viewBox="0 0 48 48" width="44" height="44" class="holo-icon" style="display:block;margin:0 auto;overflow:visible">' + flt + '<g filter="url(#' + fid + ')">';
  var close = '</g></svg>';
  var s  = ';fill:none;stroke:var(--fc-color)';
  var sf = 'fill:var(--fc-color)';
  var d  = ';opacity:0.4';

  var icons = [
    // 0 — Neural Core: hexagonal neural lattice with nodes
    open +
    '<polygon points="24,4 41,14 41,34 24,44 7,34 7,14" style="stroke-width:1.2' + s + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="44" style="stroke-width:0.6' + s + d + '"/>' +
    '<line x1="7" y1="14" x2="41" y2="34" style="stroke-width:0.6' + s + d + '"/>' +
    '<line x1="41" y1="14" x2="7" y2="34" style="stroke-width:0.6' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2.2" style="' + sf + '"/>' +
    '<circle cx="41" cy="14" r="2.2" style="' + sf + '"/>' +
    '<circle cx="41" cy="34" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2.2" style="' + sf + '"/>' +
    '<circle cx="7" cy="34" r="2.2" style="' + sf + '"/>' +
    '<circle cx="7" cy="14" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="24" r="5" style="stroke-width:1.2' + s + '"/>' +
    '<circle cx="24" cy="24" r="2" style="' + sf + '"/>' +
    close,

    // 1 — Digital Network Sphere: wireframe globe
    open +
    '<circle cx="24" cy="24" r="20" style="stroke-width:1.5' + s + '"/>' +
    '<ellipse cx="24" cy="24" rx="20" ry="7" style="stroke-width:0.9' + s + '"/>' +
    '<ellipse cx="24" cy="24" rx="7" ry="20" style="stroke-width:0.9' + s + '"/>' +
    '<line x1="4" y1="24" x2="44" y2="24" style="stroke-width:0.5' + s + d + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="44" style="stroke-width:0.5' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2" style="' + sf + '"/>' +
    '<circle cx="4" cy="24" r="2" style="' + sf + '"/>' +
    '<circle cx="44" cy="24" r="2" style="' + sf + '"/>' +
    '<circle cx="24" cy="24" r="2.5" style="' + sf + '"/>' +
    close,

    // 2 — Energy Surge: crystalline lightning bolt
    open +
    '<polygon points="29,3 14,26 22,26 18,45 34,22 26,22" style="stroke-width:1.8;stroke-linejoin:miter' + s + '"/>' +
    '<line x1="27" y1="9" x2="22" y2="26" style="stroke-width:0.7' + s + d + '"/>' +
    '<line x1="26" y1="22" x2="21" y2="40" style="stroke-width:0.7' + s + d + '"/>' +
    '<circle cx="29" cy="3" r="2.2" style="' + sf + '"/>' +
    '<circle cx="18" cy="45" r="2.2" style="' + sf + '"/>' +
    '<circle cx="22" cy="26" r="1.5" style="' + sf + ';opacity:0.75"/>' +
    '<circle cx="26" cy="22" r="1.5" style="' + sf + ';opacity:0.75"/>' +
    close,

    // 3 — Innovation Crystal: cut-gem wireframe (diamond)
    open +
    '<polygon points="24,4 42,24 24,44 6,24" style="stroke-width:1.5' + s + '"/>' +
    '<polygon points="24,14 34,24 24,34 14,24" style="stroke-width:1' + s + '"/>' +
    '<line x1="24" y1="4" x2="24" y2="14" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="42" y1="24" x2="34" y2="24" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="24" y1="44" x2="24" y2="34" style="stroke-width:0.8' + s + d + '"/>' +
    '<line x1="6" y1="24" x2="14" y2="24" style="stroke-width:0.8' + s + d + '"/>' +
    '<circle cx="24" cy="4" r="2.2" style="' + sf + '"/>' +
    '<circle cx="42" cy="24" r="2.2" style="' + sf + '"/>' +
    '<circle cx="24" cy="44" r="2.2" style="' + sf + '"/>' +
    '<circle cx="6" cy="24" r="2.2" style="' + sf + '"/>' +
    close,

    // 4 — Engineering Glyph: hexagon + circuit ring
    open +
    '<polygon points="24,4 41,14 41,34 24,44 7,34 7,14" style="stroke-width:1.5' + s + '"/>' +
    '<circle cx="24" cy="24" r="9" style="stroke-width:1.2' + s + '"/>' +
    '<line x1="24" y1="15" x2="24" y2="4" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="24" y1="33" x2="24" y2="44" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="32" y1="19" x2="41" y2="14" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="32" y1="29" x2="41" y2="34" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="16" y1="19" x2="7" y2="14" style="stroke-width:0.9' + s + d + '"/>' +
    '<line x1="16" y1="29" x2="7" y2="34" style="stroke-width:0.9' + s + d + '"/>' +
    '<circle cx="24" cy="24" r="2.5" style="' + sf + '"/>' +
    close,

    // 5 — Starship Launch: delta-wing fuselage
    open +
    '<polygon points="24,3 32,22 29,22 29,38 19,38 19,22 16,22" style="stroke-width:1.5;stroke-linejoin:round' + s + '"/>' +
    '<polygon points="19,28 10,40 19,40" style="stroke-width:1' + s + '"/>' +
    '<polygon points="29,28 38,40 29,40" style="stroke-width:1' + s + '"/>' +
    '<circle cx="24" cy="17" r="3.5" style="stroke-width:1' + s + '"/>' +
    '<line x1="21" y1="39" x2="19" y2="46" style="stroke-width:1.2' + s + d + '"/>' +
    '<line x1="24" y1="39" x2="24" y2="47" style="stroke-width:1.5' + s + ';opacity:0.55"/>' +
    '<line x1="27" y1="39" x2="29" y2="46" style="stroke-width:1.2' + s + d + '"/>' +
    '<circle cx="24" cy="3" r="2" style="' + sf + '"/>' +
    close,

    // 6 — Mastery Crest: shield + geometric star + crown points
    open +
    '<path d="M24,4 L38,10 L38,27 Q38,40 24,46 Q10,40 10,27 L10,10 Z" style="stroke-width:1.5' + s + '"/>' +
    '<polygon points="24,13 26,20 33,20 27.5,24.5 29.5,32 24,27.5 18.5,32 20.5,24.5 15,20 22,20" style="stroke-width:0.9' + s + '"/>' +
    '<line x1="18" y1="10" x2="18" y2="5" style="stroke-width:1' + s + ';opacity:0.7"/>' +
    '<line x1="24" y1="10" x2="24" y2="4" style="stroke-width:1.2' + s + ';opacity:0.85"/>' +
    '<line x1="30" y1="10" x2="30" y2="5" style="stroke-width:1' + s + ';opacity:0.7"/>' +
    '<circle cx="18" cy="4.5" r="1.5" style="' + sf + '"/>' +
    '<circle cx="24" cy="3" r="2" style="' + sf + '"/>' +
    '<circle cx="30" cy="4.5" r="1.5" style="' + sf + '"/>' +
    '<circle cx="24" cy="27.5" r="2" style="' + sf + '"/>' +
    close,
  ];
  return icons[fi] || icons[0];
}

function renderLearnHub() {
  var rs = document.getElementById('right-sidebar');
  if (rs) rs.style.display = 'none';
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'none';
  var grid = document.querySelector('.app-grid');
  if (grid) grid.style.gridTemplateColumns = '1fr';

  var sectionIds = new Set();
  FLOORS.forEach(function(f) { f.sections.forEach(function(s) { sectionIds.add(s.id); }); });
  var totalSecs = sectionIds.size;
  var doneSecs = Object.keys(state.completed).filter(function(k) { return sectionIds.has(k) && state.completed[k]; }).length;
  var pct = totalSecs > 0 ? Math.round((doneSecs / totalSecs) * 100) : 0;
  var floorsComplete = FLOORS.filter(function(f, fi) { return isFloorComplete(fi); }).length;
  var floorsUnlocked = FLOORS.length; // all floors unlocked
  var currentFloorIdx = state.currentFloor - 1;



  function hexGlow(hex) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.28)';
  }

  var cardsHtml = FLOORS.map(function(f, fi) {
    var color    = f.color || '#c8a96e';
    var glow     = hexGlow(color);
    var done     = isFloorComplete(fi);
    var unlocked = true; // all floors unlocked
    var isActive = !done && fi === currentFloorIdx;

    var floorDone  = f.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var floorTotal = f.sections.length;

    var statusClass, statusText;
    if (done) {
      statusClass = 'fc-status fc-status-done';   statusText = '&#10003; Complete';
    } else if (isActive) {
      statusClass = 'fc-status fc-status-active';  statusText = 'In Progress';
    } else if (unlocked) {
      statusClass = 'fc-status fc-status-open';    statusText = 'Available';
    } else {
      statusClass = 'fc-status fc-status-locked';  statusText = '&#128274; Locked';
    }

    var cardClasses = 'fc-card' +
      (!unlocked ? ' fc-card-locked' : '') +
      (isActive  ? ' fc-card-active' : '');
    var clickAttr  = unlocked ? ' onclick="' + (fi === 0 ? 'showSageFloorIntro(0)' : 'goToFloor(' + fi + ')') + '"' : '';
    var icon       = getFloorIcon(fi);
    var infoBtn    = '<button class="fc-info-btn" onclick="event.stopPropagation();toggleFloorInfo(' + fi + ')">&#x2139;</button>';

    return '<div class="' + cardClasses + '" style="--fc-color:' + color + ';--fc-glow:' + glow + ';min-width:118px;flex:1;max-width:160px;"' + clickAttr + '>' +
      '<div class="fc-accent"></div>' +
      infoBtn +
      '<div class="fc-floor-badge">Floor ' + (fi + 1) + '</div>' +
      '<div class="fc-icon">' + icon + '</div>' +
      '<div class="fc-title" style="font-size:11px;width:100%;word-break:normal;">' + f.title + '</div>' +
      '<div class="fc-sec-count">' + floorDone + '/' + floorTotal + ' sections</div>' +
      '<span class="' + statusClass + '">' + statusText + '</span>' +
    '</div>';
  }).join('');

  var overallBar = '<div class="ch-overall-bar-wrap">' +
    '<div class="ch-overall-bar"><div class="ch-overall-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="ch-overall-label">' + pct + '% complete</span>' +
    '</div>';

  var html = '<style id="hub-override">' +
    '.fc-header-title{color:#d0eeff!important;background:none!important;-webkit-text-fill-color:unset!important;animation:none!important;text-shadow:0 0 40px rgba(126,184,200,0.45)!important;}' +
    '.fc-title{font-size:11px!important;width:100%!important;word-break:normal!important;overflow-wrap:normal!important;display:block!important;}' +
    '.fc-card{min-width:130px!important;}' +
    '.fc-stats{width:100%!important;display:flex!important;justify-content:center!important;text-align:center!important;}' +
    '.fc-stat{flex:1!important;text-align:center!important;}' +
    '.ch-overall-bar-wrap{margin:0 auto!important;width:100%!important;max-width:420px!important;}' +
    '.fc-hub{text-align:center!important;position:relative!important;z-index:1!important;}' +
    '.fc-row{justify-content:center!important;}' +
    '.fc-icon{font-size:0!important;line-height:0!important;display:flex!important;align-items:center!important;justify-content:center!important;height:52px!important;}' +
    '@keyframes holo-pulse{0%,100%{opacity:0.78;}50%{opacity:1;}}' +
    '.holo-icon{animation:holo-pulse 2.8s ease-in-out infinite;}' +
    '.fc-card:nth-child(1) .holo-icon{animation-duration:2.6s;}' +
    '.fc-card:nth-child(2) .holo-icon{animation-duration:2.9s;}' +
    '.fc-card:nth-child(3) .holo-icon{animation-duration:3.1s;}' +
    '.fc-card:nth-child(4) .holo-icon{animation-duration:2.7s;}' +
    '.fc-card:nth-child(5) .holo-icon{animation-duration:3.0s;}' +
    '.fc-card:nth-child(6) .holo-icon{animation-duration:2.8s;}' +
    '.fc-card:nth-child(7) .holo-icon{animation-duration:3.2s;}' +
    '</style>' +
    '<canvas id="hub-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>' +
    '<div class="fc-hub">' +
    '<div class="fc-header">' +
      '<div class="fc-header-label">Your Learning Path</div>' +
      '<div class="fc-header-title">Seven Floors.<br>One Goal.</div>' +
      '<div class="fc-header-sub">Work through each floor in order. Each one builds directly on the last.</div>' +
      '<div style="margin-top:16px;">' + overallBar + '</div>' +
      '<button class="hub-notes-btn" onclick="openNotesReview()">📝 Review your notes</button>' +
    '</div>' +
    '<div class="fc-stats" style="display:flex;width:100%;margin:0 auto 28px;border-top:1px solid #0a1828;border-bottom:1px solid #0a1828;padding:14px 0;">' +
      '<div class="fc-stat" style="flex:1;text-align:center;"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + floorsUnlocked + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Unlocked</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + (state.xp || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">XP Earned</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + (state.streak || 0) + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Day Streak</div></div>' +
      '<div class="fc-stat" style="flex:1;text-align:center;border-left:1px solid rgba(255,255,255,0.06);"><div class="fc-stat-val" style="font-size:24px;font-weight:700;color:#fff;">' + floorsComplete + '</div><div class="fc-stat-label" style="font-size:10px;color:rgba(200,220,255,0.7);text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Floors Complete</div></div>' +
    '</div>' +
    '<div class="fc-row" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">' + cardsHtml + '</div>' +
  '</div>' +
  '<div class="fc-modal-overlay fc-modal-hidden" id="fc-modal-overlay" onclick="closeFloorModal()">' +
    '<div class="fc-modal" id="fc-modal" onclick="event.stopPropagation()">' +
      '<button class="fc-modal-close" onclick="closeFloorModal()">&#x2715;</button>' +
      '<div class="fc-modal-badge" id="fc-modal-badge"></div>' +
      '<div class="fc-modal-icon" id="fc-modal-icon"></div>' +
      '<div class="fc-modal-title" id="fc-modal-title"></div>' +
      '<div class="fc-modal-sage" id="fc-modal-sage"></div>' +
      '<div class="fc-modal-sub">What\'s covered in this floor</div>' +
      '<ul class="fc-modal-list" id="fc-modal-list"></ul>' +
    '</div>' +
  '</div>';

  var mc = document.getElementById('main-content');
  if (mc) { mc.style.display = ''; mc.innerHTML = html; }
  startHubCanvas();
}
function renderFloor1(si) {
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'flex';
  var floor = FLOORS[0];
  var fi = 0;

  // Progress calculation
  var totalSecs = floor.sections.length;
  var doneSecs = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
  var pct = Math.round((doneSecs / totalSecs) * 100);
  var streak = state.streak || 0;

  // Section list for right sidebar
  var sectionListHtml = floor.sections.map(function(s, i) {
    var done = state.completed[s.id];
    var active = i === si;
    return '<div class="f1-sec-row ' + (active ? 'f1-sec-active' : '') + ' ' + (done ? 'f1-sec-done' : '') + '" onclick="renderFloor1(' + i + ')">' +
      '<div class="f1-sec-num">' + (done ? '&#10003;' : (i + 1)) + '</div>' +
      '<div class="f1-sec-name">' + s.title + '</div>' +
      (active ? '<div class="f1-sec-indicator"></div>' : '') +
      '</div>';
  }).join('');

  // Activity log
  var actLog = getActivityLog();
  var actHtml = actLog.length ? actLog.slice(0, 3).map(function(a) {
    return '<div class="f1-activity-row">' +
      '<div class="f1-activity-dot"></div>' +
      '<div class="f1-activity-label">' + a.label + '</div>' +
      (a.xp ? '<div class="f1-activity-xp">+' + a.xp + ' XP</div>' : '') +
      '<div class="f1-activity-time">' + timeAgo(a.time) + '</div>' +
      '</div>';
  }).join('') : '<div class="f1-activity-empty">No activity yet. Start your first section!</div>';

  // Today\'s goal
  var dailyGoal = parseInt(localStorage.getItem('codebook_daily_goal')) || 3;
  var todayKey = 'codebook_daily_' + new Date().toDateString();
  var todayDone = parseInt(localStorage.getItem(todayKey)) || 0;
  var goalPct = Math.min(100, Math.round((todayDone / dailyGoal) * 100));
  var circumference = 2 * Math.PI * 28;
  var dashOffset = circumference - (circumference * goalPct / 100);

  // Section cards
  var section = floor.sections[si];
  var sectionCardsHtml = floor.sections.map(function(s, i) {
    var done = state.completed[s.id];
    var active = i === si;
    var num = i < 9 ? '0' + (i + 1) : '' + (i + 1);
    var badge = done && !active
      ? '<span class="f1-card-badge f1-card-badge-done">&#10003; Complete</span>'
      : active
      ? '<span class="f1-card-badge f1-card-badge-active">Active</span>'
      : '<span class="f1-card-badge f1-card-badge-locked">Locked</span>';
    var cardClass = 'f1-section-card ' + (active ? 'f1-section-active' : done ? 'f1-section-done' : 'f1-section-locked');
    var clickFn = active ? 'loadSection(0,' + i + ')' : 'renderFloor1(' + i + ')';
    var inner = '<div class="f1-card-header">' +
      '<div class="f1-card-num">' + num + '</div>' +
      badge +
      '</div>' +
      '<div class="f1-section-title">' + s.title + '</div>';
    if (active) {
      inner += '<div class="f1-section-desc">' + (s.body ? s.body.replace(/<[^>]+>/g, '').substring(0, 90) + '...' : '') + '</div>' +
        '<div class="f1-section-actions"><button class="f1-continue-btn" onclick="event.stopPropagation();loadSection(0,' + i + ')">Continue &#8594;</button></div>';
    }
    return '<div class="' + cardClass + '" onclick="' + clickFn + '">' + inner + '</div>';
  }).join('');

  // CSS orb illustration
  var orbHtml = '<div class="f1-orb-wrap">' +
    '<div class="f1-orb-outer">' +
    '<div class="f1-orb-inner">' +
    '<div class="f1-orb-core"></div>' +
    '</div>' +
    '</div>' +
    '<div class="f1-orb-shadow"></div>' +
    '</div>';

  var html =
    '<div class="f1-layout">' +

    // \u2500\u2500 MAIN COLUMN \u2500\u2500
    '<div class="f1-main">' +

    // Hero
    '<div class="f1-hero">' +
    orbHtml +
    '<div class="f1-hero-content">' +
    '<div class="f1-floor-tag">FLOOR 01 &bull; FOUNDATION</div>' +
    '<div class="f1-floor-title">' + floor.title + '</div>' +
    '<div class="f1-floor-desc">' + floor.sections[0].body.substring(0, 90) + '...</div>' +
    '<div class="f1-stats-row">' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128337;</span><div><div class="f1-stat-label">DURATION</div><div class="f1-stat-value">' + floor.duration + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128197;</span><div><div class="f1-stat-label">SESSIONS</div><div class="f1-stat-value">' + floor.sessions + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#9200;</span><div><div class="f1-stat-label">LENGTH</div><div class="f1-stat-value">' + floor.length + '</div></div></div>' +
    '<div class="f1-stat"><span class="f1-stat-icon">&#128200;</span><div><div class="f1-stat-label">DIFFICULTY</div><div class="f1-stat-value">Curious</div></div></div>' +
    '</div>' +
    '<div class="f1-hero-btns">' +
    '<button class="f1-start-btn" onclick="loadSection(0,0)">Start Floor 01 &#8594;</button>' +
    '<button class="f1-preview-btn" onclick="sageMessage(\'Floor 1 covers how the internet works, how computers read code, and the logic behind all programming. Five sections, no prior experience needed.\', \'info\')">&#9654; Preview</button>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // Progress bar
    '<div class="f1-progress-wrap">' +
    '<div class="f1-progress-label">YOUR PROGRESS</div>' +
    '<div class="f1-progress-center">' +
    '<span class="f1-progress-floor">FLOOR 01</span>' +
    '<div class="f1-progress-track"><div class="f1-progress-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="f1-progress-pct">' + pct + '%</span>' +
    '</div>' +
    '<div class="f1-progress-streak">&#128293; ' + streak + ' days</div>' +
    '</div>' +

    // Section cards
    '<div class="f1-sections">' + sectionCardsHtml + '</div>' +

    '</div>' + // end f1-main

    // \u2500\u2500 RIGHT SIDEBAR \u2500\u2500
    '<div class="f1-sidebar">' +

    // Section list
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">FLOOR 01 &bull; SECTIONS</div>' +
    sectionListHtml +
    '</div>' +

    // Sage guide
    '<div class="f1-sidebar-card f1-sage-card">' +
    '<div class="f1-sage-header">' +
    '<div class="f1-sage-avatar">&#129497;</div>' +
    '<div class="f1-sage-name">YOUR GUIDE</div>' +
    '</div>' +
    '<div class="f1-sage-quote">Every expert was once a beginner who refused to quit.</div>' +
    '</div>' +

    // Today\'s goal
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">TODAY\'S GOAL</div>' +
    '<div class="f1-goal-row">' +
    '<svg class="f1-goal-circle" viewBox="0 0 64 64">' +
    '<circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" stroke-width="4"/>' +
    '<circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent)" stroke-width="4" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + dashOffset + '" stroke-linecap="round" transform="rotate(-90 32 32)"/>' +
    '<text x="32" y="37" text-anchor="middle" fill="var(--accent)" font-size="13" font-family="IBM Plex Mono">' + todayDone + '/' + dailyGoal + '</text>' +
    '</svg>' +
    '<div class="f1-goal-text">' +
    '<div class="f1-goal-title">Complete ' + dailyGoal + ' sections</div>' +
    '<div class="f1-goal-sub">Earn XP and keep your streak!</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // Recent activity
    '<div class="f1-sidebar-card">' +
    '<div class="f1-sidebar-label">RECENT ACTIVITY</div>' +
    '<div class="f1-activity-list">' + actHtml + '</div>' +
    '</div>' +

    // Motivational footer
    '<div class="f1-sidebar-card f1-motive-card">' +
    '<div class="f1-motive-text">Stay consistent.<br>Progress compounds.</div>' +
    '<div class="f1-motive-icon">&#128218;</div>' +
    '</div>' +

    '</div>' + // end f1-sidebar
    '</div>'; // end f1-layout

  document.getElementById('main-content').innerHTML = html;
  state.currentFloor = 1;
  state.currentSection = si;
  saveState();
  updateTopChips();
}

function completeSection(sectionId, fi, si) {
  var gate = sectionGateState[sectionId] || {};
  var section = FLOORS[fi].sections[si];
  var needsQuiz = !!(section && section.quiz);
  if (needsQuiz && !gate.quiz) {
    sageMessage('Answer the knowledge check first \u2014 then you can mark this section complete.', 'warn');
    return;
  }

  // Capture button position before DOM rebuild so XP float lands on it
  var btn = document.getElementById('complete-btn-' + sectionId);
  var bx = window.innerWidth / 2, by = 300;
  if (btn) {
    var r = btn.getBoundingClientRect();
    bx = r.left + r.width / 2;
    by = r.top + r.height / 2;
    btn.classList.add('pressing');
  }

  state.completed[sectionId] = true;
  markStreakProtected();
  var secXP = getSectionXP(fi);
  awardXP(secXP, 'complete-' + sectionId, bx, by);
  playCompletionSound();
  trackDailySection();

  var secName = FLOORS[fi] && FLOORS[fi].sections[si] ? FLOORS[fi].sections[si].title : sectionId;
  logActivity('section', 'Completed: ' + secName, secXP);

  const isNowComplete = isFloorComplete(fi);
  if (isNowComplete) {
    awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
    setTimeout(() => showFloorCelebration(fi), 700);
  }
  saveState();
  checkGuestSavePrompt();
  updateAchievements();
  updateDailyGoalBar();
  updateTopChips();
  renderNav();

  // Brief pause so button press animation is visible, then rebuild
  setTimeout(function() {
    renderFloor(fi, si);
    // After DOM rebuild trigger gate box shimmer
    setTimeout(function() {
      var gateBox = document.querySelector('.gate-box');
      if (gateBox) {
        gateBox.classList.add('gate-completing');
        setTimeout(function() { gateBox.classList.remove('gate-completing'); }, 950);
      }
    }, 40);
  }, 180);
}

function prevSection(fi, si) {
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-right');
  setTimeout(function() {
    if (si > 0) { state.currentSection = si - 1; saveState(); renderNav(); renderFloor(fi, si - 1); }
    else if (fi > 0) { goToFloor(fi - 1); }
  }, 220);
}

function nextSection(fi, si) {
  var floor = FLOORS[fi];
  var section = floor.sections[si];
  var gate = sectionGateState[section.id] || {};
  var hasQuiz = !!(section && section.quiz);
  var hasChecklist = !!(section && section.checklist && section.checklist.length);

  if (!state.completed[section.id]) {
    if (hasChecklist) {
      var allChecked = section.checklist.every(function(_, ci) {
        return !!(state.checklistDone || {})[section.id + '-' + ci];
      });
      if (!allChecked) {
        sageMessage('Tick every item in the checklist before moving on.', 'warn');
        return;
      }
    }
    if (hasQuiz && !gate.quiz) {
      sageMessage('Answer the quiz correctly before moving to the next section.', 'warn');
      return;
    }
    if (!hasQuiz) {
      // Auto-complete
      state.completed[section.id] = true;
      markStreakProtected();
      awardXP(getSectionXP(fi), 'complete-' + section.id, window.innerWidth / 2, 300);
      var isNowComplete = isFloorComplete(fi);
      if (isNowComplete) {
        awardXP(getFloorXP(fi), 'floor-' + fi, window.innerWidth / 2, 250);
        setTimeout(function() { showFloorCelebration(fi); }, 600);
      }
      saveState();
    }
  }
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('section-slide-out-left');
  setTimeout(function() {
    if (si < floor.sections.length - 1) { state.currentSection = si + 1; saveState(); renderNav(); renderFloor(fi, si + 1); }
    else if (fi < FLOORS.length - 1) { goToFloor(fi + 1); }
  }, 220);
}

// --- VOICE NARRATION SYSTEM ---
let currentUtterance = null;
let currentNarrationId = null;

function getReadableText(sectionId) {
  const fi = state.currentFloor - 1;
  const section = FLOORS[fi].sections.find(s => s.id === sectionId);
  if (!section) return '';
  const strip = t => t.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  let parts = [];
  parts.push(section.title + '.');
  parts.push(strip(section.body));
  if (section.callout) parts.push(section.callout.label + '. ' + strip(section.callout.text));
  if (section.callout2) parts.push(section.callout2.label + '. ' + strip(section.callout2.text));
  if (section.hint) parts.push('Hint. ' + strip(section.hint));
  return parts.join(' ... ');
}

function toggleNarration(sectionId) {
  const btn = document.getElementById('listen-btn-' + sectionId);
  if (currentNarrationId === sectionId && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    currentNarrationId = null;
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
    return;
  }
  window.speechSynthesis.cancel();
  const text = getReadableText(sectionId);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onend = () => {
    currentNarrationId = null;
    if (btn) { btn.classList.remove('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u25B6 Listen'; }
  };
  currentUtterance = utterance;
  currentNarrationId = sectionId;
  window.speechSynthesis.speak(utterance);
  if (btn) { btn.classList.add('playing'); btn.innerHTML = '<span class="listen-dot"></span>\u23F8 Pause'; }
}

function stopNarration() {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  currentNarrationId = null;
}

// ============================================
// FLOOR 2 \u2014 CONTROL PANEL INTERACTION
// ============================================
function f2SelectValue(value) {
  const screen = document.getElementById('f2-status-screen');
  const blank = document.getElementById('f2-blank');
  const hint = document.getElementById('f2-hint');
  const ascend = document.getElementById('f2-ascend');
  const pellets = document.querySelectorAll('.data-pellet');

  if (value === 2) {
    // Success
    blank.textContent = '2';
    blank.classList.add('filled');
    screen.classList.remove('shake');
    screen.classList.add('success');
    screen.querySelector('.status-text').textContent = 'STATUS: FLOOR 2 \u2713';
    hint.classList.remove('visible');
    pellets.forEach(p => p.disabled = true);

    // Play mechanical startup sound
    playF2Sound();

    // Award XP
    setTimeout(() => {
      awardXP(50, 'f2-variable-task', window.innerWidth / 2, 200);
      sageMessage('Variable assigned. The system is online. Floor 3 is now accessible.', 'celebrate');
    }, 400);

    // Show ascend button
    setTimeout(() => {
      if (ascend) {
        ascend.style.display = 'block';
        localStorage.setItem('f2_complete', 'true');
      }
    }, 800);

  } else {
    // Failure
    blank.textContent = value === 1 ? '1' : '"Lobby"';
    blank.classList.remove('filled');
    screen.classList.remove('success');
    void screen.offsetWidth;
    screen.classList.add('shake');
    setTimeout(() => screen.classList.remove('shake'), 500);
    hint.classList.add('visible');
    sageMessage('Variables must be accurate. We are on Floor 2 \u2014 so the value must be 2!', 'warn');
  }
}

function playF2Sound() {
  try {
    const ctx = getAudioContext();
    const times = [0, 0.12, 0.22];
    const freqs = [220, 330, 440];
    times.forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + t);
      gain.gain.setValueAtTime(0.06, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.1);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.12);
    });
  } catch(e) {}
}

function f2Ascend() {
  if (!isFloorComplete(1)) {
    var incomplete = FLOORS[1].sections.filter(function(s) { return !state.completed[s.id]; });
    var names = incomplete.slice(0, 2).map(function(s) { return '\u201c' + s.title + '\u201d'; }).join(', ');
    var extra = incomplete.length > 2 ? ' and ' + (incomplete.length - 2) + ' more' : '';
    sageMessage('You\u2019re not quite ready yet. Complete these sections first: ' + names + extra + '.', 'warn');
    return;
  }
  goToFloor(2);
}

// ============================================
// SYSTEM 1 \u2014 ELEVATOR TRANSITIONS
// ============================================
let lastFloorIndex = 0;
function renderFloor(fi, si) {
  stopHubCanvas();
  var ls = document.getElementById('left-sidebar');
  if (ls) ls.style.display = 'flex';
  var floor = FLOORS[fi];
  var color = floor ? (floor.color || '#c8a96e') : '#c8a96e';
  var r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  var glow   = 'rgba('+r+','+g+','+b+',0.10)';
  var border = 'rgba('+r+','+g+','+b+',0.22)';
  var subtle = 'rgba('+r+','+g+','+b+',0.05)';
  ['main-col','main-content'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.setProperty('--floor-color',        color);
    el.style.setProperty('--floor-hero-glow',    glow);
    el.style.setProperty('--floor-hero-border',  border);
    el.style.setProperty('--floor-hero-subtle',  subtle);
  });
  loadSection(fi, si);
}
function renderFloorWithElevator(fi, si) {
  const direction = fi > lastFloorIndex ? 'up' : fi < lastFloorIndex ? 'down' : null;
  lastFloorIndex = fi;
  renderFloor(fi, si);
  if (direction) {
    const panel = document.querySelector('.floor-panel') || document.getElementById('main-content').firstElementChild;
    if (panel) {
      panel.classList.remove('elevator-up', 'elevator-down');
      void panel.offsetWidth;
      panel.classList.add(direction === 'up' ? 'elevator-up' : 'elevator-down');
    }
  }
}

// ============================================
// SYSTEM 2 \u2014 SAGE SPEECH BUBBLE
// ============================================
let sageBubbleTimeout = null;
let sageIdleTimeout = null;


const SAGE_MOODS = {
  encourage: { icon: sageOwlSVG(18, 20), color: 'var(--accent)' },
  tip:       { icon: sageOwlSVG(18, 20), color: 'var(--accent2)' },
  warn:      { icon: sageOwlSVG(18, 20), color: 'var(--floor3)' },
  celebrate: { icon: sageOwlSVG(18, 20), color: 'var(--success)' }
};

const SAGE_IDLE_MESSAGES = [
  { text: "Every great structure starts with a foundation that refuses to be rushed. Take the time this section needs.", mood: 'encourage' },
  { text: "The best architects read the blueprint three times before they lift a tool. Read this again.", mood: 'tip' },
  { text: "Three minutes on one section is not slow. It is precise. Precision is what separates builders from dreamers.", mood: 'encourage' },
  { text: "If something is unclear, tap the hint. I designed it for exactly this moment.", mood: 'tip' },
  { text: "A building is only as strong as the floor you are standing on. Do not ascend until this one is solid.", mood: 'warn' },
  { text: "Stillness before understanding is not wasted time. It is the load-bearing wall of knowledge.", mood: 'encourage' }
];

// ── CHALLENGE CHECK-OFF ───────────────────────────────────────────────────
function toggleChallenge(chKey, fi, si) {
  if (!state.challengesDone) state.challengesDone = {};
  state.challengesDone[chKey] = !state.challengesDone[chKey];
  saveState();
  var item = document.getElementById('chitem-' + chKey);
  if (!item) return;
  var btn = item.querySelector('.ch-check-btn');
  if (state.challengesDone[chKey]) {
    item.classList.add('ch-done');
    if (btn) btn.textContent = '✓';
  } else {
    item.classList.remove('ch-done');
    if (btn) btn.textContent = '○';
  }
  // Update the gate if all challenges are now done
  var section = FLOORS[fi] && FLOORS[fi].sections[si];
  if (!section || !section.code) return;
  var allDone = (section.code.challenges || []).every(function(_, ci) {
    return !!(state.challengesDone[section.id + '-ch-' + ci]);
  });
  if (allDone) {
    var gate = sectionGateState[section.id];
    if (gate && !gate.code) {
      gate.code = true;
      var row = document.getElementById('gate-code-' + section.id);
      if (row) { row.classList.add('done'); row.querySelector('.gate-check-dot').innerHTML = '&#10003;'; }
    }
  }
}

// ── SAGE CHAT PANEL ───────────────────────────────────────────────────────
function openSageChat(sectionId, fi) {
  var existing = document.getElementById('sage-chat-overlay');
  if (existing) existing.remove();

  var section = FLOORS[fi] && FLOORS[fi].sections.find(function(s) { return s.id === sectionId; });
  var floorTitle = FLOORS[fi] ? FLOORS[fi].title : '';
  var sectionTitle = section ? section.title : '';
  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;

  var overlay = document.createElement('div');
  overlay.id = 'sage-chat-overlay';
  overlay.className = 'sage-chat-overlay';
  overlay.innerHTML =
    '<div class="sage-chat-panel">' +
      '<div class="sage-chat-header">' +
        '<div class="sage-chat-title"><span class="sage-chat-owl">' + sageOwlSVG(20, 22) + '</span> Ask Sage</div>' +
        '<div class="sage-chat-meta">Floor ' + (fi+1) + ' · ' + sectionTitle + ' · ' +
          '<span class="sage-uses-badge">' + usesLeft + ' left</span></div>' +
        '<button class="sage-chat-close" onclick="document.getElementById(\'sage-chat-overlay\').remove()">×</button>' +
      '</div>' +
      '<div class="sage-chat-warning">' +
        '⚠️ Each question uses one of your <strong>' + SAGE_TOTAL_USES + ' lifetime questions</strong>. ' +
        'Try reading the section hint first — Sage is for when you\'re genuinely stuck.' +
      '</div>' +
      '<div class="sage-chat-messages" id="sage-chat-messages">' +
        '<div class="sage-msg sage-msg-owl">' +
          '<span class="sage-msg-icon">' + sageOwlSVG(20, 22) + '</span>' +
          '<div class="sage-msg-text">What are you stuck on? Be specific — the more detail you give me, the more useful I can be.</div>' +
        '</div>' +
      '</div>' +
      '<div class="sage-chat-input-row">' +
        '<textarea class="sage-chat-input" id="sage-chat-input" placeholder="Describe what you\'re stuck on..." rows="3"></textarea>' +
        '<button class="sage-chat-send" onclick="submitSageQuestion(\'' + sectionId + '\',' + fi + ')">Send</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.getElementById('sage-chat-input').focus();
}

function submitSageQuestion(sectionId, fi) {
  var input = document.getElementById('sage-chat-input');
  var question = input ? input.value.trim() : '';
  if (!question) return;

  var usesLeft = (state.sageUsesLeft !== undefined) ? state.sageUsesLeft : SAGE_TOTAL_USES;
  if (usesLeft <= 0) return;

  // Deduct use
  state.sageUsesLeft = usesLeft - 1;
  saveState();

  // Show question in chat
  var msgs = document.getElementById('sage-chat-messages');
  if (msgs) {
    msgs.innerHTML += '<div class="sage-msg sage-msg-user"><div class="sage-msg-text">' + escHtml(question) + '</div></div>';
    msgs.innerHTML += '<div class="sage-msg sage-msg-owl" id="sage-thinking"><span class="sage-msg-icon">' + sageOwlSVG(20, 22) + '</span><div class="sage-msg-text sage-thinking-dots">Thinking<span>.</span><span>.</span><span>.</span></div></div>';
    msgs.scrollTop = msgs.scrollHeight;
  }
  if (input) { input.value = ''; input.disabled = true; }
  var sendBtn = document.querySelector('.sage-chat-send');
  if (sendBtn) sendBtn.disabled = true;

  // Update uses badge
  var badge = document.querySelector('.sage-uses-badge');
  if (badge) badge.textContent = state.sageUsesLeft + ' left';

  // Update the strip in READ tab
  var strip = document.querySelector('.sage-ask-sub');
  if (strip) strip.textContent = state.sageUsesLeft + ' question' + (state.sageUsesLeft !== 1 ? 's' : '') + ' remaining';

  getSageResponse(question, sectionId, fi, function(response) {
    var thinking = document.getElementById('sage-thinking');
    if (thinking) thinking.remove();
    if (msgs) {
      msgs.innerHTML += '<div class="sage-msg sage-msg-owl"><span class="sage-msg-icon">' + sageOwlSVG(20, 22) + '</span><div class="sage-msg-text">' + response + '</div></div>';
      if (state.sageUsesLeft === 0) {
        msgs.innerHTML += '<div class="sage-msg sage-msg-system">You\'ve used all your Sage questions. From here, trust your own reasoning — that\'s where real learning happens.</div>';
      }
      msgs.scrollTop = msgs.scrollHeight;
    }
    if (input) input.disabled = state.sageUsesLeft <= 0;
    if (sendBtn) sendBtn.disabled = state.sageUsesLeft <= 0;
  });
}

function getSageResponse(question, sectionId, fi, callback) {
  var section = FLOORS[fi] && FLOORS[fi].sections.find(function(s) { return s.id === sectionId; });
  var floorTitle = FLOORS[fi] ? FLOORS[fi].title : '';

  // If API key is configured, use Claude API
  if (SAGE_API_KEY) {
    var systemPrompt = 'You are Sage, a wise and patient coding tutor for The Code Book — a self-paced web development curriculum. ' +
      'The learner is currently on Floor ' + (fi+1) + ' (' + floorTitle + '), section "' + (section ? section.title : '') + '". ' +
      'Answer in 2-4 short paragraphs. Be direct and practical. Do not write code unless they specifically ask for a hint — ' +
      'guide their thinking instead. Never give away the full answer to a coding exercise. ' +
      'Remind them they have limited questions if the answer is something the hint section already covers.';

    var sectionContext = section ? ('Section content: ' + (section.body || '').replace(/<[^>]*>/g,'').slice(0, 800)) : '';

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SAGE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-iab-override': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: 'user', content: sectionContext + '\n\nLearner question: ' + question }]
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var text = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text : 'I couldn\'t reach the server. Try the hint in the section instead.';
      callback(text);
    })
    .catch(function() {
      callback(buildContextualResponse(question, section, fi));
    });
    return;
  }

  // No API key — use built-in contextual guidance
  setTimeout(function() {
    callback(buildContextualResponse(question, section, fi));
  }, 800);
}

function buildContextualResponse(question, section, fi) {
  var q = question.toLowerCase();
  var floor = fi + 1;

  // General debugging questions
  if (q.includes('error') || q.includes('not work') || q.includes('broke') || q.includes('bug') || q.includes('undefined')) {
    return 'The first thing to do with any error is read the message in full — the browser console tells you the type, a plain-English description, and the line number. Before changing anything, go to that line. The bug is usually there or one line above.\n\nIf the error says "undefined", something you\'re trying to use doesn\'t exist yet at that point in execution. Check the order of your code — is the value being set before it\'s being read?';
  }
  if (q.includes('console') || q.includes('log') || q.includes('debug')) {
    return 'console.log() is your most reliable tool here. Add it right at the entry point of the function you\'re unsure about — just to confirm the function is being called at all. Then add another one after each key step to trace where the value changes unexpectedly.\n\nThe goal is to narrow down the location: is the function running? Is the variable set? Is the conditional taking the right branch? Each log eliminates a possibility.';
  }

  // Floor-specific contextual responses
  var floorTips = {
    1: 'At this stage, the most important thing is building the mental model — not memorising syntax. Try to explain the concept back to yourself out loud, in plain English, without looking at the section. If you can\'t, that\'s the gap. Go back to the specific paragraph that covers it.',
    2: 'With HTML and CSS, the best debugging tool is the browser\'s DevTools. Right-click the element, inspect it, and you can see exactly which CSS rules are applying and which are being overridden. The cascade is always the reason something looks wrong.',
    3: 'JavaScript is precise about types and order. If something is undefined, either the variable doesn\'t exist in that scope, or it hasn\'t been assigned yet at the point you\'re using it. Add a console.log right before the line that errors to see the actual value.',
    4: 'When working with async code, the most common mistake is trying to use data before it\'s arrived. Make sure every async operation is properly awaited. Open the Network tab in DevTools — it shows you exactly what requests went out and what came back.',
    5: 'Backend errors often live in the server logs, not the browser console. Check both. If a request returns a 500, the detailed error is on the server side. Express will log it to the terminal.',
    6: 'At this stage, the answer to most questions is in the documentation. MDN for browser APIs, the framework\'s own docs for everything else. The skill of reading docs precisely — not scanning, reading — is what you\'re really building here.',
    7: 'Professional-level problems rarely have one right answer. If you\'re stuck on an architectural decision, try writing down both options and what breaks if each assumption turns out to be wrong. The constraint that matters most usually reveals itself that way.'
  };

  var hint = section && section.hint ? section.hint.replace(/<[^>]*>/g,'').slice(0, 300) : '';

  return (floorTips[floor] || floorTips[1]) +
    (hint ? '\n\nThe section hint covers: ' + hint.slice(0, 200) + (hint.length > 200 ? '...' : '') + '\n\nHave you read through it carefully? Hints are written for exactly the kind of moment you\'re in.' : '');
}

function sageMessage(text, mood) {
  // Remove existing bubble
  const existing = document.getElementById('sage-bubble');
  if (existing) existing.remove();
  if (sageBubbleTimeout) clearTimeout(sageBubbleTimeout);

  const m = SAGE_MOODS[mood] || SAGE_MOODS.encourage;
  const bubble = document.createElement('div');
  bubble.className = 'sage-bubble';
  bubble.id = 'sage-bubble';
bubble.innerHTML =
  "<button class='sage-bubble-close' onclick='this.parentElement.remove()'>\u00D7</button>" +
  "<div class='sage-bubble-header'>" +
    "<span class='sage-bubble-icon'>" + m.icon + "</span>" +
    "<span class='sage-bubble-name' style='color:" + m.color + "'>SAGE</span>" +
  "</div>" +
  "<div class='sage-bubble-text'>" + text + "</div>";
  document.body.appendChild(bubble);
  sageBubbleTimeout = setTimeout(() => bubble.remove && bubble.remove(), 8000);
}

function resetSageIdleTimer() {
  if (sageIdleTimer) clearTimeout(sageIdleTimer);
  sageIdleTimer = setTimeout(() => {
    const msg = SAGE_IDLE_MESSAGES[Math.floor(Math.random() * SAGE_IDLE_MESSAGES.length)];
    sageMessage(msg.text, msg.mood);
  }, 3 * 60 * 1000); // 3 minutes
}

// Reset idle timer on user activity
['click', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, resetSageIdleTimer, { passive: true });
});

// ============================================
// SYSTEM 3 \u2014 GOLDEN DUST XP PARTICLES
// ============================================
function spawnGoldenDust(x, y) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'xp-particle';
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.8;
    const dist  = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 20;
    const dur = 0.6 + Math.random() * 0.5;
    const size = 3 + Math.random() * 4;
    particle.style.cssText =
  "left:" + x + "px; top:" + y + "px;" +
  "width:" + size + "px; height:" + size + "px;";
     
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), dur * 1000 + 100);
  }
}

// ============================================
// SYSTEM 4 \u2014 BUILDING MAP
// ============================================
function renderBuildingMap() {
  var map = document.getElementById('building-map');
  if (!map) return;
  var FLOOR_COLORS_BM = ['--floor1', '--floor2', '--floor3', '--floor4', '--floor5', '--floor6', '--floor7'];
  map.innerHTML = FLOORS.slice().reverse().map(function(f, ri) {
    var fi = FLOORS.length - 1 - ri;
    var isUnlocked = true; // all floors unlocked
    var isActive = fi === state.currentFloor - 1;
    var isComplete = isFloorComplete(fi);
    var color = 'var(' + (FLOOR_COLORS_BM[fi] || '--floor1') + ')';
    var shortName = f.title.split('-')[0].trim();
    return '<div class="building-floor ' +
      (isActive ? 'active ' : '') +
      (isUnlocked ? 'unlocked' : 'locked') + '"' +
      ' style="--floor-color:' + color + '"' +
      (isUnlocked ? ' onclick="goToFloor(' + fi + ')"' : '') + '>' +
      '<div class="building-window"></div>' +
      '<div class="building-floor-label">F' + (fi+1) + ' \u2014 ' + shortName + (isComplete ? ' \u2713' : '') + '</div>' +
      '</div>';
  }).join('');
}

function toggleHint(id) {
  const box = document.getElementById(id);
  if (box) box.classList.toggle('visible');
}

// --- AUDIO SYSTEM ---
function playTone(frequency, duration, volume, type = 'sine') {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playFiveMinuteWarning() {
  // Single soft tone
  playTone(440, 0.6, 0.15);
}

function playOneMinuteWarning() {
  // Two quick tones
  playTone(523, 0.3, 0.2);
  setTimeout(() => playTone(523, 0.3, 0.2), 400);
}

function playCompletionSound() {
  // Three ascending tones \u2014 calm and satisfying
  playTone(523, 0.4, 0.2);
  setTimeout(() => playTone(659, 0.4, 0.2), 300);
  setTimeout(() => playTone(784, 0.6, 0.2), 600);
}

function toggleTheme() {}
function applyTheme() {}
function toggleTimer() {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    document.getElementById('timer-btn').textContent = '\u25B6';
    const elapsed = (25 * 60) - state.timerSeconds;
    if (elapsed > 30) {
      state.totalSeconds += elapsed;
      state.sessionLog.push({ date: new Date().toDateString(), seconds: elapsed });
      saveState();
      updateTimeLog();
    }
  } else {
    state.timerRunning = true;
    document.getElementById('timer-btn').textContent = '\u23F8';
    playTone(440, 0.3, 0.1); // Soft start tone so user knows audio is active
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;

      // Sound cues
      if (state.timerSeconds === 300) {
        playFiveMinuteWarning();
        document.getElementById('timer-display').style.color = '#c8967e'; // amber
      }
      if (state.timerSeconds === 60) {
        playOneMinuteWarning();
        document.getElementById('timer-display').style.color = '#c87e9a'; // red
      }

      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        state.totalSeconds += 25 * 60;
        state.sessionLog.push({ date: new Date().toDateString(), seconds: 25 * 60 });
        awardXP(40, null, window.innerWidth - 100, 60);
        playCompletionSound();
        saveState();
        updateTimeLog();
        state.timerSeconds = 25 * 60;
        document.getElementById('timer-btn').textContent = '\u25B6';
        document.getElementById('timer-display').style.color = '#6ec87e';
        updateTimerDisplay();
        return;
      }
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = 25 * 60;
  document.getElementById('timer-btn').textContent = '\u25B6';
  document.getElementById('timer-display').style.color = '#c8a96e';
  updateTimerDisplay();
}
function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
  const s = (state.timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = '' + (m) + ':' + (s) + '';
}

// \u2500\u2500\u2500 PWA MANIFEST \u2500\u2500\u2500
(function() {
  var manifest = {
    name: 'The Code Book',
    short_name: 'CodeBook',
    description: 'A calm path into coding. Learn step by step, offline-ready.',
    start_url: './',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c8a96e',
    icons: [{ src: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="#0a0a0a"/><text x="96" y="130" font-size="100" text-anchor="middle" fill="#c8a96e">&#x1F4D6;</text></svg>'), sizes: '192x192', type: 'image/svg+xml' }]
  };
  var blob = new Blob([JSON.stringify(manifest)], {type:'application/json'});
  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = URL.createObjectURL(blob);
  document.head.appendChild(link);
})();

// \u2500\u2500\u2500 SERVICE WORKER \u2500\u2500\u2500
// Registered from sw.js \u2014 Blob URLs are not supported for service workers
// in modern browsers due to same-origin scope requirements.

// \u2500\u2500\u2500 INSTALL PROMPT \u2500\u2500\u2500
var deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredInstallPrompt = e;
  setTimeout(showPWABanner, 3000);
});
window.addEventListener('appinstalled', function() {
  hidePWABanner();
  deferredInstallPrompt = null;
});

function showPWABanner() {
  if (document.getElementById('pwa-banner')) return;
  if (localStorage.getItem('pwa_dismissed')) return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;
  var banner = document.createElement('div');
  banner.id = 'pwa-banner';
  banner.className = 'pwa-install-banner';
  banner.innerHTML = '<div class="pwa-install-icon">&#x1F4F2;</div>' +
    '<div class="pwa-install-text">' +
    '<div class="pwa-install-title">Install The Code Book</div>' +
    '<div class="pwa-install-sub">Works offline &middot; saves progress &middot; feels native</div>' +
    '</div>' +
    '<div class="pwa-install-actions">' +
    '<button class="pwa-do-install" onclick="triggerInstall()">Install</button>' +
    '<button class="pwa-dismiss-btn" onclick="hidePWABanner()">Later</button>' +
    '</div>';
  document.body.appendChild(banner);
}

function hidePWABanner() {
  var b = document.getElementById('pwa-banner');
  if (b) b.remove();
  localStorage.setItem('pwa_dismissed', '1');
}

function triggerInstall() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function() { deferredInstallPrompt = null; hidePWABanner(); });
  } else {
    alert('To install: tap the browser menu and choose "Add to Home Screen".');
    hidePWABanner();
  }
}



// \u2500\u2500\u2500 INIT LAYOUT PATCHES \u2500\u2500\u2500
(function() {
  var origStartBook = window.startBook;
  window.startBook = function() {
    if (origStartBook) origStartBook();
    setTimeout(function() {
      renderAllNav();
      initSageSidebarSync();
      patchRenderNav();
    }, 100);
  };

  // Also patch goToFloor and goToSection to update sidebars
  var origGoToFloor = window.goToFloor;
  window.goToFloor = function(fi) {
    if (origGoToFloor) origGoToFloor(fi);
    setTimeout(renderAllNav, 50);
  };

  var origGoToSection = window.goToSection;
  window.goToSection = function(fi, si) {
    if (origGoToSection) origGoToSection(fi, si);
    setTimeout(renderAllNav, 50);
  };

  // Update chips whenever XP changes
  var origAwardXP = window.awardXP;
  window.awardXP = function(amount, key, x, y) {
    if (origAwardXP) origAwardXP(amount, key, x, y);
    setTimeout(updateTopChips, 100);
    setTimeout(updateLeftStats, 100);
  };
})();




// \u2500\u2500\u2500 MAP PANEL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function renderMapPanel() {
  var panel = document.getElementById('panel-map');
  if (!panel) return;

  var totalSections = 0, completedSections = 0;
  FLOORS.forEach(function(f) {
    f.sections.forEach(function(s) {
      totalSections++;
      if (state.completed[s.id]) completedSections++;
    });
  });
  var overallPct = Math.round((completedSections / totalSections) * 100);

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">YOUR JOURNEY</div>' +
    '<div class="panel-hero-title">The Building Map</div>' +
    '<div class="panel-hero-sub">Every section you complete builds another floor. ' + completedSections + ' of ' + totalSections + ' sections done \u2014 ' + overallPct + '% complete.</div>' +
    '</div>' +
    '<div class="map-panel-grid">';

  FLOORS.forEach(function(floor, fi) {
    var floorDone = floor.sections.filter(function(s) { return state.completed[s.id]; }).length;
    var floorTotal = floor.sections.length;
    var floorPct = Math.round((floorDone / floorTotal) * 100);
    var isUnlocked = true; // all floors unlocked
    var isActive = (fi + 1) === state.currentFloor;
    var isComplete = isFloorComplete(fi);

    var statusClass = isComplete ? 'map-floor-complete' : isActive ? 'map-floor-active' : isUnlocked ? 'map-floor-unlocked' : 'map-floor-locked';
    var statusLabel = isComplete ? 'COMPLETE \u2713' : isActive ? 'IN PROGRESS' : isUnlocked ? 'UNLOCKED' : 'LOCKED';

    html += '<div class="map-floor-card ' + statusClass + '" onclick="' + (isUnlocked ? 'goToFloor(' + fi + ');switchTopNav(\'learn\',document.getElementById(\'tnav-learn\'))' : '') + '">' +
      '<div class="map-floor-header">' +
        '<div class="map-floor-num" style="color:' + floor.color + '">FLOOR ' + floor.id + '</div>' +
        '<div class="map-floor-status">' + statusLabel + '</div>' +
      '</div>' +
      '<div class="map-floor-title">' + floor.title + '</div>' +
      '<div class="map-floor-sub">' + floor.subtitle + '</div>' +
      '<div class="map-progress-row">' +
        '<div class="map-progress-track"><div class="map-progress-fill" style="width:' + floorPct + '%;background:' + floor.color + '"></div></div>' +
        '<div class="map-progress-label">' + floorDone + '/' + floorTotal + '</div>' +
      '</div>' +
      '<div class="map-sections-list">' +
        floor.sections.map(function(s, si) {
          var done = !!state.completed[s.id];
          var active = isActive && si === state.currentSection;
          return '<div class="map-section-row' + (done ? ' map-sec-done' : '') + (active ? ' map-sec-active' : '') + '">' +
            '<div class="map-sec-dot">' + (done ? '\u2713' : (si + 1)) + '</div>' +
            '<div class="map-sec-title">' + s.title + '</div>' +
            '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function renderBuildPanel() {
  var panel = document.getElementById('panel-build');
  if (!panel) return;

  var projects = [
    {
      icon: '\uD83C\uDF10', floor: 1, title: 'My First Webpage', desc: 'Build a personal "About Me" page using only what you learned in Floor 1.',
      skills: ['HTML', 'Structure'], time: '30 min',
      steps: [
        'Create a new file called <strong>index.html</strong> in a text editor.',
        'Add the basic HTML skeleton: DOCTYPE, html, head, and body tags.',
        'Inside body, add an &lt;h1&gt; with your name.',
        'Add a &lt;p&gt; tag with one sentence about yourself.',
        'Add a second &lt;p&gt; describing what you want to learn.',
        'Open the file in your browser. You should see your page.',
        'Change the heading text to something personal. Save and refresh.',
        'Add one more element \u2014 anything. A list, a quote, a second heading.'
      ]
    },
    {
      icon: '\uD83C\uDFA8', floor: 2, title: 'Styled Portfolio Card', desc: 'Take your About Me page and make it look like something real.',
      skills: ['CSS', 'Design'], time: '45 min',
      steps: [
        'Open your index.html from Floor 1 (or create a new one with the same structure).',
        'Add a &lt;style&gt; block inside &lt;head&gt;.',
        'Set the body background colour to something dark: <code>background: #0a0a0a; color: white;</code>',
        'Style the h1 \u2014 change the colour, font-size, and font-family.',
        'Wrap your content in a &lt;div class="card"&gt; and give it padding, a background, and border-radius.',
        'Add a Google Font by pasting a link tag from fonts.google.com into your &lt;head&gt;.',
        'Centre the card on the page using margin: auto and a max-width.',
        'Add one thing you figured out yourself \u2014 a hover effect, a border, a colour you chose.'
      ]
    },
    {
      icon: '\u26A1', floor: 3, title: 'Interactive Counter', desc: 'Build a counter that goes up and down when you click buttons.',
      skills: ['JavaScript', 'DOM'], time: '1 hour',
      steps: [
        'Create a new HTML file. Add a heading that says "Counter".',
        'Add a &lt;p id="count"&gt;0&lt;/p&gt; to display the current number.',
        'Add two buttons: one labelled "+ Add" and one labelled "\u2212 Subtract".',
        'Add a &lt;script&gt; block. Declare <code>let count = 0;</code>',
        'Write a function called <code>add()</code> that increases count by 1 and updates the paragraph text.',
        'Write a function called <code>subtract()</code> that decreases count by 1.',
        'Connect the functions to the buttons using onclick attributes.',
        'Add a reset button that sets count back to 0.',
        'Bonus: change the text colour to green when count is positive, red when negative.'
      ]
    },
    {
      icon: '\uD83D\uDCCB', floor: 4, title: 'To-Do List App', desc: 'A working to-do list that remembers your tasks after refresh.',
      skills: ['JS', 'Arrays', 'localStorage'], time: '2 hours',
      steps: [
        'Create a new HTML file. Add an input field and an "Add Task" button.',
        'Create an empty &lt;ul id="task-list"&gt; below the input.',
        'In JavaScript, create an array called <code>tasks</code> and load it from localStorage if it exists.',
        'Write an <code>addTask()</code> function that reads the input, pushes to the array, saves to localStorage, and re-renders the list.',
        'Write a <code>renderTasks()</code> function that loops through the array and builds &lt;li&gt; elements.',
        'Each list item should have a checkbox and a delete button.',
        'Ticking the checkbox should mark the task as complete (strikethrough style).',
        'The delete button should remove the task from the array and re-render.',
        'Call renderTasks() on page load so saved tasks appear immediately.',
        'Style it: make completed tasks visually distinct from active ones.'
      ]
    },
    {
      icon: '\uD83C\uDF24\uFE0F', floor: 5, title: 'Weather Dashboard', desc: 'Fetch live weather data from an API and display it in a custom UI.',
      skills: ['APIs', 'fetch()', 'JSON'], time: '3 hours',
      steps: [
        'Go to openweathermap.org and sign up for a free API key.',
        'Create a new HTML file with an input for a city name and a Search button.',
        'Add a &lt;div id="weather"&gt; where results will be displayed.',
        'Write a <code>fetchWeather(city)</code> async function using the fetch() API.',
        'Build the URL: <code>https://api.openweathermap.org/data/2.5/weather?q={city}&appid={YOUR_KEY}&units=metric</code>',
        'Parse the JSON response and extract: city name, temperature, weather description, humidity.',
        'Display the data inside the #weather div.',
        'Handle errors \u2014 what if the city is not found? Show a friendly message.',
        'Style the results card. Add a weather icon using the icon code from the API response.',
        'Push the project to GitHub and deploy on Netlify.'
      ]
    },
    {
      icon: '\uD83D\uDE80', floor: 6, title: 'Full Portfolio Site', desc: 'A multi-page portfolio site that represents you professionally.',
      skills: ['HTML', 'CSS', 'JS', 'Deploy'], time: '1 week',
      steps: [
        'Plan on paper first: what pages do you need? (Home, Projects, About, Contact)',
        'Create an index.html and a shared nav bar that appears on every page.',
        'Home page: your name, one strong sentence about what you do, a call-to-action button.',
        'Projects page: a card for each of your Floor 1-5 builds with a title, screenshot, description, and live link.',
        'About page: your story, what you\'ve learned, where you\'re heading.',
        'Contact section: your email or a simple form (use Formspree for a working form without a backend).',
        'Make it fully responsive \u2014 test on a phone.',
        'Add a dark/light mode toggle.',
        'Push to GitHub with a clear README.',
        'Deploy on Netlify. Share the URL.'
      ]
    },
    {
      icon: '\uD83C\uDFD7\uFE0F', floor: 7, title: 'Capstone Project', desc: 'Your final project. No constraints. Build something you\'re proud of.',
      skills: ['Everything'], time: 'Your call',
      steps: [
        'Identify the problem: write one sentence describing what your project does and who it helps.',
        'Define the MVP (Minimum Viable Product): the smallest version that still solves the problem.',
        'Plan the data model: what information does your app store? Sketch the database tables.',
        'Plan the UI: sketch the key screens on paper before writing any code.',
        'Set up your project: Git repo, folder structure, deployment pipeline first.',
        'Build the backend first \u2014 get your data model working and your API endpoints tested.',
        'Build the frontend next \u2014 connect it to your backend.',
        'Test everything: what happens when things go wrong? Handle errors gracefully.',
        'Write a README that explains what it is, how to run it, and what you learned building it.',
        'Deploy it, share it, and add it to your portfolio. You\'re done.'
      ]
    }
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">BUILD MODE</div>' +
    '<div class="panel-hero-title">Build Real Things</div>' +
    '<div class="panel-hero-sub">Projects unlock as you complete floors. Each one has guided steps to get you started \u2014 but the decisions are yours.</div>' +
    '</div>' +
    '<div class="build-grid">';

  projects.forEach(function(p) {
    var unlocked = true; // all floors unlocked
    var done = state.completed['build-' + p.floor];
    var stepsHtml = '';
    if (unlocked && p.steps) {
      stepsHtml = '<div class="build-steps"><div class="build-steps-label">HOW TO BUILD IT</div><ol class="build-step-list">' +
        p.steps.map(function(s){ return '<li class="build-step-item">' + s + '</li>'; }).join('') +
        '</ol>' +
        (!done ? '<button class="build-mark-done" onclick="markBuildDone(' + p.floor + ');event.stopPropagation()">Mark as Complete \u2713</button>' : '') +
        '</div>';
    }
    html += '<div class="build-card' + (!unlocked ? ' locked' : '') + (done ? ' done' : '') + '">' +
      '<div class="build-card-icon">' + p.icon + '</div>' +
      '<div class="build-card-tag">FLOOR ' + p.floor + ' PROJECT' + (done ? ' \u2713' : !unlocked ? ' \u2014 LOCKED' : '') + '</div>' +
      '<div class="build-card-title">' + p.title + '</div>' +
      '<div class="build-card-desc">' + p.desc + '</div>' +
      '<div class="build-card-meta">' +
      p.skills.map(function(s){ return '<span class="build-meta-pill">' + s + '</span>'; }).join('') +
      '<span class="build-meta-pill floor-pill">~' + p.time + '</span>' +
      '</div>' + stepsHtml + '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

function markBuildDone(floorNum) {
  state.completed['build-' + floorNum] = true;
  awardXP(100, 'build-project-' + floorNum, window.innerWidth / 2, 300);
  saveState();
  renderBuildPanel();
}

function startBuildProject(floorNum) {
  var fi = floorNum - 1;
  if (!isFloorComplete(fi) && fi > 0) {
    var incomplete = FLOORS[fi].sections.filter(function(s) { return !state.completed[s.id]; });
    var names = incomplete.slice(0, 2).map(function(s) { return '\u201c' + s.title + '\u201d'; }).join(', ');
    var extra = incomplete.length > 2 ? ' and ' + (incomplete.length - 2) + ' more' : '';
    sageMessage('This project unlocks when you finish Floor ' + floorNum + '. Still needed: ' + names + extra + '. Head to the Learn tab to complete them.', 'warn');
    return;
  }

  // Switch to Learn tab properly
  var learnBtn = document.getElementById('tnav-learn');
  switchTopNav('learn', learnBtn);

  // Navigate to the last (project) section of that floor
  var floor = FLOORS[fi];
  var lastSi = floor.sections.length - 1;
  goToSection(fi, lastSi);

  // Try to open Code Editor tab if it exists, otherwise stay on Read tab
  setTimeout(function() {
    var tabBtns = document.querySelectorAll('.section-tab-btn');
    tabBtns.forEach(function(btn) {
      if (btn.textContent.trim() === 'Code Editor') btn.click();
    });
    // Scroll to top so user sees the section
    var mainCol = document.getElementById('main-col');
    if (mainCol) mainCol.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 300);
}



function renderToolsPanel() {
  var panel = document.getElementById('panel-tools');
  if (!panel) return;

  var tools = [
    {
      id: 'vscode',
      icon: '🖥️',
      name: 'VS Code',
      desc: 'The code editor used by most professional developers worldwide.',
      difficulty: 'Beginner',
      category: 'Editor',
      xp: 25,
      steps: [
        'Go to <strong>code.visualstudio.com</strong> and click Download for your operating system.',
        'Run the installer and follow the prompts. Accept all defaults.',
        'Open VS Code. You will see the Welcome tab.',
        'Press <strong>Ctrl+`</strong> (or Cmd+` on Mac) to open the built-in terminal.',
        'Click the Extensions icon on the left sidebar (looks like four squares).',
        'Search for <strong>Prettier</strong> and install it — this auto-formats your code.',
        'Search for <strong>Live Server</strong> and install it — this lets you preview HTML files live in the browser.',
        'Create a new file with <strong>Ctrl+N</strong>, save it as <strong>index.html</strong>, and type an exclamation mark then press Tab. VS Code will generate a full HTML skeleton.'
      ]
    },
    {
      id: 'git',
      icon: '🌿',
      name: 'Git',
      desc: 'Version control that tracks every change you make to your code.',
      difficulty: 'Beginner',
      category: 'Version Control',
      xp: 25,
      steps: [
        'Go to <strong>git-scm.com</strong> and download Git for your operating system.',
        'Run the installer. When asked about the default editor, choose VS Code if listed.',
        'Open a terminal (or VS Code\'s built-in terminal) and run: <code>git --version</code>. You should see a version number.',
        'Set your name: <code>git config --global user.name "Your Name"</code>',
        'Set your email: <code>git config --global user.email "you@example.com"</code>',
        'Navigate to a project folder and run <code>git init</code> to start tracking it.',
        'Run <code>git add .</code> to stage all files, then <code>git commit -m "first commit"</code> to save a snapshot.',
        'Run <code>git log</code> to see your commit history. You have version control.'
      ]
    },
    {
      id: 'github',
      icon: '🐙',
      name: 'GitHub',
      desc: 'Cloud hosting for your Git repositories — and where developers share work.',
      difficulty: 'Beginner',
      category: 'Version Control',
      xp: 25,
      steps: [
        'Go to <strong>github.com</strong> and create a free account.',
        'Verify your email address when prompted.',
        'Click the <strong>+</strong> button at the top right and choose "New repository".',
        'Give it a name (e.g. <strong>my-first-project</strong>), leave it public, and click Create.',
        'GitHub will show you setup commands. Copy the ones under "push an existing repository".',
        'In your terminal, paste and run those commands. Your code is now on GitHub.',
        'Refresh the GitHub page — you should see your files.',
        'Click on a file to view it. Click the pencil icon to edit it directly in the browser.'
      ]
    },
    {
      id: 'devtools',
      icon: '🔍',
      name: 'Chrome DevTools',
      desc: 'Built into your browser — inspect, debug, and tweak any webpage in real time.',
      difficulty: 'Beginner',
      category: 'Browser',
      xp: 25,
      steps: [
        'Open Google Chrome and go to any webpage.',
        'Press <strong>F12</strong> (or Cmd+Option+I on Mac) to open DevTools.',
        'Click the <strong>Elements</strong> tab to see the HTML structure of the page.',
        'Hover over elements in the panel — the corresponding part of the page highlights.',
        'Double-click any text in the Elements panel to edit it live. Changes disappear on refresh.',
        'Click the <strong>Console</strong> tab. Type <code>document.title</code> and press Enter — it returns the page title.',
        'Click the <strong>Sources</strong> tab to see the page\'s CSS and JavaScript files.',
        'Click the device icon (top-left of DevTools) to preview the page on a mobile screen size.'
      ]
    },
    {
      id: 'nodejs',
      icon: '⬡',
      name: 'Node.js',
      desc: 'Runs JavaScript outside the browser — powers servers, build tools, and npm.',
      difficulty: 'Intermediate',
      category: 'Runtime',
      xp: 50,
      steps: [
        'Go to <strong>nodejs.org</strong> and download the LTS (Long Term Support) version.',
        'Run the installer and accept all defaults. It will also install npm.',
        'Open a terminal and run <code>node --version</code> — you should see a version number.',
        'Run <code>npm --version</code> to confirm npm is also installed.',
        'Create a file called <strong>hello.js</strong> and write: <code>console.log("Hello from Node");</code>',
        'In the terminal, navigate to that file and run: <code>node hello.js</code>',
        'You should see the message printed. Node ran your JavaScript without a browser.',
        'You now have access to the npm ecosystem — millions of open source packages.'
      ]
    },
    {
      id: 'netlify',
      icon: '🚀',
      name: 'Netlify',
      desc: 'Deploy your HTML/CSS/JS projects live on the internet for free in under a minute.',
      difficulty: 'Beginner',
      category: 'Deployment',
      xp: 25,
      steps: [
        'Go to <strong>netlify.com</strong> and sign up for a free account (you can use GitHub to log in).',
        'Click <strong>Add new site</strong> → <strong>Deploy manually</strong>.',
        'Drag and drop your project folder onto the upload area.',
        'Netlify gives you a random URL immediately — your site is live.',
        'Click <strong>Site settings</strong> → <strong>Change site name</strong> to set a custom subdomain.',
        'For auto-deploys: go to <strong>Add new site</strong> → <strong>Import from GitHub</strong> and connect your repo.',
        'Every time you push to GitHub, Netlify automatically rebuilds and redeploys your site.',
        'Check the <strong>Deploys</strong> tab to see the build log and confirm each deploy succeeded.'
      ]
    },
    {
      id: 'figma',
      icon: '🎨',
      name: 'Figma',
      desc: 'Design and prototype interfaces in the browser before writing a single line of code.',
      difficulty: 'Beginner',
      category: 'Design',
      xp: 25,
      steps: [
        'Go to <strong>figma.com</strong> and create a free account.',
        'Click <strong>New design file</strong> to open the canvas.',
        'Press <strong>F</strong> to create a frame (your screen size). Choose Desktop (1440×1024) from the right panel.',
        'Press <strong>R</strong> to draw a rectangle. Set its colour, size, and corner radius in the right panel.',
        'Press <strong>T</strong> to add text. Click anywhere on the canvas and start typing.',
        'Use the Components panel to create reusable elements — design a button once, use it everywhere.',
        'Click the Play button (top right) to enter Prototype mode and preview your design.',
        'Share your file via the Share button and copy the link — anyone with the link can view it in the browser.'
      ]
    },
    {
      id: 'postman',
      icon: '📮',
      name: 'Postman',
      desc: 'Test and explore APIs without writing any code — essential for backend and full-stack work.',
      difficulty: 'Intermediate',
      category: 'API Testing',
      xp: 50,
      steps: [
        'Go to <strong>postman.com</strong> and download the free desktop app, or use the web version.',
        'Create a free account and sign in.',
        'Click <strong>New</strong> → <strong>HTTP Request</strong> to open a blank request tab.',
        'Set the method to <strong>GET</strong> and enter this URL: <code>https://jsonplaceholder.typicode.com/posts/1</code>',
        'Click <strong>Send</strong>. You will see a JSON response appear in the panel below — this is real API data.',
        'Change the method to <strong>POST</strong>, click the <strong>Body</strong> tab, select <strong>raw</strong> and <strong>JSON</strong>, then enter: <code>{"title":"test","body":"hello"}</code>',
        'Click Send again. The server responds with the data you sent plus an assigned ID.',
        'Use <strong>Collections</strong> (left sidebar) to group and save related requests — one collection per project or API you are testing.'
      ]
    },
    {
      id: 'davinci',
      icon: '🎬',
      name: 'DaVinci Resolve',
      desc: 'Professional video editor — free and industry-standard. Use it to create portfolio walkthrough videos.',
      difficulty: 'Intermediate',
      category: 'Portfolio Video',
      xp: 50,
      steps: [
        'Go to <strong>blackmagicdesign.com/products/davinciresolve</strong> and download the free version.',
        'Run the installer. When it finishes, open DaVinci Resolve.',
        'On the Project Manager screen, click <strong>New Project</strong>, give it a name, and click Create.',
        'In the <strong>Cut</strong> or <strong>Edit</strong> page (tabs at the bottom), click the import icon and drag in your screen recording or footage.',
        'Drag your clip from the Media Pool onto the timeline at the bottom of the screen.',
        'Use the blade tool (<strong>B</strong>) to cut sections. Select unwanted clips and press Delete to remove them.',
        'To add a title: go to <strong>Titles</strong> in the Effects panel, drag a title style onto the timeline above your clip, and double-click to edit the text.',
        'When finished, click the <strong>Deliver</strong> tab (rocket icon at the bottom), choose YouTube as your preset, set a filename and export location, then click <strong>Add to Render Queue</strong> → <strong>Render All</strong>.'
      ]
    }
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">DEVELOPER TOOLS</div>' +
    '<div class="panel-hero-title">Set Up Your Toolkit</div>' +
    '<div class="panel-hero-sub">Every professional developer uses these tools. Work through them one at a time — each one makes the next easier.</div>' +
    '</div>' +
    '<div class="build-grid">';

  tools.forEach(function(t) {
    var stepsId = 'tool-steps-' + t.id;
    var isDone = !!state.completed['tool-' + t.id];
    var diffClass = t.difficulty === 'Beginner' ? 'tool-badge-beginner' : 'tool-badge-intermediate';
    var btnHtml = isDone
      ? '<button class="build-mark-done" disabled style="margin-top:16px;opacity:0.5;cursor:default;">Set Up ✓</button>'
      : '<button class="build-mark-done" id="tool-btn-' + t.id + '" onclick="markToolSetUp(\'' + t.id + '\',' + t.xp + ');event.stopPropagation()" style="margin-top:16px;">Mark as Set Up ✓</button>';
    var stepsHtml = '<div class="build-steps" id="' + stepsId + '" style="display:none;">' +
      '<div class="build-steps-label">STEP-BY-STEP GUIDE</div>' +
      '<ol class="build-step-list">' +
      t.steps.map(function(s) { return '<li class="build-step-item">' + s + '</li>'; }).join('') +
      '</ol>' + btnHtml +
      '</div>';

    html += '<div class="build-card' + (isDone ? ' done' : '') + '" id="tool-card-' + t.id + '" onclick="toggleToolSteps(\'' + stepsId + '\',this)">' +
      '<div class="build-card-icon">' + t.icon + '</div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">' +
      '<div class="build-card-tag" style="margin-bottom:0;">' + t.category.toUpperCase() + '</div>' +
      '<span class="build-meta-pill ' + diffClass + '">' + t.difficulty + '</span>' +
      '</div>' +
      '<div class="build-card-title">' + t.name + '</div>' +
      '<div class="build-card-desc">' + t.desc + '</div>' +
      stepsHtml +
      '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

function toggleToolSteps(stepsId, card) {
  var el = document.getElementById(stepsId);
  if (!el) return;
  var isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if (card) card.classList.toggle('tool-expanded', !isOpen);
}

function markToolSetUp(toolId, xp) {
  var stateKey = 'tool-' + toolId;
  if (state.completed[stateKey]) return;
  state.completed[stateKey] = true;
  saveState();
  awardXP(xp || 25, stateKey, window.innerWidth / 2, 300);
  var card = document.getElementById('tool-card-' + toolId);
  if (card) card.classList.add('done');
  var btn = document.getElementById('tool-btn-' + toolId);
  if (btn) {
    btn.textContent = 'Set Up ✓';
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'default';
    btn.onclick = null;
  }
}

var LEVEL_NAMES = ['', 'Curious', 'Learning', 'Builder', 'Coder', 'Developer', 'Engineer', 'Architect', 'Senior', 'Principal'];

var PROF_THEMES = [
  { id: 'cosmic-blue',   name: 'Cosmic Blue',   mood: 'Calm / beginner',
    dot: 'linear-gradient(135deg,#00c8ff,#0055cc)',
    glow: 'rgba(0,180,255,0.30)', border: 'rgba(0,180,255,0.50)', bg: 'rgba(0,160,255,0.10)' },
  { id: 'aurora-teal',   name: 'Aurora Teal',   mood: 'Focused / productive',
    dot: 'linear-gradient(135deg,#00e5b0,#007a60)',
    glow: 'rgba(0,220,160,0.30)', border: 'rgba(0,210,150,0.50)', bg: 'rgba(0,200,130,0.10)' },
  { id: 'royal-violet',  name: 'Royal Violet',  mood: 'Creative / advanced',
    dot: 'linear-gradient(135deg,#a855f7,#5b21b6)',
    glow: 'rgba(168,85,247,0.30)', border: 'rgba(160,80,240,0.50)', bg: 'rgba(150,70,230,0.10)' },
  { id: 'ember-crimson', name: 'Ember Crimson', mood: 'Intense / energetic',
    dot: 'linear-gradient(135deg,#ff5555,#cc2200)',
    glow: 'rgba(255,80,80,0.30)', border: 'rgba(255,70,70,0.50)', bg: 'rgba(255,60,60,0.10)' },
  { id: 'obsidian-gold', name: 'Obsidian Gold', mood: 'Premium / mastery',
    dot: 'linear-gradient(135deg,#e8c878,#9a7030)',
    glow: 'rgba(200,169,110,0.30)', border: 'rgba(200,169,110,0.50)', bg: 'rgba(200,160,80,0.10)' },
];

var AVATARS = [
  { id: 'initiate',  name: 'Initiate',  sub: 'The beginning of all things',   icon: '◈', color: '#60a5fa', glow: 'rgba(59,130,246,0.45)',  border: 'rgba(96,165,250,0.60)',  grad: 'linear-gradient(135deg,#60a5fa,#1d4ed8)' },
  { id: 'builder',   name: 'Builder',   sub: 'Craft with patience and fire',   icon: '⬡', color: '#fb923c', glow: 'rgba(249,115,22,0.45)',  border: 'rgba(251,146,60,0.60)',  grad: 'linear-gradient(135deg,#fb923c,#c2410c)' },
  { id: 'archivist', name: 'Archivist', sub: 'Knowledge is the true power',    icon: '⟡', color: '#c084fc', glow: 'rgba(168,85,247,0.45)',  border: 'rgba(192,132,252,0.60)', grad: 'linear-gradient(135deg,#c084fc,#7e22ce)' },
  { id: 'runner',    name: 'Runner',    sub: 'Speed and clarity in motion',    icon: '◐', color: '#34d399', glow: 'rgba(16,185,129,0.45)',  border: 'rgba(52,211,153,0.60)',  grad: 'linear-gradient(135deg,#34d399,#047857)' },
  { id: 'ascended',  name: 'Ascended',  sub: 'Mastery beyond all boundaries', icon: '✦', color: '#fbbf24', glow: 'rgba(234,179,8,0.45)',   border: 'rgba(251,191,36,0.60)',  grad: 'linear-gradient(135deg,#fbbf24,#92400e)' },
];

function getProfTheme() {
  return localStorage.getItem('codebook_prof_theme') || 'cosmic-blue';
}

function getCoverTheme() {
  return localStorage.getItem('codebook_cover_theme') || 'cosmic-blue';
}

function applyCoverTheme(id) {
  var screen = document.getElementById('auth-screen');
  if (!screen) return;
  screen.className = screen.className.replace(/\bauth-theme-\S+/g, '').trim();
  screen.classList.add('auth-theme-' + id);
  document.querySelectorAll('.cover-orb').forEach(function(orb) {
    orb.classList.toggle('active', orb.getAttribute('data-theme') === id);
  });
}

function switchCoverTheme(id) {
  localStorage.setItem('codebook_cover_theme', id);
  applyCoverTheme(id);
}

function applyProfThemeToBody(id) {
  document.body.className = document.body.className.replace(/\bprof-theme-\S+/g, '').trim();
  document.body.classList.add('prof-theme-' + id);
}

function switchProfTheme(id) {
  localStorage.setItem('codebook_prof_theme', id);
  applyProfThemeToBody(id);
  renderProfilePanel();
}

function getSelectedAvatar() {
  return localStorage.getItem('codebook_avatar') || null;
}

function selectAvatar(id) {
  localStorage.setItem('codebook_avatar', id);
  hideAvatarPicker();
  renderProfilePanel();
}

function showAvatarPicker() {
  var existing = document.getElementById('avatar-picker');
  if (existing) existing.remove();

  var selectedId = getSelectedAvatar();
  var cardsHtml = AVATARS.map(function(av) {
    var isSelected = av.id === selectedId;
    return '<div class="avatar-card' + (isSelected ? ' selected' : '') + '"' +
      ' onclick="selectAvatar(\'' + av.id + '\')"' +
      ' style="--av-color:' + av.color + ';--av-glow:' + av.glow + ';--av-border:' + av.border + '">' +
      '<div class="avatar-card-icon">' + av.icon + '</div>' +
      '<div class="avatar-card-name">' + av.name + '</div>' +
      '<div class="avatar-card-sub">' + av.sub + '</div>' +
      '</div>';
  }).join('');

  var el = document.createElement('div');
  el.id = 'avatar-picker';
  el.className = 'avatar-picker';
  el.innerHTML =
    '<div class="avatar-picker-inner">' +
    '<button class="avatar-picker-close" onclick="hideAvatarPicker()">&#x2715;</button>' +
    '<div class="avatar-picker-title">Choose a character.</div>' +
    '<div class="avatar-cards">' + cardsHtml + '</div>' +
    '</div>';
  el.addEventListener('click', function(e) { if (e.target === el) hideAvatarPicker(); });
  document.body.appendChild(el);
  requestAnimationFrame(function() { el.classList.add('open'); });
}

function hideAvatarPicker() {
  var picker = document.getElementById('avatar-picker');
  if (!picker) return;
  picker.classList.remove('open');
  setTimeout(function() { if (picker.parentNode) picker.parentNode.removeChild(picker); }, 300);
}

function renderGamePanel() {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  panel.innerHTML =
    '<div class="game-hub gh-lights-off" id="game-hub-root">' +

      '<div class="gh-switch-row">' +
        '<button class="gh-light-switch" onclick="toggleGameLight()" title="Toggle light">' +
          '<div class="gh-switch-plate">' +
            '<div class="gh-switch-rocker"></div>' +
          '</div>' +
        '</button>' +
      '</div>' +

      '<div class="gh-dark-overlay" id="gh-dark-overlay">' +
        '<div class="gh-sage-dark">' +
          '<div class="gh-sage-owl">&#129417;</div>' +
          '<div class="gh-sage-msg">Switch on the light to reveal the room.</div>' +
        '</div>' +
      '</div>' +

      '<div class="gh-content">' +
        '<div class="gh-header">' +
          '<div class="gh-title">GAME HUB</div>' +
          '<div class="gh-sub">Choose your mission. More games coming soon.</div>' +
        '</div>' +
        '<div class="gh-grid">' +

          '<div class="gh-card gh-card--active" onclick="launchGame(\'launch-sequence\')">' +
            '<div class="gh-card-badge gh-card-badge--live">LIVE</div>' +
            '<div class="gh-card-icon">&#128640;</div>' +
            '<div class="gh-card-name">LAUNCH SEQUENCE</div>' +
            '<div class="gh-card-desc">Educational sci-fi mission. Repair rocket systems, debug code faults, and launch to Mars.</div>' +
            '<button class="gh-card-btn">PLAY NOW</button>' +
          '</div>' +

          '<div class="gh-card gh-card--locked">' +
            '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
            '<div class="gh-card-icon">&#128274;</div>' +
            '<div class="gh-card-name">MISSION 2</div>' +
            '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
            '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
          '</div>' +

          '<div class="gh-card gh-card--locked">' +
            '<div class="gh-card-badge gh-card-badge--soon">COMING SOON</div>' +
            '<div class="gh-card-icon">&#128274;</div>' +
            '<div class="gh-card-name">MISSION 3</div>' +
            '<div class="gh-card-desc">A new challenge is being prepared. Stand by for further transmissions.</div>' +
            '<button class="gh-card-btn gh-card-btn--locked" disabled>LOCKED</button>' +
          '</div>' +

        '</div>' +
      '</div>' +

    '</div>';
}

function toggleGameLight() {
  var root = document.getElementById('game-hub-root');
  var overlay = document.getElementById('gh-dark-overlay');
  if (!root) return;
  if (root.classList.contains('gh-lights-off')) {
    root.classList.remove('gh-lights-off');
    root.classList.add('gh-lights-on');
    if (overlay) overlay.style.display = 'none';
  } else {
    root.classList.remove('gh-lights-on');
    root.classList.add('gh-lights-off');
    if (overlay) overlay.style.display = 'flex';
  }
}


function launchGame(gameId) {
  var panel = document.getElementById('panel-game');
  if (!panel) return;
  var src = gameId === 'launch-sequence' ? './game/index.html' : './game/index.html';
  panel.innerHTML =
    '<div class="gh-back-bar">' +
      '<button class="gh-back-btn" onclick="renderGamePanel()">&#8592; GAME HUB</button>' +
    '</div>' +
    '<iframe src="' + src + '" title="' + gameId + '" allowfullscreen ' +
      'style="width:100%;height:calc(100% - 44px);border:none;display:block;"></iframe>';
}

function renderProfilePanel() {
  var panel = document.getElementById('panel-profile');
  if (!panel) return;

  var currentTheme = getProfTheme();
  var name = state.playerName || localStorage.getItem('codebook_player_name') || 'Learner';
  var cur = getCurrentLevel();
  var next = getNextLevel();
  var levelName = LEVEL_NAMES[cur.level] || 'Level ' + cur.level;
  var nextName = next ? (LEVEL_NAMES[next.level] || 'Level ' + next.level) : 'Max';
  var xpIntoLevel = state.xp - cur.xp;
  var xpForNextLevel = next ? (next.xp - cur.xp) : 1;
  var levelPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100)) : 100;

  // Totals
  var totalSecs = 0;
  FLOORS.forEach(function(f) { totalSecs += f.sections.length; });
  var doneSecs = Object.keys(state.completed).filter(function(k){
    return state.completed[k] && FLOORS.some(function(f){ return f.sections.some(function(s){ return s.id === k; }); });
  }).length;
  var floorsComplete = FLOORS.filter(function(f, fi){ return isFloorComplete(fi); }).length;
  var totalMinutes = Math.round((state.totalSeconds || 0) / 60);

  // 28-day activity grid (4 weeks)
  var actLog = getActivityLog();
  var actMap = {};
  actLog.forEach(function(a) {
    var d = new Date(a.time); d.setHours(0,0,0,0);
    actMap[d.toDateString()] = (actMap[d.toDateString()] || 0) + 1;
  });
  var today = new Date(); today.setHours(0,0,0,0);
  var calDays = [];
  for (var i = 27; i >= 0; i--) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    calDays.push({ label: d.toDateString(), count: actMap[d.toDateString()] || 0, isToday: i === 0 });
  }

  // Achievements
  var ACHIEVEMENTS = [
    { id: 'first_section', sym: '→',   label: 'First Step',    desc: 'Complete your first section',  check: function(){ return doneSecs >= 1; } },
    { id: 'five_sections', sym: '×5',  label: 'On A Roll',     desc: 'Complete 5 sections',           check: function(){ return doneSecs >= 5; } },
    { id: 'floor_1_done',  sym: 'F1',  label: 'Foundation',    desc: 'Complete Floor 1',              check: function(){ return isFloorComplete(0); } },
    { id: 'floor_any',     sym: '◆',   label: 'Floor Cleared', desc: 'Complete any floor',            check: function(){ return floorsComplete >= 1; } },
    { id: 'streak_3',      sym: '3↑',  label: 'On Fire',       desc: '3-day streak',                  check: function(){ return state.streak >= 3; } },
    { id: 'streak_7',      sym: '7↑',  label: 'Dedicated',     desc: '7-day streak',                  check: function(){ return state.streak >= 7; } },
    { id: 'xp_100',        sym: '100', label: 'XP Hunter',     desc: 'Earn 100 XP',                  check: function(){ return state.xp >= 100; } },
    { id: 'xp_500',        sym: '500', label: 'XP Master',     desc: 'Earn 500 XP',                  check: function(){ return state.xp >= 500; } },
    { id: 'all_floors',    sym: '7/7', label: 'Graduate',      desc: 'Complete all 7 floors',         check: function(){ return floorsComplete === 7; } },
  ];

  // Floor progress rows
  var floorRows = FLOORS.map(function(f, fi) {
    var done = f.sections.filter(function(s){ return state.completed[s.id]; }).length;
    var total = f.sections.length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var isUnlocked = true; // all floors unlocked
    var color = f.color || '#c8a96e';
    var status = isFloorComplete(fi) ? 'Complete' : (done > 0 ? 'In Progress' : (isUnlocked ? 'Not Started' : 'Locked'));
    return '<div class="prof-floor-row">' +
      '<div class="prof-floor-num" style="color:' + color + '">F' + (fi + 1) + '</div>' +
      '<div class="prof-floor-info">' +
      '<div class="prof-floor-name">' + f.title + '</div>' +
      '<div class="prof-floor-bar-wrap">' +
      '<div class="prof-floor-track"><div class="prof-floor-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '<span class="prof-floor-stat">' + done + '/' + total + '</span>' +
      '</div></div>' +
      '<div class="prof-floor-status prof-status-' + (isFloorComplete(fi) ? 'done' : (done > 0 ? 'active' : 'locked')) + '">' + status + '</div>' +
      '</div>';
  }).join('');

  var calHtml = '<div class="prof-cal-grid">' +
    calDays.map(function(day) {
      var intensity = day.count === 0 ? 'empty' : day.count >= 3 ? 'high' : day.count >= 2 ? 'mid' : 'low';
      return '<div class="prof-cal-day prof-cal-' + intensity + (day.isToday ? ' prof-cal-today' : '') + '" title="' + day.label + '"></div>';
    }).join('') +
    '</div>';

  var achieveHtml = '<div class="prof-ach-list">' +
    ACHIEVEMENTS.map(function(a) {
      var earned = a.check();
      return '<div class="prof-ach-row' + (earned ? ' earned' : '') + '">' +
        '<span class="prof-ach-check">' + (earned ? '&#10003;' : '&#9633;') + '</span>' +
        '<span class="prof-ach-sym">' + a.sym + '</span>' +
        '<div class="prof-ach-meta">' +
        '<span class="prof-ach-name">' + a.label + '</span>' +
        '<span class="prof-ach-desc">' + a.desc + '</span>' +
        '</div>' +
        '</div>';
    }).join('') +
    '</div>';

  var heroSwatchesHtml = '<div class="prof-hero-swatches">' +
    PROF_THEMES.map(function(t) {
      var isActive = t.id === currentTheme;
      return '<button class="prof-hswatch' + (isActive ? ' active' : '') + '"' +
        ' title="' + t.name + '"' +
        ' onclick="switchProfTheme(\'' + t.id + '\')"' +
        ' style="--sw-dot:' + t.dot + ';--sw-glow:' + t.glow + ';--sw-border:' + t.border + '">' +
        '</button>';
    }).join('') +
    '</div>';

  var selectedAv = AVATARS.find(function(a) { return a.id === getSelectedAvatar(); }) || null;
  var archetypeHtml = selectedAv
    ? '<div class="prof-archetype-frame" style="--av-color:' + selectedAv.color + ';--av-glow:' + selectedAv.glow + '">' +
      '<span class="prof-archetype-icon">' + selectedAv.icon + '</span>' +
      '<span class="prof-archetype-name">' + selectedAv.name + '</span>' +
      '</div>'
    : '';

  var timeDisplay = totalMinutes >= 60
    ? Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm'
    : totalMinutes + 'm';

  panel.innerHTML =
    '<div class="prof-layout" data-prof-theme="' + currentTheme + '">' +

    // Hero
    '<div class="prof-hero">' +
    '<div class="prof-hero-left">' +
    '<div class="prof-id-tag">// OPERATOR</div>' +
    '<div class="prof-name">' + name + '</div>' +
    '<div class="prof-level-name">Level ' + cur.level + ' &mdash; ' + levelName + '</div>' +
    heroSwatchesHtml +
    '</div>' +
    '<div class="prof-hero-right">' +
    archetypeHtml +
    '<button class="prof-avatar-plus" onclick="showAvatarPicker()">' + (selectedAv ? 'CHANGE' : 'PICK ARCHETYPE') + '</button>' +
    '</div>' +
    '</div>' +

    // HUD strip
    '<div class="prof-hud">' +
    '<div class="prof-hud-stat"><span class="prof-hud-val">' + state.xp + '</span><span class="prof-hud-lbl">XP</span></div>' +
    '<div class="prof-hud-div"></div>' +
    '<div class="prof-hud-stat"><span class="prof-hud-val">' + state.streak + '</span><span class="prof-hud-lbl">Streak</span></div>' +
    '<div class="prof-hud-div"></div>' +
    '<div class="prof-hud-stat"><span class="prof-hud-val">' + doneSecs + '</span><span class="prof-hud-lbl">Sections</span></div>' +
    '<div class="prof-hud-div"></div>' +
    '<div class="prof-hud-stat"><span class="prof-hud-val">' + timeDisplay + '</span><span class="prof-hud-lbl">Time</span></div>' +
    '</div>' +

    // Level progress
    '<div class="prof-section">' +
    '<div class="prof-section-title">// Level Progress</div>' +
    '<div class="prof-level-bar-wrap">' +
    '<span class="prof-level-tag">' + levelName + '</span>' +
    '<div class="prof-level-track"><div class="prof-level-fill" style="width:' + levelPct + '%"></div></div>' +
    '<span class="prof-level-tag">' + nextName + '</span>' +
    '</div>' +
    '<div class="prof-level-sub">' + state.xp + ' XP' + (next ? ' &mdash; ' + (next.xp - state.xp) + ' XP to ' + nextName : ' &mdash; Max level reached') + '</div>' +
    '</div>' +

    // Two-column: activity + achievements
    '<div class="prof-two-col">' +
    '<div class="prof-section">' +
    '<div class="prof-section-title">// Activity &mdash; Last 28 Days</div>' +
    calHtml +
    '</div>' +
    '<div class="prof-section">' +
    '<div class="prof-section-title">// Achievements</div>' +
    achieveHtml +
    '</div>' +
    '</div>' +

    // Floor progress
    '<div class="prof-section">' +
    '<div class="prof-section-title">// Floor Progress</div>' +
    '<div class="prof-floors">' + floorRows + '</div>' +
    '</div>' +

    '</div>';
}

function renderPremiumPanel() {
  var panel = document.getElementById('panel-premium');
  if (!panel) return;

  var alreadyNotified = !!localStorage.getItem('codebook_premium_notify');

  var features = [
    {
      icon: '🔑', name: 'All 7 Floors Unlocked',
      desc: 'Every floor available from day one — no waiting, no gates.',
      fullDesc: 'Free users access Floors 1 and 2. Premium unlocks all seven immediately so you move at your own pace without hitting walls. No floor is hidden from you on day one.',
      problem: 'Solves: hitting a paywall mid-momentum.'
    },
    {
      icon: '🧑‍💻', name: 'Mentorship Sessions',
      desc: 'Live 1-on-1 calls with an experienced developer, booked on your schedule.',
      fullDesc: 'Book a 45-minute video call with a working developer whenever you need a second opinion. Bring a project, a problem, or just questions — we\'ll talk through it. Included every month.',
      problem: 'Solves: learning alone with no one to ask.'
    },
    {
      icon: '📋', name: 'Code Reviews',
      desc: 'Submit any project and get written, line-by-line feedback within 48 hours.',
      fullDesc: 'Submit any project you\'ve built and receive written feedback within 48 hours. Comments are specific and actionable — not generic. Real code, real notes, real improvement.',
      problem: 'Solves: never knowing if your code is actually good.'
    },
    {
      icon: '📜', name: 'Completion Certificate',
      desc: 'A verifiable certificate issued when you finish all seven floors.',
      fullDesc: 'Finishing all seven floors earns you a certificate with a unique verification link. Share it on your CV or LinkedIn. Employers can confirm it is genuine with one click.',
      problem: 'Solves: having no credential to show for your effort.'
    },
    {
      icon: '💬', name: 'Private Community',
      desc: 'Access to a members-only space for questions, accountability, and feedback.',
      fullDesc: 'A members-only space where premium learners share progress, ask questions, and give each other feedback. No noise — just people doing the same work as you.',
      problem: 'Solves: learning in isolation with no peers to compare notes with.'
    },
    {
      icon: '🎯', name: 'Career Coaching',
      desc: 'CV review, portfolio feedback, and mock interview prep included.',
      fullDesc: 'One session focused entirely on your job search: CV review, portfolio critique, and a mock technical interview. Practical, specific, and honest.',
      problem: 'Solves: not knowing if you\'re actually ready to apply.'
    },
    {
      icon: '⚡', name: 'Priority Support',
      desc: 'Any question answered by a human within 24 hours, guaranteed.',
      fullDesc: 'Post any question — about the curriculum, your code, or your career — and a human responds within 24 hours. Not a bot. Not a forum. A person.',
      problem: 'Solves: getting stuck with nowhere to turn.'
    },
    {
      icon: '📦', name: 'Resource Packs',
      desc: 'Cheat sheets, starter templates, and reference guides for every floor.',
      fullDesc: 'Floor-by-floor cheat sheets, reusable HTML/CSS/JS starter templates, and quick-reference cards for every major concept. Download them, keep them, use them forever.',
      problem: 'Solves: rebuilding from scratch every time you start something new.'
    },
    {
      icon: '🧭', name: 'Adaptive Paths',
      desc: 'Personalized learning paths that adjust based on performance.',
      fullDesc: 'Dynamically adjusts what you learn next based on your strengths, weaknesses, and completed tools. Keeps you in an optimal challenge zone and removes wasted time.',
      problem: 'Solves: following a fixed path that doesn\'t match where you actually are.'
    },
    {
      icon: '🎧', name: 'Deep Work Mode',
      desc: 'Distraction-free learning sessions with focus tracking.',
      fullDesc: 'Locks the interface into a clean, minimal mode, tracks uninterrupted focus time, and rewards longer deep work sessions with bonus XP.',
      problem: 'Solves: short, scattered sessions that never build momentum.'
    },
    {
      icon: '🏗️', name: 'Project Builder',
      desc: 'Guided real-world projects to apply your skills.',
      fullDesc: 'Step-by-step project workflows that turn your knowledge into portfolio-ready work. Includes milestones, checkpoints, and completion validation.',
      problem: 'Solves: knowing the theory but not knowing how to build something real.'
    },
    {
      icon: '📊', name: 'Skill Benchmarking',
      desc: 'Compare your progress against real-world standards.',
      fullDesc: 'Shows how your current skill level compares to industry expectations. Highlights gaps and suggests what to improve next.',
      problem: 'Solves: not knowing if you\'re actually job-ready.'
    },
    {
      icon: '🤖', name: 'AI Code Review',
      desc: 'Instant feedback on your code and projects.',
      fullDesc: 'Analyzes your work and gives actionable feedback on structure, readability, and best practices — like having a senior developer review your code.',
      problem: 'Solves: submitting work with no idea if it\'s any good.'
    },
    {
      icon: '⚡', name: 'Momentum Boost',
      desc: 'Temporary XP boosts for consistent progress.',
      fullDesc: 'Rewards streaks and consistent activity with short-term XP multipliers, encouraging daily engagement and habit building.',
      problem: 'Solves: losing motivation between sessions.'
    },
    {
      icon: '💼', name: 'Opportunity Board',
      desc: 'Unlock real opportunities as you progress.',
      fullDesc: 'Access curated internships, freelance gigs, and job leads once you reach certain milestones, turning learning into real-world outcomes.',
      problem: 'Solves: finishing the curriculum with no idea what to do next.'
    }
  ];

  var html = '<div class="panel-hero" style="text-align:center;padding:60px 32px 40px;">' +
    '<div style="font-size:48px;margin-bottom:20px;">♛</div>' +
    '<div class="panel-hero-label">PREMIUM</div>' +
    '<div class="panel-hero-title">Unlock The Full Book</div>' +
    '<div class="panel-hero-sub" style="max-width:480px;margin:0 auto 32px;">Everything in the free tier, plus the tools that turn learning into a career.</div>' +
    '<div style="display:flex;flex-direction:column;align-items:center;gap:14px;">' +
    '<button class="build-mark-done" disabled style="opacity:0.4;cursor:not-allowed;font-size:14px;padding:14px 32px;letter-spacing:1px;">Join Premium — Coming Soon</button>' +
    (alreadyNotified
      ? '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--success,#48bb78);letter-spacing:1px;">✓ You\'re on the notify list</div>'
      : '<button onclick="showPremiumNotify()" style="background:none;border:none;color:var(--accent);font-family:\'IBM Plex Mono\',monospace;font-size:11px;letter-spacing:2px;cursor:pointer;text-decoration:underline;text-underline-offset:4px;">Notify me when it\'s ready</button>'
    ) +
    '</div>' +
    '</div>' +
    '<div class="premium-grid">';

  features.forEach(function(f) {
    html += '<div class="premium-feature-card" onclick="togglePremiumTooltip(this)">' +
      '<div class="premium-card-lock">♛</div>' +
      '<div class="premium-card-icon">' + f.icon + '</div>' +
      '<div class="premium-card-name">' + f.name + '</div>' +
      '<div class="premium-card-desc">' + f.desc + '</div>' +
      '<div class="premium-card-tooltip">' +
      '<div class="premium-tooltip-full">' + f.fullDesc + '</div>' +
      '<div class="premium-tooltip-problem">' + f.problem + '</div>' +
      '<div class="premium-tooltip-badge">♛ Available with Premium</div>' +
      '</div>' +
      '</div>';
  });

  html += '</div>';

  panel.innerHTML = html;
}

function showPremiumNotify() {
  var overlay = document.getElementById('premium-notify-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function hidePremiumNotify() {
  var overlay = document.getElementById('premium-notify-overlay');
  if (overlay) overlay.style.display = 'none';
}

function submitPremiumNotify() {
  var input = document.getElementById('premium-notify-email');
  var email = input ? input.value.trim() : '';
  if (!email || !email.includes('@')) {
    if (input) { input.style.borderColor = '#e53e3e'; input.focus(); }
    return;
  }
  localStorage.setItem('codebook_premium_notify', email);
  var form = document.getElementById('premium-notify-form');
  var confirm = document.getElementById('premium-notify-confirm');
  if (form) form.style.display = 'none';
  if (confirm) confirm.style.display = 'block';
  renderPremiumPanel();
}

function togglePremiumTooltip(card) {
  var isOpen = card.classList.contains('tooltip-open');
  document.querySelectorAll('.premium-feature-card.tooltip-open').forEach(function(c) {
    c.classList.remove('tooltip-open');
  });
  if (!isOpen) card.classList.add('tooltip-open');
}

function renderChallengePanel() {
  var panel = document.getElementById('panel-challenge');
  if (!panel) return;

  var challenges = [
    { icon: '\u26A1', type: 'DAILY', title: "Today's Knowledge Check", desc: 'One question. Earn bonus XP. Resets every day.', xp: '+20 XP', action: 'showDailyChallenge()', done: !!localStorage.getItem('codebook_challenge_done_' + new Date().toDateString()) },
    { icon: '\uD83E\uDDE0', type: 'RECALL', title: 'Spaced Repetition Quiz', desc: 'Questions from sections you completed. Reinforce what you know.', xp: '+15 XP each', action: 'startRecallQuiz()', done: false },
    { icon: '\u23F1\uFE0F', type: 'SPEED', title: 'Speed Round', desc: '10 questions. 30 seconds each. How fast can you go?', xp: '+50 XP', action: 'startSpeedRound()', done: false, locked: state.xp < 100 },
    { icon: '\uD83D\uDD25', type: 'STREAK', title: 'Streak Challenge', desc: 'Answer 5 questions in a row without getting one wrong.', xp: '+75 XP', action: 'startStreakChallenge()', done: false, locked: state.xp < 200 },
    { icon: '\uD83C\uDFC6', type: 'FLOOR', title: 'Floor Boss', desc: 'A comprehensive quiz on everything in the floor you just completed.', xp: '+100 XP', action: 'startFloorBoss()', done: false, locked: !isFloorComplete(state.currentFloor - 1) },
  ];

  var html = '<div class="panel-hero">' +
    '<div class="panel-hero-label">CHALLENGE MODE</div>' +
    '<div class="panel-hero-title">Test Yourself</div>' +
    '<div class="panel-hero-sub">Challenges earn bonus XP and reinforce what you\'ve learned. The daily check resets at midnight.</div>' +
    '</div>' +
    '<div class="challenge-list">';

  challenges.forEach(function(ch) {
    var isLocked = ch.locked;
    var isDone = ch.done;
    html += '<div class="challenge-item' + (isLocked ? ' ch-locked' : '') + (isDone ? ' ch-done' : '') + '"' +
      (!isLocked ? ' onclick="' + ch.action + '"' : '') + '>' +
      '<div class="ch-icon">' + ch.icon + '</div>' +
      '<div class="ch-body">' +
      '<div class="ch-tag">' + ch.type + (isDone ? ' \u2014 DONE TODAY' : isLocked ? ' \u2014 LOCKED' : '') + '</div>' +
      '<div class="ch-title">' + ch.title + '</div>' +
      '<div class="ch-desc">' + ch.desc + '</div>' +
      '</div>' +
      '<div class="ch-xp">' + (isDone ? '\u2713' : ch.xp) + '</div>' +
      '</div>';
  });

  html += '</div>';
  panel.innerHTML = html;
}

// \u2500\u2500 RECALL QUIZ \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Picks a random question the user has NOT seen today, avoiding repetition.
function startRecallQuiz() {
  var answered = Object.keys(state.quizAnswered);
  if (answered.length === 0) {
    sageMessage('Complete some sections first to unlock recall quizzes.', 'tip');
    return;
  }
  // Pick a question not already used as today's daily challenge
  var today = new Date().toDateString();
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var dailyIdx = daysSinceEpoch % DAILY_CHALLENGES.length;
  // Offset by 1 from the daily so it is always a different question
  var recallIdx = (dailyIdx + 1) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[recallIdx];
  _openChallengeModal(
    challenge,
    'Spaced Repetition',
    'Reinforce what you already know. +' + challenge.xp + ' XP for a correct answer.',
    'recall-' + today + '-' + recallIdx
  );
}

// \u2500\u2500 SPEED ROUND \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Picks a question offset by 2 from the daily so it is always different.
var _speedRoundIndex = 0;
// \u2500\u2500 SPEED ROUND \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 10 questions, one per round. Tracks score across the session.
var _speedRoundIndex = 0;
var _speedRoundScore = 0;
var _speedRoundTotal = 10;
var _speedRoundCurrent = 0;
var _speedRoundTimer = null;
var _speedRoundTimeLeft = 30;

function startSpeedRound() {
  if (state.xp < 100) return;
  _speedRoundScore = 0;
  _speedRoundCurrent = 0;
  _speedRoundTimeLeft = 30;
  _nextSpeedQuestion();
}

function _nextSpeedQuestion() {
  if (_speedRoundCurrent >= _speedRoundTotal) {
    _endSpeedRound();
    return;
  }
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + _speedRoundCurrent + 2) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  var questionNum = _speedRoundCurrent + 1;

  _openChallengeModal(
    challenge,
    'Speed Round \u2014 ' + questionNum + ' of ' + _speedRoundTotal,
    '30 seconds. Score: ' + _speedRoundScore + ' correct.',
    'speed-' + today + '-' + idx
  );

  // Inject the timer bar into the modal
  var existingTimer = document.getElementById('speed-timer-bar');
  if (existingTimer) existingTimer.parentNode.removeChild(existingTimer);
  var timerWrap = document.createElement('div');
  timerWrap.id = 'speed-timer-bar';
  timerWrap.style.cssText = 'height:4px;background:var(--border);border-radius:4px;margin-bottom:16px;overflow:hidden;';
  var timerFill = document.createElement('div');
  timerFill.style.cssText = 'height:100%;background:var(--accent);border-radius:4px;width:100%;transition:width 1s linear;';
  timerWrap.appendChild(timerFill);
  var questionEl = document.getElementById('challenge-question');
  questionEl.parentNode.insertBefore(timerWrap, questionEl);

  _speedRoundTimeLeft = 30;
  clearInterval(_speedRoundTimer);
  _speedRoundTimer = setInterval(function() {
    _speedRoundTimeLeft--;
    timerFill.style.width = ((_speedRoundTimeLeft / 30) * 100) + '%';
    if (_speedRoundTimeLeft <= 0) {
      clearInterval(_speedRoundTimer);
      _speedRoundCurrent++;
      setTimeout(_nextSpeedQuestion, 600);
    }
  }, 1000);
}

function _endSpeedRound() {
  clearInterval(_speedRoundTimer);
  var total = _speedRoundTotal;
  var score = _speedRoundScore;
  var xpEarned = score * 5;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'speed-round-' + today, window.innerWidth / 2, 200);
  document.getElementById('challenge-title').textContent = 'Speed Round Complete!';
  document.getElementById('challenge-body').textContent = score + ' of ' + total + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = score >= 8 ? '\uD83C\uDFC6 Excellent!' : score >= 5 ? '\uD83D\uDC4D Good effort!' : '\uD83D\uDCAA Keep practising!';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}

// Override answerChallenge to track speed round score
var _inSpeedRound = false;
var _origAnswerChallenge = null;

// \u2500\u2500 STREAK CHALLENGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 5 questions in a row. One wrong answer ends the run.
var _streakIndex = 0;
var _streakCorrect = 0;
var _streakTotal = 5;
var _streakCurrent = 0;
var _streakFailed = false;

function startStreakChallenge() {
  if (state.xp < 200) return;
  _streakCorrect = 0;
  _streakCurrent = 0;
  _streakFailed = false;
  _nextStreakQuestion();
}

function _nextStreakQuestion() {
  if (_streakFailed || _streakCurrent >= _streakTotal) {
    _endStreakChallenge();
    return;
  }
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + 3 + _streakCurrent) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();

  // Wrap challenge to detect wrong answers
  var wrappedChallenge = Object.assign({}, challenge);
  var originalCorrect = challenge.correct;
  var qNum = _streakCurrent + 1;

  _openChallengeModal(
    challenge,
    'Streak Challenge \u2014 ' + qNum + ' of ' + _streakTotal,
    'Answer correctly to keep your streak alive. ' + _streakCorrect + ' correct so far.',
    'streak-' + today + '-' + idx
  );

  // Patch the option buttons to intercept streak logic
  var optionsEl = document.getElementById('challenge-options');
  var buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(function(btn, i) {
    btn.replaceWith(btn.cloneNode(true)); // strip old listeners
  });
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.addEventListener('click', function() {
      answerChallenge(i, originalCorrect, challenge.xp, challenge.explanation, 'streak-' + today + '-' + idx);
      if (i !== originalCorrect) {
        _streakFailed = true;
      } else {
        _streakCorrect++;
        _streakCurrent++;
      }
      setTimeout(function() {
        if (_streakFailed || _streakCurrent >= _streakTotal) {
          _endStreakChallenge();
        } else {
          _nextStreakQuestion();
        }
      }, 1800);
    });
  });
}

function _endStreakChallenge() {
  var xpEarned = _streakFailed ? _streakCorrect * 10 : 75;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'streak-challenge-' + today, window.innerWidth / 2, 200);
  document.getElementById('challenge-title').textContent = _streakFailed ? 'Streak Broken!' : 'Perfect Streak!';
  document.getElementById('challenge-body').textContent = _streakCorrect + ' of ' + _streakTotal + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = !_streakFailed ? '\uD83D\uDD25 Flawless!' : _streakCorrect >= 3 ? '\uD83D\uDC4D Good run!' : '\uD83D\uDCAA Try again!';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}

// \u2500\u2500 FLOOR BOSS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 5 questions drawn from the current floor. All must be answered.
var _bossScore = 0;
var _bossTotal = 5;
var _bossCurrent = 0;

function startFloorBoss() {
  var fi = state.currentFloor - 1;
  if (!isFloorComplete(fi)) return;
  _bossScore = 0;
  _bossCurrent = 0;
  _nextBossQuestion();
}

function _nextBossQuestion() {
  if (_bossCurrent >= _bossTotal) {
    _endFloorBoss();
    return;
  }
  var fi = state.currentFloor - 1;
  var epoch = new Date('2025-01-01').getTime();
  var daysSinceEpoch = Math.floor((Date.now() - epoch) / 86400000);
  var idx = (daysSinceEpoch + fi + 4 + _bossCurrent) % DAILY_CHALLENGES.length;
  var challenge = DAILY_CHALLENGES[idx];
  var today = new Date().toDateString();
  var qNum = _bossCurrent + 1;
  var originalCorrect = challenge.correct;

  _openChallengeModal(
    challenge,
    'Floor ' + state.currentFloor + ' Boss \u2014 ' + qNum + ' of ' + _bossTotal,
    'Prove you mastered this floor. ' + _bossScore + ' correct so far.',
    'boss-floor' + fi + '-' + today + '-' + _bossCurrent
  );

  var optionsEl = document.getElementById('challenge-options');
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.replaceWith(btn.cloneNode(true));
  });
  optionsEl.querySelectorAll('button').forEach(function(btn, i) {
    btn.addEventListener('click', function() {
      answerChallenge(i, originalCorrect, challenge.xp, challenge.explanation, 'boss-floor' + fi + '-' + today + '-' + _bossCurrent);
      if (i === originalCorrect) _bossScore++;
      _bossCurrent++;
      setTimeout(function() {
        if (_bossCurrent >= _bossTotal) {
          _endFloorBoss();
        } else {
          _nextBossQuestion();
        }
      }, 1800);
    });
  });
}

function _endFloorBoss() {
  var fi = state.currentFloor - 1;
  var xpEarned = _bossScore === _bossTotal ? 100 : _bossScore * 15;
  var today = new Date().toDateString();
  awardXP(xpEarned, 'floor-boss-' + fi + '-' + today, window.innerWidth / 2, 200);
  document.getElementById('challenge-title').textContent = 'Floor Boss Complete!';
  document.getElementById('challenge-body').textContent = _bossScore + ' of ' + _bossTotal + ' correct. +' + xpEarned + ' XP earned.';
  document.getElementById('challenge-question').textContent = _bossScore === _bossTotal ? '\uD83C\uDFC6 Perfect \u2014 Floor ' + state.currentFloor + ' mastered!' : _bossScore >= 3 ? '\uD83D\uDC4D Solid knowledge!' : '\uD83D\uDCD6 Revisit this floor.';
  document.getElementById('challenge-options').innerHTML = '<button class="auth-btn" onclick="closeDailyChallenge()" style="margin-top:8px;">Done</button>';
  document.getElementById('challenge-result').style.display = 'none';
}

// ── REVISION CENTRE ──────────────────────────────────────────────────────────

var REVISION_CARDS = [
  // Floor 1
  { floor: 1, term: 'HTML', def: 'HyperText Markup Language — the skeleton of every web page, using tags like &lt;div&gt;, &lt;p&gt;, and &lt;h1&gt; to structure content.' },
  { floor: 1, term: 'CSS', def: 'Cascading Style Sheets — controls the visual presentation of HTML: colours, fonts, layout, and animations.' },
  { floor: 1, term: 'JavaScript', def: 'The programming language of the web — runs in the browser and makes pages interactive by responding to user actions.' },
  { floor: 1, term: 'Browser', def: 'The application (Chrome, Firefox, Safari) that fetches web pages, parses HTML/CSS/JS, and renders the result on screen.' },
  { floor: 1, term: 'DOM', def: 'Document Object Model — the browser\'s live tree of HTML elements that JavaScript can read and modify in real time.' },
  { floor: 1, term: 'URL', def: 'Uniform Resource Locator — the unique address of a resource on the internet, e.g. https://example.com/page?q=1.' },
  { floor: 1, term: 'HTTP', def: 'HyperText Transfer Protocol — the request/response system browsers and servers use to exchange data across the web.' },
  { floor: 1, term: 'Variable', def: 'A named container that stores a value. In JS use let, const, or var. Example: const name = "Alice".' },
  // Floor 2
  { floor: 2, term: 'Function', def: 'A reusable block of code that performs a task when called. Accepts inputs (parameters) and can return an output value.' },
  { floor: 2, term: 'Loop', def: 'A control structure that repeats a block of code — for, while, or forEach — until a condition is met.' },
  { floor: 2, term: 'Conditional', def: 'An if/else statement that runs different code depending on whether a condition evaluates to true or false.' },
  { floor: 2, term: 'Array', def: 'An ordered list of values stored in a single variable. Example: const colours = ["red", "green", "blue"].' },
  { floor: 2, term: 'Object', def: 'A collection of key-value pairs that model a thing or concept. Example: { name: "Alice", age: 30 }.' },
  { floor: 2, term: 'Event', def: 'A signal fired by the browser (click, keydown, scroll) that JavaScript can listen for with addEventListener.' },
  { floor: 2, term: 'Callback', def: 'A function passed as an argument to another function, to be invoked later — the foundation of asynchronous JS.' },
  { floor: 2, term: 'String', def: 'A sequence of characters used to represent text. Defined with quotes: "hello", \'world\', or `template ${literal}`.' },
  // Floor 3
  { floor: 3, term: 'API', def: 'Application Programming Interface — a defined contract for how two software systems communicate and share data.' },
  { floor: 3, term: 'JSON', def: 'JavaScript Object Notation — a lightweight text format for transmitting structured data between a server and client.' },
  { floor: 3, term: 'Fetch', def: 'The browser\'s built-in function for making HTTP requests from JavaScript, returning a Promise.' },
  { floor: 3, term: 'Promise', def: 'A JS object representing the eventual completion or failure of an async operation, with .then() and .catch() handlers.' },
  { floor: 3, term: 'Async/Await', def: 'Syntax sugar over Promises — async marks a function as asynchronous; await pauses execution until a Promise resolves.' },
  { floor: 3, term: 'REST', def: 'Representational State Transfer — a design style for APIs that uses standard HTTP verbs (GET, POST, PUT, DELETE).' },
  { floor: 3, term: 'Endpoint', def: 'A specific URL that an API exposes to perform a particular operation, e.g. /api/users to list users.' },
  // Floor 4
  { floor: 4, term: 'Framework', def: 'A pre-built structure of tools and conventions (React, Vue, Django) that guides how you build and organise an app.' },
  { floor: 4, term: 'Component', def: 'A self-contained, reusable piece of UI — its own HTML, CSS, and JS bundled together, as in React or Vue.' },
  { floor: 4, term: 'State', def: 'Data that can change over time in an app. When state changes, the UI re-renders to reflect the new value.' },
  { floor: 4, term: 'npm', def: 'Node Package Manager — the registry and CLI for installing, sharing, and managing JavaScript packages and tools.' },
  { floor: 4, term: 'Module', def: 'A self-contained file of code with its own scope. Use import/export (ES modules) or require (CommonJS) to share it.' },
  { floor: 4, term: 'Debugging', def: 'Finding and fixing errors in code using browser DevTools, console.log, breakpoints, or stack-trace messages.' },
  { floor: 4, term: 'Version Control', def: 'A system (like Git) that tracks changes to code over time, enabling collaboration and rollback to previous states.' },
  // Floor 5
  { floor: 5, term: 'Server', def: 'A program (or machine) that listens for network requests and responds with data, files, or rendered HTML.' },
  { floor: 5, term: 'Database', def: 'An organised store of persistent data — queried with SQL (relational) or document-based (NoSQL like MongoDB).' },
  { floor: 5, term: 'SQL', def: 'Structured Query Language — used to create, read, update, and delete records in a relational database.' },
  { floor: 5, term: 'CRUD', def: 'Create, Read, Update, Delete — the four fundamental operations performed on data in any persistent system.' },
  { floor: 5, term: 'Authentication', def: 'Verifying who a user is (login). Distinct from authorisation, which controls what they are allowed to do.' },
  { floor: 5, term: 'Backend', def: 'The server-side of an app — business logic, databases, and APIs that the user never directly sees or touches.' },
  { floor: 5, term: 'Env Variable', def: 'A value (API key, database URL) stored outside code in the server environment to keep secrets out of repos.' },
  // Floor 6
  { floor: 6, term: 'Git', def: 'A distributed version-control system that tracks file changes locally and syncs with remote repositories on GitHub.' },
  { floor: 6, term: 'Commit', def: 'A saved snapshot of your staged changes in Git, recorded with a message describing what was done.' },
  { floor: 6, term: 'Branch', def: 'An independent line of development in Git. Create one to build a feature without affecting the main codebase.' },
  { floor: 6, term: 'Pull Request', def: 'A GitHub proposal to merge one branch into another, enabling code review before the changes land in main.' },
  { floor: 6, term: 'Deployment', def: 'The process of making an app available to users — pushing it to a server or hosting platform (Netlify, Vercel, AWS).' },
  { floor: 6, term: 'CI/CD', def: 'Continuous Integration / Continuous Delivery — automated pipelines that test, build, and deploy code on every push.' },
  { floor: 6, term: 'Dependency', def: 'An external package your project relies on, listed in package.json and installed via npm or yarn.' },
  // Floor 7
  { floor: 7, term: 'Performance', def: 'How fast and efficiently an app loads and runs. Measured by metrics like FCP, LCP, and Time to Interactive.' },
  { floor: 7, term: 'Accessibility', def: 'Designing apps so everyone can use them — including keyboard and screen-reader users (following WCAG guidelines).' },
  { floor: 7, term: 'Testing', def: 'Writing automated checks (unit, integration, e2e) to verify code behaves correctly now and after future changes.' },
  { floor: 7, term: 'Security', def: 'Protecting apps from attacks like XSS, SQL injection, and CSRF by validating input, using HTTPS, and securing secrets.' },
  { floor: 7, term: 'Refactoring', def: 'Restructuring existing code to improve clarity or efficiency without changing its external behaviour or output.' },
  { floor: 7, term: 'Scalability', def: 'An app\'s ability to handle growing load — more users, more data — without degrading in speed or reliability.' },
  { floor: 7, term: 'Open Source', def: 'Software with publicly available source code that anyone can inspect, use, modify, and freely distribute.' },
  { floor: 7, term: 'The Stack', def: 'The complete set of technologies used to build an app: front end, back end, database, and infrastructure layer.' }
];

var _revDealtSession = false;
var _revModalIndex = null;

function renderRevisionPanel() {
  var panel = document.getElementById('panel-revision');
  if (!panel) return;
  if (!_revDealtSession) {
    _renderRevDeck(panel);
  } else {
    _renderRevGrid(panel, false);
  }
}

function _renderRevDeck(panel) {
  var html = '<div class="rev-wrap">' +
    '<div class="rev-header">' +
      '<h2 class="rev-title">Revision Centre</h2>' +
      '<p class="rev-subtitle">52 key concepts — one card for every term in the book</p>' +
    '</div>' +
    '<div class="rev-deck-scene" onclick="dealRevisionCards()">' +
      '<div class="rev-deck-stack">' +
        '<div class="rev-deck-slab rev-deck-s5"></div>' +
        '<div class="rev-deck-slab rev-deck-s4"></div>' +
        '<div class="rev-deck-slab rev-deck-s3"></div>' +
        '<div class="rev-deck-slab rev-deck-s2"></div>' +
        '<div class="rev-deck-slab rev-deck-s1">' +
          '<div class="rev-deck-owl">' + sageOwlSVG(72, 79) + '</div>' +
          '<div class="rev-deck-book-title">THE CODE BOOK</div>' +
          '<div class="rev-deck-guide">Your Revision Guide</div>' +
        '</div>' +
      '</div>' +
      '<div class="rev-deal-hint">Tap to deal your cards</div>' +
    '</div>' +
  '</div>';
  panel.innerHTML = html;
}

function dealRevisionCards() {
  _revDealtSession = true;
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, true);
}

function _renderRevGrid(panel, animate) {
  var known = state.revKnown || {};
  var knownCount = Object.keys(known).length;
  var pct = Math.round(knownCount / 52 * 100);

  var html = '<div class="rev-wrap">' +
    '<div class="rev-header">' +
      '<div class="rev-header-row">' +
        '<h2 class="rev-title">Revision Centre</h2>' +
        '<button class="rev-reset-btn" onclick="resetRevisionCards()">&#8635; Reshuffle</button>' +
      '</div>' +
      '<div class="rev-prog-track"><div class="rev-prog-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="rev-prog-label">' + knownCount + ' / 52 mastered</div>' +
    '</div>' +
    '<div class="rev-grid">';

  for (var i = 0; i < REVISION_CARDS.length; i++) {
    var card = REVISION_CARDS[i];
    var isKnown = known[i] === true;
    var delay = animate ? (i * 22) : 0;
    var sx = animate ? (Math.round((Math.random() - 0.5) * 700)) : 0;
    var sy = animate ? (Math.round((Math.random() - 0.5) * 500)) : 0;
    var sr = animate ? (Math.round((Math.random() - 0.5) * 70)) : 0;
    var shimmerDelay = ((i % 11) * 0.45).toFixed(2);
    var cardStyle = '--shimmer-delay:' + shimmerDelay + 's';
    if (animate) cardStyle += ';--rev-sx:' + sx + 'px;--rev-sy:' + sy + 'px;--rev-sr:' + sr + 'deg;animation-delay:' + delay + 'ms';
    html += '<div class="rev-card' + (isKnown ? ' rev-card-known' : '') + (animate ? ' rev-card-dealing' : '') + '" style="' + cardStyle + '" onclick="openRevCard(' + i + ')">' +
      '<div class="rev-card-owl">' + sageOwlSVG(36, 40) + '</div>' +
      '<div class="rev-card-bookname">THE CODE<br>BOOK</div>' +
      '<div class="rev-card-floorlabel">F' + card.floor + '</div>' +
      (isKnown ? '<div class="rev-card-tick">&#10003;</div>' : '') +
    '</div>';
  }

  html += '</div></div>';
  html += '<div class="rev-modal-bg" id="rev-modal-bg" onclick="closeRevCard()"><div class="rev-modal-box" id="rev-modal-box" onclick="event.stopPropagation()"></div></div>';
  panel.innerHTML = html;
}

function openRevCard(i) {
  _revModalIndex = i;
  var bg = document.getElementById('rev-modal-bg');
  var box = document.getElementById('rev-modal-box');
  if (!bg || !box) return;
  var card = REVISION_CARDS[i];
  box.innerHTML =
    '<div class="rev-mc-wrap">' +
      '<div class="rev-mc-scene" id="rev-mc-scene">' +
        '<div class="rev-mc-inner" id="rev-mc-inner">' +
          '<div class="rev-mc-face rev-mc-front">' +
            '<div class="hq-corner hq-corner-tl"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
            '<div class="rev-mc-floor">Floor ' + card.floor + '</div>' +
            '<div class="rev-mc-term">' + card.term + '</div>' +
            '<div class="rev-mc-prompt">What does this mean?</div>' +
            '<div class="hq-corner hq-corner-br"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
          '</div>' +
          '<div class="rev-mc-face rev-mc-back">' +
            '<div class="hq-corner hq-corner-tl"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
            '<div class="rev-mc-term-sm">' + card.term + '</div>' +
            '<div class="rev-mc-def">' + card.def + '</div>' +
            '<div class="rev-mc-actions">' +
              '<button class="rev-gotit-btn" onclick="markRevCard(' + i + ',true)">Got it &#10003;</button>' +
              '<button class="rev-review-btn" onclick="markRevCard(' + i + ',false)">Review Again &#8635;</button>' +
            '</div>' +
            '<div class="hq-corner hq-corner-br"><span class="hq-ace">A</span><span class="hq-suit">♠</span></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rev-mc-footer">' +
        '<button class="rev-flip-btn" onclick="flipRevCard()">Flip &#8594;</button>' +
        '<button class="rev-close-btn" onclick="closeRevCard()">&#10005; Close</button>' +
      '</div>' +
    '</div>';
  bg.classList.add('active');
}

function flipRevCard() {
  var inner = document.getElementById('rev-mc-inner');
  if (inner) inner.classList.toggle('flipped');
}

function closeRevCard() {
  var bg = document.getElementById('rev-modal-bg');
  if (bg) bg.classList.remove('active');
  _revModalIndex = null;
}

function markRevCard(i, known) {
  if (!state.revKnown) state.revKnown = {};
  if (known) {
    state.revKnown[i] = true;
  } else {
    delete state.revKnown[i];
  }
  saveState();
  closeRevCard();
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, false);
}

function resetRevisionCards() {
  state.revKnown = {};
  saveState();
  var panel = document.getElementById('panel-revision');
  if (panel) _renderRevGrid(panel, true);
}
