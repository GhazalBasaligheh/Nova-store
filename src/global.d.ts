import type { routing } from '@/i18n/routing';
import type messages from '@/dictionary/en.json';

// Typed i18n: unknown keys and locales fail at compile time.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
