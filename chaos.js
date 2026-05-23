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
      }
    };
  }

  // ── Global Chaos post-render (canvas scanlines + stripe) ──

  function chaosPostRender(ctx, w, h, t) {
    // Scanlines
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    for (var y = 1; y < h; y += 4) ctx.fillRect(0, y, w, 1);
    // Occasional horizontal glitch stripe
    var v = Math.sin(t * 0.00073) * Math.sin(t * 0.00127);
    if (v > 0.90) {
      var intensity = (v - 0.90) * 10;
      var sy = Math.floor(h * 0.2 + Math.sin(t * 0.003) * h * 0.3);
      ctx.fillStyle = 'rgba(255,20,80,' + intensity * 0.25 + ')';
      ctx.fillRect(0, sy, w, 2 + Math.floor(intensity * 4));
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
      GlitchGame.init(canvasId);
      applyMods(0);
    },
    restart: function () {
      GlitchGame.restart();
      applyMods(currentIdx);
    },
    nextLevel: function () {
      var len = (window.ChaosLevels || []).length;
      currentIdx = currentIdx >= len - 1 ? 0 : currentIdx + 1;
      GlitchGame.nextLevel();
      applyMods(currentIdx);
    },
    destroy: function () {
      GlitchGame.setModifiers(null);
      GlitchGame.setLevels(window.GlitchLevels || []);
      GlitchGame.destroy();
    }
  };

}());
