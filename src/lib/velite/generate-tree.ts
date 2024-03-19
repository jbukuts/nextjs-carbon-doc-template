import 'server-only';

import setWith from 'lodash/setWith';
import type { labs } from '../../../.velite';
import generateMap from './generate-map';

const SLUG_MAP = generateMap();

type FrontMatterData = Pick<
  (typeof labs)[0],
  'timeToComplete' | 'title' | 'updated' | 'toc'
>;

export interface SlugTree {
  title?: string;
  metadata?: FrontMatterData;
  slug?: string;
  children?: Record<string, SlugTree>;
}

/**
 * Generate tree-like structure composed of slugs.
 *
 * @returns tree-like structure containing slug metadata
 */
export default function generateSlugTree(): SlugTree {
  const tree: SlugTree['children'] = {};

  const list = Object.entries(SLUG_MAP).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  for (const [slug, item] of list) {
    const directories = slug.split('/');

    const { title, updated, timeToComplete, toc, toc_tree } = item;
    // set metadata
    const value: Omit<Required<SlugTree>, 'children'> = {
      title: title || toc_tree[0].title || '',
      metadata: {
        title,
        updated,
        timeToComplete,
        toc
      },
      slug: `/${slug}`
    };

    const objectPath = directories.join('.children.');
    setWith<SlugTree>(tree, objectPath, value, Object);
  }

  return { children: tree };
}
