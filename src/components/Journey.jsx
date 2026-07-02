import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Cpu, Globe, Rocket, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';

export default function Journey() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { x: -30, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 22, stiffness: 85 }
    }
  };

  const milestones = [
    {
      year: "Oct 2025",
      title: "The Initial Spark",
      desc: "Wrote the first lines of HTML, CSS, and JavaScript. Understood core programming paradigms and realized the absolute leverage of automated code frameworks.",
      icon: <Calendar className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "FEB 2026",
      title: "Exploring AI/ML & Digitalizing Retail",
      desc: "Built Ms Verma Kirana Store using Lovable to digitalize a local business storefront. Also delved into machine learning patterns, experiments with embeddings search, and custom python model runners.",
      icon: <Cpu className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "MAR 2026",
      title: "Web Engineering Masterclass",
      desc: "Mastered full stack environments using FastAPI and React. Built robust, stateful user dashboards, API integrations, and database schemas.",
      icon: <Globe className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "APR - JUN 2026",
      title: "Building & Launching OpportunityX",
      desc: "Designed and launched OpportunityX—a platform serving students looking for career opportunities. Configured and deployed microservices in record speed.",
      icon: <Rocket className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "JUN 2026",
      title: "Cinematic Portfolio Canvas",
      desc: "Designed and engineered this premium, highly interactive portfolio featuring custom 3D card tilts, dynamic particle systems, and sleek glassmorphism to showcase all creative works.",
      icon: <Globe className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "JUN 2026",
      title: "AI Anime Discovery: Zenkai",
      desc: "Designed and engineered Zenkai, an AI-driven anime discovery ecosystem integrating Gemini AI for natural-language search suggestions, scene trace screenshot recognition, and customized user vibe profile dashboards.",
      icon: <Sparkles className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    },
    {
      year: "JUN-JULY 2026",
      title: "Real-Time Collaboration: Voxtro",
      desc: "Architected and built Voxtro, a high-fidelity real-time collaboration platform featuring secure E2EE chat channels, WebRTC voice/video rooms, and cross-platform Capacitor mobile integration.",
      icon: <MessageSquare className="w-5 h-5 text-zinc-900" />,
      accentClass: "from-zinc-900 to-zinc-700"
    }
  ];

  return (
    <section id="journey" className="relative py-24 px-4 overflow-hidden border-t border-zinc-900/5 bg-transparent">
      {/* Background Soft Glow blobs */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] rounded-full bg-black/5 glow-blob" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full bg-black/5 glow-blob" />

      <div className="w-full max-w-4xl mx-auto z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-zinc-900 uppercase mb-3 breathe-glow px-3 py-1 rounded-full border border-zinc-900/15 bg-black/5">MILESTONES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-text-animated uppercase font-sans">
            THE CHRONOLOGICAL TRACK
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-zinc-900 via-zinc-400 to-zinc-900 mt-5 rounded-full shadow-[0_0_10px_rgba(9,9,11,0.06)]" />
        </div>

        {/* Timeline Path container */}
        <div className="relative pl-6 md:pl-10 text-left">

          {/* Vertical Glowing Line */}
          <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-zinc-900 via-zinc-400 to-zinc-200 shadow-[0_0_10px_rgba(9,9,11,0.06)] opacity-60" />

          {/* Timeline Nodes */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col space-y-12"
          >
            {milestones.map((ms, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group"
              >

                {/* Node Icon Circle */}
                <div className="absolute -left-[35px] md:-left-[39px] top-1 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-zinc-900/30 group-hover:border-zinc-900 shadow-[0_0_10px_rgba(9,9,11,0.06)] transition-colors duration-300">
                  <div className="p-1 rounded-full bg-black/[0.03]">
                    {ms.icon}
                  </div>
                </div>

                {/* Date Indicator Tag */}
                <div className="w-24 flex-shrink-0 pt-1.5 md:pt-1 text-left">
                  <span className={`text-[10px] md:text-xs font-black tracking-widest px-2.5 py-1 rounded-full border bg-zinc-900 text-white border-zinc-900/10 uppercase`}>
                    {ms.year}
                  </span>
                </div>

                {/* Milestone Detail Card */}
                <JourneyCard ms={ms} />

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

function JourneyCard({ ms }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const tiltSpringConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), tiltSpringConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800
      }}
      className="flex-1 glass-card rounded-2xl p-6 border-zinc-900/5 group-hover:border-zinc-900/15 transition-all duration-300 shadow-md cursor-pointer select-none"
    >
      <h4 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-900 transition-colors mb-2" style={{ transform: "translateZ(20px)" }}>
        {ms.title}
      </h4>
      <p className="text-xs md:text-sm text-zinc-700 font-medium leading-relaxed" style={{ transform: "translateZ(10px)" }}>
        {ms.desc}
      </p>
    </motion.div>
  );
}
