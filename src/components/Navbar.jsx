import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { EASE } from '../lib/motion';

const NAV_LINKS = [
  { label: 'Home', target: '#home', id: 'home' },
  { label: 'About', target: '#about', id: 'about' },
  { label: 'Skills', target: '#skills', id: 'skills' },
  { label: 'Projects', target: '#projects', id: 'projects' },
  { label: 'Journey', target: '#journey', id: 'journey' },
  { label: 'Contact', target: '#contact', id: 'contact' },
];

function BrandMark() {
  return (
    <a
      href="#home"
      className="group flex items-center gap-2.5 font-semibold tracking-wide text-ink"
      aria-label="Anurag Verma home"
    >
      <svg
        className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[8deg]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="url(#navGrad)"
        strokeWidth="5"
      >
        <defs>
          <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="60%" stopColor="#8A7CFF" />
            <stop offset="100%" stopColor="#5FD0E6" />
          </linearGradient>
        </defs>
        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35,65 L50,30 L65,65" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40,50 L60,50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[15px] font-bold uppercase tracking-[0.14em]">
        Anurag<span className="text-ink-mute">.Verma</span>
      </span>
    </a>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const pos = window.scrollY + 120;
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.target);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(link.id);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.expo, delay: 0.1 }}
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass-panel shadow-glass' : 'border border-transparent bg-transparent'
          }`}
        >
          <BrandMark />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.target}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: 'rgba(138,124,255,0.14)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex rounded-full border border-ink/10 bg-white/60 p-2 text-ink transition-colors hover:bg-white/80 cursor-pointer shadow-soft hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-aurora-peach fill-aurora-peach/20" /> : <Moon className="h-4 w-4 text-aurora-indigo fill-aurora-indigo/10" />}
            </button>

            <a
              href="#contact"
              className="group hidden items-center gap-1.5 rounded-full border border-ink/10 bg-white/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink transition-all duration-300 hover:border-aurora-violet/40 hover:bg-white/80 md:flex"
            >
              <span>Connect</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex rounded-full border border-ink/10 bg-white/60 p-2 text-ink-soft transition-colors hover:text-ink md:hidden cursor-pointer"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile full-screen glass menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE.expo }}
            className="fixed inset-0 z-30 flex flex-col justify-center gap-2 px-8 glass-panel md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.target}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE.expo }}
                className={`border-b border-ink/5 py-4 text-4xl font-semibold tracking-tight transition-colors ${
                  active === link.id ? 'aurora-text' : 'text-ink'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE.expo }}
              className="mt-8 flex items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-white"
              style={{ background: 'var(--rift-gradient)' }}
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
