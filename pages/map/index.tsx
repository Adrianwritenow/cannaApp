import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import React, { useEffect, useState } from 'react';
import SearchMap from '@/views/search/SearchMap';
import { SearchState } from '@/interfaces/searchState';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';

function Map() {
  const [view, setView] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const { results, query } = useSelector((root: RootState) => root.search);
  const [searchLists, setSearchLists] = useState<SearchState>({
    news: [],
    deals: [],
    shopping: [],
    dispensaries: [],
    strains: [],
  });
  const router = useRouter();
  const path = router.query;
  const tabs = [
    { name: 'All', href: '/search?type=all', current: false },
    { name: 'News', href: '/search?type=news', current: false },
    { name: 'Map', href: '/search?type=dispensaries', current: false },
    { name: 'Deals', href: '/search?', current: false },
    { name: 'Shopping', href: '/search?type=shops', current: false },
    { name: 'Strains', href: '/search?type=strains', current: false },
    {
      name: 'Dispensaries',
      href: '/search?type=dispensaries',
      current: false,
    },
  ];

  useEffect(() => {
    tabs.map((tab, index) => {
      const currentPath = tab.href.includes(`${path.type}`);
      if (currentPath) {
        setView(index);
      }
    });

    let searchListUpdate: SearchState = {
      news: [],
      deals: [],
      shopping: [],
      dispensaries: [],
      strains: [],
    };

    if (results.length) {
      results[0].dispensaries.map((result: any, index: number) => {
        searchListUpdate.dispensaries.push(result);
      });
    }
    if (currentQuery !== query) {
      setSearchLists(searchListUpdate);
    }
    setCurrentQuery(query);
  }, [view, results, searchLists]);

  return (
    <div className="bg-white">
      <div className="pt-4">
        <MapFilterSlideOver />
      </div>
      <SearchMap dispensaries={searchLists.dispensaries} query={query} />
    </div>
  );
}

export default Map;
