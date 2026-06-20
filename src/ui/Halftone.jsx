// ============================================================
// Halftone — Ben-Day dot texture layer (doc 02 §4).
// Absolutely-positioned, aria-hidden, very low opacity. Optional parallax drift
// (killed under reduced-motion via the .halftone-drift CSS guard).
// `accent` tints the dots; `size` sets the dot grid.
// ============================================================

export default function Halftone({
  accent,
  size = 6,
  opacity,
  drift = true,
  className = '',
  style = {},
}) {
  const color = accent
    ? `color-mix(in srgb, ${accent} 50%, transparent)`
    : 'color-mix(in srgb, var(--accent) 45%, transparent)';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 halftone ${drift ? 'halftone-drift' : ''} ${className}`}
      style={{
        '--halftone-size': `${size}px`,
        '--halftone-color': color,
        ...(opacity != null ? { opacity } : null),
        ...style,
      }}
    />
  );
}
