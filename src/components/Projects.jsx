import { motion } from 'framer-motion';
import { ExternalLink, Layers, Search, Sparkles, Terminal, Calendar, Award, Code } from 'lucide-react';

export default function Projects() {
  const techStack = ["React", "FastAPI", "Firebase", "Vercel", "Render"];

  const mockupOpportunities = [
    {
      title: "Google AI/ML Intern",
      type: "Internship",
      typeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      company: "Google",
      details: "Remote • Apply Now",
      icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      title: "Global Hackathon 2026",
      type: "Hackathon",
      typeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      company: "OpportunityX",
      details: "$25,000 Prizes",
      icon: <Award className="w-3.5 h-3.5 text-amber-400" />
    },
    {
      title: "Open Source Contributor",
      type: "Open Source",
      typeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      company: "Python Core",
      details: "GitHub Org",
      icon: <Code className="w-3.5 h-3.5 text-rose-400" />
    }
  ];

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-transparent">
      {/* Background ambient lighting */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-accentBlue/5 glow-blob" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accentPurple/5 glow-blob" />

      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-accentBlue uppercase mb-2">FEATURED STARTUP</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            VENTURES & PRODUCTS
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentBlue to-accentPurple mt-4 rounded-full" />
        </div>

        {/* Premium Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl glass-card border-white/10 p-6 md:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 hover:border-accentBlue/25 transition-colors duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group overflow-hidden"
        >
          {/* Subtle slow drift glowing accent in the card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-accentBlue/10 to-accentPurple/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          {/* Left: Product Info & Core Value proposition */}
          <div className="lg:col-span-6 flex flex-col text-left justify-center space-y-6">
            
            {/* Title & Badge */}
            <div className="flex items-center space-x-3">
              <span className="p-3 rounded-2xl bg-accentBlue/15 border border-accentBlue/25 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-lg">🚀</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-sans flex items-center space-x-2">
                  <span>OPPORTUNITYX</span>
                </h3>
                <span className="text-[10px] font-bold tracking-widest text-accentBlue-light uppercase">STUDENT CAREER BOOSTERS</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              OpportunityX is a student-first search engine and dashboard engineered to bridge the accessibility gap. It aggregates global career accelerators, enabling high-potential students to easily discover and apply for:
            </p>

            {/* Structured Feature Tags */}
            <div className="grid grid-cols-2 gap-3 pb-2 text-xs text-gray-300 font-medium">
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accentBlue" />
                <span>Hackathons & Jobs</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accentPurple" />
                <span>Internships & Roles</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Scholarships & Grants</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Open Source Tracks</span>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">TECHNOLOGY STACK</span>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-white/[0.03] border border-white/5 group-hover:border-accentBlue/20 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center">
              <a 
                href="https://opportunityx-8njs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accentBlue to-accentPurple hover:brightness-110 text-white font-bold text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
              >
                <span>Launch Dashboard</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right: Premium Interactive CSS Dashboard Mockup */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Ambient backlight ring */}
            <div className="absolute inset-0 bg-accentBlue/5 rounded-3xl blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Scaled-down Browser Frame */}
            <motion.div 
              animate={{
                y: [0, -6, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-card border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-3 flex flex-col space-y-3 bg-darkBg"
            >
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                {/* MacOS buttons */}
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                {/* Mock Search bar */}
                <div className="flex items-center space-x-1 px-4 py-1 rounded-lg bg-white/[0.02] border border-white/5 w-60 text-[10px] text-gray-500">
                  <Search className="w-3 h-3" />
                  <span className="truncate">opportunityx.app/dashboard</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Mock Dashboard Body */}
              <div className="flex-1 flex flex-col space-y-3 overflow-hidden text-left py-1">
                {/* Headline Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-accentBlue/10 to-accentPurple/5 border border-white/5 space-y-1">
                  <div className="text-[10px] text-accentBlue-light font-bold uppercase tracking-widest">OPPORTUNITY SEARCH</div>
                  <div className="text-xs font-bold text-white">Find your next career accelerator.</div>
                </div>

                {/* Simulated list of opportunities */}
                <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
                  {mockupOpportunities.map((op, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                          {op.icon}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-200">{op.title}</div>
                          <div className="text-[9px] text-gray-500">{op.company} • {op.details}</div>
                        </div>
                      </div>
                      <span className={`text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full border uppercase ${op.typeColor}`}>
                        {op.type}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
