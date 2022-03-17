import React, { useEffect, useState } from 'react';
import { Strain, StrainResults } from '@/interfaces/strain';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { receiveResults, searchMulti } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';

import { IAxiosReturn } from '@/interfaces/axios';
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
  const { category } = router.query;
  const dispatch = useDispatch();
  const { label } = useSearchLocation();
  const [view, setView] = useState('list');
  const labelText = query ? query : label ? label : '';
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: strains, total: strainsTotal }: StrainResults =
    listResults.strains || [];
  const [sponsored, setSponsored] = useState<Array<Product>>();
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });

  useEffect(() => {
    getStrains(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  function getStrains(from: number, concat: boolean) {
    dispatchSearch(
      searchMulti({
        q: query,
        filters,
        endpoints: [{ name: 'strains', from, concat }],
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

  function handleFilter(data: any) {
    setFilters(data);
  }
  function handleLoadMore() {
    getStrains(strains.length, true);
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
      {strains?.length > 0 || !loading ? (
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
            heading={`${strainsTotal} Results for ${labelText}`}
            view={view}
            query={labelText}
            strains={strains}
          />
          {total > strains.length && (
            <div className="flex justify-center py-10">
              <button
                onClick={handleLoadMore}
                className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <StrainLanding categoryFilter={categoryFilter} />
        </>
      )}
    </div>
  );
}
