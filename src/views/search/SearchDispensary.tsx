import React, { useEffect, useRef, useState } from 'react';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';

import DispensaryFilterSlideOver from '../slideOver/filters/DispensaryFilterSlideOver';
import { DispensaryResults } from '@/interfaces/dispensary';
import ListingSection from '../../components/sections/ListingSection';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useSelector } from 'react-redux';

export default function SearchDispensary() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: dispensaries, total }: DispensaryResults =
    listResults.dispensaries || [];
  const router = useRouter();
  const { category } = router.query;
  const { coords, label } = useSearchLocation();
  const [dispatchSearch, { loading }] = useAxios(false);

  const [filters, setFilters] = useState<any>({
    productType: [`${category ? category : ''}`],
    sort: [],
    amenities: [],
    distance: '',
  });

  const range = filters.distance ? filters.distance[0] : '5mi';
  const { distance, ...filterData } = filters;

  useEffect(() => {
    getDispensaries(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, coords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getDispensaries(from: number, concat: boolean) {
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
            concat,
            from,
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
    getDispensaries(dispensaries.length, true);
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
