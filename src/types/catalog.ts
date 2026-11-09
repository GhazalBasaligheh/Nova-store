import type { Category, Product } from '@/types/product';

export interface Catalog {
  products: Product[];
  categories: Category[];
}

// What the server hands to the product section.
// "fallback": the server couldn't reach the API in a way the browser might (bot block, network, 5xx).
export type ServerCatalogResult =
  { status: 'ready'; catalog: Catalog } | { status: 'fallback' } | { status: 'error' };
