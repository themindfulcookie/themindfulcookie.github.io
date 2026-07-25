import { createTheme } from '@mui/material/styles';
import {buildPalette} from "./palette";
import typography from "./typography";
import ComponentsOverrides from "./overrides";

export const colorSchemeSelector = 'data-ai-color-scheme';

export default function ThemeCustomization(selector) {
  const palette = buildPalette();
  const muiTheme = createTheme();

  // create duplicate theme due to responsive typography and fontFamily
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1440
      }
    },
    colorSchemes: {
      light: { palette: palette.light },
    },
    cssVariables: {
      colorSchemeSelector: selector || colorSchemeSelector
    },
    typography: typography(muiTheme)
  });

  theme.components = ComponentsOverrides(theme);

  return theme;
}
