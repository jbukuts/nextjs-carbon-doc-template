import type { Locale } from '#/i18n';

interface LocalePageProps {
  params: { locale: Locale };
}

export default function LocalePage(props: LocalePageProps) {
  const {
    params: { locale }
  } = props;

  return <>{locale}</>;
}
