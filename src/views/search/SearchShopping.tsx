import { combinedSearchQuery, receiveResults } from '@/actions/search';
import { useEffect, useState } from 'react';

import { Product } from '@/interfaces/product';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { useDispatch } from 'react-redux';

export default function SearchShopping(props: { query: string }) {
  const { query } = props;
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Array<Product>>();

  useEffect(() => {
    async function getProducts() {
      const hits: any = await combinedSearchQuery({
        search: query,
        endpoints: ['products'],
        total: 10,
      });
      setProducts(hits);
      dispatch(receiveResults({ search: query, data: hits }));
    }

    if (!products) {
      getProducts();
    }
  }, [products]);

  return (
    <section className="bg-gray-50">
      <ProductFilterSlideOver />

      <div>
        {products ? (
          <>
            <ProductResultsSection
              list={products}
              sponsored={true}
              label={`Shop "${query}"`}
              hideButton={true}
            />
            <div className="px-4">
              <ProductResultsGrid
                label={`${products.length} Results for "${query}"`}
                list={products}
              />
            </div>
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
      </div>
    </section>
  );
}
