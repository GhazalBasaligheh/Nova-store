'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/context/theme/GlobalStyle';
import { createTheme, darkPalette, lightPalette } from '@/context/theme/tokens';
import { Theme } from '@/types/enums/Theme';
import { buildThemeCookie } from '@/utils/theme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const themes = {
  [Theme.Light]: createTheme(lightPalette),
  [Theme.Dark]: createTheme(darkPalette),
};

interface ThemeContextProviderProps {
  // Read from the cookie on the server, so the first paint already uses the right theme.
  initialTheme: Theme;
  children: ReactNode;
}

export function ThemeContextProvider({ initialTheme, children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === Theme.Light ? Theme.Dark : Theme.Light;
      document.cookie = buildThemeCookie(next);
      document.documentElement.dataset.theme = next;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeContextProvider');
  return context;
}
