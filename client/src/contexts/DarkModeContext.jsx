import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

// Create the context
export const ColorModeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
});

// ColorModeProvider component
export function ColorModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Create theme dynamically based on dark mode state
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
    [darkMode]
  );

  // Value to provide to consumers
  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
    }),
    [darkMode, setDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={value}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
