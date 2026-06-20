// ============================================================
// Nav — floating pill navigation + full-screen mobile "dimensional" menu
// (doc 01 §2, doc 03 §9). Evolves the current design language:
//   - active pill via shared-layout layoutId (preserve)
//   - active section via ScrollTrigger (useScrollSpy) — not a manual listener
//   - link click = portal jump (playPortal) → Lenis scrollTo → focus heading
//   - active change also lerps the World accent + a subtle seam flare
//   - mobile: hamburger → full-screen overlay, staggered big links, one CTA
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortal } from '../ui/PortalTransition';
import { useLenisContext } from '../lib/useLenis';
import { useScrollSpy } from '../lib/useScrollSpy';
import { getSectionAccent } from '../lib/theme';
import { setSection, flarePortal } from '../three/sceneController';
import { EASE, STAGGER } from '../lib/motion';

const LINKS = [
  { label: 'Home', target: '#home', id: 'home' },
  { label: 'About', target: '#about', id: 'about' },
  { label: 'Skills', target: '#skills', id: 'skills' },
  { label: 'Projects', target: '#projects', id: 'projects' },
  { label: 'Journey', target: '#journey', id: 'journey' },
  { label: 'Contact', target: '#contact', id: 'contact' },
];
const IDS = LINKS.map((l) => l.id);

// Abstract geometric emblem (NOT Marvel IP) — re-used brand glyph.
function Glyph({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <polygon points="50,22 45,28 50,34 55,28" />
      <polygon points="50,36 43,44 43,58 50,72 57,58 57,44" />
      <path d="M 46,38 L 30,22 L 32,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 54,38 L 70,22 L 68,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 45,44 L 24,32 L 22,18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 55,44 L 76,32 L 78,18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 45,54 L 22,62 L 20,78" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 55,54 L 78,62 L 80,78" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 47,62 L 32,78 L 34,92" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 53,62 L 68,78 L 66,92" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Move keyboard focus to the destination heading after a portal jump (a11y).
function focusSection(id) {
  const el = document.getElementById(id);
  const heading = el?.querySelector('h1, h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { playPortal } = usePortal();
  const { scrollTo } = useLenisContext();

  // Active section → drive the pill, the World accent, and a subtle seam flare.
  const handleActive = useCallback((id) => {
    setSection(id);
    flarePortal(0.5);
  }, []);
  const active = useScrollSpy(IDS, handleActive);

  // Chrome morph only (active tracking is handled by ScrollTrigger above).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const jump = useCallback(
    (e, target, id) => {
      e?.preventDefault();
      setIsOpen(false);
      playPortal({
        accent: getSectionAccent(id),
        onCover: () => scrollTo(target, { offset: -80 }),
      });
      // After the crossing settles, move focus to the destination heading.
      window.setTimeout(() => focusSection(id), 520);
    },
    [playPortal, scrollTo],
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-6">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.expo, delay: 0.15 }}
          className={`flex w-full max-w-content items-center justify-between rounded-full px-6 transition-all duration-500 ${
            scrolled
              ? 'glass-card border-white/10 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl'
              : 'border border-transparent bg-transparent py-3.5'
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => jump(e, '#home', 'home')}
            className="group flex items-center gap-3 font-heading font-bold tracking-widest text-white"
          >
            <Glyph className="h-8 w-8 text-spider-red drop-shadow-[0_0_8px_rgba(226,54,54,0.6)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="flex items-center gap-1 text-lg font-black uppercase">
              ANURAG<span className="text-spider-blue transition-colors duration-300 group-hover:text-spider-red">.VERMA</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={link.target}
                onClick={(e) => jump(e, link.target, link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-paper-dim transition-colors duration-300 hover:text-white"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 z-[-1] rounded-full border border-white/5 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => jump(e, '#contact', 'contact')}
            className="group hidden items-center gap-1 rounded-full border border-spider-blue/30 bg-spider-blue/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:border-spider-blue/60 hover:bg-spider-blue/25 md:flex"
          >
            <span>Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="flex rounded-full border border-white/5 bg-white/5 p-2 text-paper-dim transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile full-screen dimensional menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.expo }}
            className="fixed inset-0 z-[45] flex flex-col bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div
              className="halftone absolute inset-0 opacity-[0.06]"
              style={{ '--halftone-size': '8px', '--halftone-color': 'rgba(255,255,255,0.5)' }}
            />
            <motion.nav
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.1 } } }}
              className="relative z-10 flex flex-1 flex-col items-start justify-center gap-2 px-8"
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.target}
                  onClick={(e) => jump(e, link.target, link.id)}
                  variants={{
                    initial: { opacity: 0, x: -40 },
                    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE.expo } },
                  }}
                  className={`font-display text-[clamp(2.5rem,12vw,4.5rem)] uppercase leading-[0.95] tracking-tight transition-colors ${
                    active === link.id ? 'text-rift' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="mr-3 align-middle font-mono text-xs text-paper-dim/60">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => jump(e, '#contact', 'contact')}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.expo } },
                }}
                className="mt-8 flex items-center gap-2 rounded-full bg-rift px-8 py-4 text-sm font-bold uppercase tracking-wider text-white"
              >
                <span>Open a Channel</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
