import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Link from 'next/link';
import { RootState } from '@/reducers';
import SearchAll from '../../src/views/search/SearchAll';
import SearchDeals from '../../src/views/search/SearchDeals';
import SearchDispensary from '../../src/views/search/SearchDispensary';
import SearchNews from '@/views/search/SearchNews';
import SearchShopping from '@/views/search/SearchShopping';
import { SearchState } from '@/interfaces/searchState';
import SearchStrain from '../../src/views/search/SearchStrain';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Search() {
  const router = useRouter();
  const [view, setView] = useState(0);
  const { results, query } = useSelector((root: RootState) => root.search);
  const location = useSelector((root: RootState) => root.location);
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchLists, setSearchLists] = useState<SearchState>({
    news: [],
    deals: [],
    shopping: [],
    dispensaries: [],
    strains: [],
    blogs: [],
  });

  const path = router.query;

  const tabs = [
    { name: 'All', href: '/search?type=all', current: false },
    { name: 'News', href: '/search?type=news', current: false },
    { name: 'Map', href: '/search?type=map', current: false },
    { name: 'Deals', href: '/search?type=deals', current: false },
    { name: 'Shopping', href: '/search?type=shopping', current: false },
    { name: 'Strains', href: '/search?type=strains', current: false },
    { name: 'Dispensaries', href: '/search?type=dispensaries', current: false },
  ];

  useEffect(() => {
    tabs.map((tab, index) => {
      const currentPath = tab.href.includes(`${path.view}`);
      if (currentPath) {
        setView(index);
      }
    });

    setCurrentQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, results]);

  return (
    <div className="bg-white ">
      <div className="overflow-visible overflow-scroll border-b border-gray-200 bg-white">
        <Tab.Group
          defaultIndex={view}
          onChange={() => {
            router.replace({ query: '' });
          }}
        >
          <Tab.List className="w-full overflow-visible overflow-x-scroll  flex max-w-7xl mx-auto">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `${
                    selected
                      ? 'border-green text-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                }
              >
                {tab.name === 'Map' ? (
                  <Link href="/map" passHref>
                    <a className="px-4">{tab.name}</a>
                  </Link>
                ) : (
                  <span className="px-4">{tab.name}</span>
                )}
              </Tab>
            ))}
          </Tab.List>
          {/* Panels that control the view by index */}
          <Tab.Panels className="focus:outline-none bg-gray-50">
            <Tab.Panel className="focus:outline-none">
              {/* Search All */}
              <SearchAll
                query={query}
                userCoords={{ lat: location.lat, lon: location.lon }}
              />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search All */}
              <SearchNews query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Link to Map */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Deals */}
              <SearchDeals />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Shopping */}
              <SearchShopping query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Strain */}
              <SearchStrain query={query} products={searchLists.shopping} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Dispensery */}
              <SearchDispensary
                query={query}
                userCoords={{ lat: location.lat, lon: location.lon }}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
