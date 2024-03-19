'use client';

import { Link as CarbonLink } from '@carbon/react';
import Link from 'next/link';
import { isURLRelative } from '#/lib/helpers';

type SmartLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function SmartLink(props: SmartLinkProps) {
  const { href = '', children } = props;

  const isRelativeLink = isURLRelative(href);

  return (
    <CarbonLink as={isRelativeLink ? Link : 'a'} href={href}>
      {children}
    </CarbonLink>
  );
}
