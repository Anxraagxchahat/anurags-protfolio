import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { 
  Terminal, 
  Layers, 
  Database, 
  Cpu, 
  GitBranch, 
  Webhook, 
  ExternalLink, 
  Palette, 
  Globe, 
  Server,
  Zap,
  Smartphone
} from 'lucide-react';

export default function Skills() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    initial: { y: 25, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const skills = [
    {
      name: "Python",
      category: "Backend / ML",
      desc: "Core scripting, automation pipelines, and machine learning architectures.",
      icon: <Terminal className="w-5 h-5 text-accentBlue" />,
      glowColor: "rgba(59, 130, 246, 0.15)",
      floatDelay: 0
    },
    {
      name: "React",
      category: "Frontend Core",
      desc: "Declarative component styling, state orchestration, and high-fps rendering.",
      icon: <Layers className="w-5 h-5 text-sky-400" />,
      glowColor: "rgba(56, 189, 248, 0.15)",
      floatDelay: 1.5
    },
    {
      name: "Next.js & TS",
      category: "Full-Stack Web",
      desc: "Type-safe App Router architecture, Server Actions, stateful dashboards, and SEO optimization.",
      icon: <Zap className="w-5 h-5 text-amber-300" />,
      glowColor: "rgba(245, 158, 11, 0.15)",
      floatDelay: 2.2
    },
    {
      name: "Firebase",
      category: "Cloud Database",
      desc: "Realtime data synchronize, Firestore models, cloud storage, and secure authentication.",
      icon: <Database className="w-5 h-5 text-amber-400" />,
      glowColor: "rgba(251, 191, 36, 0.15)",
      floatDelay: 3
    },
    {
      name: "FastAPI",
      category: "Microservices",
      desc: "High-performance Python microservices, validation, auto documentation.",
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      glowColor: "rgba(52, 211, 153, 0.15)",
      floatDelay: 0.5
    },
    {
      name: "AI/ML & Gemini",
      category: "Intelligent Systems",
      desc: "Gemini API integrations, conversational prompt engineering, and semantic AI search agents.",
      icon: <Cpu className="w-5 h-5 text-accentPurple" />,
      glowColor: "rgba(168, 85, 247, 0.15)",
      floatDelay: 2
    },
    {
      name: "Real-Time WebRTC",
      category: "Real-Time Systems",
      desc: "Low-latency WebSockets (Socket.io), end-to-end encrypted (E2EE) chat rooms, and WebRTC video.",
      icon: <Webhook className="w-5 h-5 text-pink-500" />,
      glowColor: "rgba(236, 72, 153, 0.15)",
      floatDelay: 1.2
    },
    {
      name: "Hybrid Mobile",
      category: "Cross-Platform",
      desc: "Wrapping web apps into native Android applications using Capacitor and custom gradle tools.",
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      glowColor: "rgba(129, 140, 248, 0.15)",
      floatDelay: 2.8
    },
    {
      name: "GitHub",
      category: "Version Control",
      desc: "Distributed revisioning, branches management, workflows automation.",
      icon: <GitBranch className="w-5 h-5 text-slate-300" />,
      glowColor: "rgba(203, 213, 225, 0.15)",
      floatDelay: 3.5
    },
    {
      name: "APIs Integration",
      category: "Connectivity",
      desc: "Rest protocols, third-party hooks, secure OAuth integrations, rapid ingest pipelines.",
      icon: <ExternalLink className="w-5 h-5 text-teal-400" />,
      glowColor: "rgba(45, 212, 191, 0.15)",
      floatDelay: 1
    },
    {
      name: "Vercel & Render",
      category: "Hosting / DevOps",
      desc: "Continuous deployment for frontends, preview builds, Docker containers, and cron tasks.",
      icon: <Globe className="w-5 h-5 text-white" />,
      glowColor: "rgba(255, 255, 255, 0.1)",
      floatDelay: 2.5
    },
    {
      name: "UI/UX & Framer",
      category: "SaaS Design",
      desc: "Apple-level minimal layouts, high-fidelity responsive forms, Framer Motion, and aesthetic glassmorphism.",
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      glowColor: "rgba(244, 63, 94, 0.15)",
      floatDelay: 1.8
    }
  ];

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-transparent">
      {/* Background Soft Blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[400px] h-[400px] rounded-full bg-accentBlue/5 glow-blob" />
      <div className="absolute bottom-[10%] right-[-15%] w-[400px] h-[400px] rounded-full bg-accentPurple/5 glow-blob" />

      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accentPurple uppercase mb-2">TECHNICAL STACK</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            ENGINEERING CAPABILITIES
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mt-4 rounded-full" />
        </div>

        {/* Premium Skill Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} variants={itemVariants} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function SkillCard({ skill, variants }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const tiltSpringConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), tiltSpringConfig);

  const glowX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), tiltSpringConfig);
  const glowY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), tiltSpringConfig);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${skill.glowColor}, transparent 55%)`;

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
      variants={variants}
      className="w-full h-full"
    >
      <motion.div
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: skill.floatDelay
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 800,
          "--glow-color": skill.glowColor
        }}
        className="group relative rounded-2xl glass-card border-white/5 p-6 flex flex-col text-left space-y-4 hover:bg-white/[0.04] hover:border-white/15 hover:shadow-[0_12px_30px_var(--glow-color)] transition-all duration-300 shadow-md h-full cursor-pointer select-none"
      >
        {/* Dynamic mouse-following light accent behind the card */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: glowBg
          }}
        />

        <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.06] transition-colors">
            {skill.icon}
          </div>
          <span className="text-[10px] font-bold tracking-wider text-accentPurple-light bg-accentPurple/10 border border-accentPurple/25 px-2.5 py-1 rounded-full uppercase">
            {skill.category}
          </span>
        </div>

        <div className="space-y-1" style={{ transform: "translateZ(20px)" }}>
          <h4 className="text-lg font-bold text-white group-hover:text-accentBlue-light transition-colors">
            {skill.name}
          </h4>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            {skill.desc}
          </p>
        </div>

        {/* Decorative premium line */}
        <div className="h-[1px] w-0 bg-gradient-to-r from-accentBlue to-accentPurple group-hover:w-full transition-all duration-500 ease-out" />
      </motion.div>
    </motion.div>
  );
}
