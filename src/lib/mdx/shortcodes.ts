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
  ListItem,
  BlockQuote,
  SmartLink,
  CodeBlock,
  Image,
  Table,
  QuizAlert,
  Warning,
  Danger
} from '#/components/shortcodes';
import Headings from '#/components/shortcodes/Heading';
import TileGrid from '#/components/TileGrid';

type ComponentMap = MDXRemoteProps['components'];
type ShortCode = keyof typeof import('#/components/shortcodes');

const LazyShortCode = (code: ShortCode) =>
  dynamic<any>(() =>
    import('#/components/shortcodes/index').then((mod) => mod[code])
  );

const customComponents: ComponentMap = {
  QuizAlert: QuizAlert,
  Warning: Warning,
  Danger: Danger,
  TokenizationApplet: LazyShortCode('TokenizationApplet'),
  NavTile: NavTile,
  WatsonxResources: () =>
    createElement(FragmentLoader, { name: 'watsonx-resources' }),
  TileGrid: TileGrid
};

const shortcodes: ComponentMap = {
  blockquote: BlockQuote,
  a: SmartLink,
  code: CodeBlock,
  img: Image,
  // heading elements
  h1: () => null,
  h2: Headings[2],
  h3: Headings[3],
  h4: Headings[4],
  h5: Headings[5],
  h6: Headings[6],
  // list elements
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  // table elements
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  th: TableHeadData,
  td: TableData,
  tr: TableRow,
  ...customComponents
};

export default shortcodes;
