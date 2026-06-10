'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface ErrorRecoveryOptions {
  maxRetries?: number;
  backoffMs?: number;
  onRetry?: (attempt: number) => void;
  onFallback?: () => void;
}

interface ErrorRecoveryHookReturn {
  isRetrying: boolean;
  retryCount: number;
  retry: (fn: () => Promise<void>) => Promise<void>;
  reset: () => void;
}

export const useErrorRecovery = (options: ErrorRecoveryOptions = {}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const retryFnRef = useRef<((fn: () => Promise<void>) => Promise<void>) | null>(null);

  const {
    maxRetries = 3,
    backoffMs = 1000,
    onRetry,
    onFallback,
  } = options;

  const retry = useCallback(async (fn: () => Promise<void>) => {
    if (retryCount >= maxRetries) {
      onFallback?.();
      return;
    }

    setIsRetrying(true);
    const currentAttempt = retryCount + 1;
    setRetryCount(currentAttempt);
    onRetry?.(currentAttempt);

    // Exponential backoff
    const delay = backoffMs * Math.pow(2, currentAttempt - 1);
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      await fn();
      setIsRetrying(false);
    } catch {
      if (currentAttempt < maxRetries) {
        // Retry using the ref to avoid recursive dependency
        if (retryFnRef.current) {
          await retryFnRef.current(fn);
        }
      } else {
        setIsRetrying(false);
        onFallback?.();
      }
    }
  }, [retryCount, maxRetries, backoffMs, onRetry, onFallback]);

  // Store the retry function in a ref to avoid circular dependency
  useEffect(() => {
    retryFnRef.current = retry;
  }, [retry]);

  const reset = useCallback(() => {
    setIsRetrying(false);
    setRetryCount(0);
  }, []);

  return {
    isRetrying,
    retryCount,
    retry,
    reset,
  };
};
