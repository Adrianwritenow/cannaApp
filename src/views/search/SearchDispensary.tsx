import React, { useEffect, useState } from 'react';

import { Dispensary } from '@/interfaces/dispensary';
import ListingCardDropdown from '../../components/listings/ListingCardDropDown';
import ListingSection from '../../components/sections/ListingSection';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';

export default function SearchStrain(props: {
  query: string;
  userCoords: {
    lat: number;
    lon: number;
  };
}) {
  const { query, userCoords } = props;

  const [dispenaries, setDispenaries] = useState<Array<Dispensary>>();
  const [update, setUpdate] = useState(true);
  const location = useSelector((root: RootState) => root.location);

  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (update || currentQuery !== query) {
      getProducts();
    }
  }, [update, query]);

  async function getProducts() {
    const hits: any = await combinedSearchQuery({
      search: query ? query : location.city ,
      endpoints: ['dispenaries'],
      total: 10,
    });
    setDispenaries(hits);
    setUpdate(false);
    setCurrentQuery(query);
  }

  return (
    <div className="bg-gray-50">
      <ProductFilterSlideOver setFilters={() => {}} />
      <div>
        {dispenaries ? (
          <div>
            <ListingSection
              listings={dispenaries}
              query={query}
              userCoords={{ lat: userCoords.lat, lon: userCoords.lon }}
            />
            <div className="pt-5">
              <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
                {`Dispensaries near "${query? query : location.city}"`}
              </h2>
              <div className="grid grid-flow-row auto-rows-max gap-1 px-4">
                {dispenaries.map((dispensary: Dispensary, index) => (
                  <ListingCardDropdown
                    listing={dispensary}
                    key={`sd-${index}`}
                    userCoords={{ lat: userCoords.lat, lon: userCoords.lon }}
                  />
                ))}
              </div>
            </div>
            <div className="px-4 pt-5">
              <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
                See more
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
