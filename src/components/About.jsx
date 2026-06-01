import { motion } from 'framer-motion';
import { Calendar, Brain, Code, Rocket, Award } from 'lucide-react';

export default function About() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const points = [
    {
      title: "Started Coding",
      date: "Jan 2026",
      desc: "Wrote the first line of code in January 2026. Transitioned rapidly from theory to building shipping-grade applications.",
      icon: <Calendar className="w-5 h-5 text-accentBlue" />
    },
    {
      title: "Exploring AI/ML & Web",
      date: "Feb 2026",
      desc: "Delved into machine learning frameworks, data ingestion APIs, and deep integrations of web systems.",
      icon: <Brain className="w-5 h-5 text-accentPurple" />
    },
    {
      title: "Building Real-World Apps",
      date: "Mar 2026",
      desc: "Focused on solving actual problems. Shifted away from simple todo apps to full-scale cloud platforms.",
      icon: <Code className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Founder of OpportunityX",
      date: "Apr 2026",
      desc: "Recognized the friction students face finding high-quality career boosters. Built OpportunityX to centralize discovery.",
      icon: <Rocket className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#030712] to-[#040917]">
      {/* Background Soft Blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accentPurple/5 glow-blob" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accentBlue/5 glow-blob" />

      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-accentBlue uppercase mb-2">MY STORY</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            FROM ZERO TO FOUNDER
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentBlue to-accentPurple mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Biography Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6 text-left"
          >
            <div className="glass-card rounded-3xl p-8 border-white/5 space-y-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accentBlue/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-accentBlue" />
                <span className="text-sm font-bold tracking-wider text-white uppercase">ANURAG VERMA</span>
              </div>

              <h3 className="text-xl font-bold text-gray-200">
                A non-traditional path built on high-velocity learning.
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed">
                When I committed to learning code in January 2026, I bypassed traditional sandbox tutorials in favor of building real products. I believe that students deserve better access to global career boosters, which drove me to design and develop OpportunityX.
              </p>

              <p className="text-sm text-gray-400 font-light leading-relaxed">
                My workflow integrates cutting-edge frontend libraries with fast API microservices. I spend my time engineering responsive layouts, training custom models, and designing sleek user experiences that scale.
              </p>

              <div className="pt-4 flex items-center space-x-4 border-t border-white/5 text-xs text-gray-400">
                <div>
                  <span className="block font-bold text-white text-sm">2026</span>
                  <span>Coding Start</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div>
                  <span className="block font-bold text-white text-sm">AI/ML</span>
                  <span>Core Focus</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div>
                  <span className="block font-bold text-white text-sm">FastAPI + React</span>
                  <span>Preferred Stack</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Structured Narrative Timeline */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 gap-6"
          >
            {points.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 p-6 rounded-2xl glass-card border-white/5 hover:border-accentBlue/20 transition-all duration-300 group shadow-md"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-accentBlue/10 group-hover:border-accentBlue/20 transition-colors">
                  {point.icon}
                </div>
                <div className="text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white group-hover:text-accentBlue-light transition-colors">
                      {point.title}
                    </h4>
                    <span className="text-xs font-semibold text-accentBlue-light/80 px-2 py-0.5 rounded-full bg-accentBlue/10 border border-accentBlue/20 uppercase tracking-widest">
                      {point.date}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed pt-1">
                    {point.desc}
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
