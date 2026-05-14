import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGameLoop, useKeyboard } from '../hooks';
import {
  initStars,
  drawBackground,
  drawStars,
  drawHangar,
  drawFloor,
  drawCeilingLights,
  drawRocket,
  drawTerminal,
  drawPlayer,
  drawPowerIndicators,
  drawPoweredAmbient,
  drawAlarmFlash,
  drawTrajectoryArc,
  initDust,
  updateDust,
  drawDust,
} from '../systems/renderSystem';
import {
  createLaunchState,
  spawnSmoke,
  spawnExhaust,
  updateParticles,
  drawParticles,
} from '../systems/launchSystem';
import TerminalOverlay from '../components/TerminalOverlay';
import ProgressPanel   from '../components/ProgressPanel';
import { getTerminal } from '../terminals';
import {
  loadProgress,
  completeMission,
  isMissionComplete,
} from '../systems/progressionSystem';
import {
  startAmbientHum,
  playTerminalOpen,
  playTerminalClose,
} from '../systems/audioSystem';
// game.css is imported once by Game.jsx — no second import needed here

// ── constants ─────────────────────────────────────────────────────────────
const SPEED           = 260;
const ACCEL           = 12;
const TERMINAL_RADIUS = 80;
const STAR_COUNT      = 120;
const TERMINALS = [
  { id: 'power', label: 'Power Systems', relX: -0.30 },
  { id: 'nav',   label: 'Navigation',    relX: -0.10 },
  { id: 'data',  label: 'Data Core',     relX:  0.10 },
  { id: 'comm',  label: 'Comms',         relX:  0.30 },
];

function countdownStatusText(timer) {
  if (timer > 8) return 'SYSTEMS CHECK';
  if (timer > 6) return 'FUEL PRESSURISATION';
  if (timer > 4) return 'GUIDANCE COMPUTER ARMED';
  if (timer > 3) return 'MAIN ENGINE START';
  if (timer > 1) return 'ALL SYSTEMS GO';
  return 'IGNITION SEQUENCE START';
}

export default function HangarScene({ onInteract }) {
  const canvasRef = useRef(null);

  // game state in refs — no re-renders per tick
  const player   = useRef({ x: 0, y: 0, vx: 0 });
  const starsRef = useRef([]);
  const timeRef  = useRef(0);
  const sizeRef  = useRef({ W: 1, H: 1 });
  const initDone = useRef(false);

  // UI state
  const [nearTerminal,     setNearTerminal]     = useState(null);
  const [activeTerminal,   setActiveTerminal]   = useState(null);
  const [worldState,       setWorldState]       = useState({ powerRestored: false, navCalibrated: false });
  const [launchPhase,      setLaunchPhase]      = useState(null);
  const [countdownDisplay, setCountdownDisplay] = useState(10);
  const [progress,         setProgress]         = useState(() => loadProgress());

  // Refs for RAF tick access
  const overlayOpenRef    = useRef(false);
  const worldStateRef     = useRef(worldState);
  const launchPhaseRef    = useRef(null);
  const lastCountdownRef  = useRef(10);
  const launchRef         = useRef(createLaunchState());
  const launchTriggeredRef = useRef(false);
  const dustRef            = useRef([]);
  const prevTerminalRef    = useRef(null);

  // Ambient hum — start on mount, stop on unmount
  useEffect(() => {
    const stopHum = startAmbientHum();
    return stopHum;
  }, []);

  // Terminal open/close sounds
  useEffect(() => {
    if (activeTerminal && !prevTerminalRef.current) playTerminalOpen();
    if (!activeTerminal && prevTerminalRef.current)  playTerminalClose();
    prevTerminalRef.current = activeTerminal;
  }, [activeTerminal]);

  useEffect(() => { overlayOpenRef.current = activeTerminal !== null; }, [activeTerminal]);
  useEffect(() => { worldStateRef.current  = worldState; },            [worldState]);
  useEffect(() => {
    launchPhaseRef.current = launchPhase;
    launchRef.current.phaseTransitioned = false;
  }, [launchPhase]);

  // Restore world state from saved progress on first mount.
  // `progress` is already initialised via useState(() => loadProgress()) — no second read needed.
  useEffect(() => {
    if (isMissionComplete(progress, 'power_restoration')) {
      setWorldState((s) => ({ ...s, powerRestored: true }));
      launchTriggeredRef.current = true; // suppress countdown for already-completed sessions
    }
    if (isMissionComplete(progress, 'nav_calibration')) {
      setWorldState((s) => ({ ...s, navCalibrated: true }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const keys = useKeyboard();

  // ── resize ────────────────────────────────────────────────────────────────
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      canvas.width  = W;
      canvas.height = H;
      sizeRef.current = { W, H };
      if (!initDone.current) {
        player.current = { x: W / 2, y: H * 0.82, vx: 0 };
        starsRef.current = initStars(STAR_COUNT, W, H);
        dustRef.current  = initDust(55, W, H);
        initDone.current = true;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── interact key ──────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if (e.code === 'KeyE' && nearTerminal && !overlayOpenRef.current && !launchPhaseRef.current) {
        const tm = TERMINALS.find((t) => t.id === nearTerminal);
        setActiveTerminal(getTerminal(nearTerminal, tm?.label));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nearTerminal]);

  // ── mission complete callback ──────────────────────────────────────────────
  const handleMissionComplete = useCallback((missionId, worldEffect) => {
    setProgress((prev) => completeMission(prev, missionId));
    if (worldEffect === 'power_restored') {
      setWorldState((s) => ({ ...s, powerRestored: true }));
    }
    if (worldEffect === 'nav_calibrated') {
      setWorldState((s) => ({ ...s, navCalibrated: true }));
    }
    onInteract?.(missionId);
  }, [onInteract]);

  // ── launch trigger — fires 2.8 s after terminal closes post-mission ────────
  useEffect(() => {
    if (!worldState.powerRestored || activeTerminal !== null || launchPhase !== null) return;
    if (launchTriggeredRef.current) return; // skip if already played this session
    const timer = setTimeout(() => {
      const ls = launchRef.current;
      ls.phaseTime        = 0;
      ls.countdownTimer   = 10;
      ls.rocketAscent     = 0;
      ls.cameraOffset     = 0;
      ls.shakeX           = 0;
      ls.shakeY           = 0;
      ls.flashAlpha       = 0;
      ls.alarmAlpha       = 0;
      ls.fadeAlpha        = 0;
      ls.ignitionLevel    = 0.3;
      ls.particles        = [];
      ls.phaseTransitioned = false;
      lastCountdownRef.current = 10;
      launchTriggeredRef.current = true;
      setCountdownDisplay(10);
      setLaunchPhase('countdown');
    }, 2800);
    return () => clearTimeout(timer);
  }, [worldState.powerRestored, activeTerminal, launchPhase]);

  // ── game loop ─────────────────────────────────────────────────────────────
  const tick = useCallback((delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !initDone.current) return;
    const ctx       = canvas.getContext('2d');
    const { W, H }  = sizeRef.current;
    const p         = player.current;
    const launch    = launchRef.current;
    const phase     = launchPhaseRef.current;

    timeRef.current += delta;
    const t = timeRef.current;

    // ── Player movement (frozen during launch after ignition) ─────────────
    const movementAllowed = !overlayOpenRef.current && (!phase || phase === 'countdown');
    if (movementAllowed) {
      const left  = keys.current['KeyA'] || keys.current['ArrowLeft'];
      const right = keys.current['KeyD'] || keys.current['ArrowRight'];
      const targetVX = right ? SPEED : left ? -SPEED : 0;
      p.vx += (targetVX - p.vx) * Math.min(ACCEL * delta, 1);
      p.x   = Math.max(30, Math.min(W - 30, p.x + p.vx * delta));
    } else {
      p.vx *= 0.88;
    }

    // ── Launch phase logic ────────────────────────────────────────────────
    if (phase === 'countdown') {
      launch.phaseTime    += delta;
      launch.countdownTimer = Math.max(0, 10 - launch.phaseTime);

      // Shake — quadratic ramp to T-0
      const progress   = launch.phaseTime / 10;
      const shakeAmt   = progress * progress * 2.8;
      launch.shakeX    = Math.sin(t * 48) * shakeAmt;
      launch.shakeY    = Math.cos(t * 37) * shakeAmt;

      // Alarm lights
      launch.alarmAlpha = 0.22 * (0.5 + 0.5 * Math.sin(t * 5.5));

      // Ignition level (0.3 base → 1.0 in last 4 seconds)
      launch.ignitionLevel = Math.max(0.3, Math.min(1, (launch.phaseTime - 6) / 4));

      // Smoke (spawns more densely near T-0)
      if (launch.phaseTime > 3.5 && Math.random() < progress * 12 * delta) {
        spawnSmoke(launch, W / 2, H * 0.55 + 22);
      }

      // Sync countdown React state (only on integer change)
      const newCount = Math.max(0, Math.ceil(launch.countdownTimer));
      if (newCount !== lastCountdownRef.current) {
        lastCountdownRef.current = newCount;
        setCountdownDisplay(newCount);
      }

      // Transition → ignition
      if (launch.phaseTime >= 10 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        launch.flashAlpha        = 1.0;
        launch.alarmAlpha        = 0;
        launch.ignitionLevel     = 1;
        launch.phaseTime         = 0;
        setCountdownDisplay(0);
        setLaunchPhase('ignition');
      }
    }

    if (phase === 'ignition') {
      launch.phaseTime  += delta;
      launch.flashAlpha  = Math.max(0, launch.flashAlpha * Math.pow(0.82, delta * 60));
      launch.ignitionLevel = 1;

      // Heavy random shake
      const intensity  = 7 + Math.sin(t * 80) * 3;
      launch.shakeX    = (Math.random() - 0.5) * intensity;
      launch.shakeY    = (Math.random() - 0.5) * intensity;

      // Dense particles
      if (Math.random() < 0.90) spawnSmoke(launch,   W / 2, H * 0.55 + 25);
      if (Math.random() < 0.75) spawnExhaust(launch, W / 2, H * 0.55 + 25);

      if (launch.phaseTime >= 1.6 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        launch.phaseTime         = 0;
        launch.rocketAscent      = 0;
        setLaunchPhase('liftoff');
      }
    }

    if (phase === 'liftoff') {
      launch.phaseTime += delta;

      // Rocket accelerates upward
      const accel       = 160 + launch.phaseTime * launch.phaseTime * 65;
      launch.rocketAscent -= accel * delta;

      // Camera smoothly chases rocket — slight lag so it feels weighty
      const targetCam   = Math.max(0, -launch.rocketAscent - H * 0.12);
      launch.cameraOffset += (targetCam - launch.cameraOffset) * Math.min(3.5 * delta, 0.95);

      // Shake fades out
      const shakeAmt    = Math.max(0, 5.5 - launch.phaseTime * 2.0);
      launch.shakeX     = (Math.random() - 0.5) * shakeAmt;
      launch.shakeY     = (Math.random() - 0.5) * shakeAmt;

      // Exhaust trail
      if (Math.random() < 0.80) spawnExhaust(launch, W / 2, H * 0.55 + launch.rocketAscent + 22);
      if (Math.random() < 0.35) spawnSmoke(launch,   W / 2, H * 0.55 + launch.rocketAscent + 35);

      if (launch.rocketAscent < -H * 1.35 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        launch.phaseTime         = 0;
        setLaunchPhase('ascent');
      }
    }

    if (phase === 'ascent') {
      launch.phaseTime += delta;

      // Rocket exits fast
      const speed = 550 + launch.phaseTime * 280;
      launch.rocketAscent -= speed * delta;

      // Camera keeps following
      const targetCam = Math.max(0, -launch.rocketAscent - H * 0.12);
      launch.cameraOffset += (targetCam - launch.cameraOffset) * Math.min(5 * delta, 0.98);

      launch.shakeX = 0;
      launch.shakeY = 0;

      // Fade to black after 1.5 s
      if (launch.phaseTime > 1.5) {
        launch.fadeAlpha = Math.min(1, (launch.phaseTime - 1.5) / 2.2);
      }

      if (launch.phaseTime >= 4.5 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        setLaunchPhase('complete');
      }
    }

    // Update particles every frame regardless of phase
    updateParticles(launch, delta);

    // ── Terminal proximity (disabled during launch) ───────────────────────
    const tPositions = TERMINALS.map((tm) => ({
      ...tm,
      x: W / 2 + tm.relX * W,
      y: H * 0.72,
    }));

    if (!phase) {
      let nearest = null;
      tPositions.forEach((tm) => {
        const dx = p.x - tm.x;
        const dy = p.y - tm.y;
        if (Math.sqrt(dx * dx + dy * dy) < TERMINAL_RADIUS) nearest = tm.id;
      });
      // Bail out when value unchanged — avoids triggering React reconciler every frame
      setNearTerminal((prev) => (prev === nearest ? prev : nearest));
    } else if (nearTerminal !== null) {
      setNearTerminal(null);
    }

    // ── Draw ─────────────────────────────────────────────────────────────
    const { powerRestored, navCalibrated } = worldStateRef.current;
    const rocketGroundY     = H * 0.55 + launch.rocketAscent;

    // 1. Background — fixed (no camera transform)
    drawBackground(ctx, W, H);

    // 2. Alarm flash — fixed screen-space overlay
    if (launch.alarmAlpha > 0.005) {
      drawAlarmFlash(ctx, W, H, launch.alarmAlpha);
    }

    // 3. World — translated by camera + shake
    ctx.save();
    ctx.translate(Math.round(launch.shakeX), Math.round(launch.shakeY - launch.cameraOffset));

    drawStars(ctx, starsRef.current, t);
    drawHangar(ctx, W, H);
    drawCeilingLights(ctx, W, powerRestored || !!phase);
    drawFloor(ctx, W, H);

    if (powerRestored || phase) drawPoweredAmbient(ctx, W, H, t);

    // Ambient dust — update physics then draw above floor
    if (!phase || phase === 'countdown') {
      updateDust(dustRef.current, delta, W, H);
      drawDust(ctx, dustRef.current, t);
    }

    // Smoke + exhaust
    drawParticles(ctx, launch);

    // Trajectory arc — pre-launch only, when nav is calibrated
    if (navCalibrated && (!phase || phase === 'countdown')) {
      drawTrajectoryArc(ctx, W / 2, rocketGroundY, W, H, t);
    }

    // Rocket — powered only after mission restores power (or during launch sequence)
    drawRocket(ctx, W / 2, rocketGroundY, t, powerRestored || !!phase, launch.ignitionLevel);

    // Terminals + power indicators (only before ignition)
    if (!phase || phase === 'countdown') {
      tPositions.forEach((tm) => {
        drawTerminal(ctx, tm.x, tm.y, tm.label, !phase && tm.id === nearTerminal, t);
      });
      if (powerRestored) drawPowerIndicators(ctx, tPositions, t);
    }

    // Player — fades out in last 2 s of countdown
    const playerAlpha = phase === 'countdown'
      ? Math.max(0, Math.min(1, launch.countdownTimer / 2))
      : (phase ? 0 : 1);

    if (playerAlpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = playerAlpha;
      drawPlayer(ctx, p.x, p.y, p.vx, t);
      ctx.restore();
    }

    ctx.restore(); // end world transform

    // 4. Ignition flash — screen-space
    if (launch.flashAlpha > 0.01) {
      ctx.fillStyle = `rgba(255, 248, 225, ${Math.min(1, launch.flashAlpha)})`;
      ctx.fillRect(0, 0, W, H);
    }

    // 5. Ascent fade to black — screen-space
    if (launch.fadeAlpha > 0.005) {
      ctx.fillStyle = `rgba(2, 5, 18, ${Math.min(1, launch.fadeAlpha)})`;
      ctx.fillRect(0, 0, W, H);
    }
  }, [keys]); // eslint-disable-line react-hooks/exhaustive-deps

  useGameLoop(tick);

  // ── nearest terminal label ────────────────────────────────────────────────
  const nearLabel = nearTerminal
    ? TERMINALS.find((t) => t.id === nearTerminal)?.label
    : null;

  const isLaunching  = launchPhase && launchPhase !== 'complete';
  const isCritical   = countdownDisplay <= 3;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} className="hangar-canvas" />
      <div className="game-vignette" />

      {/* HUD chips — hidden during launch */}
      {!launchPhase && (
        <div className="hud-overlay">
          <div className="hud-chip">Mission <span>Active</span></div>
          <div className="hud-chip">Location <span>Hangar Bay 1</span></div>
          {worldState.powerRestored && (
            <div className="hud-chip hud-chip--online">Power Systems <span>Online</span></div>
          )}
          {worldState.navCalibrated && (
            <div className="hud-chip hud-chip--online">Navigation <span>Online</span></div>
          )}
        </div>
      )}

      {/* Interact prompt */}
      {nearLabel && !activeTerminal && !launchPhase && (
        <div className="interact-prompt">
          <kbd>E</kbd> Interact · {nearLabel}
        </div>
      )}

      {/* Progress panel — bottom-left, hidden during launch */}
      {!launchPhase && (
        <ProgressPanel progress={progress} />
      )}

      {/* Controls hint */}
      {!launchPhase && (
        <div className="controls-hint">
          <div>
            <kbd className="ck">W</kbd><kbd className="ck">A</kbd>
            <kbd className="ck">S</kbd><kbd className="ck">D</kbd>
            {' '}Move
          </div>
          <div><kbd className="ck">E</kbd> Interact</div>
        </div>
      )}

      {/* ── Countdown overlay ── */}
      {isLaunching && (
        <div className="launch-overlay">
          {launchPhase === 'countdown' && (
            <>
              <div className="launch-warning">Launch Sequence Initiated</div>
              <div className={`launch-countdown${isCritical ? ' launch-countdown--critical' : ''}`}>
                {countdownDisplay}
              </div>
              <div className="launch-status">
                {countdownStatusText(countdownDisplay)}
              </div>
            </>
          )}

          {launchPhase === 'ignition' && (
            <div className="launch-event launch-event--ignition">Ignition</div>
          )}

          {launchPhase === 'liftoff' && (
            <div className="launch-event launch-event--liftoff">Liftoff</div>
          )}
        </div>
      )}

      {/* ── Mission Accomplished ── */}
      {launchPhase === 'complete' && (
        <div className="mission-accomplished">
          <p className="ma-pre">Power Restoration · Complete</p>
          <h1 className="ma-title">Mission Accomplished</h1>
          <p className="ma-sub">
            You restored the rocket's power system and it has launched.<br />
            The station is online. The mission continues.
          </p>
          <button className="ma-btn" onClick={() => setLaunchPhase(null)}>
            [ Continue ]
          </button>
        </div>
      )}

      {/* Terminal overlay */}
      <TerminalOverlay
        terminal={activeTerminal}
        onClose={() => setActiveTerminal(null)}
        onMissionComplete={handleMissionComplete}
      />
    </div>
  );
}
