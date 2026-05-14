import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGameLoop } from '../hooks';

// ── Constants ──────────────────────────────────────────────────────────────────
const STAR_COUNT        = 240;
const EARTH_MARS_KM     = 225_000_000;
const EMERGE_DURATION   = 4.0;   // fade-in from black to orbit view
const ORBIT_DURATION    = 5.5;   // LEO view before mode select appears
const APPROACH_DURATION = 10.0;  // Mars approach / orbital insertion
const TRANSIT_CINEMATIC = 60;
const TRANSIT_REALTIME  = 240;

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
  drawPlanet(ctx, cx, cy, r,
    'rgba(55,138,255,0.96)',
    'rgba(10,58,138,0.93)',
    'rgba(80,160,255,0.22)'
  );
  if (r < 7) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  // landmasses
  [
    [-0.22, -0.14, 0.28, 0.21],
    [ 0.19, -0.10, 0.21, 0.27],
    [-0.06,  0.29, 0.16, 0.11],
    [ 0.16,  0.23, 0.13, 0.09],
    [-0.30,  0.15, 0.10, 0.14],
  ].forEach(([ox, oy, rx, ry]) => {
    ctx.beginPath();
    ctx.ellipse(cx + ox * r, cy + oy * r, rx * r, ry * r, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(35,130,65,0.42)';
    ctx.fill();
  });
  // cloud bands
  if (r > 45) {
    ctx.globalAlpha = 0.15;
    [-0.22, 0.08, 0.33].forEach((oy) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy + oy * r, r * 0.82, r * 0.085, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawMars(ctx, cx, cy, r, t) {
  if (r < 1) return;
  drawPlanet(ctx, cx, cy, r,
    'rgba(215,96,40,0.96)',
    'rgba(148,42,12,0.93)',
    'rgba(200,76,36,0.18)'
  );
  if (r < 7) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  // polar cap
  ctx.beginPath();
  ctx.ellipse(cx, cy - r * 0.80, r * 0.22, r * 0.13, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(235,225,215,0.42)';
  ctx.fill();
  // Valles Marineris
  if (r > 28) {
    ctx.beginPath();
    ctx.ellipse(cx + r * 0.05, cy + r * 0.05, r * 0.52, r * 0.09, -0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,25,5,0.30)';
    ctx.fill();
  }
  // Olympus Mons
  if (r > 55) {
    ctx.beginPath();
    ctx.arc(cx - r * 0.28, cy - r * 0.14, r * 0.11, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(178,70,30,0.28)';
    ctx.fill();
  }
  ctx.restore();
}

function drawTinyRocket(ctx, cx, cy, alpha, scale) {
  if (alpha < 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  // body
  ctx.fillStyle = 'rgba(100,160,240,0.90)';
  ctx.fillRect(-4, -22, 8, 22);
  // nose
  ctx.beginPath();
  ctx.moveTo(-4, -22);
  ctx.lineTo( 4, -22);
  ctx.lineTo(0, -34);
  ctx.closePath();
  ctx.fillStyle = 'rgba(140,210,255,0.90)';
  ctx.fill();
  // exhaust
  const fl = ctx.createRadialGradient(0, 6, 0, 0, 14, 11);
  fl.addColorStop(0,   'rgba(255,240,180,0.90)');
  fl.addColorStop(0.5, 'rgba(255,120,30,0.60)');
  fl.addColorStop(1,   'rgba(180,50,200,0.00)');
  ctx.fillStyle = fl;
  ctx.beginPath();
  ctx.ellipse(0, 9, 4, 14, 0, 0, Math.PI * 2);
  ctx.fill();
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
export default function MarsLaunchScene({ onComplete }) {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const sizeRef   = useRef({ W: 1, H: 1 });
  const initDone  = useRef(false);
  const tRef      = useRef(0);
  const ptRef     = useRef(0);
  const phaseTrans = useRef(false);

  // Refs used inside tick (avoid stale closures)
  const phaseRef          = useRef('emerge');
  const travelRef         = useRef(null);
  const transitDurRef     = useRef(TRANSIT_CINEMATIC);
  const modeShownRef      = useRef(false);
  const missionStartRef   = useRef(null);
  const lastUIRef         = useRef(0);

  // React state for UI overlays
  const [phase,          setPhase]          = useState('emerge');
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [missionSecs,    setMissionSecs]    = useState(0);
  const [distToMars,     setDistToMars]     = useState(EARTH_MARS_KM);
  const [approachVel,    setApproachVel]    = useState(32500);

  // Sync refs when state changes
  useEffect(() => {
    phaseRef.current   = phase;
    ptRef.current      = 0;
    phaseTrans.current = false;
    modeShownRef.current = false;
  }, [phase]);

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
        initDone.current = true;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleModeSelect = useCallback((mode) => {
    travelRef.current    = mode;
    transitDurRef.current = mode === 'cinematic' ? TRANSIT_CINEMATIC : TRANSIT_REALTIME;
    missionStartRef.current = tRef.current;
    setShowModeSelect(false);
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
      const isCinematic = travelRef.current === 'cinematic';

      drawStarField(ctx, stars, t, 1);

      // Speed lines (cinematic)
      if (isCinematic) {
        drawSpeedLines(ctx, W, H, Math.min(1, prog * 4), t);
      }

      // Earth — shrinking left
      const eR  = lerp(isCinematic ? 85 : 95, 10, prog);
      const eCX = W * 0.15;
      const eCY = H * 0.50;
      drawEarth(ctx, eCX, eCY, eR, t);
      drawPlanetLabel(ctx, eCX, eCY + eR + 14, 'EARTH', 1);

      // Mars — growing right
      const mProg = Math.max(0, (prog - 0.08) / 0.92);
      const mR    = lerp(7, isCinematic ? 68 : 62, mProg);
      const mCX   = W * 0.85;
      const mCY   = H * 0.50;
      drawMars(ctx, mCX, mCY, mR, t);
      drawPlanetLabel(ctx, mCX, mCY + mR + 14, 'MARS', mProg);

      // Trajectory
      drawTrajectory(ctx, eCX, eCY, mCX, mCY, prog, t);

      // Mission header
      const mode = isCinematic ? 'CINEMATIC TRANSIT' : 'REAL-TIME TRANSIT';
      drawCanvasLabel(ctx, W / 2, 34, `EARTH → MARS · ${mode}`, 1);

      // Update UI every 0.25 s to avoid excessive re-renders
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
        </div>
      )}
    </div>
  );
}
