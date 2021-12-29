import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { DispensaryProps } from '../../interfaces/listing';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';
import { listings as mockListings } from '@/helpers/mockData';

export default function ListingCardDropdown(data: DispensaryProps) {
  const { listing, amenities, classNames } = data;

  return (
    <Disclosure
      as="div"
      key={listing._id}
      className={`relative w-full flex flex-wrap ${classNames}`}
      id={`listing-${listing._id}`}
    >
      {({ open }) => (
        <Disclosure.Button className="w-full focus:outline-none">
          <div className="rounded-lg overflow-hidden w-full h-36 relative">
            <ImageWithFallback
              src={
                listing._source?.field_image
                  ? listing._source?.field_image[0]
                  : 'undefined'
              }
              alt={listing._source?.name}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="pt-2.5 text-left text-sm w-full">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-lg font-semi-bold text-gray-700">
                {listing._source?.name}
              </h3>
              <BookmarkIcon className="w-6" />
            </div>
            <div className="flex flex-col items-start">
              <p className="sr-only">
                {listing._source?.field_rating} out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {listing._source?.field_rating}
                </span>

                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      parseFloat(listing._source?.field_rating[0]) > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({listing._source?.field_reviews_count})
                </p>
              </div>
              <p className="text-sm text-gray-500 font-normal">
                {listing._source?._type}
                <span className="px-2 text-normal">&#8226;</span>
                {/* {listing.distance} */}
                %Distance
              </p>
              <p className="text-sm text-gray-500 font-normal">
                <span className="text-normal text-blue-500">Open </span>
                until
                {/* {listing.closeTime} */}
                %Closing Time
              </p>
              {/* Need Amenities Data */}
              {/* {amenities && (
                <div className="grid grid-flow-col auto-cols-max gap-2">
                  {mockListings[0].amenities.map((amenity, index) => (
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
              )} */}
            </div>
          </div>
          <Disclosure.Panel as="div">
            <Link
              href={`/business/${encodeURIComponent(listing._id)}`}
              passHref
            >
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
