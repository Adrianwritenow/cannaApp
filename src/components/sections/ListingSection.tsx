import { Dispensary } from '@/interfaces/dispensary';
import { InformationCircleIcon } from '@heroicons/react/outline';
import ListingCardDropdown from '../listings/ListingCardDropDown';
import ListingCardSmall from '../listings/ListingCardSmall';
import React from 'react';

interface Listings {
  listings: Array<Dispensary>;
  sponsored?: boolean;
  query?: string;
  userCoords?: {
    lat: number;
    lng: number;
  };
}
export default function ListingSection(results: Listings) {
  const { listings, sponsored, query, userCoords } = results;
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
          {`${listings.length} Results for "${query}"`}
        </h2>
      )}

      <div className="grid grid-flow-row auto-rows-max gap-1">
        {listings.map((listing: Dispensary, index) => {
          if (index <= 4) {
            return (
              <ListingCardDropdown
                listing={listing}
                key={`lc-${listing._id}-${index}`}
                classNames="p-4 pb-0"
                userCoords={userCoords}
              />
            );
          } else {
            return (
              <ListingCardSmall
                listing={listing}
                key={`lcs-${listing._id}-${index}`}
              />
            );
          }
        })}
      </div>
      {!sponsored ? (
        <div className="px-4 pt-5">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}
