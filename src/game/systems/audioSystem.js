let muted = false;

export function playSound(src) {
  if (muted) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export function isMuted() {
  return muted;
}
