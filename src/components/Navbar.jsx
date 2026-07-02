import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: '#home', id: 'home' },
    { label: 'About', target: '#about', id: 'about' },
    { label: 'Skills', target: '#skills', id: 'skills' },
    { label: 'Projects', target: '#projects', id: 'projects' },
    { label: 'Journey', target: '#journey', id: 'journey' },
    { label: 'Contact', target: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background morph
      setScrolled(window.scrollY > 30);

      // Active section tracking
      const scrollPos = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.querySelector(link.target);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-6 transition-all duration-300">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`flex items-center justify-between w-full max-w-5xl px-6 py-3.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass-card backdrop-blur-2xl shadow-[0_12px_40px_rgba(9,9,11,0.08)] border-zinc-900/10 scale-95 md:scale-100 py-2.5'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo Name */}
          <a href="#home" className="flex items-center space-x-3 font-bold tracking-widest text-zinc-900 group">
            <svg 
              className="w-8 h-8 text-zinc-900 filter drop-shadow-[0_0_8px_rgba(9,9,11,0.15)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
              viewBox="0 0 100 100" 
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
            >
              {/* Outer Hexagon */}
              <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" strokeLinecap="round" strokeLinejoin="round" />
              {/* Inner Stylized 'A' & 'V' line paths */}
              <path d="M35,65 L50,30 L65,65" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40,50 L60,50" stroke="#737373" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex items-center space-x-1">
              <span className="text-lg uppercase font-black">ANURAG</span>
              <span className="text-lg text-zinc-900/60 group-hover:text-zinc-900 transition-colors duration-300 uppercase font-black">.VERMA</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.target}
                className="relative px-4 py-1.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full text-zinc-600 hover:text-zinc-900"
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-black/[0.06] border border-zinc-900/5 rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </nav>

          {/* Call to action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="flex items-center space-x-1 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-900 border border-zinc-900/15 bg-black/5 hover:bg-black/10 hover:border-zinc-900/30 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(9,9,11,0.04)] group"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex p-2 text-zinc-600 hover:text-zinc-900 rounded-full bg-black/5 md:hidden border border-zinc-900/5 hover:bg-black/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[88px] mx-4 z-40 p-6 glass-card rounded-3xl border-zinc-900/10 md:hidden flex flex-col space-y-4 shadow-[0_20px_50px_rgba(9,9,11,0.08)]"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.target}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                    activeSection === link.id
                      ? 'bg-black/10 text-zinc-900 border-l-2 border-zinc-900'
                      : 'text-zinc-600 hover:bg-black/5 hover:text-zinc-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center space-x-2 py-3 w-full bg-zinc-900 text-white text-sm font-extrabold tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(9,9,11,0.06)] hover:bg-zinc-800"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
