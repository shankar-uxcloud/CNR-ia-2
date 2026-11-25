const HEADING_CLASSES = {
  3: 'five-mark-answer-title',
  4: 'five-mark-section-title',
  5: 'five-mark-subsection-title',
  6: 'five-mark-minor-title',
};

export default function FiveMarkHeading({ level, className = '', children, ...props }) {
  const safeLevel = Math.min(6, Math.max(3, Number(level) || 3));
  const Tag = `h${safeLevel}`;
  const roleClass = HEADING_CLASSES[safeLevel];
  return (
    <Tag className={[
      'five-mark-heading',
      `five-mark-heading--level-${safeLevel}`,
      roleClass,
      className,
    ].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  );
}
