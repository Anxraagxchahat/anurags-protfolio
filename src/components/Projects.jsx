import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import SectionShell from './ui/SectionShell';
import MagneticButton from './ui/MagneticButton';
import { VIEWPORT, staggerContainer, fadeUp, EASE } from '../lib/motion';

const PROJECTS = [
  {
    title: 'OpportunityX',
    tagline: 'Student Career Boosters',
    logo: '/opportunityx-logo.jpg',
    emoji: '\u{1F680}',
    accent: '#8A7CFF',
    description:
      'A student-first search engine and dashboard engineered to bridge the accessibility gap. It aggregates global career accelerators, enabling high-potential students to easily discover and apply for hackathons, internships, scholarships, and open-source tracks.',
    features: ['Hackathons & Jobs', 'Internships & Roles', 'Scholarships & Grants', 'Open Source Tracks'],
    techStack: ['React', 'FastAPI', 'Firebase', 'Vercel', 'Render'],
    link: 'https://opportunityx.co.in',
    buttonText: 'Launch Dashboard',
    mockupUrl: 'opportunityx.co.in',
  },
  {
    title: 'Zenkai',
    tagline: 'AI-Driven Anime Discovery',
    logo: '/zenkai-logo.png',
    emoji: '\u{1F38C}',
    accent: '#4F86F7',
    description:
      'An intelligent anime discovery ecosystem designed to streamline how users search, analyze, and track their watchlist. Powered by Gemini AI for natural-language queries, scene trace screenshot recognition, and dynamically rendered vibe profiles.',
    features: ['AI Anime Assistant', 'Scene Trace Finder', 'Vibe Watch Profiles', 'AniList API Integration'],
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Firebase', 'Gemini AI', 'Framer Motion'],
    link: 'https://zenk-ai.vercel.app',
    buttonText: 'Launch Application',
    mockupUrl: 'zenk-ai.vercel.app',
  },
  {
    title: 'Voxtro',
    tagline: 'Real-Time Communication Console',
    logo: '/voxtro-logo.png',
    emoji: '\u{1F4AC}',
    accent: '#F58EC1',
    description:
      'A premium real-time collaboration suite engineered with secure E2EE chat messaging, high-fidelity WebRTC voice/video channels, and dynamic group workspace rooms. Re-architected for ultra-low latency, mobile readiness, and seamless synchronization.',
    features: ['E2EE Chat Messaging', 'WebRTC Video & Voice', 'Capacitor Mobile Build', 'Express & Socket.io Backend'],
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Socket.io', 'WebRTC', 'Firebase', 'Capacitor', 'Node.js'],
    link: '',
    buttonText: 'Still Building',
    mockupUrl: 'voxtro.app/console',
  },
  {
    title: 'Personal Portfolio',
    tagline: 'Cinematic 3D Portfolio',
    logo: null,
    emoji: '\u{1F578}️',
    accent: '#5FD0E6',
    description:
      'A premium, highly interactive developer portfolio featuring a real-time WebGL scene, custom 3D tilt mechanics, glassmorphism, dynamic particle physics, and ambient aurora lighting designed to stand out.',
    features: ['Interactive 3D Crystal', '3D Perspective Tilt', 'Glassmorphic Design', 'Cinematic Animations'],
    techStack: ['React', 'Vite', 'Three.js', 'R3F', 'Drei', 'GSAP', 'Framer Motion'],
    link: '',
    buttonText: 'You Are Already Here',
    mockupUrl: 'anuragxverma.vercel.app',
  },
  {
    title: 'MS Verma Kirana Store',
    tagline: 'Local Retail Digitalization',
    logo: null,
    emoji: '\u{1F3EA}',
    accent: '#FDB68A',
    description:
      'A modern, highly optimized digital storefront designed for a local neighborhood grocery store. Empowering traditional businesses with online catalog discovery, responsive product queries, and seamless direct-call functionality.',
    features: ['Interactive Storefront', 'One-Click Call Support', 'Modern Visual Catalog', 'Hyperlocal SEO Engine'],
    techStack: ['React', 'Vite', 'TailwindCSS', 'Lovable', 'Vercel'],
    link: 'https://msvermakiranastore.lovable.app',
    buttonText: 'Visit Digital Store',
    mockupUrl: 'msvermakiranastore.lovable.app',
  },
];

function PreviewFrame({ project }) {
  const { title, tagline, logo, emoji, accent, features } = project;
  return (
    <motion.div
      whileHover={{ scale: 1.015, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{ transformPerspective: 1000 }}
      className="glass-panel relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at 30% 20%, ${accent}55, transparent 60%)` }}
      />
      <div
        className="absolute -bottom-10 -right-8 h-48 w-48 rounded-full blur-3xl"
        style={{ background: `${accent}44` }}
      />

      <div className="relative flex items-center gap-2 border-b border-white/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="mx-auto truncate rounded-md bg-white/50 px-3 py-0.5 font-mono text-[10px] text-ink-mute">
          {project.mockupUrl}
        </span>
      </div>

      <div className="relative flex h-[calc(100%-42px)] flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-glass">
          {logo ? (
            <img src={logo} alt={title} width="64" height="64" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <span className="text-3xl">{emoji}</span>
          )}
        </div>
        <div>
          <h4 className="text-xl font-semibold tracking-tight text-ink">{title}</h4>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-mute">{tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/60 bg-white/60 px-2.5 py-1 text-[10px] font-medium text-ink-soft backdrop-blur-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const { title, tagline, description, techStack, link, buttonText, accent, emoji } = project;
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE.expo }}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={`flex flex-col items-start gap-5 ${flipped ? 'lg:order-2' : ''}`}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/60 text-lg shadow-soft"
            style={{ boxShadow: `0 8px 24px ${accent}33` }}
          >
            {emoji}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
            {tagline}
          </span>
        </motion.div>

        <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </motion.h3>

        <motion.p variants={fadeUp} className="max-w-lg text-[15px] leading-relaxed text-ink-mute">
          {description}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              className="rounded-full glass-card px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="pt-2">
          {link ? (
            <MagneticButton
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              {buttonText}
            </MagneticButton>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/50 px-6 py-3 text-sm font-semibold text-ink-mute">
              <Lock className="h-3.5 w-3.5" />
              {buttonText}
            </span>
          )}
        </motion.div>
      </motion.div>

      <div className={flipped ? 'lg:order-1' : ''}>
        <PreviewFrame project={project} />
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Featured Projects"
      title="Ventures &"
      accent="products"
      className="border-t border-ink/5"
      intro="Products built end-to-end, from intelligent backends to interfaces designed to feel effortless."
    >
      <div className="flex flex-col gap-24 md:gap-32">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
