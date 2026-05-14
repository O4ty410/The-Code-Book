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
} from '../systems/renderSystem';
import TerminalOverlay from '../components/TerminalOverlay';
import { getTerminal } from '../terminals';
import '../styles/game.css';

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

export default function HangarScene({ onInteract }) {
  const canvasRef = useRef(null);

  // game state in refs — no re-renders per tick
  const player   = useRef({ x: 0, y: 0, vx: 0 });
  const starsRef = useRef([]);
  const timeRef  = useRef(0);
  const sizeRef  = useRef({ W: 1, H: 1 });
  const initDone = useRef(false);

  // UI state
  const [nearTerminal,    setNearTerminal]    = useState(null);
  const [activeTerminal,  setActiveTerminal]  = useState(null);

  // Ref so the RAF tick can read overlay state without stale closure
  const overlayOpenRef = useRef(false);
  useEffect(() => {
    overlayOpenRef.current = activeTerminal !== null;
  }, [activeTerminal]);

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
      if (e.code === 'KeyE' && nearTerminal && !overlayOpenRef.current) {
        const tm = TERMINALS.find((t) => t.id === nearTerminal);
        setActiveTerminal(getTerminal(nearTerminal, tm?.label));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nearTerminal]);

  // ── game loop ─────────────────────────────────────────────────────────────
  const tick = useCallback((delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !initDone.current) return;
    const ctx   = canvas.getContext('2d');
    const { W, H } = sizeRef.current;
    const p     = player.current;

    timeRef.current += delta;
    const t = timeRef.current;

    // movement input — frozen while terminal overlay is open
    if (!overlayOpenRef.current) {
      const left  = keys.current['KeyA'] || keys.current['ArrowLeft'];
      const right = keys.current['KeyD'] || keys.current['ArrowRight'];
      const targetVX = right ? SPEED : left ? -SPEED : 0;
      p.vx += (targetVX - p.vx) * Math.min(ACCEL * delta, 1);
      p.x   = Math.max(30, Math.min(W - 30, p.x + p.vx * delta));
    } else {
      p.vx *= 0.85; // decelerate to stop while overlay open
    }

    // terminal positions (relative to canvas width)
    const tPositions = TERMINALS.map((tm) => ({
      ...tm,
      x: W / 2 + tm.relX * W,
      y: H * 0.72,
    }));

    // proximity check
    let nearest = null;
    tPositions.forEach((tm) => {
      const dx = p.x - tm.x;
      const dy = p.y - tm.y;
      if (Math.sqrt(dx * dx + dy * dy) < TERMINAL_RADIUS) nearest = tm.id;
    });
    setNearTerminal(nearest);

    // ── draw ──────────────────────────────────────────────────────────────
    drawBackground(ctx, W, H);
    drawStars(ctx, starsRef.current, t);
    drawHangar(ctx, W, H);
    drawCeilingLights(ctx, W);
    drawFloor(ctx, W, H);

    // rocket — centered
    drawRocket(ctx, W / 2, H * 0.55, t);

    // terminals
    tPositions.forEach((tm) => {
      drawTerminal(ctx, tm.x, tm.y, tm.label, tm.id === nearest, t);
    });

    // player
    drawPlayer(ctx, p.x, p.y, p.vx, t);
  }, [keys]);

  useGameLoop(tick);

  // ── nearest terminal label for prompt ────────────────────────────────────
  const nearLabel = nearTerminal
    ? TERMINALS.find((t) => t.id === nearTerminal)?.label
    : null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} className="hangar-canvas" />

      {/* HUD chips */}
      <div className="hud-overlay">
        <div className="hud-chip">Mission <span>Active</span></div>
        <div className="hud-chip">Location <span>Hangar Bay 1</span></div>
      </div>

      {/* Interact prompt — hidden while terminal is open */}
      {nearLabel && !activeTerminal && (
        <div className="interact-prompt">
          <kbd>E</kbd> Interact · {nearLabel}
        </div>
      )}

      {/* Controls hint */}
      <div className="controls-hint">
        WASD / ↑↓←→ Move<br />
        E — Interact
      </div>

      {/* Terminal overlay — always mounted so CSS transition plays */}
      <TerminalOverlay
        terminal={activeTerminal}
        onClose={() => setActiveTerminal(null)}
      />
    </div>
  );
}
