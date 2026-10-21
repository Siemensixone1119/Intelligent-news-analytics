export interface CursorPaginationResult<T> {
  data: T[];
  pagination: {
    nextCursor: String | null;
    hasMore: boolean;
  };
}
