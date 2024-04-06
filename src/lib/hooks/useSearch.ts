'use client';

import MiniSearch, { SearchResult } from 'minisearch';
import { useEffect, useState } from 'react';
import { SearchItem } from '#/app/[locale]/search_index/route';

/**
 * Allow for search of static from static index file
 * @returns Object containing helper items for search
 */
export default function useSearch() {
  const [searchIndex, setIndex] = useState<MiniSearch>();
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchIndex) return;

    // load preindexed file from route
    fetch('/en/search_index').then(async (r) => {
      const serialIdx = await r.text();
      const idx = MiniSearch.loadJSON<SearchItem>(serialIdx, {
        fields: ['title', 'text'],
        storeFields: ['title', 'text', 'location']
      });

      setIndex(idx);
    });
  }, []);

  useEffect(() => {
    if (!searchText || !searchIndex) {
      setResults([]);
      return;
    }
    const r = searchIndex.search(searchText);
    setResults(r);
  }, [searchText]);

  return {
    results,
    searchText,
    setSearchText
  };
}
