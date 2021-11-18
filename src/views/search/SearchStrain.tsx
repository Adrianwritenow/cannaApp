import {
  Dispatch,
  SetStateAction,
} from "react-redux/node_modules/@types/react";
import React, { useState } from "react";

import ResultsStrain from "./results/ResultsStrain";
import StrainFilter from "../../components/filter/Strain/StrainFilter";
import StrainLanding from "./landing/StrainLanding";

export default function SearchStrain() {
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("list");
  const [results, setResults]: any = useState([]);

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
      <StrainFilter
        sort={sortState}
        view={viewState}
        handleResults={setResults}
      />
      {/* Results list x Landing Page */}
      {results.length > 0 ? <ResultsStrain view={view} /> : <StrainLanding />}
    </div>
  );
}
