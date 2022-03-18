import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ExploreProducts from './explore/ExploreProducts';
import { IAxiosReturn } from '@/interfaces/axios';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import { ProductResults } from '@/interfaces/product';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';

export default function SearchShopping() {
  const router = useRouter();
  const [query, setQuery] = useQueryParam('qs', withDefault(StringParam, ''));

  const { category, sortQuery, qs } = router.query;
  const [dispatchSearch, { loading }] = useAxios(false);
  const { label: locationLabel } = useSearchLocation();
  const { listResults } = useSelector((root: RootState) => root.search);
  const queryLabel = query ? query : locationLabel;
  const { results: products, total: productsTotal }: ProductResults =
    listResults.shopping || [];
  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [`${sortQuery ? sortQuery : 'Relevance'}`],
    top_rated_effects: [''],
    top_reported_flavors: [''],
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, query]);

  function getProducts(from: number, concat: boolean) {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,
        endpoints: [{ name: 'products', key: 'shopping', from, concat }],
        total: 10,
      })
    ).then((status: IAxiosReturn) => {
      if (!status.success) {
        return;
      }
      const searchResponse = status.response.data.responses[0] || {};
      setTotal(searchResponse.hits?.total.value || 0);
    });
  }

  function removeFilter(keyname: string) {
    const updatedFilter = {
      ...filters,
    };
    updatedFilter[keyname] = [''];
    handleFilter(updatedFilter);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setQuery('');
  }

  function handleLoadMore() {
    getProducts(products.length, true);
  }
  useEffect(() => {}, [loading]);

  return (
    <section className="bg-gray/-50">
      <div>
        <ProductFilterSlideOver
          removeFilter={removeFilter}
          filters={filters}
          setFilters={setFilters}
        />
        {loading ? (
          <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
            <SvgEmptyState className="w-40 h-40" />

            <div className="w-full space-y-3">
              <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                Searching...
              </h2>
            </div>
          </div>
        ) : (
          <>
            {products?.length && !loading ? (
              <div>
                <div className="max-w-7xl mx-auto pb-4">
                  <div className="px-4">
                    <ProductResultsGrid
                      label={`${productsTotal} Results for "${queryLabel}"`}
                      list={products}
                    />
                    {total > products.length && (
                      <div className="flex justify-center py-10">
                        <button
                          onClick={handleLoadMore}
                          className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <ExploreProducts handleFilter={handleFilter} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
