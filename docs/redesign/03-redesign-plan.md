# 03 — Section-by-Section Redesign Plan

> The build blueprint. Each section lists: **Goal · Layout · Content (from doc 00) · Motion ·
> 3D/World · Responsive · Preserve · Acceptance**. Read alongside doc 01 (UX), doc 02 (visual),
> doc 04 (motion/perf). **No code until this plan is approved.**

---

## 0. Architecture & File Plan (foundation before sections)

### New source structure (proposed)
```
src/
  main.jsx
  App.jsx                      # mounts providers + section order
  index.css                    # tokens, base, comic utilities

  data/                        # promote from spiderverse/data.js — single content source
    profile.js  projects.js  skills.js  journey.js  contact.js

  lib/
    useLenis.js                # Lenis + ScrollTrigger sync
    useReducedMotion.js        # rm + reduced-data + webgl capability gate
    useMagnetic.js             # magnetic button/cursor hook
    motion.js                  # shared variants & easings
    theme.js                   # section→accent tokens

  three/                       # the persistent World layer
    World.jsx                  # single <Canvas>, fixed z-0
    ParticleField.jsx          # Maath-distributed points, parallax
    Portal.jsx                 # shader rift disc
    WebFilaments.jsx           # thread lines
    Effects.jsx                # bloom + chromatic + vignette + grain
    sceneController.js         # maps scroll/section → camera & accent

  ui/                          # shared DOM components
    SectionShell.jsx           # eyebrow + splash heading + halftone bg wrapper
    Portal Transition.jsx      # DOM portal-crossing overlay (chromatic/glitch)
    GlassCard.jsx  Pill.jsx  MagneticButton.jsx  Eyebrow.jsx
    Grain.jsx  Halftone.jsx  Cursor.jsx  ScrollProgress.jsx

  sections/
    Preloader.jsx  Nav.jsx  Hero.jsx  About.jsx  Skills.jsx
    Projects.jsx  Journey.jsx  Contact.jsx  Footer.jsx
```
- **Content layer:** move the clean data from `src/spiderverse/data.js` into `src/data/*`. Components
  import data; no copy hard-coded in JSX. Add `journey.js` (7 milestones) and split contact/socials.
- **Teardown:** old `src/components/*` and `src/spiderverse/*` are replaced. Keep the old files until
  the new section reaches parity, then delete. `spiderverse.html` second entry + its vite input can be
  removed once merged (or kept as a standalone demo — decide at cleanup).
- **Global providers** in `App.jsx`: Lenis, reduced-motion/capability context, single `<World/>`
  behind, `<Grain/>` + `<Cursor/>` + `<ScrollProgress/>` + `<Nav/>` overlays, then `<main>` sections.

### Cross-cutting systems (built first, used everywhere)
1. **Lenis + ScrollTrigger sync** (`useLenis`) — one RAF drives Lenis, ScrollTrigger, and R3F.
2. **Capability gate** (`useReducedMotion`) — returns `{ reducedMotion, lowPower, webgl }`; every
   motion/3D feature reads it.
3. **SectionShell** — standardizes eyebrow ("DIMENSION 0X"), massive splash heading, halftone bg,
   scroll-reveal, and accent var per section.
4. **PortalTransition** — the reusable crossing overlay.
5. **Single World canvas** — never one canvas per section.

---

## 1. Preloader  ("Calibrating the portal")

- **Goal:** mask load, set tone, become the first portal into Hero. < 2.5s; hard timeout fallback.
- **Layout:** full-screen ink; centered brand mark (the existing spider-glyph SVG, re-styled as an
  abstract emblem — NOT Marvel) + name "ANURAG VERMA" in splash type; thin progress rail using rift
  gradient; mono counter `00 → 100`.
- **Motion:** counter ticks with real progress (Drei `useProgress` + font/image ready). At 100 →
  portal crossing (chromatic split + iris wipe) reveals Hero.
- **3D/World:** World canvas warms up behind the curtain; portal disc spins up.
- **Responsive:** identical everywhere (cheap). Reduced-motion → simple fade, no glitch.
- **Preserve:** brand name; favicon/title.
- **Acceptance:** never blocks > timeout; hero text painted before curtain lifts; no FOUC.

---

## 2. Hero  ("Dimension 01 — Arrival")

- **Goal:** instant identity + credibility; showcase the **floating photo card** and the **portal**;
  the cinematic first impression.
- **Layout (desktop):** asymmetric split. Left: eyebrow `FOUNDER @ OPPORTUNITYX`, **massive** stacked
  name `ANURAG / VERMA` (splash type, rift gradient + chromatic offset), typing subtitle, lead
  paragraph, two CTAs, stat row. Right: **floating photo card** in front of the live **portal**.
- **Content (doc 00 §1):**
  - Eyebrow: "Founder @ OpportunityX"
  - H1: ANURAG VERMA
  - Subtitle (typing, preserve): "Building products for students with AI/ML & Full Stack Web."
  - Lead: the Jan-2026 / OpportunityX paragraph (preserve wording).
  - CTAs: **Explore Projects** (→#projects, portal jump) · **View OpportunityX**
    (→ https://opportunity-x.vercel.app).
  - Stats (count-up, preserve): Startups 2+ · Projects 5+ · Core Stack AI/ML · Status Live.
- **Motion:** staggered blur-up reveal of left column (preserve variants/timing). Name does a subtle
  chromatic breathe at idle. Scroll-down cue. On scroll out, hero parallaxes/zooms toward the portal
  (the "fall through" beat).
- **3D/World:** the **Portal** is centered behind the photo; particle field + web filaments drift;
  pointer parallax on world. Photo card floats above with 3D tilt (preserve mechanic) + gyro on mobile.
- **Floating photo card spec:** `/portrait3.jpg` in a comic-panel/ID frame, ink+neon border, idle
  float (preserve `y:[0,-10,0]` 6s), pointer tilt (preserve spring), 2–3 floating badges (re-themed:
  "STARTUP BUILDER", "5+ PRODUCTS", "AI/ML"), grayscale→color on hover, halftone edge. Lives at
  elevation 3 with z-translation.
- **Responsive:** mobile stacks (name → photo → CTAs → stats); photo card smaller but still floats &
  tilts (gyro); portal becomes a CSS radial glow if `lowPower`.
- **Preserve:** name, subtitle text, lead copy, CTA targets, count-up stats, tilt + float mechanics.
- **Acceptance:** LCP text visible < 1.5s; 60fps idle on desktop; photo never gated by 3D; reduced-
  motion kills breathe/parallax but keeps a clean static hero.

---

## 3. About  ("Dimension 02 — Origin")

- **Goal:** tell the high-velocity, non-traditional story without duplicating the Journey timeline.
- **Layout:** editorial two-column. Left: large pull-quote / narrative set in headline type with key
  words accented; small identity card (name, "Founder & Developer", the 3 facts: 2026 Coding Start ·
  AI/ML Focus · FastAPI+React stack). Right: the long bio as flowing lead paragraphs with scroll-
  reveal line-by-line, plus a compact "by the numbers" strip.
- **Content (doc 00 §1):** the verbatim long bio; the pull-quote "A non-traditional path built on
  high-velocity learning." Facts strip: 2026 / AI·ML / FastAPI+React.
- **Motion:** word/line mask-reveal on the pull-quote (GSAP SplitText-style via spans); paragraphs
  fade-up on enter; numbers count up. No pin.
- **3D/World:** world dims slightly, accent lerps to **blue**; faint halftone parallax; maybe a slow
  drifting web filament responding to scroll.
- **Responsive:** single column; pull-quote scales via clamp; reveals simplified on mobile.
- **Preserve:** full bio text and the three facts. **De-duplicate:** the 6 dated points currently in
  About move/merge into Journey (canonical). About keeps narrative, not a second dated list.
- **Acceptance:** bio readable, no timeline duplication, AA contrast, reduced-motion shows static text.

---

## 4. Skills  ("Dimension 03 — Abilities")

- **Goal:** communicate technical range fast; feel like a "power grid" of abilities.
- **Layout:** massive section splash ("CAPABILITIES" / "ENGINEERING CAPABILITIES"), then a responsive
  grid of 12 glass skill cards (3-col desktop / 2 tablet / 1–2 mobile). Each card: lucide icon, name,
  category pill, one-liner, accent glow keyed to the skill color.
- **Content (doc 00 §4):** all 12 skills with exact name / category / color / one-liner.
- **Motion:** staggered fade-up grid (preserve 0.08 stagger); per-card pointer tilt + glow-follow
  (preserve); idle float per card (preserve `floatDelay`); on section enter, optional "power-on"
  sweep where cards light up in sequence. Accent line grows on hover (preserve).
- **3D/World:** accent lerps **blue↔violet**; particles tint; optional: hovered skill emits a small
  burst in the world behind it (cheap, desktop only).
- **Responsive:** grid collapses; tilt via touch; floats reduced on `lowPower`; glow-follow → static
  glow on touch.
- **Preserve:** all 12 skills + colors + categories; tilt/glow/float mechanics.
- **Acceptance:** all 12 present & legible; grid reflows cleanly; 60fps with 12 animated cards
  (use transform/opacity only).

---

## 5. Projects  ("Dimension 04 — The Work")  ★ recruiter priority

- **Goal:** the centerpiece. Interactive, premium project showcases. This is what recruiters came for.
- **Layout decision (pick at build, recommendation = A):**
  - **A — Pinned dimensional stack (recommended):** a pinned viewport where the 5 projects advance as
    "dimension panels." Scroll scrubs one project out and the next in via a portal beat; each panel =
    big project number `01–05`, title (splash), tagline, description, feature pills, tech pills, live
    CTA, and a stylized device/preview frame. Strong storytelling, very Awwwards.
  - **B — Horizontal scroll gallery:** pinned section scrolls projects horizontally (GSAP x-scrub).
  - **C — Stacked reveal cards:** vertical, each card pins-and-releases with parallax preview (closest
    to current build; safest perf; best mobile).
  - **Hybrid plan:** A/B on desktop, **C on mobile** (no scroll-jacking on touch).
- **Content (doc 00 §3) — all 5, facts locked:** OpportunityX, Zenkai, Voxtro, MS Verma Kirana,
  Personal Portfolio. Each: title, tagline, description, 4 feature pills, tech stack, link + button
  text, accent, logo (or emoji fallback). Voxtro = non-clickable "Still Building". Portfolio tech list
  updated to R3F/GSAP/Lenis reality.
- **Project preview treatment:** keep the *idea* of rich previews but simplify — the current build
  hand-codes a full fake dashboard per project (heavy, brittle). Replace with a lighter **comic-panel
  device frame** showing logo + tagline + feature pills + accent art (or a real screenshot if the user
  later supplies one). Lower maintenance, faster, still premium.
- **Motion:** portal beat between projects; title punch-in (scale+blur); pills stagger; magnetic CTA;
  per-project accent drives the world + UI accent. Number `0X` is a giant parallax watermark.
- **3D/World:** world accent = current project's accent; portal flares on each project change;
  particles drift toward the active panel.
- **Responsive:** mobile = vertical stacked cards (option C), no pin, fast fades; previews scale down;
  all 5 fully present with working links.
- **Preserve:** every project fact, link, button label, accent, logo, Voxtro's no-link state.
- **Acceptance:** all 5 present & accurate; links open correct URLs in new tab; Voxtro non-clickable;
  smooth on desktop; **no scroll-jank/trap on mobile**; recruiter can reach any project in seconds.

---

## 6. Journey  ("Dimension 05 — Timeline")

- **Goal:** show trajectory and momentum across Jan→Jul 2026 — the "spider-web of milestones."
- **Layout:** vertical timeline with a glowing rift spine (evolve current). Each node: date tag (mono),
  title (headline), description (glass card with tilt). Optionally reframe the spine as a web-thread
  that "draws" as you scroll.
- **Content (doc 00 §5):** all 7 milestones, exact dates/titles/descriptions, chronological.
- **Motion:** the spine **draws on scroll** (SVG path `drawSVG`-style via stroke-dashoffset + GSAP
  scrub); nodes pop in on enter (preserve stagger + spring); card tilt preserved; active node pulses.
- **3D/World:** accent lerps **violet↔red**; faint web filaments echo the timeline spine in 3D.
- **Responsive:** single-column timeline left-aligned (preserve); spine draw still works; tilt via
  touch; reduced-motion → spine fully drawn, nodes fade in.
- **Preserve:** all 7 milestones verbatim; node/card structure; chronological order.
- **Acceptance:** all 7 present & ordered; spine draw stays in sync with scroll; legible on mobile.

---

## 7. Contact  ("Dimension 06 — Open a Channel")

- **Goal:** convert. Make reaching out feel like opening a portal/comm-link. **Do not break the form.**
- **Layout:** two columns (preserve). Left: headline "START A CONVERSATION" (splash), the magnet copy,
  3 social link rows (GitHub / LinkedIn / Email), the "under 4 hours" micro-quote. Right: the glass
  contact form (name / email / message) + transmit button.
- **Content (doc 00 §6):** exact copy, all socials, the FormSubmit endpoint and 3-state logic
  (success / activation-required / error), success + activation messages, placeholders, button labels
  ("Transmit Message" / "Transmitting...").
- **Motion:** form fields stagger-reveal; focus states glow with accent; submit → "transmission" beat
  (a small portal/energy pulse) then the success state (preserve checkmark + messages). Magnetic submit
  button.
- **3D/World:** accent **red↔blue**; portal motif behind the form as a "channel"; calm, not noisy.
- **Responsive:** stacks (copy+socials → form); large tap targets; form fully keyboard-usable.
- **Preserve:** **the entire FormSubmit submit handler, all three response branches, all messages,
  field validation, and the activation-required flow — verbatim.** This is real working behavior.
- **Acceptance:** form posts to the correct endpoint; all three states render correctly; socials open
  correct URLs; reduced-motion keeps full functionality.

---

## 8. Footer  (Exit portal)

- **Goal:** clean close + final links + back-to-top.
- **Layout:** brand mark + "Student Founder & Web Architect"; X + Instagram icons; centered copyright;
  back-to-top button (portal jump to hero).
- **Content (doc 00 §6):** X → https://x.com/TheOpportunityX ; Instagram →
  https://www.instagram.com/pandaxchahat ; copyright "© 2026 Anurag Verma. All rights reserved.
  Made in record speed."; tagline "Student Founder & Web Architect".
- **Motion:** subtle reveal; back-to-top triggers an upward portal crossing; optional large ghost
  wordmark "ANURAG VERMA" as parallax backdrop.
- **3D/World:** world fades toward void; portal gives a closing flare on back-to-top.
- **Responsive:** stacks centered (preserve).
- **Preserve:** all socials, copyright text, tagline, back-to-top.
- **Acceptance:** links correct; back-to-top scrolls to hero; year shows 2026.

---

## 9. Navigation (overlay, all sections)

- **Goal:** orientation + fast travel between dimensions.
- **Layout:** floating top-center pill (evolve current). Brand glyph + ANURAG.VERMA; links Home/About/
  Skills/Projects/Journey/Contact; "Connect" CTA. Mobile: hamburger → **full-screen** dimensional menu.
- **Motion:** entrance drop-in (preserve); shared-layout active pill (preserve `layoutId`); on scroll,
  glass intensifies (preserve `scrolled`). Active section via **ScrollTrigger** (replace manual scroll
  listener). Link click = portal jump + Lenis `scrollTo` + focus target heading.
- **Responsive:** desktop pill; mobile full-screen overlay with staggered big links + CTA.
- **Preserve:** link set, brand, Connect CTA, active-pill concept.
- **Acceptance:** active state accurate; keyboard-navigable; focus moves on jump; mobile menu closes
  on select; no layout shift on scroll-morph.

---

## 10. Build Order (phased — for tomorrow)

| Phase | Deliverable | Why first |
|---|---|---|
| **P0 Foundation** | tokens/Tailwind theme, `data/*`, Lenis+ScrollTrigger sync, capability gate, SectionShell, Grain/Halftone, GlassCard/Pill/Eyebrow/MagneticButton | everything depends on these |
| **P1 World** | single `<World/>` canvas: ParticleField (Maath), Portal shader, Effects (bloom/CA/vignette), sceneController (scroll→camera→accent), mobile/`lowPower` fallback | the signature layer; validate perf early |
| **P2 Transitions** | PortalTransition overlay + reduced-motion fade; Nav with ScrollTrigger active + portal jumps; ScrollProgress; Cursor | the connective tissue |
| **P3 Hero** | Hero + floating photo card + portal integration | hardest/highest-impact section; proves the system |
| **P4 Content sections** | About → Skills → Journey (reuse SectionShell + variants) | repeatable patterns |
| **P5 Projects** | the showcase (decide layout A/C); per-project accent wiring | centerpiece, most logic |
| **P6 Contact + Footer** | port form logic verbatim; footer | convert + close |
| **P7 Polish** | reduced-motion/no-WebGL/lowPower passes, Lighthouse, 60fps profiling, SEO/meta, cross-device QA, teardown of old files | ship quality |

---

## 11. Open Decisions (resolve before/at P5)

1. **Projects layout:** A (pinned dimensional stack, recommended) vs B (horizontal) vs C (stacked).
   Hybrid (A desktop / C mobile) is the default recommendation.
2. **Display font:** Anton (recommended) vs Archivo Black vs Clash Display for the splash type.
3. **Project previews:** lightweight comic-panel frames (recommended) vs real screenshots (needs
   assets from user) vs keep the hand-coded mini-dashboards (heaviest).
4. **Custom cursor:** include comic reticle (desktop) or skip for minimalism.
5. **`spiderverse.html` second entry:** delete after merge, or keep as standalone demo.

> These are the only choices that change the build meaningfully. Defaults are chosen so work can start
> even without answers; flag them at approval time.
