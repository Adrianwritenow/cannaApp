import { CheckIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Vendor } from "../../interfaces/vendor";

interface VendorProps {
  vendor: Vendor;
}

export default function VendorCard(props: VendorProps) {
  const { vendor } = props;

  return (
    <div
      key={vendor.listing.id}
      className="relative w-full flex flex-wrap py-4 pb-0"
      id={`vendor.listing-${vendor.listing.id}`}
    >
      <div className="w-full flex ">
        <div className="rounded-lg overflow-hidden w-25 h-25 relative mr-4 flex-shrink-0">
          <Image
            src={vendor.product.imageSrc}
            alt={vendor.product.name}
            layout="fill"
            objectFit={"cover"}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-left text-sm">
            <div className="w-full ">
              <h3 className="text-sm font-semibold text-gray-900">
                {vendor.listing.name}
              </h3>
              <div className="flex flex-col w-full items-start">
                <p className="text-sm text-gray-500 font-normal">
                  {vendor.listing.distance}
                  <span className="px-2 text-normal">&#8226;</span>
                  In Stock
                </p>
                <p className="text-sm text-gray-500 font-normal">
                  <span className="text-normal text-blue-500">Open </span>
                  until {vendor.listing.closeTime}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full relative overflow-scroll h-6">
            <div className="grid grid-flow-col auto-cols-max gap-2 absolute full items-center">
              {vendor.listing.amenities.map((amenity, index) => (
                <p
                  className="flex flex-wrap items-center text-sm text-gray-500"
                  key={`amenity-${index}`}
                >
                  <span className="text-blue-500">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  {amenity}
                </p>
              ))}
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            {vendor.product.price}
          </p>
        </div>
      </div>
      <Link href={`/product/123/${vendor.product.id}`} passHref>
        <button
          type="button"
          className="w-full text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green mt-5"
        >
          Add to Cart
        </button>
      </Link>
    </div>
  );
}
