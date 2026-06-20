// ============================================================
// sceneController.js — maps scroll/section → camera & accent (doc 03 §0).
// A tiny singleton store the World reads inside its single useFrame loop.
// No RAF of its own; values are damped frame-rate-independently in updateScene().
//
// Decoupling: DOM (SectionShell.onEnter / Lenis scroll) PUSHES state in via
// setScroll/setSection; the canvas PULLS it out in useFrame. The World stays the
// only place that runs an animation loop.
// ============================================================

import * as THREE from 'three';
import { getSectionAccent } from '../lib/theme';

const initialAccent = new THREE.Color(getSectionAccent('hero'));

export const sceneState = {
  scrollProgress: 0, // 0..1 over the whole page
  activeSection: 'hero',
  accent: initialAccent.clone(), // current (damped) world accent
  accentTarget: initialAccent.clone(), // section's target accent
  portalFlare: 0, // 0..1 transient flare on portal crossings
  pointer: new THREE.Vector2(0, 0), // -1..1 for parallax
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Page scroll progress (0..1). Pushed by Lenis (P2) or World's scroll listener. */
export function setScroll(progress) {
  sceneState.scrollProgress = clamp01(progress);
}

/** Active section name → re-targets the world accent (SectionShell.onEnter). */
export function setSection(name) {
  if (name === sceneState.activeSection) return;
  sceneState.activeSection = name;
  sceneState.accentTarget.set(getSectionAccent(name));
}

/** Override the target accent directly (e.g. per-project accent in Projects). */
export function setAccent(hexOrColor) {
  sceneState.accentTarget.set(hexOrColor);
}

/** Pointer position in -1..1 space for world parallax. */
export function setPointer(x, y) {
  sceneState.pointer.set(x, y);
}

/** Kick a portal flare (decays back to 0 in updateScene). */
export function flarePortal(amount = 1) {
  sceneState.portalFlare = Math.max(sceneState.portalFlare, amount);
}

/**
 * Advance damped values. Called once per frame from World's useFrame.
 * THREE.MathUtils.damp is frame-rate independent (doc 04 §5).
 */
export function updateScene(dt) {
  const d = Math.min(dt, 0.1); // guard against tab-restore dt spikes
  sceneState.accent.r = THREE.MathUtils.damp(sceneState.accent.r, sceneState.accentTarget.r, 3, d);
  sceneState.accent.g = THREE.MathUtils.damp(sceneState.accent.g, sceneState.accentTarget.g, 3, d);
  sceneState.accent.b = THREE.MathUtils.damp(sceneState.accent.b, sceneState.accentTarget.b, 3, d);
  sceneState.portalFlare = THREE.MathUtils.damp(sceneState.portalFlare, 0, 10, d);
}

export default sceneState;
