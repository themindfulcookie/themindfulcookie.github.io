function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const int = parseInt(value, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function withAlpha(color, opacity) {
  if (color.startsWith('#')) {
    const [r, g, b] = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (/^rgb/i.test(color)) {
    const [r, g, b] = color.match(/[\d.]+/g);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return color;
}
