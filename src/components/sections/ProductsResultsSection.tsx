import { InformationCircleIcon } from "@heroicons/react/outline";
import { Product } from "../../interfaces/product";
import ProductCard from "../products/ProductCard";
import React from "react";

interface Products {
  products: Array<Product>;
  sponsored: boolean;
  label: string;
}

export default function ProductResultsSection(results: Products) {
  const { products, sponsored, label } = results;

  return (
    <section id="shop-section">
      {sponsored ? (
        <div className="flex flex-wrap items-center px-4 py-3">
          <h5 className="text-xs text-gray-500 font-semibold pr-1">
            Sponsored Result
          </h5>
          <InformationCircleIcon className="w-5 h-5 text-gray-500 " />
        </div>
      ) : (
        ""
      )}
      <h2 className="text-xl  text-gray-700 font-semibold p-4 pt-0">{label}</h2>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 ">
        {products.map((product: Product, index) => (
          <ProductCard product={product} key={`pc-${index}`} />
        ))}
      </div>
      <div className="px-4 ">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </section>
  );
}
