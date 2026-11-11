/**
 * Server-side catalog load for the home page.
 * - A successful result is cached in memory for 1 hour.
 * - A failure is returned as an error and never cached, so the next request tries again.
 */

import 'server-only';
import { fetchCatalog } from '@/requests/products';
import type { Catalog, ServerCatalogResult } from '@/types/catalog';
import { createTtlCache } from '@/utils/ttlCache';

const SUCCESS_TTL_MS = 60 * 60 * 1000; // 1 hour

const catalogCache = createTtlCache<Catalog>();

export async function loadCatalogOnServer(): Promise<ServerCatalogResult> {
  const cached = catalogCache.get();
  if (cached) return { status: 'ready', catalog: cached };

  try {
    const catalog = await fetchCatalog();
    catalogCache.set(catalog, SUCCESS_TTL_MS);
    return { status: 'ready', catalog };
  } catch {
    return { status: 'error' };
  }
}
