import { useEffect, useRef } from 'react';

export default function useGameLoop(callback) {
  const rafRef    = useRef(null);
  const lastRef   = useRef(null);
  const cbRef     = useRef(callback);

  useEffect(() => { cbRef.current = callback; }, [callback]);

  useEffect(() => {
    function tick(ts) {
      const last  = lastRef.current ?? ts;
      const delta = Math.min((ts - last) / 1000, 0.05); // cap at 50ms
      lastRef.current = ts;
      cbRef.current(delta);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
}
