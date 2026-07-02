import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Elastic spring physics for main cursor
  const springConfig = { damping: 30, stiffness: 350, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower, lagging trail spring physics for secondary dot
  const trailSpringConfig = { damping: 20, stiffness: 120, mass: 0.7 };
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices, non-touch devices, and screens >= 768px
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const isMobileViewport = window.innerWidth < 768;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isTouchDevice || isMobileViewport || !isFinePointer) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Hide default cursor
    document.body.classList.add('cursor-none');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-none');
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor: Glowing White Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#09090b] pointer-events-none z-[1000] mix-blend-multiply hidden md:block filter drop-shadow-[0_0_4px_rgba(9,9,11,0.3)]"
        animate={{
          scale: isHovered ? 1.8 : 1.0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Click expansion ripple effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.85 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#09090b] pointer-events-none z-[998] mix-blend-multiply"
          />
        )}
      </AnimatePresence>

      {/* Trailing Dot: Glowing White Ring lagging behind */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#09090b]/40 pointer-events-none z-[997] mix-blend-multiply hidden md:block"
        animate={{
          scale: isHovered ? 1.5 : 1.0,
          borderColor: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}
