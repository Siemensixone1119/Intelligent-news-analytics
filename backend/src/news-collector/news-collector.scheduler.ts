import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { NewsCollectorService } from './news-collector.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NewsCollectorScheduler implements OnApplicationBootstrap {
  constructor(private readonly collectorService: NewsCollectorService) {}

  private readonly logger = new Logger(NewsCollectorScheduler.name);

  onApplicationBootstrap() {
    this.logger.log('Запускаю первоначальный сбор новостей');

    void this.collectNews().catch((error) => {
      this.logger.error(
        'Ошибка первоначального сбора',
        error instanceof Error ? error.stack : String(error),
      );
    });
  }

  @Cron('0 */15 * * * *', {
    waitForCompletion: true,
  })
  async collectNews() {
    const sources = [
      {
        name: 'Банк России — пресс-релизы',
        url: 'https://www.cbr.ru/rss/RssPress',
      },
      {
        name: 'Банк России — новости',
        url: 'https://www.cbr.ru/rss/eventrss',
      },
      {
        name: 'Банк России — обновления',
        url: 'https://www.cbr.ru/rss/RssNews',
      },
      {
        name: 'Коммерсантъ — экономика',
        url: 'https://www.kommersant.ru/rss/section-economics.xml',
      },
      {
        name: 'ТАСС',
        url: 'https://tass.ru/rss/v2.xml',
      },
      {
        name: 'Интерфакс',
        url: 'https://www.interfax.ru/rss.asp',
      },
      {
        name: 'РБК',
        url: 'https://rssexport.rbc.ru/rbcnews/news/30/full.rss',
      },
      {
        name: 'РИА Новости',
        url: 'https://ria.ru/export/rss2/archive/index.xml',
      },
      {
        name: 'Известия',
        url: 'https://iz.ru/xml/rss/all.xml',
      },
    ];

    for (let source of sources) {
      try {
        const result = await this.collectorService.collectFromSource(
          source.url,
          source.name,
        );
        this.logger.log(
          `${result.source}: получено ${result.received}, сохранено ${result.saved}, пропущено ${result.skipped}`,
        );
      } catch (error) {
        this.logger.error(
          `Ошибка сбора новостей: ${source.name}`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }
  }
}
