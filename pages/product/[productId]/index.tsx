import { ArrowRightIcon, StarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { listings, products } from "../../../src/helpers/mockData";

import DropdownFilter from "../../../src/components/forms/fields/DropdownFilter";
import ImageSlider from "../../../src/components/slider/ImageSlider";
import Link from "next/link";
import ProductResultsSection from "../../../src/components/sections/ProductsResultsSection";
import { Vendor } from "../../../src/interfaces/vendor";
import VendorCard from "../../../src/components/vendor/VendorCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const product = products[0];

export default function ProductDetail() {
  const [sort, setSort]: any = useState("relevance");

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Product */}
      <div className="">
        {/* Image gallery */}
        <ImageSlider images={product.images} />

        {/* Product info */}

        <div className="mt-4 px-4 space-y-4">
          <section>
            <div>
              <h2 className="sr-only">Product information</h2>
            </div>
            <p className="text-sm text-blue-500">{product.brand}</p>
            <h1 className="text-lg font-normal tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Reviews */}
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="font-normal text-gray-500 mr-1">
                  {product.rating}
                </span>
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-3.5 w-3.5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <span className="font-normal text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
            </div>
          </section>

          <section aria-labelledby="vendors-heading">
            <h2 id="vendors-heading" className="sr-only">
              Vendors with this product
            </h2>
            <div className="mt-4 py-3 border-t border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm">Buying Options</p>
              <DropdownFilter
                setter={setSort}
                options={["relevance", "distance"]}
                current={sort}
                label={"Sort By"}
              />
            </div>
            {listings.map((listing, index) => {
              const vendorProduct: Vendor = {
                listing: listing,
                product: products[0],
              };
              return <VendorCard vendor={vendorProduct} key={index} />;
            })}
          </section>
        </div>
        <div className="space-y-6 px-4">
          <section aria-labelledby="details-heading ">
            <h2 id="details-heading" className="sr-only">
              Product details
            </h2>
            <div className="pt-6">
              <h2 className="text-gray-700 text-lg font-semibold">
                {product.name}
              </h2>
              <div className="text-sm text-gray-500 pt-2">
                <p>
                  <span className="text-black">Type:</span> {product.type}
                </p>
                <p>
                  <span className="text-black">Category:</span>{" "}
                  {product.category}
                </p>
                <div className="flex">
                  <p className="text-black">Cannabanoids:&nbsp;</p>
                  <p>
                    THC&nbsp;
                    {product.cannabanoids &&
                      Math.round(product.cannabanoids?.thc * 100)}
                    %
                  </p>
                  <>&nbsp;</>
                  <p>
                    CBD&nbsp;
                    {product.cannabanoids &&
                      Math.round(product.cannabanoids?.cbd * 100)}
                    %
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-500">{product.about}</p>
                <Link href="#" passHref>
                  <a className="text-green mt-1 text-sm font-medium flex items-center">
                    Learn more &nbsp;
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="specifications-heading">
            <h2 id="specifications-heading" className="sr-only">
              Specifications
            </h2>
            <h2 className="text-gray-700 text-lg font-semibold">
              Specifications
            </h2>
            <div>
              <ul className="text-sm text-gray-700">
                {product.specifications.map((spec, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-green-50"
                      } flex py-3 px-2`}
                    >
                      <p className="font-semibold">{spec.label}</p>
                      <p className="ml-auto">{spec.value}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <ProductResultsSection
        products={products}
        sponsored={false}
        label="Related Items"
      />
      <ProductResultsSection
        products={products}
        sponsored={false}
        label="Recently Viewed Items"
      />
    </div>
  );
}
