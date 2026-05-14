import React from 'react';
import Button from '../components/Button';

export default function MainMenu({ onStart }) {
  return (
    <div className="scene scene--main-menu">
      <h1 className="game-title">LAUNCH SEQUENCE</h1>
      <p className="game-subtitle">An educational sci-fi mission briefing</p>
      <Button label="Begin Mission" onClick={onStart} />
    </div>
  );
}
