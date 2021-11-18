import BusinessProductCard from "../../components/products/BusinessProductCard";
import { BusinessProps } from "../../interfaces/props/businessProps";
import FilterMenu from "../../components/filter/FilterMenu";
import { Product } from "../../interfaces/product";
import React from "react";
import { TagIcon } from "@heroicons/react/solid";
import { products } from "../../../src/helpers/mockData";

export default function BusinessMenu(props: BusinessProps) {
  const { business } = props;

  return (
    <div>
      <section className="w-full pt-6">
        <FilterMenu />
      </section>
      <div className="px-4 grid grid-flow-row auto-rows-max gap-9">
        <section className="border-t border-gray-200 pt-8">
          <h2 id="business-deals" className="sr-only">
            Deals
          </h2>
          <div className="flex items-center pb-1">
            <TagIcon className="text-green w-6 h-6 mr-2" />
            <h2
              id="business-about"
              className="text-2xl text-green text-gray-700 font-semibold"
            >
              Deals
            </h2>
          </div>

          {products.map((product: Product, index) => (
            <BusinessProductCard product={product} key={`pc-${index}`} />
          ))}
        </section>

        <section>
          <h2 id="business-flower" className="sr-only">
            Flower
          </h2>
          <h2
            id="business-flower"
            className="text-lg text-gray-700 font-semibold py-2"
          >
            Flower
          </h2>
          {products.map((product: Product, index) => (
            <BusinessProductCard product={product} key={`pc-${index}`} />
          ))}
        </section>

        <section>
          <h2 id="business-concentrates" className="sr-only">
            Concentrates
          </h2>
          <h2
            id="business-concentrates"
            className="text-lg text-gray-700 font-semibold py-2"
          >
            Concentrates
          </h2>
          {products.map((product: Product, index) => (
            <BusinessProductCard product={product} key={`pc-${index}`} />
          ))}
        </section>
      </div>
    </div>
  );
}
