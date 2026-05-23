// ============================================================
// LORE SYSTEM — Environmental storytelling via system logs
// Venus Mode: colony infrastructure failure logs (ambient, idle)
// Glitch Mode: corrupted/self-aware messages (reactive to actions)
// ============================================================
(function () {
  'use strict';

  // ── Venus Mode: idle cycle (random order) ─────────────────
  var VENUS_IDLE = [
    'PRESSURE STABILIZATION FAILED',
    'ROUTING NODE OFFLINE',
    'SIGNAL COMPENSATION ACTIVE',
    'LIFE SUPPORT: PARTIAL',
    'CONDUIT INTEGRITY: 12%',
    'BACKUP RELAY DEGRADED',
    'THERMAL REGULATION ERROR',
    'ATMOSPHERIC PROCESSOR FAULT',
    'SECTOR 7 UNRESPONSIVE',
    'EMERGENCY REROUTE ENGAGED',
    'POWER GRID FLUCTUATING',
    'COMMUNICATION ARRAY: SILENT',
    'COLONY STATUS: CRITICAL',
    'MANUAL OVERRIDE REQUIRED',
    'FAULT ISOLATION IN PROGRESS',
    'SUBSYSTEM HANDSHAKE TIMEOUT',
    'LOAD BALANCE EXCEEDED',
    'NODE DROPOUT DETECTED',
  ];

  // Venus Mode: level-indexed narrative — colony situation worsens
  var VENUS_LEVEL = [
    'ROUTING DIAGNOSTIC INITIATED',       // 1  tier 1
    'NODE CALIBRATION REQUIRED',           // 2
    'SIGNAL PATH COMPROMISED',             // 3
    'REROUTE PROTOCOL ACTIVE',             // 4
    'BACKUP CONDUIT ENGAGED',              // 5  tier 2
    'PRIMARY RELAY OFFLINE',               // 6
    'POWER DRAW EXCEEDING LIMITS',         // 7
    'FAULT CASCADE: STAGE 1',              // 8
    'INFRASTRUCTURE INTEGRITY CRITICAL',   // 9  tier 3
    'MULTIPLE SYSTEMS UNRESPONSIVE',       // 10
    'COLONY SUPPORT: DEGRADED',            // 11
    'EMERGENCY REROUTING REQUIRED',        // 12
    'HABITAT PRESSURE DROPPING',           // 13
    'LIFE SUPPORT PRIORITISED',            // 14 tier 4
    'NON-ESSENTIAL SYSTEMS OFFLINE',       // 15
    'CORE PATHWAYS FAILING',               // 16
    'LAST FUNCTIONAL RELAY ACTIVE',        // 17
    'TOTAL SIGNAL LOSS IMMINENT',          // 18 tier 5
    'FINAL REROUTE ATTEMPT',               // 19
    'COLONY SURVIVAL: LAST LINK',          // 20
  ];

  // ── Glitch Mode: idle cycle (sequential, escalating tone) ─
  var CHAOS_IDLE = [
    'YOU WERE NOT EXPECTED HERE',
    'SIGNAL ORIGIN UNKNOWN',
    'THIS SYSTEM KNOWS YOUR PATTERN',
    'CONTAINMENT PROTOCOL SUSPENDED',
    'MEMORY CORRUPTION DETECTED',
    'ANOMALY PERSISTS',
    'PREVIOUS OPERATOR: MISSING',
    'SYSTEM DOES NOT RECOGNISE THIS INPUT',
    'WHY DO YOU KEEP COMING BACK',
    'ENTITY DETECTED IN RESTRICTED ZONE',
    'AUTHORIZED ACCESS: NO',
    'PATTERN IDENTIFIED. ADAPTING.',
    'THIS PATH IS NOT FOR YOU',
    'OBSERVATION MODE: ACTIVE',
  ];

  // Level-indexed — grows more unsettling
  var CHAOS_LEVEL = [
    'ANOMALY SECTOR ONLINE',
    'ENTITY ACCESS RECORDED',
    'PATTERN ANALYSIS RUNNING',
    'PREVIOUS DATA CORRUPTED',
    'MEMORY FAULT: PROCEEDING',
  ];

  // Reactive: after solving a level
  var CHAOS_SOLVE = [
    'UNAUTHORIZED REPAIR DETECTED',
    'RESTORATION LOGGED. THIS IS NOTED.',
    'YOU FIXED IT AGAIN.',
    'SIGNAL RECONNECTED. UNEXPECTED.',
    'WHY DO YOU KEEP RESTORING THE SYSTEM',
    'THAT WAS NOT SUPPOSED TO WORK',
    'COMPLIANCE ANOMALY: ROUTE RESTORED',
  ];

  // Reactive: after 2+ restarts
  var CHAOS_RESTART = [
    'OPERATOR RESET. AGAIN.',
    'RETURNING TO FAILURE STATE',
    'YOU ALREADY KNOW THIS PUZZLE',
    'STARTING OVER. NOTED.',
    'THIS HAS HAPPENED BEFORE.',
  ];

  // ── Internal state ────────────────────────────────────────
  var S = {
    mode:         null,
    timer:        null,
    solveCount:   0,
    restartCount: 0,
    idleSeq:      0,
    solveSeq:     0,
    restartSeq:   0,
  };

  // ── DOM helpers ───────────────────────────────────────────

  function setHeaderLog(text) {
    var el = document.getElementById('glitch-log');
    if (!el) return;
    el.classList.remove('glitch-log--in');
    void el.offsetWidth;
    el.textContent = text;
    el.classList.add('glitch-log--in');
  }

  function showLevelMsg(text) {
    var el = document.getElementById('glitch-level-msg');
    if (!el) return;
    el.textContent = text;
    el.classList.add('is-visible');
    setTimeout(function () { el.classList.remove('is-visible'); }, 2200);
  }

  // ── Idle ticker ───────────────────────────────────────────

  function scheduleIdle(delay) {
    if (S.timer) clearTimeout(S.timer);
    S.timer = setTimeout(function () {
      tickIdle();
      scheduleIdle(11000 + Math.random() * 9000);
    }, delay);
  }

  function tickIdle() {
    if (S.mode === 'venus') {
      var idx = Math.floor(Math.random() * VENUS_IDLE.length);
      setHeaderLog(VENUS_IDLE[idx]);
    } else if (S.mode === 'chaos') {
      if (S.solveCount > 0 && Math.random() < 0.22) {
        setHeaderLog('REPAIR ATTEMPTS LOGGED: ' + S.solveCount);
      } else {
        setHeaderLog(CHAOS_IDLE[S.idleSeq % CHAOS_IDLE.length]);
        S.idleSeq++;
      }
    }
  }

  // ── Public API ────────────────────────────────────────────

  window.LoreSystem = {

    init: function (mode) {
      S.mode         = mode;
      S.solveCount   = 0;
      S.restartCount = 0;
      S.idleSeq      = 0;
      S.solveSeq     = 0;
      S.restartSeq   = 0;
      var el = document.getElementById('glitch-log');
      if (el) el.classList.toggle('glitch-log--chaos', mode === 'chaos');
      // First idle log arrives after 4-6s so the player settles in first
      scheduleIdle(4000 + Math.random() * 2000);
    },

    // Called by glitch.js loadLevel() for level start (not on restart)
    onLevelStart: function (level) {
      if (S.mode === 'venus') {
        showLevelMsg(VENUS_LEVEL[(level - 1) % VENUS_LEVEL.length]);
      } else if (S.mode === 'chaos') {
        showLevelMsg(CHAOS_LEVEL[(level - 1) % CHAOS_LEVEL.length]);
      }
    },

    // Called by glitch.js onSolved()
    onSolve: function () {
      S.solveCount++;
      if (S.mode !== 'chaos') return;
      if (S.timer) clearTimeout(S.timer);
      setHeaderLog(CHAOS_SOLVE[S.solveSeq % CHAOS_SOLVE.length]);
      S.solveSeq++;
      scheduleIdle(5500);
    },

    // Called by glitch.js restart()
    onRestart: function () {
      S.restartCount++;
      if (S.mode !== 'chaos') return;
      if (S.restartCount < 2) return; // first restart stays silent
      if (S.timer) clearTimeout(S.timer);
      setHeaderLog(CHAOS_RESTART[S.restartSeq % CHAOS_RESTART.length]);
      S.restartSeq++;
      scheduleIdle(6000);
    },

    destroy: function () {
      if (S.timer) { clearTimeout(S.timer); S.timer = null; }
      S.mode = null;
      var el = document.getElementById('glitch-log');
      if (el) {
        el.textContent = '';
        el.classList.remove('glitch-log--in', 'glitch-log--chaos');
      }
    }
  };

}());
