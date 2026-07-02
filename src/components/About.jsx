import { motion } from 'framer-motion';
import { Calendar, Brain, Code, Rocket, Award, MessageSquare, Sparkles } from 'lucide-react';

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
    initial: { y: 35, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 22, stiffness: 70, mass: 0.8 }
    }
  };

  const points = [
    {
      title: "Started Coding",
      date: "Oct 2025",
      desc: "Wrote the first line of code in october 2025. Transitioned rapidly from theory to building shipping-grade applications.",
      icon: <Calendar className="w-5 h-5 text-zinc-900" />
    },
    {
      title: "Exploring AI/ML & Web",
      date: "Feb 2026",
      desc: "Delved into machine learning frameworks, data ingestion APIs, and deep integrations of web systems.",
      icon: <Brain className="w-5 h-5 text-zinc-900" />
    },
    {
      title: "Building Real-World Apps",
      date: "Mar 2026",
      desc: "Focused on solving actual problems. Shifted away from simple todo apps to full-scale cloud platforms.",
      icon: <Code className="w-5 h-5 text-zinc-900" />
    },
    {
      title: "Founder of OpportunityX",
      date: "Apr 2026",
      desc: "Recognized the friction students face finding high-quality career boosters. Built OpportunityX to centralize discovery.",
      icon: <Rocket className="w-5 h-5 text-zinc-900" />
    },
    {
      title: "Engineering Zenkai",
      date: "Jun 2026",
      desc: "Designed and built Zenkai, an intelligent anime search platform using Gemini AI suggestions and scene screenshot trace matching.",
      icon: <Sparkles className="w-5 h-5 text-zinc-900" />
    },
    {
      title: "Architecting Voxtro",
      date: "Jun 2026",
      desc: "Designed and built Voxtro, a secure real-time collaboration workspace with E2EE channels and WebRTC video rooms.",
      icon: <MessageSquare className="w-5 h-5 text-zinc-900" />
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden border-t border-zinc-900/5 bg-transparent">
      {/* Background Soft Blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-black/5 glow-blob" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-black/5 glow-blob" />

      <div className="w-full max-w-5xl mx-auto z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-zinc-900 uppercase mb-3 breathe-glow px-3 py-1 rounded-full border border-zinc-900/15 bg-black/5">MY STORY</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-text-animated uppercase font-sans">
            FROM ZERO TO FOUNDER
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-zinc-900 via-zinc-400 to-zinc-900 mt-5 rounded-full shadow-[0_0_10px_rgba(9,9,11,0.06)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Biography Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 24, stiffness: 60, mass: 0.9 }}
            className="lg:col-span-5 flex flex-col space-y-6 text-left"
          >
            <div className="glass-card rounded-3xl p-8 border-zinc-900/5 space-y-6 relative overflow-hidden shadow-[0_20px_50px_rgba(9,9,11,0.06)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-zinc-900" />
                <span className="text-sm font-bold tracking-wider text-zinc-900 uppercase">ANURAG VERMA</span>
              </div>

              <h3 className="text-xl font-extrabold text-zinc-900">
                A non-traditional path built on high-velocity learning.
              </h3>

              <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                When I committed to learning code in october 2025, I bypassed traditional sandbox tutorials in favor of building real products. I believe that students deserve better access to global career boosters, which drove me to design and develop OpportunityX.
              </p>

              <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                My workflow integrates cutting-edge frontend libraries with fast API microservices. I spend my time engineering responsive layouts, training custom models, and designing sleek user experiences that scale.
              </p>

              <div className="pt-4 flex items-center space-x-4 border-t border-zinc-900/5 text-xs text-zinc-500">
                <div>
                  <span className="block font-bold text-zinc-900 text-sm">2025</span>
                  <span>Coding Start</span>
                </div>
                <div className="w-[1px] h-8 bg-black/10" />
                <div>
                  <span className="block font-bold text-zinc-900 text-sm">AI/ML</span>
                  <span>Core Focus</span>
                </div>
                <div className="w-[1px] h-8 bg-black/10" />
                <div>
                  <span className="block font-bold text-zinc-900 text-sm">FastAPI + React</span>
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
                className="flex items-start space-x-4 p-6 rounded-2xl glass-card border-zinc-900/5 hover:border-zinc-900/15 transition-all duration-300 group shadow-md"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-black/[0.03] border border-zinc-900/5 group-hover:bg-black/10 group-hover:border-zinc-900/15 transition-colors">
                  {point.icon}
                </div>
                <div className="text-left space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-2">
                    <h4 className="text-base font-bold text-zinc-900 group-hover:text-zinc-900 transition-colors">
                      {point.title}
                    </h4>
                    <span className="text-xs font-semibold text-zinc-900/80 px-2.5 py-0.5 rounded-full bg-black/10 border border-zinc-900/15 uppercase tracking-widest shrink-0">
                      {point.date}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-700 font-medium leading-relaxed pt-1">
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
