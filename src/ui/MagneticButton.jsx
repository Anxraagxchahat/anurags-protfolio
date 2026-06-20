// ============================================================
// MagneticButton — primary (rift-gradient + shine sweep) / secondary (glass +
// neon border) CTA with desktop-only magnetic pull (doc 02 §5, doc 01 §5).
// Renders an <a> when `href` is set, else a <button>. Magnetic disables under
// reduced-motion / lowPower / touch via the capability gate.
// ============================================================

import { motion } from 'framer-motion';
import { useMagnetic } from '../lib/useMagnetic';
import { useCapabilities } from '../lib/useReducedMotion';

export default function MagneticButton({
  children,
  href,
  onClick,
  kind = 'primary',
  external = false,
  icon = null,
  className = '',
  strength = 0.35,
  ...rest
}) {
  const { reducedMotion, lowPower, tier } = useCapabilities();
  const disabled = reducedMotion || lowPower || tier === 'mobile';
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic({ strength, disabled });

  const primary =
    'bg-rift bg-[length:200%_100%] text-white shadow-[0_4px_30px_rgba(226,54,54,0.35)] hover:brightness-110';
  const secondary =
    'glass-card neon-border text-white border-white/10 hover:bg-white/[0.08] hover:border-white/20';

  const cls =
    `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full ` +
    `px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ` +
    `${kind === 'primary' ? primary : secondary} ${className}`;

  const inner = (
    <>
      {/* Animated shine sweep (primary) */}
      {kind === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </>
  );

  const common = { ref, style, onMouseMove, onMouseLeave, className: cls, ...rest };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
        {...common}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...common}>
      {inner}
    </motion.button>
  );
}
