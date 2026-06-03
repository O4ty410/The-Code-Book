// ── helpers ────────────────────────────────────────────────────────────────

function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x, y + h - r,     r);
  ctx.lineTo(x,     y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

// ── ambient dust motes (slow upward drift inside the hangar) ───────────────

export function initDust(count, W, H) {
  const horizon = H * 0.55;
  return Array.from({ length: count }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * horizon,
    r:     Math.random() * 0.75 + 0.2,
    vy:    -(Math.random() * 7 + 2),        // px/s upward
    vx:    (Math.random() - 0.5) * 3.5,
    alpha: Math.random() * 0.32 + 0.06,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.7 + 0.25,
  }));
}

export function updateDust(dust, delta, W, H) {
  const horizon = H * 0.55;
  dust.forEach((d) => {
    d.y += d.vy * delta;
    d.x += d.vx * delta;
    // Wrap at top and sides — respawn at horizon level
    if (d.y < 0 || d.x < -10 || d.x > W + 10) {
      d.x = Math.random() * W;
      d.y = horizon * 0.98;
    }
  });
}

export function drawDust(ctx, dust, t) {
  dust.forEach((d) => {
    const tw = 0.5 + 0.5 * Math.sin(d.phase + t * d.speed);
    const a  = d.alpha * tw;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(130, 185, 255, ${a.toFixed(3)})`;
    ctx.fill();
  });
}

// ── stars ──────────────────────────────────────────────────────────────────

export function initStars(count, W, H) {
  // Base stars
  const base = Array.from({ length: count }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * H * 0.55,
    r:    Math.random() * 1.4 + 0.3,
    base: Math.random(),       // base brightness [0,1]
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 1.5 + 0.5,
    bright: false,
    colorTint: null,
  }));

  // 20 bright near-stars with tints and sparkles
  const nearStars = Array.from({ length: 20 }, () => {
    const tints = [null, null, null, 'warm', 'cool']; // mostly white, some tinted
    return {
      x:    Math.random() * W,
      y:    Math.random() * H * 0.55,
      r:    Math.random() * 1.0 + 1.5,
      base: Math.random() * 0.4 + 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 3.0 + 1.5, // faster twinkle
      bright: true,
      colorTint: tints[Math.floor(Math.random() * tints.length)],
    };
  });

  return [...base, ...nearStars];
}

export function drawStars(ctx, stars, t) {
  stars.forEach((s) => {
    const twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
    const alpha   = 0.3 + 0.7 * twinkle * s.base;

    if (s.bright) {
      // Color tint
      let r = 200, g = 230, b = 255;
      if (s.colorTint === 'warm') { r = 255; g = 210; b = 160; }
      else if (s.colorTint === 'cool') { r = 160; g = 200; b = 255; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
      ctx.fill();

      // Cross/sparkle arms
      const armLen = 4 + s.r * 1.5;
      const sparkAlpha = (alpha * 0.4).toFixed(3);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${sparkAlpha})`;
      ctx.lineWidth = 0.8;
      for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(angle) * s.r, s.y + Math.sin(angle) * s.r);
        ctx.lineTo(s.x + Math.cos(angle) * (s.r + armLen), s.y + Math.sin(angle) * (s.r + armLen));
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 230, 255, ${alpha.toFixed(2)})`;
      ctx.fill();
    }
  });
}

// ── floor concrete dot positions (seeded deterministically) ───────────────

let _floorDots = null;
function getFloorDots(W, H) {
  if (_floorDots && _floorDots.W === W && _floorDots.H === H) return _floorDots.dots;
  const horizon = H * 0.55;
  // Simple seeded pseudo-random using sin
  const dots = [];
  for (let i = 0; i < 200; i++) {
    const sx = Math.abs(Math.sin(i * 127.1 + 311.7)) * W;
    const sy = horizon + Math.abs(Math.sin(i * 311.7 + 127.1)) * (H - horizon);
    dots.push({ x: sx, y: sy });
  }
  _floorDots = { W, H, dots };
  return dots;
}

// ── floor (perspective grid) ───────────────────────────────────────────────

export function drawFloor(ctx, W, H, cx, t) {
  const rocketCX = cx !== undefined ? cx : W / 2;
  const horizon = H * 0.55;
  const lines   = 14;
  const cols    = 20;
  const vp      = { x: W / 2, y: horizon };

  ctx.strokeStyle = 'rgba(40, 100, 180, 0.22)';
  ctx.lineWidth   = 1;

  // horizontal lines
  for (let i = 0; i <= lines; i++) {
    const ti = i / lines;
    const y  = horizon + (H - horizon) * Math.pow(ti, 1.8);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // vertical lines converging at vp
  for (let i = 0; i <= cols; i++) {
    const x = (i / cols) * W;
    ctx.beginPath();
    ctx.moveTo(vp.x + (x - vp.x) * 0.01, horizon);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  // floor base gradient
  const grad = ctx.createLinearGradient(0, horizon, 0, H);
  grad.addColorStop(0, 'rgba(5, 15, 35, 0.0)');
  grad.addColorStop(1, 'rgba(5, 15, 40, 0.75)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, horizon, W, H - horizon);

  // horizon darkening band — depth cue at the vanishing point
  const horizonDark = ctx.createLinearGradient(0, horizon, 0, horizon + (H - horizon) * 0.28);
  horizonDark.addColorStop(0, 'rgba(2, 5, 18, 0.52)');
  horizonDark.addColorStop(1, 'rgba(0, 0, 0, 0.00)');
  ctx.fillStyle = horizonDark;
  ctx.fillRect(0, horizon, W, (H - horizon) * 0.28);
  // edge fade — grid fades toward left/right edges
  const edgeFade = ctx.createRadialGradient(W / 2, horizon + (H - horizon) * 0.5, (H - horizon) * 0.1, W / 2, horizon + (H - horizon) * 0.5, Math.max(W / 2, H - horizon) * 1.05);
  edgeFade.addColorStop(0,    'rgba(0, 0, 0, 0.00)');
  edgeFade.addColorStop(0.55, 'rgba(0, 0, 0, 0.00)');
  edgeFade.addColorStop(1,    'rgba(2, 5, 20, 0.58)');
  ctx.fillStyle = edgeFade;
  ctx.fillRect(0, horizon, W, H - horizon);

  // ── concrete texture dots ──────────────────────────────────────────────
  const dots = getFloorDots(W, H);
  dots.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(80, 100, 140, 0.08)';
    ctx.fill();
  });

  // ── hazard caution ring around rocket base ─────────────────────────────
  const hazardY = H * 0.55;
  const hazardR = 60;
  const stripes = 12;
  for (let i = 0; i < stripes; i++) {
    const startAngle = (i / stripes) * Math.PI * 2;
    const endAngle   = ((i + 0.5) / stripes) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(rocketCX, hazardY, hazardR, startAngle, endAngle);
    ctx.arc(rocketCX, hazardY, hazardR - 8, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 200, 0, 0.18)' : 'rgba(0, 0, 0, 0.18)';
    ctx.fill();
  }

  // ── painted dashed guidelines from rocket center to terminal area ──────
  ctx.save();
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  const angles = [-0.9, -0.45, 0, 0.45, 0.9];
  angles.forEach((angle) => {
    ctx.beginPath();
    ctx.moveTo(rocketCX, hazardY);
    ctx.lineTo(rocketCX + Math.cos(angle + Math.PI / 2) * 220, hazardY + Math.sin(angle + Math.PI / 2) * 80);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.restore();

  // ── "LAUNCH PAD" stencil text at floor level ──────────────────────────
  ctx.save();
  ctx.font = 'bold 32px Courier New, monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.translate(rocketCX, H * 0.72);
  ctx.scale(1, 0.3); // flatten for perspective feel
  ctx.fillText('LAUNCH PAD', 0, 0);
  ctx.restore();

  // ── metallic drain grate below rocket ─────────────────────────────────
  const grateX = rocketCX - 20;
  const grateY = H * 0.55 - 2;
  ctx.strokeStyle = 'rgba(60, 80, 120, 0.25)';
  ctx.lineWidth = 0.8;
  for (let gx = grateX; gx <= grateX + 40; gx += 4) {
    ctx.beginPath();
    ctx.moveTo(gx, grateY);
    ctx.lineTo(gx, grateY + 10);
    ctx.stroke();
  }
  for (let gy = grateY; gy <= grateY + 10; gy += 4) {
    ctx.beginPath();
    ctx.moveTo(grateX, gy);
    ctx.lineTo(grateX + 40, gy);
    ctx.stroke();
  }
}

// ── ceiling lights ─────────────────────────────────────────────────────────

export function drawCeilingLights(ctx, W, powered = false) {
  const positions = powered ? [0.1, 0.25, 0.5, 0.75, 0.9] : [0.2, 0.5, 0.8];
  const bloomAlpha = powered ? 0.28 : 0.18;
  const bloomR     = powered ? 150  : 120;

  positions.forEach((px) => {
    const x = W * px;
    const bloom = ctx.createRadialGradient(x, 0, 0, x, 0, bloomR);
    bloom.addColorStop(0, `rgba(80, 160, 255, ${bloomAlpha})`);
    bloom.addColorStop(1, 'rgba(80, 160, 255, 0.00)');
    ctx.fillStyle = bloom;
    ctx.fillRect(x - bloomR, 0, bloomR * 2, bloomR);

    ctx.fillStyle = powered ? 'rgba(200, 235, 255, 0.90)' : 'rgba(160, 210, 255, 0.65)';
    ctx.fillRect(x - 30, 0, 60, 3);
  });
}

// ── alarm flash (screen-space, drawn outside camera transform) ─────────────

export function drawAlarmFlash(ctx, W, H, alpha) {
  if (alpha <= 0.005) return;
  // ceiling pulse
  const top = ctx.createLinearGradient(0, 0, 0, 180);
  top.addColorStop(0, `rgba(255, 15, 0, ${alpha})`);
  top.addColorStop(1, 'rgba(255, 15, 0, 0)');
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, W, 180);
  // left vignette
  const left = ctx.createLinearGradient(0, 0, 110, 0);
  left.addColorStop(0, `rgba(220, 0, 0, ${alpha * 0.45})`);
  left.addColorStop(1, 'rgba(220, 0, 0, 0)');
  ctx.fillStyle = left;
  ctx.fillRect(0, 0, 110, H);
  // right vignette
  const right = ctx.createLinearGradient(W - 110, 0, W, 0);
  right.addColorStop(0, 'rgba(220, 0, 0, 0)');
  right.addColorStop(1, `rgba(220, 0, 0, ${alpha * 0.45})`);
  ctx.fillStyle = right;
  ctx.fillRect(W - 110, 0, 110, H);
}

// ── gantry ────────────────────────────────────────────────────────────────

export function drawGantry(ctx, cx, rocketBaseY, rocketTopY, W, H, t) {
  const floorY    = H * 0.55;
  const towerTop  = rocketTopY - 40;
  const leftX     = cx - 80;
  const rightX    = cx + 80;
  const towerW    = 12;

  // ── left tower ──────────────────────────────────────────────────────────
  const leftGrad = ctx.createLinearGradient(leftX - towerW / 2, 0, leftX + towerW / 2, 0);
  leftGrad.addColorStop(0, '#1a1f2e');
  leftGrad.addColorStop(0.5, '#2a3040');
  leftGrad.addColorStop(1, '#1a1f2e');
  ctx.fillStyle = leftGrad;
  ctx.fillRect(leftX - towerW / 2, towerTop, towerW, floorY - towerTop);

  // ── right tower ─────────────────────────────────────────────────────────
  const rightGrad = ctx.createLinearGradient(rightX - towerW / 2, 0, rightX + towerW / 2, 0);
  rightGrad.addColorStop(0, '#1a1f2e');
  rightGrad.addColorStop(0.5, '#2a3040');
  rightGrad.addColorStop(1, '#1a1f2e');
  ctx.fillStyle = rightGrad;
  ctx.fillRect(rightX - towerW / 2, towerTop, towerW, floorY - towerTop);

  // ── cross braces ─────────────────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(80, 100, 140, 0.7)';
  ctx.lineWidth = 2;
  const towerHeight = floorY - towerTop;
  for (let level = 0; level < 4; level++) {
    const y1 = towerTop + (level / 4) * towerHeight;
    const y2 = towerTop + ((level + 1) / 4) * towerHeight;
    // X-brace
    ctx.beginPath();
    ctx.moveTo(leftX + towerW / 2, y1);
    ctx.lineTo(rightX - towerW / 2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightX - towerW / 2, y1);
    ctx.lineTo(leftX + towerW / 2, y2);
    ctx.stroke();
  }

  // ── horizontal platforms ──────────────────────────────────────────────────
  const platformHeights = [0.25, 0.55, 0.78].map((f) => towerTop + f * towerHeight);
  platformHeights.forEach((py) => {
    // Platform left (from left tower inward)
    ctx.fillStyle = '#2a3040';
    ctx.fillRect(leftX + towerW / 2, py - 3, 30, 6);
    // End cap
    ctx.fillStyle = '#3a4555';
    ctx.fillRect(leftX + towerW / 2 + 28, py - 4, 4, 8);

    // Platform right (from right tower inward)
    ctx.fillStyle = '#2a3040';
    ctx.fillRect(rightX - towerW / 2 - 30, py - 3, 30, 6);
    ctx.fillStyle = '#3a4555';
    ctx.fillRect(rightX - towerW / 2 - 32, py - 4, 4, 8);
  });

  // ── swing arms ────────────────────────────────────────────────────────────
  const arm1Y = towerTop + towerHeight * 0.35;
  const arm2Y = towerTop + towerHeight * 0.65;
  ctx.strokeStyle = 'rgba(60, 80, 130, 0.85)';
  ctx.lineWidth = 3;
  // Left arm
  ctx.beginPath();
  ctx.moveTo(leftX + towerW / 2, arm1Y);
  ctx.lineTo(cx - 22, arm1Y);
  ctx.stroke();
  // Right arm
  ctx.beginPath();
  ctx.moveTo(rightX - towerW / 2, arm2Y);
  ctx.lineTo(cx + 22, arm2Y);
  ctx.stroke();
  // Connector pads
  ctx.fillStyle = 'rgba(80, 110, 170, 0.9)';
  ctx.fillRect(cx - 28, arm1Y - 4, 8, 8);
  ctx.fillRect(cx + 20, arm2Y - 4, 8, 8);

  // ── ladder on left tower face ────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(50, 70, 110, 0.6)';
  ctx.lineWidth = 1;
  // Vertical rail
  ctx.beginPath();
  ctx.moveTo(leftX - towerW / 2 + 2, towerTop + 10);
  ctx.lineTo(leftX - towerW / 2 + 2, floorY - 5);
  ctx.stroke();
  // Rungs
  for (let ry = towerTop + 10; ry < floorY - 5; ry += 8) {
    ctx.beginPath();
    ctx.moveTo(leftX - towerW / 2 + 2, ry);
    ctx.lineTo(leftX - towerW / 2 - 5, ry);
    ctx.stroke();
  }

  // ── warning stripes on tower bases ──────────────────────────────────────
  const stripeH = 20;
  const stripeY = floorY - stripeH;
  [leftX, rightX].forEach((tx) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(tx - towerW / 2, stripeY, towerW, stripeH);
    ctx.clip();
    for (let si = 0; si < 6; si++) {
      ctx.fillStyle = si % 2 === 0 ? 'rgba(255, 200, 0, 0.60)' : 'rgba(0, 0, 0, 0.50)';
      ctx.beginPath();
      ctx.moveTo(tx - towerW / 2 + si * 4,     stripeY);
      ctx.lineTo(tx - towerW / 2 + si * 4 + 4, stripeY);
      ctx.lineTo(tx - towerW / 2 + si * 4,     stripeY + stripeH);
      ctx.lineTo(tx - towerW / 2 + si * 4 - 4, stripeY + stripeH);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  });

  // ── gantry lights along towers ────────────────────────────────────────────
  const lightPositions = [0.1, 0.3, 0.55, 0.75, 0.9];
  lightPositions.forEach((frac, idx) => {
    const ly = towerTop + frac * towerHeight;
    const on = Math.sin(t * 2.5 + idx * 1.1) > 0.3;
    const lightAlpha = on ? 0.8 : 0.25;
    const haloAlpha  = on ? 0.3 : 0.05;

    [leftX, rightX].forEach((tx) => {
      // Halo
      const halo = ctx.createRadialGradient(tx, ly, 0, tx, ly, 14);
      halo.addColorStop(0, `rgba(255, 200, 80, ${haloAlpha})`);
      halo.addColorStop(1, 'rgba(255, 200, 80, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(tx, ly, 14, 0, Math.PI * 2);
      ctx.fill();

      // Light dot
      ctx.beginPath();
      ctx.arc(tx, ly, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 80, ${lightAlpha})`;
      ctx.fill();
    });
  });

  // ── cables from tower tops ────────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(100, 120, 160, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftX, towerTop);
  ctx.lineTo(leftX - 60, towerTop - 80);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rightX, towerTop);
  ctx.lineTo(rightX + 60, towerTop - 80);
  ctx.stroke();
}

// ── atmosphere effects ─────────────────────────────────────────────────────

export function drawAtmosphere(ctx, W, H, t) {
  const cx      = W / 2;
  const horizon = H * 0.55;

  // ── spotlight bloom from above ─────────────────────────────────────────
  const bloom = ctx.createRadialGradient(cx, -20, 0, cx, -20, 200);
  bloom.addColorStop(0, 'rgba(100, 160, 255, 0.12)');
  bloom.addColorStop(1, 'rgba(100, 160, 255, 0)');
  ctx.fillStyle = bloom;
  ctx.beginPath();
  ctx.arc(cx, -20, 200, 0, Math.PI * 2);
  ctx.fill();

  // ── volumetric god rays ────────────────────────────────────────────────
  const rayCount = 7;
  for (let ri = 0; ri < rayCount; ri++) {
    const angle    = ((ri - rayCount / 2) / rayCount) * 0.6;
    const rayAlpha = (0.05 + 0.02 * Math.sin(t * 0.3 + ri * 0.7)).toFixed(3);
    const spreadX  = Math.tan(angle) * horizon;

    const rayGrad = ctx.createLinearGradient(cx, -20, cx + spreadX, horizon);
    rayGrad.addColorStop(0, `rgba(100, 160, 255, ${rayAlpha})`);
    rayGrad.addColorStop(1, 'rgba(100, 160, 255, 0)');
    ctx.fillStyle = rayGrad;

    const halfW = 8 + ri * 3;
    ctx.beginPath();
    ctx.moveTo(cx - halfW * 0.1, -20);
    ctx.lineTo(cx + halfW * 0.1, -20);
    ctx.lineTo(cx + spreadX + halfW, horizon);
    ctx.lineTo(cx + spreadX - halfW, horizon);
    ctx.closePath();
    ctx.fill();
  }

  // ── heat haze strips around rocket base ───────────────────────────────
  for (let hi = 0; hi < 4; hi++) {
    const hx = cx + Math.sin(t * 1.2 + hi) * 3 + (hi - 2) * 12;
    const hazeGrad = ctx.createLinearGradient(hx, horizon - 60, hx, horizon + 20);
    hazeGrad.addColorStop(0, 'rgba(255, 200, 100, 0)');
    hazeGrad.addColorStop(0.5, `rgba(255, 200, 100, ${(0.02 + hi * 0.005).toFixed(3)})`);
    hazeGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
    ctx.fillStyle = hazeGrad;
    ctx.fillRect(hx - 3, horizon - 60, 6, 80);
  }

  // ── ambient dust motes in spotlight cone ──────────────────────────────
  for (let mi = 0; mi < 30; mi++) {
    const mx = cx - 80 + ((Math.sin(mi * 127.1 + t * 0.3 + mi) * 0.5 + 0.5)) * 160;
    const myBase = ((Math.sin(mi * 311.7) * 0.5 + 0.5)) * horizon;
    const my  = ((myBase - t * 15 * (0.5 + (mi % 5) * 0.1)) % horizon + horizon) % horizon;
    const mAlpha = (0.04 + 0.03 * Math.sin(t * 1.5 + mi * 0.7)).toFixed(3);
    ctx.beginPath();
    ctx.arc(mx, my, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 220, 255, ${mAlpha})`;
    ctx.fill();
  }
}

// ── rocket ─────────────────────────────────────────────────────────────────

export function drawRocket(ctx, cx, groundY, t, powered = false, ignitionLevel = 1) {
  const bob   = Math.sin(t * 0.8) * 2.5;
  const baseY = groundY + bob;

  const bodyW = 52;
  const bodyH = 160;

  // ── exhaust flame — multi-gradient plume ─────────────────────────────────
  const nominalBase = powered ? 80 : 58;
  const nominalVar  = powered ? 20 : 13;
  const flameBase   = nominalBase * (0.25 + 0.75 * ignitionLevel);
  const flameH      = flameBase + Math.sin(t * 9) * nominalVar * ignitionLevel;
  const flameAlpha  = 0.35 + 0.60 * ignitionLevel;

  // Layer 1: inner hot white/yellow core
  const flameCoreG = ctx.createRadialGradient(cx, baseY + 6, 1, cx, baseY + 8, Math.max(1, flameH * 0.5));
  flameCoreG.addColorStop(0,   `rgba(255, 255, 240, ${flameAlpha})`);
  flameCoreG.addColorStop(0.3, `rgba(255, 240, 180, ${flameAlpha * 0.90})`);
  flameCoreG.addColorStop(0.6, `rgba(255, 200,  80, ${flameAlpha * 0.70})`);
  flameCoreG.addColorStop(1,   `rgba(255, 120,  20, 0.00)`);
  ctx.fillStyle = flameCoreG;
  ctx.beginPath();
  ctx.ellipse(cx, baseY + 18, Math.max(1, 8 * ignitionLevel), Math.max(1, flameH * 0.55), 0, 0, Math.PI * 2);
  ctx.fill();

  // Layer 2: mid orange bloom
  const flameMidG = ctx.createRadialGradient(cx, baseY + 15, 2, cx, baseY + 25, Math.max(1, flameH * 0.75));
  flameMidG.addColorStop(0,   `rgba(255, 180,  60, ${flameAlpha * 0.65})`);
  flameMidG.addColorStop(0.4, `rgba(255, 100,  20, ${flameAlpha * 0.45})`);
  flameMidG.addColorStop(0.75,`rgba(200,  50,   0, ${flameAlpha * 0.20})`);
  flameMidG.addColorStop(1,   'rgba(150, 20, 0, 0)');
  ctx.fillStyle = flameMidG;
  ctx.beginPath();
  ctx.ellipse(cx, baseY + 28, Math.max(1, 14 * ignitionLevel), Math.max(1, flameH * 0.80), 0, 0, Math.PI * 2);
  ctx.fill();

  // Layer 3: outer purple/magenta bloom
  const flameOuterG = ctx.createRadialGradient(cx, baseY + 22, 2, cx, baseY + 32, Math.max(1, flameH));
  flameOuterG.addColorStop(0,   `rgba(200,  80,  10, ${flameAlpha * 0.50})`);
  flameOuterG.addColorStop(0.5, `rgba(160,  40, 180, ${flameAlpha * 0.25})`);
  flameOuterG.addColorStop(0.8, `rgba(100,  20, 140, ${flameAlpha * 0.12})`);
  flameOuterG.addColorStop(1,   'rgba(80,  10, 120, 0.00)');
  ctx.fillStyle = flameOuterG;
  ctx.beginPath();
  ctx.ellipse(cx, baseY + 32, Math.max(1, 20 * ignitionLevel), Math.max(1, flameH), 0, 0, Math.PI * 2);
  ctx.fill();

  // Layer 4: side shockwave rings
  if (ignitionLevel > 0.5) {
    for (let ri = 0; ri < 3; ri++) {
      const rPhase = (t * 6 + ri * 1.2) % 3;
      const rScale = rPhase / 3;
      const rAlpha = ((1 - rScale) * 0.18 * ignitionLevel).toFixed(3);
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 10 + rPhase * 12, Math.max(1, (12 + rScale * 18) * ignitionLevel), Math.max(1, (4 + rScale * 8) * ignitionLevel), 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 200, 80, ${rAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // ── engine idle glow (always present, even at low ignitionLevel) ──────────
  const idleGlow = ctx.createRadialGradient(cx, baseY + 10, 0, cx, baseY + 10, 30);
  idleGlow.addColorStop(0, 'rgba(120, 180, 255, 0.30)');
  idleGlow.addColorStop(0.5, 'rgba(80, 140, 255, 0.12)');
  idleGlow.addColorStop(1, 'rgba(60, 100, 255, 0)');
  ctx.fillStyle = idleGlow;
  ctx.beginPath();
  ctx.arc(cx, baseY + 10, 30, 0, Math.PI * 2);
  ctx.fill();

  // ── engine idle heat distortion ───────────────────────────────────────────
  const heatGlow = ctx.createRadialGradient(cx, baseY + 16, 0, cx, baseY + 16, 30);
  heatGlow.addColorStop(0, 'rgba(255, 150, 50, 0.08)');
  heatGlow.addColorStop(1, 'rgba(255, 150, 50, 0)');
  ctx.fillStyle = heatGlow;
  ctx.beginPath();
  ctx.arc(cx, baseY + 16, 30, 0, Math.PI * 2);
  ctx.fill();

  // ── small floating sparks near engine bell ────────────────────────────────
  for (let si = 0; si < 8; si++) {
    const sparkX = cx + Math.sin(t * (3.1 + si * 0.7) + si * 1.8) * (6 + si * 2);
    const sparkY = baseY + 10 - ((t * (15 + si * 5) + si * 7) % 30);
    const sparkA = (0.3 + 0.4 * Math.sin(t * 4 + si)).toFixed(3);
    ctx.beginPath();
    ctx.arc(sparkX, sparkY, 0.8 + (si % 3) * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 80, ${sparkA})`;
    ctx.fill();
  }

  // ── engine bell ──────────────────────────────────────────────────────────
  ctx.fillStyle = '#3a3a42';
  ctx.beginPath();
  ctx.moveTo(cx - 14, baseY);
  ctx.lineTo(cx + 14, baseY);
  ctx.lineTo(cx + 18, baseY + 14);
  ctx.lineTo(cx - 18, baseY + 14);
  ctx.closePath();
  ctx.fill();

  // Engine bell inner nozzle rings
  for (let ni = 0; ni < 4; ni++) {
    const nf = (ni + 1) / 5;
    const nx = 4 + nf * 14;
    const ny = baseY + nf * 12;
    ctx.strokeStyle = `rgba(80, 80, 100, ${0.6 - ni * 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - nx, ny);
    ctx.lineTo(cx + nx, ny);
    ctx.stroke();
  }

  // Bell throat bright glow
  const throatGlow = ctx.createRadialGradient(cx, baseY + 2, 0, cx, baseY + 2, 8);
  throatGlow.addColorStop(0, 'rgba(200, 230, 255, 0.50)');
  throatGlow.addColorStop(1, 'rgba(100, 160, 255, 0)');
  ctx.fillStyle = throatGlow;
  ctx.beginPath();
  ctx.arc(cx, baseY + 2, 8, 0, Math.PI * 2);
  ctx.fill();

  // bell rim highlight
  ctx.strokeStyle = 'rgba(180,180,200,0.60)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 18, baseY + 14);
  ctx.lineTo(cx + 18, baseY + 14);
  ctx.stroke();

  // ── fins ─────────────────────────────────────────────────────────────────
  [[-1, cx - bodyW / 2], [1, cx + bodyW / 2]].forEach(([dir, fx]) => {
    // main fin shape
    const finGrad = ctx.createLinearGradient(fx, baseY - 50, fx - dir * 32, baseY);
    finGrad.addColorStop(0, 'rgba(200, 210, 230, 0.88)');
    finGrad.addColorStop(1, 'rgba(140, 150, 170, 0.72)');
    ctx.fillStyle = finGrad;
    ctx.beginPath();
    ctx.moveTo(fx, baseY - 48);
    ctx.lineTo(fx - dir * 30, baseY + 12);
    ctx.lineTo(fx - dir * 8,  baseY + 12);
    ctx.lineTo(fx,             baseY - 30);
    ctx.closePath();
    ctx.fill();
    // red accent stripe on fin
    ctx.fillStyle = 'rgba(210, 45, 35, 0.72)';
    ctx.beginPath();
    ctx.moveTo(fx,           baseY - 30);
    ctx.lineTo(fx - dir * 8, baseY + 12);
    ctx.lineTo(fx - dir * 14, baseY + 12);
    ctx.lineTo(fx,            baseY - 22);
    ctx.closePath();
    ctx.fill();
  });

  // ── main body — 3D metallic gradient ────────────────────────────────────
  const bodyGrad = ctx.createLinearGradient(cx - bodyW / 2, 0, cx + bodyW / 2, 0);
  bodyGrad.addColorStop(0,    'rgba(90,  95, 110, 0.95)');   // dark left edge
  bodyGrad.addColorStop(0.18, 'rgba(200, 210, 225, 0.97)');  // bright silver highlight at ~30%
  bodyGrad.addColorStop(0.32, 'rgba(235, 240, 252, 0.98)');  // bright silver peak
  bodyGrad.addColorStop(0.55, 'rgba(215, 220, 235, 0.97)');  // light silver
  bodyGrad.addColorStop(0.78, 'rgba(175, 180, 196, 0.96)');  // dimmer right
  bodyGrad.addColorStop(1,    'rgba(110, 115, 130, 0.94)');  // dark right edge
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, cx - bodyW / 2, baseY - bodyH, bodyW, bodyH, 8);
  ctx.fill();

  // Secondary radial gradient for "roundness"
  ctx.save();
  roundRect(ctx, cx - bodyW / 2, baseY - bodyH, bodyW, bodyH, 8);
  ctx.clip();
  const roundGrad = ctx.createRadialGradient(cx - 8, baseY - bodyH * 0.5, 4, cx - 8, baseY - bodyH * 0.5, bodyW * 0.9);
  roundGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
  roundGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
  roundGrad.addColorStop(1, 'rgba(0, 0, 0, 0.10)');
  ctx.fillStyle = roundGrad;
  ctx.fillRect(cx - bodyW / 2, baseY - bodyH, bodyW, bodyH);
  ctx.restore();

  // ── panel lines (horizontal) ─────────────────────────────────────────────
  const panelYs = [0.12, 0.22, 0.34, 0.46, 0.57, 0.68, 0.79, 0.90].map(
    (f) => baseY - bodyH + bodyH * f
  );
  ctx.strokeStyle = 'rgba(60, 65, 80, 0.20)';
  ctx.lineWidth = 1;
  panelYs.forEach((py) => {
    ctx.beginPath();
    ctx.moveTo(cx - bodyW / 2 + 2, py);
    ctx.lineTo(cx + bodyW / 2 - 2, py);
    ctx.stroke();
  });

  // Vertical panel lines (2 lines suggesting cylindrical panels)
  ctx.strokeStyle = 'rgba(60, 65, 80, 0.15)';
  [cx - 10, cx + 10].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, baseY - bodyH + 5);
    ctx.lineTo(vx, baseY - 5);
    ctx.stroke();
  });

  // ── rivets ───────────────────────────────────────────────────────────────
  const rivetPositions = [
    { x: cx - bodyW / 2 + 6, y: baseY - bodyH + bodyH * 0.22 },
    { x: cx + bodyW / 2 - 6, y: baseY - bodyH + bodyH * 0.22 },
    { x: cx - bodyW / 2 + 6, y: baseY - bodyH + bodyH * 0.46 },
    { x: cx + bodyW / 2 - 6, y: baseY - bodyH + bodyH * 0.46 },
    { x: cx - bodyW / 2 + 6, y: baseY - bodyH + bodyH * 0.68 },
    { x: cx + bodyW / 2 - 6, y: baseY - bodyH + bodyH * 0.68 },
    { x: cx - bodyW / 2 + 6, y: baseY - bodyH + bodyH * 0.88 },
    { x: cx + bodyW / 2 - 6, y: baseY - bodyH + bodyH * 0.88 },
    { x: cx - 18,             y: baseY - bodyH + bodyH * 0.34 },
    { x: cx + 18,             y: baseY - bodyH + bodyH * 0.34 },
    { x: cx - 18,             y: baseY - bodyH + bodyH * 0.57 },
    { x: cx + 18,             y: baseY - bodyH + bodyH * 0.57 },
  ];
  rivetPositions.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#cccccc';
    ctx.fill();
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  });

  // body shadow/depth line on left edge
  ctx.strokeStyle = 'rgba(90, 95, 110, 0.50)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - bodyW / 2 + 4, baseY - bodyH + 10);
  ctx.lineTo(cx - bodyW / 2 + 4, baseY - 10);
  ctx.stroke();

  // ── rim light on left edge (bounce light simulation) ─────────────────────
  ctx.strokeStyle = 'rgba(100, 180, 255, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - bodyW / 2 + 1, baseY - bodyH + 12);
  ctx.lineTo(cx - bodyW / 2 + 1, baseY - 12);
  ctx.stroke();

  // ── red accent bands ─────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(210, 38, 28, 0.88)';
  ctx.fillRect(cx - bodyW / 2, baseY - bodyH + 2, bodyW, 14);
  ctx.fillStyle = 'rgba(210, 38, 28, 0.78)';
  ctx.fillRect(cx - bodyW / 2, baseY - 80, bodyW, 10);
  ctx.fillStyle = 'rgba(190, 30, 22, 0.60)';
  ctx.fillRect(cx - bodyW / 2, baseY - 44, bodyW, 5);

  // ── "TCB" lettering on body ───────────────────────────────────────────────
  ctx.save();
  ctx.fillStyle = 'rgba(40, 40, 55, 0.70)';
  ctx.font = 'bold 9px Courier New, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TCB-1', cx, baseY - 95);
  ctx.restore();

  // ── nose cone ─────────────────────────────────────────────────────────────
  const noseGrad = ctx.createLinearGradient(cx - bodyW / 2, baseY - bodyH, cx + bodyW / 2, baseY - bodyH);
  noseGrad.addColorStop(0,    'rgba(80,  85, 100, 0.92)');   // darker left edge
  noseGrad.addColorStop(0.30, 'rgba(200, 210, 228, 0.95)');
  noseGrad.addColorStop(0.55, 'rgba(225, 232, 248, 0.97)');
  noseGrad.addColorStop(0.80, 'rgba(185, 192, 210, 0.93)');
  noseGrad.addColorStop(1,    'rgba(100, 105, 120, 0.90)');
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.moveTo(cx - bodyW / 2, baseY - bodyH);
  ctx.lineTo(cx + bodyW / 2, baseY - bodyH);
  ctx.quadraticCurveTo(cx + bodyW / 2 - 4, baseY - bodyH - 40, cx, baseY - bodyH - 72);
  ctx.quadraticCurveTo(cx - bodyW / 2 + 4, baseY - bodyH - 40, cx - bodyW / 2, baseY - bodyH);
  ctx.fill();

  // ── heat shield thermal tile pattern on nose tip ──────────────────────────
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - bodyW / 2, baseY - bodyH);
  ctx.lineTo(cx + bodyW / 2, baseY - bodyH);
  ctx.quadraticCurveTo(cx + bodyW / 2 - 4, baseY - bodyH - 40, cx, baseY - bodyH - 72);
  ctx.quadraticCurveTo(cx - bodyW / 2 + 4, baseY - bodyH - 40, cx - bodyW / 2, baseY - bodyH);
  ctx.clip();
  // Darker gradient on tip
  const heatGrad = ctx.createLinearGradient(cx, baseY - bodyH - 72, cx, baseY - bodyH - 30);
  heatGrad.addColorStop(0, 'rgba(60, 20, 5, 0.35)');
  heatGrad.addColorStop(1, 'rgba(60, 20, 5, 0)');
  ctx.fillStyle = heatGrad;
  ctx.fillRect(cx - bodyW / 2, baseY - bodyH - 72, bodyW, 42);
  // Thermal tile grid (3px squares)
  ctx.strokeStyle = 'rgba(60, 30, 0, 0.3)';
  ctx.lineWidth = 0.5;
  for (let tx = cx - bodyW / 2; tx < cx + bodyW / 2; tx += 3) {
    ctx.beginPath();
    ctx.moveTo(tx, baseY - bodyH - 72);
    ctx.lineTo(tx, baseY - bodyH - 30);
    ctx.stroke();
  }
  for (let ty = baseY - bodyH - 72; ty < baseY - bodyH - 30; ty += 3) {
    ctx.beginPath();
    ctx.moveTo(cx - bodyW / 2, ty);
    ctx.lineTo(cx + bodyW / 2, ty);
    ctx.stroke();
  }
  ctx.restore();

  // nose highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx + 8, baseY - bodyH - 2);
  ctx.quadraticCurveTo(cx + 10, baseY - bodyH - 30, cx + 3, baseY - bodyH - 62);
  ctx.stroke();

  // ── porthole ──────────────────────────────────────────────────────────────
  const portholeY = baseY - bodyH + 48;
  ctx.beginPath();
  ctx.arc(cx, portholeY, 13, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(80, 85, 100, 0.90)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, portholeY, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40, 180, 255, 0.28)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(100, 210, 255, 0.75)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx - 3, portholeY - 3, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.30)';
  ctx.fill();

  // ── glow ─────────────────────────────────────────────────────────────────
  const glowR     = powered ? 180 : 120;
  const glowAlpha = powered ? 0.14 : 0.06;
  const glow = ctx.createRadialGradient(cx, baseY - bodyH / 2, 10, cx, baseY - bodyH / 2, glowR);
  glow.addColorStop(0, `rgba(200, 220, 255, ${glowAlpha})`);
  glow.addColorStop(1, 'rgba(200, 220, 255, 0.00)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(cx, baseY - bodyH / 2, glowR, glowR * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  if (powered) {
    const corona = ctx.createRadialGradient(cx, baseY - bodyH / 2, glowR * 0.5, cx, baseY - bodyH / 2, glowR * 2.2);
    corona.addColorStop(0, 'rgba(255, 160, 60, 0.08)');
    corona.addColorStop(1, 'rgba(255, 160, 60, 0.00)');
    ctx.fillStyle = corona;
    ctx.beginPath();
    ctx.ellipse(cx, baseY - bodyH / 2, glowR * 2.2, glowR * 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── floor reflection (ellipse glow beneath rocket) ────────────────────────
  const reflectY = groundY + 6;
  const reflGrad = ctx.createRadialGradient(cx, reflectY, 0, cx, reflectY, 50);
  const reflAlpha = (0.06 + 0.04 * ignitionLevel).toFixed(3);
  reflGrad.addColorStop(0, `rgba(255, 180, 80, ${reflAlpha})`);
  reflGrad.addColorStop(0.5, `rgba(200, 120, 40, ${(parseFloat(reflAlpha) * 0.5).toFixed(3)})`);
  reflGrad.addColorStop(1, 'rgba(100, 50, 0, 0)');
  ctx.fillStyle = reflGrad;
  ctx.beginPath();
  ctx.ellipse(cx, reflectY, 50, 12, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ── power indicators (green dots on terminals when power restored) ──────────

export function drawPowerIndicators(ctx, terminals, t) {
  const pulse = 0.70 + 0.30 * Math.sin(t * 2.8);
  terminals.forEach(({ x, y }) => {
    const dotY = y - 84;

    // glow
    const g = ctx.createRadialGradient(x, dotY, 0, x, dotY, 16);
    g.addColorStop(0, `rgba(0, 255, 130, ${(0.30 * pulse).toFixed(3)})`);
    g.addColorStop(1, 'rgba(0, 255, 130, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, dotY, 16, 0, Math.PI * 2);
    ctx.fill();

    // dot
    ctx.beginPath();
    ctx.arc(x, dotY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 130, ${(0.90 * pulse).toFixed(2)})`;
    ctx.fill();
  });
}

// ── powered ambient (green grid + ceiling wash when power restored) ─────────

export function drawPoweredAmbient(ctx, W, H, t) {
  const pulse   = 0.80 + 0.20 * Math.sin(t * 1.5);
  const horizon = H * 0.55;

  // soft green wash from ceiling
  const wash = ctx.createLinearGradient(0, 0, 0, horizon * 0.7);
  wash.addColorStop(0, `rgba(0, 200, 100, ${(0.06 * pulse).toFixed(3)})`);
  wash.addColorStop(1, 'rgba(0, 200, 100, 0)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, W, horizon * 0.7);

  // green-tinted floor grid lines (overlay a few horizontal lines)
  ctx.strokeStyle = `rgba(0, 220, 110, ${(0.14 * pulse).toFixed(3)})`;
  ctx.lineWidth = 1;
  const lines = 6;
  for (let i = 1; i <= lines; i++) {
    const frac = i / (lines + 1);
    const y    = horizon + (H - horizon) * Math.pow(frac, 1.8);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

// ── trajectory arc (when nav is calibrated) ────────────────────────────────

export function drawTrajectoryArc(ctx, cx, rocketGroundY, W, H, t) {
  const rocketTopY = rocketGroundY - 230;
  const pulse      = 0.65 + 0.35 * Math.sin(t * 2.1);

  // Bezier control points — gentle rightward orbital arc
  const cp1x = cx + 55;
  const cp1y = rocketTopY - 90;
  const cp2x = cx + 200;
  const cp2y = rocketTopY - 210;
  const endX = W * 0.82;
  const endY = H * 0.06;

  ctx.save();

  // Wide soft glow
  ctx.beginPath();
  ctx.moveTo(cx, rocketTopY);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  ctx.strokeStyle = `rgba(0, 210, 255, ${(0.08 * pulse).toFixed(3)})`;
  ctx.lineWidth   = 14;
  ctx.setLineDash([]);
  ctx.stroke();

  // Animated dashed line
  ctx.beginPath();
  ctx.moveTo(cx, rocketTopY);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  ctx.strokeStyle   = `rgba(0, 200, 255, ${(0.72 * pulse).toFixed(3)})`;
  ctx.lineWidth     = 1.5;
  ctx.setLineDash([7, 5]);
  ctx.lineDashOffset = -(t * 20) % 12;
  ctx.stroke();

  // Endpoint marker
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(endX, endY, 4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(0, 230, 255, ${(0.85 * pulse).toFixed(3)})`;
  ctx.fill();

  // Label
  ctx.fillStyle = `rgba(0, 210, 255, ${(0.55 * pulse).toFixed(3)})`;
  ctx.font      = `bold 8px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('TRAJECTORY LOCKED', endX, endY + 16);

  ctx.restore();
}

// ── terminal ───────────────────────────────────────────────────────────────

const TERMINAL_TELEMETRY = {
  power:       { rows: [['VOLT','11.4kV'],['LOAD','68%'],['AMP','12.4A']], status: 'STANDBY' },
  fuel:        { rows: [['PRESS','245kPa'],['TEMP','18°C'],['FLOW','OK']], status: 'STANDBY' },
  nav:         { rows: [['COORD','X-042'],['ALT','000m'],['HDG','090°']], status: 'LOCKED' },
  comms:       { rows: [['FREQ','24.8GHz'],['SIG','98%'],['TX','READY']], status: 'OFFLINE' },
  diagnostics: { rows: [['TEMP','62°C'],['CORE','NOM'],['STRCT','OK']], status: 'SCANNING' },
  engine:      { rows: [['THRUST','000%'],['PRES','OK'],['FUEL','100%']], status: 'IDLE' },
};

const TERMINAL_GLOW_CONFIG = {
  power:       { intensity: 0.30, flicker: false },
  fuel:        { intensity: 0.34, flicker: false },
  nav:         { intensity: 0.26, flicker: false },
  comms:       { intensity: 0.32, flicker: true,  flickerFreq: 3.8 },
  diagnostics: { intensity: 0.36, flicker: false },
  engine:      { intensity: 0.44, flicker: true,  flickerFreq: 5.2 },
};

export function drawTerminal(ctx, x, y, label, isNear, t, isOnline = false) {
  const idGuess = Object.keys(TERMINAL_TELEMETRY).find(
    (k) => label.toLowerCase().includes(k)
  ) || 'power';

  const w = 90, h = 110;
  const cfg = TERMINAL_GLOW_CONFIG[idGuess] || { intensity: 0.30, flicker: false };
  const flickerMod = cfg.flicker
    ? (0.72 + 0.28 * Math.sin(t * cfg.flickerFreq) * (0.6 + 0.4 * Math.sin(t * 19.1)))
    : 1.0;
  const pulse = (0.6 + 0.4 * Math.sin(t * 2.2)) * flickerMod;
  const seed  = idGuess.charCodeAt(0) * 0.41;

  // Color scheme: amber=near, green=online, blue=idle
  let cr, cg, cb, vr, vg, vb;
  if (isNear)        { [cr,cg,cb]=[255,179,71];  [vr,vg,vb]=[255,215,140]; }
  else if (isOnline) { [cr,cg,cb]=[34,255,136];  [vr,vg,vb]=[110,255,185]; }
  else               { [cr,cg,cb]=[0,175,255];   [vr,vg,vb]=[140,215,255]; }

  const glowRadius = 90 + cfg.intensity * 50;

  // Ambient glow bloom
  {
    const ambA = cfg.intensity * 0.45 * (0.5 + 0.5 * pulse);
    const ambG = ctx.createRadialGradient(x, y - h * 0.45, 0, x, y - h * 0.45, glowRadius);
    ambG.addColorStop(0, `rgba(${cr},${cg},${cb},${ambA.toFixed(3)})`);
    ambG.addColorStop(1, `rgba(${cr},${cg},${cb},0.000)`);
    ctx.fillStyle = ambG;
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.45, glowRadius, glowRadius * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Proximity halo
  if (isNear) {
    const hg = ctx.createRadialGradient(x, y, 0, x, y, 110);
    hg.addColorStop(0, `rgba(${cr},${cg},${cb},${(0.14 * pulse).toFixed(2)})`);
    hg.addColorStop(1, `rgba(${cr},${cg},${cb},0.000)`);
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.ellipse(x, y, 110, 80, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── Pedestal ─────────────────────────────────────────────────────────────
  const stemG = ctx.createLinearGradient(x - 5, 0, x + 5, 0);
  stemG.addColorStop(0, 'rgba(18,45,88,0.95)');
  stemG.addColorStop(0.5, 'rgba(38,75,138,0.95)');
  stemG.addColorStop(1, 'rgba(18,45,88,0.95)');
  ctx.fillStyle = stemG;
  ctx.fillRect(x - 4, y, 8, 26);

  ctx.fillStyle = 'rgba(28,58,106,0.92)';
  ctx.beginPath();
  ctx.moveTo(x - 4, y + 2); ctx.lineTo(x - 18, y + 20); ctx.lineTo(x - 18, y + 27);
  ctx.lineTo(x - 14, y + 27); ctx.lineTo(x - 2, y + 8); ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 2); ctx.lineTo(x + 18, y + 20); ctx.lineTo(x + 18, y + 27);
  ctx.lineTo(x + 14, y + 27); ctx.lineTo(x + 2, y + 8); ctx.closePath();
  ctx.fill();

  const baseG = ctx.createLinearGradient(x - 24, y + 22, x + 24, y + 32);
  baseG.addColorStop(0, 'rgba(12,32,72,0.98)');
  baseG.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.12)`);
  baseG.addColorStop(1, 'rgba(12,32,72,0.98)');
  ctx.fillStyle = baseG;
  roundRect(ctx, x - 24, y + 22, 48, 10, 3);
  ctx.fill();
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.22)`;
  ctx.lineWidth = 1;
  roundRect(ctx, x - 24, y + 22, 48, 10, 3);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(28,48,72,0.50)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + 32);
  ctx.quadraticCurveTo(x + 20, y + 55, x + 40, y + 78);
  ctx.stroke();

  // ── Panel body ────────────────────────────────────────────────────────────
  const bx = x - w / 2, by = y - h;
  const panelG = ctx.createLinearGradient(bx, by, bx + w, by + h);
  panelG.addColorStop(0, 'rgba(6,18,46,0.97)');
  panelG.addColorStop(0.5, 'rgba(9,22,54,0.97)');
  panelG.addColorStop(1, 'rgba(5,13,38,0.97)');
  ctx.fillStyle = panelG;
  roundRect(ctx, bx, by, w, h, 7);
  ctx.fill();

  const borderA = isNear ? Math.min(0.95, 0.75 + 0.25 * pulse)
    : isOnline ? (0.50 + 0.22 * pulse)
    : (cfg.intensity * 0.9 * pulse);
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},${borderA.toFixed(2)})`;
  ctx.lineWidth = isNear ? 1.8 : 1.5;
  roundRect(ctx, bx, by, w, h, 7);
  ctx.stroke();

  // Top highlight
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.10)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bx + 8, by + 1);
  ctx.lineTo(bx + w - 8, by + 1);
  ctx.stroke();

  // Corner accent marks
  const cl = 6;
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(0.22 * pulse).toFixed(2)})`;
  ctx.lineWidth = 1;
  [[bx,by],[bx+w,by],[bx,by+h],[bx+w,by+h]].forEach(([cx_,cy_],i) => {
    const sx_ = i === 1 || i === 3 ? -1 : 1;
    const sy_ = i === 2 || i === 3 ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(cx_ + sx_ * 1, cy_ + sy_ * (cl + 1));
    ctx.lineTo(cx_ + sx_ * 1, cy_ + sy_ * 1);
    ctx.lineTo(cx_ + sx_ * (cl + 1), cy_ + sy_ * 1);
    ctx.stroke();
  });

  // ── Screen interior ───────────────────────────────────────────────────────
  const sx = bx + 6, sy = by + 6, sw = w - 12, sh = h - 12;
  const screenG = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
  screenG.addColorStop(0, 'rgba(0,16,48,0.96)');
  screenG.addColorStop(1, 'rgba(0,9,28,0.96)');
  ctx.fillStyle = screenG;
  roundRect(ctx, sx, sy, sw, sh, 4);
  ctx.fill();

  // Horizontal scanlines
  ctx.fillStyle = `rgba(${cr},${cg},${cb},0.022)`;
  for (let ly = sy + 2; ly < sy + sh - 2; ly += 3) {
    ctx.fillRect(sx + 2, ly, sw - 4, 1.5);
  }

  // Vertical scan sweep
  const sweepY = sy + ((t * 26) % sh);
  const sweepG = ctx.createLinearGradient(0, sweepY - 8, 0, sweepY + 8);
  sweepG.addColorStop(0, `rgba(${cr},${cg},${cb},0.000)`);
  sweepG.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.055)`);
  sweepG.addColorStop(1, `rgba(${cr},${cg},${cb},0.000)`);
  ctx.fillStyle = sweepG;
  ctx.fillRect(sx, Math.max(sy, sweepY - 8), sw, 16);

  // ── Header ───────────────────────────────────────────────────────────────
  const hdrY = sy + 12;
  const sysName = idGuess === 'diagnostics' ? 'DIAG' : idGuess.toUpperCase();
  ctx.font = 'bold 7px Courier New, monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${isNear ? 0.95 : 0.72})`;
  ctx.fillText(sysName, sx + 5, hdrY);

  const telData = TERMINAL_TELEMETRY[idGuess];
  const statusTxt = isOnline ? 'ONLINE' : (telData ? telData.status : 'STANDBY');
  const [stR, stG, stB] = isOnline ? [34,255,136] : [255,179,71];
  ctx.font = '6px Courier New, monospace';
  ctx.textAlign = 'right';
  ctx.fillStyle = `rgba(${stR},${stG},${stB},0.80)`;
  ctx.fillText(statusTxt, sx + sw - 4, hdrY);

  ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.18)`;
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.moveTo(sx + 4, hdrY + 4);
  ctx.lineTo(sx + sw - 4, hdrY + 4);
  ctx.stroke();

  // ── Telemetry rows ────────────────────────────────────────────────────────
  const rows = telData ? telData.rows : [['--','---'],['--','---'],['--','---']];
  const rowStartY = hdrY + 16;
  const rowH = 13;
  rows.forEach(([key, val], i) => {
    const ry = rowStartY + i * rowH;
    ctx.font = '6px Courier New, monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = `rgba(${cr},${cg},${cb},0.45)`;
    ctx.fillText(key, sx + 5, ry);
    ctx.textAlign = 'right';
    ctx.fillStyle = `rgba(${vr},${vg},${vb},${isNear ? 0.95 : 0.82})`;
    ctx.fillText(val, sx + sw - 5, ry);
    if (i < rows.length - 1) {
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.07)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(sx + 4, ry + 5);
      ctx.lineTo(sx + sw - 4, ry + 5);
      ctx.stroke();
    }
  });

  // ── Waveform graph ────────────────────────────────────────────────────────
  const wfTop = rowStartY + rows.length * rowH + 6;
  const wfHgt = 16;
  const wfMid = wfTop + wfHgt / 2;
  ctx.fillStyle = `rgba(${cr},${cg},${cb},0.055)`;
  roundRect(ctx, sx + 3, wfTop, sw - 6, wfHgt, 2);
  ctx.fill();

  const wfX0 = sx + 5, wfX1 = sx + sw - 5;
  const wfWidth = wfX1 - wfX0;
  const amp = wfHgt * 0.34 * (isOnline ? 1.0 : 0.38);
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
      const px = wfX0 + (i / 30) * wfWidth;
      const ph = (i / 30) * Math.PI * 5 + t * 2.1 + seed;
      const py = wfMid + Math.sin(ph) * amp * (0.8 + 0.2 * Math.sin(ph * 0.6 + t * 0.7));
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    if (pass === 0) {
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${isNear ? 0.90 : isOnline ? 0.75 : 0.40})`;
      ctx.lineWidth = 1.2;
    } else {
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.12)`;
      ctx.lineWidth = 3;
    }
    ctx.stroke();
  }
  ctx.lineWidth = 1;

  // ── LED indicator ─────────────────────────────────────────────────────────
  const ledX = bx + w - 10, ledY = by + 10;
  let ledClr;
  if (isNear) {
    const blinkLed = Math.floor(t * 4) % 2 === 0;
    ledClr = blinkLed ? 'rgba(255,179,71,0.95)' : 'rgba(255,179,71,0.12)';
  } else if (isOnline) {
    ledClr = `rgba(34,255,136,${(0.80 + 0.20 * pulse).toFixed(2)})`;
  } else {
    ledClr = `rgba(0,175,255,${(0.55 + 0.25 * pulse).toFixed(2)})`;
  }
  const ledGlowG = ctx.createRadialGradient(ledX, ledY, 0, ledX, ledY, 7);
  ledGlowG.addColorStop(0, ledClr);
  ledGlowG.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ledGlowG;
  ctx.beginPath();
  ctx.arc(ledX, ledY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ledX, ledY, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = ledClr;
  ctx.fill();

  // Screen glare
  ctx.save();
  ctx.translate(sx + 14, sy + 10);
  ctx.rotate(-0.52);
  ctx.beginPath();
  ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.045)';
  ctx.fill();
  ctx.restore();

  // ── Label ─────────────────────────────────────────────────────────────────
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${isNear ? 0.95 : isOnline ? 0.70 : 0.50})`;
  ctx.font = `bold 8px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(label.toUpperCase(), x, y + 42);
}

// Glowing elliptical halo ring at the launch pad base
export function drawLaunchPadRing(ctx, cx, groundY, t) {
  const rx = 88, ry = 20;
  const pulse = 0.65 + 0.35 * Math.sin(t * 1.6);

  // Layered outer glow
  for (let i = 4; i >= 1; i--) {
    ctx.beginPath();
    ctx.ellipse(cx, groundY, rx + i * 14, ry + i * 3, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,175,255,${(0.04 * pulse / i).toFixed(3)})`;
    ctx.lineWidth = i * 5;
    ctx.stroke();
  }

  // Core ring with horizontal gradient fade
  ctx.beginPath();
  ctx.ellipse(cx, groundY, rx, ry, 0, 0, Math.PI * 2);
  const ringG = ctx.createLinearGradient(cx - rx, groundY, cx + rx, groundY);
  ringG.addColorStop(0.00, 'rgba(0,175,255,0.00)');
  ringG.addColorStop(0.20, `rgba(0,175,255,${(0.85 * pulse).toFixed(2)})`);
  ringG.addColorStop(0.50, `rgba(100,220,255,${(0.95 * pulse).toFixed(2)})`);
  ringG.addColorStop(0.80, `rgba(0,175,255,${(0.85 * pulse).toFixed(2)})`);
  ringG.addColorStop(1.00, 'rgba(0,175,255,0.00)');
  ctx.strokeStyle = ringG;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner fill
  const fillG = ctx.createRadialGradient(cx, groundY, 0, cx, groundY, rx);
  fillG.addColorStop(0, `rgba(0,175,255,${(0.06 * pulse).toFixed(3)})`);
  fillG.addColorStop(0.6, `rgba(0,175,255,${(0.025 * pulse).toFixed(3)})`);
  fillG.addColorStop(1, 'rgba(0,175,255,0.000)');
  ctx.fillStyle = fillG;
  ctx.beginPath();
  ctx.ellipse(cx, groundY, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tick marks
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2;
    const tx0 = cx + Math.cos(ang) * rx;
    const ty0 = groundY + Math.sin(ang) * ry;
    const tx1 = cx + Math.cos(ang) * (rx - 5);
    const ty1 = groundY + Math.sin(ang) * (ry - 1.5);
    ctx.beginPath();
    ctx.moveTo(tx0, ty0);
    ctx.lineTo(tx1, ty1);
    ctx.strokeStyle = `rgba(0,175,255,${(0.45 * pulse).toFixed(2)})`;
    ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.75;
    ctx.stroke();
  }
  ctx.lineWidth = 1;
}

// ── player (astronaut) ─────────────────────────────────────────────────────

export function drawPlayer(ctx, x, y, vx, t) {
  const bob = Math.sin(t * 6) * (Math.abs(vx) > 10 ? 3 : 1);
  const py  = y + bob;
  const dir = vx > 5 ? 1 : vx < -5 ? -1 : 0;

  // Scale factor for bigger, more visible character
  const S = 1.3;

  // ── shadow beneath player ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(x, py + 4, 20, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
  ctx.fill();

  // ── boots ────────────────────────────────────────────────────────────────
  const legSwing = Math.abs(vx) > 8 ? Math.sin(t * 9) * 5 : 0;
  [[-7 * S, legSwing], [7 * S, -legSwing]].forEach(([lx, swing]) => {
    // Boot shape — slightly wider rounded rect
    const bootX = x + lx - 5 * S;
    const bootY = py - 2 + 18 * S + Math.abs(swing * 0.3);
    roundRect(ctx, bootX, bootY, 10 * S, 6, 3);
    ctx.fillStyle = 'rgba(30, 50, 100, 0.90)';
    ctx.fill();
  });

  // ── legs ─────────────────────────────────────────────────────────────────
  [[-7 * S, legSwing], [7 * S, -legSwing]].forEach(([lx, swing]) => {
    ctx.fillStyle = 'rgba(55, 90, 160, 0.90)';
    ctx.fillRect(x + lx - 4 * S, py - 2, 8 * S, 18 * S + Math.abs(swing * 0.3));
    // Suit seam on leg
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.30)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + lx, py - 2);
    ctx.lineTo(x + lx, py - 2 + 16 * S);
    ctx.stroke();
  });

  // ── suit body ────────────────────────────────────────────────────────────
  const bodyGrad = ctx.createRadialGradient(x, py - 16 * S, 2, x, py - 16 * S, 20 * S);
  bodyGrad.addColorStop(0, 'rgba(120, 170, 230, 0.95)');
  bodyGrad.addColorStop(1, 'rgba(50,  90,  160, 0.95)');
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, x - 14 * S, py - 30 * S, 28 * S, 28 * S, 7);
  ctx.fill();

  // Suit seams on body
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.30)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, py - 30 * S);
  ctx.lineTo(x, py - 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 14 * S, py - 18 * S);
  ctx.lineTo(x + 14 * S, py - 18 * S);
  ctx.stroke();

  // ── shoulder pads ────────────────────────────────────────────────────────
  [[-1, -14 * S - 4], [1, 14 * S + 4 - 10]].forEach(([side, sx]) => {
    ctx.fillStyle = 'rgba(80, 120, 200, 0.90)';
    roundRect(ctx, x + sx - (side === 1 ? 0 : 0), py - 30 * S, 10, 10, 4);
    ctx.fill();
  });

  // ── helmet ────────────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.arc(x, py - 36 * S, 15 * S, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40, 70, 130, 0.95)';
  ctx.fill();

  // ── visor ────────────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(x + dir * 2 * S, py - 36 * S, 10 * S, 8 * S, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10, 190, 255, 0.55)';
  ctx.fill();

  // Visor highlight arcs
  ctx.save();
  ctx.translate(x + dir * 2 * S - 3, py - 36 * S - 2);
  // First highlight arc
  ctx.beginPath();
  ctx.ellipse(0, 0, 5 * S, 3 * S, -0.4, Math.PI * 1.1, Math.PI * 1.8);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Second smaller highlight
  ctx.beginPath();
  ctx.ellipse(3, 2, 2 * S, 1.5 * S, 0.2, Math.PI * 1.1, Math.PI * 1.75);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // original visor highlight dot
  ctx.beginPath();
  ctx.ellipse(x + dir * 2 * S - 3, py - 39 * S, 3.5, 2.5, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.60)';
  ctx.fill();

  // ── backpack ─────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(30, 55, 110, 0.85)';
  roundRect(ctx, x - 18 * S, py - 28 * S, 7 * S, 22 * S, 3);
  ctx.fill();
  // Backpack vent/nozzle detail
  ctx.fillStyle = 'rgba(50, 80, 150, 0.7)';
  ctx.fillRect(x - 18 * S + 1, py - 14 * S, 5 * S, 3);
  ctx.fillRect(x - 18 * S + 1, py - 10 * S, 5 * S, 2);
  // Nozzle tip
  ctx.fillStyle = 'rgba(80, 110, 180, 0.8)';
  ctx.beginPath();
  ctx.arc(x - 18 * S + 3, py - 14 * S + 1, 2, 0, Math.PI * 2);
  ctx.fill();
}

// ── background nebula ──────────────────────────────────────────────────────

export function drawBackground(ctx, W, H, t) {
  // deep space gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0,   '#020818');
  bg.addColorStop(0.55,'#04102a');
  bg.addColorStop(1,   '#060e22');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // nebula blobs — animated slow drift with richer deep purple/blue washes
  const nebulae = [
    { x: W * 0.15, y: H * 0.18, rx: 220, ry: 130, r: 'rgba(60,15,120,0.28)', phase: 0.0 },
    { x: W * 0.80, y: H * 0.10, rx: 200, ry: 115, r: 'rgba(8,45,140,0.26)',  phase: 1.3 },
    { x: W * 0.50, y: H * 0.30, rx: 270, ry: 155, r: 'rgba(28,10,95,0.20)',  phase: 2.1 },
    { x: W * 0.32, y: H * 0.22, rx: 180, ry: 100, r: 'rgba(12,65,160,0.18)', phase: 0.8 },
    { x: W * 0.68, y: H * 0.36, rx: 165, ry: 95,  r: 'rgba(75,8,130,0.16)',  phase: 1.7 },
  ];
  nebulae.forEach(({ x, y, rx, ry, r, phase }) => {
    const driftX = x + Math.sin(t * 0.011 + phase) * 10;
    const g = ctx.createRadialGradient(driftX, y, 0, driftX, y, Math.max(rx, ry));
    g.addColorStop(0, r);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(driftX, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // ── distant planet/moon in upper-right ──────────────────────────────────
  const planetX = W * 0.85;
  const planetY = H * 0.12;
  const planetR = 80;
  const craterAngle = (t !== undefined ? t * 0.001 : 0); // very slow rotation

  ctx.save();
  ctx.beginPath();
  ctx.arc(planetX, planetY, planetR, 0, Math.PI * 2);
  ctx.clip();

  // Planet fill gradient
  const planetGrad = ctx.createRadialGradient(planetX - 20, planetY - 20, 10, planetX, planetY, planetR);
  planetGrad.addColorStop(0, 'rgba(180, 195, 215, 0.90)');
  planetGrad.addColorStop(0.4, 'rgba(140, 160, 185, 0.88)');
  planetGrad.addColorStop(0.75, 'rgba(100, 120, 150, 0.85)');
  planetGrad.addColorStop(1, 'rgba(60, 75, 100, 0.80)');
  ctx.fillStyle = planetGrad;
  ctx.fillRect(planetX - planetR, planetY - planetR, planetR * 2, planetR * 2);

  // Craters (3–4 dark ellipses, slowly rotating)
  const craters = [
    { dx: 20, dy: -15, rx: 14, ry: 10 },
    { dx: -25, dy: 20, rx: 10, ry: 8 },
    { dx: 10, dy: 30, rx: 18, ry: 12 },
    { dx: -10, dy: -30, rx: 8, ry: 6 },
  ];
  craters.forEach(({ dx, dy, rx, ry }, i) => {
    const ca = craterAngle + i * 0.8;
    const cdx = dx * Math.cos(ca) - dy * Math.sin(ca);
    const cdy = dx * Math.sin(ca) + dy * Math.cos(ca);
    ctx.beginPath();
    ctx.ellipse(planetX + cdx, planetY + cdy, rx, ry, ca * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 60, 80, 0.40)';
    ctx.fill();
    // Crater rim highlight
    ctx.strokeStyle = 'rgba(200, 215, 235, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  ctx.restore();

  // Atmospheric halo around moon — soft layered glow
  const atmosHalo = ctx.createRadialGradient(planetX, planetY, planetR * 0.90, planetX, planetY, planetR * 1.55);
  atmosHalo.addColorStop(0,    'rgba(130, 175, 255, 0.00)');
  atmosHalo.addColorStop(0.22, 'rgba(110, 160, 255, 0.28)');
  atmosHalo.addColorStop(0.55, 'rgba(80,  130, 220, 0.14)');
  atmosHalo.addColorStop(0.80, 'rgba(60,  100, 190, 0.06)');
  atmosHalo.addColorStop(1,    'rgba(0,   0,   0,   0.00)');
  ctx.fillStyle = atmosHalo;
  ctx.beginPath();
  ctx.arc(planetX, planetY, planetR * 1.55, 0, Math.PI * 2);
  ctx.fill();
  const rimGlow = ctx.createRadialGradient(planetX, planetY, planetR * 0.82, planetX, planetY, planetR * 1.12);
  rimGlow.addColorStop(0,   'rgba(150, 200, 255, 0.00)');
  rimGlow.addColorStop(0.5, 'rgba(120, 170, 255, 0.18)');
  rimGlow.addColorStop(1,   'rgba(80,  130, 220, 0.00)');
  ctx.fillStyle = rimGlow;
  ctx.beginPath();
  ctx.arc(planetX, planetY, planetR * 1.12, 0, Math.PI * 2);
  ctx.fill();
}

// ── rocket light cone — connects engine bell to floor with heat glow ──────

export function drawRocketLightCone(ctx, cx, groundY, H, t) {
  const floorY   = H * 0.55;
  const coneTopY = groundY + 14;
  if (coneTopY >= floorY) return;

  const topW    = 14;
  const bottomW = 70;

  // outer cone
  const coneOuter = ctx.createLinearGradient(cx, coneTopY, cx, floorY);
  coneOuter.addColorStop(0, 'rgba(255, 200, 80, 0.22)');
  coneOuter.addColorStop(0.5, 'rgba(255, 150, 40, 0.12)');
  coneOuter.addColorStop(1, 'rgba(255, 100, 10, 0.04)');
  ctx.fillStyle = coneOuter;
  ctx.beginPath();
  ctx.moveTo(cx - topW, coneTopY);
  ctx.lineTo(cx + topW, coneTopY);
  ctx.lineTo(cx + bottomW, floorY);
  ctx.lineTo(cx - bottomW, floorY);
  ctx.closePath();
  ctx.fill();

  // bright inner core
  const coneInner = ctx.createLinearGradient(cx, coneTopY, cx, floorY);
  coneInner.addColorStop(0, 'rgba(255, 245, 200, 0.40)');
  coneInner.addColorStop(0.3, 'rgba(255, 210, 120, 0.20)');
  coneInner.addColorStop(1, 'rgba(255, 160, 60, 0.06)');
  ctx.fillStyle = coneInner;
  ctx.beginPath();
  ctx.moveTo(cx - topW * 0.35, coneTopY);
  ctx.lineTo(cx + topW * 0.35, coneTopY);
  ctx.lineTo(cx + bottomW * 0.30, floorY);
  ctx.lineTo(cx - bottomW * 0.30, floorY);
  ctx.closePath();
  ctx.fill();

  // heat pool where cone meets floor
  const poolA = (0.22 + 0.08 * Math.sin(t * 4.2)) * 1;
  const poolGrad = ctx.createRadialGradient(cx, floorY, 0, cx, floorY, bottomW * 1.5);
  poolGrad.addColorStop(0, `rgba(255, 190, 60, ${poolA.toFixed(3)})`);
  poolGrad.addColorStop(0.4, `rgba(255, 110, 20, ${(poolA * 0.55).toFixed(3)})`);
  poolGrad.addColorStop(1, 'rgba(200, 50, 0, 0.00)');
  ctx.fillStyle = poolGrad;
  ctx.beginPath();
  ctx.ellipse(cx, floorY, bottomW * 1.5, 16, 0, 0, Math.PI * 2);
  ctx.fill();
}

// ── ambient particles rising from rocket base ──────────────────────────────

export function drawRocketAmbientParticles(ctx, cx, groundY, t) {
  for (let i = 0; i < 24; i++) {
    const seed    = i * 137.508;
    const cycle   = (t * (1.8 + (i % 5) * 0.35) + seed * 0.01) % 3.5;
    const progress = cycle / 3.5;
    if (progress > 0.88) continue;

    const alpha = progress < 0.18
      ? (progress / 0.18) * 0.45
      : (1 - (progress - 0.18) / 0.70) * 0.45;
    if (alpha < 0.01) continue;

    const spread = (Math.sin(seed * 0.13) * 0.5 + 0.5) * 50 - 25;
    const rise   = progress * 55;
    const wobble = Math.sin(t * 1.3 + seed * 0.07) * 4;
    const px = cx + spread + wobble;
    const py = groundY + 8 - rise;
    const r  = 0.7 + (1 - progress) * 1.8;
    const g2 = Math.floor(180 + progress * 50);
    const b2 = Math.floor(80 + progress * 80);

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${g2}, ${b2}, ${alpha.toFixed(3)})`;
    ctx.fill();
  }
}

// ── NPC crew system ───────────────────────────────────────────────────────
// Three crew members with walking→working→walking state loops.
// Each visits a different subset of terminals and starts phase-offset so
// they are never synchronised. triggerNpcReaction() makes the nearest NPC
// raise their arm toward the rocket when a system comes online.

const NPC_TERM_RELX  = [-0.35, -0.21, -0.07, 0.07, 0.21, 0.35];
const NPC_ROUTES     = [[0, 2, 4], [1, 3, 5], [3, 1, 4]];
const NPC_SEEDS      = [1.3, 4.1, 7.6];
const NPC_WALK_SPEED = 55;            // px / s
const NPC_WORK_TIMES = [3.8, 4.5, 3.2]; // s per terminal visit (per NPC)
const NPC_REACT_DUR  = 1.1;           // s for arm-raise gesture

// Per-NPC suit palettes — deliberately NOT blue so they're distinct from the player
const NPC_SUITS = [
  // NPC 0: orange
  { body0:'rgba(225,108,32,0.92)', body1:'rgba(152,60,10,0.92)',
    legs:'rgba(170,76,15,0.90)',   boots:'rgba(112,46,8,0.92)',
    pack:'rgba(122,46,10,0.85)',   helm:'rgba(66,34,12,0.95)', arms:'rgba(160,70,14,0.90)' },
  // NPC 1: grey / silver
  { body0:'rgba(136,150,166,0.92)', body1:'rgba(74,84,96,0.92)',
    legs:'rgba(84,94,108,0.90)',    boots:'rgba(52,58,70,0.92)',
    pack:'rgba(54,64,76,0.85)',     helm:'rgba(44,54,64,0.95)', arms:'rgba(76,86,102,0.90)' },
  // NPC 2: amber / gold
  { body0:'rgba(208,175,34,0.92)', body1:'rgba(140,110,8,0.92)',
    legs:'rgba(152,128,14,0.90)',  boots:'rgba(102,80,6,0.92)',
    pack:'rgba(112,90,8,0.85)',    helm:'rgba(70,54,10,0.95)', arms:'rgba(142,118,12,0.90)' },
];

export function initNpcs(W, H) {
  return NPC_ROUTES.map((route, i) => {
    const rIdx = i % route.length;
    const tIdx = route[rIdx];
    const tx   = W * 0.5 + NPC_TERM_RELX[tIdx] * W;
    // Stagger start states so they're never in sync
    const startWalking = i === 1;
    // Facing: lean toward scene centre when working at a terminal
    const initFacing   = NPC_TERM_RELX[tIdx] < 0 ? 1 : -1;
    return {
      id:         i,
      x:          startWalking ? tx - 55 : tx,
      y:          H * 0.70,
      route,
      routeIdx:   rIdx,
      state:      startWalking ? 'walking' : 'working',
      workTimer:  startWalking ? 0 : NPC_WORK_TIMES[i] * (i === 2 ? 0.55 : 1.0),
      reactTimer: 0,
      reactDir:   1,
      facing:     startWalking ? 1 : initFacing,
      seed:       NPC_SEEDS[i],
    };
  });
}

export function updateNpcs(npcs, delta, W, H, paused) {
  if (paused || !npcs) return;
  npcs.forEach(npc => {
    npc.y = H * 0.70;

    if (npc.state === 'reacting') {
      npc.reactTimer -= delta;
      if (npc.reactTimer <= 0) {
        npc.state     = 'working';
        npc.workTimer = NPC_WORK_TIMES[npc.id] * 0.35;
      }
      return;
    }

    if (npc.state === 'working') {
      npc.workTimer -= delta;
      if (npc.workTimer <= 0) {
        npc.routeIdx = (npc.routeIdx + 1) % npc.route.length;
        npc.state    = 'walking';
      }
      return;
    }

    if (npc.state === 'walking') {
      const tIdx = npc.route[npc.routeIdx];
      const tx   = W * 0.5 + NPC_TERM_RELX[tIdx] * W;
      const dx   = tx - npc.x;
      if (Math.abs(dx) < 3) {
        npc.x         = tx;
        npc.state     = 'working';
        npc.workTimer = NPC_WORK_TIMES[npc.id];
        // Face toward scene centre to interact with the terminal
        npc.facing    = NPC_TERM_RELX[tIdx] < 0 ? 1 : -1;
      } else {
        const step = Math.sign(dx) * NPC_WALK_SPEED * delta;
        npc.x     += Math.abs(step) > Math.abs(dx) ? dx : step;
        npc.facing = dx > 0 ? 1 : -1;
      }
    }
  });
}

export function triggerNpcReaction(npcs, rocketX) {
  if (!npcs) return;
  let nearest = null, bestDist = Infinity;
  npcs.forEach(npc => {
    const d = Math.abs(npc.x - rocketX);
    if (d < bestDist) { bestDist = d; nearest = npc; }
  });
  if (nearest && nearest.state !== 'reacting') {
    nearest.state      = 'reacting';
    nearest.reactTimer = NPC_REACT_DUR;
    nearest.reactDir   = rocketX > nearest.x ? 1 : -1;
  }
}

function drawNpc(ctx, npc, t) {
  const { x, y, state, seed, facing, reactDir, id } = npc;
  const S    = 0.65;  // noticeably smaller than the player (S=1.3)
  const suit = NPC_SUITS[id % NPC_SUITS.length];

  ctx.save();
  ctx.globalAlpha = 0.86;

  // Ground shadow
  ctx.beginPath();
  ctx.ellipse(x, y + 3, 12 * S, 3, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fill();

  const isWalking = state === 'walking';
  const bob       = isWalking ? Math.sin(t * 6 + seed) * 2.5 : 0;

  // Tapping phase drives the arm cycle and a micro head-nod while working
  const tapPhase = state === 'working' ? Math.sin(t * 7.5 + seed * 2.1) : 0;
  const workNod  = tapPhase * 0.5;
  const py       = y + bob + workNod;

  // Forward lean toward terminal while working
  const leanAmt = state === 'working' ? 0.15 + Math.sin(t * 1.4 + seed) * 0.03 : 0;
  ctx.save();
  if (leanAmt > 0) {
    ctx.translate(x, py);
    ctx.rotate(facing * leanAmt);
    ctx.translate(-x, -py);
  }

  // Legs — swing when walking, planted when working/reacting
  const legSwing = isWalking ? Math.sin(t * 6 + seed) * 5 : 0;
  [[-6 * S, legSwing], [6 * S, -legSwing]].forEach(([lx, swing]) => {
    roundRect(ctx, x + lx - 4 * S, py - 2 + 14 * S + Math.abs(swing * 0.25), 9 * S, 5, 2);
    ctx.fillStyle = suit.boots;
    ctx.fill();
    ctx.fillStyle = suit.legs;
    ctx.fillRect(x + lx - 3.5 * S, py - 2, 7 * S, 14 * S + Math.abs(swing * 0.2));
  });

  // Body
  const bodyGrad = ctx.createRadialGradient(x, py - 14 * S, 1, x, py - 14 * S, 15 * S);
  bodyGrad.addColorStop(0, suit.body0);
  bodyGrad.addColorStop(1, suit.body1);
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, x - 11 * S, py - 26 * S, 22 * S, 24 * S, 5);
  ctx.fill();

  // Backpack (opposite side to facing)
  ctx.fillStyle = suit.pack;
  roundRect(ctx, x + (facing >= 0 ? -14 * S : 3 * S), py - 24 * S, 5 * S, 18 * S, 2);
  ctx.fill();

  // Arms
  ctx.fillStyle = suit.arms;
  if (state === 'reacting') {
    // Arm raised toward rocket
    const rd         = reactDir || 1;
    const frac       = 1 - Math.max(0, npc.reactTimer / NPC_REACT_DUR);
    const raiseAngle = -1.05 * Math.min(1, frac * 2.5);
    ctx.save();
    ctx.translate(x + rd * 10 * S, py - 24 * S);
    ctx.rotate(raiseAngle);
    ctx.fillRect(-3 * S, 0, 6 * S, 12 * S);
    ctx.restore();
    ctx.fillRect(x - rd * 10 * S - 3 * S, py - 24 * S, 6 * S, 12 * S);

  } else if (state === 'working') {
    // Dominant arm taps at terminal — fast oscillation (typing/button-press rhythm)
    const tapAngle   = 0.26 + tapPhase * 0.18;  // sweeps 0.08 → 0.44 rad
    // Off-hand braces against the console edge, slow idle sway
    const braceAngle = -(0.10 + Math.sin(t * 0.9 + seed) * 0.05);
    ctx.save();
    ctx.translate(x + facing * 10 * S, py - 24 * S);
    ctx.rotate(tapAngle);
    ctx.fillRect(-3 * S, 0, 6 * S, 12 * S);
    ctx.restore();
    ctx.save();
    ctx.translate(x - facing * 10 * S, py - 24 * S);
    ctx.rotate(braceAngle);
    ctx.fillRect(-3 * S, 0, 6 * S, 12 * S);
    ctx.restore();

  } else {
    // Walking arm swing
    const armSwing = Math.sin(t * 6 + seed) * 0.22;
    [[-1, armSwing], [1, -armSwing]].forEach(([side, swing]) => {
      ctx.save();
      ctx.translate(x + side * 10 * S, py - 24 * S);
      ctx.rotate(swing);
      ctx.fillRect(-3 * S, 0, 6 * S, 12 * S);
      ctx.restore();
    });
  }

  ctx.restore(); // lean

  // Helmet
  ctx.beginPath();
  ctx.arc(x, py - 32 * S, 10 * S, 0, Math.PI * 2);
  ctx.fillStyle = suit.helm;
  ctx.fill();

  // Visor — same cyan across all NPCs (recognisable crew aesthetic),
  // shifted toward facing dir; shifts toward rocket during reaction
  const visorShift = state === 'reacting'
    ? (reactDir || 1) * 1.4 * S
    : facing * 1.4 * S;
  ctx.beginPath();
  ctx.ellipse(x + visorShift, py - 32 * S, 6.5 * S, 5.5 * S, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10,190,255,0.50)';
  ctx.fill();

  // Visor highlight
  ctx.beginPath();
  ctx.ellipse(x + visorShift - 2, py - 33 * S, 2, 1.5, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.52)';
  ctx.fill();

  ctx.restore();
}

export function drawNpcs(ctx, npcs, t) {
  if (!npcs) return;
  npcs.forEach(npc => drawNpc(ctx, npc, t));
}

// ── hangar walls / structure ───────────────────────────────────────────────

export function drawHangar(ctx, W, H) {
  const horizon = H * 0.55;

  // left wall
  const leftWall = ctx.createLinearGradient(0, 0, 80, 0);
  leftWall.addColorStop(0, 'rgba(10, 30, 70, 0.90)');
  leftWall.addColorStop(1, 'rgba(10, 30, 70, 0.00)');
  ctx.fillStyle = leftWall;
  ctx.fillRect(0, 0, 80, H);

  // right wall
  const rightWall = ctx.createLinearGradient(W - 80, 0, W, 0);
  rightWall.addColorStop(0, 'rgba(10, 30, 70, 0.00)');
  rightWall.addColorStop(1, 'rgba(10, 30, 70, 0.90)');
  ctx.fillStyle = rightWall;
  ctx.fillRect(W - 80, 0, 80, H);

  // ceiling gradient
  const ceiling = ctx.createLinearGradient(0, 0, 0, 80);
  ceiling.addColorStop(0, 'rgba(8, 20, 55, 0.95)');
  ceiling.addColorStop(1, 'rgba(8, 20, 55, 0.00)');
  ctx.fillStyle = ceiling;
  ctx.fillRect(0, 0, W, 80);

  // horizon accent line
  ctx.strokeStyle = 'rgba(40, 100, 200, 0.30)';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(0,  horizon);
  ctx.lineTo(W, horizon);
  ctx.stroke();
}
