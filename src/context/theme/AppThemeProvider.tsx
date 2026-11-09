'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { createTheme, lightPalette } from './tokens';

const lightTheme = createTheme(lightPalette);

// Light theme only for now; ThemeContext with cookie persistence replaces this in the theme step.
export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
