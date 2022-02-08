import React, { useEffect } from 'react';

import LearnSection from '@/components/sections/LearnSection';
import ListingSection from '@/components/sections/ListingSection';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import RelatedStrainsSection from '@/components/sections/RelatedStrainsSection';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useSelector } from 'react-redux';

export default function SearchAll(props: {
  query: string;
  userCoords: {
    lat: number;
    lon: number;
  };
}) {
  const { query, userCoords } = props;
  const [dispatchSearch, { loading }] = useAxios(false);
  const location = useSelector((root: RootState) => root.location);
  const { listResults } = useSelector((root: RootState) => root.search);

  useEffect(() => {
    dispatchSearch(
      searchMulti({
        q: query,
        coords: location.city ? location : undefined,
        endpoints: [
          { name: 'products' },
          { name: 'dispenaries', geolocate: true },
          { name: 'strains' },
        ],
        total: 10,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Shop Query Section */}
      {listResults && (
        <>
          {listResults.shopping.length ||
          listResults.strains.length ||
          listResults.dispensaries.length ? (
            <>
              {listResults.shopping.length ? (
                <ProductResultsSection
                  list={listResults.shopping}
                  sponsored={true}
                  label={`${query ? 'Shop "' + query + '"' : 'Shop'}`}
                />
              ) : (
                ''
              )}
              {/* Learn Query Section */}
              {listResults.strains.length ? (
                <>
                  <LearnSection strain={listResults.strains[0]} query={query} />
                  {/* Related Strains Secrtion */}
                  <RelatedStrainsSection strains={listResults.strains} />
                </>
              ) : (
                ''
              )}
              {/* Sponsered Listings Section */}

              {listResults.dispensaries.length ? (
                <>
                  <ListingSection
                    listings={listResults.dispensaries}
                    sponsored={true}
                    query={query}
                    userCoords={userCoords}
                  />
                  {/* Listings Section */}
                  <ListingSection
                    listings={listResults.dispensaries}
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
              {loading ? (
                <div className="w-full space-y-3">
                  <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                    Searching...
                  </h2>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                    Sorry, there are no results for this search.
                  </h2>
                  <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
                    Please try again with different or more general keywords.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
