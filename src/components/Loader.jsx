import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';

/**
 * Bright premium intro. An aurora-washed white curtain with the brand mark,
 * name, and a real progress meter, then an eased upward reveal. Doubles as the
 * first moment of the experience. Hard-capped so it never traps the user.
 */
export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const t = setTimeout(() => {
        setProgress(100);
        onComplete();
      }, 400);
      return () => clearTimeout(t);
    }

    let value = 0;
    const timer = setInterval(() => {
      value += Math.random() * 13 + 6;
      setProgress(Math.min(value, 100));
      if (value >= 100) clearInterval(timer);
    }, 130);

    const done = setTimeout(onComplete, 2600);
    return () => {
      clearInterval(timer);
      clearTimeout(done);
    };
  }, [onComplete]);

  const words = ['ANURAG', 'VERMA'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-paper"
    >
      <div className="aurora-blob blob-violet w-[560px] h-[560px] -top-24 -left-24 animate-blob" />
      <div
        className="aurora-blob blob-cyan w-[520px] h-[520px] -bottom-24 -right-16 animate-blob"
        style={{ animationDelay: '-7s' }}
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE.expo }}
        className="relative mb-10"
      >
        <div className="absolute -inset-8 rounded-full bg-aurora-violet/15 blur-2xl" />
        <svg
          className="relative h-20 w-20"
          viewBox="0 0 100 100"
          fill="none"
          stroke="url(#loaderGrad)"
          strokeWidth="5"
        >
          <defs>
            <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8A7CFF" />
              <stop offset="100%" stopColor="#5FD0E6" />
            </linearGradient>
          </defs>
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35,65 L50,30 L65,65" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40,50 L60,50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="flex gap-3 md:gap-4 overflow-hidden" aria-label="Anurag Verma">
        {words.map((word, wi) => (
          <div key={wi} className="flex overflow-hidden">
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE.expo, delay: 0.15 + (wi * 6 + i) * 0.04 }}
                className="text-2xl md:text-4xl font-semibold tracking-tightest"
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 w-56 md:w-72"
      >
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] tracking-widest text-ink-mute">
          <span className="uppercase">Loading</span>
          <span>{String(Math.round(progress)).padStart(3, '0')}</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/[0.06]">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: 'var(--rift-gradient)' }}
            transition={{ duration: 0.12 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
