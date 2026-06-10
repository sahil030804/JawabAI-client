'use client';

import { useState, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface DataCacheHookReturn {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, data: T, ttl?: number) => void;
  invalidate: (key: string) => void;
  clear: () => void;
  isOnline: boolean;
}

export const useDataCache = (): DataCacheHookReturn => {
  const [cache] = useState<Map<string, CacheEntry<unknown>>>(new Map());
  const [isOnline, setIsOnline] = useState(true);

  // Monitor online/offline status
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }

  const get = useCallback(<T,>(key: string): T | null => {
    const entry = cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
      return null;
    }

    return entry.data as T;
  }, [cache]);

  const set = useCallback(<T,>(key: string, data: T, ttl: number = 5 * 60 * 1000) => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    cache.set(key, entry as CacheEntry<unknown>);
  }, [cache]);

  const invalidate = useCallback((key: string) => {
    cache.delete(key);
  }, [cache]);

  const clear = useCallback(() => {
    cache.clear();
  }, [cache]);

  return {
    get,
    set,
    invalidate,
    clear,
    isOnline,
  };
};
