// ============================================================
// useMagnetic.js — magnetic button/cursor hook (doc 01 §5, desktop only).
// Element drifts toward the pointer within a radius, springs back on leave.
// Disabled under reduced-motion / touch / lowPower (pass `disabled`).
// Returns props to spread on a framer-motion element + a ref.
// ============================================================

import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const SPRING = { damping: 15, stiffness: 150, mass: 0.1 };

export function useMagnetic({ strength = 0.35, radius = 140, disabled = false } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    // Only pull when the pointer is within the magnetic radius
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: sx, y: sy },
    onMouseMove: disabled ? undefined : handleMouseMove,
    onMouseLeave: disabled ? undefined : handleMouseLeave,
  };
}

export default useMagnetic;
