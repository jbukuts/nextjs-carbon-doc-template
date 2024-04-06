'use client';

import { ExpandableSearch } from '@carbon/react';
import { Document } from '@carbon/react/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSearch from '#/lib/hooks/useSearch';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const { results, searchText, setSearchText } = useSearch();
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div
      className={styles.searchWrapper}
      onBlur={(e) =>
        setExpanded(
          !(
            e.relatedTarget !== e.currentTarget &&
            !e.currentTarget.contains(e.relatedTarget)
          )
        )
      }>
      <ExpandableSearch
        isExpanded={expanded}
        onFocus={() => setExpanded(true)}
        onChange={(s) => setSearchText(s.target.value)}
        className={styles.searchBar}
        size='lg'
        labelText='search site'
      />
      {expanded && (
        <div className={styles.resultsWrapper}>
          <div className={styles.resultsAmount}>
            {results.length} results found
          </div>
          {results.length > 0 &&
            results.map((r) => {
              return (
                <Link
                  onClick={() => setExpanded(false)}
                  href={`${r.location}:~:text=${encodeURI(searchText)}`}
                  key={r.id}
                  className={styles.searchResult}>
                  <span className={styles.resultTitle}>
                    <Document />
                    {r.title}
                  </span>
                  {/* <div dangerouslySetInnerHTML={{ __html: r.text }} /> */}
                  {/* <div>{r.text}</div> */}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
