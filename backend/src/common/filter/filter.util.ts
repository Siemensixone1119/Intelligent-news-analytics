import type { Prisma } from '../../generated/prisma/client.js';
import { CursorPaginationDto } from '../pagination/cursor-pagination.dto';

export function buildNewsWhere(filters: CursorPaginationDto): Prisma.NewsWhereInput {
  const where: Prisma.NewsWhereInput = {};

  if (filters.source) {
    where.source = filters.source;
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.dateFrom || filters.dateTo) {
    const publishedAt: Prisma.DateTimeNullableFilter = {};

    if (filters.dateFrom) {
      publishedAt.gte = new Date(`${filters.dateFrom}T00:00:00.000Z`);
    }

    if (filters.dateTo) {
      const nextDay = new Date(`${filters.dateTo}T00:00:00.000Z`);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);

      publishedAt.lt = nextDay;
    }

    where.publishedAt = publishedAt;
  }

  if (filters.search?.trim()) {
    const search = filters.search.trim();

    where.OR = [
      {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        content: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  return where;
}