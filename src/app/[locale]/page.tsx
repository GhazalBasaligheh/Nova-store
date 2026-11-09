import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero/Hero';
import { ProductSection } from '@/components/ProductSection/ProductSection';
import { routing } from '@/i18n/routing';
import { loadCatalogOnServer } from '@/requests/catalogServer';

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
    </main>
  );
}
