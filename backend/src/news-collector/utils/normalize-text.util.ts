import { convert } from 'html-to-text';
import he from 'he';

export function normalizeText(value: string): string {
  const decoded = he.decode(value);

  const text = convert(decoded, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
    ],
  });

  return text
    .replace(/\u00A0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
