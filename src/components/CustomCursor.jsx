import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for elastic spider-web tracking feel
  const springConfig = { damping: 30, stiffness: 350, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop with mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide default cursor
    document.body.classList.add('cursor-none');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-none');
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-screen hidden md:block"
    >
      {/* Glowing Red Web Cursor */}
      <motion.svg
        animate={{
          scale: isHovered ? 1.3 : 1.0,
          rotate: isHovered ? 45 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-full h-full text-accentPurple filter drop-shadow-[0_0_6px_rgba(226,54,54,0.8)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Center Red Dot */}
        <circle cx="20" cy="20" r="1.5" fill="#e23636" stroke="none" />
        
        {/* Outer Web Rings */}
        <circle cx="20" cy="20" r="6" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <circle cx="20" cy="20" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
        
        {/* Web spokes */}
        <line x1="20" y1="4" x2="20" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <line x1="8.7" y1="8.7" x2="31.3" y2="31.3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <line x1="8.7" y1="31.3" x2="31.3" y2="8.7" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />

        {/* Web webbing loop */}
        <path d="M 20,14 Q 16,16 14,20 Q 16,24 20,26 Q 24,24 26,20 Q 24,16 20,14" stroke="rgba(226,54,54,0.4)" strokeWidth="0.4" />
      </motion.svg>
    </motion.div>
  );
}
