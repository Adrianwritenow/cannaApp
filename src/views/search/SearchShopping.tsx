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
  const { label } = useSearchLocation();

  const { listResults } = useSelector((root: RootState) => root.search);
  const products: Product[] = listResults.productsFiltered || [];

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [`${sortQuery ? sortQuery : ''}`],
  });

  function getProducts() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters,
        endpoints: [{ name: 'products', key: 'productsFiltered' }],
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
    if (!loading && query && currentQuery !== query) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentQuery, filters]);

  return (
    <section className="bg-gray/-50">
      <div>
        <ProductFilterSlideOver setFilters={handleFilter} />
        {query && products.length > 0 ? (
          <div>
            <div className="max-w-7xl mx-auto">
              <ProductResultsSection
                list={products}
                sponsored={true}
                label={`Shop ${
                  query ? `"${query}"` : label ? `"${label}"` : ''
                }`}
                hideButton={true}
              />
              <div className="px-4">
                <ProductResultsGrid
                  label={`${products.length} Results for "${query}"`}
                  list={products}
                />
              </div>
            </div>
          </div>
        ) : (
          <ExploreProducts categoryFilter={categoryFilter} />
        )}
      </div>
    </section>
  );
}
