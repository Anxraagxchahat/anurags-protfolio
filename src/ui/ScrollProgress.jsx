// ============================================================
// ScrollProgress — thin top rail in the rift gradient (doc 01 §3, doc 02 §2).
// Reads page scroll via framer-motion useScroll; springs the scaleX (raw under
// reduced-motion). Fixed, aria-hidden — decorative orientation cue.
// ============================================================

import { motion, useScroll, useSpring } from 'framer-motion';
import { useCapabilities } from '../lib/useReducedMotion';

export default function ScrollProgress() {
  const { reducedMotion } = useCapabilities();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120, mass: 0.4 });
  const scaleX = reducedMotion ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[9997] h-[3px] origin-left bg-rift"
      style={{ scaleX }}
    />
  );
}
