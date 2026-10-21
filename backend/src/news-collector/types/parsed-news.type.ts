export interface ParsedNews {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  source: string;
  category: string | null;
  publishedAt: Date | null;
}
