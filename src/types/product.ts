// Shapes verified against the live FakeStoreAPI on 2026-11-09 (see PROJECT_HANDOFF.md §6.1).

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  /** USD */
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type Category = string;
