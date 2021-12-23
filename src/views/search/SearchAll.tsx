import { listings, products, strains } from "../../helpers/mockData";

import LearnSection from "../../components/sections/LearnSection";
import ListingSection from "../../components/sections/ListingSection";
import ProductResultsSection from "../../components/sections/ProductsResultsSection";
import React from "react";
import RelatedStrainsSection from "../../components/sections/RelatedStrainsSection";

export default function SearchAll() {
  return (
    <div className="bg-gray-50">
      {/* Shop Query Section */}
      <ProductResultsSection
        list={products}
        sponsored={true}
        label="Shop %Query%"
      />
      {/* Learn Query Section */}
      <LearnSection strain={strains[0]} />
      {/* Related Strains Secrtion */}
      <RelatedStrainsSection strains={strains} />
      {/* Sponsered Listings Section */}
      <ListingSection listings={[listings[0], listings[1]]} sponsored={true} />
      {/* Listings Section */}
      <ListingSection listings={listings} />
    </div>
  );
}
