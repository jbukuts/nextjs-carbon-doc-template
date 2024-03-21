import 'server-only';

import { labs } from '../../../.velite';

export type SearchItem = Pick<(typeof labs)[0], 'desc' | 'title'>;

/**
 * Generate map containing list of items for each locale
 */
export default function generateSearchList() {
  const map = new Map<string, SearchItem[]>();

  labs.forEach((item) => {
    const { locale, title, desc } = item;
    if (!map.has(locale)) map.set(locale, []);

    map.set(locale, [...(map.get(locale) as SearchItem[]), { title, desc }]);
  });

  return map;
}
