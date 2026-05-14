// Single shared AudioContext — browsers cap concurrent contexts at ~6.
// All sounds share one context and add/remove nodes as needed.

let _muted = false;
let _ctx   = null;

function getCtx() {
  try {
    if (!_ctx || _ctx.state === 'closed') {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    _ctx.resume().catch(() => {});
    return _ctx;
  } catch (_) {
    return null;
  }
}

export function toggleMute() { _muted = !_muted; return _muted; }
export function isMuted()    { return _muted; }

// ── Noise buffer helper ────────────────────────────────────────────────────────
function createNoiseSource(ctx, seconds = 3) {
  const size   = Math.floor(seconds * ctx.sampleRate);
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
  const data   = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const src  = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop   = true;
  return src;
}

// ── Generic ambient builder ────────────────────────────────────────────────────
// Returns a stop() function. Caller should invoke it on unmount.

function buildAmbient({ droneFreqs, lfoRate, lfoDepth, noiseFilter, noiseGainVal, masterGain, fadeIn }) {
  if (_muted) return () => {};
  try {
    const ctx = getCtx();
    if (!ctx) return () => {};

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const oscillators = [];
    const noiseNodes  = [];

    // Drones
    droneFreqs.forEach(({ freq, type = 'sine' }) => {
      const osc = ctx.createOscillator();
      osc.type            = type;
      osc.frequency.value = freq;
      osc.connect(master);
      osc.start();
      oscillators.push(osc);
    });

    // LFO on first drone frequency
    const lfo     = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type            = 'sine';
    lfo.frequency.value = lfoRate;
    lfoGain.gain.value  = lfoDepth;
    lfo.connect(lfoGain);
    if (oscillators.length > 0) lfoGain.connect(oscillators[0].frequency);
    lfo.start();
    noiseNodes.push(lfo);

    // Filtered noise layer
    if (noiseFilter) {
      const noise = createNoiseSource(ctx);
      const filt  = ctx.createBiquadFilter();
      filt.type            = noiseFilter.type;
      filt.frequency.value = noiseFilter.freq;
      filt.Q.value         = noiseFilter.Q ?? 1.0;

      const ng = ctx.createGain();
      ng.gain.value = noiseGainVal ?? 0.012;

      noise.connect(filt);
      filt.connect(ng);
      ng.connect(master);
      noise.start();
      noiseNodes.push(noise);
    }

    // Fade in
    master.gain.linearRampToValueAtTime(masterGain, ctx.currentTime + (fadeIn ?? 4));

    return () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          [...oscillators, ...noiseNodes].forEach((n) => { try { n.stop(); } catch (_) {} });
        }, 1300);
      } catch (_) {}
    };
  } catch (_) {
    return () => {};
  }
}

// ── HANGAR — sub-bass drone + low ventilation noise ───────────────────────────

export function startAmbientHum() {
  return buildAmbient({
    droneFreqs:   [{ freq: 55 }, { freq: 82.4 }],
    lfoRate:      0.15,
    lfoDepth:     1.4,
    noiseFilter:  { type: 'lowpass', freq: 280, Q: 0.8 },
    noiseGainVal: 0.010,
    masterGain:   0.022,
    fadeIn:       5,
  });
}

// ── DEBUG ARENA — higher computer-room drone + high-pass server hiss ──────────

export function startDebugAmbient() {
  return buildAmbient({
    droneFreqs:   [{ freq: 110 }, { freq: 165, type: 'sine' }],
    lfoRate:      0.08,
    lfoDepth:     0.9,
    noiseFilter:  { type: 'highpass', freq: 1400, Q: 0.6 },
    noiseGainVal: 0.013,
    masterGain:   0.018,
    fadeIn:       3.5,
  });
}

// ── VISUAL LAB — monitoring-station mid-range tone + bandpass hiss ─────────────

export function startVisualAmbient() {
  return buildAmbient({
    droneFreqs:   [{ freq: 82, type: 'sine' }, { freq: 123 }],
    lfoRate:      0.10,
    lfoDepth:     0.7,
    noiseFilter:  { type: 'bandpass', freq: 600, Q: 1.5 },
    noiseGainVal: 0.009,
    masterGain:   0.016,
    fadeIn:       4,
  });
}

// ── SPACE / MARS LAUNCH — deep void drone + faint high-frequency shimmer ──────

export function startSpaceAmbient() {
  return buildAmbient({
    droneFreqs:   [{ freq: 32 }, { freq: 48 }],
    lfoRate:      0.06,
    lfoDepth:     2.0,
    noiseFilter:  { type: 'highpass', freq: 7000, Q: 0.4 },
    noiseGainVal: 0.008,
    masterGain:   0.020,
    fadeIn:       6,
  });
}

// ── One-shot sounds ────────────────────────────────────────────────────────────

export function playTerminalOpen() {
  if (_muted) return;
  try {
    const ctx  = getCtx();
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
    const ctx  = getCtx();
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
  _tickSkip = (_tickSkip + 1) % 3;
  if (_tickSkip !== 0) return;
  try {
    const ctx  = getCtx();
    if (!ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type            = 'square';
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
    const ctx  = getCtx();
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
      osc.type            = 'sine';
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

export function playSound(src) {
  if (_muted) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
