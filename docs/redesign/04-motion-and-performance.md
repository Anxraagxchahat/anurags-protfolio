# 04 — Motion Design & Performance Spec

> The technical contract for "motion-design-first" + "60fps". Pairs with doc 02 (motion aesthetic)
> and doc 03 (per-section motion). This is the reference for *how* motion is wired and how perf is held.

---

## 1. Animation Tech Ownership (who drives what)

| Concern | Tool | Notes |
|---|---|---|
| Smooth scroll | **Lenis** | single source of scroll truth |
| Scroll-linked timelines, pins, scrub | **GSAP + ScrollTrigger** | `gsap.registerPlugin(ScrollTrigger)` |
| Enter/exit, micro-interactions, layout | **Framer Motion** | reveals, hovers, `layoutId` nav pill, AnimatePresence |
| 3D scene, camera, particles | **R3F + Drei + Maath** | `useFrame`; Maath for distribution/easing |
| Post FX | **@react-three/postprocessing** | bloom, chromatic aberration, vignette |
| Text splitting | GSAP (manual span split) | avoid paid SplitText; DIY spans |

**Boundary rule:** never animate the same property with two libraries. Framer = DOM
enter/hover/layout. GSAP = scroll-scrubbed and pinned. R3F = canvas. Lenis only scrolls.

---

## 2. The Single RAF Loop (critical for 60fps)

One animation frame drives everything; do **not** run competing RAFs.

```
Lenis.on('scroll', ScrollTrigger.update)          // ScrollTrigger reads Lenis
gsap.ticker.add((t) => lenis.raf(t * 1000))       // GSAP ticker drives Lenis
gsap.ticker.lagSmoothing(0)                        // consistent scrub
// R3F: drive frameloop="demand" or share the clock; invalidate on scroll/interaction
```
- Prefer R3F `frameloop="demand"` + `invalidate()` on scroll/pointer so the canvas isn't rendering
  every frame when idle (huge battery/perf win), OR keep `always` only while in viewport.
- Pause canvas when tab hidden (`document.hidden`) and when World is fully scrolled past.

---

## 3. Shared Motion Tokens (centralize in `lib/motion.js`)

### Easings
| Name | Curve | Use |
|---|---|---|
| `expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | reveals (already used) |
| `punch` | `power4.out` (GSAP) | portal/title punch-in |
| `glide` | `power2.inOut` | parallax, camera |
| `sine` | `sine.inOut` | idle floats |

### Durations
- Reveal 0.6–0.9s · Portal 0.6–0.9s · Hover 0.2–0.3s · Idle loop 4–8s · Stagger 0.06–0.15s.

### Canonical variants (preserve current feel)
- `fadeUpBlur`: `{ y:50, opacity:0, filter:'blur(10px)' } → { y:0, opacity:1, filter:'blur(0)' }`,
  spring `{ damping:20, stiffness:60, mass:0.8 }`.
- `staggerContainer`: `staggerChildren` 0.08–0.15, optional `delayChildren`.
- `scaleIn`: `{ scale:0.8, opacity:0 } → { scale:1, opacity:1 }` spring.
- Tilt spring: `{ damping:25, stiffness:150 }` (preserve across Hero/Skills/Projects/Journey).

---

## 4. Portal Transition (signature) — mechanics

Sequence (~700ms, `punch` easing):
1. `0–120ms` chromatic split: clone outgoing heading into R & B layers, offset ±6–10px, snap back.
2. `100–400ms` iris/hex wipe overlay in section accent (clip-path circle or shader).
3. `200–350ms` glitch slices on outgoing heading (3–4 horizontal clip bands jitter).
4. `350–700ms` incoming heading punch: `scale 1.08→1`, `blur 8→0`, `opacity 0→1`.
- World portal disc flares in sync (emissive + scale pulse) via shared timeline event.
- **Reduced-motion:** replace entire sequence with a 250ms cross-fade; no glitch, no chromatic, no
  scale. Same for `lowPower`.
- Implementation: a single reusable component + a `playPortal(accent, direction)` function on a
  context so Nav jumps and section seams reuse it.

---

## 5. 3D World Performance Budget

| Knob | Desktop | Tablet | Mobile / lowPower |
|---|---|---|---|
| DPR | `[1, 1.75]` | `[1, 1.5]` | `1` (or CSS fallback) |
| Particles | 6–10k | 3–5k | 0–1k or none |
| Web filaments | yes | reduced | none |
| Portal shader | full | full | simplified / CSS radial |
| Bloom | on (low threshold, restrained) | on | off |
| Chromatic aberration | on (tiny) | off | off |
| Frameloop | demand/invalidate | demand | static fallback |

Rules:
- One `<Canvas>` only. One particle geometry (BufferGeometry, `Points`), updated by shader/uniform,
  not by rebuilding arrays per frame.
- Use **instancing/Points**, never thousands of meshes. Maath `inSphere`/`inBox` for distribution;
  `maath/easing.damp3` for camera/accent lerps (frame-rate independent).
- No per-frame allocations in `useFrame` (reuse vectors). No React state changes per frame.
- Lazy-mount World after first paint; `<Suspense>` around 3D; hero DOM never waits on it.
- Postprocessing: minimum passes; combine where possible; bloom threshold high enough to avoid haze.

---

## 6. DOM / React Performance

- Animate only **`transform`** and **`opacity`** (+ `filter: blur` sparingly). Never animate
  layout-affecting props (width/height/top/left/margin) on scroll.
- `will-change: transform` only on actively-animating elements; remove after.
- Lazy-load below-the-fold sections (`React.lazy` + Suspense) and the Projects previews.
- `content-visibility: auto` on long offscreen sections where safe.
- Memoize heavy lists (skills/projects/journey) and tilt handlers; throttle pointer-move with RAF.
- Images: `/portrait3.jpg` and logos served with explicit width/height (no CLS), `loading="lazy"`
  except the hero photo (eager + high priority). Consider AVIF/WebP variants at build.
- Fonts: `display:swap`, preconnect to Google Fonts (or self-host for best LCP), subset to used weights.
- Keep the count-up and typing effects cleanup-safe (clear intervals on unmount — already done; preserve).

---

## 7. Accessibility-Driven Motion Gates (`lib/useReducedMotion`)

Returns `{ reducedMotion, lowPower, webgl, save Data }` from:
- `matchMedia('(prefers-reduced-motion: reduce)')`
- `matchMedia('(prefers-reduced-data: reduce)')` + `navigator.connection.saveData`
- WebGL capability probe (no context → CSS-only fallback world)
- heuristic `lowPower` (mobile UA + low `hardwareConcurrency`/`deviceMemory`)

Every animated component reads this and degrades:
| Signal | Effect |
|---|---|
| `reducedMotion` | portals→fade; kill parallax scrub, idle floats, chromatic, glitch, count-up→instant |
| `lowPower` | particle counts down/off; bloom off; tilt simplified; portal→fade |
| `!webgl` | World = static CSS gradient + grain; no canvas |
| `saveData` | static background; lazy everything; no autoplay loops |

Reduced-motion must remain **visually complete** — a calm, premium static version, not broken.

---

## 8. Performance Targets & QA Gates

| Metric | Target |
|---|---|
| Desktop FPS (scroll + idle) | ~60 |
| Mobile FPS (scroll) | ≥ 50, no jank/trap |
| Lighthouse Performance (mobile) | ≥ 85 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO / Best Practices | ≥ 95 |
| LCP | < 2.5s (hero text/photo) |
| CLS | < 0.05 |
| TBT | < 200ms |
| Initial JS (gz, excl. 3D chunk) | keep lean; code-split Three into its own chunk |

QA checklist before "done":
- [ ] Profile scroll with DevTools Performance — no long frames during portals.
- [ ] Test reduced-motion, no-WebGL, and saveData paths render fully usable.
- [ ] Real mid-range Android + iOS Safari pass (no scroll-jacking, gyro tilt sane, menus close).
- [ ] Keyboard-only run-through (nav, jumps, form).
- [ ] Verify every preserved fact/link from doc 00.
- [ ] Tab-hidden + scrolled-past → canvas paused.

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Over-pinning → janky/slow feel | strict pin budget (doc 01 §3); portals are short |
| Lenis ↔ ScrollTrigger desync | single RAF wiring (§2); test early in P0 |
| 3D tanks mobile | capability gate + CSS fallback; validate in P1 before building on it |
| Bloom washes out text | high threshold, content layer never behind heavy bloom |
| Theme drifts to "fan site" | doc 02 §10 guardrails; abstract portal, no IP |
| Heavy hand-coded project mockups | switch to lightweight comic-panel frames (doc 03 §5) |
| Scope creep on transitions | one reusable PortalTransition; reuse everywhere |
