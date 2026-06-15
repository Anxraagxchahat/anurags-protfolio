import { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Loader from './components/Loader';
import Background3D from './components/Background3D';
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
      {/* WebGL 3D Animated Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-darkBg" />}>
        <Background3D />
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
          className="relative min-h-screen text-gray-100 selection:bg-accentBlue/30 selection:text-white"
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

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
