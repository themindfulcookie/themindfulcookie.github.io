// Layout breakpoints (was theme/index.jsx's custom MUI breakpoints.values)
export const LAYOUT_BREAKPOINTS = { xs: 0, sm: 768, md: 1024, lg: 1266, xl: 1440 };

// Typography breakpoints: theme/typography.js was built against a *default*
// MUI theme (createTheme() with no overrides), not the custom LAYOUT_BREAKPOINTS
// above, so responsive font sizes step down at MUI's stock 600/900 instead.
export const TYPOGRAPHY_BREAKPOINTS = { sm: 600, md: 900 };

export function mqDown(px) {
  return `(max-width: ${px - 0.05}px)`;
}

export function mqUp(px) {
  return `(min-width: ${px}px)`;
}
