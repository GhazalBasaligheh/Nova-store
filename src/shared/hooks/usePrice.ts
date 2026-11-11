'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';
import type { Locale } from '@/types/enums/Locale';
import { formatPrice } from '@/utils/formatPrice';

// Binds formatPrice to the current locale and the dictionary's currency label.
export function usePrice() {
  const locale = useLocale() as Locale;
  const t = useTranslations('Currency');
  const toman = t('toman');
  return useCallback((usd: number) => formatPrice(usd, locale, toman), [locale, toman]);
}
