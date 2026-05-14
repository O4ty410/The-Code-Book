// ── Launch State ───────────────────────────────────────────────────────────

export function createLaunchState() {
  return {
    phaseTime:        0,
    countdownTimer:   10,
    rocketAscent:     0,     // world-space rise offset (negative = up)
    cameraOffset:     0,     // how far world has scrolled up (positive)
    shakeX:           0,
    shakeY:           0,
    flashAlpha:       0,     // white ignition flash
    alarmAlpha:       0,     // red alarm overlay
    fadeAlpha:        0,     // black fade-out during ascent
    ignitionLevel:    0.3,   // 0..1 — controls flame intensity; idle pre-launch = 0.3
    particles:        [],
    phaseTransitioned: false, // guard against duplicate setLaunchPhase calls
  };
}

// ── Particles ──────────────────────────────────────────────────────────────

const MAX_PARTICLES = 400; // prevents unbounded growth at high refresh rates

export function spawnSmoke(state, cx, baseY) {
  if (state.particles.length >= MAX_PARTICLES) return;
  const spread = (Math.random() - 0.5) * 60;
  state.particles.push({
    type:      'smoke',
    x:         cx + spread,
    y:         baseY,
    vx:        spread * 0.4,
    vy:        -(Math.random() * 55 + 25),
    r:         Math.random() * 14 + 6,
    alpha:     0,
    peakAlpha: Math.random() * 0.50 + 0.20,
    life:      0,
    maxLife:   Math.random() * 2.2 + 1.4,
    gray:      Math.floor(Math.random() * 55 + 140),
  });
}

export function spawnExhaust(state, cx, baseY) {
  if (state.particles.length >= MAX_PARTICLES) return;
  state.particles.push({
    type:    'exhaust',
    x:       cx + (Math.random() - 0.5) * 28,
    y:       baseY + 15,
    vx:      (Math.random() - 0.5) * 70,
    vy:      Math.random() * 140 + 80,   // downward
    r:       Math.random() * 9 + 3,
    alpha:   0.85,
    life:    0,
    maxLife: Math.random() * 0.5 + 0.25,
    hue:     Math.random() * 35 + 5,     // orange-red range
  });
}

export function updateParticles(state, delta) {
  const { particles } = state;
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life += delta;
    if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

    const progress = p.life / p.maxLife;
    p.x  += p.vx * delta;
    p.y  += p.vy * delta;
    p.vy *= p.type === 'smoke' ? Math.pow(0.97, delta * 60) : Math.pow(0.90, delta * 60);
    p.r  += (p.type === 'smoke' ? 9 : 3) * delta;

    if (p.type === 'smoke') {
      p.alpha = progress < 0.25
        ? p.peakAlpha * (progress / 0.25)
        : p.peakAlpha * (1 - (progress - 0.25) / 0.75);
    } else {
      p.alpha = (1 - progress) * 0.80;
    }
  }
}

export function drawParticles(ctx, state) {
  state.particles.forEach((p) => {
    if (p.alpha <= 0.005 || p.r <= 0) return;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);

    if (p.type === 'smoke') {
      // Gradient handles alpha — do NOT also set globalAlpha (would square the value)
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `rgba(${p.gray}, ${p.gray}, ${p.gray + 18}, ${p.alpha.toFixed(3)})`);
      g.addColorStop(1, `rgba(${p.gray - 40}, ${p.gray - 40}, ${p.gray}, 0)`);
      ctx.fillStyle = g;
    } else {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      const r2 = Math.min(255, Math.floor(p.hue * 7));
      g.addColorStop(0,   `rgba(255, 248, 210, ${p.alpha.toFixed(3)})`);
      g.addColorStop(0.4, `rgba(255, ${r2}, 20, ${(p.alpha * 0.75).toFixed(3)})`);
      g.addColorStop(1,   'rgba(180, 40, 0, 0)');
      ctx.fillStyle = g;
    }
    ctx.fill();
  });
}
