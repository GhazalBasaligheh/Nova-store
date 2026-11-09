import { ApiError } from '@/api/ApiError';
import { axiosInstance } from '@/api/axiosInstance';
import { ApiErrorKind } from '@/types/enums/ApiErrorKind';
import type { Catalog } from '@/types/catalog';
import type { Category, Product } from '@/types/product';

// Lightweight runtime guard: the API is third-party, so don't trust the shape blindly.
function assertArray<T>(data: unknown, what: string): T[] {
  if (!Array.isArray(data)) throw new ApiError(ApiErrorKind.Parse, `Expected ${what} array`);
  return data as T[];
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await axiosInstance.get<unknown>('/products', { signal });
  return assertArray<Product>(data, 'products');
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const { data } = await axiosInstance.get<unknown>('/products/categories', { signal });
  return assertArray<Category>(data, 'categories');
}

// Products and categories together: what the home page needs.
export async function fetchCatalog(signal?: AbortSignal): Promise<Catalog> {
  const [products, categories] = await Promise.all([getProducts(signal), getCategories(signal)]);
  return { products, categories };
}
