// import 'server-only';

import { Home } from '@carbon/react/icons';
import cx from 'classnames';
import Link from 'next/link';
import type { collectBreadcrumbs } from '#/lib/velite';

interface ServerBreadCrumbsProps {
  breadcrumbs: ReturnType<typeof collectBreadcrumbs>;
}

export default function ServerBreadCrumbs(props: ServerBreadCrumbsProps) {
  const { breadcrumbs } = props;

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='cds--breadcrumb cds--breadcrumb--no-trailing-slash'>
        <li className='cds--breadcrumb-item'>
          <Home size={16} />
        </li>

        {breadcrumbs.map((part, index) => {
          const c = cx(
            'cds--breadcrumb-item',
            index === breadcrumbs.length - 1 && 'cds--breadcrumb-item--current'
          );

          const { slug, title } = part;
          return (
            <li className={c} key={index}>
              <Link href={slug} className='cds--link'>
                {title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
