'use client';

import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SideNav,
  SideNavDivider,
  SideNavItems
} from '@carbon/react';
import { Home, UserProfile } from '@carbon/react/icons';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SlugTree } from '#/lib/velite/generate-tree';
import CustomSideNavItem from './CustomSideNavItem';
import Footer from './Footer';
import LangDropdown from './LangDropdown';
import ResponsiveContent from './ResponsiveContent';
import SearchBar from './SearchBar';
import SideNavTree from './SideNavTree';
import ToggleThemeAction from './ToggleThemeAction';
import styles from './UIShell.module.scss';

interface UIShellProps {
  children: ReactNode;
  sideBarTree: SlugTree;
  lang: string;
}

export default function UIShell(props: UIShellProps) {
  const { children, sideBarTree, lang } = props;
  const [showSideNav, setShowSideNav] = useState(false);
  const currentLocale = useLocale();
  const t = useTranslations('UIShell');
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleSideBar = () => setShowSideNav((o) => !o);

  useEffect(() => {
    // internal breakpoint check doesn't work within sidebar for dev
    sidebarRef.current?.removeAttribute('inert');
  }, []);

  return (
    <>
      <Header className={styles.header} aria-label='header'>
        <HeaderMenuButton
          className={styles.headerButton}
          aria-label={t(`Header.menuButton.${showSideNav ? 'close' : 'open'}`)}
          isCollapsible
          isActive={showSideNav}
          onClick={toggleSideBar}
          aria-expanded={showSideNav}
        />
        <HeaderName prefix='Carbon'>Next.js Template</HeaderName>
        <HeaderGlobalBar>
          <SearchBar />
          <LangDropdown sideBarTree={sideBarTree} />
          <ToggleThemeAction />
          <HeaderGlobalAction tooltipAlignment='end' aria-label='Profile'>
            <UserProfile />
          </HeaderGlobalAction>
        </HeaderGlobalBar>

        <SideNav
          ref={sidebarRef}
          expanded={showSideNav}
          onOverlayClick={toggleSideBar}
          aria-label={t('SideNav.label')}
          className={styles.sideBar}
          isPersistent
          isChildOfHeader>
          <SideNavItems>
            <CustomSideNavItem href={`/${currentLocale}`} renderIcon={Home}>
              Home
            </CustomSideNavItem>
            <SideNavDivider />
            <SideNavTree
              navItems={sideBarTree.children![currentLocale].children || {}}
            />
          </SideNavItems>
        </SideNav>
      </Header>

      <ResponsiveContent className={styles.content} as='div'>
        <main lang={lang}>{children}</main>
        <Footer />
      </ResponsiveContent>
    </>
  );
}
