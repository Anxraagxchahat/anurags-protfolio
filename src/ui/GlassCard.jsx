// ============================================================
// GlassCard — the evolved .glass-card surface (doc 02 §5).
// Optional 3D pointer tilt + mouse-following sheen (preserve current mechanic,
// shared tilt spring damping:25/stiffness:150). Two variants:
//   - 'glass' (default): hairline border, backdrop blur, accent hover glow
//   - 'panel': comic ink border with offset accent shadow
// Tilt & sheen auto-disable under reduced-motion / lowPower (capability gate).
// ============================================================

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCapabilities } from '../lib/useReducedMotion';
import { SPRING } from '../lib/motion';

export default function GlassCard({
  children,
  variant = 'glass',
  tilt = false,
  tiltStrength = 6,
  glow = false,
  accent,
  className = '',
  style = {},
  ...rest
}) {
  const { reducedMotion, lowPower } = useCapabilities();
  const interactive = !reducedMotion && !lowPower;
  const useTilt = tilt && interactive;
  const useGlow = glow && interactive;

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltStrength, -tiltStrength]), SPRING.tilt);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltStrength, tiltStrength]), SPRING.tilt);

  const glowX = useSpring(useTransform(x, [0, 1], ['0%', '100%']), SPRING.tilt);
  const glowY = useSpring(useTransform(y, [0, 1], ['0%', '100%']), SPRING.tilt);
  const accentVar = accent || 'var(--accent)';
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, color-mix(in srgb, ${accentVar} 14%, transparent), transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!useTilt && !useGlow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const base =
    'relative overflow-hidden rounded-card glass-card glass-card-hover';
  const panel = 'relative overflow-hidden comic-panel bg-ink-700/60 backdrop-blur-[16px]';

  return (
    <motion.div
      onMouseMove={useTilt || useGlow ? handleMouseMove : undefined}
      onMouseLeave={useTilt || useGlow ? handleMouseLeave : undefined}
      style={{
        ...(useTilt
          ? { rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }
          : null),
        ...style,
      }}
      className={`${variant === 'panel' ? panel : base} ${className}`}
      {...rest}
    >
      {useGlow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      {children}
    </motion.div>
  );
}
