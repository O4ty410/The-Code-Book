import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGameLoop, useKeyboard } from '../hooks';
import {
  initStars, drawBackground, drawStars, drawHangar, drawFloor,
  drawCeilingLights, drawRocket, drawTerminal, drawPlayer,
  drawPowerIndicators, drawPoweredAmbient, drawAlarmFlash,
  drawTrajectoryArc, initDust, updateDust, drawDust,
  drawGantry, drawAtmosphere,
  drawRocketLightCone, drawRocketAmbientParticles, drawLaunchPadRing,
  initNpcs, updateNpcs, triggerNpcReaction, drawNpcs,
  initVehicles, updateVehicles, drawVehicles,
} from '../systems/renderSystem';
import {
  createLaunchState, spawnSmoke, spawnExhaust, spawnContrail,
  updateParticles, drawParticles, drawEngineGlow,
} from '../systems/launchSystem';
import TerminalOverlay from '../components/TerminalOverlay';
import ProgressPanel   from '../components/ProgressPanel';
import { getTerminal } from '../terminals';
import { isMissionComplete } from '../systems/progressionSystem';
import {
  startAmbientHum, playTerminalOpen, playTerminalClose,
  playCountdownBeep, startEngineRumble, playIgnitionBoom,
  stopBgMusicGlobal, speakCommsLine,
} from '../systems/audioSystem';

const SPEED           = 260;

const COMMS_SCRIPT = [
  { key: 'c9', threshold: 9.4, from: 'control', msg: 'T-nine — systems nominal.' },
  { key: 'c7', threshold: 7.4, from: 'control', msg: 'T-seven — fuel pressurised.' },
  { key: 'c5', threshold: 5.4, from: 'control', msg: 'T-five — computer armed.' },
  { key: 'c3', threshold: 3.4, from: 'crew',    msg: 'T-three — go for engine start.' },
  { key: 'c2', threshold: 2.4, from: 'control', msg: 'T-two — you are go for launch.' },
  { key: 'c1', threshold: 1.4, from: 'crew',    msg: 'T-one — ignition sequence start.' },
];
const ACCEL           = 12;
const TERMINAL_RADIUS = 80;
const IS_TOUCH        = typeof window !== 'undefined' && (
  window.matchMedia('(pointer: coarse)').matches ||
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0
);
const STAR_COUNT      = IS_TOUCH ? 55 : 120;

const TERMINALS = [
  { id: 'power',       label: 'Power Systems',  relX: -0.35 },
  { id: 'fuel',        label: 'Fuel Systems',    relX: -0.21 },
  { id: 'nav',         label: 'Navigation',      relX: -0.07 },
  { id: 'comms',       label: 'Communications',  relX:  0.07 },
  { id: 'diagnostics', label: 'Diagnostics',     relX:  0.21 },
  { id: 'engine',      label: 'Engine Core',     relX:  0.35 },
];

const SYSTEM_ONLINE_MAP = {
  power: 'powerRestored', fuel: 'fuelOnline', nav: 'navCalibrated',
  comms: 'commsOnline', diagnostics: 'diagnosticsOnline', engine: 'engineOnline',
};

function countdownStatusText(timer) {
  if (timer > 8) return 'SYSTEMS CHECK';
  if (timer > 6) return 'FUEL PRESSURISATION';
  if (timer > 4) return 'GUIDANCE COMPUTER ARMED';
  if (timer > 3) return 'MAIN ENGINE START';
  if (timer > 1) return 'ALL SYSTEMS GO';
  return 'IGNITION SEQUENCE START';
}

export default function HangarScene({ progress, onMissionComplete, autoLaunch, onLaunchComplete }) {
  const canvasRef = useRef(null);
  const player    = useRef({ x: 0, y: 0, vx: 0 });
  const starsRef  = useRef([]);
  const timeRef   = useRef(0);
  const sizeRef   = useRef({ W: 1, H: 1 });
  const initDone  = useRef(false);

  const worldFromProgress = useCallback((p) => ({
    powerRestored:     isMissionComplete(p, 'power_restoration'),
    fuelOnline:        isMissionComplete(p, 'fuel_calculation'),
    navCalibrated:     isMissionComplete(p, 'nav_calibration'),
    commsOnline:       isMissionComplete(p, 'comms_signal'),
    diagnosticsOnline: isMissionComplete(p, 'diagnostics_scan'),
    engineOnline:      isMissionComplete(p, 'engine_ignition'),
  }), []);

  const [nearTerminal,     setNearTerminal]     = useState(null);
  const [activeTerminal,   setActiveTerminal]   = useState(null);
  const [worldState,       setWorldState]       = useState(() => worldFromProgress(progress));
  const [launchPhase,      setLaunchPhase]      = useState(null);
  const [countdownDisplay, setCountdownDisplay] = useState(10);

  const overlayOpenRef      = useRef(false);
  const worldStateRef       = useRef(worldState);
  const launchPhaseRef      = useRef(null);
  const lastCountdownRef    = useRef(10);
  const launchRef           = useRef(createLaunchState());
  const launchTriggeredRef  = useRef(false);
  const dustRef             = useRef([]);
  const prevTerminalRef     = useRef(null);
  const onLaunchCompleteRef = useRef(onLaunchComplete);
  const engineRumbleRef     = useRef(null);
  const commsShownRef       = useRef(new Set());
  const npcsRef             = useRef(null);
  const vehiclesRef         = useRef(null);
  const prevWorldRef        = useRef({});
  const [commsLog, setCommsLog] = useState([]);
  const [systemTime, setSystemTime] = useState('--:--:--');
  useEffect(() => { onLaunchCompleteRef.current = onLaunchComplete; }, [onLaunchComplete]);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      setSystemTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Launch audio: stop bg music at countdown, engine rumble + ignition boom
  useEffect(() => {
    if (launchPhase === 'countdown') {
      stopBgMusicGlobal();
      engineRumbleRef.current = startEngineRumble();
    } else if (launchPhase === 'ignition') {
      engineRumbleRef.current?.stop();
      engineRumbleRef.current = null;
      playIgnitionBoom();
    } else if (!launchPhase || launchPhase === 'complete') {
      engineRumbleRef.current?.stop();
      engineRumbleRef.current = null;
    }
  }, [launchPhase]);

  useEffect(() => { return () => { engineRumbleRef.current?.stop(); }; }, []);

  useEffect(() => { setWorldState(worldFromProgress(progress)); }, [progress, worldFromProgress]);
  useEffect(() => { worldStateRef.current = worldState; }, [worldState]);

  useEffect(() => { const stop = startAmbientHum(); return stop; }, []);

  useEffect(() => {
    if (activeTerminal && !prevTerminalRef.current) playTerminalOpen();
    if (!activeTerminal && prevTerminalRef.current) playTerminalClose();
    prevTerminalRef.current = activeTerminal;
  }, [activeTerminal]);

  useEffect(() => { overlayOpenRef.current = activeTerminal !== null; }, [activeTerminal]);
  useEffect(() => {
    launchPhaseRef.current = launchPhase;
    launchRef.current.phaseTransitioned = false;
  }, [launchPhase]);

  // autoLaunch — start countdown 1.2 s after mount
  useEffect(() => {
    if (!autoLaunch) return;
    const t = setTimeout(() => {
      const ls = launchRef.current;
      ls.phaseTime = 0; ls.countdownTimer = 10; ls.rocketAscent = 0;
      ls.cameraOffset = 0; ls.shakeX = 0; ls.shakeY = 0;
      ls.flashAlpha = 0; ls.alarmAlpha = 0; ls.fadeAlpha = 0;
      ls.ignitionLevel = 0.3; ls.particles = []; ls.phaseTransitioned = false;
      lastCountdownRef.current = 10;
      launchTriggeredRef.current = true;
      commsShownRef.current = new Set();
      setCommsLog([]);
      setCountdownDisplay(10);
      setLaunchPhase('countdown');
    }, 1200);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const keys = useKeyboard();

  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      canvas.width = W; canvas.height = H;
      sizeRef.current = { W, H };
      if (!initDone.current) {
        player.current = { x: W / 2, y: H * 0.82, vx: 0 };
        starsRef.current = initStars(STAR_COUNT, W, H);
        dustRef.current  = initDust(IS_TOUCH ? 20 : 55, W, H);
        initDone.current = true;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

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

  const handleInteract = useCallback(() => {
    if (!nearTerminal || overlayOpenRef.current || launchPhaseRef.current) return;
    const tm = TERMINALS.find((t) => t.id === nearTerminal);
    setActiveTerminal(getTerminal(nearTerminal, tm?.label));
  }, [nearTerminal]);

  const handleMissionComplete = useCallback((missionId, worldEffect) => {
    onMissionComplete?.(missionId, worldEffect);
  }, [onMissionComplete]);

  const tick = useCallback((delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !initDone.current) return;
    const ctx      = canvas.getContext('2d');
    const { W, H } = sizeRef.current;
    const p        = player.current;
    const launch   = launchRef.current;
    const phase    = launchPhaseRef.current;

    timeRef.current += delta;
    const t = timeRef.current;

    const movementAllowed = !overlayOpenRef.current && (!phase || phase === 'countdown');
    if (movementAllowed) {
      const left  = keys.current['KeyA'] || keys.current['ArrowLeft'];
      const right = keys.current['KeyD'] || keys.current['ArrowRight'];
      p.vx += ((right ? SPEED : left ? -SPEED : 0) - p.vx) * Math.min(ACCEL * delta, 1);
      p.x   = Math.max(30, Math.min(W - 30, p.x + p.vx * delta));
    } else {
      p.vx *= 0.88;
    }

    if (phase === 'countdown') {
      launch.phaseTime    += delta;
      launch.countdownTimer = Math.max(0, 10 - launch.phaseTime);
      const prog = launch.phaseTime / 10;
      launch.shakeX = Math.sin(t * 48) * prog * prog * 2.8;
      launch.shakeY = Math.cos(t * 37) * prog * prog * 2.8;
      launch.alarmAlpha = 0.22 * (0.5 + 0.5 * Math.sin(t * 5.5));
      launch.ignitionLevel = Math.max(0.3, Math.min(1, (launch.phaseTime - 6) / 4));
      if (launch.phaseTime > 3.5 && Math.random() < prog * 12 * delta) spawnSmoke(launch, W / 2, H * 0.55 + 22);
      const newCount = Math.max(0, Math.ceil(launch.countdownTimer));
      if (newCount !== lastCountdownRef.current) {
        lastCountdownRef.current = newCount;
        setCountdownDisplay(newCount);
        if (newCount > 0) playCountdownBeep(newCount);
      }
      // Drive engine rumble intensity from ignition level
      if (engineRumbleRef.current) {
        engineRumbleRef.current.setLevel(Math.max(0, (launch.ignitionLevel - 0.3) / 0.7));
      }
      // Mission control comms
      COMMS_SCRIPT.forEach(({ key, threshold, from, msg }) => {
        if (!commsShownRef.current.has(key) && launch.countdownTimer <= threshold) {
          commsShownRef.current.add(key);
          setCommsLog((prev) => [...prev.slice(-4), { from, msg, id: key }]);
          speakCommsLine(msg, from);
        }
      });
      if (launch.phaseTime >= 10 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        launch.flashAlpha = 1.0; launch.alarmAlpha = 0; launch.ignitionLevel = 1; launch.phaseTime = 0;
        setCountdownDisplay(0); setLaunchPhase('ignition');
      }
    }

    if (phase === 'ignition') {
      launch.phaseTime  += delta;
      launch.flashAlpha  = Math.max(0, launch.flashAlpha * Math.pow(0.82, delta * 60));
      launch.ignitionLevel = 1;
      const intensity = 7 + Math.sin(t * 80) * 3;
      launch.shakeX = (Math.random() - 0.5) * intensity;
      launch.shakeY = (Math.random() - 0.5) * intensity;
      if (Math.random() < 0.90) spawnSmoke(launch, W / 2, H * 0.55 + 25);
      if (Math.random() < 0.75) spawnExhaust(launch, W / 2, H * 0.55 + 25);
      if (launch.phaseTime >= 1.6 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true; launch.phaseTime = 0; launch.rocketAscent = 0;
        setLaunchPhase('liftoff');
      }
    }

    if (phase === 'liftoff') {
      launch.phaseTime += delta;
      launch.rocketAscent -= (160 + launch.phaseTime * launch.phaseTime * 65) * delta;
      const targetCam = Math.max(0, -launch.rocketAscent - H * 0.12);
      launch.cameraOffset += (targetCam - launch.cameraOffset) * Math.min(3.5 * delta, 0.95);
      const shakeAmt = Math.max(0, 5.5 - launch.phaseTime * 2.0);
      launch.shakeX = (Math.random() - 0.5) * shakeAmt;
      launch.shakeY = (Math.random() - 0.5) * shakeAmt;
      if (Math.random() < 0.80) spawnExhaust(launch,  W / 2, H * 0.55 + launch.rocketAscent + 22);
      if (Math.random() < 0.35) spawnSmoke(launch,    W / 2, H * 0.55 + launch.rocketAscent + 35);
      if (Math.random() < 0.22) spawnContrail(launch, W / 2, H * 0.55 + launch.rocketAscent + 8);
      if (launch.rocketAscent < -H * 1.35 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true; launch.phaseTime = 0; setLaunchPhase('ascent');
      }
    }

    if (phase === 'ascent') {
      launch.phaseTime += delta;
      launch.rocketAscent -= (550 + launch.phaseTime * 280) * delta;
      const targetCam = Math.max(0, -launch.rocketAscent - H * 0.12);
      launch.cameraOffset += (targetCam - launch.cameraOffset) * Math.min(5 * delta, 0.98);
      launch.shakeX = 0; launch.shakeY = 0;
      if (launch.phaseTime > 1.5) launch.fadeAlpha = Math.min(1, (launch.phaseTime - 1.5) / 2.2);
      if (launch.phaseTime >= 4.5 && !launch.phaseTransitioned) {
        launch.phaseTransitioned = true;
        setLaunchPhase('complete');
        // Hand off to Mars launch scene after fade completes
        if (onLaunchCompleteRef.current) {
          setTimeout(onLaunchCompleteRef.current, 700);
        }
      }
    }

    updateParticles(launch, delta);

    const tPositions = TERMINALS.map((tm) => ({ ...tm, x: W / 2 + tm.relX * W, y: H * 0.72 }));
    if (!phase) {
      let nearest = null;
      tPositions.forEach((tm) => {
        const dx = p.x - tm.x, dy = p.y - tm.y;
        if (Math.sqrt(dx * dx + dy * dy) < TERMINAL_RADIUS) nearest = tm.id;
      });
      setNearTerminal((prev) => (prev === nearest ? prev : nearest));
    } else if (nearTerminal !== null) {
      setNearTerminal(null);
    }

    const ws = worldStateRef.current;
    const powered = ws.powerRestored || !!phase;
    const rocketGroundY = H * 0.55 + launch.rocketAscent;

    // NPC crew — init on first frame, detect world-state changes to trigger reactions
    if (!npcsRef.current) npcsRef.current = initNpcs(W, H);
    const npcPaused = overlayOpenRef.current || !!phase;
    if (!npcPaused) {
      const prev = prevWorldRef.current;
      const keys = ['powerRestored','fuelOnline','navCalibrated','commsOnline','diagnosticsOnline','engineOnline'];
      for (let k = 0; k < keys.length; k++) {
        if (ws[keys[k]] && !prev[keys[k]]) {
          triggerNpcReaction(npcsRef.current, W / 2);
          break;
        }
      }
      prevWorldRef.current = { ...ws };
    }
    updateNpcs(npcsRef.current, delta, W, H, npcPaused);

    if (!vehiclesRef.current) vehiclesRef.current = initVehicles(W, H);
    if (!phase) updateVehicles(vehiclesRef.current, delta, W, H);

    drawBackground(ctx, W, H, t);
    if (launch.alarmAlpha > 0.005) drawAlarmFlash(ctx, W, H, launch.alarmAlpha);

    ctx.save();
    ctx.translate(Math.round(launch.shakeX), Math.round(launch.shakeY - launch.cameraOffset));

    drawStars(ctx, starsRef.current, t);
    drawAtmosphere(ctx, W, H, t);
    drawHangar(ctx, W, H);
    drawCeilingLights(ctx, W, powered);
    drawFloor(ctx, W, H, W / 2, t);
    drawRocketLightCone(ctx, W / 2, rocketGroundY, H, t);
    drawLaunchPadRing(ctx, W / 2, rocketGroundY, t);
    if (!phase) {
      drawNpcs(ctx, npcsRef.current, t);
      drawVehicles(ctx, vehiclesRef.current, t);
    }
    if (powered) drawPoweredAmbient(ctx, W, H, t);

    if (!phase || phase === 'countdown') {
      updateDust(dustRef.current, delta, W, H);
      drawDust(ctx, dustRef.current, t);
    }

    drawParticles(ctx, launch);

    if (ws.navCalibrated && (!phase || phase === 'countdown')) {
      drawTrajectoryArc(ctx, W / 2, rocketGroundY, W, H, t);
    }

    drawEngineGlow(ctx, W / 2, rocketGroundY, launch.ignitionLevel);
    drawRocketAmbientParticles(ctx, W / 2, rocketGroundY, t);
    const rocketTopY = rocketGroundY - 232; // body (160) + nose (~72)
    drawGantry(ctx, W / 2, rocketGroundY, rocketTopY, W, H, t);
    drawRocket(ctx, W / 2, rocketGroundY, t, powered, launch.ignitionLevel);

    if (!phase || phase === 'countdown') {
      tPositions.forEach((tm) => {
        const isOnline = !!ws[SYSTEM_ONLINE_MAP[tm.id]];
        drawTerminal(ctx, tm.x, tm.y, tm.label, !phase && tm.id === nearTerminal, t, isOnline);
      });
      if (ws.powerRestored) drawPowerIndicators(ctx, tPositions, t);
    }

    const playerAlpha = phase === 'countdown'
      ? Math.max(0, Math.min(1, launch.countdownTimer / 2))
      : (phase ? 0 : 1);
    if (playerAlpha > 0.01) {
      ctx.save(); ctx.globalAlpha = playerAlpha;
      drawPlayer(ctx, p.x, p.y, p.vx, t);
      ctx.restore();
    }

    ctx.restore();

    if (launch.flashAlpha > 0.01) {
      ctx.fillStyle = `rgba(255,248,225,${Math.min(1, launch.flashAlpha)})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (launch.fadeAlpha > 0.005) {
      ctx.fillStyle = `rgba(2,5,18,${Math.min(1, launch.fadeAlpha)})`;
      ctx.fillRect(0, 0, W, H);
    }
  }, [keys]); // eslint-disable-line react-hooks/exhaustive-deps

  useGameLoop(tick);

  const nearLabel   = nearTerminal ? TERMINALS.find((t) => t.id === nearTerminal)?.label : null;
  const isLaunching = launchPhase && launchPhase !== 'complete';
  const isCritical  = countdownDisplay <= 3;
  const ws          = worldState;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} className="hangar-canvas" />
      <div className="game-vignette" />

      {!launchPhase && (
        <div className="hud-overlay">
          <div className="hud-chip">Phase <span>Rocket Builder</span></div>
          <div className="hud-chip">Bay <span>Hangar 1</span></div>
          {ws.powerRestored     && <div className="hud-chip hud-chip--online">Power       <span>Online</span></div>}
          {ws.fuelOnline        && <div className="hud-chip hud-chip--online">Fuel        <span>Online</span></div>}
          {ws.navCalibrated     && <div className="hud-chip hud-chip--online">Navigation  <span>Online</span></div>}
          {ws.commsOnline       && <div className="hud-chip hud-chip--online">Comms       <span>Online</span></div>}
          {ws.diagnosticsOnline && <div className="hud-chip hud-chip--online">Diagnostics <span>Online</span></div>}
          {ws.engineOnline      && <div className="hud-chip hud-chip--online">Engine      <span>Online</span></div>}
        </div>
      )}

      {nearLabel && !activeTerminal && !launchPhase && !IS_TOUCH && (
        <div className="interact-prompt"><kbd>E</kbd> Interact · {nearLabel}</div>
      )}

      {!launchPhase && <ProgressPanel progress={progress} />}

      {!launchPhase && !IS_TOUCH && (
        <div className="controls-hint">
          <div><kbd className="ck">A</kbd><kbd className="ck">D</kbd> Move</div>
          <div><kbd className="ck">E</kbd> Interact</div>
        </div>
      )}

      {!launchPhase && IS_TOUCH && (
        <div className="mobile-controls">
          <div className="mobile-dpad">
            <button
              className="mobile-btn mobile-btn--left"
              onTouchStart={(e) => { e.preventDefault(); keys.current['ArrowLeft'] = true; }}
              onTouchEnd={(e)   => { e.preventDefault(); keys.current['ArrowLeft'] = false; }}
              onTouchCancel={(e)=> { e.preventDefault(); keys.current['ArrowLeft'] = false; }}
              aria-label="Move left"
            >◀</button>
            <button
              className="mobile-btn mobile-btn--right"
              onTouchStart={(e) => { e.preventDefault(); keys.current['ArrowRight'] = true; }}
              onTouchEnd={(e)   => { e.preventDefault(); keys.current['ArrowRight'] = false; }}
              onTouchCancel={(e)=> { e.preventDefault(); keys.current['ArrowRight'] = false; }}
              aria-label="Move right"
            >▶</button>
          </div>
          {nearLabel && !activeTerminal && (
            <button className="mobile-btn mobile-btn--interact" onTouchStart={(e) => { e.preventDefault(); handleInteract(); }} aria-label="Interact">
              E
            </button>
          )}
        </div>
      )}

      {isLaunching && (
        <div className="launch-overlay">
          {launchPhase === 'countdown' && (
            <>
              <div className="launch-warning">Launch Sequence Initiated</div>
              <div className={`launch-countdown${isCritical ? ' launch-countdown--critical' : ''}`}>{countdownDisplay}</div>
              <div className="launch-status">{countdownStatusText(countdownDisplay)}</div>
            </>
          )}
          {launchPhase === 'ignition' && <div className="launch-event launch-event--ignition">Ignition</div>}
          {launchPhase === 'liftoff'  && <div className="launch-event launch-event--liftoff">Liftoff</div>}
          {commsLog.length > 0 && (
            <div className="launch-comms">
              {commsLog.map((line) => (
                <div key={line.id} className={`launch-comms-line launch-comms-line--${line.from}`}>
                  <span className="comms-from">{line.from === 'crew' ? 'CREW' : 'MC'}</span>{line.msg}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* launchPhase === 'complete' — MarsLaunchScene takes over via onLaunchComplete */}

      <TerminalOverlay
        terminal={activeTerminal}
        onClose={() => setActiveTerminal(null)}
        onMissionComplete={handleMissionComplete}
      />

      {!launchPhase && (
        <div className="game-status-bar">
          <span className="gsb-left">MISSION STATUS: <em>STANDBY</em></span>
          <span className="gsb-right">SYSTEM TIME: <em>{systemTime}</em></span>
        </div>
      )}
    </div>
  );
}
