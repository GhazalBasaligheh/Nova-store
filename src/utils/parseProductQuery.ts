import { QueryParam } from '@/types/enums/QueryParam';
import { SortKey } from '@/types/enums/SortKey';
import type { ProductQuery } from '@/types/productQuery';

const SORT_KEYS = new Set<string>(Object.values(SortKey));

// URL → typed query. Invalid values fall back to defaults instead of throwing.
export function parseProductQuery(params: URLSearchParams): ProductQuery {
  const sort = params.get(QueryParam.Sort) ?? '';
  const page = Number.parseInt(params.get(QueryParam.Page) ?? '', 10);

  return {
    q: (params.get(QueryParam.Search) ?? '').trim(),
    category: params.get(QueryParam.Category) || null,
    sort: SORT_KEYS.has(sort) ? (sort as SortKey) : SortKey.Default,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}
