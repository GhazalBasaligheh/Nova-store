// Minimal in-memory cache with per-entry expiry. Lives in the Node.js server process:
// not shared between instances and cleared on restart (documented in the README).

interface Entry<T> {
  value: T;
  expiresAt: number;
}

export function createTtlCache<T>() {
  let entry: Entry<T> | null = null;

  return {
    get(): T | null {
      if (!entry || entry.expiresAt <= Date.now()) return null;
      return entry.value;
    },
    set(value: T, ttlMs: number): void {
      entry = { value, expiresAt: Date.now() + ttlMs };
    },
  };
}
