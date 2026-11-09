'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useCartStore } from './cartStore';

const subscribe = (onChange: () => void) => useCartStore.persist.onFinishHydration(onChange);
const getSnapshot = () => useCartStore.persist.hasHydrated();
// The server never has localStorage, so it always renders the "not hydrated" placeholder.
const getServerSnapshot = () => false;

/** True once the persisted cart has been loaded from localStorage. */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Mounted once in the layout: loads the persisted cart after the first client render. */
export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}
