export interface RssItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  category?: string | string[];
  'content:encoded'?: string;
  a;
}

export type ValidRssItem = RssItem & {
  title: string;
  link: string;
};

export interface RssDocument {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
    };
  };
}
