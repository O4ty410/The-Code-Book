import React from 'react';
import { ROCKET_SYSTEMS, isMissionComplete } from '../systems/progressionSystem';

export default function ProgressPanel({ progress }) {
  const completed = ROCKET_SYSTEMS.filter((s) => isMissionComplete(progress, s.missionId)).length;
  const total     = ROCKET_SYSTEMS.length;

  return (
    <div className="progress-panel">
      <div className="pp-header">
        <span className="pp-title">Rocket Systems</span>
        <span className="pp-count">
          <span className="pp-count-num">{completed}</span>
          <span className="pp-count-sep">/</span>
          <span className="pp-count-total">{total}</span>
        </span>
      </div>

      <div className="pp-systems">
        {ROCKET_SYSTEMS.map((sys) => {
          const online = isMissionComplete(progress, sys.missionId);
          return (
            <div key={sys.id} className={`pp-system${online ? ' pp-system--online' : ' pp-system--locked'}`}>
              <span className="pp-dot" />
              <span className="pp-name">{sys.label}</span>
              <span className="pp-badge">{online ? 'Online' : 'Locked'}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="pp-bar-track">
        <div
          className="pp-bar-fill"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
