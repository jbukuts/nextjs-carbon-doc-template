import pick from 'lodash/pick';
import { Metadata, ResolvingMetadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { PageHeader } from '#/components/ui';
import type { Locale } from '#/i18n';
import compileContent from '#/lib/mdx/compile-content';
import { SLUG_MAP } from '#/lib/velite';
import { generateMergedMetadata } from '#/shared-metadata';
import styles from './[...slug]/page.module.scss';

interface LocalePageProps {
  params: { locale: Locale };
}

/**
 * Generate SEO metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata(
  props: LocalePageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    params: { locale }
  } = props;

  const { title: t, toc_tree, updated, excerpt, desc } = SLUG_MAP[locale];

  const title = t || toc_tree[0].title || undefined;
  const description = desc ? desc : excerpt;

  const slug = `/${locale}`;

  return generateMergedMetadata({
    title,
    description,
    alternates: {
      canonical: slug
    },
    twitter: { title, description },
    openGraph: {
      type: 'article',
      title,
      description,
      url: slug,
      locale,
      modifiedTime: updated
    }
  });
}

/**
 * Sourced from next-int static example
 *
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 */
export default async function LocalePage(props: LocalePageProps) {
  const {
    params: { locale }
  } = props;

  unstable_setRequestLocale(locale);

  const { content, toc, frontmatter, breadcrumbs } = await compileContent(
    locale,
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
