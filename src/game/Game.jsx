import React, { useState, useEffect, useCallback } from 'react';
import MainMenu        from './scenes/MainMenu';
import BriefingRoom    from './scenes/BriefingRoom';
import HangarScene     from './scenes/HangarScene';
import MarsLaunchScene from './scenes/MarsLaunchScene';
import DebugArena      from './components/DebugArena';
import VisualLab       from './components/VisualLab';
import {
  loadProgress,
  completeMission,
  BUILDER_MISSION_IDS,
} from './systems/progressionSystem';
import './styles/game.css';

const MODE = { BUILDER: 'builder', DEBUG: 'debug', VISUAL: 'visual', LAUNCH: 'launch' };

function ModeTransition({ nextMode, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const labels = {
    debug:  { pre: 'ROCKET BUILDER · COMPLETE',  title: 'DEBUG ARENA',             sub: 'All six systems repaired. Proceed to fault verification.' },
    visual: { pre: 'DEBUG ARENA · COMPLETE',      title: 'VISUAL LAB',              sub: 'All faults resolved. Proceed to final systems analysis.' },
    launch: { pre: 'ALL PHASES COMPLETE',         title: 'LAUNCH SEQUENCE INITIATED', sub: 'All systems nominal. Stand by for launch.' },
  };
  const l = labels[nextMode] ?? labels.launch;

  return (
    <div className="mode-transition">
      <div className="mt-pre">{l.pre}</div>
      <div className="mt-title">{l.title}</div>
      <div className="mt-sub">{l.sub}</div>
      <div className="mt-bar"><div className="mt-bar-fill" /></div>
    </div>
  );
}

export default function Game() {
  const [scene,      setScene]      = useState('MAIN_MENU');
  const [gameMode,   setGameMode]   = useState(MODE.BUILDER);
  const [transition, setTransition] = useState(null);
  const [progress,   setProgress]   = useState(() => loadProgress());

  // Derive mode from saved progress on first load
  useEffect(() => {
    const done = progress.completedMissions;
    const allBuilder = BUILDER_MISSION_IDS.every((id) => done.includes(id));
    const allDebug   = ['debug_wrong_variable', 'debug_wrong_operator', 'debug_missing_return'].every((id) => done.includes(id));
    const allVisual  = ['visual_fuel', 'visual_comms', 'visual_diagnostics'].every((id) => done.includes(id));
    if (allVisual || (allDebug && allVisual)) { setGameMode(MODE.LAUNCH); return; }
    if (allDebug)   { setGameMode(MODE.VISUAL);  return; }
    if (allBuilder) { setGameMode(MODE.DEBUG);   return; }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBuilderMission = useCallback((missionId) => {
    setProgress((prev) => {
      const updated = completeMission(prev, missionId);
      const allDone = BUILDER_MISSION_IDS.every((id) => updated.completedMissions.includes(id));
      if (allDone) setTransition('debug');
      return updated;
    });
  }, []);

  const handleDebugComplete = useCallback((updatedProgress) => {
    setProgress(updatedProgress);
    setTransition('visual');
  }, []);

  const handleVisualComplete = useCallback((updatedProgress) => {
    setProgress(updatedProgress);
    setTransition('launch');
  }, []);

  const handleTransitionDone = useCallback(() => {
    setGameMode(transition);
    setTransition(null);
  }, [transition]);

  // HangarScene calls this when the launch animation fade-out completes
  const handleLaunchComplete = useCallback(() => {
    setScene('MARS');
  }, []);

  const inHangar = scene === 'HANGAR';

  return (
    <div className="game-root">
      {scene === 'MAIN_MENU' && (
        <MainMenu onStart={() => setScene('BRIEFING')} />
      )}
      {scene === 'BRIEFING' && (
        <BriefingRoom onContinue={() => setScene('HANGAR')} />
      )}

      {inHangar && (gameMode === MODE.BUILDER || gameMode === MODE.LAUNCH) && (
        <HangarScene
          progress={progress}
          onMissionComplete={handleBuilderMission}
          autoLaunch={gameMode === MODE.LAUNCH}
          onLaunchComplete={gameMode === MODE.LAUNCH ? handleLaunchComplete : undefined}
        />
      )}

      {inHangar && gameMode === MODE.DEBUG && (
        <DebugArena progress={progress} onComplete={handleDebugComplete} />
      )}

      {inHangar && gameMode === MODE.VISUAL && (
        <VisualLab progress={progress} onComplete={handleVisualComplete} />
      )}

      {scene === 'MARS' && (
        <MarsLaunchScene />
      )}

      {transition && (
        <ModeTransition nextMode={transition} onDone={handleTransitionDone} />
      )}
    </div>
  );
}
