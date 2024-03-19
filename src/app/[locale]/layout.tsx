import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import UIShell from '#/components/UIShell';
import { locales, type Locale } from '#/i18n';
import { SLUG_TREE } from '#/lib/velite';

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
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale }
}: Readonly<LocaleLayoutProps>) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={pick(messages, 'UIShell')}>
          <UIShell sideBarTree={SLUG_TREE}>{children}</UIShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
