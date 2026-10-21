import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParsedNews } from '../news-collector/types/parsed-news.type';
import { buildNewsWhere } from '../common/filter/filter.util';
import { CursorPaginationDto } from '../common/pagination/cursor-pagination.dto';

@Injectable()
export class NewsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(filters: CursorPaginationDto) {
    const news = await this.prisma.news.findMany({
      where: buildNewsWhere(filters),
      select: {
        id: true,
        title: true,
        description: true,
        source: true,
        category: true,
        publishedAt: true,
        url: true,
      },
      take: filters.limit + 1,
      skip: filters.cursor ? 1 : 0,
      cursor: filters.cursor ? { id: filters.cursor } : undefined,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return news;
  }

  async createMany(data: ParsedNews[]) {
    return await this.prisma.news.createMany({
      data: data,
      skipDuplicates: true,
    });
  }
}
