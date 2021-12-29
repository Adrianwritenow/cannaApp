import React, { useEffect, useState } from 'react';

import { Dispensary } from '@/interfaces/searchDispensary';
import ListingCardDropdown from '../../components/listings/ListingCardDropDown';
import ListingSection from '../../components/sections/ListingSection';

export default function SearchStrain(props: {
  dispensaries: Dispensary[];
  query: string;
}) {
  const { dispensaries, query } = props;

  return (
    <div className="bg-gray-50">
      <ListingSection listings={dispensaries} query={query} />
      <div className="pt-5">
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          {`Dispensaries near "${query}"`}
        </h2>
        <div className="grid grid-flow-row auto-rows-max gap-1 px-4">
          {dispensaries.map((dispensary: Dispensary, index) => (
            <ListingCardDropdown listing={dispensary} key={`sd-${index}`} />
          ))}
        </div>
      </div>
      <div className="px-4 pt-5">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </div>
  );
}
