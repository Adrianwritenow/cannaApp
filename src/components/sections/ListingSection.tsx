import { Dispensary } from '@/interfaces/dispensary';
import { InformationCircleIcon } from '@heroicons/react/outline';
import ListingCardDropdown from '../listings/ListingCardDropDown';
import React from 'react';
import { useSearchLocation } from '@/hooks/useSearchLocation';

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
  const [locationLabel] = useSearchLocation();

  return (
    <section id="listing-section">
      {sponsored ? (
        <div className="flex flex-wrap items-center px-4 py-3 pb-0">
          <h5 className="text-xs text-gray-500 font-semibold pr-1">
            Sponsored Result
          </h5>
          <InformationCircleIcon className="w-5 h-5 text-gray-500 " />
        </div>
      ) : (
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          {query
            ? `${listings.length} results for "${query}"`
            : `${listings.length} results near "${locationLabel ?? 'you'}"`}
        </h2>
      )}

      <div className="grid grid-flow-row auto-rows-max gap-1">
        {listings.map((listing: Dispensary, index) => {
          return (
            <ListingCardDropdown
              listing={listing}
              key={`lc-${listing._id}-${index}`}
              classNames="p-4 pb-0"
              userCoords={userCoords}
            />
          );
        })}
      </div>
    </section>
  );
}
