import { ExpandableSearch } from '@carbon/react';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <ExpandableSearch
      className={styles.searchBar}
      size='lg'
      labelText='search site'
    />
  );
}
