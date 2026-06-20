// ============================================================
// useLenis.js — Lenis smooth scroll wired to GSAP ScrollTrigger via a SINGLE
// RAF (doc 01 §3, doc 04 §2). This is the shared scroll clock for the page:
//
//   lenis.on('scroll', ScrollTrigger.update)   // ScrollTrigger reads Lenis
//   gsap.ticker.add((t) => lenis.raf(t*1000))  // GSAP ticker drives Lenis
//   gsap.ticker.lagSmoothing(0)                // consistent scrub
//
// One RAF only — Lenis does NOT run its own internal RAF here. R3F's canvas
// loop is separate (the renderer); these never compete.
//
// Reduced-motion / saveData → smoothing disabled (native scroll), but the API
// (scrollTo, progress) still works so nav jumps remain functional.
// ============================================================

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Lenis + ScrollTrigger on a single RAF. Call ONCE at the app root.
 * @param {{ reducedMotion?: boolean, saveData?: boolean, onScroll?: (lenis) => void }} opts
 * @returns {{ lenisRef: React.MutableRefObject, lenis: Lenis|null }}
 */
export function useLenis({ reducedMotion = false, saveData = false, onScroll } = {}) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);
  const smooth = !reducedMotion && !saveData;

  useEffect(() => {
    const instance = new Lenis({
      duration: smooth ? 1.1 : 0, // momentum tuned, not floaty
      smoothWheel: smooth,
      smoothTouch: false, // never scroll-jack touch (doc 01 §6)
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      lerp: smooth ? 0.1 : 1,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // ScrollTrigger reads Lenis on every scroll
    const handleScroll = () => {
      ScrollTrigger.update();
      if (onScroll) onScroll(instance);
    };
    instance.on('scroll', handleScroll);

    // GSAP ticker drives Lenis — the single RAF
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.off('scroll', handleScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
    // Re-init only when the smoothing posture changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smooth]);

  return { lenisRef, lenis };
}

// ── Context (so Nav / back-to-top can scrollTo from anywhere) ──

const LenisContext = createContext({ lenis: null, scrollTo: () => {} });

export function LenisProvider({ children, reducedMotion = false, saveData = false, onScroll }) {
  const { lenis } = useLenis({ reducedMotion, saveData, onScroll });

  const value = useMemo(
    () => ({
      lenis,
      // Portal-jump helper: target can be a selector, element, or number
      scrollTo: (target, options = {}) => {
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.0, ...options });
        } else if (typeof target === 'string' && typeof document !== 'undefined') {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    }),
    [lenis],
  );

  return createElement(LenisContext.Provider, { value }, children);
}

export function useLenisContext() {
  return useContext(LenisContext);
}

export default useLenis;
