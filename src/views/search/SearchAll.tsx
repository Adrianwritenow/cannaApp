import React, { useEffect } from 'react';
import { listings, products, strains } from '../../helpers/mockData';

import LearnSection from '../../components/sections/LearnSection';
import ListingSection from '../../components/sections/ListingSection';
import ProductResultsSection from '../../components/sections/ProductsResultsSection';
import RelatedStrainsSection from '../../components/sections/RelatedStrainsSection';
import { SearchState } from '@/interfaces/searchState';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';

export default function SearchAll(props: {
  lists: SearchState;
  query: string;
}) {
  const { lists, query } = props;

  return (
    <div className="bg-gray-50">
      {/* Shop Query Section */}
      {lists.shopping.length ||
      lists.strains.length ||
      lists.dispensaries.length ? (
        <>
          {lists.shopping.length ? (
            <ProductResultsSection
              list={lists.shopping}
              sponsored={true}
              label={`Shop "${query}"`}
            />
          ) : (
            ''
          )}
          {/* Learn Query Section */}
          {lists.strains.length ? (
            <>
              <LearnSection strain={lists.strains[0]} query={query} />
              {/* Related Strains Secrtion */}
              <RelatedStrainsSection strains={lists.strains} />
            </>
          ) : (
            ''
          )}
          {/* Sponsered Listings Section */}

          {lists.dispensaries.length ? (
            <>
              <ListingSection
                listings={lists.dispensaries}
                sponsored={true}
                query={query}
              />
              {/* Listings Section */}
              <ListingSection listings={lists.dispensaries} query={query} />
            </>
          ) : (
            ''
          )}
        </>
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
