import { QueryParam } from '@/types/enums/QueryParam';
import { SortKey } from '@/types/enums/SortKey';
import type { Product } from '@/types/product';

export const PAGE_SIZE = 6;

export interface ProductQuery {
  q: string;
  category: string | null;
  sort: SortKey;
  page: number;
}

type ParamReader = { get(name: string): string | null };

const SORT_KEYS = new Set<string>(Object.values(SortKey));

// URL → typed query. Invalid values fall back to defaults instead of throwing.
export function parseProductQuery(params: ParamReader): ProductQuery {
  const sort = params.get(QueryParam.Sort) ?? '';
  const page = Number.parseInt(params.get(QueryParam.Page) ?? '', 10);

  return {
    q: (params.get(QueryParam.Search) ?? '').trim(),
    category: params.get(QueryParam.Category) || null,
    sort: SORT_KEYS.has(sort) ? (sort as SortKey) : SortKey.Default,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

const comparators: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  [SortKey.Default]: null,
  [SortKey.PriceAsc]: (a, b) => a.price - b.price,
  [SortKey.PriceDesc]: (a, b) => b.price - a.price,
  [SortKey.TitleAsc]: (a, b) => a.title.localeCompare(b.title, 'en'),
  [SortKey.TitleDesc]: (a, b) => b.title.localeCompare(a.title, 'en'),
  [SortKey.Rating]: (a, b) => b.rating.rate - a.rating.rate,
};

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

// Pure: filter → sort → paginate. The API has no paging, so all of it happens here.
export function filterSortPaginate(
  products: Product[],
  query: ProductQuery,
  pageSize: number = PAGE_SIZE,
): ProductPage {
  const needle = query.q.toLowerCase();

  const filtered = products.filter(
    (product) =>
      // !x || condition is a common pattern for ignoring an empty filter
      (!query.category || product.category === query.category) &&
      (!needle ||
        product.title.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)),
  );

  const compare = comparators[query.sort];
  //avoid altering the original array by sort()
  const sorted = compare ? [...filtered].sort(compare) : filtered;

  //Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * pageSize;

  return { items: sorted.slice(start, start + pageSize), total: sorted.length, page, totalPages };
}
