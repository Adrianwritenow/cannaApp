import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { ListingProps } from '../../interfaces/listing';
import React, { useEffect, useState } from 'react';
import getDistanceFrom from '@/helpers/getDistanceFrom';
import OpenIndicator from '@/helpers/OpenStatus';

export default function ListingCard(data: ListingProps) {
  const { listing, classNames, discount, userCoords } = data;
  const [distanceFrom, setDistanceFrom] = useState('');

  useEffect(() => {
    if (userCoords) {
      const distance = getDistanceFrom(userCoords, {
        lat: listing._source.lat,
        lon: listing._source.lon,
      });
      setDistanceFrom(distance);
    }
  }, [userCoords]);

  return (
    <div
      className={`relative w-full flex flex-wrap ${classNames} rounded-t-lg overflow-hidden`}
      id={`listing-${listing._id}`}
    >
      <div className="w-full focus:outline-none">
        <div className=" w-full h-36 relative">
          
            <Link href={`/business/${encodeURIComponent(listing._id)}` }passHref>
            <a>
              <ImageWithFallback
                src={`${process.env.API_URL}${
                 typeof listing._source.url === 'undefined' ? "#" : listing._source.url[0].includes('image_missing')
                    ? '#'
                    : listing._source.url[0]
                }`}
                alt={listing._source.name}
                layout="fill"
                objectFit={'cover'}
              />
            </a>
          </Link>
          {discount && (
            <div className="absolute bottom-2 bg-blue-500 py-1 pl-2 pr-3 rounded-r-full text-white text-sm font-semibold">
              {discount} OFF
            </div>
          )}
        </div>
        <div className="p-2 text-left text-sm w-full rounded-b-lg overflow-hidden border border-gray-200">
          <div className="flex justify-between">
            <Link
              href={`/business/${encodeURIComponent(listing._id as string)}`}
            >
              <h3 className="text-lg font-semi-bold text-gray-700">
                {listing._source.name}
              </h3>
            </Link>
            {/* <BookmarkIcon className="w-6 shrink-0" /> */}
          </div>
          <div className="flex flex-col items-start">
            <p className="sr-only">{listing._source.rating} out of 5 stars</p>
            {listing._source.rating && (
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {listing._source.rating}
                </span>

                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`${
                      parseFloat(listing._source.rating[0]) > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({listing._source.reviews_count})
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500 font-normal">
              Dispensary
              <span className="px-2 text-normal">&#8226;</span>
              {/* Need Distance info */}
              {/* {listing.distance} */}
              {distanceFrom ? ` ${distanceFrom}` : ''}
            </p>
            <OpenIndicator dispensary={listing} />

            {/* Need Amenities */}
            {/* {listing._source.amenities && (
              <div className="grid grid-flow-col auto-cols-max gap-2">
                {listing._source.amenities.map((amenity, index) => (
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
