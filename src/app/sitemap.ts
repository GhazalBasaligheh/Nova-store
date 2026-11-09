import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { routes } from '@/utils/routes';
import { absoluteUrl, localizedPath } from '@/utils/seo';

// Public, indexable routes only (the cart is per-browser and noindex).
// Product detail pages would be added here if that backlog item is built.
const INDEXABLE_ROUTES = [routes.home];

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.flatMap((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, absoluteUrl(localizedPath(href, locale))]),
    );

    return routing.locales.map((locale) => ({
      url: absoluteUrl(localizedPath(href, locale)),
      changeFrequency: 'daily' as const,
      priority: href === routes.home ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
