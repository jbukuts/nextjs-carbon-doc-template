import 'server-only';

import collectBreadcrumbs from './collect-breadcrumbs';
import generateLocaleList from './generate-locales';
import generateMap from './generate-map';
import generateSlugTree from './generate-tree';

const SLUG_TREE = generateSlugTree();
const SLUG_MAP = generateMap();
const LOCALE_LIST = generateLocaleList();

export { SLUG_MAP, SLUG_TREE, LOCALE_LIST, collectBreadcrumbs };
