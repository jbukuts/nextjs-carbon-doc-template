import { Dropdown } from '@carbon/react';
import { EarthFilled } from '@carbon/react/icons';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import useSupportedLocales from '#/lib/hooks/useSupportedLocales';
import type { SlugTree } from '#/lib/velite/generate-tree';
import { localeMap } from '#i18n-config';
import styles from './LangDropdown.module.scss';

interface LangDropdownProps {
  sideBarTree: SlugTree;
}

export default function LangDropdown(props: LangDropdownProps) {
  const { sideBarTree } = props;

  const t = useTranslations('UIShell');
  const currentLocale = useLocale() || undefined;
  const supportedLocales = useSupportedLocales(sideBarTree);
  const router = useRouter();

  return (
    supportedLocales.length > 0 &&
    currentLocale && (
      <Dropdown
        renderSelectedItem={(i) => (
          <div className={styles.selectedItem}>
            <EarthFilled size={20} className={styles.icon} />
            <span>{localeMap[i!.locale]}</span>
          </div>
        )}
        titleText=''
        aria-label={t('Header.localeSwitcher.label')}
        onChange={({ selectedItem }) =>
          selectedItem && router.push(selectedItem.pathname)
        }
        initialSelectedItem={supportedLocales.find(
          (i) => i.locale === currentLocale
        )}
        disabled={supportedLocales.length === 1}
        className={styles.selectLang}
        label={t('Header.localeSwitcher.label')}
        itemToString={(i) => localeMap[i!.locale]}
        id='locale-select'
        items={supportedLocales}
        size='lg'
      />
    )
  );
}
