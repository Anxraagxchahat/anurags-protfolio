// ============================================================
// PortalTransition — the signature dimensional crossing (doc 01 §4, doc 04 §4).
// A single reusable overlay + a playPortal() function exposed on context, so Nav
// jumps and (later) section seams reuse one implementation.
//
// Mechanics (full, ~700ms): accent iris wipe closes over the screen → onCover()
// runs at the peak (the scrollTo) → iris opens to reveal the destination. The
// World portal disc flares in sync (flarePortal). Reduced-motion / lowPower
// collapse the whole thing to a ~250ms cross-fade (doc 04 §4).
// ============================================================

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useCapabilities } from '../lib/useReducedMotion';
import { EASE } from '../lib/motion';
import { flarePortal } from '../three/sceneController';

const PortalContext = createContext({ playPortal: async () => {}, crossing: false });

export function usePortal() {
  return useContext(PortalContext);
}

const HIDDEN_CLIP = 'circle(0% at 50% 50%)';
const FULL_CLIP = 'circle(150% at 50% 50%)';

export function PortalProvider({ children }) {
  const { reducedMotion, lowPower } = useCapabilities();
  const reduce = reducedMotion || lowPower;
  const controls = useAnimationControls();

  const [accent, setAccent] = useState('#E23636');
  const [crossing, setCrossing] = useState(false);
  const busyRef = useRef(false);

  const playPortal = useCallback(
    async ({ accent: a = '#E23636', onCover } = {}) => {
      // Never queue/overlap: if already crossing, just run the destination jump.
      if (busyRef.current) {
        onCover?.();
        return;
      }
      busyRef.current = true;
      setAccent(a);
      setCrossing(true);

      try {
        if (reduce) {
          // Cross-fade: full-screen accent veil fades in → jump → fades out.
          controls.set({ clipPath: FULL_CLIP, opacity: 0 });
          await controls.start({ opacity: 1, transition: { duration: 0.12 } });
          onCover?.();
          await controls.start({ opacity: 0, transition: { duration: 0.13 } });
        } else {
          flarePortal(1);
          controls.set({ clipPath: HIDDEN_CLIP, opacity: 1 });
          await controls.start({
            clipPath: FULL_CLIP,
            transition: { duration: 0.36, ease: EASE.expo },
          });
          onCover?.();
          await new Promise((r) => setTimeout(r, 60));
          await controls.start({
            clipPath: HIDDEN_CLIP,
            transition: { duration: 0.42, ease: EASE.expo },
          });
        }
      } finally {
        controls.set({ clipPath: HIDDEN_CLIP, opacity: reduce ? 0 : 1 });
        setCrossing(false);
        busyRef.current = false;
      }
    },
    [reduce, controls],
  );

  const value = useMemo(() => ({ playPortal, crossing }), [playPortal, crossing]);

  return (
    <PortalContext.Provider value={value}>
      {children}

      {/* The crossing overlay — fixed, above content. Blocks input only mid-cross. */}
      <motion.div
        aria-hidden="true"
        initial={{ clipPath: HIDDEN_CLIP, opacity: reduce ? 0 : 1 }}
        animate={controls}
        className="fixed inset-0 z-[9990] overflow-hidden"
        style={{
          pointerEvents: crossing ? 'auto' : 'none',
          background: `radial-gradient(circle at 50% 50%, ${accent} 0%, #0a0a12 55%, #020205 100%)`,
        }}
      >
        {/* Halftone + scanline comic texture */}
        <div
          className="halftone absolute inset-0 opacity-20"
          style={{ '--halftone-size': '7px', '--halftone-color': 'rgba(0,0,0,0.6)' }}
        />
        <div className="scanlines absolute inset-0 opacity-40" />

        {/* Chromatic-split dimension label at the core */}
        {!reduce && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="chromatic-strong font-display text-h1 uppercase tracking-tight text-white/90">
              CROSSING
            </span>
          </div>
        )}

        {/* Action-line burst */}
        <div className="action-lines absolute inset-0 opacity-30" />
      </motion.div>
    </PortalContext.Provider>
  );
}

export default PortalProvider;
