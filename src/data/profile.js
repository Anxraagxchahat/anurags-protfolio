// ============================================================
// Identity, hero copy, bio & SEO — LOCKED content (doc 00 §1, §2, §7).
// Single source of truth: components import from here, never hard-code copy.
// Icons are stored as lucide-react name strings; consuming components resolve them.
// ============================================================

export const identity = {
  name: 'Anurag Verma',
  primaryRole: 'Founder @ OpportunityX · Product Builder · Full-Stack & AI/ML Engineer',
  footerTitle: 'Student Founder & Web Architect',
  buildingSince: 'January 2026',
  coreFocus: 'AI/ML · Full-Stack Web',
  preferredStack: 'FastAPI + React',
  positioning:
    'Building products that help students discover opportunities, grow faster, and leverage AI at scale.',
};

// Verbatim long-form bio (doc 00 §1) — split into the two flowing paragraphs
// used by the About narrative. Do not reword.
export const bio = {
  pullQuote: 'A non-traditional path built on high-velocity learning.',
  paragraphs: [
    'When I committed to learning code in January 2026, I bypassed traditional sandbox tutorials in favor of building real products. I believe that students deserve better access to global career boosters, which drove me to design and develop OpportunityX.',
    'My workflow integrates cutting-edge frontend libraries with fast API microservices. I spend my time engineering responsive layouts, training custom models, and designing sleek user experiences that scale.',
  ],
  // The three facts strip (About identity card)
  facts: [
    { value: '2026', label: 'Coding Start' },
    { value: 'AI/ML', label: 'Core Focus' },
    { value: 'FastAPI + React', label: 'Preferred Stack' },
  ],
};

// Hero section copy (doc 00 §1 + redesign plan §Hero). All preserved verbatim.
export const hero = {
  eyebrow: 'Founder @ OpportunityX',
  nameLines: ['ANURAG', 'VERMA'],
  // Typing subtitle — preserve wording and the typing mechanic
  subtitle: 'Building products for students with AI/ML & Full Stack Web.',
  // Lead paragraph — preserve wording (Jan-2026 / OpportunityX)
  lead: 'Started coding in January 2026. Currently exploring AI/ML, full stack development, and building OpportunityX — a platform helping students discover hackathons, internships, jobs, scholarships, and opportunities in one place.',
  ctas: [
    { label: 'Explore Projects', href: '#projects', kind: 'primary', portalJump: true, icon: 'Zap' },
    { label: 'View OpportunityX', href: 'https://opportunity-x.vercel.app', kind: 'secondary', external: true },
  ],
  // Count-up stats (doc 00 §1) — preserve values & count-up mechanic
  stats: [
    { value: '2', suffix: '+', label: 'Startups', icon: 'Layers', accent: 'spider-red' },
    { value: '5', suffix: '+', label: 'Projects', icon: 'Code', accent: 'spider-blue' },
    { value: 'AI/ML', suffix: '', label: 'Core Stack', icon: 'Sparkles', accent: 'spider-amber' },
    { value: 'Live', suffix: '', label: 'In Production', icon: 'CheckCircle', accent: 'spider-emerald' },
  ],
  // Floating photo-card badges (re-themed, doc 03 §Hero)
  badges: [
    { emoji: '🚀', label: 'STARTUP BUILDER', accent: 'spider-red' },
    { emoji: '⚡', label: '5+ PRODUCTS', accent: 'spider-blue' },
    { emoji: '🔥', label: 'AI/ML', accent: 'spider-amber' },
  ],
  photoCaption: { title: 'ANURAG VERMA', subtitle: 'FOUNDER & DEVELOPER' },
};

// Brand & photo assets (doc 00 §2) — preserved paths
export const assets = {
  portrait: '/portrait3.jpg',
  favicon: '/favicon.svg',
  faviconPng: '/favicon.png',
  logos: {
    opportunityx: '/opportunityx-logo.jpg',
    zenkai: '/zenkai-logo.png',
    voxtro: '/voxtro-logo.png',
  },
};

// SEO / meta (doc 00 §7) — preserve & extend
export const seo = {
  title: 'Anurag Verma | Founder @ OpportunityX & Full Stack Engineer',
  description:
    'Personal portfolio of Anurag Verma, student founder of OpportunityX and developer exploring AI/ML and full stack web engineering since January 2026.',
  ogImage: '/portrait3.jpg',
  author: 'Anurag Verma',
  keywords: [
    'Anurag Verma',
    'OpportunityX',
    'Student Founder',
    'AI',
    'ML',
    'React Developer',
    'Full Stack Engineer',
  ],
};

export default { identity, bio, hero, assets, seo };
