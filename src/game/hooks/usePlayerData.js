import { useState, useCallback } from 'react';
import { awardXP, markLessonComplete } from '../systems/progressionSystem';

const INITIAL_STATE = { xp: 0, level: 1, lessonsComplete: [] };

export function usePlayerData() {
  const [playerData, setPlayerData] = useState(INITIAL_STATE);

  const completeLesson = useCallback((lessonId, xpReward) => {
    setPlayerData((prev) => {
      const updated = markLessonComplete(prev, lessonId);
      return awardXP(updated, xpReward);
    });
  }, []);

  const resetProgress = useCallback(() => {
    setPlayerData(INITIAL_STATE);
  }, []);

  return { playerData, completeLesson, resetProgress };
}
