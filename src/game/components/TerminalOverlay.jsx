import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getMission } from '../missions';
import { playSuccessSound } from '../systems/audioSystem';
import CodeRepairChallenge from './CodeRepairChallenge';

const TYPEWRITER_MS = 18;

// ── TerminalOverlay ───────────────────────────────────────────────────────
// Phases:
//   intro     → standard ARIA dialogue from terminal.sequence
//   challenge → CodeRepairChallenge for the current mission
//   success   → ARIA success dialogue from mission.success.dialogue
//   complete  → end state, shows mission-complete close button

export default function TerminalOverlay({ terminal, onClose, onMissionComplete }) {
  const isOpen = terminal !== null;

  const [phase,          setPhase]          = useState('intro');
  const [currentMission, setCurrentMission] = useState(null);
  const [msgIndex,       setMsgIndex]       = useState(0);
  const [charCount,      setCharCount]      = useState(0);
  const [history,        setHistory]        = useState([]);
  const [done,           setDone]           = useState(false);

  const bodyRef   = useRef(null);
  const timerRef  = useRef(null);

  // Which dialogue sequence is active
  const activeSeqRef = useRef(null);
  activeSeqRef.current = (phase === 'success' && currentMission)
    ? currentMission.success.dialogue
    : terminal?.sequence;

  // Reset everything when a new terminal opens
  useEffect(() => {
    if (!isOpen) return;
    clearInterval(timerRef.current);
    setPhase('intro');
    setCurrentMission(null);
    setMsgIndex(0);
    setCharCount(0);
    setHistory([]);
    setDone(false);
  }, [terminal?.id, isOpen]);

  // Typewriter — restart on each new message or phase change
  useEffect(() => {
    if (!isOpen) return;
    if (phase === 'challenge' || phase === 'complete') return;
    const seq = activeSeqRef.current;
    if (!seq) return;
    const msg = seq[msgIndex];
    if (!msg) return;

    setCharCount(0);
    let count = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      count++;
      setCharCount(count);
      if (count >= msg.text.length) clearInterval(timerRef.current);
    }, TYPEWRITER_MS);

    return () => clearInterval(timerRef.current);
  }, [msgIndex, terminal?.id, phase, isOpen]);

  // Auto-scroll body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [charCount, history.length]);

  const seq         = activeSeqRef.current;
  const currentMsg  = seq?.[msgIndex];
  const isTyping    = Boolean(currentMsg && charCount < currentMsg.text.length);
  const visibleText = currentMsg ? currentMsg.text.slice(0, charCount) : '';

  // Advance dialogue
  const advance = useCallback(() => {
    const seq = activeSeqRef.current;
    if (!seq || phase === 'challenge' || phase === 'complete') return;
    const msg = seq[msgIndex];
    if (!msg) return;

    // Skip typewriter
    if (isTyping) {
      clearInterval(timerRef.current);
      setCharCount(msg.text.length);
      return;
    }

    // Mission trigger (intro phase only)
    if (phase === 'intro' && msg.type === 'mission') {
      const mission = getMission(msg.missionId);
      setCurrentMission(mission);
      setHistory([]);
      setPhase('challenge');
      return;
    }

    const nextHistory = [...history, msg.text];

    if (msg.isLast || msgIndex + 1 >= seq.length) {
      setHistory(nextHistory);
      setDone(true);
      if (phase === 'success') setPhase('complete');
      return;
    }

    setHistory(nextHistory);
    setMsgIndex((i) => i + 1);
  }, [phase, msgIndex, isTyping, history]);

  // Challenge success → success dialogue
  const handleChallengeSuccess = useCallback(() => {
    if (!currentMission) return;
    playSuccessSound();
    onMissionComplete?.(currentMission.id, currentMission.success.worldEffect);
    setMsgIndex(0);
    setCharCount(0);
    setHistory([]);
    setDone(false);
    setPhase('success');
  }, [currentMission, onMissionComplete]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.code === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Space / Enter to advance (disabled during challenge so input isn't hijacked)
  useEffect(() => {
    if (!isOpen || phase === 'challenge') return;
    const handler = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, phase, advance]);

  // ── derived state ─────────────────────────────────────────────────────────
  const isSuccess    = phase === 'success' || phase === 'complete';
  const panelClass   = ['terminal-panel', isSuccess ? 'terminal-panel--success' : ''].filter(Boolean).join(' ');
  const statusLine   = isSuccess
    ? 'POWER RESTORED · ALL SYSTEMS NOMINAL'
    : (terminal?.statusLine ?? '');

  return (
    <div
      className={`terminal-backdrop${isOpen ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {terminal && (
        <div className={panelClass}>
          <div className="terminal-scanlines" />

          {/* ── Header ── */}
          <div className="t-header">
            <div className="t-header-left">
              <span className={`t-dot${isSuccess ? ' t-dot--success' : ''}`} />
              <span className="t-label">{terminal.label}</span>
              {terminal.offline && <span className="t-offline-badge">OFFLINE</span>}
              {phase === 'challenge' && currentMission && (
                <span className="t-mission-badge t-mission-badge--active">
                  {currentMission.title}
                </span>
              )}
              {phase === 'complete' && (
                <span className="t-mission-badge t-mission-badge--done">Mission Complete</span>
              )}
            </div>
            <div className="t-header-right">
              <span className="t-esc-hint">ESC to close</span>
              <button className="t-close-btn" onClick={onClose} aria-label="Close terminal">✕</button>
            </div>
          </div>

          {/* ── Status bar ── */}
          <div className="t-statusbar">
            <span className={`t-status-dot${terminal.offline && !isSuccess ? ' t-status-dot--offline' : ''}`} />
            <span className="t-status-text">{statusLine}</span>
          </div>

          {/* ── Dialogue body (intro / success / complete phases) ── */}
          {phase !== 'challenge' && (
            <div className="t-body" ref={bodyRef}>
              {history.map((text, i) => (
                <div key={i} className="t-history-msg">
                  <div className="t-ai-tag">{terminal.ai.name}</div>
                  <p className="t-msg-text t-msg-old">{text}</p>
                </div>
              ))}

              {!done && currentMsg && (
                <div className="t-current-msg" onClick={advance}>
                  <div className="t-ai-tag">
                    {terminal.ai.name}
                    <span className="t-ai-title">{terminal.ai.title}</span>
                  </div>
                  <p className="t-msg-text">
                    {visibleText}
                    {isTyping && <span className="t-cursor">▋</span>}
                  </p>
                </div>
              )}

              {done && phase === 'intro' && (
                <div className="t-done">
                  <span className="t-done-line" />
                  <span className="t-done-text">End of transmission</span>
                  <span className="t-done-line" />
                </div>
              )}
            </div>
          )}

          {/* ── Challenge ── */}
          {phase === 'challenge' && currentMission && (
            <CodeRepairChallenge
              mission={currentMission}
              onSuccess={handleChallengeSuccess}
            />
          )}

          {/* ── Footer (hidden during challenge — it has its own deploy button) ── */}
          {phase !== 'challenge' && (
            <div className="t-footer">
              {phase === 'complete' ? (
                <button className="t-action-btn t-mission-complete-btn" onClick={onClose}>
                  [ Mission Complete — Close Terminal ]
                </button>
              ) : done ? (
                <button className="t-action-btn t-close-action" onClick={onClose}>
                  [ Close Terminal ]
                </button>
              ) : (
                <button
                  className={`t-action-btn${isTyping ? ' t-btn-skip' : ''}`}
                  onClick={advance}
                >
                  {isTyping ? '[ Skip ▶▶ ]' : '[ Continue ▶ ]'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
