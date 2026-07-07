// Shared motion language — easings, durations, and reusable variants.
// Keep every animation reading from here so timing stays consistent and premium.

export const EASE = {
  expo: [0.16, 1, 0.3, 1],       // reveals — the signature ease
  premium: [0.65, 0, 0.35, 1],   // symmetric, weighty
  glide: [0.4, 0, 0.2, 1],       // parallax / camera
  softOut: [0.22, 1, 0.36, 1],
};

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  reveal: 0.8,
};

// Staggered container
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// Blur-up reveal (the hero + section signature)
export const fadeUpBlur = {
  hidden: { y: 42, opacity: 0, filter: 'blur(12px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 22, stiffness: 62, mass: 0.9 },
  },
};

export const fadeUp = {
  hidden: { y: 28, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: DUR.reveal, ease: EASE.expo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.expo } },
};

export const scaleIn = {
  hidden: { scale: 0.85, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 16, stiffness: 80 },
  },
};

// Word/line reveal for text (used with mapped spans)
export const lineReveal = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: DUR.slow, ease: EASE.expo },
  },
};

// Shared 3D tilt spring config (Hero / Skills / Projects / Journey)
export const TILT_SPRING = { damping: 25, stiffness: 150 };

// Standard viewport config for scroll reveals
export const VIEWPORT = { once: true, margin: '-90px' };
