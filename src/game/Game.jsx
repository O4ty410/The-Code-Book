import React, { useState } from 'react';
import MainMenu   from './scenes/MainMenu';
import BriefingRoom from './scenes/BriefingRoom';
import HangarScene  from './scenes/HangarScene';
import './styles/game.css';

const SCENES = {
  MAIN_MENU: 'MAIN_MENU',
  BRIEFING:  'BRIEFING',
  HANGAR:    'HANGAR',
};

export default function Game() {
  const [scene, setScene] = useState(SCENES.MAIN_MENU);

  const goTo = (s) => setScene(s);

  const handleInteract = (terminalId) => {
    // placeholder — lessons will be wired here later
    console.log('Interacted with terminal:', terminalId);
  };

  return (
    <div className="game-root">
      {scene === SCENES.MAIN_MENU && (
        <MainMenu onStart={() => goTo(SCENES.BRIEFING)} />
      )}
      {scene === SCENES.BRIEFING && (
        <BriefingRoom onContinue={() => goTo(SCENES.HANGAR)} />
      )}
      {scene === SCENES.HANGAR && (
        <HangarScene onInteract={handleInteract} />
      )}
    </div>
  );
}
