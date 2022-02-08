import { Dispensary } from '@/interfaces/dispensary';
import { InformationCircleIcon } from '@heroicons/react/outline';
import ListingCardDropdown from '../listings/ListingCardDropDown';
import React from 'react';
import { RootState } from '@/reducers';
import { useSelector } from 'react-redux';

interface Listings {
  listings: Array<Dispensary>;
  sponsored?: boolean;
  query?: string;
  userCoords?: {
    lat: number;
    lon: number;
  };
}
export default function ListingSection(results: Listings) {
  const { listings, sponsored, query, userCoords } = results;
  const location = useSelector((root: RootState) => root.location);

  return (
    <section id="listing-section" className="max-w-7xl mx-auto">
      {sponsored ? (
        <div className="flex flex-wrap items-center px-4 py-3 pb-0">
          <h5 className="text-xs text-gray-500 font-semibold pr-1">
            Sponsored Result
          </h5>
          <InformationCircleIcon className="w-5 h-5 text-gray-500 " />
        </div>
      ) : (
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0 lg:text-2xl">
          {query
            ? `${listings.length} results for "${query}"`
            : `${listings.length} results near "${location.city ?? 'you'}"`}
        </h2>
      )}

      <div className="grid grid-flow-row auto-rows-max gap-1 lg:flex lg:flex-wrap">
        {listings.map((listing: Dispensary, index) => {
          return (
            <div className="lg:w-96 gap-4" key={`lc-${listing._id}-${index}`}>
              <ListingCardDropdown
                listing={listing}
                classNames="p-4 pb-0"
                userCoords={userCoords}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
