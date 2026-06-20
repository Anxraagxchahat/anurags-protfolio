// ============================================================
// Projects — "Dimension 04 — The Work" ★ recruiter priority (doc 03 §5).
// Approved hybrid: Desktop = Option A (pinned dimensional stack), Mobile /
// reduced-motion / lowPower = Option C (stacked cards, no scroll-jacking).
// OpportunityX is the flagship — larger title + bigger preview + FLAGSHIP badge.
// Lightweight comic-panel device frames (not hand-coded dashboards). Per-project
// accent drives UI + World; portal flare on each dimension change.
// All 5 projects' facts/links/labels preserved from data/projects.js (locked).
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Lock } from 'lucide-react';
import { projects } from '../data/projects';
import { useCapabilities } from '../lib/useReducedMotion';
import { EASE, fadeUpBlur, instant, VIEWPORT } from '../lib/motion';
import { setAccent, flarePortal } from '../three/sceneController';
import SectionShell from '../ui/SectionShell';
import Pill from '../ui/Pill';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const COUNT = projects.length;

// ── Shared building blocks ───────────────────────────────────

function TechPills({ tech }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-paper-dim"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function FeaturePills({ features, accent }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {features.map((f) => (
        <div key={f} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-2 text-xs text-paper">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          {f}
        </div>
      ))}
    </div>
  );
}

function ProjectCTA({ project }) {
  if (project.link) {
    return (
      <MagneticButton kind="primary" href={project.link} external icon={<ExternalLink className="h-4 w-4" />}>
        {project.buttonText}
      </MagneticButton>
    );
  }
  return (
    <span className="inline-flex cursor-default select-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-paper-dim">
      <Lock className="h-4 w-4" />
      {project.buttonText}
    </span>
  );
}

// Lightweight comic-panel device preview (logo/emoji + tagline + feature chips).
function ProjectPreview({ project, flagship }) {
  return (
    <div
      className={`comic-panel relative flex w-full flex-col overflow-hidden rounded-panel bg-ink-700 ${
        flagship ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[4/3]'
      }`}
      style={{ '--accent': project.accent, boxShadow: `7px 7px 0 0 ${project.accent}` }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink-800/70 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="ml-2 truncate font-mono text-[9px] text-paper-dim">
          {project.link ? project.link.replace(/^https?:\/\//, '') : `${project.id}.dimension`}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(circle at 50% 35%, ${project.accent}, transparent 60%)` }}
        />
        <div
          className="halftone absolute inset-0 opacity-[0.07]"
          style={{ '--halftone-size': '7px', '--halftone-color': project.accent }}
        />

        {project.logo ? (
          <img
            src={project.logo}
            alt={project.title}
            loading="lazy"
            className="relative h-14 w-14 rounded-2xl border border-white/10 object-cover shadow-lg"
          />
        ) : (
          <span className="relative text-4xl" aria-hidden="true">{project.emoji}</span>
        )}

        <span className="relative font-display text-h3 uppercase leading-none text-paper">{project.title}</span>
        <span className="relative font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accent }}>
          {project.tagline}
        </span>

        <div className="relative mt-1 flex flex-wrap justify-center gap-1.5">
          {project.features.slice(0, 3).map((f) => (
            <span key={f} className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[9px] text-paper-dim">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// The full project content (shared by pinned panels and stacked cards).
function ProjectContent({ project, number, flagship }) {
  return (
    <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12" style={{ '--accent': project.accent }}>
      {/* Giant parallax number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(7rem,22vw,18rem)] leading-none text-white/[0.04]"
      >
        {number}
      </span>

      {/* Info */}
      <div className="relative z-10 flex flex-col gap-5 text-left lg:col-span-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold" style={{ color: project.accent }}>{number}</span>
          {flagship && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-ink"
              style={{ backgroundColor: project.accent }}
            >
              ★ Flagship
            </span>
          )}
        </div>

        <h3
          className={`font-display uppercase leading-[0.9] text-paper ${
            flagship ? 'text-[clamp(2.75rem,6vw,5rem)]' : 'text-h2'
          }`}
        >
          {project.title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accent }}>
          {project.tagline}
        </p>

        <p className="max-w-xl text-body-lg font-light leading-relaxed text-paper-dim">{project.description}</p>

        <FeaturePills features={project.features} accent={project.accent} />

        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">Technology Stack</span>
          <TechPills tech={project.tech} />
        </div>

        <div className="pt-2">
          <ProjectCTA project={project} />
        </div>
      </div>

      {/* Preview */}
      <div className="relative z-10 lg:col-span-6">
        <ProjectPreview project={project} flagship={flagship} />
      </div>
    </div>
  );
}

// ── Desktop: pinned dimensional stack (Option A) ─────────────

function PinnedProjects() {
  const outerRef = useRef(null);
  const [active, setActive] = useState(0);
  const renderPrev = useRef(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const idx = Math.min(COUNT - 1, Math.max(0, Math.floor(self.progress * COUNT)));
        setActive((a) => (a === idx ? a : idx));
      },
    });
    return () => st.kill();
  }, []);

  // Per-dimension accent → World + flare on change
  useEffect(() => {
    setAccent(projects[active].accent);
    flarePortal(0.7);
  }, [active]);

  const dir = active >= renderPrev.current ? 1 : -1;
  useEffect(() => {
    renderPrev.current = active;
  }, [active]);

  const variants = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 50 : -50, filter: 'blur(8px)', scale: 1.03 }),
    center: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.5, ease: EASE.expo } },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -40 : 40, filter: 'blur(8px)', scale: 0.97, transition: { duration: 0.35, ease: EASE.expo } }),
  };

  return (
    <section id="projects" ref={outerRef} className="relative" style={{ height: `${COUNT * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-t border-white/5 px-4">
        <div
          className="halftone absolute inset-0 opacity-[var(--halftone-opacity)]"
          style={{ '--halftone-color': 'color-mix(in srgb, var(--accent) 45%, transparent)' }}
        />

        {/* Header row */}
        <div className="relative z-10 mx-auto flex w-full max-w-content items-end justify-between pt-24">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
              <span className="text-paper-dim/70">DIMENSION 04</span> ▸ The Work
            </span>
            <h2 className="font-display text-h2 uppercase leading-none text-paper">Ventures &amp; Products</h2>
          </div>
          <div className="hidden items-center gap-3 font-mono text-sm md:flex">
            <span className="text-rift font-display text-h3">0{active + 1}</span>
            <span className="text-paper-dim">/ 0{COUNT}</span>
          </div>
        </div>

        {/* Pinned panel area */}
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-content">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={active} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
                <ProjectContent project={projects[active]} number={projects[active].number} flagship={active === 0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div className="relative z-10 mx-auto flex w-full max-w-content justify-center gap-2 pb-10">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                backgroundColor: i === active ? p.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Mobile / reduced-motion: stacked cards (Option C) ────────

function StackedProjects() {
  const { reducedMotion } = useCapabilities();
  return (
    <SectionShell id="projects" section="projects" dimension="04" eyebrow="The Work" title="VENTURES & PRODUCTS">
      <div className="flex flex-col gap-16">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={reducedMotion ? instant : fadeUpBlur}
            initial="initial"
            whileInView="animate"
            viewport={VIEWPORT}
            onViewportEnter={() => {
              setAccent(project.accent);
              if (!reducedMotion) flarePortal(0.5);
            }}
            className={`rounded-card border border-white/5 p-6 md:p-8 ${i === 0 ? 'bg-white/[0.02]' : ''}`}
            style={{ '--accent': project.accent }}
          >
            <ProjectContent project={project} number={project.number} flagship={i === 0} />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

export default function Projects() {
  const { reducedMotion, lowPower, tier } = useCapabilities();
  const pinned = tier === 'desktop' && !reducedMotion && !lowPower;
  return pinned ? <PinnedProjects /> : <StackedProjects />;
}
