// ============================================================
// SectionShell — standardizes every dimension/section (doc 03 §0).
// Responsibilities:
//   - sets the section's --accent / --accent-2 CSS vars (theme.js)
//   - renders the eyebrow "DIMENSION 0X" + massive splash heading
//   - lays down a halftone background layer
//   - scroll-reveals its content (gated by reduced-motion)
//   - fires onEnter(section) via IntersectionObserver so the World layer can
//     lerp its accent (wired in a later phase; kept decoupled from three/ here)
// ============================================================

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { applyAccent } from '../lib/theme';
import { useCapabilities } from '../lib/useReducedMotion';
import { fadeUpBlur, instant, VIEWPORT } from '../lib/motion';
import Eyebrow from './Eyebrow';
import Halftone from './Halftone';

export default function SectionShell({
  id,
  section = id,
  dimension,
  eyebrow,
  title,
  accent,
  align = 'left', // 'left' | 'center'
  halftone = true,
  onEnter,
  className = '',
  innerClassName = '',
  headingClassName = '',
  children,
}) {
  const ref = useRef(null);
  const { reducedMotion } = useCapabilities();
  const reveal = reducedMotion ? instant : fadeUpBlur;

  // Apply this section's accent as CSS custom properties
  useEffect(() => {
    applyAccent(ref.current, section, accent);
  }, [section, accent]);

  // Notify (e.g. World accent lerp / nav active state) when section enters view
  useEffect(() => {
    if (!onEnter || !ref.current || typeof IntersectionObserver === 'undefined') return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onEnter(section);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onEnter, section]);

  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden border-t border-white/5 px-4 py-section ${className}`}
    >
      {halftone && <Halftone className="opacity-[var(--halftone-opacity)]" />}

      <div className={`relative z-10 mx-auto w-full max-w-content ${innerClassName}`}>
        {(eyebrow || title) && (
          <motion.header
            variants={reveal}
            initial="initial"
            whileInView="animate"
            viewport={VIEWPORT}
            className={`mb-12 flex flex-col gap-4 ${alignCls}`}
          >
            {eyebrow && <Eyebrow dimension={dimension}>{eyebrow}</Eyebrow>}
            {title && (
              <h2
                className={`font-display uppercase leading-[0.9] text-h1 text-paper ${headingClassName}`}
              >
                {title}
              </h2>
            )}
            <div
              className="h-1 w-16 rounded-full"
              style={{ background: 'var(--rift-gradient, linear-gradient(90deg,var(--accent),var(--accent-2)))' }}
            />
          </motion.header>
        )}

        {children}
      </div>
    </section>
  );
}
