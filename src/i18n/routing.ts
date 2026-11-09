import { defineRouting } from 'next-intl/routing';
import { Direction, Locale } from '@/types/enums/Locale';

export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  // Persian at "/", English at "/en".
  localePrefix: 'as-needed',
  // No Accept-Language redirect: "/" is always Persian; users switch via the header toggle.
  localeDetection: false,
});

export const localeDirection: Record<Locale, Direction> = {
  [Locale.Fa]: Direction.Rtl,
  [Locale.En]: Direction.Ltr,
};
