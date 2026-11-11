import { SortKey } from '@/types/enums/SortKey';
import type { Product } from '@/types/product';
import type { ProductPage, ProductQuery } from '@/types/productQuery';

export const PAGE_SIZE = 6;

const comparators: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  [SortKey.Default]: null,
  [SortKey.PriceAsc]: (a, b) => a.price - b.price,
  [SortKey.PriceDesc]: (a, b) => b.price - a.price,
  [SortKey.TitleAsc]: (a, b) => a.title.localeCompare(b.title, 'en'),
  [SortKey.TitleDesc]: (a, b) => b.title.localeCompare(a.title, 'en'),
  [SortKey.Rating]: (a, b) => b.rating.rate - a.rating.rate,
};

// Pure: filter → sort → paginate. The API has no paging, so all of it happens here.
export function filterSortPaginate(products: Product[], query: ProductQuery): ProductPage {
  const needle = query.q.toLowerCase();

  const filtered = products.filter(
    (product) =>
      // An empty filter matches everything.
      (!query.category || product.category === query.category) &&
      (!needle ||
        product.title.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)),
  );

  const compare = comparators[query.sort];
  // sort() changes the array in place, so sort a copy.
  const sorted = compare ? [...filtered].sort(compare) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * PAGE_SIZE;

  return { items: sorted.slice(start, start + PAGE_SIZE), total: sorted.length, page, totalPages };
}
