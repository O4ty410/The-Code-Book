// canvas-bg.js — Canvas animations (landing + hub)

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
var _hubCanvasOpacity = 1.0;

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
  canvas.style.display = 'block';

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
      var a = s.baseAlpha * (0.35 + 0.65 * twinkle) * _hubCanvasOpacity;
      if (s.spark > 0) s.spark = Math.max(0, s.spark - dt * s.sparkDecay);
      var glowing = s.spark > 0.05;
      var fa = Math.min(0.95, a + s.spark * 0.6 * _hubCanvasOpacity);

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
    canvas.style.display = 'none';
  }
}
