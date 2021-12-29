import React, { useState } from 'react';

import FilterSlideOver from '../slideOver/FilterSlideOver';
import { Product } from '@/interfaces/searchProduct';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ResultsStrain from './results/ResultsStrain';
import { Strain } from '@/interfaces/SearchStrain';
import StrainFilter from '../../components/filter/Strain/StrainFilter';
import StrainLanding from './landing/StrainLanding';

export default function SearchStrain(props: {
  strains: Strain[];
  query: string;
  products: Product[];
}) {
  const { strains, query, products } = props;
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('list');
  const [results, setResults]: any = useState([1, 2, 3]);

  const sortState = {
    value: sort,
    update: setSort,
  };
  const viewState = {
    value: view,
    update: setView,
  };

  return (
    <div className="bg-gray-50">
      {/* Filter list */}
      {/* <StrainFilter
        sort={sortState}
        view={viewState}
        handleResults={setResults}
      /> */}
      <FilterSlideOver />

      {/* Results list x Landing Page */}

      {strains.length > 0 ? (
        <>
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
        <StrainLanding />
      )}
    </div>
  );
}
