// Server-only: imported by the home page server component, never by client code.
import { shouldFallbackToClient } from '@/api/ApiError';
import { fetchCatalog } from '@/requests/products';
import type { Catalog, ServerCatalogResult } from '@/types/catalog';
import { createTtlCache } from '@/utils/ttlCache';

const SUCCESS_TTL_MS = 60 * 60 * 1000; // 1 hour: FakeStoreAPI data is effectively static.
const BLOCKED_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes: don't re-hit a server that's refusing us.

const catalogCache = createTtlCache<Catalog>();
const cooldown = createTtlCache<true>();

/**
 * Server-side catalog load for the home page.
 * - Cached success is served for 1 hour.
 * - A fallback-worthy failure starts a 5-minute cooldown in which the server skips the API
 *   and lets the browser load the data instead.
 * - Any other failure (4xx, malformed data) is an error; a browser retry wouldn't help.
 */
export async function loadCatalogOnServer(): Promise<ServerCatalogResult> {
  const cached = catalogCache.get();
  if (cached) return { status: 'ready', catalog: cached };
  if (cooldown.get()) return { status: 'fallback' };

  try {
    const catalog = await fetchCatalog();
    catalogCache.set(catalog, SUCCESS_TTL_MS);
    return { status: 'ready', catalog };
  } catch (error) {
    if (shouldFallbackToClient(error)) {
      cooldown.set(true, BLOCKED_COOLDOWN_MS);
      return { status: 'fallback' };
    }
    return { status: 'error' };
  }
}
