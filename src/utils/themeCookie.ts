import { Theme } from '@/types/enums/Theme';

export const THEME_COOKIE = 'nova-theme';
export const DEFAULT_THEME = Theme.Light;

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Narrows any cookie value to a known theme; unknown or missing values fall back to the default.
export function parseTheme(value: string | undefined): Theme {
  return value === Theme.Dark || value === Theme.Light ? value : DEFAULT_THEME;
}

// Non-sensitive UI preference: readable by the server for first paint, so not HttpOnly.
export function buildThemeCookie(theme: Theme): string {
  return `${THEME_COOKIE}=${theme}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}
