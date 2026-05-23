// ============================================================
// GLITCH MODE — Signal routing puzzle game
// Tap pipe tiles to rotate them. Connect SRC to TGT.
// ============================================================
(function () {
  'use strict';

  // Cell types
  var T_EMPTY  = 0;
  var T_SOURCE = 1;
  var T_TARGET = 2;
  var T_I      = 3; // straight  rot0=NS  rot1=EW
  var T_L      = 4; // elbow     rot0=ES  rot1=SW  rot2=WN  rot3=NE
  var T_T      = 5; // tee       rot0=NES rot1=ESW rot2=SWN rot3=WNE
  var T_X      = 6; // cross     all directions

  // Base connections [N, E, S, W] at rotation 0
  var BASE = [];
  BASE[T_EMPTY]  = [0,0,0,0];
  BASE[T_SOURCE] = [1,1,1,1];
  BASE[T_TARGET] = [1,1,1,1];
  BASE[T_I]      = [1,0,1,0];
  BASE[T_L]      = [0,1,1,0];
  BASE[T_T]      = [1,1,1,0];
  BASE[T_X]      = [1,1,1,1];

  var OPP = [2, 3, 0, 1];
  var DRC = [[-1,0],[0,1],[1,0],[0,-1]]; // N E S W

  var TYPE_MAP = { 'I': T_I, 'L': T_L, 'T': T_T, 'X': T_X };
  var LEVELS = window.GlitchLevels || [];
  var DEFAULT_LEVELS = LEVELS;

  function getConn(type, rot) {
    var c = BASE[type].slice();
    for (var i = 0; i < (rot & 3); i++) c = [c[3], c[0], c[1], c[2]];
    return c;
  }

  function cellConnects(a, b, dir) {
    return !!(getConn(a.type, a.rot)[dir] && getConn(b.type, b.rot)[OPP[dir]]);
  }

  // ── Game state ────────────────────────────────────────────
  var G = {
    canvas: null, ctx: null,
    grid: [], size: 4,
    level: 1, score: 0, moves: 0,
    solving: false, solvedFired: false,
    signalPath: [], signalT: 0, sigStart: 0, sigDur: 600,
    animId: null,
    cellPx: 80, ox: 0, oy: 0,
    _tx: 0, _ty: 0,
    t: 0,          // current rAF timestamp
    tapped: null,  // {r, c, t0} — tap flash
    powered: {},   // "r,c" → true — last-frame powered set
    powFlash: {},  // "r,c" → timestamp — newly-powered flash
    glitchMods: null, // modifier hooks (set via setModifiers)
  };

  function makeGrid(n) {
    var g = [];
    for (var r = 0; r < n; r++) {
      g[r] = [];
      for (var c = 0; c < n; c++) g[r][c] = { type: T_EMPTY, rot: 0 };
    }
    return g;
  }

  function loadLevel(idx) {
    var def = LEVELS[idx % LEVELS.length];
    var n = def.size;
    G.size = n;
    var grid = makeGrid(n);
    grid[def.start[0]][def.start[1]] = { type: T_SOURCE, rot: 0 };
    grid[def.end[0]][def.end[1]]     = { type: T_TARGET, rot: 0 };
    def.pipes.forEach(function(p) {
      var type = TYPE_MAP[p[2]];
      if (type !== undefined) grid[p[0]][p[1]] = { type: type, rot: p[3] };
    });
    G.grid = grid;
    var sub = document.getElementById('glitch-sub');
    if (sub) sub.textContent = def.name;
  }

  // ── Power BFS ────────────────────────────────────────────
  function computePower() {
    var n = G.size;
    // Allow modifiers to present a logical view of the grid different from the visual one
    var vGrid = (G.glitchMods && G.glitchMods.transformGrid)
      ? G.glitchMods.transformGrid(G.grid, G.t, n)
      : G.grid;
    var pow = [];
    for (var r = 0; r < n; r++) { pow[r] = []; for (var c = 0; c < n; c++) pow[r][c] = false; }
    var queue = [], qi = 0;
    for (var r2 = 0; r2 < n; r2++)
      for (var c2 = 0; c2 < n; c2++)
        if (vGrid[r2][c2].type === T_SOURCE) { pow[r2][c2] = true; queue.push([r2,c2]); }
    while (qi < queue.length) {
      var p = queue[qi++];
      for (var d = 0; d < 4; d++) {
        var nr = p[0]+DRC[d][0], nc = p[1]+DRC[d][1];
        if (nr<0||nr>=n||nc<0||nc>=n||pow[nr][nc]) continue;
        if (cellConnects(vGrid[p[0]][p[1]], vGrid[nr][nc], d)) { pow[nr][nc] = true; queue.push([nr,nc]); }
      }
    }
    return pow;
  }

  function isSolved(pow) {
    for (var r = 0; r < G.size; r++)
      for (var c = 0; c < G.size; c++)
        if (G.grid[r][c].type === T_TARGET && pow[r][c]) return true;
    return false;
  }

  function getSignalPath(pow) {
    var n = G.size, sr = -1, sc = -1, tr = -1, tc = -1;
    for (var r = 0; r < n; r++)
      for (var c = 0; c < n; c++) {
        if (G.grid[r][c].type === T_SOURCE) { sr=r; sc=c; }
        if (G.grid[r][c].type === T_TARGET) { tr=r; tc=c; }
      }
    var parent = {}, queue = [[sr,sc]], qi = 0;
    parent[sr+','+sc] = null;
    while (qi < queue.length) {
      var p = queue[qi++];
      if (p[0]===tr && p[1]===tc) break;
      for (var d = 0; d < 4; d++) {
        var nr = p[0]+DRC[d][0], nc = p[1]+DRC[d][1];
        if (nr<0||nr>=n||nc<0||nc>=n) continue;
        var k = nr+','+nc;
        if (k in parent || !pow[nr][nc]) continue;
        parent[k] = p; queue.push([nr,nc]);
      }
    }
    var path = [], cur = [tr,tc];
    while (cur) { path.unshift(cur); cur = parent[cur[0]+','+cur[1]]; }
    return path;
  }

  // ── Canvas colours ────────────────────────────────────────
  var C = {
    bg:       '#020608',
    grid:     'rgba(0,200,255,0.10)',
    pipeOff:  'rgba(0,200,255,0.22)',
    pipeOn:   '#00e5ff',
    pipeGlow: 'rgba(0,229,255,0.95)',
    srcFill:  '#00e5ff',
    tgtOff:   '#ff4444',
    tgtOn:    '#00ff96',
  };

  function ctr(r, c) {
    return [G.ox + c*G.cellPx + G.cellPx*0.5,
            G.oy + r*G.cellPx + G.cellPx*0.5];
  }

  function drawBg() {
    G.ctx.fillStyle = C.bg;
    G.ctx.fillRect(0, 0, G.canvas.width, G.canvas.height);
  }

  function drawGridLines() {
    var ctx = G.ctx, n = G.size;
    ctx.save();
    ctx.strokeStyle = C.grid;
    ctx.lineWidth = 0.5;
    for (var i = 0; i <= n; i++) {
      ctx.beginPath();
      ctx.moveTo(G.ox, G.oy + i*G.cellPx);
      ctx.lineTo(G.ox + n*G.cellPx, G.oy + i*G.cellPx);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(G.ox + i*G.cellPx, G.oy);
      ctx.lineTo(G.ox + i*G.cellPx, G.oy + n*G.cellPx);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPipe(r, c, pow) {
    var ctx = G.ctx, cell = G.grid[r][c];
    var conn = getConn(cell.type, cell.rot);
    var pos = ctr(r, c), cx = pos[0], cy = pos[1];
    var half = G.cellPx * 0.46;
    var on = pow[r][c];
    var key = r + ',' + c;

    var edges = [
      [cx, cy-half], [cx+half, cy], [cx, cy+half], [cx-half, cy]
    ];

    // Tap flash — brief cyan rectangle over tapped cell
    if (G.tapped && G.tapped.r === r && G.tapped.c === c) {
      var tapAge = (G.t - G.tapped.t0) / 180;
      if (tapAge < 1) {
        ctx.save();
        ctx.fillStyle = 'rgba(0,229,255,' + ((1 - tapAge) * 0.28) + ')';
        ctx.fillRect(G.ox + c*G.cellPx + 1, G.oy + r*G.cellPx + 1, G.cellPx - 2, G.cellPx - 2);
        ctx.restore();
      } else {
        G.tapped = null;
      }
    }

    // Power-on flash — extra glow when a pipe first becomes powered
    var extraGlow = 0;
    if (on && G.powFlash[key]) {
      var flashAge = (G.t - G.powFlash[key]) / 300;
      if (flashAge < 1) extraGlow = (1 - flashAge) * 24;
      else delete G.powFlash[key];
    }

    ctx.save();
    ctx.lineCap = 'round';
    if (on) {
      ctx.strokeStyle = C.pipeOn;
      ctx.lineWidth = 4;
      ctx.shadowBlur = 14 + extraGlow;
      ctx.shadowColor = C.pipeGlow;
    } else {
      ctx.strokeStyle = C.pipeOff;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 0;
    }
    for (var d = 0; d < 4; d++) {
      if (!conn[d]) continue;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(edges[d][0], edges[d][1]);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, on ? 5 : 3.5, 0, Math.PI*2);
    ctx.fillStyle = on ? C.pipeOn : C.pipeOff;
    ctx.shadowBlur = on ? (16 + extraGlow) : 0;
    ctx.fill();
    ctx.restore();
  }

  function drawSource(r, c, t) {
    var ctx = G.ctx, pos = ctr(r, c), cx = pos[0], cy = pos[1];
    var pulse = 0.85 + 0.15 * Math.sin(t * 0.003);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 17*pulse, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0,229,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 18;
    ctx.shadowColor = C.srcFill;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI*2);
    ctx.fillStyle = C.srcFill;
    ctx.shadowBlur = 28;
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 7px "Space Mono",monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('SRC', cx, cy);
    ctx.restore();
  }

  function drawTarget(r, c, pow, t) {
    var ctx = G.ctx, pos = ctr(r, c), cx = pos[0], cy = pos[1];
    var on = pow[r][c];
    var pulse = on
      ? (0.92 + 0.08 * Math.sin(t * 0.008))
      : (0.80 + 0.20 * Math.sin(t * 0.004));
    var col  = on ? C.tgtOn  : C.tgtOff;
    var glow = on ? 'rgba(0,255,150,0.8)' : 'rgba(255,68,68,0.7)';
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 16*pulse, 0, Math.PI*2);
    ctx.strokeStyle = on ? 'rgba(0,255,150,0.35)' : 'rgba(255,68,68,0.28)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = on ? 26 : 20;
    ctx.shadowColor = glow;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI*2);
    ctx.fillStyle = col;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.fillStyle = on ? '#000' : '#fff';
    ctx.font = 'bold 6px "Space Mono",monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText(on ? 'OK' : 'TGT', cx, cy);
    ctx.restore();
  }

  // ── Signal particle helpers ──────────────────────────────
  function getParticlePos(path, p) {
    var segs = path.length - 1;
    var t = Math.min(Math.max(p, 0) * segs, segs - 0.001);
    var i = Math.floor(t), f = t - i;
    var a = ctr(path[i][0], path[i][1]);
    var b = ctr(path[i+1][0], path[i+1][1]);
    return [a[0] + (b[0]-a[0])*f, a[1] + (b[1]-a[1])*f];
  }

  function drawParticle(path, progress) {
    if (path.length < 2) return;
    var ctx = G.ctx;

    // Comet trail — three fading circles behind the head
    var trail = [
      { dp: 0.055, r: 4.5, a: 0.50 },
      { dp: 0.110, r: 3.0, a: 0.25 },
      { dp: 0.180, r: 1.8, a: 0.10 },
    ];
    trail.forEach(function(tr) {
      var pos = getParticlePos(path, progress - tr.dp);
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], tr.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(0,229,255,' + tr.a + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00e5ff';
      ctx.fill();
      ctx.restore();
    });

    // Head
    var pos = getParticlePos(path, progress);
    ctx.save();
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 6.5, 0, Math.PI*2);
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 32;
    ctx.shadowColor = '#00e5ff';
    ctx.fill();
    ctx.restore();
  }

  function render(t) {
    G.t = t;
    var pow = computePower();
    var n = G.size;

    // Track newly powered cells for flash effect
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var key = r + ',' + c;
        if (pow[r][c]) {
          if (!G.powered[key]) G.powFlash[key] = t;
          G.powered[key] = true;
        } else {
          delete G.powered[key];
        }
      }
    }

    // Advance signal via rAF timestamp for frame-perfect smoothness
    if (G.solving) {
      G.signalT = Math.min((t - G.sigStart) / G.sigDur, 1);
      if (G.signalT >= 1 && !G.solvedFired) {
        G.solvedFired = true;
        onSolved();
      }
    }

    drawBg();
    drawGridLines();
    for (var r2 = 0; r2 < n; r2++) {
      for (var c2 = 0; c2 < n; c2++) {
        var cell = G.grid[r2][c2];
        if      (cell.type === T_SOURCE) drawSource(r2, c2, t);
        else if (cell.type === T_TARGET) drawTarget(r2, c2, pow, t);
        else if (cell.type !== T_EMPTY)  drawPipe(r2, c2, pow);
        // Modifier cell overlay (drawn on top of pipe, below particle)
        if (G.glitchMods && G.glitchMods.cellOverlay && cell.type !== T_EMPTY) {
          G.glitchMods.cellOverlay(G.ctx, r2, c2, pow[r2][c2], cell, t,
            G.ox + c2*G.cellPx, G.oy + r2*G.cellPx, G.cellPx);
        }
      }
    }
    if (G.solving && G.signalPath.length > 0) drawParticle(G.signalPath, G.signalT);
    // Modifier post-render (scanlines, stripe effects, etc.)
    if (G.glitchMods && G.glitchMods.postRender) {
      G.glitchMods.postRender(G.ctx, G.canvas.width, G.canvas.height, t);
    }
    G.animId = requestAnimationFrame(render);
  }

  // ── UI helpers ───────────────────────────────────────────
  function popEl(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('glitch-pop');
    void el.offsetWidth; // force reflow so animation restarts
    el.classList.add('glitch-pop');
  }

  // ── Input ────────────────────────────────────────────────
  function tap(clientX, clientY) {
    var rect = G.canvas.getBoundingClientRect();
    var sx = G.canvas.width  / rect.width;
    var sy = G.canvas.height / rect.height;
    var x = (clientX - rect.left) * sx;
    var y = (clientY - rect.top)  * sy;
    var col = Math.floor((x - G.ox) / G.cellPx);
    var row = Math.floor((y - G.oy) / G.cellPx);
    if (row < 0 || row >= G.size || col < 0 || col >= G.size) return;
    var cell = G.grid[row][col];
    if (cell.type === T_SOURCE || cell.type === T_TARGET || cell.type === T_EMPTY || G.solving) return;

    cell.rot = (cell.rot + 1) & 3;
    G.tapped = { r: row, c: col, t0: G.t };
    G.moves++;
    var el = document.getElementById('glitch-moves');
    if (el) { el.textContent = G.moves; popEl('glitch-moves'); }

    var pow = computePower();
    if (isSolved(pow) && !G.solving) {
      G.solving    = true;
      G.solvedFired = false;
      G.signalPath = getSignalPath(pow);
      G.signalT    = 0;
      G.sigStart   = G.t;
      // Scale duration to path length — short paths feel snappy, long ones epic
      G.sigDur = Math.max(420, Math.min(820, G.signalPath.length * 48));
    }
  }

  function onSolved() {
    var xp = Math.max(10, 60 - G.moves * 3);
    G.score += xp;
    var sc = document.getElementById('glitch-score');
    if (sc) { sc.textContent = G.score; popEl('glitch-score'); }
    var ov = document.getElementById('glitch-complete');
    if (ov) ov.style.display = 'flex';
    var xpEl = document.getElementById('glitch-xp');
    if (xpEl) xpEl.textContent = '+' + xp + ' XP';
    var nextBtn = document.querySelector('.glitch-next-btn');
    if (nextBtn) nextBtn.textContent = G.level >= LEVELS.length ? 'Play Again →' : 'Next Level →';
    if (G.canvas) G.canvas.classList.add('is-solved');
    if (typeof awardXP === 'function') awardXP(xp, 'Glitch Mode');
  }

  function resize() {
    if (!G.canvas) return;
    var parent = G.canvas.parentElement;
    var avail = (parent && parent.clientWidth > 0) ? parent.clientWidth - 24 : window.innerWidth - 24;
    if (avail < 100) avail = window.innerWidth - 24;
    var sz = Math.min(Math.max(avail, 100), 400);
    G.canvas.width  = sz;
    G.canvas.height = sz;
    G.cellPx = Math.floor(sz / G.size);
    G.ox = Math.floor((sz - G.cellPx * G.size) / 2);
    G.oy = G.ox;
  }

  // ── Public API ───────────────────────────────────────────
  function init(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }

    G.canvas      = canvas;
    G.ctx         = canvas.getContext('2d');
    G.level       = 1;
    G.score       = 0;
    G.moves       = 0;
    G.solving     = false;
    G.solvedFired = false;
    G.signalT     = 0;
    G.signalPath  = [];
    G.tapped      = null;
    G.powered     = {};
    G.powFlash    = {};
    loadLevel(0);
    resize();

    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      G._tx = e.touches[0].clientX;
      G._ty = e.touches[0].clientY;
    }, { passive: false });

    canvas.addEventListener('touchend', function(e) {
      e.preventDefault();
      var t = e.changedTouches[0];
      var dx = t.clientX - G._tx, dy = t.clientY - G._ty;
      if (dx*dx + dy*dy < 200) tap(t.clientX, t.clientY);
    }, { passive: false });

    canvas.addEventListener('click', function(e) { tap(e.clientX, e.clientY); });

    G.animId = requestAnimationFrame(render);

    var lvl = document.getElementById('glitch-level');
    if (lvl) lvl.textContent = 1;
    var sc2 = document.getElementById('glitch-score');
    if (sc2) sc2.textContent = 0;
    var mv = document.getElementById('glitch-moves');
    if (mv) mv.textContent = 0;
    var ov2 = document.getElementById('glitch-complete');
    if (ov2) ov2.style.display = 'none';
  }

  function restart() {
    G.moves       = 0;
    G.solving     = false;
    G.solvedFired = false;
    G.signalT     = 0;
    G.signalPath  = [];
    G.tapped      = null;
    G.powered     = {};
    G.powFlash    = {};
    loadLevel(G.level - 1);
    if (G.canvas) G.canvas.classList.remove('is-solved');
    var ov = document.getElementById('glitch-complete');
    if (ov) ov.style.display = 'none';
    var mv = document.getElementById('glitch-moves');
    if (mv) mv.textContent = 0;
  }

  function nextLevel() {
    var ov = document.getElementById('glitch-complete');
    if (ov) ov.style.display = 'none';
    G.level       = G.level >= LEVELS.length ? 1 : G.level + 1;
    G.moves       = 0;
    G.solving     = false;
    G.solvedFired = false;
    G.signalT     = 0;
    G.signalPath  = [];
    G.tapped      = null;
    G.powered     = {};
    G.powFlash    = {};
    loadLevel(G.level - 1);
    resize();
    if (G.canvas) G.canvas.classList.remove('is-solved');
    var lvl = document.getElementById('glitch-level');
    if (lvl) lvl.textContent = G.level;
    var mv = document.getElementById('glitch-moves');
    if (mv) mv.textContent = 0;
  }

  function destroy() {
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    G.canvas = null;
    G.ctx    = null;
  }

  function setModifiers(mods) {
    G.glitchMods = mods || null;
  }

  function setLevels(arr) {
    LEVELS = (arr && arr.length) ? arr : DEFAULT_LEVELS;
  }

  window.GlitchGame = { init: init, restart: restart, nextLevel: nextLevel, destroy: destroy, setModifiers: setModifiers, setLevels: setLevels };
}());
