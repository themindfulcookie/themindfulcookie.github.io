export default function Link(theme) {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.vars.palette.primary.dark,
        }
      }
    }
  };
}
