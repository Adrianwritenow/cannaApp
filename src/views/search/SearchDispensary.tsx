import React, { useEffect, useState } from 'react';

import { Dispensary } from '@/interfaces/searchDispensary';
import ListingCardDropdown from '../../components/listings/ListingCardDropDown';
import ListingSection from '../../components/sections/ListingSection';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';

export default function SearchStrain(props: {
  dispensaries: Dispensary[];
  query: string;
}) {
  const { dispensaries, query } = props;

  return (
    <div className="bg-gray-50">
      {dispensaries.length ? (
        <div>
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
  );
}
