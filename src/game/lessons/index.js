import lesson01 from './lesson_01_what_is_code';

export const LESSONS = [lesson01];

export function getLessonById(id) {
  return LESSONS.find((l) => l.id === id) || null;
}
