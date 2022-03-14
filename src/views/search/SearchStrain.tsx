import React, { useEffect, useState } from 'react';
import { searchMulti } from '@/actions/search';
import { useSelector } from 'react-redux';

import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { RootState } from '@/reducers';
import { Strain } from '@/interfaces/strain';
import StrainFilterSlideOver from '../slideOver/filters/StrainFilterSlideOver';
import StrainLanding from './landing/StrainLanding';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/useAxios';
import { useSearchLocation } from '@/hooks/useSearchLocation';

export default function SearchStrain(props: { query: string }) {
  const router = useRouter();

  const { query } = props;
  const { category } = router.query;
  const [update, setUpdate] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
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
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }

  useEffect(() => {
    if (!loading) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentQuery, filters]);

  return (
    <div className="bg-gray-50">
      {/* Results list x Landing Page */}

      {/* Filter list */}
      {strains.length > 0 ? (
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
          <StrainLanding />
        </>
      )}
    </div>
  );
}
