'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchCatalog } from '@/requests/products';
import type { Catalog, ServerCatalogResult } from '@/types/catalog';

export type CatalogState =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; catalog: Catalog };

// One shared in-flight request: React StrictMode's double effect (and any second caller)
// reuses it instead of firing a duplicate.
let inFlight: Promise<Catalog> | null = null;

function loadOnce(): Promise<Catalog> {
  inFlight ??= fetchCatalog().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

function initialState(server: ServerCatalogResult): CatalogState {
  if (server.status === 'ready') return { status: 'ready', catalog: server.catalog };
  if (server.status === 'fallback') return { status: 'loading' };
  return { status: 'error' };
}

/**
 * Uses the server's catalog when it has one. If the server was blocked ("fallback"),
 * loads it once in the browser. No automatic retries: `retry` is for a user action only.
 */
export function useCatalog(server: ServerCatalogResult) {
  const [state, setState] = useState<CatalogState>(() => initialState(server));
  const [attempt, setAttempt] = useState(server.status === 'fallback' ? 1 : 0);

  useEffect(() => {
    if (attempt === 0) return;
    let active = true;

    loadOnce().then(
      (catalog) => active && setState({ status: 'ready', catalog }),
      () => active && setState({ status: 'error' }),
    );

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
