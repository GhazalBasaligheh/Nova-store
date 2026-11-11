import type { SortKey } from '@/types/enums/SortKey';
import type { Product } from '@/types/product';

// The product list state as it is kept in the URL.
export interface ProductQuery {
  q: string;
  category: string | null;
  sort: SortKey;
  page: number;
}

// One page of the filtered and sorted list.
export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}
