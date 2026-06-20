// ============================================================
// Eyebrow — mono, uppercase, wide-tracked label in the section accent (doc 02 §3).
// Optional `dimension` renders the "DIMENSION 0X" comic prefix.
// Color defaults to the section's --accent CSS var (set by SectionShell).
// ============================================================

export default function Eyebrow({
  children,
  dimension,
  prefix = '▸',
  className = '',
  as: Tag = 'span',
  ...rest
}) {
  return (
    <Tag
      className={`inline-flex items-center gap-2 font-mono text-[0.7rem] sm:text-xs font-bold uppercase tracking-[0.25em] ${className}`}
      style={{ color: 'var(--accent)' }}
      {...rest}
    >
      {dimension != null && (
        <span className="text-paper-dim/70">DIMENSION {dimension}</span>
      )}
      <span aria-hidden="true" className="opacity-70">{prefix}</span>
      <span>{children}</span>
    </Tag>
  );
}
