import { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import BackgroundShader from './components/BackgroundShader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grain-overlay">
      {/* WebGL Animated Mesh-Gradient Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-darkBg" />}>
        <BackgroundShader />
      </Suspense>

      {/* Premium Cinematic Entry Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Sections */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative min-h-screen text-zinc-900 selection:bg-zinc-900/15 selection:text-zinc-900"
        >
          {/* Custom Web-slinging Mouse Cursor */}
          <CustomCursor />

          {/* Header/Navbar */}
          <Navbar />

          {/* Individual Sections */}
          <main className="w-full relative z-10 flex flex-col">
            
            {/* Hero Section */}
            <Hero />

            {/* About Narrative Section */}
            <About />

            {/* Float Skill Cloud Cards */}
            <Skills />

            {/* Spotlight Ventures & Products */}
            <Projects />

            {/* Glowing vertical Milestones Journey */}
            <Journey />

            {/* Quick transmission Contact panel */}
            <Contact />

          </main>

          {/* Elegant Footer Signature */}
          <Footer />

        </motion.div>
      )}
    </div>
  );
}
