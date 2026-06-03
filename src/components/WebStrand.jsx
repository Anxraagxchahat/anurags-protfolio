import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function WebStrand() {
  const targetRotation = useMotionValue(0);
  // WebStrand is longer, so it swings with slightly lower stiffness (more flex/lag) and damping
  const rotationSpring = useSpring(targetRotation, { damping: 14, stiffness: 35 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animFrame;
    let angle = 0;
    let scrollDisplacement = 0;

    const updatePhysics = () => {
      // Natural slow swing (sin wave) - slightly out of phase with Spider-Man for realistic double-pendulum feel!
      angle += 0.01; // slower natural swing
      const naturalSwing = Math.sin(angle + 0.5) * 1.5; 
      
      // Target rotation is natural swing + scroll displacement
      targetRotation.set(naturalSwing + scrollDisplacement);
      
      // Decay scroll displacement back to 0
      scrollDisplacement *= 0.93;
      
      animFrame = requestAnimationFrame(updatePhysics);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      if (dt > 0) {
        const dy = currentScrollY - lastScrollY;
        const velocity = dy / dt;
        // Web strand reacts to scroll velocity (inertia)
        scrollDisplacement += velocity * 7.5; 
        scrollDisplacement = Math.max(-16, Math.min(16, scrollDisplacement));
      }
      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [targetRotation]);

  return (
    <motion.div 
      style={{ rotate: rotationSpring, transformOrigin: "50% -107px" }} // Align pivot with Spider-Man's navbar anchor at top-[68px]
      className="absolute left-1/2 -ml-3 top-[175px] bottom-[80px] w-6 pointer-events-none z-0 opacity-40 will-change-transform hidden lg:block"
    >
      {/* Web Line (Subtle opacity) */}
      <svg className="w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 20 100">
        <defs>
          <linearGradient id="web-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e23636" stopOpacity="0.8" />
            <stop offset="10%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Core web silk */}
        <line 
          x1="10" 
          y1="0" 
          x2="10" 
          y2="100" 
          stroke="url(#web-gradient)" 
          strokeWidth="1.2" 
          filter="url(#glow-filter)"
        />
        
        {/* Wavy wrapping strands */}
        <path 
          d="M 10,0 C 7,10 13,20 10,30 C 7,40 13,50 10,60 C 7,70 13,80 10,90 C 7,95 13,98 10,100" 
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)" 
          strokeWidth="0.6"
        />

        {/* Small diagonal reinforcement fibers */}
        <line x1="10" y1="5" x2="6" y2="8" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="15" x2="14" y2="18" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="25" x2="7" y2="29" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="35" x2="13" y2="39" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="45" x2="6" y2="48" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="55" x2="14" y2="58" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="65" x2="7" y2="69" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="75" x2="13" y2="79" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="85" x2="6" y2="88" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
        <line x1="10" y1="95" x2="14" y2="98" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.4" />
      </svg>

      {/* Suspended Gwen Stacy SVG Illustration - Nesting inside the rotating web container */}
      <div className="absolute bottom-[-83px] lg:bottom-[-125px] left-1/2 -translate-x-1/2 w-48 lg:w-64 h-32 lg:h-48 pointer-events-none z-10 flex justify-center">
        <svg 
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
          viewBox="0 0 120 80"
          fill="currentColor"
        >
          {/* Web wraps around her waist */}
          <ellipse cx="60" cy="28" rx="4" ry="2" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          
          {/* Blonde Hair hanging down */}
          <path d="M 22,34 Q 16,36 12,48 Q 16,56 22,50 Q 20,44 22,34" fill="#facc15" />
          <path d="M 20,38 Q 14,40 10,54 Q 15,58 20,50" fill="#eab308" />

          {/* Head/Face profile */}
          <path d="M 28,30 Q 22,32 23,38 Q 26,40 30,36 Z" fill="#fee2e2" />
          
          {/* Teal/Green Coat (Torso) */}
          <path d="M 58,26 Q 44,25 32,32 L 30,38 Q 44,38 52,32 Z" fill="#0d9488" />
          {/* Coat flap hanging down */}
          <path d="M 32,32 Q 28,48 30,55 Q 36,53 42,42" fill="#14b8a6" />

          {/* Arms (limp, hanging down) */}
          <path d="M 32,34 Q 28,40 26,48 L 29,50 L 34,40 Z" fill="#0d9488" />
          
          {/* Black Skirt / Leggings */}
          <path d="M 56,26 L 68,26 L 70,32 L 58,32 Z" fill="#1e293b" />
          
          {/* Legs extending horizontally/downwards */}
          {/* Left Leg */}
          <path d="M 68,26 Q 80,24 92,30 L 98,32 L 96,35 Q 82,32 68,31 Z" fill="#1e293b" />
          {/* Left Boot */}
          <path d="M 92,30 L 102,32 L 104,38 L 96,35 Z" fill="#451a03" />

          {/* Right Leg */}
          <path d="M 66,29 Q 78,32 86,44 L 92,46 L 88,49 Q 78,38 66,33 Z" fill="#0f172a" />
          {/* Right Boot */}
          <path d="M 86,44 L 94,47 L 92,54 L 86,49 Z" fill="#451a03" />
          
          {/* Purple/Pink headband detail in hair */}
          <path d="M 25,32 Q 22,30 20,32" fill="none" stroke="#db2777" strokeWidth="1.5" />
        </svg>
      </div>
    </motion.div>
  );
}
