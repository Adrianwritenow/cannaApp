import { StringParam, useQueryParam, withDefault } from 'next-query-params';

import { DispensaryResults } from '@/interfaces/dispensary';
import LearnSection from '@/components/sections/LearnSection';
import ListingSection from '@/components/sections/ListingSection';
import { ProductResults } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import RelatedStrainsSection from '@/components/sections/RelatedStrainsSection';
import { RootState } from '@/reducers';
import { StrainResults } from '@/interfaces/strain';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useSelector } from 'react-redux';

export default function SearchAll() {
  const router = useRouter();
  const { isReady } = router;
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const { coords: userCoords, label } = useSearchLocation();
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: products }: ProductResults = listResults.products || [];
  const { results: dispensaries }: DispensaryResults =
    listResults.dispensaries || [];
  const { results: dispensariesFeatured }: DispensaryResults =
    listResults.dispensariesFeatured || [];
  const { results: strainsFeatured }: StrainResults =
    listResults.strainsFeatured || [];
  const { results: strains }: StrainResults = listResults.strains || [];

  useEffect(() => {
    if (isReady && userCoords.lat && userCoords.lon) {
      dispatchSearch(
        searchMulti({
          q: query,
          coords: userCoords,
          distance: '50mi',
          endpoints: [
            { name: 'products' },
            { name: 'dispenaries', key: 'dispensaries', geolocate: true },
            {
              name: 'dispenaries',
              key: 'dispensariesFeatured',
              filters: { featured: [true] },
            },
            { name: 'strains' },
            {
              name: 'strains',
              key: 'strainsFeatured',
              filters: { featured: [true] },
            },
          ],
          total: 10,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoords, query, isReady]);

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto">
      {/* Shop Query Section */}

      {(strains && strains.length > 0) ||
      (dispensaries && dispensaries.length > 0) ||
      (products && products.length > 0) ? (
        <>
          {products && products.length > 0 && (
            <ProductResultsSection
              list={products}
              sponsored={false}
              label={`${query ? 'Shop "' + query + '"' : 'Shop'}`}
            />
          )}
          {/* Learn Query Section */}
          {strainsFeatured && strainsFeatured.length > 0 && (
            <LearnSection strain={strainsFeatured[0]} query={query} />
          )}
          {strains && strains.length > 0 && (
            <>
              <RelatedStrainsSection strains={strains.slice(0, 5)} />
              {/* Related Strains Secrtion */}
            </>
          )}

          {/* Sponsered Listings Section */}
          {/* {dispensariesFeatured && dispensariesFeatured.length > 0 && (
            <ListingSection
              listings={dispensariesFeatured}
              sponsored={true}
              query={query}
              userCoords={userCoords}
              heading={''}
            />
          )} */}
          {dispensaries && dispensaries.length > 0 && (
            <ListingSection
              listings={dispensaries}
              query={query}
              userCoords={userCoords}
              heading={`${
                query
                  ? `Results for "${query}"`
                  : `Results near "${label ?? 'you'}"`
              }`}
            />
          )}
        </>
      ) : (
        <>
          {!strains?.length && !dispensaries?.length && !products?.length && (
            <div className="w-full flex items-center flex-wrap justify-center h-full space-y-3 py-14">
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
