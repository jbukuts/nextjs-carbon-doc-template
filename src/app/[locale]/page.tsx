import type { Locale } from '#/i18n';

interface LocalePageProps {
  params: { locale: Locale };
}

/**
 * Sourced from next-int static example
 *
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 */
export default function LocalePage(props: LocalePageProps) {
  const {
    params: { locale }
  } = props;

  return <>{locale}</>;
}
