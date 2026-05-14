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

// ── stars ──────────────────────────────────────────────────────────────────

export function initStars(count, W, H) {
  return Array.from({ length: count }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * H * 0.55,
    r:    Math.random() * 1.4 + 0.3,
    base: Math.random(),       // base brightness [0,1]
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 1.5 + 0.5,
  }));
}

export function drawStars(ctx, stars, t) {
  stars.forEach((s) => {
    const twinkle = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
    const alpha   = 0.3 + 0.7 * twinkle * s.base;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 230, 255, ${alpha.toFixed(2)})`;
    ctx.fill();
  });
}

// ── floor (perspective grid) ───────────────────────────────────────────────

export function drawFloor(ctx, W, H) {
  const horizon = H * 0.55;
  const lines   = 14;
  const cols    = 20;
  const vp      = { x: W / 2, y: horizon };

  ctx.strokeStyle = 'rgba(40, 100, 180, 0.22)';
  ctx.lineWidth   = 1;

  // horizontal lines
  for (let i = 0; i <= lines; i++) {
    const t  = i / lines;
    const y  = horizon + (H - horizon) * Math.pow(t, 1.8);
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

// ── rocket ─────────────────────────────────────────────────────────────────

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

// ── rocket ─────────────────────────────────────────────────────────────────

export function drawRocket(ctx, cx, groundY, t, powered = false, ignitionLevel = 1) {
  const bob   = Math.sin(t * 0.8) * 2.5;
  const baseY = groundY + bob;

  // exhaust flame
  const nominalBase = powered ? 75 : 55;
  const nominalVar  = powered ? 18 : 12;
  // ignitionLevel: 0 = tiny pre-ignition, 1 = full power
  const flameBase = nominalBase * (0.25 + 0.75 * ignitionLevel);
  const flameH    = flameBase + Math.sin(t * 8) * nominalVar * ignitionLevel;
  const flameAlpha = 0.30 + 0.65 * ignitionLevel;
  const flame  = ctx.createRadialGradient(cx, baseY + 10, 2, cx, baseY + 20, Math.max(1, flameH));
  flame.addColorStop(0,   `rgba(255, 240, 180, ${flameAlpha})`);
  flame.addColorStop(0.35,`rgba(255, 140,  40, ${flameAlpha * 0.73})`);
  flame.addColorStop(0.7, `rgba(180,  60, 200, ${flameAlpha * 0.42})`);
  flame.addColorStop(1,   'rgba(100,  20, 160, 0.00)');
  ctx.fillStyle = flame;
  ctx.beginPath();
  ctx.ellipse(cx, baseY + 35, Math.max(1, 16 * ignitionLevel), Math.max(1, flameH), 0, 0, Math.PI * 2);
  ctx.fill();

  // body
  const bodyW = 52;
  const bodyH = 160;
  const bodyGrad = ctx.createLinearGradient(cx - bodyW / 2, 0, cx + bodyW / 2, 0);
  bodyGrad.addColorStop(0,   'rgba(30,  60, 110, 0.95)');
  bodyGrad.addColorStop(0.4, 'rgba(80, 140, 220, 0.90)');
  bodyGrad.addColorStop(0.7, 'rgba(60, 110, 180, 0.90)');
  bodyGrad.addColorStop(1,   'rgba(20,  40,  80, 0.95)');
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, cx - bodyW / 2, baseY - bodyH, bodyW, bodyH, 8);
  ctx.fill();

  // nose cone
  ctx.fillStyle = 'rgba(100, 170, 255, 0.85)';
  ctx.beginPath();
  ctx.moveTo(cx - bodyW / 2, baseY - bodyH);
  ctx.lineTo(cx + bodyW / 2, baseY - bodyH);
  ctx.lineTo(cx, baseY - bodyH - 70);
  ctx.closePath();
  ctx.fill();

  // highlight stripe
  ctx.strokeStyle = 'rgba(160, 220, 255, 0.55)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.moveTo(cx + 6, baseY - bodyH + 12);
  ctx.lineTo(cx + 6, baseY - 18);
  ctx.stroke();

  // fins
  [[cx - bodyW / 2 - 22, -1], [cx + bodyW / 2 + 22, 1]].forEach(([fx, dir]) => {
    ctx.fillStyle = 'rgba(50, 100, 190, 0.80)';
    ctx.beginPath();
    ctx.moveTo(cx + dir * (bodyW / 2), baseY - 40);
    ctx.lineTo(fx, baseY + 10);
    ctx.lineTo(cx + dir * (bodyW / 2), baseY);
    ctx.closePath();
    ctx.fill();
  });

  // porthole
  ctx.beginPath();
  ctx.arc(cx, baseY - bodyH + 55, 11, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10, 200, 255, 0.30)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(80, 200, 255, 0.80)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // glow around rocket — intensified when powered
  const glowR     = powered ? 180 : 120;
  const glowAlpha = powered ? 0.16 : 0.08;
  const glow = ctx.createRadialGradient(cx, baseY - bodyH / 2, 10, cx, baseY - bodyH / 2, glowR);
  glow.addColorStop(0, `rgba(50, 130, 255, ${glowAlpha})`);
  glow.addColorStop(1, 'rgba(50, 130, 255, 0.00)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(cx, baseY - bodyH / 2, glowR, glowR * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  if (powered) {
    // outer power corona
    const corona = ctx.createRadialGradient(cx, baseY - bodyH / 2, glowR * 0.5, cx, baseY - bodyH / 2, glowR * 2.2);
    corona.addColorStop(0, 'rgba(80, 200, 255, 0.06)');
    corona.addColorStop(1, 'rgba(80, 200, 255, 0.00)');
    ctx.fillStyle = corona;
    ctx.beginPath();
    ctx.ellipse(cx, baseY - bodyH / 2, glowR * 2.2, glowR * 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
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

export function drawTerminal(ctx, x, y, label, isNear, t) {
  const w = 68;
  const h = 80;
  const pulse = 0.6 + 0.4 * Math.sin(t * 2.2);

  // outer glow when near
  if (isNear) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 90);
    g.addColorStop(0, `rgba(0, 220, 255, ${(0.18 * pulse).toFixed(2)})`);
    g.addColorStop(1, 'rgba(0, 220, 255, 0.00)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, 90, 70, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // stand
  ctx.fillStyle = 'rgba(30, 55, 100, 0.90)';
  ctx.fillRect(x - 5, y, 10, 30);
  ctx.fillRect(x - 18, y + 26, 36, 8);

  // screen body
  const bodyGrad = ctx.createLinearGradient(x - w / 2, y - h, x + w / 2, y);
  bodyGrad.addColorStop(0, 'rgba(20, 50, 100, 0.95)');
  bodyGrad.addColorStop(1, 'rgba(15, 35, 75,  0.95)');
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, x - w / 2, y - h, w, h, 6);
  ctx.fill();

  // screen border glow
  const borderAlpha = isNear ? (0.55 + 0.45 * pulse).toFixed(2) : '0.30';
  ctx.strokeStyle = `rgba(0, 200, 255, ${borderAlpha})`;
  ctx.lineWidth   = 1.5;
  roundRect(ctx, x - w / 2, y - h, w, h, 6);
  ctx.stroke();

  // screen interior
  const screenGrad = ctx.createLinearGradient(x - w / 2 + 6, y - h + 6, x + w / 2 - 6, y - 6);
  screenGrad.addColorStop(0, 'rgba(0, 60, 100, 0.90)');
  screenGrad.addColorStop(1, 'rgba(0, 30, 60,  0.90)');
  ctx.fillStyle = screenGrad;
  roundRect(ctx, x - w / 2 + 6, y - h + 6, w - 12, h - 12, 4);
  ctx.fill();

  // scan lines
  ctx.fillStyle = 'rgba(0, 200, 255, 0.05)';
  for (let ly = y - h + 8; ly < y - 8; ly += 4) {
    ctx.fillRect(x - w / 2 + 7, ly, w - 14, 2);
  }

  // blinking cursor
  const blink = Math.floor(t * 1.5) % 2 === 0;
  if (blink) {
    ctx.fillStyle = `rgba(0, 220, 255, ${isNear ? '0.9' : '0.55'})`;
    ctx.fillRect(x - 14, y - 20, 8, 2);
  }

  // label
  ctx.fillStyle = `rgba(160, 220, 255, ${isNear ? '0.90' : '0.55'})`;
  ctx.font      = `bold 9px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(label.toUpperCase(), x, y + 42);
}

// ── player (astronaut) ─────────────────────────────────────────────────────

export function drawPlayer(ctx, x, y, vx, t) {
  const bob = Math.sin(t * 6) * (Math.abs(vx) > 10 ? 3 : 1);
  const py  = y + bob;
  const dir = vx > 5 ? 1 : vx < -5 ? -1 : 0;

  // suit body
  const bodyGrad = ctx.createRadialGradient(x, py - 16, 2, x, py - 16, 20);
  bodyGrad.addColorStop(0, 'rgba(120, 170, 230, 0.95)');
  bodyGrad.addColorStop(1, 'rgba(50,  90,  160, 0.95)');
  ctx.fillStyle = bodyGrad;
  roundRect(ctx, x - 14, py - 30, 28, 28, 7);
  ctx.fill();

  // helmet
  ctx.beginPath();
  ctx.arc(x, py - 36, 15, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40, 70, 130, 0.95)';
  ctx.fill();

  // visor
  ctx.beginPath();
  ctx.ellipse(x + dir * 2, py - 36, 9, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10, 190, 255, 0.55)';
  ctx.fill();

  // visor highlight
  ctx.beginPath();
  ctx.ellipse(x + dir * 2 - 2, py - 39, 3, 2, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.60)';
  ctx.fill();

  // legs
  const legSwing = Math.abs(vx) > 8 ? Math.sin(t * 9) * 5 : 0;
  [[-7, legSwing], [7, -legSwing]].forEach(([lx, swing]) => {
    ctx.fillStyle = 'rgba(55, 90, 160, 0.90)';
    ctx.fillRect(x + lx - 4, py - 2, 8, 18 + Math.abs(swing * 0.3));
  });

  // backpack
  ctx.fillStyle = 'rgba(30, 55, 110, 0.85)';
  roundRect(ctx, x - 18, py - 28, 6, 18, 3);
  ctx.fill();
}

// ── background nebula ──────────────────────────────────────────────────────

export function drawBackground(ctx, W, H) {
  // deep space gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0,   '#020818');
  bg.addColorStop(0.55,'#04102a');
  bg.addColorStop(1,   '#060e22');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // nebula blobs
  const nebulae = [
    { x: W * 0.15, y: H * 0.18, rx: 200, ry: 120, r: 'rgba(40,20,90,0.22)' },
    { x: W * 0.80, y: H * 0.10, rx: 180, ry: 100, r: 'rgba(10,50,110,0.20)' },
    { x: W * 0.50, y: H * 0.30, rx: 250, ry: 140, r: 'rgba(20,15,70,0.15)' },
  ];
  nebulae.forEach(({ x, y, rx, ry, r }) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    g.addColorStop(0, r);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });
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
