import React, { useEffect, useState } from 'react';
import { Strain, StrainResults } from '@/interfaces/strain';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';

import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { RootState } from '@/reducers';
import StrainFilterSlideOver from '../slideOver/filters/StrainFilterSlideOver';
import StrainLanding from './landing/StrainLanding';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { useSelector } from 'react-redux';

export default function SearchStrain() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const router = useRouter();
  const { isReady } = router;
  const { category } = router.query;
  const [update, setUpdate] = useState(false);
  const [view, setView] = useState('list');
  const [dispatchSearch, { loading }] = useAxios(false);
  const { label: locationLabel } = useSearchLocation();
  const { listResults } = useSelector((root: RootState) => root.search);
  const strains: Strain[] = listResults.strainsSearch || [];
  const sponsored: Product[] = listResults.productsSponsored || [];
  const queryLabel = query ? query : locationLabel;

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });

  function getResults() {
    dispatchSearch(
      searchMulti({
        q: query,
        endpoints: [
          {
            name: 'strains',
            key: 'strainsSearch',
            filters,
            skipOnEmpty: !update,
          },
          {
            name: 'products',
            key: 'productsSponsored',
            filters: { sponsored: [true] },
            skipOnEmpty: !update,
          },
        ],
        total: 10,
      })
    );
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }
  function handleLoadMore() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,
        endpoints: [{ name: 'strains', from: strains.length }],
        total: 10,
      })
    );
  }

  useEffect(() => {
    if (!loading && isReady) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isReady, filters]);

  return (
    <div className="bg-gray-50">
      {/* Results list x Landing Page */}
      {/* Filter list */}
      {strains.length && !loading ? (
        <>
          <StrainFilterSlideOver handleFilter={handleFilter} />

          {sponsored.length > 0 && (
            <ProductResultsSection
              list={sponsored}
              sponsored={true}
              label={`Shop ${queryLabel}`}
            />
          )}
          <ResultsStrain view={view} query={queryLabel} strains={strains} />
        </>
      ) : (
        <>
          <StrainLanding categoryFilter={categoryFilter} />
        </>
      )}
    </div>
  );
}
