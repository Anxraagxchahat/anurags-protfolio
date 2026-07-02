import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Layers, Sparkles, CheckCircle, Code, Zap } from 'lucide-react';

// Animated counting number component
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const isNumber = !isNaN(target);
    if (!isNumber) {
      setCount(target);
      return;
    }
    const num = parseInt(target);
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{typeof count === 'number' ? count : count}{suffix}</span>;
}

// Typing text animation
function TypingText({ text, speed = 50, delay = 1500 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          // Blink cursor then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span>
      {displayed}
      {showCursor && <span className="inline-block w-[2px] h-[1em] bg-zinc-900 ml-1 animate-pulse align-middle" />}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const tiltSpringConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), tiltSpringConfig);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8,
      }
    }
  };

  const fadeUpVariants = {
    initial: { y: 50, opacity: 0, filter: 'blur(10px)' },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: "spring", damping: 20, stiffness: 60, mass: 0.8 }
    }
  };

  const scaleInVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 15, stiffness: 80, delay: 0.3 }
    }
  };

  const stats = [
    { value: "2", label: "Startups", icon: <Layers className="w-4 h-4 text-zinc-900" />, suffix: "+" },
    { value: "5", label: "Projects", icon: <Code className="w-4 h-4 text-zinc-900" />, suffix: "+" },
    { value: "AI/ML", label: "Core Stack", icon: <Sparkles className="w-4 h-4 text-zinc-900" />, suffix: "" },
    { value: "Live", label: "In Production", icon: <CheckCircle className="w-4 h-4 text-zinc-900" />, suffix: "" }
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden"
    >


      {/* Background soft backlights */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-black/5 glow-blob" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-black/5 glow-blob" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">

        {/* Left Column: Text & Content */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:pr-4"
        >
          {/* Animated Badge */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center space-x-2 px-4 py-2 rounded-full glass-card border-zinc-900/5 shadow-[0_4px_12px_rgba(0,0,0,0.2)] text-xs font-semibold tracking-wider text-zinc-900 breathe-glow"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900"></span>
            </span>
            <span className="uppercase">Founder @ OpportunityX</span>
          </motion.div>

          {/* Glitch + Animated Gradient Name */}
          <motion.div variants={fadeUpVariants} className="space-y-1">
            <h1
              className="glitch-text text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-zinc-900 uppercase font-sans"
              data-text="ANURAG"
            >
              ANURAG
            </h1>
            <h1 className="gradient-text-animated text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] uppercase font-sans py-1">
              VERMA
            </h1>
          </motion.div>

          {/* Typing Subtitle */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-lg md:text-xl font-black tracking-wide text-zinc-950 uppercase min-h-[2em]"
          >
            <TypingText text="Building products for students with AI/ML & Full Stack Web." speed={35} delay={1800} />
          </motion.h2>

          {/* Description with reveal */}
          <motion.p
            variants={fadeUpVariants}
            className="text-sm md:text-base text-zinc-800 font-medium leading-relaxed max-w-xl"
          >
            Started coding in <span className="text-zinc-950 font-black">october 2025</span>. Currently exploring AI/ML, full stack development, and building <span className="text-zinc-950 font-black">OpportunityX</span> — a platform helping students discover hackathons, internships, jobs, scholarships, and opportunities in one place.
          </motion.p>

          {/* CTA Buttons with neon effects */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group relative px-8 py-3.5 bg-gradient-to-r from-zinc-900 to-zinc-700 hover:brightness-105 text-white font-bold text-sm rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.15)] text-center tracking-wider uppercase overflow-hidden"
            >
              {/* Animated shine sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-white" />
                Explore Projects
              </span>
            </a>
            <a
              href="https://opportunity-x.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-border px-8 py-3.5 glass-card hover:bg-white/[0.08] hover:border-zinc-900/15 text-zinc-900 font-semibold text-sm rounded-full transition-all duration-300 text-center border-zinc-900/10 tracking-wider uppercase"
            >
              View OpportunityX
            </a>
          </motion.div>

          {/* Dynamic Stats Grid with CountUp */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-6 border-t border-zinc-900/5"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col p-3.5 rounded-2xl glass-card border-zinc-900/5 hover:border-zinc-900/15 transition-colors neon-border cursor-default"
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  {stat.icon}
                  <span className="text-zinc-400 text-[10px] tracking-wider uppercase font-semibold">{stat.label}</span>
                </div>
                <span className="text-xl md:text-2xl font-black tracking-tight text-zinc-900">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Column: Premium Founder Portrait with 3D Tilt */}
        <motion.div
          variants={scaleInVariants}
          initial="initial"
          animate="animate"
          className="lg:col-span-5 flex justify-center items-center relative"
          style={{ perspective: 1200 }}
        >
          {/* Accent light rings behind the portrait */}
          <div className="absolute w-[280px] md:w-[350px] h-[280px] md:h-[350px] rounded-full bg-black/5 animate-pulse-slow filter blur-[60px] pointer-events-none" />
          <div className="absolute w-[240px] md:w-[300px] h-[240px] md:h-[300px] rounded-full bg-black/5 animate-glow-slow filter blur-[40px] pointer-events-none" />

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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 1200
            }}
            className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[3/4] rounded-3xl overflow-visible glass-card border-zinc-900/15 p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] group cursor-pointer select-none"
          >
            {/* Hover light highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

            {/* 3D Floating Tag 1 (Top Left) */}
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-6 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-900/10 text-[9px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] flex items-center space-x-1.5"
              style={{ transform: "translateZ(65px)" }}
            >
              <span>🚀</span>
              <span>STARTUP BUILDER</span>
            </motion.div>

            {/* 3D Floating Tag 2 (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 5, 0], rotate: [1, -1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -right-6 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-900/10 text-[9px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] flex items-center space-x-1.5"
              style={{ transform: "translateZ(55px)" }}
            >
              <span>⚡</span>
              <span>5+ PRODUCTS</span>
            </motion.div>

            {/* 3D Floating Tag 3 (Top Right) - NEW */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-2 -right-4 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-900/10 text-[8px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] flex items-center space-x-1"
              style={{ transform: "translateZ(70px)" }}
            >
              <span>🔥</span>
              <span>AI/ML</span>
            </motion.div>

            {/* The Portrait Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
              <img
                src="/chahat.jpg"
                alt="Anurag Verma"
                className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.88] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-750 ease-out scale-105 group-hover:scale-100"
                style={{ transform: "translateZ(15px)" }}
              />
              {/* Dual-tone Dark Vignette Gradient Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-[#030712]/10 mix-blend-color" />

              {/* Cinematic Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-white/40 border border-zinc-900/5 text-left flex flex-col justify-start" style={{ transform: "translateZ(35px)" }}>
                <span className="text-[10px] text-zinc-900 font-bold tracking-widest uppercase mb-0.5">ANURAG VERMA</span>
                <span className="text-[9px] text-zinc-500 font-light tracking-wide">FOUNDER & DEVELOPER</span>
              </div>
            </div>

            {/* Glowing borders around portrait */}
            <div className="absolute inset-0 rounded-3xl border border-zinc-900/10 pointer-events-none group-hover:border-zinc-900/15 transition-colors duration-500" style={{ transform: "translateZ(10px)" }} />
          </motion.div>
        </motion.div>

      </div>

      {/* Slide down mouse scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex"
      >
        <span className="text-[10px] font-semibold tracking-widest text-zinc-900 uppercase">SCROLL</span>
        <motion.div
          animate={{
            y: [0, 6, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-4 h-4 text-zinc-900" />
        </motion.div>
      </a>
    </section>
  );
}
