import React, { useEffect, useState } from 'react';
import { Strain, StrainResults } from '@/interfaces/strain';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { receiveResults, searchMulti } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { RootState } from '@/reducers';
import StrainFilterSlideOver from '../slideOver/filters/StrainFilterSlideOver';
import StrainLanding from './landing/StrainLanding';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';

export default function SearchStrain() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const router = useRouter();
  const { isReady } = router;
  const { category } = router.query;
  const dispatch = useDispatch();
  const { label } = useSearchLocation();
  const [view, setView] = useState('list');
  const labelText = query ? query : label ? label : '';
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: strains, total }: StrainResults = listResults.strains || [];
  const [sponsored, setSponsored] = useState<Array<Product>>();

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });

  useEffect(() => {
    getStrains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  function getStrains() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters,
        endpoints: [{ name: 'strains' }],
        total: 10,
      })
    );
  }

  function handleFilter(data: any) {
    setFilters(data);
  }
  function handleLoadMore() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,
        endpoints: [
          {
            name: 'strains',
            from: strains.length,
            concat: true,
          },
        ],
        total: 10,
      })
    );
  }

  function categoryFilter(categoryQuery: string) {
    dispatch(
      receiveResults({
        search: categoryQuery,
      })
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Results list x Landing Page */}
      {/* Filter list */}
      {strains?.length && !loading ? (
        <>
          <StrainFilterSlideOver handleFilter={handleFilter} />

          {/* {sponsored.length > 0 && (
            <ProductResultsSection
              list={sponsored}
              sponsored={true}
              label={`Shop ${queryLabel}`}
            />
          )} */}
          <ResultsStrain
            heading={`${total} Results for ${labelText}`}
            view={view}
            query={labelText}
            strains={strains}
          />
          <div className="flex justify-center py-10">
            <button
              onClick={handleLoadMore}
              className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
            >
              Load More
            </button>
          </div>
        </>
      ) : (
        <>
          <StrainLanding categoryFilter={categoryFilter} />
        </>
      )}
    </div>
  );
}
