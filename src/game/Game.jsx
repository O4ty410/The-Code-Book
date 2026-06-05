import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainMenu        from './scenes/MainMenu';
import BriefingRoom    from './scenes/BriefingRoom';
import HangarScene     from './scenes/HangarScene';
import MarsLaunchScene from './scenes/MarsLaunchScene';
import MissionCutscene from './scenes/MissionCutscene';
import DebugArena      from './components/DebugArena';
import VisualLab       from './components/VisualLab';
import {
  loadProgress,
  completeMission,
  clearProgress,
  BUILDER_MISSION_IDS,
} from './systems/progressionSystem';
import { toggleMute, isMuted, startBackgroundMusic, suspendAllAudio, registerBgStopFn } from './systems/audioSystem';
import './styles/game.css';

const MODE = { BUILDER: 'builder', DEBUG: 'debug', VISUAL: 'visual', LAUNCH: 'launch' };

function ModeTransition({ nextMode, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const labels = {
    debug:  { pre: 'ROCKET BUILDER · COMPLETE',    title: 'DEBUG ARENA',               sub: 'All six systems repaired. Proceed to fault verification.' },
    visual: { pre: 'DEBUG ARENA · COMPLETE',        title: 'VISUAL LAB',                sub: 'All faults resolved. Proceed to final systems analysis.' },
    launch: { pre: 'ALL PHASES COMPLETE',           title: 'LAUNCH SEQUENCE INITIATED', sub: 'All systems nominal. Stand by for launch.' },
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

function PauseMenu({ onResume, onQuit }) {
  return (
    <div className="pause-overlay">
      <div className="pause-panel">
        <div className="pause-title">MISSION PAUSED</div>
        <div className="pause-sub">Your progress is saved.</div>
        <button className="pause-btn pause-btn--resume" onClick={onResume}>RESUME MISSION</button>
        <button className="pause-btn pause-btn--quit"   onClick={onQuit}>QUIT TO GAME HUB</button>
      </div>
    </div>
  );
}

function MusicButton() {
  const [musicOff, setMusicOff] = useState(false);
  const offRef    = useRef(false);
  const stopRef   = useRef(null);

  useEffect(() => {
    stopRef.current = startBackgroundMusic();
    registerBgStopFn(stopRef.current);
    return () => { stopRef.current?.(); stopRef.current = null; registerBgStopFn(null); };
  }, []);

  const toggle = useCallback(() => {
    const nextOff = !offRef.current;
    offRef.current = nextOff;
    setMusicOff(nextOff);
    if (nextOff) {
      stopRef.current?.();
      stopRef.current = null;
      registerBgStopFn(null);
    } else {
      stopRef.current = startBackgroundMusic();
      registerBgStopFn(stopRef.current);
    }
  }, []);

  return (
    <button className="game-music-btn" onClick={toggle} title={musicOff ? 'Music off' : 'Music on'}>
      {musicOff ? '♪' : '♫'}
    </button>
  );
}

function MuteButton() {
  const [muted, setMuted] = useState(isMuted());
  const handle = useCallback(() => {
    const next = toggleMute();
    setMuted(next);
  }, []);
  return (
    <button className="game-mute-btn" onClick={handle} title={muted ? 'Unmute' : 'Mute'}>
      {muted ? '🔇' : '🔊'}
    </button>
  );
}

export default function Game() {
  const [scene,      setScene]      = useState('MAIN_MENU');
  const [gameMode,   setGameMode]   = useState(MODE.BUILDER);
  const [transition, setTransition] = useState(null);
  const [progress,   setProgress]   = useState(() => loadProgress());
  const [paused,     setPaused]     = useState(false);
  const [cutscene,   setCutscene]   = useState(null); // missionId while cutscene plays
  const pendingMissionRef            = useRef(null);

  const handleQuitToHub = useCallback(() => {
    try { window.parent.postMessage({ type: 'QUIT_TO_HUB' }, '*'); } catch (_) {}
  }, []);

  const handlePlayAgain = useCallback(() => {
    setProgress(clearProgress());
    setScene('MAIN_MENU');
    setGameMode(MODE.BUILDER);
    setTransition(null);
    setPaused(false);
  }, []);

  useEffect(() => {
    function onMsg(e) {
      if (e.data && e.data.type === 'STOP_AUDIO') suspendAllAudio();
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

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
    // Show cutscene first, then apply progress
    pendingMissionRef.current = missionId;
    setCutscene(missionId);
  }, []);

  const handleCutsceneDone = useCallback(() => {
    const missionId = pendingMissionRef.current;
    pendingMissionRef.current = null;
    setCutscene(null);
    if (!missionId) return;
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

  const handleLaunchComplete = useCallback(() => {
    setScene('MARS');
  }, []);

  const inHangar = scene === 'HANGAR';

  return (
    <div className="game-root">
      <button className="game-pause-btn" onClick={() => setPaused(true)} title="Pause">⏸ PAUSE</button>
      <MusicButton />
      <MuteButton />

      {paused && (
        <PauseMenu onResume={() => setPaused(false)} onQuit={handleQuitToHub} />
      )}

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
          onLaunchComplete={handleLaunchComplete}
        />
      )}

      {inHangar && gameMode === MODE.DEBUG && (
        <DebugArena progress={progress} onComplete={handleDebugComplete} />
      )}

      {inHangar && gameMode === MODE.VISUAL && (
        <VisualLab progress={progress} onComplete={handleVisualComplete} />
      )}

      {scene === 'MARS' && (
        <MarsLaunchScene onPlayAgain={handlePlayAgain} />
      )}

      {cutscene && (
        <MissionCutscene missionId={cutscene} onDone={handleCutsceneDone} />
      )}

      {transition && (
        <ModeTransition nextMode={transition} onDone={handleTransitionDone} />
      )}
    </div>
  );
}
