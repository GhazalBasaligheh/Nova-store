import { defineRouting } from 'next-intl/routing';
import { Direction, Locale } from '@/types/enums/Locale';

export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  // Persian at "/", English at "/en".
  localePrefix: 'as-needed',
});

export const localeDirection: Record<Locale, Direction> = {
  [Locale.Fa]: Direction.Rtl,
  [Locale.En]: Direction.Ltr,
};
