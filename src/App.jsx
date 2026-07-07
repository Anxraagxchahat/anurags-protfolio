import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { EASE } from './lib/motion';
import AuroraBackground from './components/ui/AuroraBackground';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import BuyMeCoffee from './components/BuyMeCoffee';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Premium smooth scroll kicks in once the intro is done.
  useSmoothScroll({ enabled: !loading });

  return (
    <div className="grain-overlay">
      {/* Persistent bright aurora backdrop */}
      <AuroraBackground />

      {/* Cinematic entry */}
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE.expo }}
          className="relative min-h-screen text-ink"
        >
          <CustomCursor />
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="relative z-10 flex w-full flex-col">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
            <BuyMeCoffee />
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}
