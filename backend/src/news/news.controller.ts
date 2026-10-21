import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CursorPaginationDto } from '../common/pagination/cursor-pagination.dto';
import { filter } from 'rxjs';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query() filter: CursorPaginationDto) {
    return this.newsService.findAll(filter);
  }
}
