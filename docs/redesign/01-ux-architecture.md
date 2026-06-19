# 01 — UX Architecture

> Theme: **Spider-Verse–inspired cinematic experience.** Recruiter-first, not a fan site.
> The "Spider-Verse" is expressed as *motion language and visual grammar* — dimensional portals,
> halftone/Ben-Day texture, chromatic offset, comic-panel framing, multi-layer parallax — never as
> Marvel IP, characters, or logos. Read this document before the visual system; it defines *behavior*,
> the visual doc defines *appearance*.

---

## 1. Experience Concept

**"Crossing the Spider-Verse of one developer's work."**

The portfolio is framed as a guided dimensional traversal. The visitor doesn't scroll down a page —
they fall *through* a stack of dimensions, each one a section of Anurag's story. A persistent 3D
backdrop (the "multiverse") sits behind all content; scroll drives a camera/parallax journey through
it. Section transitions are **portal crossings**: a brief chromatic-aberration + glitch + zoom beat
that signals "you've entered a new dimension."

This metaphor is load-bearing for UX, not just decoration:
- It justifies **massive typography** (each dimension announces itself like a comic splash page).
- It justifies **scroll-driven storytelling** (forward motion = narrative progress).
- It gives **portals** a job (section dividers / navigation teleports), not a gimmick.
- It keeps things **professional**: the "content layer" is always clean, legible, glassy UI; the
  comic energy lives in the *background and transitions*, never in the readable content.

### The dual-layer model (core mental model)
```
┌─────────────────────────────────────────────┐
│  CONTENT LAYER  (HTML/DOM, Tailwind, crisp)   │  ← what recruiters read. Always legible.
│   headings, copy, project cards, form         │
├─────────────────────────────────────────────┤
│  MOTION LAYER   (Framer Motion + GSAP)        │  ← reveals, parallax, portal transitions
├─────────────────────────────────────────────┤
│  WORLD LAYER    (R3F canvas, fixed, z-behind) │  ← the multiverse: particles, portal, depth
└─────────────────────────────────────────────┘
```
A **single persistent `<Canvas>`** lives at the back for the whole page (fixed, `z-0`). Sections are
DOM that scroll over it. Scroll position is the shared clock that drives camera, parallax, and reveals.

---

## 2. Information Architecture

Linear single-page scroll, eight beats. Order is fixed (matches existing nav + recruiter scan order):

| # | Section | Narrative role ("dimension") | Primary goal |
|---|---|---|---|
| 0 | **Preloader** | "Calibrating the portal" | Mask asset/3D load; set tone in <2.5s |
| 1 | **Hero** | Dimension 01 — Arrival | Who, what, instant credibility, the photo |
| 2 | **About** | Dimension 02 — Origin | The non-traditional story, velocity narrative |
| 3 | **Skills** | Dimension 03 — Abilities | Technical range at a glance |
| 4 | **Projects** | Dimension 04 — The Work | Proof; the recruiter's #1 destination |
| 5 | **Journey** | Dimension 05 — Timeline | Trajectory & momentum (Jan→Jul 2026) |
| 6 | **Contact** | Dimension 06 — Open a Channel | Convert: form + socials |
| 7 | **Footer** | Exit portal | Wrap, socials, back-to-top |

Persistent overlays (not in scroll flow): **Navigation**, **scroll progress indicator**, optional
**custom cursor** (desktop only).

### Navigation behavior
- Floating pill nav, top-center (evolves the current design language).
- Links: Home · About · Skills · Projects · Journey · Contact + a "Connect" CTA.
- **Active-section tracking** via ScrollTrigger (replace the manual scroll listener). The active pill
  animates with a shared-layout indicator.
- Clicking a link = **portal jump**: trigger the portal transition, then Lenis `scrollTo` the target.
- Mobile: hamburger → full-screen dimensional overlay menu (not a small dropdown). Big tap targets,
  staggered link reveal, one clear CTA.

---

## 3. Scroll Model

**Lenis** owns smooth scrolling. **GSAP ScrollTrigger** reads scroll to drive:
1. **Camera/world parallax** — background depth layers move at different rates (`scrub`).
2. **Section reveals** — pinned or trigger-on-enter timelines per section.
3. **Portal transitions** — short pinned beats between sections.
4. **Progress** — a thin vertical/edge progress rail + nav active state.

Integration rule: Lenis drives the loop; on each Lenis `scroll` event call `ScrollTrigger.update()`,
and drive GSAP's ticker / R3F frame from a single RAF. (Exact wiring lives in the motion spec.)

### Pinning budget (deliberately limited for performance + UX clarity)
- **Pin Hero** briefly for the portal-arrival beat (optional, short).
- **Pin Projects intro** for one horizontal/stacked reveal beat.
- Everything else: **trigger-on-enter** reveals (no pin) to avoid scroll-jank and "stuck" feeling.

> Anti-pattern to avoid: over-pinning every section. It makes the page feel slow and fights mobile.
> Portals are *fast* (≈0.6–0.9s), not long scrubbed set-pieces.

---

## 4. The Spider-Verse Portal (signature interaction)

A reusable transition primitive used at: preloader→hero, and each section boundary (subtle), and
nav jumps (pronounced).

**Anatomy of a portal crossing (≈700ms):**
1. Chromatic split — R/G/B channels offset and snap back.
2. Radial "iris" / hex-grid wipe in the section accent color.
3. Micro-glitch slices on the outgoing heading.
4. Incoming section heading punches in (scale 1.08→1, blur→0).

**Where the 3D portal object lives:** the World layer renders one persistent portal ring/disc
(shader-driven swirl, comic colors). During a crossing it flares; at rest it idles behind the hero
and reappears as a motif at section seams. This is the single most "Spider-Verse" 3D element and
must read as abstract/dimensional — **no character silhouettes.**

Accessibility: a portal crossing must degrade to a simple cross-fade when `prefers-reduced-motion`
is set, and must never block content for more than its animation duration.

---

## 5. Interaction Inventory

| Interaction | Where | Input | Notes |
|---|---|---|---|
| Smooth scroll | Global | wheel/touch | Lenis; momentum tuned, not floaty |
| Portal crossing | Section seams, nav jumps | scroll/click | Reduced-motion → fade |
| Parallax depth | World + content | scroll | `scrub`; 3–4 depth bands |
| Floating photo card | Hero | pointer tilt + idle float | 3D tilt (preserve concept), gyro on mobile |
| Magnetic buttons | CTAs, nav | pointer proximity | Desktop only |
| Card tilt / glow-follow | Skills, Projects, Journey | pointer | Preserve from current build, refined |
| Project showcase | Projects | scroll + hover | Interactive showcase, see redesign plan |
| Cursor companion | Global (desktop) | pointer | Optional comic reticle; off on touch |
| Count-up stats | Hero | in-view | Preserve |
| Form submit | Contact | submit | Preserve FormSubmit logic exactly |
| Back-to-top portal | Footer/nav | click | Portal jump to hero |

---

## 6. Responsive & Input Strategy

Three experience tiers — **content parity across all**, motion fidelity scales:

| Tier | Width | 3D / Motion posture |
|---|---|---|
| **Desktop** (≥1024) | full | Full World layer, portals, magnetic cursor, parallax, tilt |
| **Tablet** (640–1023) | medium | World layer with reduced particle counts; tilt via touch; no magnetic cursor |
| **Mobile** (<640) | premium-lite | Lightweight World (static gradient + few particles or low-DPR canvas); portals = fast fades; **no scroll-jacking**; gyro tilt on photo optional |

Principles:
- **Mobile is premium, not stripped.** Big type, smooth reveals, tasteful motion — just cheaper 3D.
- Touch never relies on hover-only affordances; every hover reveal has a default/visible state.
- Respect `prefers-reduced-motion` globally (kill parallax scrub, portals→fade, stop idle loops).
- Respect `prefers-reduced-data` / `navigator.connection` → drop to static background.
- Honor device DPR cap (`dpr={[1, 1.75]}`) and pause the canvas when off-screen / tab hidden.

---

## 7. Loading & Perceived Performance

- **Preloader** doubles as the first portal. Shows brand mark + a real progress signal
  (Drei `useProgress` for 3D assets + font/image readiness). Target dismiss < 2.5s on mid hardware;
  hard cap with a timeout so it never traps the user.
- 3D assets and heavy sections are **lazy/Suspense-loaded**; hero content (text + photo) must paint
  even if the canvas isn't ready (canvas fades in behind).
- The photo (`/portrait3.jpg`) and above-the-fold text are **critical** — never gated behind 3D.

---

## 8. Accessibility & Professionalism Guardrails

- All content lives in real semantic DOM (h1–h3 hierarchy, `nav`, `main`, `section`, `footer`, `form`
  with labels). 3D/canvas is decorative → `aria-hidden`.
- Keyboard: nav fully tabbable; portal jumps move focus to the target section heading; visible focus
  rings; form is keyboard-complete.
- Color contrast on the readable content layer meets WCAG AA (the comic chrome is background).
- Motion is never required to understand content; reduced-motion path is first-class.
- "Recruiter sanity check": a hiring manager who scrolls fast must still get name → role → projects →
  contact in under 20 seconds without watching a single full animation.

---

## 9. Success Criteria (what "done" means for UX)

1. Name, role, and proof-of-work are absorbable in a fast scroll.
2. Every preserved fact (doc 00) is present and accurate.
3. 60fps target on desktop; no scroll-jank on a mid-range phone.
4. Reduced-motion and no-WebGL fallbacks are fully usable.
5. The Spider-Verse feeling is unmistakable yet never crosses into "fan page" or unprofessional.
6. Lighthouse: Performance ≥ 85 (mobile), Accessibility ≥ 95, SEO ≥ 95.
