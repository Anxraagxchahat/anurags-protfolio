import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  // Stagger animation container
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  // Text letter animations
  const textVariants = {
    initial: { y: 60, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Automatically trigger transition after intro animations complete (2.2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
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
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#030712] overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute w-[500px] h-[500px] bg-accentBlue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative premium border glow */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accentBlue to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)]"
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center space-y-4"
      >
        {/* Name Title */}
        <div className="overflow-hidden flex space-x-1.5 md:space-x-3">
          {["A", "N", "U", "R", "A", "G"].map((char, index) => (
            <motion.span
              key={index}
              variants={textVariants}
              className="text-white text-4xl md:text-7xl font-extrabold tracking-wide uppercase font-sans"
            >
              {char}
            </motion.span>
          ))}
          <span className="w-1.5 md:w-3" />
          {["V", "E", "R", "M", "A"].map((char, index) => (
            <motion.span
              key={index}
              variants={textVariants}
              className="text-transparent bg-clip-text bg-gradient-to-r from-accentBlue-light to-accentPurple text-4xl md:text-7xl font-extrabold tracking-wide uppercase font-sans font-glow-blue"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="px-4 py-1.5 rounded-full glass-card text-xs md:text-sm font-medium tracking-widest text-accentBlue-light/90 uppercase border border-accentBlue/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] flex items-center space-x-2"
        >
          <span className="w-2 h-2 rounded-full bg-accentBlue animate-pulse" />
          <span>Founder @ OpportunityX</span>
        </motion.div>
      </motion.div>

      {/* Decorative vertical line */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 60, opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-12 w-[1px] bg-gradient-to-b from-white to-transparent"
      />
    </motion.div>
  );
}
