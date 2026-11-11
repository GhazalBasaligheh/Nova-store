'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { SortKey } from '@/types/enums/SortKey';
import { QueryParam } from '@/types/enums/QueryParam';
import { parseProductQuery } from '@/utils/productQuery';

// List state lives in the URL, so it is shareable and survives a refresh.
export function useProductQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = useMemo(() => parseProductQuery(searchParams), [searchParams]);

  const update = useCallback(
    (changes: Partial<Record<QueryParam, string | null>>, resetPage = true) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (value) next.set(key, value);
        else next.delete(key);
      }
      if (resetPage) next.delete(QueryParam.Page);
      router.replace({ pathname, query: Object.fromEntries(next.entries()) }, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    query,
    setCategory: (category: string | null) => update({ [QueryParam.Category]: category }),
    setSort: (sort: SortKey) =>
      update({ [QueryParam.Sort]: sort === SortKey.Default ? null : sort }),
    setPage: (page: number) => update({ [QueryParam.Page]: page > 1 ? String(page) : null }, false),
    clearFilters: () =>
      update({
        [QueryParam.Search]: null,
        [QueryParam.Category]: null,
        [QueryParam.Sort]: null,
      }),
  };
}
