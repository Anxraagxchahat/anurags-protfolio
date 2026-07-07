import { motion } from 'framer-motion';
import { Calendar, Brain, Code, Rocket, Sparkles, MessageSquare } from 'lucide-react';
import SectionShell from './ui/SectionShell';
import { VIEWPORT, staggerContainer, fadeUp, EASE } from '../lib/motion';

const FACTS = [
  { value: '2025', label: 'Coding Start' },
  { value: 'AI/ML', label: 'Core Focus' },
  { value: 'FastAPI + React', label: 'Preferred Stack' },
];

const CHAPTERS = [
  {
    icon: Calendar,
    date: 'Oct 2025',
    title: 'Started Coding',
    desc: 'Wrote the first line of code in october 2025. Transitioned rapidly from theory to building shipping-grade applications.',
  },
  {
    icon: Brain,
    date: 'Feb 2026',
    title: 'Exploring AI/ML & Web',
    desc: 'Delved into machine learning frameworks, data ingestion APIs, and deep integrations of web systems.',
  },
  {
    icon: Code,
    date: 'Mar 2026',
    title: 'Building Real-World Apps',
    desc: 'Focused on solving actual problems. Shifted away from simple todo apps to full-scale cloud platforms.',
  },
  {
    icon: Rocket,
    date: 'Apr 2026',
    title: 'Founder of OpportunityX',
    desc: 'Recognized the friction students face finding high-quality career boosters. Built OpportunityX to centralize discovery.',
  },
  {
    icon: Sparkles,
    date: 'Jun 2026',
    title: 'Engineering Zenkai',
    desc: 'Designed and built Zenkai, an intelligent anime search platform using Gemini AI suggestions and scene screenshot trace matching.',
  },
  {
    icon: MessageSquare,
    date: 'Jun 2026',
    title: 'Architecting Voxtro',
    desc: 'Designed and built Voxtro, a secure real-time collaboration workspace with E2EE channels and WebRTC video rooms.',
  },
];

export default function About() {
  return (
    <SectionShell
      id="about"
      eyebrow="My Story"
      title="From zero to"
      accent="founder"
      className="border-t border-ink/5"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* Narrative + facts */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE.expo }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="aurora-blob blob-violet absolute -right-16 -top-16 h-48 w-48" />

            <p className="relative font-serif-accent text-3xl leading-tight text-ink md:text-4xl">
              A non-traditional path built on high-velocity learning.
            </p>

            <div className="relative mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                When I committed to learning code in october 2025, I bypassed traditional sandbox
                tutorials in favor of building real products. I believe that students deserve better
                access to global career boosters, which drove me to design and develop OpportunityX.
              </p>
              <p>
                My workflow integrates cutting-edge frontend libraries with fast API microservices. I
                spend my time engineering responsive layouts, training custom models, and designing
                sleek user experiences that scale.
              </p>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-6 border-t border-ink/5 pt-6">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <span className="block text-lg font-semibold text-ink">{f.value}</span>
                  <span className="text-xs font-medium text-ink-mute">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chapter cards */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col gap-4 lg:col-span-7"
        >
          {CHAPTERS.map(({ icon: Icon, date, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="glass-card glass-card-hover group flex items-start gap-5 rounded-3xl p-6"
            >
              <div className="flex-shrink-0 rounded-2xl border border-ink/5 bg-white/60 p-3 transition-colors group-hover:border-aurora-violet/30">
                <Icon className="h-5 w-5 text-aurora-indigo" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-semibold text-ink">{title}</h3>
                  <span className="w-fit rounded-full border border-ink/8 bg-white/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                    {date}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink-mute">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
