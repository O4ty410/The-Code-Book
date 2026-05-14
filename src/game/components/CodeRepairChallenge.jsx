import React, { useState } from 'react';
import { playErrorSound } from '../systems/audioSystem';

const FILE_NAMES = {
  power_restoration: 'power_management.js',
  nav_calibration:   'flight_control.js',
};

const ERROR_MSGS = {
  power_restoration: "ReferenceError: 'powr' is not defined. Variable names must match exactly — every character counts.",
  nav_calibration:   "TypeError: Invalid assignment target. The = operator assigns a value; use >= to compare.",
};

const SUCCESS_MSGS = {
  power_restoration: 'Fix deployed. Restoring power output...',
  nav_calibration:   'Fix deployed. Locking orbital trajectory...',
};

export default function CodeRepairChallenge({ mission, onSuccess }) {
  const [code,     setCode]     = useState(mission.challenge.brokenCode);
  const [status,   setStatus]   = useState('idle'); // idle | error | success
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const fileName   = FILE_NAMES[mission.id]   ?? `${mission.id}.js`;
  const errorMsg   = ERROR_MSGS[mission.id]   ?? 'SyntaxError — code could not be executed.';
  const successMsg = SUCCESS_MSGS[mission.id] ?? 'Fix deployed. System restoring...';

  function handleDeploy() {
    if (status === 'success') return;
    const next = attempts + 1;
    setAttempts(next);

    if (mission.challenge.validate(code)) {
      setStatus('success');
      setTimeout(() => onSuccess(), 900);
    } else {
      setStatus('error');
      playErrorSound();
      if (next >= 2) setShowHint(true);
    }
  }

  function handleChange(e) {
    setCode(e.target.value);
    if (status === 'error') setStatus('idle');
  }

  return (
    <div className="cr-container">

      <div className="cr-header">
        <span className="cr-badge">Mission</span>
        <span className="cr-title">{mission.title}</span>
      </div>

      <p className="cr-objective">{mission.objective}</p>

      <div className="cr-context">{mission.challenge.context}</div>

      <div className={`cr-editor-wrap${status === 'error' ? ' cr-editor-wrap--error' : ''}${status === 'success' ? ' cr-editor-wrap--success' : ''}`}>
        <div className="cr-editor-bar">
          <span className="cr-file-name">{fileName}</span>
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
          rows={mission.challenge.brokenCode.split('\n').length + 1}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const s   = e.target.selectionStart;
              const val = code.slice(0, s) + '  ' + code.slice(e.target.selectionEnd);
              setCode(val);
              requestAnimationFrame(() => {
                e.target.selectionStart = e.target.selectionEnd = s + 2;
              });
            }
          }}
        />
      </div>

      {status === 'error' && (
        <div className="cr-error-msg" key={attempts}>
          {errorMsg}
        </div>
      )}

      {showHint && status !== 'success' && (
        <div className="cr-hint">
          <span className="cr-hint-label">Hint</span>
          <span>{mission.challenge.hint}</span>
        </div>
      )}

      {status === 'success' && (
        <div className="cr-success-msg">{successMsg}</div>
      )}

      {status !== 'success' && (
        <button className="cr-deploy-btn" onClick={handleDeploy}>
          [ Deploy Fix ]
        </button>
      )}
    </div>
  );
}
