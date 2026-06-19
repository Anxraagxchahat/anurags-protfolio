# 00 — Content Inventory (LOCKED / PRESERVED)

> **Purpose:** This is the single source of truth for everything that must survive the redesign.
> The visual design is being completely rebuilt. The content below is **frozen** — copy, names,
> URLs, project facts, skills, and the photo must transfer 1:1 unless the user explicitly edits them.
>
> **Rule:** No fact in this file may be invented, embellished, or dropped during implementation.
> If a redesign idea requires changing a fact here, stop and ask first.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | **Anurag Verma** |
|Primary role | Founder @ OpportunityX · Product Builder · Full-Stack & AI/ML Engineer|  
| Short title (footer) | Student Founder & Web Architect |
| Building since | January 2026 |
| Core focus | AI/ML · Full-Stack Web |
| Preferred stack | FastAPI + React |
| One-line positioning | Building products that help students discover opportunities, grow faster, and leverage AI at scale. |

### Bio (verbatim — long form)
> A non-traditional path built on high-velocity learning. When I committed to learning code in
> January 2026, I bypassed traditional sandbox tutorials in favor of building real products. I believe
> that students deserve better access to global career boosters, which drove me to design and develop
> OpportunityX. My workflow integrates cutting-edge frontend libraries with fast API microservices.
> I spend my time engineering responsive layouts, training custom models, and designing sleek user
> experiences that scale.

### Headline stats (used in Hero)
- Startups: **2+**
- Projects: **5+**
- Core Stack: **AI/ML**
- Status: **Live / In Production**

---

## 2. Photo & Brand Assets (PRESERVE)

| Asset | Path | Use |
|---|---|---|
| **Portrait (the photo)** | `/portrait3.jpg` | Hero floating photo card. THE photo to preserve. |
| OpportunityX logo | `/opportunityx-logo.jpg` | Projects |
| Zenkai logo | `/zenkai-logo.png` | Projects |
| Voxtro logo | `/voxtro-logo.png` | Projects |
| Favicon | `/favicon.svg`, `/favicon.png` | `<head>` |

> Portrait is currently rendered grayscale→color on hover. Treatment may change in redesign,
> but the **source file `/portrait3.jpg` stays**.
>
> Unused/legacy assets (not referenced by current content, safe to ignore): `chahat.jpg`,
> `chahat_avatar.png`, `spiderman.png`, `icons.svg`. Do **not** introduce `spiderman.png` as a
> literal hero image — the brief explicitly forbids a fan site.

---

## 3. Projects (5 — all facts LOCKED)

### 3.1 OpportunityX
- **Tagline:** Student Career Boosters
- **Accent:** `#e23636` (red) · Logo: `/opportunityx-logo.jpg`
- **Description:** A student-first search engine and dashboard that bridges the accessibility gap — aggregating global career accelerators so high-potential students can discover and apply for internships, hackathons, and open-source mentorships in one place.
- **Feature pills:** Hackathons & Jobs · Internships & Roles · Scholarships & Grants · Open Source Tracks
- **Tech:** React, FastAPI, Firebase, Vercel, Render
- **Link:** https://opportunityx.co.in → button **"Launch Dashboard"**
- Secondary link seen in Hero CTA: https://opportunity-x.vercel.app (keep as-is)

### 3.2 Zenkai
- **Tagline:** AI-Driven Anime Discovery
- **Accent:** `#38bdf8` (blue) · Logo: `/zenkai-logo.png`
- **Description:** An intelligent anime discovery ecosystem powered by Gemini AI — natural-language search, scene-trace screenshot recognition, and dynamically rendered personal "vibe profiles" to streamline how users find and track what to watch.
- **Feature pills:** AI Anime Assistant · Scene Trace Finder · Vibe Watch Profiles · AniList API Integration
- **Tech:** Next.js, React, TailwindCSS, Firebase, Gemini AI, Framer Motion
- **Link:** https://zenk-ai.vercel.app → button **"Launch Application"**

### 3.3 Voxtro
- **Tagline:** Real-Time Communication Console
- **Accent:** `#ff4d6d` (pink-red) · Logo: `/voxtro-logo.png`
- **Description:** A premium real-time collaboration suite: secure E2EE messaging, high-fidelity WebRTC voice/video channels, and dynamic group workspaces — re-architected for ultra-low latency, mobile readiness, and seamless sync.
- **Feature pills:** E2EE Chat Messaging · WebRTC Video & Voice · Capacitor Mobile Build · Express & Socket.io Backend
- **Tech:** React, TypeScript, TailwindCSS, Socket.io, WebRTC, Firebase, Capacitor, Node.js
- **Link:** _none yet_ → status button **"Still Building"** (no link → non-clickable state)

### 3.4 MS Verma Kirana Store
- **Tagline:** Local Retail Digitalization
- **Accent:** `#38bdf8` (blue) · Logo: none (use emoji/mark 🏪)
- **Description:** A modern, highly optimized digital storefront for a neighborhood grocery store — empowering a traditional business with online catalog discovery, responsive product queries, and direct-call ordering.
- **Feature pills:** Interactive Storefront · One-Click Call Support · Modern Visual Catalog · Hyperlocal SEO Engine
- **Tech:** React, Vite, TailwindCSS, Lovable, Vercel
- **Link:** https://msvermakiranastore.lovable.app → button **"Visit Digital Store"**

### 3.5 Personal Portfolio (this site)
- **Tagline:** Cinematic 3D Portfolio
- **Accent:** `#e23636` (red) · Logo: none (use mark 🕸️)
- **Description:** A premium, highly interactive developer portfolio featuring a real-time WebGL scene, custom 3D tilt mechanics, glassmorphism, dynamic particle physics, and ambient neon lighting designed to stand out.
- **Feature pills:** Dynamic Particle Physics · 3D Perspective Tilt · Glassmorphic Design · Cinematic Animations
- **Tech (NEW reality after redesign):** React, Vite, Three.js, R3F, Drei, GSAP, Framer Motion, Lenis
- **Link:** _none_ → button **"You Are Already Here"**

> ⚠️ Update only this project's tech list to reflect the new build (R3F/GSAP/Lenis). All other
> project facts are frozen.

---

## 4. Skills (12 — LOCKED)

| Skill | Category | Color | One-liner |
|---|---|---|---|
| Python | Backend / ML | `#38bdf8` | Automation pipelines & ML architectures. |
| React | Frontend Core | `#38bdf8` | Declarative components & high-fps rendering. |
| Next.js & TS | Full-Stack Web | `#fbbf24` | Type-safe App Router, Server Actions, SEO. |
| Firebase | Cloud Database | `#fbbf24` | Realtime sync, Firestore, secure auth. |
| FastAPI | Microservices | `#34d399` | High-performance Python microservices. |
| AI / Gemini | Intelligent Systems | `#a855f7` | Gemini integrations & semantic AI agents. |
| WebRTC | Real-Time Systems | `#ec4899` | Low-latency sockets & E2EE video rooms. |
| Hybrid Mobile | Cross-Platform | `#818cf8` | Web → native Android via Capacitor. |
| GitHub | Version Control | `#cbd5e1` | Branch management & workflow automation. |
| API Integration | Connectivity | `#2dd4bf` | REST, OAuth & rapid ingest pipelines. |
| Vercel & Render | Hosting / DevOps | `#ffffff` | CD, preview builds, Docker, cron. |
| UI/UX & Framer | SaaS Design | `#f43f5e` | Minimal layouts & motion-rich glassmorphism. |

---

## 5. Journey / Milestones (7 — LOCKED, chronological)

| Date | Title | Summary |
|---|---|---|
| **Jan 2026** | The Initial Spark | First lines of HTML/CSS/JS; grasped core paradigms and the leverage of frameworks. |
| **Feb 2026** | Exploring AI/ML & Digitalizing Retail | Built MS Verma Kirana Store (Lovable); explored ML patterns, embeddings search, custom Python model runners. |
| **Mar 2026** | Web Engineering Masterclass | Mastered full-stack with FastAPI + React; stateful dashboards, API integrations, DB schemas. |
| **Apr–Jun 2026** | Building & Launching OpportunityX | Designed and launched OpportunityX for students; deployed microservices at speed. |
| **Jun 2026** | Cinematic Portfolio Canvas | Engineered this interactive portfolio (3D tilts, particles, glassmorphism). |
| **Jun 2026** | AI Anime Discovery: Zenkai | Built Zenkai with Gemini AI search, scene-trace recognition, vibe profiles. |
| **Jun–Jul 2026** | Real-Time Collaboration: Voxtro | Architected Voxtro: E2EE chat, WebRTC voice/video, Capacitor mobile. |

> Note: the About section also carries a near-identical 6-point timeline. In the redesign, **Journey
> is the canonical timeline**; About should reference the narrative, not duplicate all dates (see
> redesign plan §About).

---

## 6. Contact & Social (LOCKED)

| Channel | Value |
|---|---|
| Email | vermakumaranurag@gmail.com |
| GitHub | https://github.com/Anxraagxchahat |
| LinkedIn | https://www.linkedin.com/in/anurag-verma-388238246/ |
| X (Twitter) | https://x.com/TheOpportunityX |
| Instagram | https://www.instagram.com/pandaxchahat |

**Contact form:** posts to `https://formsubmit.co/ajax/vermakumaranurag@gmail.com` (AJAX JSON).
Fields: `name`, `email`, `message`. Handles three states: success, **activation-required**
(FormSubmit first-use email), and error. **This logic must be preserved verbatim** — it is working
backend behavior, not decoration.

Micro-copy to keep: "Response time: Typically under 4 hours."

---

## 7. SEO / Meta (PRESERVE & extend)

- `<title>`: Anurag Verma | Founder @ OpportunityX & Full Stack Engineer
- Description: Personal portfolio of Anurag Verma, student founder of OpportunityX and developer exploring AI/ML and full stack web engineering since January 2026.
- OG/Twitter image: `/portrait3.jpg`
- Author/keywords: Anurag Verma, OpportunityX, Student Founder, AI, ML, React Developer, Full Stack Engineer

---

## 8. Installed Dependencies (already in package.json — no install needed)

`react@19`, `react-dom@19`, `three@0.184`, `@react-three/fiber@9`, `@react-three/drei@10`,
`@react-three/postprocessing@3`, `postprocessing@6`, `gsap@3.15`, `@gsap/react@2`,
`framer-motion@12`, `lenis@1.3`, `maath@0.10`, `lucide-react`, `tailwindcss@3.4`,
`autoprefixer`, `postcss`, `vite@8`.

> Everything the brief asks for (R3F, Drei, GSAP+ScrollTrigger, Framer Motion, Lenis, Maath,
> Tailwind, Three) is **already installed**. ScrollTrigger ships inside the `gsap` package —
> register via `gsap.registerPlugin(ScrollTrigger)`. No new dependencies are required for the core build.

---

## 9. Current file structure (for reference during teardown)

```
src/
  App.jsx, main.jsx, index.css, App.css
  components/   Hero, Navbar, About, Skills, Projects, Journey, Contact, Footer,
                Background3D, HeroScene3D, GlowBackground, CustomCursor, Loader
  spiderverse/  (separate experimental entry — data.js holds clean content copies)
```

`src/spiderverse/data.js` is the cleanest machine-readable copy of profile/projects/skills/contact
and should be promoted into the new `src/data/` content layer (see redesign plan).
