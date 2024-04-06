import path from 'path';
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { remarkImage, remarkLocalizeLinks } from '#/lib/plugins/remark';
import mdxConfig from '#mdx-config';
import { SLUG_MAP, collectBreadcrumbs } from '../velite';
import shortcodes from './shortcodes';

const { remarkPlugins, rehypePlugins } = mdxConfig;

type ComponentMap = MDXRemoteProps['components'];

/**
 * Compiles raw MDX string to final rendered element
 *
 * @param {string} slug page to render
 * @returns compiled content and metadata
 */
export default async function compileContent(
  slug: string,
  overrides: ComponentMap = {}
) {
  const item = SLUG_MAP[slug];

  if (!item) {
    throw new Error(`${slug} does not exist`);
  }

  const {
    raw,
    path: file_path,
    toc_tree,
    updated,
    title,
    timeToComplete,
    toc,
    locale,
    level
  } = item;

  const { dir } = path.parse(file_path);
  const imagePath = path.normalize(dir);

  const { content } = await compileMDX({
    source: raw,
    components: { ...shortcodes, ...overrides },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [
          ...remarkPlugins,
          [remarkImage, { prepend: imagePath }],
          [remarkLocalizeLinks, { locale }]
        ],
        rehypePlugins: [...rehypePlugins]
      }
    }
  });

  return {
    content,
    breadcrumbs: collectBreadcrumbs(slug),
    toc: toc_tree,
    frontmatter: {
      level,
      title,
      toc,
      updated,
      timeToComplete
    }
  };
}
