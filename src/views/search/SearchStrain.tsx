import React, { useEffect, useState } from 'react';
import { combinedSearchQuery, receiveResults } from '@/actions/search';

import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { Strain } from '@/interfaces/strain';
import StrainFilterSlideOver from '../slideOver/filters/StrainFilterSlideOver';
import StrainLanding from './landing/StrainLanding';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function SearchStrain(props: {
  query: string;
  products: Product[];
}) {
  const router = useRouter();

  const { query, products } = props;
  const { category } = router.query;
  const [sort, setSort] = useState('relevance');
  const [currentQuery, setCurrentQuery] = useState('');

  const [view, setView] = useState('list');
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [filters, setFilters] = useState<any>({
    category: [`${category ? category : ''}`],
    sort: [],
  });
  const [strains, setStrains] = useState<Array<Strain>>([]);

  const sortState = {
    value: sort,
    update: setSort,
  };

  const viewState = {
    value: view,
    update: setView,
  };

  useEffect(() => {
    if (update || currentQuery !== query) {
      getStrains();
    }
  }, [update, query, currentQuery, getStrains]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getStrains() {
    const hits: any = await combinedSearchQuery({
      q: query,
      filters: filters,
      endpoints: ['strains'],
      total: 10,
    });
    setStrains(hits);
    setUpdate(false);
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }

  return (
    <div className="bg-gray-50">
      {/* Results list x Landing Page */}

      {/* Filter list */}
      {strains.length ? (
        <>
          <StrainFilterSlideOver handleFilter={handleFilter} />

          {products.length > 0 ? (
            <ProductResultsSection
              list={products}
              sponsored={true}
              label={`Shop "${query}"`}
            />
          ) : (
            ''
          )}
          <ResultsStrain view={view} query={query} strains={strains} />
        </>
      ) : (
        <>
          <StrainLanding setStrains={setStrains} />
        </>
      )}
    </div>
  );
}
