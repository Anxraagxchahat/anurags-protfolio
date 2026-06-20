// ============================================================
// Skills — "Dimension 03 — Abilities" (doc 03 §4).
// Responsive grid of 12 glass skill cards (3-col desktop / 2 tablet / 1 mobile).
// Each: lucide icon, name, category pill, one-liner, accent glow keyed to the
// skill color, pointer tilt + glow-follow + idle float, accent line grows on
// hover. All 12 skills + colors + categories from data/skills.js (locked).
// ============================================================

import { motion } from 'framer-motion';
import {
  Terminal, Layers, Zap, Database, Server, Cpu,
  Webhook, Smartphone, GitBranch, ExternalLink, Globe, Palette,
} from 'lucide-react';
import { skills } from '../data/skills';
import { useCapabilities } from '../lib/useReducedMotion';
import { fadeUp, instant, staggerContainer, STAGGER, VIEWPORT } from '../lib/motion';
import SectionShell from '../ui/SectionShell';
import GlassCard from '../ui/GlassCard';
import Pill from '../ui/Pill';

const ICONS = {
  Terminal, Layers, Zap, Database, Server, Cpu,
  Webhook, Smartphone, GitBranch, ExternalLink, Globe, Palette,
};

function SkillCard({ skill, index, reduce, interactive }) {
  const Icon = ICONS[skill.icon] || Terminal;
  return (
    <motion.div variants={reduce ? instant : fadeUp} className="h-full">
      <motion.div
        animate={interactive ? { y: [0, -6, 0] } : undefined}
        transition={interactive ? { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: (index % 6) * 0.5 } : undefined}
        className="group h-full"
      >
        <GlassCard
          tilt
          glow
          tiltStrength={10}
          accent={skill.color}
          className="flex h-full flex-col gap-4 p-6"
        >
          <div className="flex items-center justify-between" style={{ transform: 'translateZ(40px)' }}>
            <div
              className="rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors group-hover:bg-white/[0.06]"
              style={{ color: skill.color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <Pill accent={skill.color} className="text-[10px] uppercase tracking-wider">
              {skill.category}
            </Pill>
          </div>

          <div className="space-y-1.5" style={{ transform: 'translateZ(30px)' }}>
            <h3 className="text-h3 font-bold text-paper">{skill.name}</h3>
            <p className="text-sm font-light leading-relaxed text-paper-dim">{skill.blurb}</p>
          </div>

          {/* Accent line grows on hover */}
          <div
            className="mt-auto h-[2px] w-0 rounded-full transition-all duration-500 ease-out group-hover:w-full"
            style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
          />
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const { reducedMotion, lowPower } = useCapabilities();
  const interactive = !reducedMotion && !lowPower;

  return (
    <SectionShell
      id="skills"
      section="skills"
      dimension="03"
      eyebrow="Abilities"
      title="ENGINEERING CAPABILITIES"
      align="center"
    >
      <motion.div
        variants={staggerContainer(STAGGER.base)}
        initial="initial"
        whileInView="animate"
        viewport={VIEWPORT}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} reduce={reducedMotion} interactive={interactive} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
