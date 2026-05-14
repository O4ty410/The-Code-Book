import React from 'react';
import Button from '../components/Button';

export default function BriefingRoom({ onContinue }) {
  return (
    <div className="scene scene--briefing">
      <h2>Mission Briefing</h2>
      <p>
        Commander, you have been selected to lead Launch Sequence — a mission to
        unlock the knowledge buried in each sector of the station. Study the
        lessons, pass the checks, and earn your launch clearance.
      </p>
      <Button label="I'm Ready" onClick={onContinue} />
    </div>
  );
}
