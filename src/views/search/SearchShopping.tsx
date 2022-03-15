import { searchMulti } from '@/actions/search';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ExploreProducts from './explore/ExploreProducts';
import { Product } from '@/interfaces/product';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/useAxios';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useQueryParam, StringParam, withDefault } from 'next-query-params';

export default function SearchShopping() {
  const router = useRouter();
  const [query, setQuery] = useQueryParam('qs', withDefault(StringParam, ''));

  const { category, sortQuery, qs } = router.query;
  const [dispatchSearch, { loading }] = useAxios(false);
  const { label: locationLabel } = useSearchLocation();
  const { listResults } = useSelector((root: RootState) => root.search);
  const products: Product[] = listResults.products || [];
  const sponsored: Product[] = listResults.productsSponsored || [];
  const queryLabel = query ? query : locationLabel;

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [`${sortQuery ? sortQuery : ''}`],
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
        <ProductFilterSlideOver setFilters={handleFilter} />
        {products.length > 0 && (
          <div>
            <div className="max-w-7xl mx-auto">
              {sponsored && sponsored.length > 0 && (
                <>
                  <ProductResultsSection
                    list={sponsored}
                    sponsored={true}
                    label={`Shop ${queryLabel}`}
                    hideButton={true}
                  />
                </>
              )}
              <div className="px-4">
                <ProductResultsGrid
                  label={`${products.length} Results for "${queryLabel}"`}
                  list={products}
                />
              </div>
            </div>
          </div>
        )}
        {!loading && !products.length && (
          <ExploreProducts categoryFilter={categoryFilter} />
        )}
      </div>
    </section>
  );
}
