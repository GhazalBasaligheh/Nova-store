'use client';

import { createGlobalStyle } from 'styled-components';

// Theme-dependent globals. Static resets live in app/globals.css.
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;
