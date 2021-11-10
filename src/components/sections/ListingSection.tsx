import { InformationCircleIcon } from "@heroicons/react/outline";
import React from "react";
import { Listing } from "../../interfaces/listing";
import ListingCard from "../listings/ListingCard";
import ListingCardSmall from "../listings/ListingCardSmall";

interface Listings {
  listings: Array<Listing>;
  sponsored?: boolean;
}
export default function ProductResultsSection(results: Listings) {
  const { listings } = results;
  const { sponsored } = results;
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
          % Results for %Query%
        </h2>
      )}

      <div className="grid grid-flow-row auto-rows-max gap-1">
        {listings.map((listing: Listing, index) => {
          if (index <= 4) {
            return (
              <ListingCard
                listing={listing}
                key={`lc-${listing.id}-${index}`}
              />
            );
          } else {
            return (
              <ListingCardSmall
                listing={listing}
                key={`lcs-${listing.id}-${index}`}
              />
            );

          }
        })}
      </div>
      {!sponsored ? (
        <div className="px-4 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
