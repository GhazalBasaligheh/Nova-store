import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import StyledComponentsRegistry from '@/context/StyledComponentsRegistry';
import { cookies } from 'next/headers';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { localeDirection, routing } from '@/i18n/routing';
import { parseTheme, THEME_COOKIE } from '@/utils/theme';
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

  setRequestLocale(locale);

  // Server-side theme read: correct colors on first paint, no flash or hydration mismatch.
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={vazirmatn.variable}
      data-theme={theme}
    >
      <body>
        <StyledComponentsRegistry>
          <ThemeContextProvider initialTheme={theme}>
            <NextIntlClientProvider>
              <Header />
              {children}
              <Footer />
            </NextIntlClientProvider>
          </ThemeContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
