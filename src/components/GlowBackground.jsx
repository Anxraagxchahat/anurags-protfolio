import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlowBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse tracking (extremely lightweight, keeps 60fps)
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150); // Offset by half of glow width (300px)
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-darkBg">
      {/* Dynamic Ambient Background Glow Blobs (Drifting) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accentBlue/20 glow-blob"
      />
      
      <motion.div
        animate={{
          x: [0, -60, 80, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-accentPurple/15 glow-blob"
      />

      <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-accentBlue/10 glow-blob" />

      {/* Mouse Follow Glow Highlight (only visible on screen hover) */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-accentBlue/15 to-accentPurple/10 opacity-70 blur-[80px] hidden md:block"
      />

      {/* Grid Pattern Overlay for Startup/Founder vibe */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
