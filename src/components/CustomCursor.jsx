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
      {/* Dynamic Elastic Connecting Web Strand between Cursor and Lagging Trail Dot */}
      <svg className="fixed inset-0 w-screen h-screen pointer-events-none z-[999] hidden md:block select-none overflow-hidden">
        <defs>
          <filter id="cursor-web-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.line
          style={{
            x1: cursorX,
            y1: cursorY,
            x2: trailX,
            y2: trailY,
          }}
          stroke="#e23636"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          filter="url(#cursor-web-glow)"
          className="opacity-75"
        />
      </svg>

      {/* Main Cursor: Glowing Red Web Icon */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[1000] mix-blend-screen hidden md:block"
      >
        <motion.svg
          animate={{
            scale: isHovered ? 1.35 : 1.0,
            rotate: isHovered ? 45 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-full h-full text-accentPurple filter drop-shadow-[0_0_6px_rgba(226,54,54,0.9)]"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          {/* Center Red Dot */}
          <circle cx="20" cy="20" r="1.5" fill="#e23636" stroke="none" />
          
          {/* Outer Web Rings */}
          <circle cx="20" cy="20" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
          <circle cx="20" cy="20" r="12" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
          
          {/* Web spokes */}
          <line x1="20" y1="4" x2="20" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
          <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
          <line x1="8.7" y1="8.7" x2="31.3" y2="31.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
          <line x1="8.7" y1="31.3" x2="31.3" y2="8.7" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />

          {/* Web webbing loop */}
          <path d="M 20,14 Q 16,16 14,20 Q 16,24 20,26 Q 24,24 26,20 Q 24,16 20,14" stroke="rgba(226,54,54,0.5)" strokeWidth="0.5" />
        </motion.svg>
      </motion.div>

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
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accentPurple pointer-events-none z-[998] mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Trailing Dot: Glowing Red Node lagging behind */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 pointer-events-none z-[997] mix-blend-screen hidden md:block"
      >
        <div className="w-full h-full rounded-full bg-accentPurple filter drop-shadow-[0_0_5px_rgba(226,54,54,0.8)] opacity-85" />
      </motion.div>
    </>
  );
}
