'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  useEffect(() => {  
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = mediaQuery.matches;
    
    setMode(isDark ? 'dark' : 'light');
  
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#121212' : '#ffffff');
    }
  
    // Escucha cambios en la preferencia del sistema
    const handleChange = (event: MediaQueryListEvent) => {
      const newMode = event.matches ? 'dark' : 'light';
      setMode(newMode);
  
      if (metaTheme) {
        metaTheme.setAttribute('content', event.matches ? '#121212' : '#ffffff');
      }
    };
  
    mediaQuery.addEventListener('change', handleChange);
  
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', mode === 'light' ? '#121212' : '#ffffff');
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary:{
            main: '#f5075e'
          },
          secondary:{
            main: mode === 'dark' ? '#fafafa' : '#1C1C1C'
            
          },
          info:{
            main: mode === 'dark' ? '#0547e3' : '#043fc9'
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
