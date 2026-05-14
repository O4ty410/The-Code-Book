import React, { useState, useCallback } from 'react';
import { VISUAL_CHALLENGES } from '../missions/visualChallenges';
import { completeMission } from '../systems/progressionSystem';
import { playErrorSound, playSuccessSound } from '../systems/audioSystem';

export default function VisualLab({ progress, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState(null);
  const [confirmed, setConfirmed]       = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  const challenge = VISUAL_CHALLENGES[currentIndex];
  const isCorrect = selected === challenge.correct;

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

  const completed = VISUAL_CHALLENGES.filter((c) => localProgress.completedMissions.includes(c.id)).length;

  return (
    <div className="visual-lab">
      {/* Header */}
      <div className="vl-header">
        <div className="vl-mode-label">VISUAL LAB · PHASE 3</div>
        <div className="vl-progress">{completed} / {VISUAL_CHALLENGES.length} CONFIRMED</div>
      </div>

      {/* Challenge context */}
      <div className="vl-context">
        <div className="vl-context-system">{challenge.systemContext}</div>
        <div className="vl-context-title">{challenge.title}</div>
        <div className="vl-instruction">{challenge.instruction}</div>
      </div>

      {/* Code display — read only */}
      <div className="vl-code-wrap">
        <div className="vl-code-bar">
          <span className="vl-code-label">SYSTEM CODE · READ ONLY</span>
        </div>
        <pre className="vl-code">{challenge.code}</pre>
      </div>

      {/* Options */}
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

      {/* Explanation */}
      {confirmed && (
        <div className={`vl-explanation vl-explanation--${isCorrect ? 'correct' : 'wrong'}`}>
          <div className="vl-explanation-head">{isCorrect ? 'CONFIRMED' : 'INCORRECT'}</div>
          <div className="vl-explanation-body">{challenge.explanation}</div>
          {!isCorrect && (
            <button className="vl-retry-btn" onClick={handleRetry}>
              RE-ANALYSE
            </button>
          )}
        </div>
      )}

      {/* Confirm button */}
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
  );
}
