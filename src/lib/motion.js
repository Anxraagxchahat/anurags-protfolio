// ============================================================
// motion.js — shared easings, durations & Framer Motion variants (doc 04 §3).
// Values preserve the *current* feel (the existing build's springs/staggers).
// Boundary rule (doc 04 §1): Framer = DOM enter/hover/layout. These are the
// canonical variants reused across sections so timing stays consistent.
// ============================================================

// ── Easings ──────────────────────────────────────────────────
export const EASE = {
  expo: [0.16, 1, 0.3, 1], // reveals (already in use across the build)
  glide: [0.45, 0, 0.15, 1], // parallax / camera-ish
};

// GSAP-side easing names (used by ScrollTrigger timelines in later phases)
export const GSAP_EASE = {
  punch: 'power4.out', // portal / title punch-in
  glide: 'power2.inOut', // parallax, camera
  sine: 'sine.inOut', // idle floats
};

// ── Durations (seconds) ──────────────────────────────────────
export const DURATION = {
  reveal: 0.8, // 0.6–0.9s
  portal: 0.7, // 0.6–0.9s
  hover: 0.25, // 0.2–0.3s
  idle: 6, // 4–8s idle loops
};

export const STAGGER = {
  tight: 0.06,
  base: 0.08, // skills grid (preserve)
  loose: 0.12, // hero (preserve)
  wide: 0.15, // about / journey (preserve)
};

// ── Springs (preserve current feel) ──────────────────────────
export const SPRING = {
  // fadeUpBlur reveal spring
  reveal: { type: 'spring', damping: 20, stiffness: 60, mass: 0.8 },
  // scaleIn spring (hero photo)
  scale: { type: 'spring', damping: 15, stiffness: 80 },
  // 3D tilt spring — shared across Hero/Skills/Projects/Journey
  tilt: { damping: 25, stiffness: 150 },
  // about / journey item spring
  item: { type: 'spring', damping: 22, stiffness: 85 },
};

// ── Canonical Framer variants ────────────────────────────────

// fadeUpBlur: y:50 + blur(10px) → settle (doc 04 §3)
export const fadeUpBlur = {
  initial: { y: 50, opacity: 0, filter: 'blur(10px)' },
  animate: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: SPRING.reveal,
  },
};

// Lighter fade-up (no blur) for dense grids/lists
export const fadeUp = {
  initial: { y: 25, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: DURATION.reveal, ease: EASE.expo },
  },
};

// scaleIn: 0.8 → 1 spring
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { ...SPRING.scale, delay: 0.3 },
  },
};

// Slide-in from left (about/journey items)
export const slideInLeft = {
  initial: { x: -30, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: SPRING.item },
};

// staggerContainer factory — pass a stagger value + optional delayChildren
export const staggerContainer = (stagger = STAGGER.base, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Reduced-motion variants: instant, no transform/blur (visually complete, calm)
export const instant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};

/**
 * Pick a variant honoring the reduced-motion gate.
 * Components call: const v = motionSafe(reducedMotion, fadeUpBlur)
 */
export function motionSafe(reducedMotion, variant) {
  return reducedMotion ? instant : variant;
}

// Standard in-view viewport config (reveal once, slightly early)
export const VIEWPORT = { once: true, margin: '-100px' };

export default {
  EASE,
  GSAP_EASE,
  DURATION,
  STAGGER,
  SPRING,
  fadeUpBlur,
  fadeUp,
  scaleIn,
  slideInLeft,
  staggerContainer,
  instant,
  motionSafe,
  VIEWPORT,
};
