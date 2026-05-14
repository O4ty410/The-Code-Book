import React, { useState, useCallback, useEffect } from 'react';
import { VISUAL_CHALLENGES } from '../missions/visualChallenges';
import { completeMission } from '../systems/progressionSystem';
import { playErrorSound, playSuccessSound, startVisualAmbient } from '../systems/audioSystem';

export default function VisualLab({ progress, onComplete }) {
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [selected,      setSelected]      = useState(null);

  useEffect(() => { const stop = startVisualAmbient(); return stop; }, []);
  const [confirmed,     setConfirmed]     = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  const challenge = VISUAL_CHALLENGES[currentIndex];
  const isCorrect = selected === challenge.correct;
  const completed = VISUAL_CHALLENGES.filter((c) => localProgress.completedMissions.includes(c.id)).length;

  const handleConfirm = useCallback(() => {
    if (!selected) return;
    setConfirmed(true);

    if (isCorrect) {
      playSuccessSound();
      const updated = completeMission(localProgress, challenge.id);
      setLocalProgress(updated);

      const isLast = currentIndex === VISUAL_CHALLENGES.length - 1;
      setTimeout(() => {
        if (isLast) {
          onComplete(updated);
        } else {
          const next = currentIndex + 1;
          setCurrentIndex(next);
          setSelected(null);
          setConfirmed(false);
        }
      }, 2600);
    } else {
      playErrorSound();
    }
  }, [selected, isCorrect, challenge, currentIndex, localProgress, onComplete]);

  const handleRetry = useCallback(() => {
    setSelected(null);
    setConfirmed(false);
  }, []);

  return (
    <div className="visual-lab">

      {/* Header */}
      <div className="vl-header">
        <div className="vl-mode-label">VISUAL LAB · PHASE 3</div>
        <div className="vl-progress">{completed} / {VISUAL_CHALLENGES.length} CONFIRMED</div>
      </div>

      <div className="vl-body">

        {/* Step 1 — System Context */}
        <div className="vl-step">
          <div className="vl-step-label">STEP 1 · SYSTEM CONTEXT</div>
          <div className="vl-step-text">{challenge.systemContext}</div>
        </div>

        {/* Step 2 — System Explanation */}
        <div className="vl-step">
          <div className="vl-step-label">STEP 2 · SYSTEM EXPLANATION</div>
          <div className="vl-step-text">{challenge.systemExplanation}</div>
        </div>

        {/* Step 3 — Coding Concept */}
        <div className="vl-step vl-step--concept">
          <div className="vl-step-label">STEP 3 · CODING CONCEPT · <span className="vl-concept-tag">{challenge.codingConcept}</span></div>
          <div className="vl-step-text">{challenge.conceptDetail}</div>
        </div>

        {/* Step 4 — Player Task */}
        <div className="vl-step vl-step--task">
          <div className="vl-step-label">STEP 4 · PLAYER TASK · {challenge.title}</div>
          <div className="vl-instruction">{challenge.instruction}</div>

          {/* Read-only code */}
          <div className="vl-code-wrap">
            <div className="vl-code-bar">
              <span className="vl-code-label">SYSTEM CODE · READ ONLY</span>
            </div>
            <pre className="vl-code">{challenge.code}</pre>
          </div>

          {/* Answer options */}
          <div className="vl-options">
            {challenge.options.map((opt) => {
              let cls = 'vl-option';
              if (confirmed) {
                if (opt.value === challenge.correct) cls += ' vl-option--correct';
                else if (opt.value === selected)     cls += ' vl-option--wrong';
              } else if (opt.value === selected) {
                cls += ' vl-option--selected';
              }
              return (
                <button
                  key={opt.value}
                  className={cls}
                  onClick={() => !confirmed && setSelected(opt.value)}
                  disabled={confirmed}
                >
                  <span className="vl-option-key">{opt.value.toUpperCase()}</span>
                  <span className="vl-option-label">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {!confirmed && (
            <button
              className={`vl-confirm-btn${selected ? '' : ' vl-confirm-btn--disabled'}`}
              onClick={handleConfirm}
              disabled={!selected}
            >
              CONFIRM READING
            </button>
          )}
        </div>

        {/* Step 5 — System Response */}
        {confirmed && (
          <div className="vl-step vl-step--response">
            <div className="vl-step-label">STEP 5 · SYSTEM RESPONSE</div>
            <div className={`vl-response vl-response--${isCorrect ? 'correct' : 'wrong'}`}>
              <div className="vl-response-head">{isCorrect ? 'BEHAVIOUR CONFIRMED' : 'READING INCORRECT'}</div>
              <div className="vl-response-body">{challenge.explanation}</div>
              {!isCorrect && (
                <button className="vl-retry-btn" onClick={handleRetry}>
                  RE-ANALYSE
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
