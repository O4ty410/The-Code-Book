import React from 'react';

export default function BriefingRoom({ onContinue }) {
  return (
    <div className="scene-center" style={{ gap: 0 }}>
      <h1 className="scene-title" style={{ fontSize: 'clamp(1.4rem,4vw,2.4rem)', marginBottom: 24 }}>
        Mission Briefing
      </h1>
      <p className="scene-sub" style={{ maxWidth: 480, textAlign: 'center', lineHeight: 1.8, marginBottom: 48, letterSpacing: '0.06em', textTransform: 'none', fontSize: '0.95rem' }}>
        Commander, you have been selected to lead Launch Sequence — a mission to
        unlock the knowledge buried in each sector of the station. Study the
        terminals, pass the checks, and earn your launch clearance.
      </p>
      <button className="scene-btn" onClick={onContinue}>Enter Hangar</button>
    </div>
  );
}
