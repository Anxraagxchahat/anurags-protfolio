import { useEffect, useState } from 'react';

/**
 * Capability gate. Returns the signals every motion / 3D component reads to
 * decide how hard to push: reduced motion, low-power heuristic, WebGL support,
 * and save-data. Update on the fly when the media queries change.
 */
export function useReducedMotion() {
  const [state, setState] = useState(() => ({
    reducedMotion: false,
    lowPower: false,
    webgl: true,
    saveData: false,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dataQuery = window.matchMedia('(prefers-reduced-data: reduce)');

    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        );
      } catch {
        return false;
      }
    };

    const detectLowPower = () => {
      const cores = navigator.hardwareConcurrency || 8;
      const mem = navigator.deviceMemory || 8;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      return (coarse && cores <= 4) || mem <= 4;
    };

    const conn = navigator.connection || {};

    const update = () => {
      setState({
        reducedMotion: rmQuery.matches,
        lowPower: detectLowPower(),
        webgl: detectWebGL(),
        saveData: !!conn.saveData || dataQuery.matches,
      });
    };

    update();
    rmQuery.addEventListener?.('change', update);
    dataQuery.addEventListener?.('change', update);

    return () => {
      rmQuery.removeEventListener?.('change', update);
      dataQuery.removeEventListener?.('change', update);
    };
  }, []);

  return state;
}
