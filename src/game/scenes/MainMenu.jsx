import React from 'react';

export default function MainMenu({ onStart }) {
  return (
    <div className="scene-center">
      <h1 className="scene-title">LAUNCH SEQUENCE</h1>
      <p className="scene-sub">Educational Sci-Fi Mission</p>
      <button className="scene-btn" onClick={onStart}>Begin Mission</button>
    </div>
  );
}
