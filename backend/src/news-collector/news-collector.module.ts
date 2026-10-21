import { Module } from '@nestjs/common';
import { NewsCollectorController } from './news-collector.controller';
import { NewsCollectorService } from './news-collector.service';
import { RssParser } from './parsers/rss.parser';
import { NewsModule } from '../news/news.module';
import { NewsCollectorScheduler } from './news-collector.scheduler';

@Module({
  controllers: [NewsCollectorController],
  providers: [NewsCollectorService, RssParser, NewsCollectorScheduler],
  imports: [NewsModule],
})
export class NewsCollectorModule {}
