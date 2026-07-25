export default function SvgIcon({ name, size = 24, color }) {
  return (
    <span
      role="none"
      style={{ color: color === 'inherit' ? 'inherit' : color || 'var(--color-primary-main)', display: 'inline-block' }}
    >
      <svg
        className={name}
        width={size}
        height={size}
        fill="var(--color-text-primary)"
        stroke="var(--color-text-primary)"
        strokeWidth={1.5}
        style={{ verticalAlign: 'middle', display: 'block' }}
      />
    </span>
  );
}
