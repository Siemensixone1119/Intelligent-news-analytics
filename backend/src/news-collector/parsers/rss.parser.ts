import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { RssDocument, RssItem, ValidRssItem } from '../types/rss.types';
import { ParsedNews } from '../types/parsed-news.type';
import { normalizeText } from '../utils/normalize-text.util';

export class RssParser {
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    processEntities: false,
  });

  parse(xml: string, source: string): ParsedNews[] {
    const validation = XMLValidator.validate(xml);

    if (validation !== true) {
      throw new Error('Некорректный XML');
    }

    const result = this.parser.parse(xml) as RssDocument;
    const items = result.rss?.channel?.item;

    let news: RssItem[] = [];

    if (!items) {
      return [];
    }

    news = Array.isArray(items) ? items : [items];

    const validNews = news.filter((item): item is ValidRssItem => {
      return (
        typeof item.title === 'string' &&
        item.title.trim().length > 0 &&
        typeof item.link === 'string' &&
        item.link.trim().length > 0
      );
    });

    return validNews.map((item) => {
      const date = item.pubDate ? new Date(item.pubDate) : null;
      const publishedAt = date && !Number.isNaN(date.getTime()) ? date : null;
      return {
        title: item.title,
        description: item.description ? normalizeText(item.description) : null,
        content: item['content:encoded']
          ? normalizeText(item['content:encoded'])
          : null,
        url: item.link,
        source: source,
        category: Array.isArray(item.category)
          ? (item.category[0] ?? null)
          : (item.category ?? null),
        publishedAt: publishedAt,
      };
    });
  }
}
