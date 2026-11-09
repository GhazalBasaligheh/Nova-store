'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { getCategoryLabelKey } from '@/utils/categories';

// Localized label for a category slug; unknown slugs (if the API adds one) show as-is.
export function useCategoryLabel() {
  const t = useTranslations('Categories');
  return useCallback(
    (slug: string) => {
      const key = getCategoryLabelKey(slug);
      return key ? t(key) : slug;
    },
    [t],
  );
}
