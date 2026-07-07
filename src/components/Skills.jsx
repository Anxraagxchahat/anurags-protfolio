import { motion } from 'framer-motion';
import {
  Terminal, Layers, Zap, Database, Server, Cpu, Webhook,
  Smartphone, GitBranch, ExternalLink, Globe, Palette,
} from 'lucide-react';
import SectionShell from './ui/SectionShell';
import { VIEWPORT, staggerContainer } from '../lib/motion';

const SKILLS = [
  { icon: Terminal, name: 'Python', category: 'Backend / ML', desc: 'Core scripting, automation pipelines, and machine learning architectures.' },
  { icon: Layers, name: 'React', category: 'Frontend Core', desc: 'Declarative component styling, state orchestration, and high-fps rendering.' },
  { icon: Zap, name: 'Next.js & TS', category: 'Full-Stack Web', desc: 'Type-safe App Router architecture, Server Actions, stateful dashboards, and SEO optimization.' },
  { icon: Database, name: 'Firebase', category: 'Cloud Database', desc: 'Realtime data synchronize, Firestore models, cloud storage, and secure authentication.' },
  { icon: Server, name: 'FastAPI', category: 'Microservices', desc: 'High-performance Python microservices, validation, auto documentation.' },
  { icon: Cpu, name: 'AI/ML & Gemini', category: 'Intelligent Systems', desc: 'Gemini API integrations, conversational prompt engineering, and semantic AI search agents.' },
  { icon: Webhook, name: 'Real-Time WebRTC', category: 'Real-Time Systems', desc: 'Low-latency WebSockets (Socket.io), end-to-end encrypted (E2EE) chat rooms, and WebRTC video.' },
  { icon: Smartphone, name: 'Hybrid Mobile', category: 'Cross-Platform', desc: 'Wrapping web apps into native Android applications using Capacitor and custom gradle tools.' },
  { icon: GitBranch, name: 'GitHub', category: 'Version Control', desc: 'Distributed revisioning, branches management, workflows automation.' },
  { icon: ExternalLink, name: 'APIs Integration', category: 'Connectivity', desc: 'Rest protocols, third-party hooks, secure OAuth integrations, rapid ingest pipelines.' },
  { icon: Globe, name: 'Vercel & Render', category: 'Hosting / DevOps', desc: 'Continuous deployment for frontends, preview builds, Docker containers, and cron tasks.' },
  { icon: Palette, name: 'UI/UX & Framer', category: 'SaaS Design', desc: 'Apple-level minimal layouts, high-fidelity responsive forms, Framer Motion, and aesthetic glassmorphism.' },
];

const pill = {
  hidden: { y: 24, opacity: 0, scale: 0.94 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 130 } },
};

function SkillPill({ skill, index }) {
  const { icon: Icon, name, category, desc } = skill;
  return (
    <motion.div variants={pill} className="group relative">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + (index % 4), repeat: Infinity, ease: 'easeInOut', delay: (index % 5) * 0.4 }}
        className="flex cursor-default items-center gap-3 rounded-full glass-card px-4 py-2.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-aurora-violet/40 group-hover:shadow-[0_16px_40px_rgba(138,124,255,0.18)]"
      >
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/5 bg-white/70">
          <Icon className="h-4 w-4 text-aurora-indigo" />
        </span>
        <span className="text-sm font-semibold text-ink">{name}</span>
        <span className="hidden rounded-full bg-ink/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-ink-mute sm:inline">
          {category}
        </span>
      </motion.div>

      {/* Hover description popover (fine-pointer); accessible copy always in DOM */}
      <div className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-3 hidden w-64 -translate-x-1/2 translate-y-2 rounded-2xl glass-panel p-4 opacity-0 shadow-glass-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
        <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-aurora-indigo">
          {category}
        </span>
        <p className="text-xs leading-relaxed text-ink-soft">{desc}</p>
      </div>
      <span className="sr-only">{desc}</span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Technical Stack"
      title="Engineering"
      accent="capabilities"
      align="center"
      className="border-t border-ink/5"
      intro="A toolkit spanning intelligent systems, real-time infrastructure, and premium interface design."
    >
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
      >
        {SKILLS.map((skill, i) => (
          <SkillPill key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
