import React from 'react';

interface InfiniteListProps<T> {
  items: T[];
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T, index: number) => React.ReactNode;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  className?: string;
}

// Generic list that renders items and a sentinel for IntersectionObserver
function InfiniteList<T>({
  items,
  renderItem,
  sentinelRef,
  hasMore,
  className,
}: InfiniteListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item, idx)}</div>
      ))}
      <div ref={sentinelRef} />
      {hasMore && (
        <div className='py-4 text-center text-sm text-gray-500'>Loading…</div>
      )}
    </div>
  );
}

export default InfiniteList;
