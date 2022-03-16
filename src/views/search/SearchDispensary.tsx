import React, { useEffect, useRef, useState } from 'react';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';

import { Dispensary } from '@/interfaces/dispensary';
import DispensaryFilterSlideOver from '@/views/slideOver/filters/DispensaryFilterSlideOver';
import ListingSection from '@/components/sections/ListingSection';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';

export default function SearchDispensary() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const [dispensaries, setDispensaries] = useState<Array<Dispensary>>();
  const router = useRouter();
  const { isReady } = router;
  const { category } = router.query;
  const { coords, label } = useSearchLocation();
  const [dispatchSearch, { loading }] = useAxios(false);
  // const firstRender = useRef(true);

  const [filters, setFilters] = useState<any>({
    productType: [`${category ? category : ''}`],
    sort: [],
    amenities: [],
    distance: '',
  });

  const range = filters.distance ? filters.distance[0] : '5mi';
  const { distance, ...filterData } = filters;

  useEffect(() => {
    // Without this the request always runs twice on the initial render since
    // the `filters` value changes as a side effect from another component.
    // This is sort of a workaround, ideally we can remove if we can convert
    // the search request to `useAxios` and check if the request is already
    // loading.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isReady) {
      getDispensaries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isReady, filters, coords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getDispensaries() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filterData,
        distance: range,
        coords: coords,
        endpoints: [
          {
            name: 'dispenaries',
            key: 'dispensaries',
            geolocate: true,
          },
        ],
        total: 10,
      })
    );
  }

  function handleFilter(data: any) {
    setFilters(data);
  }

  function handleLoadMore() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filterData,
        distance: range,
        coords: coords,
        endpoints: [
          {
            name: 'dispenaries',
            key: 'dispensaries',
            from: dispensaries.length,
            geolocate: true,
            concat: true,
          },
        ],
        total: 10,
      })
    );
  }

  return (
    <div className="bg-gray-50">
      <DispensaryFilterSlideOver setFilters={handleFilter} />
      <div>
        {dispensaries?.length ? (
          <div>
            <ListingSection
              listings={dispensaries}
              query={query}
              userCoords={coords}
              heading={` ${
                query
                  ? `${total} results for "${query}"`
                  : `${total} results near "${label ?? 'you'}"`
              }`}
            />
            <div className="flex justify-center py-10">
              <button
                onClick={handleLoadMore}
                className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              >
                Load More
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
            <SvgEmptyState className="w-40 h-40" />
            <div className="w-full space-y-3">
              <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                Sorry, there are no results for this search.
              </h2>
              <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
                Please try again with different or more general keywords.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
