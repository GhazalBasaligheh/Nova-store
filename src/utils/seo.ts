import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/types/enums/Locale';
import { env } from '@/utils/env';

// Open Graph uses language_TERRITORY codes.
export const ogLocale: Record<Locale, string> = {
  [Locale.Fa]: 'fa_IR',
  [Locale.En]: 'en_US',
};

/** Path for a route in a locale, honoring localePrefix "as-needed" ("/" for fa, "/en" for en). */
export function localizedPath(href: string, locale: Locale): string {
  return getPathname({ href, locale });
}

export function absoluteUrl(path: string): string {
  return new URL(path, env.siteUrl).toString();
}

/** canonical + hreflang alternates (with x-default → default locale) for a route. */
export function alternatesFor(href: string, locale: Locale): Metadata['alternates'] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(href, l)]),
  ) as Record<string, string>;

  return {
    canonical: localizedPath(href, locale),
    languages: { ...languages, 'x-default': localizedPath(href, routing.defaultLocale) },
  };
}

/**
 * Shared Open Graph block. Next.js replaces (does not merge) a parent's openGraph when a page
 * sets its own, so pages that add a URL must start from this.
 */
export function baseOpenGraph(
  locale: Locale,
  title: string,
  description: string,
): NonNullable<Metadata['openGraph']> {
  return {
    type: 'website',
    siteName: title,
    title,
    description,
    locale: ogLocale[locale],
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
  };
}
