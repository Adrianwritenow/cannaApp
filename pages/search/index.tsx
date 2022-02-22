import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { RootState } from '@/reducers';
import SearchAll from '@/views/search/SearchAll';
import SearchDeals from '@/views/search/SearchDeals';
import SearchDispensary from '@/views/search/SearchDispensary';
import SearchNews from '@/views/search/SearchNews';
import SearchShopping from '@/views/search/SearchShopping';
import SearchStrain from '@/views/search/SearchStrain';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Search() {
  const router = useRouter();
  const [view, setView] = useState(0);
  const { listResults, query } = useSelector((root: RootState) => root.search);
  const location = useSelector(
    (root: RootState) => root.search.searchLocation.coords
  );
  const path = router.query;

  const tabs = [
    { name: 'All', href: '/search?type=all', current: false },
    { name: 'Shopping', href: '/search?type=shopping', current: false },
    { name: 'Dispensaries', href: '/search?type=dispensaries', current: false },
    { name: 'Strains', href: '/search?type=strains', current: false },
    { name: 'Map', href: '/search?type=map', current: false },
    { name: 'News', href: '/search?type=news', current: false },
    { name: 'Deals', href: '/search?type=deals', current: false },
  ];

  useEffect(() => {
    tabs.map((tab, index) => {
      const currentPath = tab.href.includes(`${path.view}`);
      if (currentPath) {
        setView(index);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, listResults, router]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

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
          <Tab.Panels className="focus:outline-none bg-gray-50 pb-8">
            <Tab.Panel className="focus:outline-none">
              <SearchAll
                query={query}
                userCoords={{ lat: location.lat, lon: location.lon }}
              />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              <SearchShopping query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              <SearchDispensary query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              <SearchStrain query={query} products={listResults.shopping} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none"></Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              <SearchNews query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              <SearchDeals />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
