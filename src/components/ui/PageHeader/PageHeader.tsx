'use client';

import { Stack } from '@carbon/react';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import cx from 'classnames';
import type { collectBreadcrumbs } from '#/lib/velite';
import CustomStack from '../Stack';
import { ReadingTimeTag, UpdatedTag } from '../Tags';
import { ContentLevelTag } from '../Tags/Tags';
import ServerBreadCrumbs from './Breadcrumbs';
import styles from './PageHeader.module.scss';

interface HeaderProps extends React.ComponentProps<'header'> {
  updated?: string;
  level?: string;
  timeToComplete?: number;
  breadcrumbs?: ReturnType<typeof collectBreadcrumbs>;
}

export default function Header(props: HeaderProps) {
  const { children, updated, level, timeToComplete, breadcrumbs = [] } = props;

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '-32px'
  });

  return (
    <>
      <CustomStack
        as='header'
        className={styles.staticHeader}
        ref={ref}
        orientation='vertical'>
        <CustomStack
          className='hide-lesser-than-md'
          orientation='horizontal'
          justify='space-between'
          align='flex-start'>
          {breadcrumbs.length > 0 && (
            <ServerBreadCrumbs breadcrumbs={breadcrumbs} />
          )}
          <Stack gap={2} orientation='horizontal'>
            {timeToComplete && (
              <ReadingTimeTag type='gray' timeToComplete={timeToComplete} />
            )}
            {updated && <UpdatedTag type='gray' updated={updated} />}
            {level && <ContentLevelTag level={level} />}
          </Stack>
        </CustomStack>
        <h1>{children}</h1>
      </CustomStack>

      <CustomStack
        as='header'
        className={cx(
          styles.stickyHeader,
          !entry?.isIntersecting && styles.showSticky
        )}
        orientation='horizontal'
        align='center'
        justify='space-between'>
        <a className={styles.staticHeaderTitle} title='Scroll to top' href='#'>
          {children}
        </a>
      </CustomStack>
    </>
  );
}
