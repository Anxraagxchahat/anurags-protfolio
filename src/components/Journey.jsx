import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Cpu, Globe, Rocket, MessageSquare, Sparkles } from 'lucide-react';
import SectionShell from './ui/SectionShell';
import { VIEWPORT, EASE } from '../lib/motion';

const MILESTONES = [
  {
    year: 'Oct 2025',
    title: 'The Initial Spark',
    desc: 'Wrote the first lines of HTML, CSS, and JavaScript. Understood core programming paradigms and realized the absolute leverage of automated code frameworks.',
    icon: Calendar,
  },
  {
    year: 'Feb 2026',
    title: 'Exploring AI/ML & Digitalizing Retail',
    desc: 'Built Ms Verma Kirana Store using Lovable to digitalize a local business storefront. Also delved into machine learning patterns, experiments with embeddings search, and custom python model runners.',
    icon: Cpu,
  },
  {
    year: 'Mar 2026',
    title: 'Web Engineering Masterclass',
    desc: 'Mastered full stack environments using FastAPI and React. Built robust, stateful user dashboards, API integrations, and database schemas.',
    icon: Globe,
  },
  {
    year: 'Apr - Jun 2026',
    title: 'Building & Launching OpportunityX',
    desc: 'Designed and launched OpportunityX, a platform serving students looking for career opportunities. Configured and deployed microservices in record speed.',
    icon: Rocket,
  },
  {
    year: 'Jun 2026',
    title: 'Cinematic Portfolio Canvas',
    desc: 'Designed and engineered this premium, highly interactive portfolio featuring custom 3D card tilts, dynamic particle systems, and sleek glassmorphism to showcase all creative works.',
    icon: Globe,
  },
  {
    year: 'Jun 2026',
    title: 'AI Anime Discovery: Zenkai',
    desc: 'Designed and engineered Zenkai, an AI-driven anime discovery ecosystem integrating Gemini AI for natural-language search suggestions, scene trace screenshot recognition, and customized user vibe profile dashboards.',
    icon: Sparkles,
  },
  {
    year: 'Jun - July 2026',
    title: 'Real-Time Collaboration: Voxtro',
    desc: 'Architected and built Voxtro, a high-fidelity real-time collaboration platform featuring secure E2EE chat channels, WebRTC voice/video rooms, and cross-platform Capacitor mobile integration.',
    icon: MessageSquare,
  },
];

function Node({ ms, index }) {
  const { icon: Icon, year, title, desc } = ms;
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE.expo, delay: (index % 3) * 0.06 }}
      className="relative flex gap-6 pl-2"
    >
      <div className="relative z-10 flex-shrink-0">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80 shadow-glass backdrop-blur-md"
          style={{ boxShadow: '0 10px 30px rgba(138,124,255,0.18)' }}
        >
          <Icon className="h-5 w-5 text-aurora-indigo" />
        </span>
      </div>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="glass-card glass-card-hover mb-10 flex-1 rounded-3xl p-6"
      >
        <span
          className="inline-block rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white"
          style={{ background: 'var(--rift-gradient)' }}
        >
          {year}
        </span>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-mute">{desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Journey() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 80%'],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <SectionShell
      id="journey"
      eyebrow="Milestones"
      title="The chronological"
      accent="track"
      align="center"
      className="border-t border-ink/5"
    >
      <div ref={trackRef} className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-[23px] top-2 w-[2px] rounded-full bg-ink/8" />
        <motion.div
          className="absolute left-[23px] top-2 w-[2px] origin-top rounded-full"
          style={{ background: 'var(--rift-gradient)', height: '100%', scaleY: drawn }}
        />

        <div className="flex flex-col">
          {MILESTONES.map((ms, i) => (
            <Node key={ms.title} ms={ms} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
