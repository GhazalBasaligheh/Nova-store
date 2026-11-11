/**
 * Server-side catalog load for the home page.
 * - Cached success is served for 1 hour.
 * - It starts a 5-minute cooldown in which the server skips the API
 * - Any other failure (4xx, malformed data) is an error; a browser retry wouldn't help.
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