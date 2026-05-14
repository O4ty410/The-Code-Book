import React, { useState } from 'react';

export default function CodeRepairChallenge({ mission, onSuccess }) {
  const [code,      setCode]      = useState(mission.challenge.brokenCode);
  const [status,    setStatus]    = useState('idle'); // idle | error | success
  const [attempts,  setAttempts]  = useState(0);
  const [showHint,  setShowHint]  = useState(false);

  function handleDeploy() {
    if (status === 'success') return;
    const next = attempts + 1;
    setAttempts(next);

    if (mission.challenge.validate(code)) {
      setStatus('success');
      // short delay so the success message renders before transitioning
      setTimeout(() => onSuccess(), 900);
    } else {
      setStatus('error');
      if (next >= 2) setShowHint(true);
    }
  }

  function handleChange(e) {
    setCode(e.target.value);
    if (status === 'error') setStatus('idle');
  }

  return (
    <div className="cr-container">

      {/* Mission header */}
      <div className="cr-header">
        <span className="cr-badge">Mission</span>
        <span className="cr-title">{mission.title}</span>
      </div>

      <p className="cr-objective">{mission.objective}</p>

      {/* Context paragraph */}
      <div className="cr-context">{mission.challenge.context}</div>

      {/* Code editor */}
      <div className={`cr-editor-wrap${status === 'error' ? ' cr-editor-wrap--error' : ''}${status === 'success' ? ' cr-editor-wrap--success' : ''}`}>
        <div className="cr-editor-bar">
          <span className="cr-file-name">power_management.js</span>
          {status === 'success' && <span className="cr-badge-ok">✓ FIXED</span>}
          {status === 'error'   && <span className="cr-badge-err">✗ ERROR</span>}
        </div>
        <textarea
          className={`cr-editor${status === 'success' ? ' cr-editor--success' : ''}`}
          value={code}
          onChange={handleChange}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          disabled={status === 'success'}
          rows={4}
          onKeyDown={(e) => {
            // Tab inserts 2 spaces instead of blurring
            if (e.key === 'Tab') {
              e.preventDefault();
              const s = e.target.selectionStart;
              const val = code.slice(0, s) + '  ' + code.slice(e.target.selectionEnd);
              setCode(val);
              requestAnimationFrame(() => {
                e.target.selectionStart = e.target.selectionEnd = s + 2;
              });
            }
          }}
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="cr-error-msg">
          ReferenceError — variable not found. The runtime couldn't resolve that name.
        </div>
      )}

      {/* Hint (appears after 2 failed attempts) */}
      {showHint && status !== 'success' && (
        <div className="cr-hint">
          <span className="cr-hint-label">Hint</span>
          <span>{mission.challenge.hint}</span>
        </div>
      )}

      {/* Success message */}
      {status === 'success' && (
        <div className="cr-success-msg">
          Fix deployed. Restoring power output...
        </div>
      )}

      {/* Deploy button */}
      {status !== 'success' && (
        <button className="cr-deploy-btn" onClick={handleDeploy}>
          [ Deploy Fix ]
        </button>
      )}
    </div>
  );
}
