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

export default function SearchStrain(props: {
  query: string;
  products: Product[];
}) {
  const router = useRouter();

  const { query, products } = props;
  const { category } = router.query;
  const [currentQuery, setCurrentQuery] = useState('');
  const { label } = useSearchLocation();

  const [view, setView] = useState('list');
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const strains: Strain[] = listResults.strainsSearch || [];
  const labelText = query ? query : label ? label : '';

  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });

  function getStrains() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters,
        endpoints: [{ name: 'strains', key: 'strainsSearch' }],
        total: 10,
      })
    );
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
  }

  useEffect(() => {
    if (!loading && query && currentQuery !== query) {
      getStrains();
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

          {products.length > 0 && (
            <ProductResultsSection
              list={products}
              sponsored={true}
              label={`Shop ${labelText}`}
            />
          )}
          <ResultsStrain view={view} query={labelText} strains={strains} />
        </>
      ) : (
        <>
          <StrainLanding />
        </>
      )}
    </div>
  );
}
