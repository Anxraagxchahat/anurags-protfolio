import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CapabilityProvider, useCapabilities } from './lib/useReducedMotion';
import { LenisProvider } from './lib/useLenis';
import { PortalProvider } from './ui/PortalTransition';
import { setScroll } from './three/sceneController';

import World from './three/World';
import Grain from './ui/Grain';
import ScrollProgress from './ui/ScrollProgress';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';

// Sections not yet rebuilt (P6) — still the current components, rendered over
// the new World layer.
import Contact from './components/Contact';
import Footer from './components/Footer';

// Inner shell: reads capabilities, wires Lenis (single scroll source → the World
// reads scroll from sceneController, so World.driveScroll is off here).
function AppShell() {
  const { reducedMotion, saveData } = useCapabilities();
  const [loading, setLoading] = useState(true);

  // Lenis is the single source of scroll truth; push progress into the scene.
  const handleLenisScroll = useCallback((lenis) => {
    setScroll(lenis?.progress ?? 0);
  }, []);

  return (
    <LenisProvider reducedMotion={reducedMotion} saveData={saveData} onScroll={handleLenisScroll}>
      <PortalProvider>
        {/* WORLD LAYER — single persistent canvas, fixed behind everything */}
        <World driveScroll={false} />

        {/* Global film grain overlay */}
        <Grain />

        {/* Cinematic entry loader (preloader redesign is a later phase) */}
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative text-paper selection:bg-spider-blue/30 selection:text-white"
          >
            <CustomCursor />
            <ScrollProgress />
            <Nav />

            <main className="relative z-10 flex w-full flex-col">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Journey />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </PortalProvider>
    </LenisProvider>
  );
}

export default function App() {
  return (
    <CapabilityProvider>
      <AppShell />
    </CapabilityProvider>
  );
}
