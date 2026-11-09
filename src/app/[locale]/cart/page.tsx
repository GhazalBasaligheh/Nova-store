import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CartView } from '@/components/Cart/CartView';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: PageProps<'/[locale]/cart'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Cart' });

  return {
    title: t('title'),
    description: t('metaDescription'),
    // Personal, per-browser content: nothing to index.
    robots: { index: false, follow: true },
  };
}

export default async function CartPage({ params }: PageProps<'/[locale]/cart'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <CartView />;
}
