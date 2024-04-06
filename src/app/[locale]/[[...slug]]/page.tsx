import pick from 'lodash/pick';
import type { Metadata, ResolvingMetadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { PageHeader } from '#/components/ui';
import compileContent from '#/lib/mdx/compile-content';
import { SLUG_MAP } from '#/lib/velite';
import { generateMergedMetadata } from '#/shared-metadata';
import styles from './page.module.scss';

type Slug = { slug?: string[]; locale: string };

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

    // if (splitSlug.length === 0) splitSlug.push('');

    console.log(locale, splitSlug);

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
    params: { slug = [], locale }
  } = props;

  const fullSlug = [locale, ...slug].join('/');
  const { title: t, toc_tree, updated, excerpt, desc } = SLUG_MAP[fullSlug];

  const title = t || toc_tree[0].title || undefined;
  const description = desc ? desc : excerpt;

  return generateMergedMetadata({
    title,
    description,
    alternates: {
      canonical: fullSlug
    },
    twitter: { title, description },
    openGraph: {
      type: 'article',
      title,
      description,
      url: fullSlug,
      locale,
      modifiedTime: updated
    }
  });
}

export default async function LabPage(props: PageProps) {
  const {
    params: { slug = [], locale }
  } = props;

  unstable_setRequestLocale(locale);

  const fullSlug = [locale, ...slug].join('/');
  const { content, toc, frontmatter, breadcrumbs } = await compileContent(
    fullSlug,
    { h1: () => null }
  );

  /**
   * Supply localized text to client components
   *
   * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components#option-3-providing-individual-messages
   */
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
        {/** TODO: Implement next/prev logic */}
        {/* <PageNavFooter /> */}
      </div>
    </NextIntlClientProvider>
  );
}
