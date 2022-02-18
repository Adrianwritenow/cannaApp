import { combinedSearchQuery, receiveResults } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ExploreProducts from './explore/ExploreProducts';
import { Product } from '@/interfaces/product';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { useRouter } from 'next/router';

export default function SearchShopping(props: { query: string }) {
  const router = useRouter();
  const { category } = router.query;
  const { query } = props;
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [update, setUpdate] = useState(true);
  const location = useSelector((root: RootState) => root.location);

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });

  useEffect(() => {
    if (update || currentQuery !== query) {
      getProducts();
    }
  }, [update, query, currentQuery, getProducts]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getProducts() {
    const hits: any = await combinedSearchQuery({
      q: query,
      filters: filters,
      endpoints: ['products'],
      total: 10,
    });
    setProducts(hits);
    setUpdate(false);
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }

  return (
    <section className="bg-gray/-50">
      <div>
        {products.length ? (
          <div>
            <ProductFilterSlideOver setFilters={handleFilter} />

            <div className="max-w-7xl mx-auto">
              <ProductResultsSection
                list={products}
                sponsored={true}
                label={`Shop ${
                  query
                    ? `"${query}"`
                    : location.city
                    ? `"${location.city}"`
                    : ''
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
          <ExploreProducts />
        )}
      </div>
    </section>
  );
}
