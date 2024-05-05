import path from 'path';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { isURLRelative } from '#/lib/helpers';

const IS_DEV = process.env.NODE_ENV === 'development';
const START_URL = IS_DEV
  ? '/'
  : 'https://raw.githubusercontent.com/jbukuts/nextjs-carbon-doc-template/main/';

interface Options {
  prepend: string;
}

/**
 * Prepends an images url with a input string
 *
 * Meant only to be used in a Node environment due to use of `path` module
 * @param options
 * @returns transformer function for comsumption as plugin
 */
export default function remarkImage(options: Options) {
  function visitor(node: Node) {
    if (
      'url' in node &&
      typeof node.url === 'string' &&
      isURLRelative(node.url)
    ) {
      const test = [...options.prepend.split('/'), ...node.url.split('/')];
      node.url = START_URL + path.join(...test);
    }
  }

  return function transform(tree: Node) {
    if (options && options.prepend) {
      visit(tree, 'image', visitor);
    } else {
      throw Error('Missing required `prepend` option.');
    }
  };
}
