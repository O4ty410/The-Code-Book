import React, { useState, useCallback } from 'react';
import { DEBUG_MISSIONS } from '../missions/debugMissions';
import { completeMission } from '../systems/progressionSystem';
import { playErrorSound, playSuccessSound, playTypeTick } from '../systems/audioSystem';

export default function DebugArena({ progress, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode]                 = useState(DEBUG_MISSIONS[0].brokenCode);
  const [status, setStatus]             = useState(null); // null | 'error' | 'success'
  const [statusMsg, setStatusMsg]       = useState('');
  const [attempts, setAttempts]         = useState(0);
  const [localProgress, setLocalProgress] = useState(progress);

  const mission = DEBUG_MISSIONS[currentIndex];

  const handleDeploy = useCallback(() => {
    if (mission.validate(code)) {
      playSuccessSound();
      setStatus('success');
      setStatusMsg(mission.successText);
      const updated = completeMission(localProgress, mission.id);
      setLocalProgress(updated);

      const isLast = currentIndex === DEBUG_MISSIONS.length - 1;
      setTimeout(() => {
        if (isLast) {
          onComplete(updated);
        } else {
          const next = currentIndex + 1;
          setCurrentIndex(next);
          setCode(DEBUG_MISSIONS[next].brokenCode);
          setStatus(null);
          setStatusMsg('');
          setAttempts(0);
        }
      }, 2200);
    } else {
      playErrorSound();
      setStatus('error');
      setAttempts((a) => a + 1);
      setStatusMsg('Fault unresolved. Review the error description and try again.');
    }
  }, [code, mission, currentIndex, localProgress, onComplete]);

  const handleChange = useCallback((e) => {
    setCode(e.target.value);
    if (status === 'error') setStatus(null);
    playTypeTick();
  }, [status]);

  const completed = DEBUG_MISSIONS.filter((m) => localProgress.completedMissions.includes(m.id)).length;

  return (
    <div className="debug-arena">
      {/* Header */}
      <div className="da-header">
        <div className="da-mode-label">DEBUG ARENA · PHASE 2</div>
        <div className="da-progress">{completed} / {DEBUG_MISSIONS.length} RESOLVED</div>
      </div>

      {/* Mission context */}
      <div className="da-context">
        <div className="da-context-system">{mission.systemContext}</div>
        <div className="da-context-title">{mission.title}</div>
        <div className="da-context-desc">{mission.description}</div>
      </div>

      {/* Editor */}
      <div className="da-editor-wrap">
        <div className="da-editor-bar">
          <span className="da-editor-file">system_diagnostic.js</span>
          <span className="da-editor-status">{status === 'success' ? '✓ RESOLVED' : status === 'error' ? '✕ FAULT ACTIVE' : '● EDITING'}</span>
        </div>
        <textarea
          className="da-editor"
          value={code}
          onChange={handleChange}
          spellCheck={false}
          rows={code.split('\n').length + 2}
          disabled={status === 'success'}
        />
      </div>

      {/* Hint */}
      {attempts >= 2 && status !== 'success' && (
        <div className="da-hint">
          <span className="da-hint-label">HINT</span>
          {mission.hint}
        </div>
      )}

      {/* Status bar */}
      {statusMsg && (
        <div className={`da-status da-status--${status}`}>{statusMsg}</div>
      )}

      {/* Deploy */}
      {status !== 'success' && (
        <button className="da-deploy-btn" onClick={handleDeploy}>
          RUN DIAGNOSTIC
        </button>
      )}
    </div>
  );
}
