let muted = false;

export function playSound(src) {
  if (muted) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export function isMuted() {
  return muted;
}

// Synthesised success chord using Web Audio API (no file needed)
export function playSuccessSound() {
  if (muted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // C major chord: C4 E4 G4 C5
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
  } catch (_) {
    // AudioContext unavailable — silent fallback
  }
}
