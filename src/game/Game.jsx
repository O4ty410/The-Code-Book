import React, { useState } from 'react';
import MainMenu from './scenes/MainMenu';
import BriefingRoom from './scenes/BriefingRoom';
import LaunchPad from './scenes/LaunchPad';
import HUD from './components/HUD';

const SCENES = {
  MAIN_MENU: 'MAIN_MENU',
  BRIEFING: 'BRIEFING',
  LAUNCH_PAD: 'LAUNCH_PAD',
};

export default function Game() {
  const [scene, setScene] = useState(SCENES.MAIN_MENU);
  const [playerData, setPlayerData] = useState({ xp: 0, level: 1, lessonsComplete: [] });

  const goTo = (nextScene) => setScene(nextScene);

  return (
    <div className="game-root">
      {scene !== SCENES.MAIN_MENU && <HUD playerData={playerData} />}

      {scene === SCENES.MAIN_MENU && <MainMenu onStart={() => goTo(SCENES.BRIEFING)} />}
      {scene === SCENES.BRIEFING  && <BriefingRoom onContinue={() => goTo(SCENES.LAUNCH_PAD)} />}
      {scene === SCENES.LAUNCH_PAD && <LaunchPad playerData={playerData} setPlayerData={setPlayerData} />}
    </div>
  );
}
