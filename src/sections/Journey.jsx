// ============================================================
// Journey — "Dimension 05 — Timeline" (doc 03 §6).
// Vertical timeline with a glowing rift spine that DRAWS on scroll (GSAP
// ScrollTrigger scrub on scaleY — single RAF via the GSAP ticker). Each node:
// mono date tag, title, glass card with tilt. All 7 milestones verbatim and
// chronological from data/journey.js. Reduced-motion → spine fully drawn,
// nodes fade in.
// ============================================================

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Cpu, Globe, Rocket, Layers, Sparkles, MessageSquare } from 'lucide-react';
import { journey } from '../data/journey';
import { useCapabilities } from '../lib/useReducedMotion';
import { instant, slideInLeft, staggerContainer, STAGGER, VIEWPORT } from '../lib/motion';
import SectionShell from '../ui/SectionShell';
import GlassCard from '../ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const ICONS = { Calendar, Cpu, Globe, Rocket, Layers, Sparkles, MessageSquare };

export default function Journey() {
  const { reducedMotion } = useCapabilities();
  const listRef = useRef(null);
  const spineRef = useRef(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;

    if (reducedMotion) {
      gsap.set(spine, { scaleY: 1, transformOrigin: 'top' });
      return;
    }

    gsap.set(spine, { scaleY: 0, transformOrigin: 'top' });
    const tween = gsap.to(spine, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 75%',
        end: 'bottom 85%',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <SectionShell
      id="journey"
      section="journey"
      dimension="05"
      eyebrow="Timeline"
      title="THE CHRONOLOGICAL TRACK"
      align="center"
    >
      <div className="relative mx-auto max-w-4xl pl-10 text-left">
        {/* Spine track + drawn rift overlay */}
        <div className="absolute bottom-4 left-[19px] top-4 w-[2px] bg-white/5" />
        <div
          ref={spineRef}
          className="absolute bottom-4 left-[19px] top-4 w-[2px] bg-rift shadow-[0_0_12px_var(--accent)]"
        />

        <motion.ol
          ref={listRef}
          variants={staggerContainer(STAGGER.wide)}
          initial="initial"
          whileInView="animate"
          viewport={VIEWPORT}
          className="flex flex-col gap-12"
        >
          {journey.map((ms) => {
            const Icon = ICONS[ms.icon] || Calendar;
            return (
              <motion.li
                key={ms.title}
                variants={reducedMotion ? instant : slideInLeft}
                className="group relative flex flex-col gap-3 md:flex-row md:items-start md:gap-8"
              >
                {/* Node */}
                <span
                  className="absolute -left-[39px] top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-ink shadow-[0_0_12px_var(--accent)]"
                  style={{ borderColor: ms.accent }}
                >
                  <Icon className="h-4 w-4" style={{ color: ms.accent }} />
                </span>

                {/* Date tag */}
                <div className="w-28 flex-shrink-0 pt-1">
                  <span
                    className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest md:text-xs"
                    style={{ color: ms.accent, borderColor: `color-mix(in srgb, ${ms.accent} 30%, transparent)` }}
                  >
                    {ms.date}
                  </span>
                </div>

                {/* Card */}
                <GlassCard tilt tiltStrength={6} accent={ms.accent} className="flex-1 p-6">
                  <h3 className="mb-2 text-h3 font-bold text-paper" style={{ transform: 'translateZ(20px)' }}>
                    {ms.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-paper-dim" style={{ transform: 'translateZ(10px)' }}>
                    {ms.summary}
                  </p>
                </GlassCard>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </SectionShell>
  );
}
