import { receiveResults, searchMulti } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';
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

export default function SearchShopping(props: { query: string }) {
  const router = useRouter();
  const { category, sortQuery } = router.query;
  const { query } = props;
  const dispatch = useDispatch();
  const [dispatchSearch, { loading }] = useAxios(false);
  const [currentQuery, setCurrentQuery] = useState('');
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
    setCurrentQuery(query);
  }

  function categoryFilter(categoryQuery: string) {
    dispatch(
      receiveResults({
        search: categoryQuery,
      })
    );
  }

  function handleFilter(data: any) {
    setFilters(data);
  }

  useEffect(() => {
    if (!loading || currentQuery !== query) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentQuery, filters]);

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
