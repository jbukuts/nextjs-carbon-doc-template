import path from 'path';
import pick from 'lodash/pick';
import type { Metadata, ResolvingMetadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { PageHeader, PageNavFooter } from '#/components';
import shortcodes from '#/lib/mdx/shortcodes';
import { remarkImage, remarkLocalizeLinks } from '#/lib/plugins/remark';
import { SLUG_MAP, collectBreadcrumbs } from '#/lib/velite';
import mdxConfig from '#mdx-config';
import styles from './page.module.scss';

const { remarkPlugins, rehypePlugins } = mdxConfig;

type Slug = { slug: string[]; locale: string };

interface PageProps {
  params: Slug;
}

/**
 * SSG function to determine slugs to prerender
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export function generateStaticParams(): Slug[] {
  const slugs: string[] = Object.keys(SLUG_MAP);
  return slugs.map((slug) => {
    const splitSlug = slug.split('/');
    const locale = splitSlug.shift();

    return { slug: splitSlug, locale: locale! };
  });
}

/**
 * Generate SEO metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata(
  props: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    params: { slug, locale }
  } = props;

  const fullSlug = [locale, ...slug].join('/');
  const { title, toc_tree } = SLUG_MAP[fullSlug];

  return { title: title || toc_tree[0].title || undefined };
}

/**
 * Compiles raw MDX string to final rendered element
 *
 * @param {string} slug page to render
 * @returns compiled content and metadata
 */
async function compileContent(slug: string) {
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
    components: shortcodes,
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

export default async function LabPage(props: PageProps) {
  const {
    params: { slug, locale }
  } = props;

  unstable_setRequestLocale(locale);

  const compiled = await compileContent([locale, ...slug].join('/'));
  const { content, toc, frontmatter, breadcrumbs } = compiled;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'components')}>
      <div className={styles.page}>
        <article className={styles.article}>
          <PageHeader {...frontmatter} breadcrumbs={breadcrumbs}>
            {toc[0].title || frontmatter.title}
          </PageHeader>
          {content}
        </article>
        <PageNavFooter />
      </div>
    </NextIntlClientProvider>
  );
}
