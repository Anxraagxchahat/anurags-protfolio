// ============================================================
// Hero — "Dimension 01 — Arrival" (doc 03 §Hero). Complete rebuild.
//   - Anton splash name (rift gradient + resting chromatic offset)
//   - "Founder @ OpportunityX" as the primary identity element (live badge)
//   - typing subtitle, lead, magnetic CTAs (Explore = portal jump)
//   - count-up stats, floating photo card (tilt + idle float + badges)
//   - sits over the persistent World layer (the portal is centered behind)
// All copy/stats/links come from data/profile.js (locked content, doc 00).
// Reduced-motion: instant reveal, no typing/tilt/float/breathe — calm + complete.
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Layers, Code, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { hero, assets } from '../data/profile';
import { useCapabilities } from '../lib/useReducedMotion';
import { usePortal } from '../ui/PortalTransition';
import { useLenisContext } from '../lib/useLenis';
import { applyAccent, getSectionAccent } from '../lib/theme';
import { fadeUpBlur, instant, scaleIn, SPRING } from '../lib/motion';
import MagneticButton from '../ui/MagneticButton';

const STAT_ICONS = { Layers, Code, Sparkles, CheckCircle };
const ACCENT_CLASS = {
  'spider-red': 'text-spider-red',
  'spider-blue': 'text-spider-blue',
  'spider-amber': 'text-spider-amber',
  'spider-emerald': 'text-spider-emerald',
};

// Count-up (preserve mechanic) — instant under reduced motion / non-numeric.
function CountUp({ target, suffix = '', reduce = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numeric = !Number.isNaN(Number(target));
  const [count, setCount] = useState(numeric && !reduce ? 0 : target);

  useEffect(() => {
    if (reduce || !numeric || !inView) return;
    const num = parseInt(target, 10);
    let start = 0;
    const step = Math.max(1, Math.ceil(num / (2000 / 16)));
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
  }, [inView, target, numeric, reduce]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Typing subtitle (preserve mechanic) — full text instantly under reduced motion.
function TypingText({ text, reduce = false }) {
  const [displayed, setDisplayed] = useState(reduce ? text : '');
  const [showCursor, setShowCursor] = useState(!reduce);

  useEffect(() => {
    if (reduce) return;
    const startTimer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 1800);
    return () => clearTimeout(startTimer);
  }, [text, reduce]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-spider-blue align-middle" />
      )}
    </span>
  );
}

export default function Hero() {
  const { reducedMotion, lowPower, tier } = useCapabilities();
  const reduce = reducedMotion;
  const interactive = !reducedMotion && !lowPower;
  const { playPortal } = usePortal();
  const { scrollTo } = useLenisContext();
  const sectionRef = useRef(null);

  useEffect(() => {
    applyAccent(sectionRef.current, 'hero');
  }, []);

  // Photo-card tilt (preserve spring) — disabled when not interactive.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), SPRING.tilt);
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), SPRING.tilt);
  const onCardMove = (e) => {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onCardLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const reveal = reduce ? instant : fadeUpBlur;
  const container = reduce
    ? { initial: {}, animate: { transition: { staggerChildren: 0.05 } } }
    : { initial: {}, animate: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } };

  const onExplore = (e) => {
    e.preventDefault();
    playPortal({ accent: getSectionAccent('projects'), onCover: () => scrollTo('#projects', { offset: -80 }) });
  };

  const idleFloat = interactive ? { y: [0, -10, 0] } : undefined;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-28"
    >
      {/* Hero-local ambient depth (the World/portal sits behind via the global canvas) */}
      <div className="glow-blob absolute left-[18%] top-[22%] h-[350px] w-[350px] rounded-full bg-spider-blue/10" />
      <div className="glow-blob absolute bottom-[20%] right-[12%] h-[400px] w-[400px] rounded-full bg-spider-red/10" />

      <div className="grid w-full max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left — identity + copy */}
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="flex flex-col items-start gap-6 text-left lg:col-span-7 lg:pr-4"
        >
          {/* Primary identity element: Founder @ OpportunityX */}
          <motion.div
            variants={reveal}
            className="breathe-glow flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-spider-blue"
          >
            <span className="relative flex h-2.5 w-2.5">
              {interactive && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spider-red opacity-75" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-spider-red" />
            </span>
            {hero.eyebrow}
          </motion.div>

          {/* Splash name — Anton */}
          <motion.h1 variants={reveal} className="font-display uppercase leading-[0.82] tracking-tight">
            <span className={`block text-[clamp(3.5rem,11vw,9rem)] text-paper ${reduce ? '' : 'chromatic'}`}>
              {hero.nameLines[0]}
            </span>
            <span className="block text-[clamp(3.5rem,11vw,9rem)] text-rift">{hero.nameLines[1]}</span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.h2
            variants={reveal}
            className="min-h-[2em] font-heading text-lg font-bold uppercase tracking-wide text-paper md:text-xl"
          >
            <TypingText text={hero.subtitle} reduce={reduce} />
          </motion.h2>

          {/* Lead */}
          <motion.p variants={reveal} className="max-w-xl text-body-lg font-light leading-relaxed text-paper-dim">
            {hero.lead}
          </motion.p>

          {/* CTAs — magnetic */}
          <motion.div variants={reveal} className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            <MagneticButton kind="primary" href="#projects" onClick={onExplore} icon={<Zap className="h-4 w-4" />}>
              Explore Projects
            </MagneticButton>
            <MagneticButton kind="secondary" href={hero.ctas[1].href} external>
              View OpportunityX
            </MagneticButton>
          </motion.div>

          {/* Stats — count-up */}
          <motion.div variants={reveal} className="grid w-full grid-cols-2 gap-4 border-t border-white/5 pt-6 md:grid-cols-4">
            {hero.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.icon] || Sparkles;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={interactive ? { scale: 1.05, y: -4 } : undefined}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass-card flex cursor-default flex-col rounded-card border-white/5 p-3.5"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${ACCENT_CLASS[stat.accent] || 'text-spider-blue'}`} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-paper-dim">{stat.label}</span>
                  </div>
                  <span className="text-xl font-black tracking-tight text-paper md:text-2xl">
                    <CountUp target={stat.value} suffix={stat.suffix} reduce={reduce} />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right — floating photo card */}
        <motion.div
          variants={reduce ? instant : scaleIn}
          initial="initial"
          animate="animate"
          className="relative flex items-center justify-center lg:col-span-5"
          style={{ perspective: 1200 }}
        >
          <div className="absolute h-[280px] w-[280px] animate-pulse-slow rounded-full bg-spider-blue/10 blur-[60px] md:h-[350px] md:w-[350px]" />
          <div className="absolute h-[240px] w-[240px] animate-glow-slow rounded-full bg-spider-red/10 blur-[40px] md:h-[300px] md:w-[300px]" />

          <motion.div
            animate={idleFloat}
            transition={idleFloat ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            style={interactive ? { rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 } : undefined}
            className="group relative aspect-[3/4] w-[280px] cursor-pointer select-none rounded-card border border-white/15 bg-white/[0.02] p-3.5 shadow-ambient backdrop-blur-[16px] sm:w-[320px] md:w-[360px]"
          >
            {/* Floating badges (re-themed, doc 03) */}
            {hero.badges.map((badge, i) => {
              const pos = [
                '-left-6 -top-5',
                '-bottom-3 -right-6',
                '-right-4 -top-2',
              ][i];
              const bg = { 'spider-red': 'bg-spider-red', 'spider-blue': 'bg-spider-blue', 'spider-amber': 'bg-spider-amber' }[badge.accent];
              return (
                <motion.div
                  key={badge.label}
                  animate={interactive ? { y: [0, i % 2 ? 5 : -5, 0] } : undefined}
                  transition={interactive ? { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 } : undefined}
                  style={{ transform: `translateZ(${65 - i * 5}px)` }}
                  className={`absolute ${pos} flex items-center gap-1.5 rounded-xl border border-white/20 ${bg} px-3 py-1.5 text-[9px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)]`}
                >
                  <span>{badge.emoji}</span>
                  <span>{badge.label}</span>
                </motion.div>
              );
            })}

            {/* Portrait */}
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl bg-ink"
              style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            >
              <img
                src={assets.portrait}
                alt="Anurag Verma — Founder & Developer"
                loading="eager"
                fetchpriority="high"
                width="360"
                height="480"
                className="h-full w-full scale-105 object-cover object-center brightness-[0.88] contrast-[1.1] grayscale transition-all duration-700 ease-out group-hover:scale-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div
                className="absolute inset-x-4 bottom-4 rounded-xl border border-white/5 bg-black/40 p-3 text-left backdrop-blur-md"
                style={{ transform: 'translateZ(35px)' }}
              >
                <span className="mb-0.5 block font-mono text-[10px] font-bold uppercase tracking-widest text-spider-blue">
                  {hero.photoCaption.title}
                </span>
                <span className="text-[9px] font-light tracking-wide text-paper-dim">{hero.photoCaption.subtitle}</span>
              </div>
            </div>

            {/* Comic ink frame */}
            <div
              className="pointer-events-none absolute inset-0 rounded-card border border-white/10 transition-colors duration-500 group-hover:border-spider-blue/30"
              style={{ transform: 'translateZ(10px)' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue (desktop, motion-on) */}
      {tier === 'desktop' && (
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 transition-opacity hover:opacity-100 md:flex"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white">Scroll</span>
          <motion.div
            animate={interactive ? { y: [0, 6, 0] } : undefined}
            transition={interactive ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
          >
            <ArrowDown className="h-4 w-4 text-spider-blue" />
          </motion.div>
        </a>
      )}
    </section>
  );
}
