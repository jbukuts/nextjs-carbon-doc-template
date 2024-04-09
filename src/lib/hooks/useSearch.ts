'use client';

import MiniSearch, { SearchResult } from 'minisearch';
import { useEffect, useState } from 'react';
import { SearchItem } from '#/app/[locale]/search_index.json/route';

const { NEXT_PUBLIC_BASE_PATH = '' } = process.env;

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
    fetch(`${NEXT_PUBLIC_BASE_PATH}/en/search_index.json`).then(async (r) => {
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
