import { products, strains } from "../../../helpers/mockData";

import { Product } from "../../../interfaces/product";
import ProductResultsSection from "../../../components/sections/ProductsResultsSection";
import React from "react";
import { Strain } from "../../../interfaces/strain";
import StrainCard from "../../../components/strains/StrainCard";
import StrainCardSmall from "../../../components/strains/StrainCardSmall";

interface ResultsProps {
  view: string;
}

export default function ResultsStrain(data: ResultsProps) {
  const { view } = data;

  return (
    <div>
      <ProductResultsSection
        products={products}
        sponsored={true}
        label={"Shop %Query%"}
      />
      {/* Sponsered Listings Section */}

      <div>
        <h2 className="text-xl text-gray-700 font-semibold p-4">
          % Results for %Query%
        </h2>
        {view === "list" ? (
          <div className=" grid grid-flow-row auto-rows-max">
            {strains.map((strain: Strain) => (
              <StrainCardSmall
                strain={strain}
                key={`strain-card-${strain.id}`}
              />
            ))}
          </div>
        ) : (
          <div className=" grid grid-cols-2 px-4 gap-4">
            {strains.map((strain: Strain) => (
              <StrainCard strain={strain} key={`strain-card-${strain.id}`} />
            ))}
          </div>
        )}
        <div className="px-4 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div>
      </div>
    </div>
  );
}
