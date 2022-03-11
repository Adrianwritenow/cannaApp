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
  const strains: Strain[] = listResults.strains || [];
  const hasProducts = products.length >= 3;
  const [sponsored, setSponsored] = useState<Array<Dispensary>>();
  const [related, setRelated] = useState<Array<Strain>>();
  const [strain, setStrain] = useState<Strain>();

  useEffect(() => {
    if (userCoords.lat && userCoords.lon) {
      dispatchSearch(
        searchMulti({
          q: query,
          coords: userCoords,
          endpoints: [
            { name: 'products' },
            { name: 'dispenaries', key: 'dispensaries', geolocate: true },
            { name: 'strains' },
          ],
          total: 10,
        })
      );
      getSponsored();
      getFeaturedStrain();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoords]);

  async function getSponsored() {
    const hits: SearchHits = await browseBy('sponsored', true, 'dispenaries');
    if (hits) {
      setSponsored(hits.hits.hits);
    }
  }

  async function getFeaturedStrain() {
    const hits: SearchHits = await browseBy('featured', true, 'strains');
    if (hits) {
      setStrain(hits.hits.hits[0]);
      getRelated(hits.hits.hits[0] as Strain);
    }
  }

  async function getRelated(featuredStrain: Strain) {
    const hits: SearchHits = await browseBy('', '*', 'strains', {
      key: 'top_reported_flavors',
      value: featuredStrain._source.top_reported_flavors,
    });
    if (hits) {
      setRelated(hits.hits.hits);
    } else {
      setRelated([]);
    }
  }
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
      {strain && related && related.length && (
        <>
          <LearnSection strain={strain} query={query} />
          {/* Related Strains Secrtion */}
          <RelatedStrainsSection strains={related.slice(0, 5)} />
        </>
      )}
      {/* Sponsered Listings Section */}
      {sponsored && sponsored.length > 0 && (
        <ListingSection
          listings={sponsored}
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
