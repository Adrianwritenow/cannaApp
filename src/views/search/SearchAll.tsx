import React, { useEffect, useState } from 'react';
import { listings, products, strains } from '../../helpers/mockData';

import LearnSection from '../../components/sections/LearnSection';
import ListingSection from '../../components/sections/ListingSection';
import ProductResultsSection from '../../components/sections/ProductsResultsSection';
import RelatedStrainsSection from '../../components/sections/RelatedStrainsSection';
import { SearchState } from '@/interfaces/searchState';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';

export default function SearchAll(props: {
  query: string;
  userCoords: {
    lat: number;
    lng: number;
  };
}) {
  const { query, userCoords } = props;
  const [results, setResults] = useState<Array<any>>();
  const [dispatchAxios, { loading, error, success }] = useAxios();
  const [lists, setLists] = useState<SearchState>();

  useEffect(() => {
    let searchlists: SearchState = {
      news: [],
      deals: [],
      shopping: [],
      dispensaries: [],
      strains: [],
      blogs: [],
    };

    async function getResults() {
      const hits: any = await combinedSearchQuery({
        search: query,
        endpoints: ['products', 'dispenaries', 'strains'],
        total: 10,
      });
      setResults(hits);
    }

    if (!results) {
      getResults();
    }
    if (!lists && results) {
      results.map((result: any, index: number) => {
        switch (true) {
          case result._id.includes('strain_entity'):
            searchlists.strains.push(result);
            break;

          case result._id.includes('product_entity'):
            searchlists.shopping.push(result);
            break;

          case result._id.includes('dispensary_entity'):
            searchlists.dispensaries.push(result);
            break;
        }

        setLists(searchlists);
      });
    }
  }, [results, lists]);

  return (
    <div className="bg-gray-50">
      {/* Shop Query Section */}
      {lists && (
        <>
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
                    userCoords={userCoords}
                  />
                  {/* Listings Section */}
                  <ListingSection
                    listings={lists.dispensaries}
                    query={query}
                    userCoords={userCoords}
                  />
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
        </>
      )}
    </div>
  );
}
