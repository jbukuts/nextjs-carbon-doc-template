// import lunr, { Index } from 'lunr';
import MiniSearch, { SearchResult } from 'minisearch';
import { useEffect, useState } from 'react';
import { SearchItem } from '#/app/[locale]/search_index/route';

export default function useSearch() {
  // const [searchIndex, setIndex] = useState<Index>();
  const [searchIndex, setIndex] = useState<MiniSearch>();
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  // const [results, setResults] = useState<Index.Result[]>([]);

  useEffect(() => {
    if (searchIndex) return;

    fetch('/en/search_index').then(async (r) => {
      const serialIdx = await r.text();
      // const idx = lunr.Index.load(serialIdx);

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

  // return [results, setSearchText] as [SearchResult[], typeof setSearchText];
  return {
    results,
    searchText,
    setSearchText
  };
}
