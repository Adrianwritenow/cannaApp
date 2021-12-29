import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchLists, setSearchLists] = useState<SearchState>({
    news: [],
    deals: [],
    shopping: [],
    dispensaries: [],
    strains: [],
  });

  const path = router.query;

  const tabs = [
    { name: 'All', href: '/search?type=all', current: false },
    { name: 'News', href: '/search?type=news', current: false },
    { name: 'Deals', href: '/search?', current: false },
    { name: 'Shopping', href: '/search?type=shops', current: false },
    { name: 'Strains', href: '/search?type=strains', current: false },
    { name: 'Dispensaries', href: '/search?type=dispensaries', current: false },
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

    results.map((result: any, index: number) => {
      switch (true) {
        case result._id.includes('strain_entity'):
          searchListUpdate.strains.push(result);
          break;

        case result._id.includes('product_entity'):
          searchListUpdate.shopping.push(result);
          break;

        case result._id.includes('dispensary_entity'):
          searchListUpdate.dispensaries.push(result);
          break;
      }
    });
    if (currentQuery !== query) {
      setSearchLists(searchListUpdate);
    }
    setCurrentQuery(query);
  }, [view, results, searchLists]);

  return (
    <div className="bg-gray-50 ">
      <div className="overflow-visible overflow-scroll border-b border-gray-200 bg-white ">
        <Tab.Group defaultIndex={view}>
          <Tab.List className="w-full overflow-visible overflow-x-scroll border-b border-gray-200 flex">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `${
                    selected
                      ? 'border-green text-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                }
              >
                <span className="px-4">{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>
          {/* Panels that control the view by index */}
          <Tab.Panels className="focus:outline-none">
            <Tab.Panel className="focus:outline-none">
              {/* Search All */}
              <SearchAll lists={searchLists} query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search All */}
              <SearchNews />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Deals */}
              <SearchDeals />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Shopping */}
              <SearchShopping products={searchLists.shopping} query={query} />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Strain */}
              <SearchStrain
                strains={searchLists.strains}
                query={query}
                products={searchLists.shopping}
              />
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Dispensery */}
              <SearchDispensary
                dispensaries={searchLists.dispensaries}
                query={query}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
