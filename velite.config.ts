import { defineConfig, s } from 'velite';
import { generateSlugFromPath, parseLocaleFromFilePath } from '#/lib/helpers';

export default defineConfig({
  root: './content',
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
          const { path } = data;
          const { locale } = parseLocaleFromFilePath(path + '.md');
          return { ...data, locale };
        })
    },
    labs: {
      name: 'Lab',
      pattern: 'labs/**/*.{md,mdx}',
      schema: s
        .object({
          // frontmatter data
          title: s.string().max(99).optional(),
          desc: s.string().optional(),
          updated: s.isodate().optional(),
          timeToComplete: s.number().optional(),
          toc: s.boolean().optional(),
          level: s.string().optional(),
          // other items
          path: s.path(),
          toc_tree: s.toc({ maxDepth: 3 }),
          raw: s.raw(),
          excerpt: s.excerpt({ length: 160 })
        })
        .transform((data) => {
          const { title: t = '', toc_tree, excerpt, path } = data;

          const { locale } = parseLocaleFromFilePath(path + '.md');
          const slug = generateSlugFromPath(path + '.md', { start: 1 });

          const tocTitle = toc_tree.length > 0 ? toc_tree[0].title : '';
          const title = t ? t : tocTitle;

          return { ...data, slug, locale, title, excerpt: `${excerpt}...` };
        })
    }
  }
});
