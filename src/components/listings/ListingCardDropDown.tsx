import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { Listing, ListingProps } from "../../interfaces/listing";

import { BookmarkIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListingCardDropdown(data: ListingProps) {
  const { listing, amenities, classNames, discount } = data;

  return (
    <Disclosure
      as="div"
      key={listing.id}
      className={`relative w-full flex flex-wrap ${classNames}`}
      id={`listing-${listing.id}`}
    >
      {({ open }) => (
        <Disclosure.Button className="w-full focus:outline-none">
          <div className="rounded-lg overflow-hidden w-full h-36 relative">
            <Image
              src={listing.image}
              alt={listing.name}
              layout="fill"
              objectFit={"cover"}
            />
          </div>
          <div className="pt-2.5 text-left text-sm w-full">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-lg font-semi-bold text-gray-700">
                {listing.name}
              </h3>
              <BookmarkIcon className="w-6" />
            </div>
            <div className="flex flex-col items-start">
              <p className="sr-only">{listing.rating} out of 5 stars</p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {listing.rating}
                </span>

                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      listing.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({listing.reviewCount})
                </p>
              </div>
              <p className="text-sm text-gray-500 font-normal">
                {listing.category}
                <span className="px-2 text-normal">&#8226;</span>
                {listing.distance}
              </p>
              <p className="text-sm text-gray-500 font-normal">
                <span className="text-normal text-blue-500">Open </span>
                until {listing.closeTime}
              </p>
              {amenities && (
                <div className="grid grid-flow-col auto-cols-max gap-2">
                  {listing.amenities.map((amenity, index) => (
                    <p
                      className="flex flex-wrap items-center text-gray-500"
                      key={`amenity-${index}`}
                    >
                      <span className="text-blue-500">
                        <CheckIcon className="w-6 px-1 py-2" />
                      </span>
                      {amenity}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel as="div">
            <Link href={`/business/1`} passHref>
              <a>
                <button
                  type="button"
                  className="flex text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Your Order
                </button>
              </a>
            </Link>
          </Disclosure.Panel>
        </Disclosure.Button>
      )}
    </Disclosure>
  );
}
