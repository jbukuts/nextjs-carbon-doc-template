'use client';

import { SideNavLinkText, usePrefix } from '@carbon/react';
import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from '../UIShell.module.scss';

interface CustomSideNavItemProps {
  href: string;
  children: ReactNode;
  depth?: number;
  renderIcon?: React.ElementType;
}

// custom link implementation to stop remounts
export default function CustomSideNavItem(props: CustomSideNavItemProps) {
  const { href, children, renderIcon: CustomIconElement, depth = 0 } = props;
  const prefix = usePrefix();
  const pathname = usePathname();

  const isActive = pathname === href;
  const linkClassName = cx(
    `${prefix}--side-nav__link`,
    styles[`col-${depth}`],
    styles.sideNavMenuItem,
    isActive && `${prefix}--side-nav__link--current`
  );

  return (
    <li className={`${prefix}--side-nav__menu-item`}>
      <Link href={href} className={linkClassName}>
        {CustomIconElement ? (
          <div className={`${prefix}--tag__custom-icon`}>
            <CustomIconElement />
          </div>
        ) : (
          ''
        )}
        <SideNavLinkText>{children}</SideNavLinkText>
      </Link>
    </li>
  );
}
