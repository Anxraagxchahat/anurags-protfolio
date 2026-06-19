# 02 — Visual System

> The look. Builds on the UX architecture's dual-layer model. The aesthetic is **"comic-book
> dimensional noir"**: a deep ink-black multiverse, neon dimensional accents, halftone/Ben-Day
> texture, chromatic offset, and oversized editorial type — kept professional by a disciplined,
> mostly-monochrome content layer with color used as accent and signal.

---

## 1. Design Principles

1. **Content is calm, chrome is loud.** Readable surfaces stay near-monochrome and glassy; comic
   energy lives in backgrounds, transitions, and accents.
2. **Type is the hero.** Massive display type carries the cinema; 3D supports, never competes.
3. **Color = meaning.** Each section owns an accent; portals inherit it. Color signals "which
   dimension am I in."
4. **Texture, not clutter.** Halftone dots, grain, and scanlines add tactility at low opacity — felt,
   not noticed.
5. **Depth through layering + parallax,** not heavy drop shadows. Glass + glow + z-translation.
6. **Restraint = premium.** Awwwards quality is precision and pacing, not maximalism.

---

## 2. Color System

### Core palette (extends existing Tailwind tokens — keep names for low-churn migration)
| Token | Hex | Role |
|---|---|---|
| `ink` / `darkBg` | `#020205` | Page base (the void between dimensions) |
| `ink-800` | `#07070C` | Raised surfaces |
| `ink-700` | `#0C0D14` | Cards / panels base |
| `paper` | `#F4F5F7` | Primary text on dark |
| `paper-dim` | `#9CA3AF` | Secondary text |

### Dimensional accents (the Spider-Verse spectrum)
| Token | Hex | Meaning / section |
|---|---|---|
| `spider-red` (accentPurple.DEFAULT) | `#E23636` | Hero / Identity / portals |
| `spider-red-light` | `#FF4D6D` | Hot highlights, Voxtro |
| `spider-blue` (accentBlue.light) | `#38BDF8` | Skills / electric energy |
| `spider-blue-deep` (accentBlue.DEFAULT) | `#0284C7` | Gradjuated blue |
| `spider-violet` | `#A855F7` | AI / Journey portal |
| `spider-amber` | `#FBBF24` | Highlights, Next.js/Firebase |
| `spider-emerald` | `#34D399` | Success states, FastAPI |
| `spider-pink` | `#EC4899` | WebRTC / accent |

> These already exist in `tailwind.config.js` (`accentBlue`, `accentPurple`) and in the skill/project
> color data — we are formalizing them, not inventing. Keep the existing Tailwind keys aliased so
> current class names don't all break at once.

### Section → accent mapping
| Section | Primary accent | Portal color |
|---|---|---|
| Hero | spider-red | red↔blue split |
| About | spider-blue | blue |
| Skills | spider-blue + violet | violet |
| Projects | per-project accent (red/blue/pink) | inherits card |
| Journey | spider-violet | violet↔red |
| Contact | spider-red | red↔blue |

### Gradients
- **Dimensional rift:** `linear-gradient(120deg, #E23636, #A855F7, #38BDF8)` — display headings,
  progress rail, key strokes.
- **Portal core:** `radial-gradient(circle, #38BDF8 0%, #A855F7 40%, #E23636 75%, transparent)`.
- **Surface sheen:** very low-opacity white radial that follows the pointer on cards (preserve).

### Usage discipline
- Body copy: `paper` / `paper-dim` only.
- Accents: borders, glows, single words in headings, icons, pills — **not** large fills behind text.
- Never place red text on blue glow or vice versa without a glass/ink buffer (contrast + legibility).

---

## 3. Typography

> Massive, editorial, comic-splash energy. Two display options below — pick one in implementation
> (recommendation noted). All are Google-Fonts available (no licensing risk) and `font-display: swap`.

### Type roles
| Role | Recommended | Alt | Use |
|---|---|---|---|
| **Display / Splash** | **Anton** or **Archivo Black** | Bebla/Druk-like via "Oswald" heavy | Hero name, section splash words, portal labels. Ultra-bold, condensed, uppercase. |
| **Headline** | **Clash Display** (Fontshare) / **Space Grotesk** | Outfit (current) | Section titles, project names |
| **Body / UI** | **Inter** or keep **Outfit** | Plus Jakarta Sans (current) | Paragraphs, labels, form |
| **Mono / accent** | **JetBrains Mono** / **Space Mono** | — | Tags, "dimension 0X", code-y labels, timestamps |

**Recommendation:** Display = **Anton** (free, massive comic weight), Headline = **Space Grotesk**,
Body = keep **Outfit**, Mono = **Space Mono**. This keeps one current font (Outfit) for continuity
and adds two characterful free faces.

### Scale (fluid, `clamp()`)
| Step | clamp() | Use |
|---|---|---|
| Splash | `clamp(4rem, 14vw, 13rem)` | Hero name, dimension splash words |
| H1 | `clamp(2.75rem, 7vw, 6rem)` | Section titles |
| H2 | `clamp(2rem, 4vw, 3.25rem)` | Sub-headings, project titles |
| H3 | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles |
| Body-lg | `clamp(1.05rem, 1.4vw, 1.25rem)` | Lead paragraphs |
| Body | `1rem` | Default |
| Caption/Mono | `0.75rem` letter-spaced | Eyebrows, tags, "DIMENSION 04" |

### Treatments
- **Splash type:** uppercase, tight tracking (`-0.02em`), line-height `0.85`. May use the dimensional
  rift gradient OR outline/stroke text (comic ink) — one per section, not both.
- **Chromatic offset** on key display words at rest is subtle (1–2px R/B shadow), intensifying during
  portal crossings.
- **Eyebrows:** mono, uppercase, wide tracking, accent color, prefixed `// ` or `▸` or `DIMENSION 0X`.
- Body never uses display font; never all-caps for sentences (caps for labels/eyebrows only).

---

## 4. Comic / Spider-Verse Texture Kit

Subtle, layered, low-opacity. These make it "Spider-Verse" without characters.

| Element | Spec | Where |
|---|---|---|
| **Halftone / Ben-Day dots** | radial-dot pattern, 4–8px grid, 3–6% opacity, parallax-drifting | Section backgrounds, portal interiors |
| **Film grain** | animated noise, 4–5% opacity | Global overlay, fixed |
| **Scanlines / print misregistration** | faint horizontal lines + 1px CMYK offset | Portals, hero only |
| **Chromatic aberration** | R/B channel split | Headings on transition, hero idle (tiny) |
| **Comic panel borders** | thick ink strokes w/ slight rotation | Project frames, photo card, optional |
| **Action lines / speed streaks** | radial line burst | Behind portal flares, hero accent |
| **Hex / web grid** | faint hexagon or web mesh | World layer, portal ring |

Implementation note: prefer **CSS/SVG/shader** generation over image assets (crisp, themeable,
zero extra network weight). Grain & aberration as a postprocessing pass on the canvas + a CSS overlay
for DOM.

---

## 5. Surfaces, Depth & Components

### Glass system (evolve the current `.glass-card`)
- Base: `rgba(255,255,255,0.02)` + `backdrop-blur(16px)` + `1px` hairline border `rgba(255,255,255,.06)`.
- Hover: lift, accent border, accent glow shadow, pointer-following sheen (preserve current behavior).
- **New:** optional comic ink border variant (2px solid near-black with offset accent shadow → "panel").

### Elevation ladder
| Level | Treatment |
|---|---|
| 0 — World | the 3D canvas, furthest back |
| 1 — Section bg | halftone + glow blobs |
| 2 — Glass panels | cards, nav, form |
| 3 — Floating elements | photo card, badges, portal motifs (z-translate + shadow) |
| 4 — Overlays | nav, cursor, portal transition, preloader |

### Component tokens
- **Radius:** cards `1.5rem` (24px), pills `9999px`, inner media `1rem`. Comic-panel variant: `0.25rem`.
- **Borders:** hairline `1px rgba(255,255,255,.06)`; comic `2px` ink.
- **Shadows:** ambient `0 24px 60px rgba(0,0,0,.6)`; accent glow `0 0 30px <accent>/20`.
- **Buttons:** primary = rift-gradient fill + shine sweep (preserve), secondary = glass + neon border.
  All key buttons get **magnetic** behavior on desktop.
- **Pills/tags:** glass + accent text + accent hairline (preserve current look).
- **Spacing rhythm:** section vertical padding `clamp(6rem, 12vh, 10rem)`; content max-width `1200px`
  (wider than current `5xl` to give massive type room); generous whitespace between beats.

---

## 6. The 3D World — Visual Direction

A single persistent scene. **Abstract dimensional space, not a literal city or character.**

| Element | Visual | Tech intent |
|---|---|---|
| **Void + nebula** | deep ink with faint red/blue/violet volumetric haze | gradient bg + low-freq noise |
| **Particle field** | thousands of fine motes drifting in 3D, parallax by depth | R3F Points + Maath random/lerp |
| **Web filaments** | faint connecting lines / thread strands reacting to scroll & pointer | line segments, subtle |
| **The Portal** | a rotating rift disc — swirling comic gradient, hex rim, chromatic edge | shader material on a ring/plane |
| **Depth bands** | 3–4 parallax layers (far dust → mid particles → near streaks) | separate groups, scrub speeds |
| **Post FX** | bloom (restrained), chromatic aberration, vignette, optional film grain | @react-three/postprocessing |

Color of the world shifts subtly by active section (lerp toward that section's accent). Bloom stays
tasteful — glints, not glare. On mobile/reduced-data, the world collapses to a CSS gradient + grain.

---

## 7. Iconography & Imagery

- **Icons:** keep `lucide-react` (already used across skills/projects/contact) for consistency and
  crispness. Mono-line style suits the comic-ink aesthetic.
- **Photo (`/portrait3.jpg`):** framed as a floating "dimensional ID card" / comic panel. Treatment:
  duotone or grayscale→color on interaction, thin ink/neon border, parallax + tilt, optional halftone
  edge. The photo is preserved; only its frame/treatment is redesigned.
- **Project logos:** existing logos in glass chips; no logo → emoji/mark fallback (preserve pattern).
- **No Marvel imagery, characters, masks, or trademarked logos anywhere.**

---

## 8. Motion Aesthetic (visual character; mechanics in doc 04)

- **Easing:** expressive `cubic-bezier(0.16, 1, 0.3, 1)` for reveals (already in use); snappy
  `power4.out` for portal punches; gentle sine for idle floats.
- **Tempo:** reveals 0.6–0.9s; portals 0.6–0.9s; idle loops 4–8s. Nothing languid.
- **Signature beats:** chromatic split, glitch slice, scale-punch, blur-in, parallax drift,
  magnetic snap, halftone dissolve.
- **Stagger:** 0.06–0.15s children (preserve current values — they feel good).

---

## 9. Theming Tokens (to centralize in implementation)

Centralize as CSS custom properties + Tailwind theme extension so accents/section colors are
data-driven (avoids hard-coded hexes scattered in components):
```
--ink, --ink-700, --ink-800, --paper, --paper-dim
--accent (per-section, set on scroll), --accent-2
--rift-gradient, --portal-gradient
--blur-glass, --radius-card, --radius-panel
--grain-opacity, --halftone-opacity
```
Keep existing `accentBlue` / `accentPurple` Tailwind keys as aliases to ease migration from current
class names.

---

## 10. Visual "Don'ts" (guardrails)

- ❌ Spider-Man / Marvel characters, masks, suits, logos, or quotes.
- ❌ Comic effects on top of body copy (only on chrome/headings/transitions).
- ❌ Rainbow overload — max 2 accents visible in one viewport.
- ❌ Bloom/glare so strong text loses contrast.
- ❌ Cluttered maximalism; when unsure, remove.
- ❌ Motion that blocks reading or can't be reduced.
