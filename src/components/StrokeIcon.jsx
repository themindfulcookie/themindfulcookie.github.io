export default function StrokeIcon({ icon: Icon, size = 24, color = 'currentColor', strokeWidth = 1.5, style, ...rest }) {
  return (
    <Icon
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}
      {...rest}
    />
  );
}
