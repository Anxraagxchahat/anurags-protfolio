import { motion } from 'framer-motion';
import { Calendar, Cpu, Globe, Rocket, HelpCircle } from 'lucide-react';

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
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const milestones = [
    {
      year: "JAN 2026",
      title: "The Initial Spark",
      desc: "Wrote the first lines of HTML, CSS, and JavaScript. Understood core programming paradigms and realized the absolute leverage of automated code frameworks.",
      icon: <Calendar className="w-5 h-5 text-accentBlue" />,
      accentClass: "from-accentBlue to-accentBlue-light"
    },
    {
      year: "FEB 2026",
      title: "Exploring AI/ML Ingestion",
      desc: "Delved into machine learning patterns. Experimented with embeddings search, LLM integrations, and custom python model runners.",
      icon: <Cpu className="w-5 h-5 text-accentPurple" />,
      accentClass: "from-accentPurple to-accentPurple-light"
    },
    {
      year: "MAR 2026",
      title: "Web Engineering Masterclass",
      desc: "Mastered full stack environments using FastAPI and React. Built robust, stateful user dashboards, API integrations, and database schemas.",
      icon: <Globe className="w-5 h-5 text-amber-400" />,
      accentClass: "from-amber-400 to-amber-300"
    },
    {
      year: "APR - JUN 2026",
      title: "Building & Launching OpportunityX",
      desc: "Designed and launched OpportunityX—a platform serving students looking for career opportunities. Configured and deployed microservices in record speed.",
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      accentClass: "from-emerald-400 to-emerald-300"
    }
  ];

  return (
    <section id="journey" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-[#030712]">
      {/* Background Soft Glow blobs */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] rounded-full bg-accentPurple/5 glow-blob" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full bg-accentBlue/5 glow-blob" />

      <div className="w-full max-w-4xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-accentBlue uppercase mb-2">MILESTONES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            THE CHRONOLOGICAL TRACK
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentBlue to-accentPurple mt-4 rounded-full" />
        </div>

        {/* Timeline Path container */}
        <div className="relative pl-6 md:pl-10 text-left">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accentBlue via-accentPurple to-accentPurple-dark shadow-[0_0_10px_rgba(59,130,246,0.3)] opacity-60" />

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
                <div className="absolute -left-[35px] md:-left-[39px] top-1 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-darkBg border-2 border-accentPurple group-hover:border-accentBlue shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-colors duration-300">
                  <div className="p-1 rounded-full bg-white/[0.03]">
                    {ms.icon}
                  </div>
                </div>

                {/* Date Indicator Tag */}
                <div className="w-24 flex-shrink-0 pt-1.5 md:pt-1 text-left">
                  <span className={`text-[10px] md:text-xs font-black tracking-widest px-2.5 py-1 rounded-full border bg-clip-text text-transparent bg-gradient-to-r ${ms.accentClass} border-accentPurple/25 uppercase`}>
                    {ms.year}
                  </span>
                </div>

                {/* Milestone Detail Card */}
                <div className="flex-1 glass-card rounded-2xl p-6 border-white/5 group-hover:border-accentPurple/25 transition-all duration-300 shadow-md">
                  <h4 className="text-lg font-bold text-white group-hover:text-accentPurple-light transition-colors mb-2">
                    {ms.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                    {ms.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
