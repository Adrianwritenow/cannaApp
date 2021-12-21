import React, { useEffect, useState } from "react";

import { Coupon } from "../../interfaces/coupon";
import CouponCard from "../coupons/CouponCard";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { Product } from "../../interfaces/product";
import ProductCard from "../products/ProductCard";

interface Results {
  list: Array<Product> | Array<Coupon>;
  sponsored: boolean;
  label: string;
  buttonLabel?: string;
  stateFunction?: Function;
  type?: string;
  deal?: string;
}

export default function ProductResultsSection(results: Results) {
  const { list, sponsored, label, buttonLabel, stateFunction, type, deal } =
    results;

  return (
    <section id="results-section">
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
      {list && (
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 ">
          {list.map((data, index) => {
            if (type === "COUPON") {
              return <CouponCard coupon={data as Coupon} key={`pc-${index}`} />;
            } else if (type === "DEAL") {
              return (
                <ProductCard
                  product={data as Product}
                  key={`pc-${index}`}
                  deal={deal}
                />
              );
            } else {
              return (
                <ProductCard product={data as Product} key={`pc-${index}`} />
              );
            }
          })}
        </div>
      )}
      <div className="px-4 ">
        <button
          className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
          onClick={() => {
            if (stateFunction) {
              stateFunction(true);
            }
          }}
        >
          {buttonLabel ? buttonLabel : <span>See more</span>}
        </button>
      </div>
    </section>
  );
}
