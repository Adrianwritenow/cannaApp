import React, { useEffect, useState } from 'react';
import { combinedSearchQuery, receiveResults } from '@/actions/search';

import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { Strain } from '@/interfaces/strain';
import StrainFilterSlideOver from '../slideOver/filters/StrainFilterSlideOver';
import StrainLanding from './landing/StrainLanding';
import { useDispatch } from 'react-redux';

export default function SearchStrain(props: {
  query: string;
  products: Product[];
}) {
  const { query, products } = props;
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('list');
  const [results, setResults]: any = useState([1, 2, 3]);
  const dispatch = useDispatch();
  const [strains, setStrains] = useState<Array<Strain>>();
  const sortState = {
    value: sort,
    update: setSort,
  };
  const viewState = {
    value: view,
    update: setView,
  };

  useEffect(() => {
    async function getStrains() {
      const hits: any = await combinedSearchQuery({
        search: query,
        endpoints: ['strains'],
        total: 10,
      });
      setStrains(hits);
      dispatch(receiveResults({ search: query, data: hits }));
    }

    if (!strains) {
      getStrains();
    }
  }, [strains]);

  useEffect(() => {}, [strains]);

  return (
    <div className="bg-gray-50">
      {/* Results list x Landing Page */}

      {strains && (
        <>
          {/* Filter list */}
          {strains.length ? (
            <>
              <StrainFilterSlideOver />

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
        </>
      )}
    </div>
  );
}
