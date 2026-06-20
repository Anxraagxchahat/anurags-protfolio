// ============================================================
// theme.js — centralized design tokens + section→accent mapping (doc 02 §2, §9).
// Pure / framework-agnostic (no React, no three) so DOM components, the World
// layer, and sceneController can all share one source of truth.
// ============================================================

// Core palette
export const COLORS = {
  ink: '#020205',
  ink800: '#07070C',
  ink700: '#0C0D14',
  paper: '#F4F5F7',
  paperDim: '#9CA3AF',

  spiderRed: '#E23636',
  spiderRedLight: '#FF4D6D',
  spiderBlue: '#38BDF8',
  spiderBlueDeep: '#0284C7',
  spiderViolet: '#A855F7',
  spiderAmber: '#FBBF24',
  spiderEmerald: '#34D399',
  spiderPink: '#EC4899',
};

// Section → primary accent (the "which dimension am I in" signal, doc 02 §2)
export const SECTION_ACCENTS = {
  preloader: COLORS.spiderRed,
  hero: COLORS.spiderRed,
  about: COLORS.spiderBlue,
  skills: COLORS.spiderViolet, // skills lean blue↔violet; portal/world = violet
  projects: COLORS.spiderRed,  // overridden per-project at runtime
  journey: COLORS.spiderViolet,
  contact: COLORS.spiderRed,
  footer: COLORS.spiderRed,
};

// Secondary accent (for the rift split / glow-2)
export const SECTION_ACCENTS_2 = {
  preloader: COLORS.spiderBlue,
  hero: COLORS.spiderBlue,
  about: COLORS.spiderBlueDeep,
  skills: COLORS.spiderBlue,
  projects: COLORS.spiderBlue,
  journey: COLORS.spiderRed,
  contact: COLORS.spiderBlue,
  footer: COLORS.spiderBlue,
};

export const RIFT_GRADIENT = 'linear-gradient(120deg, #E23636, #A855F7, #38BDF8)';
export const PORTAL_GRADIENT =
  'radial-gradient(circle, #38BDF8 0%, #A855F7 40%, #E23636 75%, transparent 100%)';

/** Primary accent hex for a section (falls back to spider-red). */
export function getSectionAccent(section) {
  return SECTION_ACCENTS[section] ?? COLORS.spiderRed;
}

/** Secondary accent hex for a section. */
export function getSectionAccent2(section) {
  return SECTION_ACCENTS_2[section] ?? COLORS.spiderBlue;
}

/**
 * Write a section's accent onto a DOM element as CSS custom properties.
 * SectionShell uses this so every descendant reads --accent / --accent-2.
 */
export function applyAccent(el, section, override) {
  if (!el) return;
  el.style.setProperty('--accent', override ?? getSectionAccent(section));
  el.style.setProperty('--accent-2', getSectionAccent2(section));
}

export default { COLORS, SECTION_ACCENTS, getSectionAccent, getSectionAccent2, applyAccent };
