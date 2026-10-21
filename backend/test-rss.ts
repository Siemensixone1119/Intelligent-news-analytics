import { XMLParser } from 'fast-xml-parser';

const url = 'https://www.cbr.ru/rss/RssPress';
async function main() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    processEntities: false,
  });

  const result = parser.parse(xml);

  const items = result.rss?.channel?.item;

  const news = Array.isArray(items)
    ? items
    : items
      ? [items]
      : [];

      const allFields = new Set<string>();

for (const item of news) {
  for (const field of Object.keys(item)) {
    allFields.add(field);
  }
}
const fieldCounts: Record<string, number> = {};

for (const item of news) {
  for (const field of Object.keys(item)) {
    fieldCounts[field] = (fieldCounts[field] ?? 0) + 1;
  }
}

console.table(
  Object.entries(fieldCounts).map(([field, count]) => ({
    field,
    count,
    total: news.length,
  })),
);
console.log('Все обнаруженные поля:', [...allFields]);

  console.log('Количество новостей:', news.length);

  if (news.length > 0) {
    console.log('Поля первой новости:');
    console.log(Object.keys(news[0]));

    console.dir(news[0], { depth: null });
  }
}

main().catch(console.error);