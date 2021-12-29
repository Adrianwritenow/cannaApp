import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { ListingProps } from '../../interfaces/listing';
import React from 'react';

export default function ListingCard(data: ListingProps) {
  const { listing, amenities, classNames, discount } = data;

  return (
    <div
      className={`relative w-full flex flex-wrap ${classNames} rounded-t-lg overflow-hidden`}
      id={`listing-${listing._id}`}
    >
      <div className="w-full focus:outline-none">
        <div className=" w-full h-36 relative">
          <ImageWithFallback
            src={listing._source.field_image}
            alt={listing._source.name}
            layout="fill"
            objectFit={'cover'}
          />
          {discount && (
            <div className="absolute bottom-2 bg-blue-500 py-1 pl-2 pr-3 rounded-r-full text-white text-sm font-semibold">
              {discount} OFF
            </div>
          )}
        </div>
        <div className="p-2 text-left text-sm w-full rounded-b-lg overflow-hidden border border-gray-200">
          <div className="flex flex-wrap justify-between">
            <h3 className="text-lg font-semi-bold text-gray-700">
              {listing._source.name}
            </h3>
            <BookmarkIcon className="w-6" />
          </div>
          <div className="flex flex-col items-start">
            <p className="sr-only">
              {listing._source.field_rating} out of 5 stars
            </p>
            <div className="flex items-center">
              <span className="font-normal text-gray-500">
                {listing._source.field_rating}
              </span>

              {[0, 1, 2, 3, 4].map(rating => (
                <StarIcon
                  key={rating}
                  className={`    ${
                    parseFloat(listing._source.field_rating[0]) > rating
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  }
                  flex-shrink-0 h-4 w-4`}
                  aria-hidden="true"
                />
              ))}
              <p className="font-normal text-gray-500">
                ({listing._source.field_reviews_count})
              </p>
            </div>
            <p className="text-sm text-gray-500 font-normal">
              {listing._source._type}
              <span className="px-2 text-normal">&#8226;</span>
              {/* Need Distance info */}
              {/* {listing.distance} */}
              N/A
            </p>
            <p className="text-sm text-gray-500 font-normal">
              <span className="text-normal text-blue-500">Open </span>
              until
              {/* Need Cloing time data */}
              {/* {listing.closeTime} */}
            </p>

            {/* Need Amenities */}
            {/* {amenities && (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
