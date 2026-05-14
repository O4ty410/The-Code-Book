import React from 'react';

export default function BriefingRoom({ onContinue }) {
  return (
    <div className="scene-center">
      <h1 className="scene-title briefing-title">
        Mission Briefing
      </h1>
      <p className="scene-sub briefing-body">
        Commander, you have been selected to lead Launch Sequence — a mission to
        unlock the knowledge buried in each sector of the station. Study the
        terminals, pass the checks, and earn your launch clearance.
      </p>
      <button className="scene-btn" onClick={onContinue}>Enter Hangar</button>
    </div>
  );
}
