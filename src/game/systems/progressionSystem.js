export function awardXP(playerData, amount) {
  const newXP = playerData.xp + amount;
  const newLevel = Math.floor(newXP / 100) + 1;
  return { ...playerData, xp: newXP, level: newLevel };
}

export function markLessonComplete(playerData, lessonId) {
  if (playerData.lessonsComplete.includes(lessonId)) return playerData;
  return {
    ...playerData,
    lessonsComplete: [...playerData.lessonsComplete, lessonId],
  };
}

export function isLessonUnlocked(playerData, lessonId, requiredLessons = []) {
  return requiredLessons.every((id) => playerData.lessonsComplete.includes(id));
}

// ── Rocket systems registry ────────────────────────────────────────────────
// Each entry maps a terminal to its mission. Future systems are locked until
// their missionId is registered in missions/index.js.

export const ROCKET_SYSTEMS = [
  { id: 'power',       label: 'Power Systems',   desc: 'Reactor core and power distribution',    terminalId: 'power',       missionId: 'power_restoration' },
  { id: 'fuel',        label: 'Fuel Systems',     desc: 'Propellant management and flow control', terminalId: 'fuel',        missionId: 'fuel_calculation'  },
  { id: 'nav',         label: 'Navigation',       desc: 'Guidance computer and trajectory',       terminalId: 'nav',         missionId: 'nav_calibration'   },
  { id: 'comms',       label: 'Communications',   desc: 'Broadcast array and signal routing',     terminalId: 'comms',       missionId: 'comms_signal'      },
  { id: 'diagnostics', label: 'Diagnostics',      desc: 'System scan and fault detection',        terminalId: 'diagnostics', missionId: 'diagnostics_scan'  },
  { id: 'engine',      label: 'Engine Core',      desc: 'Primary thruster ignition sequence',     terminalId: 'engine',      missionId: 'engine_ignition'   },
];

export const BUILDER_MISSION_IDS = ROCKET_SYSTEMS.map((s) => s.missionId);
export const DEBUG_MISSION_IDS   = ['debug_wrong_variable', 'debug_wrong_operator', 'debug_missing_return'];
export const VISUAL_MISSION_IDS  = ['visual_fuel', 'visual_comms', 'visual_diagnostics'];

// ── Mission progress persistence ───────────────────────────────────────────

const SAVE_KEY = 'launch_seq_v1';

function defaultProgress() {
  return { completedMissions: [], version: 1 };
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    // Basic schema validation
    if (!Array.isArray(parsed.completedMissions)) return defaultProgress();
    return parsed;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
  } catch (_) {
    // localStorage unavailable (private browsing etc.) — silent fallback
  }
}

export function completeMission(progress, missionId) {
  if (progress.completedMissions.includes(missionId)) return progress;
  const next = {
    ...progress,
    completedMissions: [...progress.completedMissions, missionId],
  };
  saveProgress(next);
  return next;
}

export function isMissionComplete(progress, missionId) {
  return progress.completedMissions.includes(missionId);
}

export function clearProgress() {
  try { localStorage.removeItem(SAVE_KEY); } catch (_) {}
  return defaultProgress();
}
