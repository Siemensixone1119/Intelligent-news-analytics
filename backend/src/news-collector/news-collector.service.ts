import { BadGatewayException, Injectable } from '@nestjs/common';
import { RssParser } from './parsers/rss.parser';
import { NewsRepository } from '../news/news.repository';

@Injectable()
export class NewsCollectorService {
  constructor(
    private readonly parser: RssParser,
    private readonly newsRepo: NewsRepository,
  ) {}
  async collectFromSource(url: string, source: string) {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new BadGatewayException(
        `RSS-источник вернул HTTP ${response.status}`,
      );
    }

    const parsedNews = this.parser.parse(await response.text(), source);

    const result = await this.newsRepo.createMany(parsedNews);

    return {
      source: source,
      received: parsedNews.length,
      saved: result.count,
      skipped: parsedNews.length - result.count,
    };
  }
}
