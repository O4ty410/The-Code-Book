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
