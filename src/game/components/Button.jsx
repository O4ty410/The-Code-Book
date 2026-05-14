import React from 'react';

export default function Button({ label, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      className={`game-btn game-btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
