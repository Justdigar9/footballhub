/**
 * Простой in-memory кэш на стороне сервера.
 * Живёт в рамках процесса Node.js (переживает отдельные запросы,
 * но сбрасывается при рестарте/редеплое — этого достаточно для MVP).
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  updatedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 минут, см. PRD п.5

export function getCached<T>(key: string): { value: T; updatedAt: number } | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) return null;
  return { value: entry.value, updatedAt: entry.updatedAt };
}

/** Возвращает значение, даже если оно устарело (TTL истёк) — нужно как fallback при сбое API. */
export function getStale<T>(key: string): { value: T; updatedAt: number } | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  return { value: entry.value, updatedAt: entry.updatedAt };
}

export function setCached<T>(key: string, value: T, ttlMs: number = DEFAULT_TTL_MS): void {
  const now = Date.now();
  store.set(key, { value, expiresAt: now + ttlMs, updatedAt: now });
}
