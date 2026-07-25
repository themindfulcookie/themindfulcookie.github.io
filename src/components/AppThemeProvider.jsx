import { useEffect, useState } from 'react';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeCustomization from "../theme";

export default function AppThemeProvider({ children }) {
  const [loader, setLoader] = useState(true);

  const selectedTheme = ThemeCustomization('data-color-scheme');

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      <InitColorSchemeScript attribute="data-color-scheme" defaultMode="light" />
      <MuiThemeProvider disableTransitionOnChange theme={selectedTheme} defaultMode="light">
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </>
  );
}