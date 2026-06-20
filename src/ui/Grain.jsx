// ============================================================
// Grain — global animated film-grain overlay (doc 02 §4).
// Fixed, full-viewport, aria-hidden, pointer-events-none. Animation is killed
// under reduced-motion via CSS; under saveData we drop it entirely.
// ============================================================

import { useCapabilities } from '../lib/useReducedMotion';

export default function Grain({ opacity }) {
  const { saveData } = useCapabilities();
  if (saveData) return null;

  return (
    <div
      aria-hidden="true"
      className="grain-fixed"
      style={opacity != null ? { opacity } : undefined}
    />
  );
}
