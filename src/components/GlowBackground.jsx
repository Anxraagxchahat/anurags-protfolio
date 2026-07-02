import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlowBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 60, stiffness: 250, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMoveGlow = (e) => {
      mouseX.set(e.clientX - 150); // Offset by half of glow width (300px)
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMoveGlow);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlow);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* Subtle Stationary Neutral Glow Blobs (Drifting) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none"
      />
      
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -right-32 w-[700px] h-[700px] rounded-full bg-white/[0.012] blur-[140px] pointer-events-none"
      />

      {/* Mouse Follow Glow Highlight (monochromatic) */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.025] blur-[80px] hidden md:block"
      />

      {/* Fine Grid Pattern Overlay for minimalist technical aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}
