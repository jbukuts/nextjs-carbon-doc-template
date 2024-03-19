import 'server-only';

import dynamic from 'next/dynamic';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { createElement } from 'react';
import FragmentLoader from '#/components/FragmentLoader';
import NavTile from '#/components/NavTile';
import {
  TableHead,
  TableBody,
  TableHeadData,
  TableData,
  TableRow,
  UnorderedList,
  OrderedList,
  ListItem
} from '#/components/shortcodes';
import Headings from '#/components/shortcodes/Heading';
import TileGrid from '#/components/TileGrid';

type ShortCode = keyof typeof import('#/components/shortcodes');
const LazyShortCode = (code: ShortCode) =>
  dynamic<any>(() =>
    import('#/components/shortcodes/index').then((mod) => mod[code])
  );

const tableShortCodes: MDXRemoteProps['components'] = {
  table: LazyShortCode('Table'),
  thead: TableHead,
  tbody: TableBody,
  th: TableHeadData,
  td: TableData,
  tr: TableRow
};

const listShortcodes: MDXRemoteProps['components'] = {
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem
};

const headingShortcodes: MDXRemoteProps['components'] = {
  h1: () => null,
  h2: Headings[2],
  h3: Headings[3],
  h4: Headings[4],
  h5: Headings[5],
  h6: Headings[6]
};

const calloutShortCodes: MDXRemoteProps['components'] = {
  QuizAlert: LazyShortCode('QuizAlert'),
  Warning: LazyShortCode('Warning'),
  Danger: LazyShortCode('Danger'),
  blockquote: LazyShortCode('BlockQuote')
};

const shortcodes: MDXRemoteProps['components'] = {
  a: LazyShortCode('SmartLink'),
  code: LazyShortCode('CodeBlock'),
  img: LazyShortCode('Image'),
  TokenizationApplet: LazyShortCode('TokenizationApplet'),
  TileGrid: TileGrid,
  NavTile: NavTile,
  WatsonxResources: () =>
    createElement(FragmentLoader, { name: 'watsonx-resources' }),
  ...calloutShortCodes,
  ...headingShortcodes,
  ...tableShortCodes,
  ...listShortcodes
};

export default shortcodes;
