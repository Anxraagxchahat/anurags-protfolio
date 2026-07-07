import { motion } from 'framer-motion';
import { useMagnetic } from '../../lib/useMagnetic';

/**
 * Magnetic button / link. Renders an <a> when `href` is set, otherwise a
 * <button>. Two visual variants:
 *   - primary   → aurora-gradient fill with a shine sweep
 *   - secondary → liquid glass with an aurora hairline on hover
 * Magnetism is disabled on touch / reduced motion via `disabled`.
 */
export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  disabled = false,
  className = '',
  icon = null,
  ...rest
}) {
  const magnet = useMagnetic({ strength: 0.4, disabled });

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

  const variants = {
    primary:
      'text-white shadow-[0_10px_40px_rgba(99,102,241,0.30)] hover:shadow-[0_16px_50px_rgba(99,102,241,0.42)]',
    secondary:
      'glass-card text-ink hover:text-ink neon-border',
  };

  const content = (
    <>
      {variant === 'primary' && (
        <>
          <span
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--rift-gradient)', backgroundSize: '200% 100%' }}
          />
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-white/30 blur-md -skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-[300%]" />
          </span>
        </>
      )}
      <span className="relative flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        style={magnet.style}
        {...magnet.bind}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={cls} style={magnet.style} {...magnet.bind} {...rest}>
      {content}
    </motion.button>
  );
}
