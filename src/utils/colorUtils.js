import { alpha } from '@mui/material/styles';

export function withAlpha(color, opacity) {
  // Case 1: normal color (hex, rgb, hsl…)
  if (/^#|rgb|hsl|color/i.test(color)) {
    return alpha(color, opacity);
  }

  // Case 2: CSS Var: var(--mui-palette-xxx) or var(--palette-xxx, #hex)
  if (color.startsWith('var(')) {
    // inject "Channel" *before the closing parenthesis of the var name only*
    return color.replace(/(--[a-zA-Z0-9-]+)(.*)\)/, `$1Channel$2)`).replace(/^var\((.+)\)$/, `rgba(var($1) / ${opacity})`);
  }

  // Fallback
  return color;
}
