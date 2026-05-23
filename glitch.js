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
    t: 0,            // current rAF timestamp
    tapped: null,    // {r, c, t0} — tap flash
    powered: {},     // "r,c" → true — last-frame powered set
    powFlash: {},    // "r,c" → timestamp — newly-powered flash
    mode: 'venus',      // 'venus' | 'chaos' — switched via setMode()
    glitchMods: null,   // modifier hooks (set via setModifiers)
    bgParticles: [],    // ambient drifting canvas particles
    vignetteGrad: null, // cached radial gradient for depth vignette
    levelLoadT:  null,  // rAF timestamp when current level first rendered
    _cascPending: false,// true between loadLevel and first render frame
    solveFlashT: null   // rAF timestamp when level was solved (surge effect)
  };

  function makeGrid(n) {
    var g = [];
    for (var r = 0; r < n; r++) {
      g[r] = [];
      for (var c = 0; c < n; c++) g[r][c] = { type: T_EMPTY, rot: 0 };
    }
    return g;
  }

  // BFS distances from SRC — used to stagger the cascade materialise animation
  function computeCascadeDistances() {
    var n = G.size, sr = -1, sc = -1;
    for (var r = 0; r < n; r++)
      for (var c = 0; c < n; c++)
        if (G.grid[r][c].type === T_SOURCE) { sr = r; sc = c; }
    if (sr < 0) return;
    var queue = [[sr, sc, 0]], qi = 0, visited = {};
    visited[sr + ',' + sc] = true;
    G.grid[sr][sc]._casc = 0;
    while (qi < queue.length) {
      var p = queue[qi++];
      for (var d = 0; d < 4; d++) {
        var nr = p[0] + DRC[d][0], nc = p[1] + DRC[d][1];
        var k = nr + ',' + nc;
        if (nr < 0 || nr >= n || nc < 0 || nc >= n || visited[k]) continue;
        visited[k] = true;
        G.grid[nr][nc]._casc = p[2] + 1;
        queue.push([nr, nc, p[2] + 1]);
      }
    }
  }

  function cascadeAlpha(r, c) {
    if (!G.levelLoadT) return 1;
    var age = G.t - G.levelLoadT;
    var dist = (G.grid[r] && G.grid[r][c] && G.grid[r][c]._casc) || 0;
    var delay = dist * 72;
    if (age < delay) return 0;
    return Math.min(1, (age - delay) / 170);
  }

  function loadLevel(idx, skipLore, skipCascade) {
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
    computeCascadeDistances();
    if (skipCascade) {
      G.levelLoadT = 0; G._cascPending = false;
    } else {
      G.levelLoadT = null; G._cascPending = true;
    }
    var sub = document.getElementById('glitch-sub');
    if (sub) sub.textContent = def.name;
    if (!skipLore && typeof LoreSystem !== 'undefined') LoreSystem.onLevelStart(idx + 1);
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

  // ── Canvas colour palettes (mode-switched via setMode) ────
  var PALETTES = {
    venus: {
      bg:          '#020608',
      bgTint:      null,
      gridRGB:     '0,200,255',
      gridBase:    0.08,
      gridAmp:     0.04,
      gridSpeed:   0.00075,
      pipeOffRGB:  '0,200,255',
      pipeOffBlur: 3,
      pipeOffGlow: 'rgba(0,180,255,0.14)',
      pipeOn:      '#00e5ff',
      pipeOnBlur:  22,
      pipeGlow:    'rgba(0,229,255,0.95)',
      flashRGB:    '0,229,255',
      srcFill:     '#00e5ff',
      srcArcRGB:   '0,229,255',
      tgtOff:      '#ff4444',
      tgtOn:       '#00ff96',
      partRGB:     '0,210,255',
      partGlow:    '#00e5ff',
    },
    chaos: {
      bg:          '#070204',
      bgTint:      'rgba(200,30,10,0.03)',
      gridRGB:     '255,90,30',
      gridBase:    0.07,
      gridAmp:     0.07,
      gridSpeed:   0.0016,
      pipeOffRGB:  '255,110,40',
      pipeOffBlur: 3,
      pipeOffGlow: 'rgba(255,80,20,0.18)',
      pipeOn:      '#ff8c42',
      pipeOnBlur:  22,
      pipeGlow:    'rgba(255,140,60,0.95)',
      flashRGB:    '255,140,60',
      srcFill:     '#00e5ff',
      srcArcRGB:   '255,120,40',
      tgtOff:      '#ff4444',
      tgtOn:       '#00ff96',
      partRGB:     '255,120,50',
      partGlow:    '#ff8c42',
    }
  };
  var C = PALETTES.venus;

  function ctr(r, c) {
    return [G.ox + c*G.cellPx + G.cellPx*0.5,
            G.oy + r*G.cellPx + G.cellPx*0.5];
  }

  // ── Background: particles + vignette ─────────────────────
  function drawBg() {
    var ctx = G.ctx, w = G.canvas.width, h = G.canvas.height;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, w, h);

    // Ambient drifting particles — all batched into one fill call
    var pts = G.bgParticles;
    if (pts && pts.length) {
      var pAlpha = 0.032 * (0.45 + 0.55 * Math.sin(G.t * 0.0013));
      ctx.fillStyle = 'rgba(' + C.partRGB + ',' + pAlpha.toFixed(4) + ')';
      ctx.beginPath();
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    // Edge vignette — caches gradient until canvas is resized
    if (!G.vignetteGrad) {
      var vg = ctx.createRadialGradient(w*0.5, h*0.5, h*0.22, w*0.5, h*0.5, h*0.80);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.38)');
      G.vignetteGrad = vg;
    }
    ctx.fillStyle = G.vignetteGrad;
    ctx.fillRect(0, 0, w, h);

    if (C.bgTint) {
      ctx.fillStyle = C.bgTint;
      ctx.fillRect(0, 0, w, h);
    }

    // Interface corner brackets — suggest a system targeting frame
    var brk = 13, pad = 5;
    ctx.save();
    ctx.strokeStyle = 'rgba(' + C.gridRGB + ',0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad + brk); ctx.lineTo(pad, pad); ctx.lineTo(pad + brk, pad);
    ctx.moveTo(w - pad - brk, pad); ctx.lineTo(w - pad, pad); ctx.lineTo(w - pad, pad + brk);
    ctx.moveTo(pad, h - pad - brk); ctx.lineTo(pad, h - pad); ctx.lineTo(pad + brk, h - pad);
    ctx.moveTo(w - pad - brk, h - pad); ctx.lineTo(w - pad, h - pad); ctx.lineTo(w - pad, h - pad - brk);
    ctx.stroke();
    ctx.restore();
  }

  // ── Grid lines with subtle ripple ─────────────────────────
  function drawGridLines() {
    var ctx = G.ctx, n = G.size;
    ctx.save();
    ctx.lineWidth = 0.5;
    var baseT = G.t * C.gridSpeed;
    for (var i = 0; i <= n; i++) {
      var alpha = C.gridBase + C.gridAmp * Math.sin(baseT + i * 0.58);
      ctx.strokeStyle = 'rgba(' + C.gridRGB + ',' + alpha.toFixed(3) + ')';
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

  // ── Pipe drawing with idle breathing + reactive ring flash ─
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

    // Power-on flash — expanding ring + extra glow when pipe first becomes powered
    var extraGlow = 0;
    if (on && G.powFlash[key]) {
      var flashAge = (G.t - G.powFlash[key]) / 400;
      if (flashAge < 1) {
        extraGlow = (1 - flashAge) * 22;
        ctx.save();
        // Expanding ring
        ctx.beginPath();
        ctx.arc(cx, cy, (1 - flashAge) * G.cellPx * 0.50, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + C.flashRGB + ',' + ((1 - flashAge) * 0.68).toFixed(3) + ')';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Directional sparks — fire toward each connected arm
        if (flashAge < 0.55) {
          var sparkProg = flashAge / 0.55;
          for (var bd = 0; bd < 4; bd++) {
            if (!conn[bd]) continue;
            var bx = cx + (edges[bd][0] - cx) * sparkProg;
            var by = cy + (edges[bd][1] - cy) * sparkProg;
            ctx.beginPath();
            ctx.arc(bx, by, 2.4 * (1 - flashAge), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + C.flashRGB + ',' + ((1 - flashAge) * 0.82).toFixed(3) + ')';
            ctx.fill();
          }
        }
        ctx.restore();
      } else {
        delete G.powFlash[key];
      }
    }

    // Solve surge — brief brightness wave across all powered pipes on level complete
    var surgeExtra = 0;
    if (on && G.solveFlashT) {
      var surgeAge = (G.t - G.solveFlashT) / 750;
      if (surgeAge < 1) {
        var surgePow = surgeAge < 0.28 ? (surgeAge / 0.28) : (1 - (surgeAge - 0.28) / 0.72);
        surgeExtra = Math.max(0, surgePow) * 32;
      }
    }

    ctx.save();
    ctx.lineCap = 'round';
    if (on) {
      ctx.strokeStyle = C.pipeOn;
      ctx.lineWidth = 5;
      ctx.shadowBlur = C.pipeOnBlur + extraGlow + surgeExtra;
      ctx.shadowColor = C.pipeGlow;
    } else {
      var breathe = 0.52 + 0.22 * Math.sin(G.t * 0.0017 + r * 0.85 + c * 1.1);
      ctx.strokeStyle = 'rgba(' + C.pipeOffRGB + ',' + (0.30 * breathe).toFixed(3) + ')';
      ctx.lineWidth = 3;
      ctx.shadowBlur = C.pipeOffBlur;
      ctx.shadowColor = C.pipeOffGlow;
    }
    for (var d = 0; d < 4; d++) {
      if (!conn[d]) continue;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(edges[d][0], edges[d][1]);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, on ? 5.5 : 3.5, 0, Math.PI*2);
    ctx.fillStyle = on ? C.pipeOn : ('rgba(' + C.pipeOffRGB + ',0.38)');
    ctx.shadowBlur = on ? (20 + extraGlow) : 0;
    ctx.fill();
    ctx.restore();
  }

  // ── Source node with slow rotating outer ring ─────────────
  function drawSource(r, c, t) {
    var ctx = G.ctx, pos = ctr(r, c), cx = pos[0], cy = pos[1];
    var pulse = 0.85 + 0.15 * Math.sin(t * 0.003);

    // Slow outer rotating arc — adds depth and suggests active power
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.0009);
    ctx.beginPath();
    ctx.arc(0, 0, 23, 0, Math.PI * 1.55);
    ctx.strokeStyle = 'rgba(' + C.srcArcRGB + ',0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

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
      ctx.fillStyle = 'rgba(' + C.partRGB + ',' + tr.a + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = C.partGlow;
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
    ctx.shadowColor = C.partGlow;
    ctx.fill();
    ctx.restore();
  }

  // Slow ambient energy dots that flow along the solved path
  function drawAmbientFlow(t) {
    var path = G.signalPath;
    if (path.length < 2) return;
    var ctx = G.ctx;
    for (var i = 0; i < 3; i++) {
      var prog = ((t * 0.00028) + i * 0.34) % 1;
      var pos = getParticlePos(path, prog);
      var alpha = 0.16 + 0.10 * Math.sin(t * 0.002 + i * 2.09);
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + C.partRGB + ',' + alpha.toFixed(3) + ')';
      ctx.shadowBlur = 7;
      ctx.shadowColor = C.partGlow;
      ctx.fill();
      ctx.restore();
    }
  }

  // Traveling energy dots along powered pipe arms — batched for mobile performance
  function drawPowerFlow(pow, t) {
    var ctx = G.ctx, n = G.size;
    ctx.save();
    ctx.globalAlpha = 0.46;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!pow[r][c]) continue;
        var cell = G.grid[r][c];
        if (cell.type === T_SOURCE || cell.type === T_TARGET || cell.type === T_EMPTY) continue;
        var conn = getConn(cell.type, cell.rot);
        var pos = ctr(r, c);
        var cx = pos[0], cy = pos[1];
        var half = G.cellPx * 0.46;
        var edgesL = [[cx, cy - half],[cx + half, cy],[cx, cy + half],[cx - half, cy]];
        for (var d = 0; d < 4; d++) {
          if (!conn[d]) continue;
          var phase = ((t * 0.00095 + r * 0.93 + c * 0.67 + d * 1.57) % 1 + 1) % 1;
          var prog = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
          var ex = edgesL[d][0], ey = edgesL[d][1];
          var dx = cx + (ex - cx) * prog, dy = cy + (ey - cy) * prog;
          ctx.moveTo(dx + 1.5, dy);
          ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
        }
      }
    }
    ctx.fill();
    ctx.restore();
  }

  // Typewriter reveal — types text character by character into el
  function typewriter(el, text, startDelay, charSpeed) {
    el.textContent = '';
    setTimeout(function () {
      var i = 0;
      (function tick() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i++);
          setTimeout(tick, charSpeed);
        }
      }());
    }, startDelay);
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

    // Lock in cascade start time on first frame after level load
    if (G._cascPending) { G.levelLoadT = t; G._cascPending = false; }

    drawBg();
    drawGridLines();
    for (var r2 = 0; r2 < n; r2++) {
      for (var c2 = 0; c2 < n; c2++) {
        var caAlpha = cascadeAlpha(r2, c2);
        if (caAlpha <= 0) continue;
        if (caAlpha < 1) G.ctx.globalAlpha = caAlpha;
        var cell = G.grid[r2][c2];
        if      (cell.type === T_SOURCE) drawSource(r2, c2, t);
        else if (cell.type === T_TARGET) drawTarget(r2, c2, pow, t);
        else if (cell.type !== T_EMPTY)  drawPipe(r2, c2, pow);
        if (G.glitchMods && G.glitchMods.cellOverlay && cell.type !== T_EMPTY) {
          G.glitchMods.cellOverlay(G.ctx, r2, c2, pow[r2][c2], cell, t,
            G.ox + c2*G.cellPx, G.oy + r2*G.cellPx, G.cellPx);
        }
        if (caAlpha < 1) G.ctx.globalAlpha = 1;
      }
    }
    drawPowerFlow(pow, t);
    if (G.solving && G.signalPath.length > 0) {
      drawAmbientFlow(t);
      drawParticle(G.signalPath, G.signalT);
    }
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
    G.solveFlashT = G.t;
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
    if (typeof LoreSystem !== 'undefined') LoreSystem.onSolve();

    // Concept typewriter — surfaces the coding pattern this level demonstrated
    var lvDef = LEVELS[(G.level - 1) % LEVELS.length];
    var conceptEl  = document.getElementById('glitch-concept');
    var noteEl     = document.getElementById('glitch-concept-note');
    if (conceptEl && lvDef && lvDef.concept) {
      var conceptText = '// ' + lvDef.concept;
      typewriter(conceptEl, conceptText, 640, 30);
      if (noteEl && lvDef.conceptNote) {
        typewriter(noteEl, lvDef.conceptNote, 640 + conceptText.length * 30 + 160, 13);
      }
    }
  }

  function resize() {
    if (!G.canvas) return;
    var parent = G.canvas.parentElement;
    var avail = (parent && parent.clientWidth > 0) ? parent.clientWidth - 32 : window.innerWidth - 32;
    if (avail < 100) avail = window.innerWidth - 32;
    var maxSz = window.innerWidth >= 900 ? 560 : 400;
    var sz = Math.min(Math.max(avail, 100), maxSz);
    G.canvas.width  = sz;
    G.canvas.height = sz;
    G.cellPx = Math.floor(sz / G.size);
    G.ox = Math.floor((sz - G.cellPx * G.size) / 2);
    G.oy = G.ox;
    G.vignetteGrad = null; // invalidate cached gradient when size changes
  }

  // ── Public API ───────────────────────────────────────────
  function init(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }

    G.canvas      = canvas;
    G.ctx         = canvas.getContext('2d');
    canvas.setAttribute('data-mode', G.mode);
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

    // Seed ambient background particles after canvas is sized
    G.bgParticles = [];
    for (var i = 0; i < 18; i++) {
      G.bgParticles.push({
        x:  Math.random() * G.canvas.width,
        y:  Math.random() * G.canvas.height,
        vx: (Math.random() - 0.5) * 0.13,
        vy: (Math.random() - 0.5) * 0.13,
        r:  0.55 + Math.random() * 0.85
      });
    }

    G._resizeHandler = function() { resize(); };
    window.addEventListener('resize', G._resizeHandler);

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
    if (typeof LoreSystem !== 'undefined') LoreSystem.onRestart();
    G.moves       = 0;
    G.solving     = false;
    G.solvedFired = false;
    G.signalT     = 0;
    G.signalPath  = [];
    G.tapped      = null;
    G.powered     = {};
    G.powFlash    = {};
    G.solveFlashT = null;
    loadLevel(G.level - 1, true, true); // skipLore + skipCascade on restart
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
    G.solveFlashT = null;
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
    if (G._resizeHandler) { window.removeEventListener('resize', G._resizeHandler); G._resizeHandler = null; }
    G.canvas = null;
    G.ctx    = null;
  }

  function setModifiers(mods) {
    G.glitchMods = mods || null;
  }

  function setLevels(arr) {
    LEVELS = (arr && arr.length) ? arr : DEFAULT_LEVELS;
  }

  function setMode(m) {
    G.mode = (m === 'chaos') ? 'chaos' : 'venus';
    C = PALETTES[G.mode];
    G.vignetteGrad = null;
    if (G.canvas) G.canvas.setAttribute('data-mode', G.mode);
  }

  window.GlitchGame = { init: init, restart: restart, nextLevel: nextLevel, destroy: destroy, setModifiers: setModifiers, setLevels: setLevels, setMode: setMode };
}());
