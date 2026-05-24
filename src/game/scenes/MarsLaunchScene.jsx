import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGameLoop } from '../hooks';
import { startSpaceAmbient } from '../systems/audioSystem';

// ── Constants ──────────────────────────────────────────────────────────────────
const STAR_COUNT        = 300;
const EARTH_MARS_KM     = 225_000_000;
const EMERGE_DURATION   = 4.0;
const ORBIT_DURATION    = 5.5;
const APPROACH_DURATION = 10.0;
const TRANSIT_CINEMATIC = 60;
const TRANSIT_REALTIME  = 240;
const TRANSIT_WATCH     = 90;

// ── Pure helpers ───────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

function initStars(count, W, H) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.7 + 0.2,
    base: Math.random() * 0.65 + 0.35,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 1.2 + 0.4,
  }));
}

function fmtKm(km) {
  const v = Math.max(0, km);
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M km`;
  if (v >= 1_000)     return `${(v / 1_000).toFixed(0)}k km`;
  return `${v.toFixed(0)} km`;
}

function fmtTime(secs) {
  const s   = Math.floor(Math.max(0, secs));
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ── Canvas draw helpers ────────────────────────────────────────────────────────
function drawSpaceBg(ctx, W, H) {
  // Nebula blobs for depth
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#020512');
  bg.addColorStop(1, '#020818');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const nebulae = [
    { x: W * 0.12, y: H * 0.20, rx: 220, ry: 130, c: 'rgba(30,15,80,0.18)' },
    { x: W * 0.82, y: H * 0.12, rx: 180, ry: 100, c: 'rgba(8,40,100,0.16)' },
    { x: W * 0.55, y: H * 0.75, rx: 240, ry: 130, c: 'rgba(20,12,65,0.14)' },
  ];
  nebulae.forEach(({ x, y, rx, ry, c }) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    g.addColorStop(0, c);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawStarField(ctx, stars, t, alpha) {
  if (alpha < 0.01) return;
  stars.forEach((s) => {
    const tw = 0.6 + 0.4 * Math.sin(s.phase + t * s.speed);
    const a  = Math.min(1, alpha * s.base * tw);
    if (a < 0.01) return;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210,235,255,${a.toFixed(3)})`;
    ctx.fill();
  });
}

function drawPlanet(ctx, cx, cy, r, inner, outer, atmosColor) {
  if (r < 1) return;
  const g = ctx.createRadialGradient(
    cx - r * 0.35, cy - r * 0.35, r * 0.04,
    cx, cy, r
  );
  g.addColorStop(0,    inner);
  g.addColorStop(0.65, outer);
  g.addColorStop(1,    'rgba(0,0,0,0.95)');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();

  if (atmosColor) {
    const a = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.24);
    a.addColorStop(0, atmosColor);
    a.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.24, 0, Math.PI * 2);
    ctx.fillStyle = a;
    ctx.fill();
  }
}

function drawEarth(ctx, cx, cy, r, t) {
  if (r < 1) return;

  // Base ocean
  const oceanG = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
  oceanG.addColorStop(0,    'rgba(90,170,255,0.97)');
  oceanG.addColorStop(0.45, 'rgba(40,110,210,0.96)');
  oceanG.addColorStop(0.80, 'rgba(12,55,145,0.95)');
  oceanG.addColorStop(1,    'rgba(0,0,0,0.96)');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = oceanG;
  ctx.fill();

  if (r < 7) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // continent rotation drift
  const drift = t * 0.008;

  // Landmasses — more detailed shapes rotated by drift
  const lands = [
    // North America
    { ox: -0.22 + drift, oy: -0.18, rx: 0.26, ry: 0.22, rot: 0.2 },
    // South America
    { ox: -0.12 + drift, oy:  0.24, rx: 0.14, ry: 0.20, rot: 0.1 },
    // Europe/Africa
    { ox:  0.18 + drift, oy: -0.05, rx: 0.16, ry: 0.32, rot: -0.1 },
    // Asia
    { ox:  0.32 + drift, oy: -0.22, rx: 0.30, ry: 0.22, rot: 0.15 },
    // Australia
    { ox:  0.40 + drift, oy:  0.28, rx: 0.12, ry: 0.10, rot: 0.05 },
    // Antarctica hint
    { ox:  0.00 + drift, oy:  0.60, rx: 0.50, ry: 0.12, rot: 0.0 },
  ];
  lands.forEach(({ ox, oy, rx, ry, rot }) => {
    ctx.save();
    ctx.translate(cx + ox * r, cy + oy * r);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * r, ry * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(48,148,72,0.55)';
    ctx.fill();
    ctx.restore();
  });
  // subtle terrain variation
  lands.slice(0, 4).forEach(({ ox, oy, rx, ry, rot }) => {
    ctx.save();
    ctx.translate(cx + ox * r, cy + oy * r);
    ctx.rotate(rot + 0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * r * 0.55, ry * r * 0.55, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(62,120,52,0.25)';
    ctx.fill();
    ctx.restore();
  });

  // polar ice caps
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.88, r * 0.30, r * 0.14, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(230,240,255,0.65)';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.92, r * 0.22, r * 0.09, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(220,235,255,0.50)';
  ctx.fill();

  // animated cloud layer (rotates faster)
  if (r > 25) {
    const cloudDrift = t * 0.025;
    ctx.globalAlpha = 0.22;
    // main cloud bands
    [
      { oy: -0.28, rx: 0.78, ry: 0.07 },
      { oy:  0.05, rx: 0.88, ry: 0.055 },
      { oy:  0.32, rx: 0.70, ry: 0.065 },
    ].forEach(({ oy, rx, ry }) => {
      ctx.beginPath();
      ctx.ellipse(cx + cloudDrift * r * 0.2, cy + oy * r, rx * r, ry * r, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.90)';
      ctx.fill();
    });
    // discrete cloud puffs
    if (r > 45) {
      [
        [-0.30, -0.42], [0.10, -0.38], [0.50, -0.30],
        [-0.45,  0.18], [0.35,  0.22], [-0.15, 0.45],
      ].forEach(([ox, oy]) => {
        ctx.beginPath();
        ctx.ellipse(cx + (ox + cloudDrift * 0.3) * r, cy + oy * r, r * 0.11, r * 0.05, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      });
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();

  // atmosphere limb glow
  const atmos = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.30);
  atmos.addColorStop(0,    'rgba(60,140,255,0.00)');
  atmos.addColorStop(0.35, 'rgba(60,140,255,0.20)');
  atmos.addColorStop(0.70, 'rgba(30,80,200,0.12)');
  atmos.addColorStop(1,    'rgba(0,0,0,0.00)');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.30, 0, Math.PI * 2);
  ctx.fillStyle = atmos;
  ctx.fill();
}

function drawMars(ctx, cx, cy, r, t) {
  if (r < 1) return;

  const marsG = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.04, cx, cy, r);
  marsG.addColorStop(0,    'rgba(228,112,52,0.97)');
  marsG.addColorStop(0.30, 'rgba(195,78,30,0.96)');
  marsG.addColorStop(0.65, 'rgba(155,45,10,0.95)');
  marsG.addColorStop(0.90, 'rgba(110,28,5,0.96)');
  marsG.addColorStop(1,    'rgba(0,0,0,0.97)');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = marsG;
  ctx.fill();

  if (r < 7) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // terrain patches
  [
    { ox:  0.20, oy: -0.10, rx: 0.38, ry: 0.28, c: 'rgba(175,55,18,0.30)' },
    { ox: -0.30, oy:  0.20, rx: 0.25, ry: 0.20, c: 'rgba(240,130,60,0.18)' },
    { ox:  0.10, oy:  0.30, rx: 0.32, ry: 0.18, c: 'rgba(160,42,8,0.25)'  },
    { ox: -0.15, oy: -0.30, rx: 0.22, ry: 0.16, c: 'rgba(200,80,28,0.20)' },
  ].forEach(({ ox, oy, rx, ry, c }) => {
    ctx.beginPath();
    ctx.ellipse(cx + ox * r, cy + oy * r, rx * r, ry * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });

  // Valles Marineris canyon system
  if (r > 20) {
    ctx.save();
    ctx.translate(cx + r * 0.06, cy + r * 0.04);
    ctx.rotate(-0.14);
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.55, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(90,18,2,0.38)';
    ctx.fill();
    if (r > 40) {
      ctx.strokeStyle = 'rgba(75,12,0,0.28)';
      ctx.lineWidth = r * 0.015;
      [-0.04, 0, 0.04].forEach((dy) => {
        ctx.beginPath();
        ctx.moveTo(-r * 0.52, dy * r * 0.8);
        ctx.lineTo(r * 0.52, dy * r * 0.8);
        ctx.stroke();
      });
    }
    ctx.restore();
  }

  // Olympus Mons
  if (r > 45) {
    const vmx = cx - r * 0.30, vmy = cy - r * 0.12, vr = r * 0.13;
    const vmG = ctx.createRadialGradient(vmx, vmy, 0, vmx, vmy, vr);
    vmG.addColorStop(0,   'rgba(210,90,35,0.55)');
    vmG.addColorStop(0.5, 'rgba(185,65,20,0.35)');
    vmG.addColorStop(1,   'rgba(165,50,12,0.00)');
    ctx.beginPath();
    ctx.arc(vmx, vmy, vr, 0, Math.PI * 2);
    ctx.fillStyle = vmG;
    ctx.fill();
    if (r > 65) {
      ctx.beginPath();
      ctx.arc(vmx, vmy, vr * 0.20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80,15,2,0.55)';
      ctx.fill();
    }
  }

  // Hellas Planitia basin
  if (r > 38) {
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.28, cy + r * 0.38, r * 0.20, r * 0.14, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(90,20,4,0.32)';
    ctx.fill();
  }

  // north polar ice cap
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.82, r * 0.26, r * 0.15, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(235,230,225,0.62)';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.82, r * 0.26, r * 0.15, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,195,188,0.40)';
  ctx.lineWidth = r * 0.018;
  ctx.stroke();

  // south polar cap
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.85, r * 0.16, r * 0.08, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(220,215,210,0.48)';
  ctx.fill();

  // dust storm haze
  const dustA = 0.08 + 0.04 * Math.sin(t * 0.4);
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.10, cy + r * 0.15, r * 0.60, r * 0.22, 0.2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(215,120,50,${dustA.toFixed(3)})`;
  ctx.fill();

  ctx.restore();

  // thin CO2 atmosphere haze
  const marsAtmos = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.18);
  marsAtmos.addColorStop(0,    'rgba(200,80,30,0.00)');
  marsAtmos.addColorStop(0.40, 'rgba(200,80,30,0.12)');
  marsAtmos.addColorStop(0.75, 'rgba(180,60,20,0.06)');
  marsAtmos.addColorStop(1,    'rgba(0,0,0,0.00)');
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
  ctx.fillStyle = marsAtmos;
  ctx.fill();
}

function drawTinyRocket(ctx, cx, cy, alpha, scale) {
  if (alpha < 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // exhaust flame
  const fl = ctx.createRadialGradient(0, 8, 0, 0, 18, 14);
  fl.addColorStop(0,   'rgba(255,255,200,0.95)');
  fl.addColorStop(0.3, 'rgba(255,180,40,0.75)');
  fl.addColorStop(0.6, 'rgba(200,60,10,0.40)');
  fl.addColorStop(1,   'rgba(140,20,160,0.00)');
  ctx.fillStyle = fl;
  ctx.beginPath();
  ctx.ellipse(0, 12, 5, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // engine bell
  ctx.fillStyle = '#555560';
  ctx.beginPath();
  ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
  ctx.lineTo(5.5, 6); ctx.lineTo(-5.5, 6);
  ctx.closePath();
  ctx.fill();

  // fins
  [[-1, -4], [1, 4]].forEach(([dir, fx]) => {
    ctx.fillStyle = 'rgba(215,218,230,0.90)';
    ctx.beginPath();
    ctx.moveTo(fx, -12);
    ctx.lineTo(fx + dir * 8, 4);
    ctx.lineTo(fx + dir * 2, 4);
    ctx.lineTo(fx, -6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(210,38,28,0.75)';
    ctx.beginPath();
    ctx.moveTo(fx, -6);
    ctx.lineTo(fx + dir * 2, 4);
    ctx.lineTo(fx + dir * 5, 4);
    ctx.lineTo(fx, 0);
    ctx.closePath();
    ctx.fill();
  });

  // body
  const bg = ctx.createLinearGradient(-5, 0, 5, 0);
  bg.addColorStop(0,    'rgba(165,170,185,0.95)');
  bg.addColorStop(0.35, 'rgba(235,240,250,0.97)');
  bg.addColorStop(0.65, 'rgba(240,245,255,0.97)');
  bg.addColorStop(1,    'rgba(145,150,165,0.93)');
  ctx.fillStyle = bg;
  ctx.fillRect(-4.5, -22, 9, 22);

  // red accent bands
  ctx.fillStyle = 'rgba(210,38,28,0.82)';
  ctx.fillRect(-4.5, -22, 9, 4);
  ctx.fillRect(-4.5, -10, 9, 3);

  // nose cone
  const ng = ctx.createLinearGradient(-4.5, -22, 4.5, -22);
  ng.addColorStop(0,    'rgba(155,158,175,0.92)');
  ng.addColorStop(0.5,  'rgba(235,240,250,0.96)');
  ng.addColorStop(1,    'rgba(140,143,158,0.90)');
  ctx.fillStyle = ng;
  ctx.beginPath();
  ctx.moveTo(-4.5, -22); ctx.lineTo(4.5, -22); ctx.lineTo(0, -34);
  ctx.closePath();
  ctx.fill();

  // porthole
  ctx.beginPath();
  ctx.arc(0, -14, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(40,180,255,0.35)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,210,255,0.70)';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

function drawOrbitPath(ctx, cx, cy, rx, ry, angle, t) {
  const pulse = 0.55 + 0.45 * Math.sin(t * 1.8);
  ctx.save();
  ctx.strokeStyle = `rgba(0,200,255,${(0.28 * pulse).toFixed(3)})`;
  ctx.lineWidth   = 1.2;
  ctx.setLineDash([5, 6]);
  ctx.lineDashOffset = -(t * 15) % 11;
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawTrajectory(ctx, ex, ey, mx, my, progress, t) {
  const pulse = 0.70 + 0.30 * Math.sin(t * 2.5);
  const cpx   = (ex + mx) / 2;
  const cpy   = Math.min(ey, my) - 55;

  ctx.save();
  // soft glow
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.quadraticCurveTo(cpx, cpy, mx, my);
  ctx.strokeStyle = `rgba(0,200,255,${(0.08 * pulse).toFixed(3)})`;
  ctx.lineWidth   = 10;
  ctx.setLineDash([]);
  ctx.stroke();
  // dashed line
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.quadraticCurveTo(cpx, cpy, mx, my);
  ctx.strokeStyle   = `rgba(0,190,255,${(0.55 * pulse).toFixed(3)})`;
  ctx.lineWidth     = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.lineDashOffset = -(t * 18) % 10;
  ctx.stroke();
  ctx.setLineDash([]);
  // travel dot (quadratic interpolation)
  const p  = Math.max(0, Math.min(1, progress));
  const dx = (1-p)*(1-p)*ex + 2*(1-p)*p*cpx + p*p*mx;
  const dy = (1-p)*(1-p)*ey + 2*(1-p)*p*cpy + p*p*my;
  const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 18);
  dg.addColorStop(0, `rgba(0,230,255,${(0.45*pulse).toFixed(3)})`);
  dg.addColorStop(1, 'rgba(0,230,255,0)');
  ctx.fillStyle = dg;
  ctx.beginPath();
  ctx.arc(dx, dy, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(dx, dy, 4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,255,255,${(0.95*pulse).toFixed(3)})`;
  ctx.fill();
  ctx.restore();
}

function drawSpeedLines(ctx, W, H, alpha, t) {
  if (alpha < 0.02) return;
  ctx.save();
  ctx.strokeStyle = `rgba(150,215,255,${(alpha * 0.30).toFixed(3)})`;
  ctx.lineWidth   = 0.8;
  for (let i = 0; i < 50; i++) {
    const seed = i * 2.618;
    const baseY = (seed * 39.1) % H;
    const speed = 55 + (i % 5) * 22;
    const y   = (baseY + t * speed) % H;
    const len = 20 + (i % 4) * 38;
    const x   = (seed * 22.7) % W;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - len, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCanvasLabel(ctx, x, y, text, alpha, align = 'center') {
  if (alpha < 0.01) return;
  ctx.fillStyle = `rgba(0,200,255,${alpha.toFixed(3)})`;
  ctx.font      = `bold 11px 'Courier New', monospace`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawPlanetLabel(ctx, cx, y, label, alpha) {
  if (alpha < 0.02 || y > 10000) return;
  ctx.fillStyle = `rgba(140,200,255,${(alpha * 0.65).toFixed(3)})`;
  ctx.font      = `9px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(label, cx, y);
}

// ── Component ──────────────────────────────────────────────────────────────────
// POV stars — depth-sorted streaks rushing toward viewer
function initPovStars(count, W, H) {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * W,
    y: (Math.random() - 0.5) * H,
    z: Math.random() * W,
    pz: 0,
  }));
}

export default function MarsLaunchScene({ onComplete, onPlayAgain }) {
  const canvasRef  = useRef(null);
  const starsRef   = useRef([]);
  const povStarsRef = useRef([]);
  const sizeRef    = useRef({ W: 1, H: 1 });
  const initDone   = useRef(false);
  const tRef       = useRef(0);
  const ptRef      = useRef(0);
  const phaseTrans = useRef(false);

  // Refs used inside tick (avoid stale closures)
  const phaseRef          = useRef('emerge');
  const travelRef         = useRef(null);
  const watchModeRef      = useRef(null); // 'pov' | 'third'
  const transitDurRef     = useRef(TRANSIT_CINEMATIC);
  const modeShownRef      = useRef(false);
  const missionStartRef   = useRef(null);
  const lastUIRef         = useRef(0);

  // React state for UI overlays
  const [phase,           setPhase]          = useState('emerge');
  const [showModeSelect,  setShowModeSelect] = useState(false);
  const [showWatchSelect, setShowWatchSelect] = useState(false);
  const [missionSecs,     setMissionSecs]    = useState(0);
  const [distToMars,      setDistToMars]     = useState(EARTH_MARS_KM);
  const [approachVel,     setApproachVel]    = useState(32500);

  // Sync refs when state changes
  useEffect(() => {
    phaseRef.current   = phase;
    ptRef.current      = 0;
    phaseTrans.current = false;
    modeShownRef.current = false;
  }, [phase]);

  useEffect(() => { const stop = startSpaceAmbient(); return stop; }, []);

  // Resize / init
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      canvas.width = W; canvas.height = H;
      sizeRef.current = { W, H };
      if (!initDone.current) {
        starsRef.current = initStars(STAR_COUNT, W, H);
        povStarsRef.current = initPovStars(400, W, H);
        initDone.current = true;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleModeSelect = useCallback((mode) => {
    if (mode === 'watch') {
      setShowModeSelect(false);
      setShowWatchSelect(true);
      return;
    }
    travelRef.current     = mode;
    transitDurRef.current = mode === 'cinematic' ? TRANSIT_CINEMATIC : TRANSIT_REALTIME;
    missionStartRef.current = tRef.current;
    setShowModeSelect(false);
    setPhase('transit');
  }, []);

  const handleWatchSelect = useCallback((subMode) => {
    travelRef.current     = 'watch';
    watchModeRef.current  = subMode; // 'pov' or 'third'
    transitDurRef.current = TRANSIT_WATCH;
    missionStartRef.current = tRef.current;
    setShowWatchSelect(false);
    setPhase('transit');
  }, []);

  const tick = useCallback((delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !initDone.current) return;
    const ctx        = canvas.getContext('2d');
    const { W, H }   = sizeRef.current;
    const stars       = starsRef.current;
    const curPhase    = phaseRef.current;

    tRef.current  += delta;
    ptRef.current += delta;
    const t  = tRef.current;
    const pt = ptRef.current;

    drawSpaceBg(ctx, W, H);

    // ── EMERGE ──────────────────────────────────────────────────────────────
    if (curPhase === 'emerge') {
      const prog = pt / EMERGE_DURATION;

      drawStarField(ctx, stars, t, Math.min(1, prog * 1.5));

      // Earth large at bottom-centre, sliding into view
      const eR  = Math.min(W * 0.36, H * 0.42);
      const eCY = H * 0.85 + eR * 0.15;
      drawEarth(ctx, W / 2, eCY, eR, t);

      // Atmosphere glow fringe at screen bottom
      const atmA = Math.max(0, 1 - prog * 2) * 0.45;
      if (atmA > 0.005) {
        const ag = ctx.createLinearGradient(0, H - 150, 0, H);
        ag.addColorStop(0, `rgba(40,100,220,0)`);
        ag.addColorStop(1, `rgba(40,100,220,${atmA})`);
        ctx.fillStyle = ag;
        ctx.fillRect(0, H - 150, W, 150);
      }

      // Tiny rocket rising, fading out
      const rA = Math.max(0, 1 - prog * 2.5);
      drawTinyRocket(ctx, W / 2, H * 0.42 - prog * H * 0.25, rA, 1.5);

      // Black overlay fading out at start
      const blackA = Math.max(0, 1 - prog * 2.8);
      if (blackA > 0.005) {
        ctx.fillStyle = `rgba(2,5,18,${blackA.toFixed(3)})`;
        ctx.fillRect(0, 0, W, H);
      }

      // Status label
      if (prog > 0.45) {
        drawCanvasLabel(ctx, W / 2, 34, 'ATMOSPHERIC ASCENT COMPLETE · LOW EARTH ORBIT', Math.min(1, (prog - 0.45) * 2.5));
      }

      if (pt >= EMERGE_DURATION && !phaseTrans.current) {
        phaseTrans.current = true;
        setPhase('orbit');
      }
    }

    // ── ORBIT ────────────────────────────────────────────────────────────────
    else if (curPhase === 'orbit') {
      const prog = Math.min(1, pt / ORBIT_DURATION);

      drawStarField(ctx, stars, t, 1);

      // Earth — large, centred low
      const eR  = Math.min(W * 0.30, H * 0.36);
      const eCX = W * 0.50;
      const eCY = H * 0.80;
      drawEarth(ctx, eCX, eCY, eR, t);

      // Orbital ellipse
      drawOrbitPath(ctx, eCX, eCY, eR * 1.34, eR * 0.40, -0.18, t);

      // Tiny rocket on orbit path
      const angle = -0.18 + t * 0.26;
      const rX = eCX + Math.cos(angle) * eR * 1.34;
      const rY = eCY + Math.sin(angle) * eR * 0.40;
      drawTinyRocket(ctx, rX, rY, Math.min(1, prog * 3), 1.2);

      drawCanvasLabel(ctx, W / 2, 34, 'LOW EARTH ORBIT · INSERTION CONFIRMED', 1);

      // Show mode-select overlay after 2.5 s
      if (pt >= 2.5 && !modeShownRef.current) {
        modeShownRef.current = true;
        setShowModeSelect(true);
      }
      // phase advances only via handleModeSelect
    }

    // ── TRANSIT ──────────────────────────────────────────────────────────────
    else if (curPhase === 'transit') {
      const transitDur  = transitDurRef.current;
      const prog        = Math.min(1, pt / transitDur);
      const tMode       = travelRef.current;   // 'cinematic' | 'realtime' | 'watch'
      const watchMode   = watchModeRef.current; // 'pov' | 'third'
      const isCinematic = tMode === 'cinematic';
      const isWatch     = tMode === 'watch';

      if (isWatch && watchMode === 'pov') {
        // ── POV MODE: stars rush toward viewer (perspective projection) ──────
        drawSpaceBg(ctx, W, H);
        const povStars = povStarsRef.current;
        const cx2 = W / 2, cy2 = H / 2;
        const speed = 250 + prog * 400; // accelerates toward Mars
        ctx.save();
        povStars.forEach((ps) => {
          ps.pz = ps.z;
          ps.z -= delta * speed;
          if (ps.z <= 0) {
            ps.x  = (Math.random() - 0.5) * W;
            ps.y  = (Math.random() - 0.5) * H;
            ps.z  = W;
            ps.pz = W;
          }
          const sx  = (ps.x / ps.z)  * W + cx2;
          const sy  = (ps.y / ps.z)  * H + cy2;
          const px  = (ps.x / ps.pz) * W + cx2;
          const py  = (ps.y / ps.pz) * H + cy2;
          const sz  = Math.max(0.5, (1 - ps.z / W) * 3.5);
          const sa  = Math.min(1, (1 - ps.z / W) * 1.6);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(210,235,255,${sa.toFixed(3)})`;
          ctx.lineWidth = sz;
          ctx.stroke();
        });
        ctx.restore();

        // cockpit frame overlay
        const frameA = Math.min(1, prog * 3);
        if (frameA > 0.01) {
          ctx.save();
          ctx.globalAlpha = frameA * 0.55;
          // HUD corners
          const pad = 28;
          [
            [pad, pad, 40, 0, 0, 40],
            [W - pad, pad, -40, 0, 0, 40],
            [pad, H - pad, 40, 0, 0, -40],
            [W - pad, H - pad, -40, 0, 0, -40],
          ].forEach(([x, y, dx1, dy1, dx2, dy2]) => {
            ctx.strokeStyle = 'rgba(0,220,255,0.75)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x + dx1, y + dy1); ctx.lineTo(x, y); ctx.lineTo(x + dx2, y + dy2);
            ctx.stroke();
          });
          // crosshair
          const chR = 22;
          ctx.strokeStyle = 'rgba(0,220,255,0.40)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx2, cy2, chR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx2 - chR - 10, cy2); ctx.lineTo(cx2 + chR + 10, cy2);
          ctx.moveTo(cx2, cy2 - chR - 10); ctx.lineTo(cx2, cy2 + chR + 10);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        // Mars dot approaching center
        const mProg  = Math.max(0, (prog - 0.05) / 0.95);
        const marsRPov = lerp(3, Math.min(W, H) * 0.18, mProg);
        drawMars(ctx, cx2, cy2, marsRPov, t);
        if (mProg > 0.05) drawPlanetLabel(ctx, cx2, cy2 + marsRPov + 14, 'MARS', Math.min(1, mProg * 3));

        // speed readout
        drawCanvasLabel(ctx, W / 2, 34, `POV · VELOCITY ${Math.round(32500 + prog * 4800).toLocaleString()} m/s`, 1);

      } else if (isWatch && watchMode === 'third') {
        // ── 3RD-PERSON MODE: rocket visible, planets flanking ────────────────
        drawStarField(ctx, stars, t, 1);
        drawSpeedLines(ctx, W, H, Math.min(0.8, prog * 3), t);

        const eR  = lerp(70, 8, prog);
        const eCX = W * 0.12;
        const eCY = H * 0.50;
        drawEarth(ctx, eCX, eCY, eR, t);
        drawPlanetLabel(ctx, eCX, eCY + eR + 14, 'EARTH', 1);

        const mProg = Math.max(0, (prog - 0.05) / 0.95);
        const mR    = lerp(6, 72, mProg);
        const mCX   = W * 0.88;
        const mCY   = H * 0.50;
        drawMars(ctx, mCX, mCY, mR, t);
        drawPlanetLabel(ctx, mCX, mCY + mR + 14, 'MARS', mProg);

        drawTrajectory(ctx, eCX, eCY, mCX, mCY, prog, t);

        // Rocket — large, centered, slight camera wobble
        const rocketX = W / 2 + Math.sin(t * 0.4) * 6;
        const rocketY = H * 0.56 + Math.cos(t * 0.6) * 4;
        ctx.save();
        ctx.translate(rocketX, rocketY);
        // tilt in direction of travel
        ctx.rotate(-0.12 + Math.sin(t * 0.3) * 0.03);
        // draw rocket upward (pointing up = toward Mars)
        drawTinyRocket(ctx, 0, 0, 1, 3.2);
        ctx.restore();

        // engine glow bloom
        const glowA = 0.18 + 0.08 * Math.sin(t * 6);
        const eGlow = ctx.createRadialGradient(rocketX, rocketY + 55, 2, rocketX, rocketY + 55, 60);
        eGlow.addColorStop(0, `rgba(255,160,40,${glowA})`);
        eGlow.addColorStop(1, 'rgba(255,100,0,0)');
        ctx.fillStyle = eGlow;
        ctx.beginPath();
        ctx.ellipse(rocketX, rocketY + 55, 30, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        drawCanvasLabel(ctx, W / 2, 34, 'WATCH · EARTH → MARS TRANSIT', 1);

      } else {
        // ── CINEMATIC / REAL-TIME (unchanged) ────────────────────────────────
        drawStarField(ctx, stars, t, 1);
        if (isCinematic) drawSpeedLines(ctx, W, H, Math.min(1, prog * 4), t);

        const eR  = lerp(isCinematic ? 85 : 95, 10, prog);
        const eCX = W * 0.15;
        const eCY = H * 0.50;
        drawEarth(ctx, eCX, eCY, eR, t);
        drawPlanetLabel(ctx, eCX, eCY + eR + 14, 'EARTH', 1);

        const mProg = Math.max(0, (prog - 0.08) / 0.92);
        const mR    = lerp(7, isCinematic ? 68 : 62, mProg);
        const mCX   = W * 0.85;
        const mCY   = H * 0.50;
        drawMars(ctx, mCX, mCY, mR, t);
        drawPlanetLabel(ctx, mCX, mCY + mR + 14, 'MARS', mProg);

        drawTrajectory(ctx, eCX, eCY, mCX, mCY, prog, t);

        const modeLbl = isCinematic ? 'CINEMATIC TRANSIT' : 'REAL-TIME TRANSIT';
        drawCanvasLabel(ctx, W / 2, 34, `EARTH → MARS · ${modeLbl}`, 1);
      }

      // Update telemetry UI every 0.25 s
      if (t - lastUIRef.current > 0.25) {
        lastUIRef.current = t;
        const elapsed = missionStartRef.current !== null ? t - missionStartRef.current : 0;
        setMissionSecs(elapsed);
        setDistToMars(EARTH_MARS_KM * (1 - prog));
        setApproachVel(Math.round(32500 + prog * 4800));
      }

      if (pt >= transitDur && !phaseTrans.current) {
        phaseTrans.current = true;
        setPhase('approach');
      }
    }

    // ── APPROACH ─────────────────────────────────────────────────────────────
    else if (curPhase === 'approach') {
      const prog = Math.min(1, pt / APPROACH_DURATION);

      drawStarField(ctx, stars, t, 1);

      const mR = lerp(68, H * 0.50, prog);
      drawMars(ctx, W / 2, H * 0.52, mR, t);

      // "Orbital insertion burn" label appears mid-approach
      const burnA = prog > 0.25 ? Math.min(1, (prog - 0.25) * 2.5) : 0;
      drawCanvasLabel(ctx, W / 2, 34, 'MARS APPROACH · ORBITAL INSERTION BURN', burnA);

      // Velocity counting down
      if (t - lastUIRef.current > 0.25) {
        lastUIRef.current = t;
        const elapsed = missionStartRef.current !== null ? t - missionStartRef.current : 0;
        setMissionSecs(elapsed);
        setDistToMars(Math.max(0, EARTH_MARS_KM * (1 - Math.min(1, 1 + prog * 0.01))));
        setApproachVel(Math.round(lerp(37300, 3200, prog)));
      }

      if (pt >= APPROACH_DURATION && !phaseTrans.current) {
        phaseTrans.current = true;
        // Brief pause then arrival
        setTimeout(() => setPhase('arrival'), 400);
      }
    }

    // ── ARRIVAL ──────────────────────────────────────────────────────────────
    else if (curPhase === 'arrival') {
      drawStarField(ctx, stars, t, 1);
      drawMars(ctx, W / 2, H * 0.50, H * 0.50, t);
    }
  }, []); // all values read from refs — no stale-closure issues

  useGameLoop(tick);

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="mars-scene">
      <canvas ref={canvasRef} className="mars-canvas" />

      {/* Telemetry HUD — shown during transit + approach */}
      {(phase === 'transit' || phase === 'approach') && (
        <div className="mars-telemetry">
          <div className="mtel-label">MISSION TELEMETRY</div>
          <div className="mtel-row"><span>MISSION TIME</span><span>{fmtTime(missionSecs)}</span></div>
          <div className="mtel-row"><span>DIST TO MARS</span><span>{fmtKm(distToMars)}</span></div>
          <div className="mtel-row"><span>VELOCITY</span><span>{approachVel.toLocaleString()} m/s</span></div>
          <div className="mtel-row"><span>LIFE SUPPORT</span><span className="mtel-ok">NOMINAL</span></div>
          <div className="mtel-row"><span>PROPULSION</span><span className="mtel-ok">NOMINAL</span></div>
          <div className="mtel-row"><span>COMMS DELAY</span><span>
            {phase === 'transit'
              ? `${(4 + Math.abs(Math.sin((distToMars / EARTH_MARS_KM - 0.5) * Math.PI)) * 8.5).toFixed(1)} min`
              : '0.3 min'}
          </span></div>
        </div>
      )}

      {/* Mission control status bar */}
      {(phase === 'transit' || phase === 'approach') && (
        <div className="mars-mc-bar">
          <span className="mc-item mc-ok">PWR</span>
          <span className="mc-item mc-ok">FUEL</span>
          <span className="mc-item mc-ok">NAV</span>
          <span className="mc-item mc-ok">COMMS</span>
          <span className="mc-item mc-ok">DIAG</span>
          <span className="mc-item mc-ok">ENG</span>
        </div>
      )}

      {/* Mode-select overlay */}
      {showModeSelect && (
        <div className="mars-mode-overlay">
          <div className="mmo-card">
            <div className="mmo-pre">LOW EARTH ORBIT · STAND BY</div>
            <div className="mmo-title">SELECT TRANSIT MODE</div>
            <div className="mmo-sub">The vehicle is ready to begin the Earth–Mars transit.</div>
            <div className="mmo-options">
              <button className="mmo-btn" onClick={() => handleModeSelect('cinematic')}>
                <span className="mmo-btn-title">CINEMATIC</span>
                <span className="mmo-btn-desc">Accelerated simulation · ~60 seconds</span>
              </button>
              <button className="mmo-btn" onClick={() => handleModeSelect('realtime')}>
                <span className="mmo-btn-title">REAL-TIME</span>
                <span className="mmo-btn-desc">Full transit sequence · ~4 minutes</span>
              </button>
              <button className="mmo-btn mmo-btn-featured" onClick={() => handleModeSelect('watch')}>
                <span className="mmo-btn-title">WATCH ROCKET</span>
                <span className="mmo-btn-desc">Ride along with the vehicle · ~90 seconds</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Watch sub-select: POV vs 3rd person */}
      {showWatchSelect && (
        <div className="mars-mode-overlay">
          <div className="mmo-card">
            <div className="mmo-pre">WATCH ROCKET · SELECT VIEW</div>
            <div className="mmo-title">CHOOSE YOUR PERSPECTIVE</div>
            <div className="mmo-sub">How do you want to experience the journey?</div>
            <div className="mmo-options">
              <button className="mmo-btn mmo-btn-featured" onClick={() => handleWatchSelect('pov')}>
                <span className="mmo-btn-title">POV MODE</span>
                <span className="mmo-btn-desc">First-person cockpit · stars rush toward you</span>
              </button>
              <button className="mmo-btn" onClick={() => handleWatchSelect('third')}>
                <span className="mmo-btn-title">3RD PERSON</span>
                <span className="mmo-btn-desc">Watch the rocket fly · camera follows from outside</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Arrival screen */}
      {phase === 'arrival' && (
        <div className="mars-arrival">
          <div className="arr-pre">MARS ORBIT INSERTION · CONFIRMED</div>
          <div className="arr-title">SIMULATION CONCLUDED</div>
          <div className="arr-data">
            <div className="arr-row"><span>MISSION TIME</span><span>{fmtTime(missionSecs)}</span></div>
            <div className="arr-row"><span>PHASES COMPLETE</span><span>3 / 3</span></div>
            <div className="arr-row"><span>ROCKET BUILDER</span><span className="arr-ok">CONFIRMED</span></div>
            <div className="arr-row"><span>DEBUG ARENA</span><span className="arr-ok">CONFIRMED</span></div>
            <div className="arr-row"><span>VISUAL LAB</span><span className="arr-ok">CONFIRMED</span></div>
          </div>
          <p className="arr-sub">
            All six systems repaired and verified.<br />
            All faults resolved.<br />
            All code behaviour confirmed.<br />
            Mars orbital insertion nominal.
          </p>
          {onPlayAgain && (
            <button className="arr-play-again-btn" onClick={onPlayAgain}>PLAY AGAIN</button>
          )}
        </div>
      )}
    </div>
  );
}
