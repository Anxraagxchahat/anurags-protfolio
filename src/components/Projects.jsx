import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  Search, 
  Sparkles, 
  Terminal, 
  Calendar, 
  Award, 
  Code,
  Home,
  Bookmark,
  Clock,
  Users,
  Sliders,
  MessageSquare,
  Video,
  Send,
  Bot,
  Phone,
  Moon,
  Smartphone
} from 'lucide-react';

function ProjectCard({ project }) {
  // 3D tilt states and spring configurations
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const tiltSpringConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), tiltSpringConfig);

  const glowX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), tiltSpringConfig);
  const glowY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), tiltSpringConfig);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(59, 130, 246, 0.12), transparent 60%)`;

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
    <div className="w-full" style={{ perspective: 1000 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1000
        }}
        className="relative w-full rounded-3xl glass-card border-white/10 p-6 md:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 hover:border-accentBlue/25 transition-colors duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group overflow-hidden cursor-pointer select-none"
      >
        {/* Dynamic mouse-following radial gradient glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: glowBg
          }}
        />
        {/* Subtle slow drift glowing accent in the card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-accentBlue/10 to-accentPurple/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        {/* Left: Product Info & Core Value proposition */}
        <div className="lg:col-span-6 flex flex-col text-left justify-center space-y-6" style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}>

          {/* Title & Badge */}
          <div className="flex items-center space-x-3" style={{ transform: "translateZ(20px)" }}>
            {project.logo ? (
              <div className="w-14 h-14 p-1 rounded-2xl bg-accentBlue/15 border border-accentBlue/25 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-center overflow-hidden">
                <img src={project.logo} alt={project.title} className="w-full h-full object-cover rounded-xl" />
              </div>
            ) : (
              <span className="p-3 rounded-2xl bg-accentBlue/15 border border-accentBlue/25 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-lg">{project.emoji}</span>
            )}
            <div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-sans flex items-center space-x-2">
                <span>{project.title}</span>
              </h3>
              {project.tagline && (
                <span className="text-[10px] font-bold tracking-widest text-accentBlue-light uppercase">{project.tagline}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed" style={{ transform: "translateZ(15px)" }}>
            {project.description}
          </p>

          {/* Structured Feature Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 text-xs text-gray-300 font-medium" style={{ transform: "translateZ(20px)" }}>
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className={`w-1.5 h-1.5 rounded-full ${feature.color}`} />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2" style={{ transform: "translateZ(20px)" }}>
            <span className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase">TECHNOLOGY STACK</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
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
          <div className="pt-4 flex items-center" style={{ transform: "translateZ(25px)" }}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accentBlue to-accentPurple hover:brightness-110 text-white font-bold text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
              >
                <span>{project.buttonText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accentBlue/20 to-accentPurple/20 border border-white/10 text-gray-400 font-bold text-sm rounded-full cursor-default select-none shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              >
                <span>{project.buttonText}</span>
              </div>
            )}
          </div>

        </div>

        {/* Right: Premium Interactive CSS Dashboard Mockup */}
        <div className="lg:col-span-6 flex items-center justify-center relative" style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}>
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
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-card border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col bg-darkBg"
            style={{ transform: "translateZ(20px)" }}
          >

            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-zinc-900/40 backdrop-blur-sm flex-shrink-0">
              {/* MacOS buttons */}
              <div className="flex space-x-1.5 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
              </div>
              {/* Mock Search bar */}
              <div className="flex items-center space-x-1 px-3 py-0.5 rounded bg-white/[0.02] border border-white/5 w-44 sm:w-56 text-[8px] text-gray-500 flex-shrink-0">
                <Search className="w-2.5 h-2.5 text-gray-600" />
                <span className="truncate text-gray-400">{project.mockupUrl}</span>
              </div>
              <div className="w-8 flex-shrink-0" />
            </div>

            {/* Mock Dashboard Body */}
            {project.title === "OPPORTUNITYX" && (
              <div className="flex-1 grid grid-cols-12 overflow-hidden bg-[#0A0D14] text-[6.5px] text-gray-300">
                {/* Left Sidebar (Col 1-3) */}
                <div className="col-span-3 border-r border-white/5 bg-[#0C101A] p-2 flex flex-col justify-between select-none text-left">
                  <div className="space-y-3">
                    <div className="space-y-0.8">
                      <div className="flex items-center space-x-1 px-1.5 py-0.8 rounded bg-accentBlue/10 text-accentBlue font-bold">
                        <Home className="w-2.5 h-2.5" />
                        <span>Home</span>
                      </div>
                      <div className="flex items-center space-x-1 px-1.5 py-0.8 text-gray-400 hover:text-white">
                        <Bookmark className="w-2.5 h-2.5" />
                        <span>Saved</span>
                      </div>
                      <div className="flex items-center space-x-1 px-1.5 py-0.8 text-gray-400 hover:text-white">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Deadlines</span>
                      </div>
                      <div className="flex items-center justify-between px-1.5 py-0.8 text-gray-400 hover:text-white">
                        <div className="flex items-center space-x-1">
                          <Users className="w-2.5 h-2.5" />
                          <span>Team Finder</span>
                        </div>
                        <span className="text-[5px] font-black tracking-widest px-1 py-0.2 rounded bg-accentBlue/25 text-accentBlue-light uppercase leading-none">PRO</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.8 border-t border-white/5 pt-1">
                    <div className="flex items-center space-x-1 px-1.5 py-0.5 text-gray-400">
                      <MessageSquare className="w-2.5 h-2.5" />
                      <span>Contact</span>
                    </div>
                    <div className="flex items-center space-x-1 px-1.5 py-0.5 text-gray-400">
                      <Award className="w-2.5 h-2.5" />
                      <span>Premium</span>
                    </div>
                    <div className="flex items-center space-x-1 px-1 py-0.5 text-gray-400">
                      <div className="w-3 h-3 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                        <img src="/portrait3.jpg" className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate">My Profile</span>
                    </div>
                  </div>
                </div>

                {/* Middle Opportunities Feed (Col 4-9) */}
                <div className="col-span-6 p-2 flex flex-col space-y-2 overflow-y-auto border-r border-white/5 text-left">
                  <div className="flex items-center space-x-1 px-1.5 py-0.8 rounded bg-[#101524] border border-white/5 text-gray-500 flex-shrink-0">
                    <Search className="w-2.5 h-2.5 text-gray-500" />
                    <span className="truncate text-[6px]">Search opportunities...</span>
                  </div>

                  <div className="flex-shrink-0 space-y-0.5">
                    <h4 className="text-[9px] font-extrabold text-white leading-tight">Anxraag Verma's Opportunities</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[5px] text-gray-500 font-medium">350 opportunities • Updating...</span>
                      <div className="flex space-x-0.8">
                        <span className="px-1 py-0.2 rounded bg-white/[0.03] border border-white/5 text-[5px] font-bold text-gray-400 flex items-center space-x-0.5">
                          <Sliders className="w-1.5 h-1.5" />
                          <span>Filters</span>
                        </span>
                        <span className="px-1 py-0.2 rounded bg-white/[0.03] border border-white/5 text-[5px] font-bold text-gray-400">Reset</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="p-1.5 rounded-lg bg-[#0F1322] border border-white/5 flex flex-col space-y-1 shadow">
                      <div className="flex justify-between items-start">
                        <span className="text-[5px] font-bold tracking-widest text-[#4B73FF] uppercase">INTERNSHALA</span>
                        <span className="text-[4.5px] font-semibold px-0.8 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">Internships</span>
                      </div>
                      <div>
                        <h5 className="text-[7.5px] font-extrabold text-white">Operations</h5>
                        <div className="flex items-center space-x-0.5 text-[5px] text-gray-400">
                          <span>MyPlacementBuddy LLP</span>
                          <span className="text-rose-400 font-bold">• Deadline: Few hours ago</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-0.5">
                        <span className="px-0.8 py-0.2 rounded bg-white/[0.02] border border-white/5 text-[4.5px] text-gray-400">Online</span>
                        <span className="px-0.8 py-0.2 rounded bg-white/[0.02] border border-white/5 text-[4.5px] text-gray-400">₹ 5,000 /mo</span>
                        <span className="px-0.8 py-0.2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[4.5px] font-bold">🔥 Trending</span>
                        <span className="px-0.8 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[4.5px] font-bold">Beginner</span>
                      </div>
                      <div className="flex space-x-1 pt-0.5">
                        <span className="flex-1 py-0.5 rounded border border-white/5 bg-white/[0.01] text-[5px] font-semibold text-gray-400 text-center">Save</span>
                        <span className="flex-1 py-0.5 rounded bg-accentBlue text-[5px] font-bold text-white text-center flex items-center justify-center space-x-0.5">
                          <span>Apply</span>
                          <ExternalLink className="w-1.5 h-1.5" />
                        </span>
                        <span className="px-0.8 py-0.5 rounded border border-white/5 bg-white/[0.01] text-[5px] font-semibold text-gray-400">AI</span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-[#0F1322] border border-white/5 flex flex-col space-y-0.5 shadow">
                      <div className="flex justify-between items-start">
                        <span className="text-[5px] font-bold tracking-widest text-[#42B883] uppercase">LFX MENTORSHIP</span>
                        <span className="text-[4.5px] font-semibold px-0.8 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Open Source</span>
                      </div>
                      <h5 className="text-[7px] font-extrabold text-white line-clamp-1 leading-normal">Performance Model of RISC-V Out-of-Order Processor</h5>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar (Col 10-12) */}
                <div className="col-span-3 bg-[#0C101A] p-2 flex flex-col space-y-1.5 select-none text-left">
                  <h5 className="text-[7.5px] font-extrabold text-white border-b border-white/5 pb-0.5">Filters</h5>
                  <div className="space-y-1">
                    {["Source", "Category", "Mode", "Sort By"].map((label, idx) => (
                      <div key={idx} className="space-y-0.2">
                        <label className="text-[4.5px] text-gray-500 font-semibold uppercase">{label}</label>
                        <div className="flex items-center justify-between px-1 py-0.5 rounded bg-[#101524] border border-white/5 text-gray-300 text-[5.5px]">
                          <span className="truncate">{label === "Sort By" ? "Recommended" : "All"}</span>
                          <span className="text-gray-500 text-[4px]">▼</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.title === "ZENKAI" && (
              <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden p-3 bg-zinc-950 text-left text-white relative">
                {/* Background glow mesh */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/10 via-sky-500/5 to-transparent pointer-events-none" />
                
                {/* Left side text (Col 1-7) */}
                <div className="col-span-7 flex flex-col justify-center space-y-2 relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-zinc-900 border border-white/10 text-[5px] font-bold text-sky-400 w-max">
                    <Sparkles className="w-1.5 h-1.5 text-sky-400" />
                    <span>Anime Discovery, Reinvented</span>
                  </div>

                  {/* Heading */}
                  <h4 className="text-[11px] font-black tracking-tight leading-tight uppercase">
                    Discover Anime <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">Smarter with AI</span>
                  </h4>

                  {/* Subtitle */}
                  <p className="text-[5.5px] text-zinc-400 leading-normal font-light">
                    Find your next favorite series using natural language requests, scene screenshot search, and personalized intelligence.
                  </p>

                  {/* Buttons */}
                  <div className="flex space-x-1.5 pt-0.5">
                    <span className="px-2 py-1 rounded bg-gradient-to-r from-purple-600 to-sky-500 font-bold text-white text-[5px] flex items-center space-x-0.5">
                      <span>Explore Anime</span>
                      <span>→</span>
                    </span>
                    <span className="px-2 py-1 rounded border border-white/10 bg-zinc-900 text-zinc-300 font-bold text-[5px] flex items-center space-x-0.5">
                      <MessageSquare className="w-1.5 h-1.5 text-sky-400 animate-pulse" />
                      <span>Try AI Assistant</span>
                    </span>
                  </div>
                </div>

                {/* Right side card stack (Col 8-12) */}
                <div className="col-span-5 flex items-center justify-center relative select-none">
                  {/* Back rotated card */}
                  <div className="absolute w-[60px] h-[80px] rounded-lg bg-zinc-900/50 border border-white/5 rotate-[-6deg] translate-x-[-4px] opacity-40" />
                  
                  {/* Main Recommendation Glass Card */}
                  <div className="relative w-[65px] h-[85px] rounded-lg bg-zinc-900/90 border border-white/10 flex flex-col justify-between p-1.5 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-sky-500/10" />
                    
                    {/* Header of card */}
                    <div className="relative flex items-center justify-between">
                      <span className="text-[4px] font-mono px-0.8 py-0.2 rounded bg-black/60 text-sky-400 border border-white/5">ZENKAI RECOMMEND</span>
                      <Sparkles className="w-1.5 h-1.5 text-purple-400 fill-purple-400 animate-pulse" />
                    </div>

                    {/* Loader */}
                    <div className="relative flex flex-col items-center py-0.5">
                      <div className="w-6 h-6 rounded-full border border-sky-400/30 border-t-sky-400 flex items-center justify-center animate-spin p-0.5">
                        <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-[4px] font-bold text-white">AI</div>
                      </div>
                      <span className="text-[3.5px] text-zinc-400 mt-0.5 leading-none">Matching vibe...</span>
                    </div>

                    {/* Title */}
                    <div className="relative space-y-0.5">
                      <div className="text-[5px] font-bold text-white truncate leading-none">Frieren: Beyond Journey&apos;s End</div>
                      <div className="flex gap-0.5">
                        <span className="text-[3.5px] px-0.8 py-0.2 rounded bg-white/5 text-zinc-400">Cozy</span>
                        <span className="text-[3.5px] px-0.8 py-0.2 rounded bg-white/5 text-zinc-400">Melancholic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.title === "VOXTRO" && (
              <div className="flex-1 grid grid-cols-12 overflow-hidden bg-[#0A0C14] text-[7px] text-gray-300">
                {/* Leftmost Sidebar (Col 1) */}
                <div className="col-span-1 border-r border-white/5 bg-[#07090E] py-2 flex flex-col items-center space-y-3 flex-shrink-0 select-none">
                  <div className="w-3.5 h-3.5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-[6px]">V</div>
                  <div className="w-4 h-4 rounded bg-white/[0.03] border border-white/10 flex items-center justify-center text-white">
                    <MessageSquare className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="w-4 h-4 rounded bg-transparent flex items-center justify-center text-gray-600">
                    <Video className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Rooms Sidebar (Col 2-4) */}
                <div className="col-span-3 border-r border-white/5 bg-[#090B10] p-1.5 flex flex-col space-y-2 select-none text-left">
                  <span className="text-[5px] text-gray-500 font-semibold uppercase tracking-wider px-1">Rooms</span>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1 px-1.5 py-0.8 rounded bg-indigo-500/10 text-indigo-400 font-bold">
                      <span>#</span>
                      <span>General Chat</span>
                    </div>
                    <div className="flex items-center space-x-1 px-1.5 py-0.8 text-gray-400">
                      <span>#</span>
                      <span>Design Lounge</span>
                    </div>
                  </div>
                </div>

                {/* Main Chat Area (Col 5-12) */}
                <div className="col-span-8 flex flex-col justify-between overflow-hidden bg-[#0A0D15]">
                  <div className="px-2.5 py-1 border-b border-white/5 bg-[#0C0F19] flex items-center justify-between flex-shrink-0 select-none text-left">
                    <div>
                      <h5 className="font-extrabold text-white text-[7.5px] leading-tight">General Chat</h5>
                      <span className="text-[5px] text-gray-500 leading-none block">Welcome to the main channel</span>
                    </div>
                    <div className="flex items-center space-x-0.8 text-[5.5px] text-emerald-400 font-bold">
                      <span className="w-0.8 h-0.8 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      <span>3 Active</span>
                    </div>
                  </div>

                  <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                    <div className="flex items-start space-x-1.5 text-left">
                      <div className="w-4 h-4 rounded bg-zinc-800 border border-white/10 flex items-center justify-center p-0.5">
                        <Bot className="w-3 h-3 text-sky-400" />
                      </div>
                      <div className="space-y-0.5 max-w-[85%]">
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-white text-[7px]">Alex</span>
                          <span className="text-gray-500 text-[5px]">10:42 AM</span>
                        </div>
                        <div className="p-1 rounded-lg rounded-tl-none bg-[#111422] border border-white/5 text-[6.5px] text-gray-300 leading-tight">
                          Welcome to Voxtro! The latency here is absolute zero. Try starting a call!
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-1.5 justify-end text-right">
                      <div className="space-y-0.5 max-w-[85%]">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="text-gray-500 text-[5px]">10:43 AM</span>
                          <span className="font-bold text-white text-[7px]">You</span>
                        </div>
                        <div className="p-1 rounded-lg rounded-tr-none bg-indigo-600 text-[6.5px] text-white text-left leading-tight">
                          Wow, this interface feels incredibly premium. Let's launch the group video room.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5 border-t border-white/5 bg-[#090B10] flex items-center space-x-1 flex-shrink-0">
                    <input 
                      type="text" 
                      placeholder="Write message..." 
                      className="flex-grow px-2 py-1 rounded bg-[#0E1119] border border-white/5 text-[7px] text-white focus:outline-none placeholder-gray-600"
                      disabled 
                    />
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow flex-shrink-0 cursor-default">
                      <Send className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.title === "PERSONAL PORTFOLIO" && (
              <div className="flex-1 flex flex-col bg-[#030303] text-[6px] text-gray-300 font-sans p-2 justify-between relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-1 flex-shrink-0">
                  <div className="flex items-center space-x-0.5">
                    <span className="text-red-500 text-[7px]">🕷</span>
                    <span className="text-[7.5px] font-black text-white uppercase tracking-tight">ANURAG<span className="text-accentBlue">.VERMA</span></span>
                  </div>
                  <div className="flex space-x-1.5 text-gray-400 font-medium scale-90">
                    <span className="text-white">Home</span>
                    <span>About</span>
                    <span>Skills</span>
                    <span>Projects</span>
                    <span>Journey</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-white font-bold scale-90">Connect ↗</span>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-2 items-center py-1 overflow-hidden">
                  <div className="col-span-8 space-y-1.5 text-left">
                    <div className="inline-flex items-center space-x-0.8 px-1.2 py-0.2 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[4.5px] uppercase">
                      <span className="w-0.8 h-0.8 rounded-full bg-red-500" />
                      <span>Founder @ OpportunityX</span>
                    </div>

                    <div className="space-y-0.2">
                      <h4 className="text-[12px] font-extrabold text-white tracking-tight uppercase leading-none">ANURAG</h4>
                      <h4 className="text-[12px] font-extrabold tracking-tight uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-purple-400 to-red-400">VERMA</h4>
                    </div>
                    
                    <h5 className="text-[5.5px] font-black text-white leading-tight">BUILDING PRODUCTS FOR STUDENTS WITH AI/ML & FULL STACK WEB.</h5>
                    <p className="text-[4.5px] text-gray-400 leading-normal font-light">Started coding in January 2026. Currently exploring AI/ML, full stack, and building OpportunityX.</p>

                    <div className="flex space-x-1">
                      <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-accentBlue to-red-500 font-bold text-white text-[4.5px]">EXPLORE</span>
                      <span className="px-1.5 py-0.5 rounded border border-white/10 text-gray-300 font-bold text-[4.5px]">OPPORTUNITYX</span>
                    </div>
                  </div>

                  <div className="col-span-4 flex justify-center">
                    <div className="relative w-12 aspect-[3/4] rounded-lg border border-white/10 p-0.2 bg-zinc-900 overflow-hidden shadow-lg">
                      <img src="/portrait3.jpg" className="w-full h-full object-cover rounded filter grayscale" />
                      <div className="absolute bottom-0.5 left-0.5 right-0.5 p-0.5 bg-black/60 rounded text-[3.5px] text-left">
                        <div className="font-bold text-white leading-none">Anurag Verma</div>
                        <div className="text-gray-400 text-[2.8px]">Founder & Dev</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 pt-0.8 border-t border-white/5 flex-shrink-0 text-left">
                  <div className="p-0.5 rounded bg-[#0A0A0A] border border-white/5">
                    <span className="block text-[4px] text-gray-500 font-bold uppercase tracking-wider leading-none">Startups</span>
                    <span className="text-[6.5px] font-black text-white mt-0.5 block leading-none">2</span>
                  </div>
                  <div className="p-0.5 rounded bg-[#0A0A0A] border border-white/5">
                    <span className="block text-[4px] text-gray-500 font-bold uppercase tracking-wider leading-none">Projects</span>
                    <span className="text-[6.5px] font-black text-white mt-0.5 block leading-none">5</span>
                  </div>
                  <div className="p-0.5 rounded bg-[#0A0A0A] border border-white/5">
                    <span className="block text-[4px] text-gray-500 font-bold uppercase tracking-wider leading-none">Stack</span>
                    <span className="text-[6.5px] font-black text-white mt-0.5 block leading-none">AI/ML</span>
                  </div>
                  <div className="p-0.5 rounded bg-[#0A0A0A] border border-white/5">
                    <span className="block text-[4px] text-gray-500 font-bold uppercase tracking-wider leading-none">Product</span>
                    <span className="text-[6.5px] font-black text-accentBlue mt-0.5 block flex items-center space-x-0.5 leading-none">
                      <span className="w-0.8 h-0.8 rounded-full bg-accentBlue inline-block animate-ping" />
                      <span>Live</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {project.title === "MS VERMA KIRANA STORE" && (
              <div 
                className="flex-1 flex flex-col text-[7px] text-gray-200 relative overflow-hidden select-none bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35 backdrop-blur-[0.3px]" />

                <div className="relative z-10 flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-black/40 backdrop-blur-md flex-shrink-0 text-left">
                  <div className="flex items-center space-x-0.5">
                    <span className="text-[8.5px] font-black text-white">Ms Verma<span className="text-amber-500"> Kirana</span></span>
                  </div>
                  <div className="flex space-x-2 text-gray-300 font-medium scale-90">
                    <span>Categories</span>
                    <span>About</span>
                    <span>Contact</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Moon className="w-2.5 h-2.5 text-gray-400" />
                    <span className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center space-x-0.5 text-[5.5px]">
                      <Phone className="w-1.5 h-1.5" />
                      <span>Call Now</span>
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-2 text-left space-y-1.5 max-w-[200px]">
                  <span className="text-[5px] font-bold tracking-widest text-amber-500 uppercase leading-none block">15+ YEARS OF TRUST • NEIGHBOURHOOD</span>
                  
                  <h4 className="text-[13px] font-extrabold text-white leading-none font-serif">Ms Verma <span className="text-amber-500 block">Kirana Store</span></h4>
                  
                  <p className="text-[6.2px] text-gray-300 leading-normal font-light">Fresh spices, premium grains, daily essentials — everything your kitchen needs with warmth and trust.</p>

                  <div className="flex space-x-1.5 pt-0.5">
                    <span className="px-2 py-1 rounded bg-amber-600 text-white font-bold flex items-center space-x-0.5 text-[5.5px]">
                      <Phone className="w-1.5 h-1.5" />
                      <span>Call Now</span>
                    </span>
                    <span className="px-2 py-1 rounded border border-white/20 text-gray-200 font-bold text-[5.5px]">Visit Store</span>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: "OPPORTUNITYX",
      tagline: "STUDENT CAREER BOOSTERS",
      logo: "/opportunityx-logo.jpg",
      emoji: "🚀",
      description: "OpportunityX is a student-first search engine and dashboard engineered to bridge the accessibility gap. It aggregates global career accelerators, enabling high-potential students to easily discover and apply for:",
      features: [
        { label: "Hackathons & Jobs", color: "bg-accentBlue" },
        { label: "Internships & Roles", color: "bg-accentPurple" },
        { label: "Scholarships & Grants", color: "bg-amber-400" },
        { label: "Open Source Tracks", color: "bg-emerald-400" }
      ],
      techStack: ["React", "FastAPI", "Firebase", "Vercel", "Render"],
      link: "https://opportunityx.co.in",
      buttonText: "Launch Dashboard",
      mockupUrl: "opportunityx.app/dashboard",
      mockupHeader: {
        tag: "OPPORTUNITY SEARCH",
        title: "Find your next career accelerator."
      },
      mockupItems: [
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
      ]
    },
    {
      title: "ZENKAI",
      tagline: "AI-DRIVEN ANIME DISCOVERY PLATFORM",
      logo: "/zenkai-logo.png",
      emoji: "🎌",
      description: "An intelligent anime discovery ecosystem designed to streamline how users search, analyze, and track their watchlist. Powered by Gemini AI for natural-language queries, scene trace screenshot recognition, and dynamically rendered vibe profiles.",
      features: [
        { label: "AI Anime Assistant", color: "bg-accentBlue" },
        { label: "Scene Trace Finder", color: "bg-accentPurple" },
        { label: "Vibe Watch Profiles", color: "bg-amber-400" },
        { label: "AniList API Integration", color: "bg-emerald-400" }
      ],
      techStack: ["Next.js", "React", "TailwindCSS", "Firebase", "Gemini AI", "Framer Motion"],
      link: "https://zenk-ai.vercel.app",
      buttonText: "Launch Application",
      mockupUrl: "zenkai.app/discover",
      mockupHeader: {
        tag: "ZENKAI DISCOVERY",
        title: "Discover anime smarter with Gemini AI."
      },
      mockupItems: [
        {
          title: "Frieren AI Search",
          type: "AI Suggestion",
          typeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          company: "Zenkai AI",
          details: "Cozy & Melancholic",
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        },
        {
          title: "Scene Upload #1024",
          type: "Trace Search",
          typeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          company: "Scene Finder",
          details: "Episode 12 • 98% Match",
          icon: <Award className="w-3.5 h-3.5 text-rose-400" />
        },
        {
          title: "Personal Vibe Profile",
          type: "Radial Graph",
          typeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
          company: "User Stats",
          details: "Top Genre: Shonen",
          icon: <Code className="w-3.5 h-3.5 text-sky-400" />
        }
      ]
    },
    {
      title: "VOXTRO",
      tagline: "REAL-TIME COMMUNICATION CONSOLE",
      logo: "/voxtro-logo.png",
      emoji: "💬",
      description: "A premium real-time collaboration suite engineered with secure E2EE chat messaging, high-fidelity WebRTC voice/video channels, and dynamic group workspace rooms. Re-architected for ultra-low latency, mobile readiness, and seamless synchronization.",
      features: [
        { label: "E2EE Chat Messaging", color: "bg-accentBlue" },
        { label: "WebRTC Video & Voice", color: "bg-accentPurple" },
        { label: "Capacitor Mobile Build", color: "bg-amber-400" },
        { label: "Express & Socket.io Backend", color: "bg-emerald-400" }
      ],
      techStack: ["React", "TypeScript", "TailwindCSS", "Socket.io", "WebRTC", "Firebase", "Capacitor", "Node.js"],
      link: "",
      buttonText: "STILL BUILDING",
      mockupUrl: "voxtro.app/console",
      mockupHeader: {
        tag: "VOXTRO COLD START",
        title: "Initialize high-fidelity communication rooms."
      },
      mockupItems: [
        {
          title: "General Voice Room",
          type: "WebRTC Active",
          typeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          company: "Voxtro Console",
          details: "2.4ms avg ping",
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        },
        {
          title: "End-to-End Chat E2EE",
          type: "AES-GCM Keys",
          typeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          company: "Secure Channel",
          details: "Local key generation",
          icon: <Award className="w-3.5 h-3.5 text-rose-400" />
        },
        {
          title: "Capacitor Android Core",
          type: "Mobile Build",
          typeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
          company: "Android Target",
          details: "Gradle Native integration",
          icon: <Code className="w-3.5 h-3.5 text-sky-400" />
        }
      ]
    },
    {
      title: "PERSONAL PORTFOLIO",
      tagline: "",
      emoji: "🕸️",
      description: "A premium, highly interactive developer portfolio featuring custom 3D card tilt mechanisms, glassmorphism, dynamic particle physics, and ambient backlighting designed to stand out.",
      features: [
        { label: "Dynamic Particle Physics", color: "bg-accentBlue" },
        { label: "3D Perspective Tilt", color: "bg-accentPurple" },
        { label: "Glassmorphic Design", color: "bg-amber-400" },
        { label: "Cinematic Animations", color: "bg-emerald-400" }
      ],
      techStack: ["React", "TailwindCSS", "Framer Motion", "Vite", "Lucide React"],
      link: "",
      buttonText: "WE ARE ALREADY HERE",
      mockupUrl: "anuragxverma.vercel.app",
      mockupHeader: {
        tag: "PORTFOLIO VIEW",
        title: "Welcome to my creative universe."
      },
      mockupItems: [
        {
          title: "Creative Engineering",
          type: "Interactive",
          typeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          company: "Portfolio Website",
          details: "React + Framer Motion",
          icon: <Code className="w-3.5 h-3.5 text-rose-400" />
        },
        {
          title: "Custom Particle Physics",
          type: "Active",
          typeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          company: "Custom Cursor",
          details: "Physics-based canvas nodes",
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        },
        {
          title: "Optimized Performance",
          type: "Lighthouse 100",
          typeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          company: "Vite Bundler",
          details: "Fast loading modules",
          icon: <Award className="w-3.5 h-3.5 text-amber-400" />
        }
      ]
    },
    {
      title: "MS VERMA KIRANA STORE",
      tagline: "LOCAL RETAIL DIGITALIZATION",
      emoji: "🏪",
      description: "A modern, highly optimized digital storefront designed for a local neighborhood grocery store. Empowering traditional businesses with online catalog discovery, responsive product queries, and seamless direct-call functionality.",
      features: [
        { label: "Interactive Storefront", color: "bg-accentBlue" },
        { label: "One-Click Call Support", color: "bg-accentPurple" },
        { label: "Modern Visual Catalog", color: "bg-amber-400" },
        { label: "Hyperlocal SEO Engine", color: "bg-emerald-400" }
      ],
      techStack: ["React", "Vite", "TailwindCSS", "Lovable", "Vercel"],
      link: "https://msvermakiranastore.lovable.app",
      buttonText: "Visit Digital Store",
      mockupUrl: "msvermakiranastore.lovable.app",
      mockupHeader: {
        tag: "KIRANA STOREFRONT",
        title: "Fresh spices, premium grains, and daily essentials."
      },
      mockupItems: [
        {
          title: "Premium Cardamom & Cloves",
          type: "In Stock",
          typeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          company: "Spices & Condiments",
          details: "Handpicked quality spices",
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        },
        {
          title: "Fresh Farm Grains",
          type: "Popular",
          typeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          company: "Daily Essentials",
          details: "Naturally sourced grains",
          icon: <Award className="w-3.5 h-3.5 text-amber-400" />
        },
        {
          title: "Store Manager Hotline",
          type: "Call Now",
          typeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
          company: "Instant Support",
          details: "Click to order direct",
          icon: <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
        }
      ]
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
          <span className="text-xs font-bold tracking-widest text-accentBlue uppercase mb-2">FEATURED PROJECTS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            VENTURES & PRODUCTS
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentBlue to-accentPurple mt-4 rounded-full" />
        </div>

        {/* Project Cards Stack */}
        <div className="flex flex-col space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
