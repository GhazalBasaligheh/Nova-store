import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { locale as rootLocale } from 'next/root-params';
import { routing } from '@/i18n/routing';

// Per-request i18n config (the file location the challenge brief specifies).
// `locale` is set when a caller passes one explicitly, e.g. getTranslations({ locale }).
// Otherwise the [locale] segment is read with next/root-params.
export default getRequestConfig(async ({ locale: explicitLocale }) => {
  const requested = explicitLocale ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./dictionary/${locale}.json`)).default,
  };
});
