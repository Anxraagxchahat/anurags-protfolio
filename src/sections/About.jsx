// ============================================================
// About — "Dimension 02 — Origin" (doc 03 §3).
// Editorial two-column. Left: accented pull-quote + identity card (name, role,
// the 3 facts). Right: the verbatim long bio as flowing paragraphs (staggered
// reveal) + a compact "by the numbers" strip. NO second dated timeline — Journey
// is the canonical timeline (de-duplicated per doc 00 §5 note).
// All copy from data/profile.js (locked).
// ============================================================

import { motion } from 'framer-motion';
import { identity, bio } from '../data/profile';
import { useCapabilities } from '../lib/useReducedMotion';
import { fadeUpBlur, instant, slideInLeft, staggerContainer, VIEWPORT } from '../lib/motion';
import SectionShell from '../ui/SectionShell';
import GlassCard from '../ui/GlassCard';

// Locked "by the numbers" facts (doc 00 §1)
const NUMBERS = [
  { v: '2+', l: 'Startups' },
  { v: '5+', l: 'Projects' },
  { v: '2026', l: 'Since' },
];

// Render the pull-quote with two key phrases accented.
function PullQuote() {
  const q = bio.pullQuote; // "A non-traditional path built on high-velocity learning."
  const parts = q.split(/(non-traditional|high-velocity learning)/g);
  return (
    <>
      {parts.map((p, i) =>
        p === 'non-traditional' || p === 'high-velocity learning' ? (
          <span key={i} style={{ color: 'var(--accent)' }}>
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function About() {
  const { reducedMotion } = useCapabilities();
  const reveal = reducedMotion ? instant : fadeUpBlur;
  const left = reducedMotion ? instant : slideInLeft;

  return (
    <SectionShell id="about" section="about" dimension="02" eyebrow="Origin" title="ORIGIN STORY">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Left — pull-quote + identity card */}
        <motion.div
          variants={left}
          initial="initial"
          whileInView="animate"
          viewport={VIEWPORT}
          className="flex flex-col gap-8 lg:col-span-5"
        >
          <blockquote className="font-heading text-h3 font-bold leading-snug text-paper">
            “<PullQuote />”
          </blockquote>

          <GlassCard variant="panel" className="p-8">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-paper">
                {identity.name}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper-dim">Founder &amp; Developer</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-white/5 pt-5 text-xs text-paper-dim">
              {bio.facts.map((f) => (
                <div key={f.label}>
                  <span className="block text-sm font-bold text-paper">{f.value}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right — flowing bio + numbers strip */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="initial"
          whileInView="animate"
          viewport={VIEWPORT}
          className="flex flex-col gap-6 lg:col-span-7"
        >
          {bio.paragraphs.map((para, i) => (
            <motion.p key={i} variants={reveal} className="text-body-lg font-light leading-relaxed text-paper-dim">
              {para}
            </motion.p>
          ))}

          <motion.div variants={reveal} className="mt-2 grid grid-cols-3 gap-4">
            {NUMBERS.map((n) => (
              <div key={n.l} className="glass-card rounded-card border-white/5 p-5 text-center">
                <span className="block font-display text-h3 leading-none text-rift">{n.v}</span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {n.l}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
