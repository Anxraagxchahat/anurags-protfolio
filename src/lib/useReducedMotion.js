// ============================================================
// useReducedMotion.js — the capability gate (doc 04 §7).
// Returns { reducedMotion, lowPower, webgl, saveData, tier } and keeps it live
// (re-evaluates on media-query + resize changes). Every motion/3D feature reads
// this and degrades. A CapabilityProvider computes once and shares via context;
// useReducedMotion() works standalone too.
//
//   reducedMotion → portals→fade, kill parallax/idle/chromatic/glitch, instant count-up
//   lowPower      → fewer/zero particles, bloom off, simplified tilt, portal→fade
//   !webgl        → World = static CSS gradient + grain (no canvas)
//   saveData      → static background, lazy everything, no autoplay loops
// ============================================================

import { createContext, createElement, useContext, useEffect, useState } from 'react';

// ── Probes ───────────────────────────────────────────────────

function probeWebGL() {
  if (typeof window === 'undefined') return true; // assume yes during SSR
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function probeSaveData() {
  if (typeof navigator === 'undefined') return false;
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!c) return false;
  if (c.saveData) return true;
  // Treat very slow links as save-data too
  if (typeof c.effectiveType === 'string' && /(^|-)2g$/.test(c.effectiveType)) return true;
  return false;
}

function probeReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function probeReducedData() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  // Not all browsers support this; harmless if unmatched
  try {
    return window.matchMedia('(prefers-reduced-data: reduce)').matches;
  } catch {
    return false;
  }
}

function probeLowPower() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua);
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8; // GB (Chromium only)
  // Mobile + thin hardware, or any device clearly memory/CPU constrained
  return (isMobileUA && (cores <= 4 || mem <= 4)) || cores <= 2 || mem <= 2;
}

// Experience tier from viewport width (doc 01 §6): desktop ≥1024, tablet 640–1023, mobile <640
function probeTier() {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w >= 1024) return 'desktop';
  if (w >= 640) return 'tablet';
  return 'mobile';
}

function computeCapabilities() {
  return {
    reducedMotion: probeReducedMotion(),
    saveData: probeReducedData() || probeSaveData(),
    webgl: probeWebGL(),
    lowPower: probeLowPower(),
    tier: probeTier(),
  };
}

// SSR-safe defaults (full experience assumed until probed on the client)
const DEFAULTS = {
  reducedMotion: false,
  saveData: false,
  webgl: true,
  lowPower: false,
  tier: 'desktop',
};

// ── Hook ─────────────────────────────────────────────────────

/**
 * Standalone capability hook. Prefer useCapabilities() under a
 * CapabilityProvider so this is computed once for the whole app.
 */
export function useReducedMotion() {
  // Client-only SPA (no SSR): read real capabilities lazily on first render.
  const [caps, setCaps] = useState(() =>
    typeof window === 'undefined' ? DEFAULTS : computeCapabilities(),
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    // Subscribe for changes (media-query / resize / connection). The initial
    // value already came from the lazy useState initializer above.
    const recompute = () => setCaps(computeCapabilities());

    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rdQuery = null;
    try {
      rdQuery = window.matchMedia('(prefers-reduced-data: reduce)');
    } catch {
      rdQuery = null;
    }

    // matchMedia change + resize (tier) + connection change (saveData)
    const add = (mq) => mq && (mq.addEventListener ? mq.addEventListener('change', recompute) : mq.addListener(recompute));
    const remove = (mq) => mq && (mq.removeEventListener ? mq.removeEventListener('change', recompute) : mq.removeListener(recompute));

    add(rmQuery);
    add(rdQuery);
    window.addEventListener('resize', recompute, { passive: true });
    const conn = navigator.connection;
    if (conn && conn.addEventListener) conn.addEventListener('change', recompute);

    return () => {
      remove(rmQuery);
      remove(rdQuery);
      window.removeEventListener('resize', recompute);
      if (conn && conn.removeEventListener) conn.removeEventListener('change', recompute);
    };
  }, []);

  return caps;
}

// ── Context (compute once, share everywhere) ─────────────────

const CapabilityContext = createContext(DEFAULTS);

export function CapabilityProvider({ children }) {
  const caps = useReducedMotion();
  return createElement(CapabilityContext.Provider, { value: caps }, children);
}

/** Read capabilities from context (must be under <CapabilityProvider>). */
export function useCapabilities() {
  return useContext(CapabilityContext);
}

export default useReducedMotion;
