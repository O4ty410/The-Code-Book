// Single shared AudioContext — browsers cap concurrent contexts at ~6.
// All sounds share one context and add/remove nodes as needed.

let _muted = false;
let _ctx   = null;

function getCtx() {
  try {
    if (!_ctx || _ctx.state === 'closed') {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Attempt resume — no-op if already running, resolves after first gesture
    _ctx.resume().catch(() => {});
    return _ctx;
  } catch (_) {
    return null;
  }
}

export function toggleMute() { _muted = !_muted; return _muted; }
export function isMuted()    { return _muted; }

// ── Ambient space hum ──────────────────────────────────────────────────────
// Returns a stop function — call it on unmount.

export function startAmbientHum() {
  if (_muted) return () => {};
  try {
    const ctx = getCtx();
    if (!ctx) return () => {};

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Sub-bass drone + a perfect fifth for depth
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;

    const fifth = ctx.createOscillator();
    fifth.type = 'sine';
    fifth.frequency.value = 82.4;

    // Slow LFO breathes life into the drone
    const lfo     = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15;
    lfoGain.gain.value  = 1.4;
    lfo.connect(lfoGain);
    lfoGain.connect(drone.frequency);

    drone.connect(master);
    fifth.connect(master);
    drone.start();
    fifth.start();
    lfo.start();

    // Fade in slowly so it doesn't startle
    master.gain.linearRampToValueAtTime(0.020, ctx.currentTime + 5);

    return () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          try { drone.stop(); fifth.stop(); lfo.stop(); } catch (_) {}
        }, 1300);
      } catch (_) {}
    };
  } catch (_) {
    return () => {};
  }
}

// ── One-shot sounds ────────────────────────────────────────────────────────

export function playTerminalOpen() {
  if (_muted) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(520, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.24);
  } catch (_) {}
}

export function playTerminalClose() {
  if (_muted) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(460, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.10);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.24);
  } catch (_) {}
}

let _tickSkip = 0;
export function playTypeTick() {
  if (_muted) return;
  _tickSkip = (_tickSkip + 1) % 3; // fire on every 3rd character
  if (_tickSkip !== 0) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 880 + Math.random() * 280;
    gain.gain.setValueAtTime(0.007, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.022);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.025);
  } catch (_) {}
}

export function playErrorSound() {
  if (_muted) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.30);
    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.38);
  } catch (_) {}
}

// Synthesised C-major success chord (no audio file needed)
export function playSuccessSound() {
  if (_muted) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.06;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.07, start + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6);
      osc.start(start);
      osc.stop(start + 1.6);
    });
  } catch (_) {}
}

// Legacy file-based sound (unused in current build, kept for compatibility)
export function playSound(src) {
  if (_muted) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
