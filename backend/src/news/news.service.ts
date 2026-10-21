import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { buildCursorPage } from '../common/pagination/cursor-pagination.util';
import { CursorPaginationDto } from '../common/pagination/cursor-pagination.dto';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepo: NewsRepository) {}

  async findAll(filter: CursorPaginationDto) {
    const news = await this.newsRepo.findAll(filter);

    return buildCursorPage(news, filter.limit, (item) => item.id);
  }
}
