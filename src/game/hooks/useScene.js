import { useState, useCallback } from 'react';

export function useScene(initial) {
  const [scene, setScene] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const goTo = useCallback((next) => {
    setHistory((prev) => [...prev, next]);
    setScene(next);
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setScene(next[next.length - 1]);
      return next;
    });
  }, []);

  return { scene, goTo, goBack };
}
