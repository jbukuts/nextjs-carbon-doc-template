import 'server-only';

import collectBreadcrumbs from './collect-breadcrumbs';
import generateLocaleList from './generate-locales';
import generateMap from './generate-map';
import generateSearchList from './generate-search-list';
import generateSlugTree from './generate-tree';

const SLUG_TREE = generateSlugTree();
const SLUG_MAP = generateMap();
const SEARCH_LISTS = generateSearchList();
const LOCALE_LIST = generateLocaleList();

export { SLUG_MAP, SLUG_TREE, SEARCH_LISTS, LOCALE_LIST, collectBreadcrumbs };
