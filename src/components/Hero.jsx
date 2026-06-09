import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Terminal, Sparkles, CheckCircle, Code } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8, // Allow loader to complete
      }
    }
  };

  const fadeUpVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 60, mass: 0.8 }
    }
  };

  const stats = [
    { value: "2", label: "Startup Building", icon: <Layers className="w-4 h-4 text-accentPurple" /> },
    { value: "4", label: "Projects Built", icon: <Code className="w-4 h-4 text-accentBlue-light" /> },
    { value: "AI/ML", label: "+ Full Stack", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { value: "Live", label: "Real Product Live", icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden"
    >
      {/* Background soft backlights */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-accentBlue/10 glow-blob" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accentPurple/10 glow-blob" />

      {/* Giant Glowing Spider-Man Web behind the content */}
      <svg 
        className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] text-accentPurple/15 pointer-events-none transform rotate-12 z-0 filter drop-shadow-[0_0_15px_rgba(226,54,54,0.15)]" 
        viewBox="0 0 100 100" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.15"
      >
        <line x1="50" y1="50" x2="50" y2="0" />
        <line x1="50" y1="50" x2="50" y2="100" />
        <line x1="50" y1="50" x2="0" y2="50" />
        <line x1="50" y1="50" x2="100" y2="50" />
        <line x1="50" y1="50" x2="15" y2="15" />
        <line x1="50" y1="50" x2="85" y2="85" />
        <line x1="50" y1="50" x2="15" y2="85" />
        <line x1="50" y1="50" x2="85" y2="15" />
        <line x1="50" y1="50" x2="32" y2="5" />
        <line x1="50" y1="50" x2="68" y2="95" />
        <line x1="50" y1="50" x2="5" y2="32" />
        <line x1="50" y1="50" x2="95" y2="68" />
        <line x1="50" y1="50" x2="32" y2="95" />
        <line x1="50" y1="50" x2="68" y2="5" />
        <line x1="50" y1="50" x2="5" y2="68" />
        <line x1="50" y1="50" x2="95" y2="32" />
        <path d="M 50,40 Q 43,43 40,50 Q 43,57 50,60 Q 57,57 60,50 Q 57,43 50,40" />
        <path d="M 50,30 Q 36,36 30,50 Q 36,64 50,70 Q 64,64 70,50 Q 64,36 50,30" />
        <path d="M 50,20 Q 29,29 20,50 Q 29,71 50,80 Q 71,71 80,50 Q 71,29 50,20" />
        <path d="M 50,10 Q 22,22 10,50 Q 22,78 50,90 Q 78,78 90,50 Q 78,22 50,10" />
        <path d="M 50,0 Q 15,15 0,50 Q 15,85 50,100 Q 85,85 100,50 Q 85,15 50,0" />
      </svg>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Text & Content */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:pr-4"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.2)] text-xs font-semibold tracking-wider text-accentBlue-light"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentPurple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accentPurple"></span>
            </span>
            <span>FOUNDER @ OPPORTUNITYX</span>
          </motion.div>

          {/* Headline Typography */}
          <motion.div variants={fadeUpVariants} className="space-y-1">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-white uppercase font-sans">
              ANURAG
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-accentBlue via-accentBlue-light to-accentPurple uppercase font-sans py-1">
              VERMA
            </h1>
          </motion.div>

          {/* Quick Subtitle Headline */}
          <motion.h2 
            variants={fadeUpVariants}
            className="text-lg md:text-xl font-bold tracking-wide text-gray-200 uppercase"
          >
            Building products for students with AI/ML & Full Stack Web.
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={fadeUpVariants}
            className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-xl"
          >
            Started coding in January 2026. Currently exploring AI/ML, full stack development, and building **OpportunityX** — a platform helping students discover hackathons, internships, jobs, scholarships, and opportunities in one place.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#projects"
              className="px-8 py-3.5 bg-gradient-to-r from-accentBlue to-accentPurple hover:brightness-110 text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(59,130,246,0.35)] text-center tracking-wider uppercase"
            >
              Explore Projects
            </a>
            <a 
              href="https://opportunity-x.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 glass-card hover:bg-white/[0.08] hover:border-white/20 text-white font-semibold text-sm rounded-full transition-all duration-300 text-center border-white/10 tracking-wider uppercase"
            >
              View OpportunityX
            </a>
          </motion.div>

          {/* Dynamic Stats Grid */}
          <motion.div 
            variants={fadeUpVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-6 border-t border-white/5"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col p-3 rounded-2xl glass-card border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-1">
                  {stat.icon}
                  <span className="text-gray-500 text-[10px] tracking-wider uppercase font-semibold">{stat.label}</span>
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-white">{stat.value}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Column: Premium Founder Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 50, delay: 0.9 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Accent light rings behind the portrait */}
          <div className="absolute w-[280px] md:w-[350px] h-[280px] md:h-[350px] rounded-full bg-accentBlue/10 animate-pulse-slow filter blur-[60px] pointer-events-none" />
          <div className="absolute w-[240px] md:w-[300px] h-[240px] md:h-[300px] rounded-full bg-accentPurple/10 animate-glow-slow filter blur-[40px] pointer-events-none" />

          {/* Premium styled floating card */}
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[3/4] rounded-3xl overflow-hidden glass-card border-white/15 p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] group"
          >
            {/* Hover light highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accentBlue/10 via-transparent to-accentPurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* The Portrait Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-darkBg">
              <img 
                src="/portrait3.jpg" 
                alt="Anurag Verma" 
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.88] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-750 ease-out scale-105 group-hover:scale-100"
              />
              {/* Dual-tone Dark Vignette Gradient Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-[#030712]/10 mix-blend-color" />
              
              {/* Cinematic Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-black/40 border border-white/5 text-left flex flex-col justify-start">
                <span className="text-[10px] text-accentBlue-light font-bold tracking-widest uppercase mb-0.5">ANURAG VERMA</span>
                <span className="text-[9px] text-gray-400 font-light tracking-wide">FOUNDER & DEVELOPER</span>
              </div>
            </div>

            {/* Glowing borders around portrait */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none group-hover:border-accentBlue/30 transition-colors duration-500" />
          </motion.div>
        </motion.div>

      </div>

      {/* Slide down mouse scroll indicator */}
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex"
      >
        <span className="text-[10px] font-semibold tracking-widest text-white uppercase">SCROLL</span>
        <motion.div
          animate={{
            y: [0, 4, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-4 h-4 text-accentBlue" />
        </motion.div>
      </a>
    </section>
  );
}
