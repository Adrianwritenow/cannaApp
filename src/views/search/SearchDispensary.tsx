import React, { useEffect, useState } from 'react';

import { Dispensary } from '@/interfaces/dispensary';
import DispensaryFilterSlideOver from '../slideOver/filters/DispensaryFilterSlideOver';
import ListingSection from '../../components/sections/ListingSection';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function SearchDispensary(props: {
  query: string;
  userCoords: {
    lat: number;
    lon: number;
  };
}) {
  const { query, userCoords } = props;

  const [dispensaries, setdispensaries] = useState<Array<Dispensary>>();
  const [update, setUpdate] = useState(true);
  const router = useRouter();
  const { category } = router.query;
  const location = useSelector(
    (root: RootState) => root.search.searchLocation.coords
  );

  const [filters, setFilters] = useState<any>({
    productType: [`${category ? category : ''}`],
    sort: [],
    amenities: [],
    distance: [],
  });
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    console.log('LOCATION:::', location);

    console.log('USER COORDS:::', userCoords);
    getDispensaries();
  }, [update, query, currentQuery, filters, userCoords, location]);

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
    setdispensaries(hits);
    setUpdate(false);
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
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
