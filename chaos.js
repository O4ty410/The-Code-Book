// ============================================================
// CHAOS MODE — modifier engine + ChaosGame public API
// Wraps GlitchGame with per-level modifier hooks.
// Modifier types: reverse, corrupt, flicker
// ============================================================
(function () {
  'use strict';

  var T_EMPTY = 0; // matches glitch.js internals

  // ── Modifier factories ──────────────────────────────────

  function makeReverseMod(cells) {
    var set = {};
    cells.forEach(function (rc) { set[rc[0] + ',' + rc[1]] = true; });
    return {
      transformGrid: function (grid, t, n) {
        var vGrid = [];
        for (var r = 0; r < n; r++) {
          vGrid[r] = [];
          for (var c = 0; c < n; c++) {
            var orig = grid[r][c];
            vGrid[r][c] = set[r + ',' + c]
              ? { type: orig.type, rot: (orig.rot + 2) & 3 }
              : orig;
          }
        }
        return vGrid;
      },
      cellOverlay: function (ctx, r, c, pow, cell, t, px, py, cellPx) {
        if (!set[r + ',' + c]) return;
        var cx = px + cellPx * 0.5, cy = py + cellPx * 0.5;
        ctx.save();
        // Amber tint
        ctx.fillStyle = 'rgba(255,140,0,0.16)';
        ctx.fillRect(px + 1, py + 1, cellPx - 2, cellPx - 2);
        // Reversal glyph
        ctx.font = 'bold ' + Math.floor(cellPx * 0.3) + 'px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255,165,0,0.88)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255,140,0,0.6)';
        ctx.fillText('↺', cx, cy - cellPx * 0.22);
        ctx.restore();
      }
    };
  }

  function makeCorruptMod(cells) {
    var set = {};
    cells.forEach(function (rc) { set[rc[0] + ',' + rc[1]] = true; });
    return {
      transformGrid: function (grid, t, n) {
        var vGrid = [];
        for (var r = 0; r < n; r++) {
          vGrid[r] = [];
          for (var c = 0; c < n; c++) {
            vGrid[r][c] = set[r + ',' + c]
              ? { type: T_EMPTY, rot: 0 }
              : grid[r][c];
          }
        }
        return vGrid;
      },
      cellOverlay: function (ctx, r, c, pow, cell, t, px, py, cellPx) {
        if (!set[r + ',' + c]) return;
        var cx = px + cellPx * 0.5, cy = py + cellPx * 0.5;
        var s = cellPx * 0.26;
        ctx.save();
        // Red tint
        ctx.fillStyle = 'rgba(255,30,60,0.14)';
        ctx.fillRect(px + 1, py + 1, cellPx - 2, cellPx - 2);
        // Red X
        ctx.strokeStyle = 'rgba(255,40,60,0.82)';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255,0,40,0.7)';
        ctx.beginPath();
        ctx.moveTo(cx - s, cy - s); ctx.lineTo(cx + s, cy + s);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + s, cy - s); ctx.lineTo(cx - s, cy + s);
        ctx.stroke();
        ctx.restore();
      }
    };
  }

  function makeFlickerMod(cells) {
    var set = {};
    cells.forEach(function (rc) { set[rc[0] + ',' + rc[1]] = true; });
    return {
      transformGrid: null, // flicker is visual-only; logic is unchanged
      cellOverlay: function (ctx, r, c, pow, cell, t, px, py, cellPx) {
        if (!set[r + ',' + c]) return;
        // Two overlapping sin waves create an irregular flicker pattern
        var v = Math.sin(t * 0.011) * Math.sin(t * 0.007 + 1.2);
        if (v > 0) {
          ctx.save();
          ctx.fillStyle = 'rgba(0,0,0,' + (v * 0.74) + ')';
          ctx.fillRect(px + 1, py + 1, cellPx - 2, cellPx - 2);
          ctx.restore();
        }
        // Persistent tilde indicator — readability parity with ↺ (reverse) and X (corrupt)
        ctx.save();
        ctx.font = 'bold ' + Math.floor(cellPx * 0.22) + 'px monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'rgba(0,200,255,0.30)';
        ctx.fillText('~', px + cellPx - 4, py + 4);
        ctx.restore();
      }
    };
  }

  // ── Global Chaos post-render (canvas scanlines + stripe) ──

  function chaosPostRender(ctx, w, h, t) {
    // Scanlines — slightly more present than Venus
    ctx.fillStyle = 'rgba(0,0,0,0.065)';
    for (var y = 1; y < h; y += 4) ctx.fillRect(0, y, w, 1);
    // Warm top/bottom edge — simulates overheating infrastructure
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.00095);
    ctx.fillStyle = 'rgba(180,30,10,' + (0.07 * pulse).toFixed(3) + ')';
    ctx.fillRect(0, 0, w, Math.floor(h * 0.07));
    ctx.fillStyle = 'rgba(180,30,10,' + (0.04 * pulse).toFixed(3) + ')';
    ctx.fillRect(0, h - Math.floor(h * 0.05), w, Math.floor(h * 0.05));
    // Horizontal glitch stripe
    var v = Math.sin(t * 0.00073) * Math.sin(t * 0.00127);
    if (v > 0.88) {
      var intensity = (v - 0.88) * 8.33;
      var sy = Math.floor(h * 0.15 + Math.sin(t * 0.003) * h * 0.35);
      ctx.fillStyle = 'rgba(255,20,80,' + (intensity * 0.32).toFixed(3) + ')';
      ctx.fillRect(0, sy, w, 2 + Math.floor(intensity * 5));
    }
  }

  // ── Build combined modifier object for one level ─────────

  function buildMods(levelDef) {
    var base = { transformGrid: null, cellOverlay: null, postRender: chaosPostRender };
    if (!levelDef || !levelDef.modifiers || !levelDef.modifiers.length) return base;

    var subMods = levelDef.modifiers.map(function (m) {
      if (m.type === 'reverse') return makeReverseMod(m.cells || []);
      if (m.type === 'corrupt') return makeCorruptMod(m.cells || []);
      if (m.type === 'flicker') return makeFlickerMod(m.cells || []);
      return {};
    });

    var transformers = subMods.filter(function (sm) { return sm.transformGrid; });
    var overlayers   = subMods.filter(function (sm) { return sm.cellOverlay; });

    return {
      transformGrid: transformers.length ? function (grid, t, n) {
        var g = grid;
        transformers.forEach(function (sm) { g = sm.transformGrid(g, t, n); });
        return g;
      } : null,
      cellOverlay: overlayers.length ? function (ctx, r, c, pow, cell, t, px, py, cellPx) {
        overlayers.forEach(function (sm) {
          sm.cellOverlay(ctx, r, c, pow, cell, t, px, py, cellPx);
        });
      } : null,
      postRender: chaosPostRender
    };
  }

  // ── Countdown timer ─────────────────────────────────────

  var _chaosTimer = null;
  var _chaosTimerSec = 90;

  function _chaosTimerLimit(idx) {
    if (idx < 3) return 90;
    if (idx < 6) return 75;
    if (idx < 9) return 60;
    return 45;
  }

  function _updateTimerDisplay() {
    var el = document.getElementById('chaos-timer-val');
    if (!el) return;
    var sec = Math.max(0, _chaosTimerSec);
    el.textContent = sec;
    if (sec <= 10) {
      el.style.color = '#ff3050';
      el.style.animation = sec % 2 === 0 ? 'none' : 'chaos-timer-flash 0.5s step-end infinite';
    } else if (sec <= 20) {
      el.style.color = '#fb923c';
      el.style.animation = '';
    } else {
      el.style.color = '';
      el.style.animation = '';
    }
  }

  function _startChaosTimer(idx) {
    _stopChaosTimer();
    _chaosTimerSec = _chaosTimerLimit(idx);
    _updateTimerDisplay();
    _chaosTimer = setInterval(function () {
      var complete = document.getElementById('glitch-complete');
      if (complete && complete.classList.contains('active')) return;
      _chaosTimerSec--;
      _updateTimerDisplay();
      if (_chaosTimerSec <= 0) {
        _stopChaosTimer();
        var loreEl = document.getElementById('lore-ticker');
        if (loreEl) loreEl.textContent = 'SYSTEM RESET INITIATED — RESTARTING SEQUENCE';
        setTimeout(function () { if (window.ChaosGame) window.ChaosGame.restart(); }, 1200);
      }
    }, 1000);
  }

  function _stopChaosTimer() {
    if (_chaosTimer) { clearInterval(_chaosTimer); _chaosTimer = null; }
    var el = document.getElementById('chaos-timer-val');
    if (el) el.style.animation = '';
  }

  // ── ChaosGame public API ─────────────────────────────────

  var currentIdx = 0;

  function applyMods(idx) {
    var levels = window.ChaosLevels || [];
    GlitchGame.setModifiers(buildMods(levels[idx] || null));
  }

  window.ChaosGame = {
    init: function (canvasId) {
      GlitchGame.setLevels(window.ChaosLevels || []);
      currentIdx = 0;
      GlitchGame.setMode('chaos');
      GlitchGame.init(canvasId);
      applyMods(0);
      _startChaosTimer(0);
    },
    restart: function () {
      GlitchGame.restart();
      applyMods(currentIdx);
      _startChaosTimer(currentIdx);
    },
    nextLevel: function () {
      var len = (window.ChaosLevels || []).length;
      currentIdx = currentIdx >= len - 1 ? 0 : currentIdx + 1;
      GlitchGame.nextLevel();
      applyMods(currentIdx);
      _startChaosTimer(currentIdx);
    },
    destroy: function () {
      _stopChaosTimer();
      GlitchGame.setModifiers(null);
      GlitchGame.setLevels(window.GlitchLevels || []);
      GlitchGame.setMode('venus');
      GlitchGame.destroy();
    }
  };

}());
