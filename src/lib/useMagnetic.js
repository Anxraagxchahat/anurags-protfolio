import { useRef } from 'react';
import { useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * Magnetic hover — the element eases toward the pointer while hovered and
 * springs back on leave. Returns handlers + a `style` object to spread.
 * Desktop / fine-pointer only; pass `disabled` on touch or reduced motion.
 *
 *   const magnet = useMagnetic();
 *   <motion.a {...magnet.bind} style={magnet.style} />
 */
export function useMagnetic({ strength = 0.35, disabled = false } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 15, stiffness: 200, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0)`;

  const onMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    bind: { ref, onMouseMove, onMouseLeave },
    style: disabled ? {} : { transform },
  };
}
