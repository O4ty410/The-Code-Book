// Pending feature — the lessons system is not yet connected to any scene or terminal.
// Lessons will eventually be loaded into terminal sequences via the mission registry.
import lesson01 from './lesson_01_what_is_code';

export const LESSONS = [lesson01];

export function getLessonById(id) {
  return LESSONS.find((l) => l.id === id) || null;
}
