import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import GlowBackground from './components/GlowBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WebStrand from './components/WebStrand';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Dynamic Animated Glass Background */}
      <GlowBackground />

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
            
            {/* Connecting Spidey Web Strand */}
            <WebStrand />

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
    </>
  );
}
