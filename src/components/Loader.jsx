import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  // Stagger animation container
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  // Text letter animations
  const textVariants = {
    initial: { y: 80, opacity: 0, rotateX: -90 },
    animate: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Progress bar animation
  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += Math.random() * 15 + 5;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
      } else {
        setProgress(Math.min(start, 100));
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Automatically trigger transition after intro animations complete
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-black/5 rounded-full blur-[100px] pointer-events-none translate-x-32 translate-y-20" />

      {/* Top gradient line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent shadow-[0_0_15px_rgba(9,9,11,0.04)]"
      />

      {/* Bottom gradient line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent shadow-[0_0_15px_rgba(9,9,11,0.04)]"
      />

      {/* Glowing Hexagon AV Emblem */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative"
      >
        <div className="absolute -inset-6 rounded-full bg-black/5 filter blur-xl animate-pulse" />
        <svg 
          className="w-20 h-20 text-zinc-900 relative z-10 filter drop-shadow-[0_0_12px_rgba(9,9,11,0.1)]" 
          viewBox="0 0 100 100" 
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        >
          {/* Outer Hexagon */}
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeLinecap="round" strokeLinejoin="round" />
          {/* Inner Stylized 'A' & 'V' line paths */}
          <path d="M35,65 L50,30 L65,65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40,50 L60,50" stroke="#737373" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center space-y-5"
      >
        {/* Name Title with 3D perspective letter animation */}
        <div className="overflow-hidden flex space-x-1.5 md:space-x-3" style={{ perspective: '600px' }}>
          {"ANURAG".split('').map((char, index) => (
            <motion.span
              key={`a-${index}`}
              variants={textVariants}
              className="text-zinc-900 text-4xl md:text-7xl font-extrabold tracking-wide uppercase font-sans inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </motion.span>
          ))}
          <span className="w-1.5 md:w-3" />
          {"VERMA".split('').map((char, index) => (
            <motion.span
              key={`v-${index}`}
              variants={textVariants}
              className="gradient-text-animated text-4xl md:text-7xl font-extrabold tracking-wide uppercase font-sans inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="px-5 py-2 rounded-full glass-card text-xs md:text-sm font-medium tracking-widest text-zinc-900/90 uppercase border border-zinc-900/10 shadow-[0_0_15px_rgba(9,9,11,0.04)] flex items-center space-x-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
          <span>Founder @ OpportunityX</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-48 md:w-64 mt-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">Loading</span>
            <span className="text-[10px] text-zinc-900 font-mono font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-[2px] bg-black/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-zinc-900 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative vertical line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 60, opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-12 w-[1px] bg-gradient-to-b from-zinc-400 to-transparent"
      />
    </motion.div>
  );
}
