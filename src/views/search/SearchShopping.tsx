import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useEffect, useState } from 'react';

import ExploreProducts from './explore/ExploreProducts';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import { RootState } from '@/reducers';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useSelector } from 'react-redux';

export default function SearchShopping() {
  const router = useRouter();
  const [query, setQuery] = useQueryParam('qs', withDefault(StringParam, ''));

  const { category, sortQuery, qs } = router.query;
  const [dispatchSearch, { loading }] = useAxios(false);
  const { label: locationLabel } = useSearchLocation();
  const { listResults } = useSelector((root: RootState) => root.search);
  const products: Product[] = listResults.products || [];
  const sponsLabel = query ? query : locationLabel;

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [`${sortQuery ? sortQuery : 'Relevance'}`],
  });

  function getResults() {
    dispatchSearch(
      searchMulti({
        q: query,
        endpoints: [
          { name: 'products', filters },
          {
            name: 'products',
            key: 'productsSponsored',
            filters: { sponsored: [true] },
          },
        ],
        total: 10,
      })
    );
  }

  function categoryFilter(categoryQuery: string) {
    setQuery(categoryQuery);
  }

  function handleFilter(data: any) {
    setFilters(data);
  }

  useEffect(() => {
    if (!loading) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  return (
    <section className="bg-gray/-50">
      <div>
        <ProductFilterSlideOver setFilters={handleFilter} filters={filters} />

        {products?.length && !loading ? (
          <div>
            <div className="max-w-7xl mx-auto">
              <div className="px-4">
                <ProductResultsGrid
                  label={`${total} Results for "${query}"`}
                  list={products}
                />
                <div className="flex justify-center py-10">
                  <button
                    onClick={handleLoadMore}
                    className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                  >
                    Load More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ExploreProducts handleFilter={handleFilter} />
        )}
      </div>
    </section>
  );
}
