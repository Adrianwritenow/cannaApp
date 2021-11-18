import { BusinessProps } from "../../interfaces/props/businessProps";
import { CheckIcon } from "@heroicons/react/solid";
import Image from "next/image";
import ListingCard from "../../components/listings/ListingCard";
import Map from "../../../public/assets/images/png/map-mock.png";
import ProductResultsSection from "../../components/sections/ProductsResultsSection";
import React from "react";
import { listings } from "../../../src/helpers/mockData";
import { products } from "../../../src/helpers/mockData";

export default function BusinessOverview(props: BusinessProps) {
  const { business } = props;
  return (
    <div>
      <div className="grid grid-row-auto auto-rows-max space-y-4">
        <section aria-labelledby="business-about" className=" px-4 pt-4">
          <h2 id="business-about" className="sr-only">
            About
          </h2>
          <h2
            id="business-about"
            className="text-lg text-gray-700 font-semibold py-2"
          >
            About Us
          </h2>
          <p className="text-base text-gray-700 line-clamp-4">
            {business.about}
          </p>
          <div className="pt-5 ">
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
              Learn more
            </button>
          </div>
        </section>
        <section aria-labelledby="business-amenities" className=" px-4">
          <h2 id="business-amenities" className="sr-only">
            Amenities
          </h2>
          <h2
            id="business-amenities"
            className="text-lg text-gray-700 font-semibold py-2"
          >
            Amenities
          </h2>
          <div className="">
            <div className="w-full">
              <div className="grid grid-flow-row auto-rows-max full items-center">
                {business.amenities.map((amenity, index) => (
                  <div className="py-3 px-2" key={`${amenity}-${index}`}>
                    <p
                      className="flex flex-wrap items-center text-sm text-gray-500"
                      key={`amenity-${index}`}
                    >
                      <span className="text-green">
                        <CheckIcon className="w-6 h-6 mr-5" />
                      </span>
                      {amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-4 pt-5 ">
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
              See all Amenities
            </button>
          </div>
        </section>
      </div>

      <div className="py-4">
        <ProductResultsSection
          products={products}
          sponsored={false}
          label={"Explore our Products"}
        />
      </div>
      <section className="p-4 pt-0">
        <h2 id="business-location" className="sr-only">
          Location
        </h2>

        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          <Image src={Map} layout="fill" objectFit={"cover"} />
        </div>

        <div className="text-lg text-gray-500 w-60 grid grid-flow-row auto-rows-max gap-2">
          <h2
            id="business-about"
            className="text-lg text-gray-700 font-semibold pt-3"
          >
            Location
          </h2>
          <p className="text-gray-700">{business.address}</p>
          <p>{business.distance} away</p>
        </div>
        <div className="pt-5 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            Get Directions
          </button>
        </div>
      </section>
      <section className="pb-4">
        <h2 id="related-businesses" className="sr-only">
          People Also Viewed
        </h2>
        <h2
          id="related-businesses"
          className="text-gray-700 text-lg font-semibold px-4 pb-5"
        >
          People Also Viewed
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4">
          {listings.map((listing, index) => (
            <div className="w-64" key={`lc-${listing.id}-${index}`}>
              <ListingCard listing={listing} amenities={false} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
