import { Dropdown } from '@carbon/react';
import { EarthFilled } from '@carbon/react/icons';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { localeMap } from '#/i18n';
import useSupportedLocales from '#/lib/hooks/useSupportedLocales';
import type { SlugTree } from '#/lib/velite/generate-tree';
import styles from './LangDropdown.module.scss';

interface LangDropdownProps {
  sideBarTree: SlugTree;
}

export default function LangDropdown(props: LangDropdownProps) {
  const { sideBarTree } = props;

  const t = useTranslations('UIShell');
  const currentLocale = useLocale();
  const supportedLocales = useSupportedLocales(sideBarTree);
  const router = useRouter();

  const currentItem = supportedLocales.find((i) => i.locale === currentLocale);

  return (
    <Dropdown
      renderSelectedItem={(i) => (
        <div className={styles.selectedItem}>
          <EarthFilled size={20} className={styles.icon} />
          {localeMap[i!.locale]}
        </div>
      )}
      aria-label={t('Header.localeSwitcher.label')}
      onChange={(s) => s.selectedItem && router.push(s.selectedItem.pathname)}
      selectedItem={currentItem}
      disabled={supportedLocales.length === 1}
      className={styles.selectLang}
      label={t('Header.localeSwitcher.label')}
      itemToString={(i) => localeMap[i!.locale]}
      id='locale-select'
      items={supportedLocales}
      size='lg'
    />
  );
}