import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { routes } from '@/utils/routes';
import { absoluteUrl, localizedPath } from '@/utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Cart pages in every locale: personal content with no search value.
      disallow: routing.locales.map((locale) => localizedPath(routes.cart, locale)),
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
