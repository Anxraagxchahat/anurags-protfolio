import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Section eyebrow — a small mono label with an aurora dot. Sets the "chapter"
 * tone above each section splash heading.
 */
export default function Eyebrow({ children, className = '', animate = true }) {
  const Comp = animate ? motion.span : 'span';
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: EASE.expo },
      }
    : {};

  return (
    <Comp
      className={`inline-flex items-center gap-2.5 rounded-full glass-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft ${className}`}
      {...motionProps}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-aurora-violet opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-aurora-violet to-aurora-blue" />
      </span>
      {children}
    </Comp>
  );
}
