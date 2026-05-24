import React, { useEffect, useRef, useCallback, useState } from 'react';
import useGameLoop from '../hooks/useGameLoop';

// ─── Timings (seconds) ───────────────────────────────────────────────────────
const DURATION  = 5.2;
const FADE_IN   = 0.55;
const FAULT_T   = 3.1;   // when fault/success overlay appears
const FADE_OUT  = 4.4;   // when black fade begins

// ─── Per-mission data ────────────────────────────────────────────────────────
const SCENE = {
  power_restoration: {
    system:   'POWER SYSTEMS',
    subtitle: 'Primary fault resolved',
    action:   'Repairing power conduits...',
    fault:    ['FAULT DETECTED', 'Fuel system pressure critical'],
    interior: 'power',
    isLast:   false,
    accent:   '#f59e0b',
    accent2:  '#ef4444',
    bg1:      '#04080f',
    bg2:      '#08101e',
  },
  fuel_calculation: {
    system:   'FUEL SYSTEMS',
    subtitle: 'Pressure fault resolved',
    action:   'Recalibrating fuel lines...',
    fault:    ['FAULT DETECTED', 'Navigation matrix corrupted'],
    interior: 'fuel',
    isLast:   false,
    accent:   '#f97316',
    accent2:  '#dc2626',
    bg1:      '#100400',
    bg2:      '#180900',
  },
  nav_calibration: {
    system:   'NAVIGATION',
    subtitle: 'Gyroscopic fault resolved',
    action:   'Recalibrating guidance sensors...',
    fault:    ['FAULT DETECTED', 'Communications array offline'],
    interior: 'nav',
    isLast:   false,
    accent:   '#06b6d4',
    accent2:  '#0ea5e9',
    bg1:      '#020c12',
    bg2:      '#04141e',
  },
  comms_signal: {
    system:   'COMMUNICATIONS',
    subtitle: 'Signal fault resolved',
    action:   'Restoring relay nodes...',
    fault:    ['FAULT DETECTED', 'Diagnostic systems unresponsive'],
    interior: 'comms',
    isLast:   false,
    accent:   '#22c55e',
    accent2:  '#16a34a',
    bg1:      '#020e06',
    bg2:      '#04160a',
  },
  diagnostics_scan: {
    system:   'DIAGNOSTICS',
    subtitle: 'Diagnostic fault resolved',
    action:   'Running full system scan...',
    fault:    ['FAULT DETECTED', 'Engine ignition sequence failure'],
    interior: 'diagnostics',
    isLast:   false,
    accent:   '#818cf8',
    accent2:  '#6366f1',
    bg1:      '#04040e',
    bg2:      '#08081a',
  },
  engine_ignition: {
    system:   'ENGINE CORE',
    subtitle: 'All faults resolved',
    action:   'Aligning ignition coils...',
    fault:    ['ALL SYSTEMS NOMINAL', 'Launch sequence ready'],
    interior: 'engine',
    isLast:   true,
    accent:   '#fb923c',
    accent2:  '#22c55e',
    bg1:      '#0e0300',
    bg2:      '#180500',
  },
};

// ─── Shared canvas helper ─────────────────────────────────────────────────────
function rr(ctx, x, y, w, h, r) {
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

// ─── Robot ───────────────────────────────────────────────────────────────────
function drawRobot(ctx, cx, cy, t, working) {
  const armT = working ? t : 0;

  // Ground shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 4, 30, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Treads
  const treadGrad = ctx.createLinearGradient(cx - 26, cy - 10, cx - 26, cy + 6);
  treadGrad.addColorStop(0, '#374151');
  treadGrad.addColorStop(1, '#111827');
  ctx.fillStyle = treadGrad;
  rr(ctx, cx - 26, cy - 10, 52, 14, 5);
  ctx.fill();
  ctx.strokeStyle = '#4b5563';
  ctx.lineWidth = 1;
  rr(ctx, cx - 26, cy - 10, 52, 14, 5);
  ctx.stroke();
  // Tread track marks
  for (let i = 0; i < 7; i++) {
    const dx = ((i * 7.4 + t * 18) % 52) - 26;
    ctx.fillStyle = '#1f2937';
    rr(ctx, cx + dx - 2, cy - 7, 4, 8, 2);
    ctx.fill();
  }

  // Torso
  const torsoG = ctx.createLinearGradient(cx - 20, cy - 55, cx + 20, cy - 10);
  torsoG.addColorStop(0, '#4b5563');
  torsoG.addColorStop(0.5, '#374151');
  torsoG.addColorStop(1, '#1f2937');
  ctx.fillStyle = torsoG;
  rr(ctx, cx - 20, cy - 58, 40, 48, 6);
  ctx.fill();
  ctx.strokeStyle = '#6b7280';
  ctx.lineWidth = 1;
  rr(ctx, cx - 20, cy - 58, 40, 48, 6);
  ctx.stroke();

  // Chest panel
  rr(ctx, cx - 13, cy - 50, 26, 22, 3);
  ctx.fillStyle = '#111827';
  ctx.fill();
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 0.8;
  ctx.stroke();
  // Status lights on chest
  const lightColors = ['#22c55e', '#f59e0b', '#3b82f6'];
  for (let i = 0; i < 3; i++) {
    const blink = Math.sin(t * (2.5 + i * 0.8) + i * 2.0) > 0.2;
    ctx.fillStyle = blink ? lightColors[i] : '#1f2937';
    if (blink) { ctx.shadowBlur = 6; ctx.shadowColor = lightColors[i]; }
    ctx.beginPath();
    ctx.arc(cx - 8 + i * 8, cy - 38, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  // Vent lines below chest panel
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy - 22 + i * 5);
    ctx.lineTo(cx + 12, cy - 22 + i * 5);
    ctx.stroke();
  }

  // Neck
  ctx.fillStyle = '#374151';
  rr(ctx, cx - 6, cy - 62, 12, 6, 2);
  ctx.fill();

  // Head
  const headG = ctx.createLinearGradient(cx - 16, cy - 80, cx + 16, cy - 62);
  headG.addColorStop(0, '#6b7280');
  headG.addColorStop(1, '#374151');
  ctx.fillStyle = headG;
  rr(ctx, cx - 16, cy - 82, 32, 22, 7);
  ctx.fill();
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 1;
  rr(ctx, cx - 16, cy - 82, 32, 22, 7);
  ctx.stroke();

  // Eye visor (wide horizontal)
  rr(ctx, cx - 11, cy - 76, 22, 8, 4);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  // Eye glow
  const eyePulse = 0.5 + 0.5 * Math.sin(t * 3.2);
  const eyeGrad = ctx.createLinearGradient(cx - 10, cy - 72, cx + 10, cy - 72);
  eyeGrad.addColorStop(0,   `rgba(6,182,212,${eyePulse * 0.4})`);
  eyeGrad.addColorStop(0.5, `rgba(6,182,212,${eyePulse})`);
  eyeGrad.addColorStop(1,   `rgba(6,182,212,${eyePulse * 0.4})`);
  rr(ctx, cx - 10, cy - 75, 20, 6, 3);
  ctx.fillStyle = eyeGrad;
  ctx.fill();
  ctx.shadowBlur = 8 * eyePulse;
  ctx.shadowColor = '#06b6d4';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Antenna
  ctx.strokeStyle = '#6b7280';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx + 8, cy - 82);
  ctx.lineTo(cx + 10, cy - 94);
  ctx.stroke();
  ctx.fillStyle = Math.sin(t * 4) > 0 ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(cx + 10, cy - 95, 3, 0, Math.PI * 2);
  ctx.fill();

  // Left arm (tool arm — reaches toward the work target)
  const shoulderLx = cx - 20;
  const shoulderLy = cy - 48;
  const armSwing   = Math.sin(armT * 2.8) * 0.22;
  const upperAngle = -Math.PI * 0.55 + armSwing;
  const elbowLx    = shoulderLx + Math.cos(upperAngle) * 30;
  const elbowLy    = shoulderLy + Math.sin(upperAngle) * 30;
  const foreSwing  = Math.sin(armT * 3.5 + 0.8) * 0.18;
  const foreAngle  = upperAngle - 0.5 + foreSwing;
  const wristLx    = elbowLx + Math.cos(foreAngle) * 24;
  const wristLy    = elbowLy + Math.sin(foreAngle) * 24;

  // Shoulder joint
  ctx.fillStyle = '#4b5563';
  ctx.beginPath(); ctx.arc(shoulderLx, shoulderLy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(shoulderLx, shoulderLy); ctx.lineTo(elbowLx, elbowLy); ctx.stroke();
  ctx.fillStyle = '#6b7280'; ctx.beginPath(); ctx.arc(elbowLx, elbowLy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(elbowLx, elbowLy); ctx.lineTo(wristLx, wristLy); ctx.stroke();

  // Tool head (wrench-like)
  ctx.fillStyle = '#9ca3af';
  ctx.beginPath(); ctx.arc(wristLx, wristLy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(wristLx, wristLy, 5, 0, Math.PI * 2); ctx.stroke();

  // Welding sparks when working
  if (working && Math.sin(armT * 6) > 0.5) {
    ctx.shadowBlur = 12; ctx.shadowColor = '#fbbf24';
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(wristLx, wristLy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    // Spark particles
    for (let s = 0; s < 4; s++) {
      const sa  = (armT * 7 + s * 1.57) % (Math.PI * 2);
      const sd  = 6 + Math.sin(armT * 11 + s) * 4;
      const sax = wristLx + Math.cos(sa) * sd;
      const say = wristLy + Math.sin(sa) * sd;
      ctx.fillStyle = s % 2 === 0 ? '#fbbf24' : '#f97316';
      ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.arc(sax, say, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Right arm (bracing arm)
  const shoulderRx = cx + 20;
  const shoulderRy = cy - 48;
  const braceAngle = -Math.PI * 0.15 + Math.sin(armT * 1.6) * 0.08;
  const elbowRx    = shoulderRx + Math.cos(braceAngle) * 28;
  const elbowRy    = shoulderRy + Math.sin(braceAngle) * 28;

  ctx.fillStyle = '#4b5563';
  ctx.beginPath(); ctx.arc(shoulderRx, shoulderRy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(shoulderRx, shoulderRy); ctx.lineTo(elbowRx, elbowRy); ctx.stroke();
  ctx.fillStyle = '#6b7280';
  ctx.beginPath(); ctx.arc(elbowRx, elbowRy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 5;
  const gripX = elbowRx + Math.cos(braceAngle + 0.4) * 16;
  const gripY = elbowRy + Math.sin(braceAngle + 0.4) * 16;
  ctx.beginPath(); ctx.moveTo(elbowRx, elbowRy); ctx.lineTo(gripX, gripY); ctx.stroke();
}

// ─── Interior scenes ─────────────────────────────────────────────────────────

function drawPowerInterior(ctx, W, H, t, accent) {
  const floor = H * 0.72;
  // Floor plates
  ctx.fillStyle = '#0d1420';
  ctx.fillRect(0, floor, W, H - floor);
  for (let x = 0; x < W; x += 48) {
    ctx.strokeStyle = '#1a2540'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, floor); ctx.lineTo(x, H); ctx.stroke();
  }

  // Back wall — riveted metal
  ctx.fillStyle = '#07101c';
  ctx.fillRect(0, 0, W, floor);
  for (let ry = 40; ry < floor; ry += 60) {
    for (let rx = 20; rx < W; rx += 60) {
      ctx.fillStyle = '#0e1a2e';
      ctx.beginPath(); ctx.arc(rx, ry, 4, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Main power conduit (horizontal, ceiling)
  const conduitY = H * 0.12;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  ctx.shadowBlur = 18; ctx.shadowColor = accent;
  ctx.beginPath(); ctx.moveTo(0, conduitY); ctx.lineTo(W, conduitY); ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, conduitY); ctx.lineTo(W, conduitY); ctx.stroke();

  // Vertical conduit drops
  const drops = [W * 0.15, W * 0.35, W * 0.55, W * 0.75];
  drops.forEach((dx) => {
    const gy = floor - 10;
    ctx.strokeStyle = '#1e3a5f'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(dx, conduitY); ctx.lineTo(dx, gy); ctx.stroke();
    // Junction box
    ctx.fillStyle = '#0d1b2e';
    rr(ctx, dx - 18, gy - 40, 36, 40, 4);
    ctx.fill();
    ctx.strokeStyle = '#1e3a5f'; ctx.lineWidth = 1.5;
    rr(ctx, dx - 18, gy - 40, 36, 40, 4);
    ctx.stroke();
    const lit = Math.sin(t * 2.8 + dx) > 0;
    ctx.fillStyle = lit ? accent : '#451a03';
    ctx.shadowBlur = lit ? 8 : 0; ctx.shadowColor = accent;
    ctx.beginPath(); ctx.arc(dx, gy - 20, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Sparks arcing from conduit (animated)
  for (let sp = 0; sp < 3; sp++) {
    const spX  = W * 0.28 + sp * W * 0.22;
    const phase = (t * 2.3 + sp * 1.2) % 1;
    if (phase < 0.25) {
      const a = 1 - phase / 0.25;
      ctx.fillStyle = `rgba(251,191,36,${a})`;
      ctx.shadowBlur = 6; ctx.shadowColor = '#fbbf24';
      ctx.beginPath();
      ctx.arc(spX + Math.sin(t * 17) * 4, conduitY + phase * 22, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Wall-mounted cable racks on sides
  for (let cr = 0; cr < 5; cr++) {
    const cry = H * 0.2 + cr * H * 0.1;
    ctx.strokeStyle = '#1e3a5f'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, cry); ctx.lineTo(W * 0.12, cry); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W, cry); ctx.lineTo(W * 0.88, cry); ctx.stroke();
    ctx.fillStyle = cr % 2 === 0 ? '#f59e0b55' : '#ef444455';
    ctx.fillRect(0, cry - 1, W * 0.12, 2);
    ctx.fillRect(W * 0.88, cry - 1, W * 0.12, 2);
  }

  // Focal point: broken conduit junction robot is fixing (center-left)
  const fx = W * 0.42, fy = floor - 55;
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(fx, conduitY + 30); ctx.lineTo(fx, fy); ctx.stroke();
  ctx.fillStyle = '#1e293b';
  rr(ctx, fx - 22, fy - 10, 44, 44, 5); ctx.fill();
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
  rr(ctx, fx - 22, fy - 10, 44, 44, 5); ctx.stroke();
  // Broken wires
  const sparkActive = Math.sin(t * 9) > 0.3;
  if (sparkActive) {
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.shadowBlur = 8; ctx.shadowColor = accent;
    ctx.beginPath();
    ctx.moveTo(fx - 5, fy + 10);
    ctx.lineTo(fx - 5 + Math.sin(t * 23) * 6, fy + 20 + Math.cos(t * 17) * 4);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function drawFuelInterior(ctx, W, H, t, accent) {
  const floor = H * 0.72;
  ctx.fillStyle = '#0d0800'; ctx.fillRect(0, floor, W, H - floor);
  ctx.fillStyle = '#090400'; ctx.fillRect(0, 0, W, floor);

  // Large cylindrical fuel tanks
  const tankPositions = [W * 0.18, W * 0.72];
  tankPositions.forEach((tx, ti) => {
    const ty = H * 0.1; const tw = W * 0.14; const th = H * 0.55;
    const tGrad = ctx.createLinearGradient(tx, ty, tx + tw, ty);
    tGrad.addColorStop(0, '#1c0900');
    tGrad.addColorStop(0.3, '#2d1200');
    tGrad.addColorStop(0.7, '#1c0900');
    tGrad.addColorStop(1, '#0e0500');
    ctx.fillStyle = tGrad;
    rr(ctx, tx, ty, tw, th, tw * 0.5); ctx.fill();
    ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2;
    rr(ctx, tx, ty, tw, th, tw * 0.5); ctx.stroke();
    // Tank dome (top)
    ctx.beginPath();
    ctx.ellipse(tx + tw / 2, ty + tw * 0.35, tw * 0.5, tw * 0.35, 0, Math.PI, 0);
    ctx.fillStyle = '#3d1505'; ctx.fill();
    // Weld rings
    for (let wr = 1; wr <= 3; wr++) {
      ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(tx + tw / 2, ty + wr * th * 0.25, tw * 0.5, 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Pressure gauge
    const gx = tx + tw / 2; const gy = ty + th * 0.6;
    ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(gx, gy, 10, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(gx, gy, 10, 0, Math.PI * 2); ctx.stroke();
    const needleAngle = -Math.PI * 0.8 + (Math.sin(t * 1.5 + ti) * 0.1 + 0.85) * Math.PI * 1.6;
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + Math.cos(needleAngle) * 7, gy + Math.sin(needleAngle) * 7);
    ctx.stroke();
  });

  // Pipe network connecting tanks
  const pipeY1 = H * 0.38; const pipeY2 = H * 0.52;
  [pipeY1, pipeY2].forEach((py) => {
    ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(W * 0.18 + W * 0.14, py); ctx.lineTo(W * 0.72, py); ctx.stroke();
    ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(W * 0.18 + W * 0.14, py); ctx.lineTo(W * 0.72, py); ctx.stroke();
    // Pipe flanges
    for (let fl = W * 0.35; fl < W * 0.72; fl += W * 0.1) {
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(fl - 4, py - 10, 8, 20);
      ctx.strokeStyle = '#9a3412'; ctx.lineWidth = 1;
      ctx.strokeRect(fl - 4, py - 10, 8, 20);
    }
  });

  // Valve at the pipe break (robot's target)
  const vx = W * 0.5, vy = pipeY1 - 5;
  ctx.fillStyle = '#450a0a';
  ctx.beginPath(); ctx.arc(vx, vy, 16, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(vx, vy, 16, 0, Math.PI * 2); ctx.stroke();
  // Valve handle
  const vAngle = t * 0.5;
  ctx.strokeStyle = '#d97706'; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(vx - Math.cos(vAngle) * 18, vy - Math.sin(vAngle) * 18);
  ctx.lineTo(vx + Math.cos(vAngle) * 18, vy + Math.sin(vAngle) * 18);
  ctx.stroke();
  // Leaking fuel (drip animation)
  const drip = (t * 0.8) % 1;
  ctx.fillStyle = `rgba(251,146,60,${0.7 - drip * 0.6})`;
  ctx.beginPath();
  ctx.ellipse(vx + 5, vy + 16 + drip * 30, 3, 5 + drip * 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Floor reflection
  ctx.fillStyle = '#1f0900';
  ctx.fillRect(0, floor, W, H - floor);
  for (let gx2 = 0; gx2 < W; gx2 += 40) {
    ctx.strokeStyle = '#2d0e00'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx2, floor); ctx.lineTo(gx2, H); ctx.stroke();
  }
  // Heat shimmer near floor
  ctx.fillStyle = `rgba(251,146,60,${0.04 + 0.02 * Math.sin(t * 3)})`;
  ctx.fillRect(0, floor - 20, W, 20);
}

function drawNavInterior(ctx, W, H, t, accent) {
  const floor = H * 0.72;
  ctx.fillStyle = '#030c12'; ctx.fillRect(0, 0, W, H);

  // Dome ceiling (star chart)
  const domeGrad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.7);
  domeGrad.addColorStop(0, '#051620');
  domeGrad.addColorStop(1, '#020a10');
  ctx.fillStyle = domeGrad; ctx.fillRect(0, 0, W, floor);

  // Star chart lines on dome
  ctx.strokeStyle = '#0e3a5f44'; ctx.lineWidth = 1;
  const starPts = [[0.2, 0.15], [0.45, 0.08], [0.6, 0.2], [0.35, 0.3], [0.75, 0.12], [0.15, 0.35]];
  for (let i = 0; i < starPts.length; i++) {
    const [ax, ay] = starPts[i];
    const [bx, by] = starPts[(i + 2) % starPts.length];
    ctx.beginPath();
    ctx.moveTo(ax * W, ay * H); ctx.lineTo(bx * W, by * H); ctx.stroke();
  }
  starPts.forEach(([sx, sy]) => {
    ctx.fillStyle = accent; ctx.shadowBlur = 6; ctx.shadowColor = accent;
    ctx.beginPath(); ctx.arc(sx * W, sy * H, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Central gyroscope
  const gx = W / 2, gy = H * 0.4;
  // Outer ring
  ctx.strokeStyle = '#0e4a6a'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(gx, gy, 55, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = accent + '66'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(gx, gy, 55, 0, Math.PI * 2); ctx.stroke();
  // Middle ring (tilted)
  ctx.save();
  ctx.translate(gx, gy);
  ctx.rotate(t * 0.4);
  ctx.scale(1, 0.35);
  ctx.strokeStyle = '#1a6080'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, 55, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  // Inner ring (different axis)
  ctx.save();
  ctx.translate(gx, gy);
  ctx.rotate(t * -0.6 + 1);
  ctx.scale(0.35, 1);
  ctx.strokeStyle = accent; ctx.lineWidth = 3;
  ctx.shadowBlur = 8; ctx.shadowColor = accent;
  ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 2); ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();
  // Gyro core sphere
  const cGrad = ctx.createRadialGradient(gx - 8, gy - 8, 2, gx, gy, 18);
  cGrad.addColorStop(0, '#1e6a8c');
  cGrad.addColorStop(1, '#0a2030');
  ctx.fillStyle = cGrad;
  ctx.beginPath(); ctx.arc(gx, gy, 18, 0, Math.PI * 2); ctx.fill();

  // Navigation console (robot target)
  const cx2 = W * 0.38, cy2 = floor - 30;
  ctx.fillStyle = '#0a1a25';
  rr(ctx, cx2 - 30, cy2 - 45, 60, 50, 6); ctx.fill();
  ctx.strokeStyle = accent + '88'; ctx.lineWidth = 1.5;
  rr(ctx, cx2 - 30, cy2 - 45, 60, 50, 6); ctx.stroke();
  // Screen content (trajectory readout)
  ctx.fillStyle = accent + 'cc'; ctx.font = '8px monospace';
  ['LAT: 28.5°N', 'LON: -80.7°W', 'ALT: 402km', `HDG: ${(Math.sin(t * 0.3) * 5 + 45).toFixed(1)}°`].forEach((line, i) => {
    ctx.fillText(line, cx2 - 26, cy2 - 36 + i * 10);
  });

  // Floor (polished dark metal)
  ctx.fillStyle = '#06101a'; ctx.fillRect(0, floor, W, H - floor);
  const floorRefl = ctx.createLinearGradient(0, floor, 0, H);
  floorRefl.addColorStop(0, '#0e3050' + '33');
  floorRefl.addColorStop(1, 'transparent');
  ctx.fillStyle = floorRefl; ctx.fillRect(0, floor, W, H * 0.15);
}

function drawCommsInterior(ctx, W, H, t, accent) {
  const floor = H * 0.72;
  ctx.fillStyle = '#030a04'; ctx.fillRect(0, 0, W, H);

  // Oscilloscope screens on back wall
  const screens = [W * 0.15, W * 0.5, W * 0.82];
  screens.forEach((sx, si) => {
    const sw = W * 0.16, sh = H * 0.25;
    const sy = H * 0.15;
    // Screen bezel
    ctx.fillStyle = '#0a1a0c';
    rr(ctx, sx - sw / 2, sy, sw, sh, 4); ctx.fill();
    ctx.strokeStyle = '#14400a'; ctx.lineWidth = 2;
    rr(ctx, sx - sw / 2, sy, sw, sh, 4); ctx.stroke();
    // Screen glow
    ctx.fillStyle = '#00180022';
    rr(ctx, sx - sw / 2 + 3, sy + 3, sw - 6, sh - 6, 3); ctx.fill();
    // Signal waveform
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4; ctx.shadowColor = accent;
    ctx.beginPath();
    for (let wx = 0; wx < sw - 10; wx += 2) {
      const wy = sh / 2 + Math.sin((wx * 0.15 + t * (2 + si * 0.7)) * Math.PI * 2) * (sh * 0.25 * (0.5 + 0.5 * Math.sin(t * 0.8 + si)));
      if (wx === 0) ctx.moveTo(sx - sw / 2 + 5 + wx, sy + wy);
      else ctx.lineTo(sx - sw / 2 + 5 + wx, sy + wy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Screen label
    ctx.fillStyle = accent + '99'; ctx.font = '7px monospace';
    ctx.fillText(['SIG-A', 'SIG-B', 'SIG-C'][si], sx - 12, sy + sh - 5);
  });

  // Cable racks along ceiling
  for (let cr = W * 0.1; cr < W * 0.9; cr += 40) {
    ctx.strokeStyle = '#1a3a1e'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cr, 0); ctx.lineTo(cr + Math.sin(t * 0.3 + cr * 0.01) * 4, H * 0.45); ctx.stroke();
  }

  // Signal relay boxes (left wall)
  for (let rb = 0; rb < 4; rb++) {
    const rbx = W * 0.04, rby = H * 0.15 + rb * H * 0.12;
    ctx.fillStyle = '#0d1f0f';
    rr(ctx, rbx, rby, 42, 34, 4); ctx.fill();
    ctx.strokeStyle = '#1a401e'; ctx.lineWidth = 1;
    rr(ctx, rbx, rby, 42, 34, 4); ctx.stroke();
    const pulse = Math.sin(t * 3.5 + rb * 1.1) > 0;
    ctx.fillStyle = pulse ? accent : '#14400a';
    ctx.shadowBlur = pulse ? 8 : 0; ctx.shadowColor = accent;
    ctx.beginPath(); ctx.arc(rbx + 21, rby + 17, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    // Signal line from relay
    const sigAnim = (t * 80 + rb * 30) % (W * 0.86);
    ctx.strokeStyle = accent + '55'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rbx + 42, rby + 17);
    ctx.lineTo(Math.min(rbx + 42 + sigAnim, W * 0.9), rby + 17);
    ctx.stroke();
  }

  // Robot target: disconnected cable junction
  const jx = W * 0.42, jy = floor - 50;
  ctx.fillStyle = '#0d2010';
  rr(ctx, jx - 24, jy - 20, 48, 45, 5); ctx.fill();
  ctx.strokeStyle = '#22c55e55'; ctx.lineWidth = 1.5;
  rr(ctx, jx - 24, jy - 20, 48, 45, 5); ctx.stroke();
  // Dangling cable end
  const wobble = Math.sin(t * 4) * 6;
  ctx.strokeStyle = '#374151'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(jx - 8, jy - 25);
  ctx.quadraticCurveTo(jx - 8 + wobble, jy, jx - 8 + wobble * 0.5, jy + 15);
  ctx.stroke();
  // Connector head (blinking)
  ctx.fillStyle = Math.sin(t * 6) > 0 ? accent : '#14400a';
  ctx.shadowBlur = 6; ctx.shadowColor = accent;
  ctx.beginPath(); ctx.arc(jx - 8 + wobble * 0.5, jy + 16, 5, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;

  // Floor
  ctx.fillStyle = '#030a04'; ctx.fillRect(0, floor, W, H - floor);
}

function drawDiagnosticsInterior(ctx, W, H, t, accent) {
  const floor = H * 0.72;
  ctx.fillStyle = '#040410'; ctx.fillRect(0, 0, W, H);

  // Grid floor
  ctx.fillStyle = '#070718'; ctx.fillRect(0, floor, W, H - floor);
  for (let gx = 0; gx < W; gx += 36) {
    ctx.strokeStyle = '#10103a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx, floor); ctx.lineTo(gx, H); ctx.stroke();
  }
  for (let gy = floor; gy < H; gy += 36) {
    ctx.strokeStyle = '#10103a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  }

  // Holographic readout panels (floating mid-air)
  const panels = [
    { x: W * 0.15, y: H * 0.2, w: W * 0.18, h: H * 0.35 },
    { x: W * 0.68, y: H * 0.2, w: W * 0.18, h: H * 0.35 },
  ];
  panels.forEach((p, pi) => {
    // Holographic shimmer
    ctx.globalAlpha = 0.85 + 0.08 * Math.sin(t * 2 + pi);
    ctx.fillStyle = '#0a0a2e';
    rr(ctx, p.x, p.y, p.w, p.h, 6); ctx.fill();
    ctx.strokeStyle = accent + '88'; ctx.lineWidth = 1.5;
    rr(ctx, p.x, p.y, p.w, p.h, 6); ctx.stroke();
    ctx.globalAlpha = 1;
    // Scan lines
    for (let sl = 0; sl < p.h - 10; sl += 12) {
      const a = 0.2 + 0.15 * Math.sin(t * 3 + sl * 0.1 + pi);
      ctx.fillStyle = `rgba(129,140,248,${a})`;
      ctx.fillRect(p.x + 4, p.y + 6 + sl, p.w - 8, 3);
    }
    // Scrolling data text
    const dataLines = ['SYS.CHECK', 'MEM: 94%', 'TEMP: 312K', 'FLUX: 0.87', 'ERR: 0x3F', 'RETRY...'];
    ctx.fillStyle = accent; ctx.font = '8px monospace';
    const offset = Math.floor(t * 3 + pi * 3) % dataLines.length;
    for (let li = 0; li < Math.min(5, Math.floor(p.h / 14)); li++) {
      const lineAlpha = 0.4 + 0.6 * Math.sin(t + li);
      ctx.globalAlpha = lineAlpha;
      ctx.fillText(dataLines[(offset + li) % dataLines.length], p.x + 6, p.y + 16 + li * 14);
    }
    ctx.globalAlpha = 1;
    // Panel header
    ctx.fillStyle = accent; ctx.font = '9px monospace';
    ctx.fillText(`MODULE-${pi + 1}`, p.x + 6, p.y + 10);
  });

  // Diagnostic bed (center)
  const bx = W * 0.5, by = H * 0.5;
  ctx.fillStyle = '#0d0d22';
  rr(ctx, bx - 40, by - 15, 80, 30, 4); ctx.fill();
  ctx.strokeStyle = accent + '66'; ctx.lineWidth = 1.5;
  rr(ctx, bx - 40, by - 15, 80, 30, 4); ctx.stroke();
  // Scanner beam (horizontal sweep)
  const scanX = bx - 35 + ((t * 40) % 70);
  const beamGrad = ctx.createLinearGradient(scanX - 6, by - 14, scanX + 6, by - 14);
  beamGrad.addColorStop(0, 'transparent');
  beamGrad.addColorStop(0.5, accent + 'cc');
  beamGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(scanX - 6, by - 14, 12, 28);

  // Circuit board (robot target)
  const cbx = W * 0.42, cby = floor - 50;
  ctx.fillStyle = '#0a1628';
  rr(ctx, cbx - 28, cby - 22, 56, 46, 4); ctx.fill();
  ctx.strokeStyle = accent + '55'; ctx.lineWidth = 1;
  rr(ctx, cbx - 28, cby - 22, 56, 46, 4); ctx.stroke();
  // Circuit traces
  ctx.strokeStyle = accent + '66'; ctx.lineWidth = 1;
  [[cbx - 20, cby - 15, cbx + 5, cby - 15], [cbx + 5, cby - 15, cbx + 5, cby], [cbx + 5, cby, cbx + 20, cby]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });
  // Faulty chip (blinking red)
  ctx.fillStyle = Math.sin(t * 7) > 0 ? '#ef4444' : '#1f0606';
  ctx.shadowBlur = Math.sin(t * 7) > 0 ? 8 : 0; ctx.shadowColor = '#ef4444';
  rr(ctx, cbx - 8, cby - 8, 16, 14, 2); ctx.fill();
  ctx.shadowBlur = 0;
}

function drawEngineInterior(ctx, W, H, t, accent, isLast, faultPhase) {
  const floor = H * 0.72;
  ctx.fillStyle = isLast && faultPhase ? '#000800' : '#0a0200';
  ctx.fillRect(0, 0, W, H);

  // Engine chamber walls (cylindrical interior perspective)
  const cw = W * 0.65;
  const wallGrad = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, W * 0.5);
  wallGrad.addColorStop(0, isLast && faultPhase ? '#001200' : '#180800');
  wallGrad.addColorStop(0.7, isLast && faultPhase ? '#000a00' : '#0d0400');
  wallGrad.addColorStop(1, '#000000');
  ctx.fillStyle = wallGrad;
  ctx.beginPath();
  ctx.ellipse(W / 2, H * 0.5, cw / 2, H * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Injector plate (top of chamber)
  const injY = H * 0.12;
  ctx.fillStyle = '#1a0a00';
  ctx.beginPath();
  ctx.ellipse(W / 2, injY, cw / 2, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  // Injector nozzles
  const nozzleCount = 8;
  for (let ni = 0; ni < nozzleCount; ni++) {
    const angle = (ni / nozzleCount) * Math.PI * 2;
    const nr = cw / 2 * 0.55;
    const nx = W / 2 + Math.cos(angle) * nr;
    const ny = injY + Math.sin(angle) * 12;
    const nlit = isLast && faultPhase ? true : Math.sin(t * 4 + ni) > 0.2;
    ctx.fillStyle = nlit ? (isLast && faultPhase ? '#22c55e' : '#f97316') : '#3d1505';
    ctx.shadowBlur = nlit ? 8 : 0;
    ctx.shadowColor = isLast && faultPhase ? '#22c55e' : '#f97316';
    ctx.beginPath(); ctx.arc(nx, ny, 6, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Chamber wall ribs
  for (let ri = 0; ri < 6; ri++) {
    const ry = H * 0.2 + ri * H * 0.08;
    ctx.strokeStyle = '#2d1000'; ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(W / 2, ry, cw / 2 * 0.92, 12, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#451500'; ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Heat glow on chamber floor
  const heatAmt = isLast && faultPhase ? 0.08 : 0.18 + 0.08 * Math.sin(t * 2);
  ctx.fillStyle = `rgba(251,146,60,${heatAmt})`;
  ctx.beginPath();
  ctx.ellipse(W / 2, floor - 10, cw / 2 * 0.6, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  // Turbopump (right side)
  const tpx = W * 0.74, tpy = H * 0.45;
  ctx.fillStyle = '#1c0800';
  ctx.beginPath(); ctx.arc(tpx, tpy, 35, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(tpx, tpy, 35, 0, Math.PI * 2); ctx.stroke();
  // Spinning turbine blades
  ctx.save();
  ctx.translate(tpx, tpy);
  ctx.rotate(t * 6);
  for (let b = 0; b < 6; b++) {
    ctx.rotate(Math.PI / 3);
    ctx.fillStyle = '#451500';
    rr(ctx, 5, -4, 22, 8, 3); ctx.fill();
  }
  ctx.restore();

  // Ignition coil (robot target)
  const icx = W * 0.42, icy = floor - 60;
  ctx.fillStyle = '#2d1000';
  ctx.beginPath(); ctx.arc(icx, icy, 20, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = isLast && faultPhase ? '#22c55e' : accent;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 12;
  ctx.shadowColor = isLast && faultPhase ? '#22c55e' : accent;
  ctx.beginPath(); ctx.arc(icx, icy, 20, 0, Math.PI * 2); ctx.stroke();
  ctx.shadowBlur = 0;
  // Coil spirals
  for (let ci = 0; ci < 4; ci++) {
    ctx.strokeStyle = isLast && faultPhase ? '#22c55e88' : accent + '88';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(icx, icy, 8 + ci * 3, -Math.PI / 2 + t * (ci % 2 === 0 ? 1.5 : -1.5), Math.PI / 2 + t * (ci % 2 === 0 ? 1.5 : -1.5));
    ctx.stroke();
  }

  // Floor
  ctx.fillStyle = '#0a0200'; ctx.fillRect(0, floor, W, H - floor);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MissionCutscene({ missionId, onDone }) {
  const scene = SCENE[missionId];
  const canvasRef = useRef(null);
  const timeRef   = useRef(0);
  const doneRef   = useRef(false);
  const sizeRef   = useRef({ W: 1, H: 1 });
  const [skipped, setSkipped] = useState(false);

  const doFinish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone?.();
  }, [onDone]);

  // Skip on click/tap
  const handleSkip = useCallback(() => {
    setSkipped(true);
    setTimeout(doFinish, 400);
  }, [doFinish]);

  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      canvas.width = W; canvas.height = H;
      sizeRef.current = { W, H };
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const tick = useCallback((delta) => {
    if (doneRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas || !scene) return;
    const ctx      = canvas.getContext('2d');
    const { W, H } = sizeRef.current;

    timeRef.current += delta;
    const t = timeRef.current;

    // Auto-finish
    if (t >= DURATION && !doneRef.current) {
      doneRef.current = true;
      setTimeout(doFinish, 50);
      return;
    }

    // ── Draw interior background
    const faultPhase = t >= FAULT_T;
    if (scene.interior === 'engine') {
      drawEngineInterior(ctx, W, H, t, scene.accent, scene.isLast, faultPhase && scene.isLast);
    } else {
      // Generic bg
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, scene.bg1);
      bg.addColorStop(1, scene.bg2);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      if (scene.interior === 'power')       drawPowerInterior(ctx, W, H, t, scene.accent);
      else if (scene.interior === 'fuel')   drawFuelInterior(ctx, W, H, t, scene.accent);
      else if (scene.interior === 'nav')    drawNavInterior(ctx, W, H, t, scene.accent);
      else if (scene.interior === 'comms')  drawCommsInterior(ctx, W, H, t, scene.accent);
      else if (scene.interior === 'diagnostics') drawDiagnosticsInterior(ctx, W, H, t, scene.accent);
    }

    // ── Robot (positioned bottom-center-left, facing the work target)
    const robotX = W * 0.46;
    const robotY = H * 0.72 - 4;
    drawRobot(ctx, robotX, robotY, t, !faultPhase);

    // ── Cinematic letterbox bars
    const letterH = H * 0.1;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, letterH);
    ctx.fillRect(0, H - letterH, W, letterH);

    // ── System title (top)
    const titleAlpha = Math.min(1, t / FADE_IN);
    ctx.globalAlpha = titleAlpha;
    ctx.fillStyle = scene.accent;
    ctx.font = `bold ${Math.round(W * 0.022)}px 'Courier New', monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(scene.system, W * 0.04, letterH * 0.62);
    ctx.fillStyle = '#ffffff88';
    ctx.font = `${Math.round(W * 0.016)}px 'Courier New', monospace`;
    ctx.fillText('SYSTEM REPAIR IN PROGRESS', W * 0.04, letterH * 0.88);
    ctx.globalAlpha = 1;

    // ── Action text (bottom bar)
    if (t < FAULT_T) {
      const actionAlpha = Math.min(1, (t - 0.3) / 0.4);
      if (actionAlpha > 0) {
        ctx.globalAlpha = actionAlpha;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(W * 0.018)}px 'Courier New', monospace`;
        ctx.textAlign = 'left';
        const charCount = Math.floor((t - 0.3) * 18);
        ctx.fillText(scene.action.slice(0, charCount), W * 0.04, H - letterH * 0.35);
        ctx.globalAlpha = 1;
      }
    }

    // ── Fault / success overlay
    if (faultPhase) {
      const faultAlpha = Math.min(1, (t - FAULT_T) / 0.45);

      if (!scene.isLast) {
        // Fault: red alarm overlay
        ctx.fillStyle = `rgba(220,38,38,${faultAlpha * 0.18})`;
        ctx.fillRect(0, letterH, W, H - letterH * 2);

        // Alarm flash border
        const flashPulse = Math.sin((t - FAULT_T) * Math.PI * 5) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(220,38,38,${faultAlpha * flashPulse * 0.9})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(3, letterH + 3, W - 6, H - letterH * 2 - 6);

        // Fault text
        ctx.globalAlpha = faultAlpha;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ef4444';
        ctx.font = `bold ${Math.round(W * 0.028)}px 'Courier New', monospace`;
        ctx.shadowBlur = 12; ctx.shadowColor = '#ef4444';
        ctx.fillText(scene.fault[0], W / 2, H * 0.5 - 14);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(W * 0.018)}px 'Courier New', monospace`;
        ctx.fillText(scene.fault[1], W / 2, H * 0.5 + 14);
        ctx.globalAlpha = 1;
      } else {
        // All systems nominal: green success overlay
        ctx.fillStyle = `rgba(34,197,94,${faultAlpha * 0.12})`;
        ctx.fillRect(0, letterH, W, H - letterH * 2);

        ctx.globalAlpha = faultAlpha;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#22c55e';
        ctx.font = `bold ${Math.round(W * 0.028)}px 'Courier New', monospace`;
        ctx.shadowBlur = 16; ctx.shadowColor = '#22c55e';
        ctx.fillText(scene.fault[0], W / 2, H * 0.5 - 14);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(W * 0.018)}px 'Courier New', monospace`;
        ctx.fillText(scene.fault[1], W / 2, H * 0.5 + 14);
        ctx.globalAlpha = 1;
      }
    }

    // ── Fade in from black
    if (t < FADE_IN) {
      ctx.fillStyle = `rgba(0,0,0,${1 - t / FADE_IN})`;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Fade out to black
    if (t > FADE_OUT) {
      const fo = Math.min(1, (t - FADE_OUT) / (DURATION - FADE_OUT));
      ctx.fillStyle = `rgba(0,0,0,${fo})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Skip fade (when user taps skip)
    if (skipped) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, W, H);
    }

    ctx.textAlign = 'left';
  }, [scene, doFinish, skipped]);

  useGameLoop(tick);

  if (!scene) return null;

  return (
    <div
      style={{
        position:  'absolute', inset: 0,
        zIndex:    600,
        cursor:    'pointer',
        userSelect: 'none',
      }}
      onClick={handleSkip}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{
        position: 'absolute', bottom: '12%', right: '4%',
        color: '#ffffff66', fontSize: '11px', fontFamily: 'monospace',
        letterSpacing: '0.1em', pointerEvents: 'none',
      }}>
        TAP TO SKIP
      </div>
    </div>
  );
}
