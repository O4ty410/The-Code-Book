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

// ── Background Music — Zelda / space hybrid ────────────────────────────────────
// A minor, 72 BPM. Triangle-wave harp arpeggios + detuned sine pads + bass.

export function startBackgroundMusic() {
  try {
    const ctx = getCtx();
    if (!ctx) return () => {};

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 5);

    const BPM      = 72;
    const beat     = 60 / BPM;
    const eighth   = beat / 2;
    const barDur   = beat * 4;
    const phraseDur = barDur * 8;

    // Frequency table (Hz)
    const N = {
      F2: 87.31,  A2: 110.00, C3: 130.81, E3: 164.81, F3: 174.61,
      G3: 196.00, A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66,
      E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25,
    };

    const allNodes = [];

    function pluck(freq, t, dur) {
      // Main triangle tone (harp body)
      const osc1 = ctx.createOscillator(); const env1 = ctx.createGain();
      osc1.type = 'triangle'; osc1.frequency.value = freq;
      env1.gain.setValueAtTime(0, t);
      env1.gain.linearRampToValueAtTime(0.11, t + 0.010);
      env1.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur * 0.85, 0.52));
      osc1.connect(env1); env1.connect(master);
      osc1.start(t); osc1.stop(t + dur);
      allNodes.push(osc1);

      // Brief octave harmonic — adds plucked "attack" character
      const osc2 = ctx.createOscillator(); const env2 = ctx.createGain();
      osc2.type = 'sine'; osc2.frequency.value = freq * 2;
      env2.gain.setValueAtTime(0, t);
      env2.gain.linearRampToValueAtTime(0.032, t + 0.008);
      env2.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc2.connect(env2); env2.connect(master);
      osc2.start(t); osc2.stop(t + 0.18);
      allNodes.push(osc2);
    }

    function pad(freqs, t, dur) {
      freqs.forEach((freq) => {
        [0, 5, -5].forEach((cents) => {
          const f = freq * Math.pow(2, cents / 1200);
          const osc = ctx.createOscillator(); const env = ctx.createGain();
          osc.type = 'sine'; osc.frequency.value = f;
          env.gain.setValueAtTime(0, t);
          env.gain.linearRampToValueAtTime(0.016, t + 1.8);
          env.gain.setValueAtTime(0.016, t + dur - 1.8);
          env.gain.linearRampToValueAtTime(0, t + dur);
          osc.connect(env); env.connect(master);
          osc.start(t); osc.stop(t + dur);
          allNodes.push(osc);
        });
      });
    }

    function bassNote(freq, t, dur) {
      const osc = ctx.createOscillator(); const env = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.030, t + 0.30);
      env.gain.setValueAtTime(0.030, t + dur - 0.6);
      env.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(env); env.connect(master);
      osc.start(t); osc.stop(t + dur);
      allNodes.push(osc);
    }

    // 8-bar melody: [freq, eighth-note-count]
    // Bars 1-2 Am, 3-4 F, 5-6 C, 7-8 Em→Am resolve
    const melody = [
      [N.A3,1],[N.C4,1],[N.E4,2],[N.A4,1],[N.G4,1],[N.E4,2],   // bar 1
      [N.C4,1],[N.E4,1],[N.G4,2],[N.A4,1],[N.E4,1],[N.C4,2],   // bar 2
      [N.F3,1],[N.A3,1],[N.C4,2],[N.F4,1],[N.E4,1],[N.C4,2],   // bar 3
      [N.A3,1],[N.C4,1],[N.E4,2],[N.F4,1],[N.C4,1],[N.A3,2],   // bar 4
      [N.C4,1],[N.E4,1],[N.G4,2],[N.C5,1],[N.B4,1],[N.G4,2],   // bar 5
      [N.E4,1],[N.G4,1],[N.B4,2],[N.C5,1],[N.G4,1],[N.E4,2],   // bar 6
      [N.E3,1],[N.G3,1],[N.B3,2],[N.E4,1],[N.D4,1],[N.B3,2],   // bar 7
      [N.G3,1],[N.B3,1],[N.D4,2],[N.E4,2],[N.A3,2],            // bar 8
    ];

    // Chord pads { freqs, bar (0-indexed), bars }
    const pads = [
      { freqs: [N.A2, N.E3, N.A3, N.C4], bar: 0, bars: 2 }, // Am
      { freqs: [N.F2, N.C3, N.F3, N.A3], bar: 2, bars: 2 }, // F
      { freqs: [N.C3, N.G3, N.C4, N.E4], bar: 4, bars: 2 }, // C
      { freqs: [N.E3, N.B3, N.E4, N.G4], bar: 6, bars: 2 }, // Em
    ];

    // Bass: one note per 2 bars
    const bass = [
      [N.A2, 0, 2], [N.F2, 2, 2], [N.C3, 4, 2], [N.E3, 6, 2],
    ];

    function schedulePhrase(phraseStart) {
      let t = phraseStart;
      melody.forEach(([freq, eighths]) => {
        pluck(freq, t, eighth * eighths);
        t += eighth * eighths;
      });
      pads.forEach(({ freqs, bar, bars }) => pad(freqs, phraseStart + bar * barDur, bars * barDur));
      bass.forEach(([freq, bar, bars]) => bassNote(freq, phraseStart + bar * barDur, bars * barDur));
    }

    const startTime = ctx.currentTime + 0.5;
    let nextPhrase = 0;

    function scheduleUpTo(until) {
      while (startTime + nextPhrase * phraseDur < until) {
        schedulePhrase(startTime + nextPhrase * phraseDur);
        nextPhrase++;
      }
    }

    scheduleUpTo(ctx.currentTime + phraseDur * 2);
    const interval = setInterval(() => scheduleUpTo(ctx.currentTime + phraseDur * 2), (phraseDur / 2) * 1000);

    return () => {
      clearInterval(interval);
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);
        setTimeout(() => { allNodes.forEach((n) => { try { n.stop(); } catch (_) {} }); }, 2200);
      } catch (_) {}
    };
  } catch (_) {
    return () => {};
  }
}
