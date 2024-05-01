import pick from 'lodash/pick';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import UIShell from '#/components/ui/UIShell';
import { SLUG_TREE } from '#/lib/velite';
import { Locale, SUPPORTED_LOCALES } from '#i18n-config';

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

/**
 * SSG function to determine slugs to prerender
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

/**
 * Sourced from next-int static example
 *
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 */
export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<LocaleLayoutProps>) {
  unstable_setRequestLocale(locale);

  /**
   * Supply localized text to client components
   *
   * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components#option-3-providing-individual-messages
   */
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pick(messages, ['UIShell', 'components'])}>
      <UIShell sideBarTree={SLUG_TREE} lang={locale}>
        <div className='page-wrapper'>{children}</div>
      </UIShell>
    </NextIntlClientProvider>
  );
}
