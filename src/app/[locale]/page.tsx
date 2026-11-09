import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero/Hero';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import { ProductSection } from '@/components/ProductSection/ProductSection';
import { routing } from '@/i18n/routing';
import { loadCatalogOnServer } from '@/requests/catalogServer';
import { alternatesFor, baseOpenGraph, localizedPath } from '@/utils/seo';
import { routes } from '@/utils/routes';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    // Home uses the plain site title (no template suffix).
    title: { absolute: t('title') },
    alternates: alternatesFor(routes.home, locale),
    openGraph: {
      ...baseOpenGraph(locale, t('title'), t('description')),
      url: localizedPath(routes.home, locale),
    },
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Server first; the section falls back to a browser request only for blocked/network/5xx.
  const catalog = await loadCatalogOnServer();

  return (
    <main>
      <Hero />
      <ProductSection server={catalog} />
      <Newsletter />
    </main>
  );
}
