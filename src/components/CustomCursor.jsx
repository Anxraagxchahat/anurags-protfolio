import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Premium aurora cursor: a soft tinted dot that eases to the pointer, a
 * lagging glass ring, and a click ripple. Grows over interactive elements.
 * Desktop / fine-pointer only; hidden entirely on touch or reduced motion.
 */
export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return fine && !touch && !reduced && window.innerWidth >= 768;
  });

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dot = { damping: 30, stiffness: 400, mass: 0.3 };
  const cursorX = useSpring(mouseX, dot);
  const cursorY = useSpring(mouseY, dot);

  const ring = { damping: 22, stiffness: 130, mass: 0.6 };
  const ringX = useSpring(cursorX, ring);
  const ringY = useSpring(cursorY, ring);

  useEffect(() => {
    if (!enabled) return undefined;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      setHovered(
        t.tagName === 'A' ||
          t.tagName === 'BUTTON' ||
          !!t.closest('a') ||
          !!t.closest('button') ||
          t.getAttribute('role') === 'button'
      );
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.body.classList.add('cursor-none');

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.body.classList.remove('cursor-none');
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[100000] hidden h-2.5 w-2.5 rounded-full md:block"
      >
        <span className="block h-full w-full rounded-full bg-gradient-to-br from-aurora-violet to-aurora-blue" />
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 1.5 : 1, opacity: hovered ? 1 : 0.6 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-8 w-8 rounded-full border border-aurora-violet/40 backdrop-blur-[1px] md:block"
      />

      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
            className="pointer-events-none fixed left-0 top-0 z-[99998] h-8 w-8 rounded-full border border-aurora-blue/50"
          />
        )}
      </AnimatePresence>
    </>
  );
}
