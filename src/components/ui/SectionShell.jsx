import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';
import { EASE, VIEWPORT, staggerContainer, fadeUp } from '../../lib/motion';

/**
 * Standard section frame: mono eyebrow, oversized splash heading (with an
 * optional aurora-gradient accent word), an aurora divider, and children.
 * Keeps rhythm, spacing, and reveal choreography consistent across sections.
 */
export default function SectionShell({
  id,
  eyebrow,
  title,
  accent,
  intro,
  align = 'left',
  className = '',
  headingClassName = '',
  children,
}) {
  const aligned = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className={`mb-14 flex flex-col gap-5 md:mb-20 ${aligned}`}
        >
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow animate={false}>{eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className={`text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl md:text-6xl ${headingClassName}`}
          >
            {title}
            {accent && <span className="aurora-text"> {accent}</span>}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className={`h-[3px] w-20 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
            style={{ background: 'var(--rift-gradient)' }}
          />

          {intro && (
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-pretty text-base leading-relaxed text-ink-mute md:text-lg"
            >
              {intro}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE.expo }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
