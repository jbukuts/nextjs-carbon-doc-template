import path from 'path';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { isURLRelative } from '#/lib/helpers';

const GIT_BASE_URL = 'https://raw.githubusercontent.com';
const GIT_DEF_BRANCH = 'main';

interface Options {
  prepend: string;
  git?: {
    owner: string;
    repo: string;
    branch?: string;
    baseURL?: string;
  };
}

/**
 * Prepends an images url with a input string
 *
 * Meant only to be used in a Node environment due to use of `path` module
 *
 * @param {Options} options
 * @returns transformer function for comsumption as plugin
 */
export default function remarkImage(options: Options) {
  function visitor(node: Node) {
    if (
      'url' in node &&
      typeof node.url === 'string' &&
      isURLRelative(node.url)
    ) {
      const { prepend, git } = options;

      const startURL = git
        ? new URL(
            `/${git.owner}/${git.repo}/${git.branch || GIT_DEF_BRANCH}/`,
            git.baseURL || GIT_BASE_URL
          ).toString()
        : '/';

      const test = [...prepend.split('/'), ...node.url.split('/')];
      node.url = startURL + path.join(...test);
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
