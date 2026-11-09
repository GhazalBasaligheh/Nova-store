import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/context/StyledComponentsRegistry';
import AppThemeProvider from '@/context/theme/AppThemeProvider';
import { localeDirection, routing } from '@/i18n/routing';
import '../globals.css';

// Self-hosted Vazirmatn variable font: covers Persian, Latin and both digit sets.
const vazirmatn = localFont({
  src: '../../assets/Fonts/Vazirmatn-Variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-vazirmatn',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={localeDirection[locale]} className={vazirmatn.variable}>
      <body>
        <StyledComponentsRegistry>
          <AppThemeProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </AppThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
