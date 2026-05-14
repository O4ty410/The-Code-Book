import React from 'react';

export default function HUD({ playerData }) {
  const { xp, level } = playerData;
  return (
    <div className="hud">
      <span className="hud-level">LVL {level}</span>
      <span className="hud-xp">{xp} XP</span>
    </div>
  );
}
