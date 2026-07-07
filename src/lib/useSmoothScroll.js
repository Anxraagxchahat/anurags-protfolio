import { useEffect } from 'react';

/**
 * Lightweight Lenis-style smooth scroll — a single RAF that lerps the window
 * toward a wheel-driven target. No dependencies, ~1kb, and it leaves native
 * scroll intact so GSAP ScrollTrigger / anchor jumps keep working.
 *
 * Disabled automatically for reduced-motion, touch devices (native momentum is
 * better there), and small viewports.
 */
export function useSmoothScroll({ enabled = true, lerp = 0.15 } = {}) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 768;
    if (prefersReduced || isCoarse || isSmall) return;

    // Prevent CSS smooth-scroll from conflicting with JS scrolling, causing lag/jitter
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId = 0;
    let running = false;

    const clamp = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, max));
    };

    const loop = () => {
      current += (target - current) * lerp;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        running = false;
        window.scrollTo(0, current);
        return;
      }
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      current = window.scrollY;
      rafId = requestAnimationFrame(loop);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return; // allow pinch-zoom
      e.preventDefault();
      target += e.deltaY;
      clamp();
      start();
    };

    // Keep our target in sync when scrolling happens by other means
    // (keyboard, scrollbar drag, anchor navigation).
    const onScroll = () => {
      if (running) return;
      target = window.scrollY;
      current = window.scrollY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [enabled, lerp]);
}
