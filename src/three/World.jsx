// ============================================================
// World — the single persistent <Canvas> behind the whole page (doc 01 §1,
// doc 04 §2 & §5). ONE canvas, ONE useFrame-driven loop. Sections scroll over it.
//
// Capability-gated render paths (doc 04 §7):
//   !webgl | saveData → CSS fallback (gradient + grain), no canvas at all
//   reduced-motion    → static scene, frameloop="demand" (no idle RAF)
//   lowPower / mobile → fewer particles, no filaments, no post FX, dpr 1
//   tab hidden        → frameloop paused ("never")
//
// Scroll/pointer are PUSHED into sceneController; the canvas PULLS them in
// useFrame. When Lenis is wired (P2), pass driveScroll={false} and let Lenis
// call setScroll — keeping a single source of scroll truth.
// ============================================================

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCapabilities } from '../lib/useReducedMotion';
import { PORTAL_GRADIENT } from '../lib/theme';
import { setPointer, setScroll, updateScene } from './sceneController';
import ParticleField from './ParticleField';
import Portal from './Portal';
import WebFilaments from './WebFilaments';
import Effects from './Effects';

// Advances the damped scene state once per frame — the only place updateScene runs.
function SceneTick() {
  useFrame((_, delta) => updateScene(delta));
  return null;
}

// Per-tier performance budgets (doc 04 §5)
function getBudget({ tier, lowPower }) {
  const effective = lowPower ? 'mobile' : tier;
  switch (effective) {
    case 'desktop':
      return { dpr: [1, 1.75], particles: 8000, filaments: true, fx: 'desktop' };
    case 'tablet':
      return { dpr: [1, 1.5], particles: 4000, filaments: true, fx: 'tablet' };
    default: // mobile / lowPower
      return { dpr: 1, particles: lowPower ? 800 : 1200, filaments: false, fx: 'mobile' };
  }
}

export default function World({ driveScroll = true }) {
  const caps = useCapabilities();
  const { reducedMotion, lowPower, webgl, saveData, tier } = caps;
  const [hidden, setHidden] = useState(false);

  // Pause the canvas loop when the tab is hidden (battery/perf, doc 04 §2)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Standalone scroll driver (replaced by Lenis in P2 when driveScroll=false)
  useEffect(() => {
    if (!driveScroll || typeof window === 'undefined') return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [driveScroll]);

  // Pointer parallax (desktop, motion-on only)
  useEffect(() => {
    if (reducedMotion || tier !== 'desktop' || typeof window === 'undefined') return;
    const onMove = (e) => {
      setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion, tier]);

  // ── Fallback: no WebGL or data-saver → static CSS multiverse ──
  if (!webgl || saveData) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-ink">
        <div
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
          style={{ background: PORTAL_GRADIENT }}
        />
      </div>
    );
  }

  const budget = getBudget({ tier, lowPower });
  const animate = !reducedMotion;
  const frameloop = reducedMotion ? 'demand' : hidden ? 'never' : 'always';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        frameloop={frameloop}
        dpr={budget.dpr}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneTick />
          <Portal animate={animate} />
          <ParticleField count={budget.particles} animate={animate} />
          {budget.filaments && <WebFilaments animate={animate} />}
          {budget.fx !== 'mobile' && <Effects tier={budget.fx} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
