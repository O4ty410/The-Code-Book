import React, { useState, useCallback } from 'react';
import { DEBUG_MISSIONS } from '../missions/debugMissions';
import { completeMission } from '../systems/progressionSystem';
import { playErrorSound, playSuccessSound, playTypeTick } from '../systems/audioSystem';

export default function DebugArena({ progress, onComplete }) {
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [code,           setCode]           = useState(DEBUG_MISSIONS[0].brokenCode);
  const [status,         setStatus]         = useState(null); // null | 'error' | 'success'
  const [statusMsg,      setStatusMsg]      = useState('');
  const [attempts,       setAttempts]       = useState(0);
  const [localProgress,  setLocalProgress]  = useState(progress);

  const mission   = DEBUG_MISSIONS[currentIndex];
  const completed = DEBUG_MISSIONS.filter((m) => localProgress.completedMissions.includes(m.id)).length;

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
      }, 2400);
    } else {
      playErrorSound();
      setStatus('error');
      setAttempts((a) => a + 1);
      setStatusMsg('Fault unresolved. Re-examine the code and try again.');
    }
  }, [code, mission, currentIndex, localProgress, onComplete]);

  const handleChange = useCallback((e) => {
    setCode(e.target.value);
    if (status === 'error') setStatus(null);
    playTypeTick();
  }, [status]);

  return (
    <div className="debug-arena">

      {/* Header */}
      <div className="da-header">
        <div className="da-mode-label">DEBUG ARENA · PHASE 2</div>
        <div className="da-progress">{completed} / {DEBUG_MISSIONS.length} RESOLVED</div>
      </div>

      <div className="da-body">

        {/* Step 1 — System Context */}
        <div className="da-step">
          <div className="da-step-label">STEP 1 · SYSTEM CONTEXT</div>
          <div className="da-step-text">{mission.systemContext}</div>
        </div>

        {/* Step 2 — System Explanation */}
        <div className="da-step">
          <div className="da-step-label">STEP 2 · SYSTEM EXPLANATION</div>
          <div className="da-step-text">{mission.systemExplanation}</div>
        </div>

        {/* Step 3 — Coding Concept */}
        <div className="da-step da-step--concept">
          <div className="da-step-label">STEP 3 · CODING CONCEPT · <span className="da-concept-tag">{mission.codingConcept}</span></div>
          <div className="da-step-text">{mission.conceptDetail}</div>
        </div>

        {/* Step 4 — Player Task (code editor) */}
        <div className="da-step da-step--task">
          <div className="da-step-label">STEP 4 · PLAYER TASK · {mission.title}</div>
          <div className="da-editor-wrap">
            <div className="da-editor-bar">
              <span className="da-editor-file">system_diagnostic.js</span>
              <span className="da-editor-status">
                {status === 'success' ? '✓ RESOLVED' : status === 'error' ? '✕ FAULT ACTIVE' : '● EDITING'}
              </span>
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

          {attempts >= 2 && status !== 'success' && (
            <div className="da-hint">
              <span className="da-hint-label">DIAGNOSTIC HINT</span>
              {mission.hint}
            </div>
          )}

          {status !== 'success' && (
            <button className="da-deploy-btn" onClick={handleDeploy}>
              RUN DIAGNOSTIC
            </button>
          )}
        </div>

        {/* Step 5 — System Response */}
        {statusMsg && (
          <div className="da-step da-step--response">
            <div className="da-step-label">STEP 5 · SYSTEM RESPONSE</div>
            <div className={`da-step-response da-step-response--${status}`}>
              {statusMsg}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
