import type { Category, Product } from '@/types/product';

export interface Catalog {
  products: Product[];
  categories: Category[];
}

export type ServerCatalogResult = { status: 'ready'; catalog: Catalog } | { status: 'error' };
