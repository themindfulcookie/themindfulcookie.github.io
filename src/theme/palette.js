export function buildPalette() {
  const lightPalette = {
    primary: {lighter: '#FBFAF5', light: '#EFE9D1', main: '#E0D6A8', dark: '#A79A5F', darker: '#736B41'},
    secondary: {lighter: '#F8F7F3', light: '#E0DBC4', main: '#B8AF8A', dark: '#877F5F', darker: '#5A5541'},
    grey: {
      50: '#FBFAF6',
      100: '#F4F3ED',
      200: '#EDEBE2',
      300: '#E3E0D4',
      400: '#D7D3C4',
      500: '#C8C3B0',
      600: '#B2AD96',
      700: '#8F8A73',
      800: '#6A6552',
      900: '#3F3A2E'
    },
    text: {
      primary: '#3F3A2E',
      secondary: '#6B654E',
      disabled: '#9C967E'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    }
  };

  const commonColor = {common: {black: '#000', white: '#fff'}};

  return {
    light: {
      mode: 'light',
      ...commonColor,
      ...lightPalette
    }
  };
}
