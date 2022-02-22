import React, { useEffect, useState, useRef } from 'react';

import { Dispensary } from '@/interfaces/dispensary';
import DispensaryFilterSlideOver from '../slideOver/filters/DispensaryFilterSlideOver';
import ListingSection from '../../components/sections/ListingSection';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';

export default function SearchDispensary(props: { query: string }) {
  const { query } = props;
  const [dispensaries, setDispensaries] = useState<Array<Dispensary>>();
  const router = useRouter();
  const { category } = router.query;
  const location = useSearchLocation();
  const userCoords = location[1];
  const firstRender = useRef(true);

  const [filters, setFilters] = useState<any>({
    productType: [`${category ? category : ''}`],
    sort: [],
    amenities: [],
    distance: '',
  });

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
    getDispensaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, userCoords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getDispensaries() {
    const range = filters.distance ? filters.distance[0] : '5mi';
    const { distance, ...filterData } = filters;
    const hits: any = await combinedSearchQuery({
      q: query ?? '*',
      filters: filterData,
      distance: range,
      coords: { lat: userCoords.lat, lon: userCoords.lon },
      endpoints: ['dispenaries'],
      total: 10,
    });
    setDispensaries(hits);
  }

  function handleFilter(data: any) {
    setFilters(data);
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
              userCoords={{ lat: userCoords.lat, lon: userCoords.lon }}
            />
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
