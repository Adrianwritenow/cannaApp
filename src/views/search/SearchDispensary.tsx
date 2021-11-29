import { Listing } from "../../interfaces/listing";
import ListingCard from "../../components/listings/ListingCard";
import ListingSection from "../../components/sections/ListingSection";
import React from "react";
import { listings } from "../../helpers/mockData";

export default function SearchStrain() {
  return (
    <div className="bg-gray-50">
      <ListingSection listings={[listings[0], listings[1]]} sponsored={true} />
      <div className="pt-5">
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          Dispensaries near %Location%
        </h2>
        <div className="grid grid-flow-row auto-rows-max gap-1 px-4">
          {listings.map((listing: Listing, index) => (
            <ListingCard listing={listing} key={`sd-${index}`} />
          ))}
        </div>
      </div>
      <div className="px-4 ">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </div>
  );
}
