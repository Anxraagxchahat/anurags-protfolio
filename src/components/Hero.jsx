import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Zap, Layers, Code, Sparkles, CheckCircle } from 'lucide-react';
import Eyebrow from './ui/Eyebrow';
import MagneticButton from './ui/MagneticButton';
import CountUp from './ui/CountUp';
import TypingText from './ui/TypingText';
import { staggerContainer, fadeUpBlur, scaleIn, EASE } from '../lib/motion';
import { useReducedMotion } from '../lib/useReducedMotion';

const CrystalCanvas = lazy(() => import('./three/CrystalCanvas'));

const STATS = [
  { icon: Layers, label: 'Startups', end: 2, suffix: '+' },
  { icon: Code, label: 'Projects', end: 5, suffix: '+' },
  { icon: Sparkles, label: 'Core Stack', text: 'AI/ML' },
  { icon: CheckCircle, label: 'Status', text: 'Live' },
];

const BADGES = [
  { emoji: '\u{1F680}', label: 'STARTUP BUILDER', pos: '-top-5 -left-5', delay: 0 },
  { emoji: '\u26A1', label: '5+ PRODUCTS', pos: '-bottom-4 -right-5', delay: 1 },
  { emoji: '\u{1F525}', label: 'AI/ML', pos: 'top-6 -right-7', delay: 0.5 },
];

/** Bright CSS fallback orb for reduced-motion / low-power / no-WebGL. */
function CrystalFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="h-64 w-64 rounded-full opacity-80 blur-[2px]"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #ffffff, #cfd6ff 30%, #8A7CFF 62%, #5FD0E6 90%)',
          boxShadow: '0 30px 80px rgba(138,124,255,0.35)',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { reducedMotion, lowPower, webgl } = useReducedMotion();
  const useFallback = reducedMotion || lowPower || !webgl;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reducedMotion ? 1 : 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-32 md:pt-28"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8"
      >
        {/* Left: copy */}
        <motion.div
          variants={staggerContainer(0.12, 0.7)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7 text-left lg:col-span-7"
        >
          <motion.div variants={fadeUpBlur}>
            <Eyebrow animate={false}>Founder @ OpportunityX</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUpBlur}
            className="text-6xl font-semibold leading-[0.9] tracking-tightest sm:text-7xl lg:text-8xl xl:text-[8.5rem]"
          >
            <span className="block text-ink">ANURAG</span>
            <span className="aurora-text block">VERMA</span>
          </motion.h1>

          <motion.div
            variants={fadeUpBlur}
            className="max-w-xl text-lg font-medium leading-snug text-ink-soft md:text-xl"
          >
            <span className="font-serif-accent text-2xl text-ink md:text-[1.7rem]">
              Building products for students
            </span>
            <br />
            <TypingText text="with AI/ML & Full Stack Web." className="text-ink-soft" />
          </motion.div>

          <motion.p
            variants={fadeUpBlur}
            className="max-w-xl text-pretty text-[15px] leading-relaxed text-ink-mute md:text-base"
          >
            Started coding in <strong className="font-semibold text-ink">october 2025</strong>. Currently
            exploring AI/ML, full stack development, and building{' '}
            <strong className="font-semibold text-ink">OpportunityX</strong>, a platform helping
            students discover hackathons, internships, jobs, scholarships, and opportunities in one
            place.
          </motion.p>

          <motion.div variants={fadeUpBlur} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton
              href="#projects"
              variant="primary"
              disabled={reducedMotion}
              icon={<Zap className="h-4 w-4" />}
            >
              Explore Projects
            </MagneticButton>
            <MagneticButton
              href="https://opportunity-x.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              disabled={reducedMotion}
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              View OpportunityX
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUpBlur}
            className="grid w-full grid-cols-2 gap-3 border-t border-ink/[0.06] pt-7 md:grid-cols-4"
          >
            {STATS.map(({ icon: Icon, label, end, suffix, text }) => (
              <div
                key={label}
                className="glass-card glass-card-hover flex flex-col gap-1.5 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-aurora-indigo" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                    {label}
                  </span>
                </div>
                <span className="text-2xl font-semibold tracking-tight text-ink">
                  {text ? text : <CountUp end={end} suffix={suffix} />}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: crystal + floating photo card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative flex items-center justify-center lg:col-span-5"
          style={{ perspective: 1200 }}
        >
          {/* Ambient 3D crystal behind the card */}
          <div className="pointer-events-none absolute inset-0 -z-0 scale-125">
            {useFallback ? (
              <CrystalFallback />
            ) : (
              <Suspense fallback={<CrystalFallback />}>
                <CrystalCanvas reduced={reducedMotion} />
              </Suspense>
            )}
          </div>

          {/* Floating glass ID card */}
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="group relative aspect-[3/4] w-[280px] sm:w-[320px] md:w-[360px]"
          >
            <div className="glass-panel relative h-full w-full rounded-[2rem] p-3.5 shadow-glass-xl">
              {BADGES.map((b) => (
                <motion.div
                  key={b.label}
                  animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 4 + b.delay, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
                  className={`absolute z-20 flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-2 text-[9px] font-bold text-ink shadow-glass backdrop-blur-md ${b.pos}`}
                >
                  <span>{b.emoji}</span>
                  <span className="tracking-wide">{b.label}</span>
                </motion.div>
              ))}

              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-paper-soft">
                <img
                  src="/anurag.jpg"
                  alt="Anurag Verma"
                  width="360"
                  height="480"
                  loading="eager"
                  className="h-full w-full scale-105 object-cover object-center grayscale-[0.35] transition-all duration-700 ease-out group-hover:scale-100 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex flex-col rounded-xl border border-white/60 bg-white/60 p-3 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink">
                    Anurag Verma
                  </span>
                  <span className="text-[9px] font-medium tracking-wide text-ink-mute">
                    Founder &amp; Developer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1, ease: EASE.expo }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-ink-mute transition-opacity hover:opacity-100 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
