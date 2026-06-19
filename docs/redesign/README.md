# Spider-Verse Portfolio Redesign — Planning Docs

Complete A-to-Z redesign plan for **Anurag Verma's** portfolio: a Spider-Verse–inspired cinematic
experience that stays **professional and recruiter-friendly** (not a fan site). Visual design is
fully rebuilt; **content is preserved**.

> **Status: PLANNING ONLY — no code yet.** Implementation begins after this plan is approved.

## Read in order
| # | Doc | What it covers |
|---|---|---|
| 00 | [Content Inventory](./00-content-inventory.md) | **LOCKED** facts: identity, photo, 5 projects, 12 skills, 7 milestones, contact, SEO. Source of truth. |
| 01 | [UX Architecture](./01-ux-architecture.md) | Concept, IA, scroll model, portal interaction, responsive, a11y, success criteria. |
| 02 | [Visual System](./02-visual-system.md) | Color, typography, comic texture kit, surfaces, 3D world look, guardrails. |
| 03 | [Redesign Plan](./03-redesign-plan.md) | Section-by-section blueprint + file structure + build order + open decisions. |
| 04 | [Motion & Performance](./04-motion-and-performance.md) | Animation ownership, single-RAF wiring, 60fps budgets, a11y gates, QA targets. |

## Theme in one line
A guided traversal through the "Spider-Verse" of one developer's work — dimensional portals, halftone
texture, chromatic offset, massive editorial type, and a persistent 3D multiverse behind clean,
legible content.

## Hard constraints
- **Preserve** all content, projects, skills, info, and the photo (`/portrait3.jpg`) — see doc 00.
- **Redesign everything else** — no current visual design is retained.
- **No Marvel IP** — no characters, masks, suits, logos, or quotes. The theme is motion/visual grammar.
- **Recruiter-first** — name → role → projects → contact absorbable in a fast scroll.
- Stack (all already installed): React, Vite, Three.js, R3F, Drei, GSAP+ScrollTrigger, Framer Motion,
  Lenis, Maath, Tailwind.

## Decisions needed at approval (defaults chosen so work can start regardless)
1. Projects layout — **A: pinned dimensional stack (recommended)** / B: horizontal / C: stacked;
   default hybrid (A desktop, C mobile).
2. Display font — **Anton (recommended)** / Archivo Black / Clash Display.
3. Project previews — **lightweight comic-panel frames (recommended)** / real screenshots (need assets)
   / keep hand-coded mockups.
4. Custom cursor — include comic reticle (desktop) / skip.
5. `spiderverse.html` second entry — delete after merge / keep as standalone demo.

## Build order (see doc 03 §10)
P0 Foundation → P1 World → P2 Transitions → P3 Hero → P4 About/Skills/Journey → P5 Projects →
P6 Contact/Footer → P7 Polish & QA.
