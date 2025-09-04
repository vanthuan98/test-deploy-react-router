import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseInfiniteScrollOptions {
  batchSize?: number; // number of items to load per step
  hasMore?: boolean; // external control if needed
}

/**
 * Generic infinite scroll helper using IntersectionObserver.
 * Provide a full dataset and it reveals items gradually in batches.
 */
export function useInfiniteScroll<T>(
  allItems: T[],
  options: UseInfiniteScrollOptions = {}
) {
  const { batchSize = 20, hasMore: externalHasMore } = options;
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = externalHasMore ?? visibleCount < allItems.length;

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore) {
        setVisibleCount(prev => Math.min(prev + batchSize, allItems.length));
      }
    },
    [batchSize, hasMore, allItems.length]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [onIntersect]);

  useEffect(() => {
    // Reset when dataset changes
    setVisibleCount(batchSize);
  }, [allItems, batchSize]);

  const items = allItems.slice(0, visibleCount);

  return { items, hasMore, sentinelRef } as const;
}
