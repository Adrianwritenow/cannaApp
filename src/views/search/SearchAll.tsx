import LearnSection from '@/components/sections/LearnSection';
import ListingSection from '@/components/sections/ListingSection';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import RelatedStrainsSection from '@/components/sections/RelatedStrainsSection';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { browseBy, searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useSelector } from 'react-redux';
import { Strain } from '@/interfaces/strain';
import { Product } from '@/interfaces/product';
import { Dispensary } from '@/interfaces/dispensary';
import { SearchHits } from '@/interfaces/searchHits';

export default function SearchAll(props: { query: string }) {
  const { query } = props;
  const { coords: userCoords } = useSearchLocation();
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const products: Product[] = listResults.products || [];
  const dispensaries: Dispensary[] = listResults.dispensaries || [];
  const dispensariesFeatured: Dispensary[] =
    listResults.dispensariesFeatured || [];
  const strainsFeatured: Strain[] = listResults.strainsFeatured || [];
  const strains: Strain[] = listResults.strains || [];
  const hasProducts = products.length >= 3;

  useEffect(() => {
    if (userCoords.lat && userCoords.lon) {
      dispatchSearch(
        searchMulti({
          q: query,
          coords: userCoords,
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
  }, [userCoords]);

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto">
      {/* Shop Query Section */}
      {hasProducts && (
        <ProductResultsSection
          list={products}
          sponsored={false}
          label={`${query ? 'Shop "' + query + '"' : 'Shop'}`}
        />
      )}
      {/* Learn Query Section */}
      {strainsFeatured && strainsFeatured.length && (
        <>
          <LearnSection strain={strainsFeatured[0]} query={query} />
          {/* Related Strains Secrtion */}
          <RelatedStrainsSection strains={strains.slice(0, 5)} />
        </>
      )}
      {/* Sponsered Listings Section */}
      {dispensariesFeatured && dispensariesFeatured.length > 0 && (
        <ListingSection
          listings={dispensariesFeatured}
          sponsored={true}
          query={query}
          userCoords={userCoords}
        />
      )}
      {dispensaries.length > 0 && (
        <ListingSection
          listings={dispensaries}
          query={query}
          userCoords={userCoords}
        />
      )}

      {!hasProducts && !strains.length && !dispensaries.length && (
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
    </div>
  );
}
