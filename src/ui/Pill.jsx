// ============================================================
// Pill — glass + accent text + accent hairline (preserve current look, doc 02 §5).
// Used for feature tags, tech chips, category labels, status badges.
// `accent` overrides the inherited --accent (e.g. per-skill / per-project color).
// ============================================================

export default function Pill({
  children,
  accent,
  icon = null,
  className = '',
  as: Tag = 'span',
  ...rest
}) {
  const accentVar = accent || 'var(--accent)';
  return (
    <Tag
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${className}`}
      style={{
        color: accentVar,
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: `1px solid color-mix(in srgb, ${accentVar} 30%, transparent)`,
      }}
      {...rest}
    >
      {icon}
      {children}
    </Tag>
  );
}
