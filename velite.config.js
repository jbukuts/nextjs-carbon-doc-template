import slugify from 'slugify';
import { defineConfig, s } from 'velite';

export default defineConfig({
  root: './',
  collections: {
    fragments: {
      name: 'Fragment',
      pattern: 'fragments/**/*.{md,mdx}',
      schema: s
        .object({
          name: s.string(),
          raw: s.raw(),
          path: s.path()
        })
        .transform((data) => {
          const splitSlug = data.path.split('/');
          // drop content folder
          splitSlug.shift();

          // name is last item in path
          const name = splitSlug.pop();

          // extract locale from file name
          const splitName = name.split('.');
          if (splitName.length === 1) splitName.push('en');
          const locale = splitName[1];

          return { ...data, locale };
        })
    },
    labs: {
      name: 'Lab',
      pattern: 'content/**/*.{md,mdx}',
      schema: s
        .object({
          // frontmatter data
          title: s.string().max(99).optional(),
          desc: s.string().optional(),
          updated: s.isodate().optional(),
          timeToComplete: s.number().optional(),
          toc: s.boolean().optional(),
          level: s.string().optional(),
          order: s.number().optional(),
          // other items
          path: s.path(),
          toc_tree: s.toc({ maxDepth: 3 }),
          raw: s.raw()
        })
        .transform((data) => {
          const splitSlug = data.path.split('/');
          // drop content folder
          splitSlug.shift();

          // name is last item in path
          const name = splitSlug.pop();

          // extract locale from file name
          const splitName = name.split('.');
          if (splitName.length === 1) splitName.push('en');
          const locale = splitName[1];

          // create slug
          const slug = [locale, ...splitSlug, splitName[0]]
            .map((i) => slugify(i, { lower: true }))
            .filter((i) => i !== 'readme')
            .join('/');

          return { slug, locale, ...data };
        })
    }
  }
});
