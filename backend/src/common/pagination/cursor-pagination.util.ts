import { CursorPaginationResult } from './cursor-pagination.types';

export function buildCursorPage<T>(
  items: T[],
  limit: number,
  getCursor: (item: T) => string,
): CursorPaginationResult<T> {
  const hasMore = items.length > limit;
  const data = items.slice(0, limit);
  const cursor = hasMore ? getCursor(data[data.length - 1]) : null;

  return {
    data,
    pagination: {
      nextCursor: cursor,
      hasMore,
    },
  };
}
