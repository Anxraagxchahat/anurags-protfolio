// ============================================================
// Projects — 5 entries, ALL facts LOCKED (doc 00 §3).
// Only the Personal Portfolio tech list is updated to the new R3F/GSAP/Lenis
// reality (doc 00 §3.5 explicitly permits this; everything else is frozen).
// Voxtro & Portfolio have no link → non-clickable status buttons.
// `icon` fields are lucide-react name strings, resolved by the Projects section.
// ============================================================

export const projects = [
  {
    id: 'opportunityx',
    number: '01',
    title: 'OpportunityX',
    tagline: 'Student Career Boosters',
    accent: '#e23636', // spider-red
    logo: '/opportunityx-logo.jpg',
    emoji: '🚀',
    description:
      'A student-first search engine and dashboard that bridges the accessibility gap — aggregating global career accelerators so high-potential students can discover and apply for internships, hackathons, and open-source mentorships in one place.',
    features: [
      'Hackathons & Jobs',
      'Internships & Roles',
      'Scholarships & Grants',
      'Open Source Tracks',
    ],
    tech: ['React', 'FastAPI', 'Firebase', 'Vercel', 'Render'],
    link: 'https://opportunityx.co.in',
    buttonText: 'Launch Dashboard',
  },
  {
    id: 'zenkai',
    number: '02',
    title: 'Zenkai',
    tagline: 'AI-Driven Anime Discovery',
    accent: '#38bdf8', // spider-blue
    logo: '/zenkai-logo.png',
    emoji: '🎌',
    description:
      'An intelligent anime discovery ecosystem powered by Gemini AI — natural-language search, scene-trace screenshot recognition, and dynamically rendered personal "vibe profiles" to streamline how users find and track what to watch.',
    features: [
      'AI Anime Assistant',
      'Scene Trace Finder',
      'Vibe Watch Profiles',
      'AniList API Integration',
    ],
    tech: ['Next.js', 'React', 'TailwindCSS', 'Firebase', 'Gemini AI', 'Framer Motion'],
    link: 'https://zenk-ai.vercel.app',
    buttonText: 'Launch Application',
  },
  {
    id: 'voxtro',
    number: '03',
    title: 'Voxtro',
    tagline: 'Real-Time Communication Console',
    accent: '#ff4d6d', // spider-red-light (pink-red)
    logo: '/voxtro-logo.png',
    emoji: '💬',
    description:
      'A premium real-time collaboration suite: secure E2EE messaging, high-fidelity WebRTC voice/video channels, and dynamic group workspaces — re-architected for ultra-low latency, mobile readiness, and seamless sync.',
    features: [
      'E2EE Chat Messaging',
      'WebRTC Video & Voice',
      'Capacitor Mobile Build',
      'Express & Socket.io Backend',
    ],
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Socket.io', 'WebRTC', 'Firebase', 'Capacitor', 'Node.js'],
    link: null, // no link yet → non-clickable
    buttonText: 'Still Building',
  },
  {
    id: 'kirana',
    number: '04',
    title: 'MS Verma Kirana Store',
    tagline: 'Local Retail Digitalization',
    accent: '#38bdf8', // spider-blue
    logo: null,
    emoji: '🏪',
    description:
      'A modern, highly optimized digital storefront for a neighborhood grocery store — empowering a traditional business with online catalog discovery, responsive product queries, and direct-call ordering.',
    features: [
      'Interactive Storefront',
      'One-Click Call Support',
      'Modern Visual Catalog',
      'Hyperlocal SEO Engine',
    ],
    tech: ['React', 'Vite', 'TailwindCSS', 'Lovable', 'Vercel'],
    link: 'https://msvermakiranastore.lovable.app',
    buttonText: 'Visit Digital Store',
  },
  {
    id: 'portfolio',
    number: '05',
    title: 'Personal Portfolio',
    tagline: 'Cinematic 3D Portfolio',
    accent: '#e23636', // spider-red
    logo: null,
    emoji: '🕸️',
    description:
      'A premium, highly interactive developer portfolio featuring a real-time WebGL scene, custom 3D tilt mechanics, glassmorphism, dynamic particle physics, and ambient neon lighting designed to stand out.',
    features: [
      'Dynamic Particle Physics',
      '3D Perspective Tilt',
      'Glassmorphic Design',
      'Cinematic Animations',
    ],
    // Updated tech list — the new build reality (doc 00 §3.5)
    tech: ['React', 'Vite', 'Three.js', 'R3F', 'Drei', 'GSAP', 'Framer Motion', 'Lenis'],
    link: null, // you are already here → non-clickable
    buttonText: 'You Are Already Here',
  },
];

export default projects;
