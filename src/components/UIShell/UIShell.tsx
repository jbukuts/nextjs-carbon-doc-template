'use client';

import {
  Header,
  HeaderPanel,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SwitcherItem,
  Switcher
} from '@carbon/react';
import {
  AsleepFilled,
  EarthFilled,
  Home,
  LightFilled
} from '@carbon/react/icons';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ThemeProvider, useTheme } from 'next-themes';
import {
  useState,
  type ReactNode,
  useEffect,
  useReducer,
  createElement
} from 'react';
import { localeMap } from '#/i18n';
import useSupportedLocales from '#/lib/hooks/useSupportedLocales';
import type { SlugTree } from '#/lib/velite/generate-tree';
import CustomSideNavItem from './CustomSideNavItem';
import Footer from './Footer';
import ResponsiveContent from './ResponsiveContent';
import SearchBar from './SearchBar';
import SideNavTree from './SideNavTree';
import styles from './UIShell.module.scss';

interface UIShellProps {
  children: ReactNode;
  sideBarTree: SlugTree;
}

interface HeaderState {
  locale: boolean;
  toc: boolean;
}

function ToggleThemeAction() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('UIShell.Header.themeSwitcher');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <HeaderGlobalAction
      aria-label={t('label')}
      tooltipAlignment='end'
      onClick={toggleTheme}>
      {createElement(resolvedTheme === 'dark' ? LightFilled : AsleepFilled, {
        size: 20
      })}
    </HeaderGlobalAction>
  );
}

const toggleReducer = (
  state: HeaderState,
  action: { key: keyof HeaderState }
) => {
  const copyState = JSON.parse(JSON.stringify(state));
  const { key } = action;

  for (const k of Object.keys(copyState)) {
    copyState[k as typeof key] = false;
  }

  copyState[key] = !state[key];
  return copyState;
};

export default function UIShell(props: UIShellProps) {
  const { children, sideBarTree } = props;
  const [showSideNav, setShowSideNav] = useState(true);
  const [{ locale: localeOpen }, toggler] = useReducer<typeof toggleReducer>(
    toggleReducer,
    { locale: false }
  );
  const supportedLocales = useSupportedLocales(sideBarTree);
  const currentLocale = useLocale();
  const router = useRouter();
  const t = useTranslations('UIShell');

  const toggleSideBar = () => setShowSideNav((o) => !o);
  const toggleHeader = (key: keyof HeaderState) => {
    return () => toggler({ key });
  };

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute='class'
      value={{ light: 'cds--white', dark: 'cds--g100' }}
      themes={['light', 'dark']}>
      <Header aria-label='IBM VEST' className={styles.header}>
        <HeaderMenuButton
          className={styles.headerButton}
          aria-label={t(`Header.menuButton.${showSideNav ? 'close' : 'open'}`)}
          isCollapsible
          isActive={showSideNav}
          onClick={toggleSideBar}
          aria-expanded={showSideNav}
        />
        <HeaderName prefix='IBM'>VAD VAR Reborn</HeaderName>
        <HeaderGlobalBar>
          <SearchBar />

          <ToggleThemeAction />
          <HeaderGlobalAction
            isActive={localeOpen}
            aria-label={t('Header.localeSwitcher.label')}
            tooltipAlignment='end'
            onClick={toggleHeader('locale')}>
            <EarthFilled size={20} className={styles.icon} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>

        <HeaderPanel
          expanded={localeOpen}
          className={styles.headerPanel}
          onHeaderPanelFocus={toggleHeader('locale')}>
          <Switcher
            aria-label={t('Header.themeSwitcher.label')}
            expanded={localeOpen}>
            {supportedLocales.map((loc) => (
              <SwitcherItem
                isSelected={loc.locale === currentLocale}
                onClick={() => router.push(loc.pathname)}
                key={loc.locale}
                aria-label={loc.locale}
                className={styles.switcherItem}>
                {localeMap[loc.locale]}
              </SwitcherItem>
            ))}
          </Switcher>
        </HeaderPanel>

        <SideNav
          expanded={showSideNav}
          onOverlayClick={toggleSideBar}
          onSideNavBlur={toggleSideBar}
          className={styles.sideBar}
          aria-label={t('SideNav.label')}>
          <SideNavItems>
            <CustomSideNavItem href={`/${currentLocale}`} renderIcon={Home}>
              Home
            </CustomSideNavItem>
            <SideNavDivider />
            <SideNavTree
              navItems={sideBarTree.children![currentLocale]!.children!}
            />
          </SideNavItems>
        </SideNav>
      </Header>

      <ResponsiveContent className={styles.content} as='div'>
        <main>{children}</main>
        <Footer />
      </ResponsiveContent>
    </ThemeProvider>
  );
}
