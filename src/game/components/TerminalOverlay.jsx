import React, { useState, useEffect, useRef, useCallback } from 'react';

const TYPEWRITER_MS = 18; // ms per character

export default function TerminalOverlay({ terminal, onClose }) {
  const isOpen = terminal !== null;

  const [msgIndex,  setMsgIndex]  = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [history,   setHistory]   = useState([]);
  const [done,      setDone]      = useState(false);

  const bodyRef    = useRef(null);
  const timerRef   = useRef(null);

  // Reset state whenever a new terminal is opened
  useEffect(() => {
    if (!isOpen) return;
    setMsgIndex(0);
    setCharCount(0);
    setHistory([]);
    setDone(false);
  }, [terminal?.id, isOpen]);

  // Typewriter — restart whenever msgIndex or terminal changes
  useEffect(() => {
    if (!isOpen || !terminal) return;
    const msg = terminal.sequence[msgIndex];
    if (!msg) return;

    setCharCount(0);
    let count = 0;
    timerRef.current = setInterval(() => {
      count++;
      setCharCount(count);
      if (count >= msg.text.length) clearInterval(timerRef.current);
    }, TYPEWRITER_MS);

    return () => clearInterval(timerRef.current);
  }, [msgIndex, terminal?.id, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll body when text grows
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [charCount, history.length]);

  const currentMsg = terminal?.sequence[msgIndex];
  const isTyping   = Boolean(currentMsg && charCount < currentMsg.text.length);
  const visibleText = currentMsg ? currentMsg.text.slice(0, charCount) : '';

  const advance = useCallback(() => {
    if (!terminal || done) return;
    const msg = terminal.sequence[msgIndex];

    // Still typing? Skip to end instantly
    if (isTyping) {
      clearInterval(timerRef.current);
      setCharCount(msg.text.length);
      return;
    }

    // Push current message to history
    const nextHistory = [...history, msg.text];

    if (msg.isLast || msgIndex + 1 >= terminal.sequence.length) {
      setHistory(nextHistory);
      setDone(true);
      return;
    }

    setHistory(nextHistory);
    setMsgIndex((i) => i + 1);
  }, [terminal, msgIndex, isTyping, done, history]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Space / Enter to advance
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, advance]);

  return (
    <div
      className={`terminal-backdrop${isOpen ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {terminal && (
        <div className="terminal-panel">
          <div className="terminal-scanlines" />

          {/* ── Header ── */}
          <div className="t-header">
            <div className="t-header-left">
              <span className="t-dot" />
              <span className="t-label">{terminal.label}</span>
              {terminal.offline && <span className="t-offline-badge">OFFLINE</span>}
            </div>
            <div className="t-header-right">
              <span className="t-esc-hint">ESC to close</span>
              <button className="t-close-btn" onClick={onClose} aria-label="Close terminal">✕</button>
            </div>
          </div>

          {/* ── Status bar ── */}
          <div className="t-statusbar">
            <span className={`t-status-dot${terminal.offline ? ' t-status-dot--offline' : ''}`} />
            <span className="t-status-text">{terminal.statusLine}</span>
          </div>

          {/* ── Dialogue body ── */}
          <div className="t-body" ref={bodyRef}>

            {/* Past messages */}
            {history.map((text, i) => (
              <div key={i} className="t-history-msg">
                <div className="t-ai-tag">{terminal.ai.name}</div>
                <p className="t-msg-text t-msg-old">{text}</p>
              </div>
            ))}

            {/* Current message with typewriter */}
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

            {/* End of sequence */}
            {done && (
              <div className="t-done">
                <span className="t-done-line" />
                <span className="t-done-text">End of transmission</span>
                <span className="t-done-line" />
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="t-footer">
            {done ? (
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
        </div>
      )}
    </div>
  );
}
