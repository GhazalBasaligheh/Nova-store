import { ApiError } from '@/api/ApiError';
import { axiosInstance } from '@/api/axiosInstance';
import { ApiErrorKind } from '@/types/enums/ApiErrorKind';
import type { Catalog } from '@/types/catalog';
import type { Category, Product } from '@/types/product';

// The API is third-party, so don't trust it blindly.
function assertArray<T>(data: unknown, what: string): T[] {
  if (!Array.isArray(data)) throw new ApiError(ApiErrorKind.Parse, `Expected ${what} array`);
  return data as T[];
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<unknown>('/products');
  return assertArray<Product>(data, 'products');
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await axiosInstance.get<unknown>('/products/categories');
  return assertArray<Category>(data, 'categories');
}

// Products and categories together: for home page .
export async function fetchCatalog(): Promise<Catalog> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return { products, categories };
}
