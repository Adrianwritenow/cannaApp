import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { DispensaryProps } from '../../interfaces/listing';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';

export default function ListingCardSmall(data: DispensaryProps) {
  const { listing } = data;

  return (
    <Disclosure
      as="div"
      key={listing._id}
      className="relative w-full flex flex-wrap p-4"
      id={`listing-${listing._id}`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full flex focus:outline-none">
            <div className="rounded-lg overflow-hidden w-20 h-20 relative flex-shrink-0 mr-3">
              <ImageWithFallback
                src={
                  listing._source.field_image
                    ? listing._source.field_image[0]
                    : 'undeined'
                }
                alt={listing._source.name}
                layout="fill"
                objectFit={'cover'}
              />
            </div>
            <div className="text-left text-sm w-full">
              <div className="flex flex-wrap justify-between">
                <h3 className="text-lg font-semobold text-gray-700">
                  {listing._source.name}
                </h3>
                <BookmarkIcon className="w-6" />
              </div>
              <div className="flex flex-col items-start">
                <p className="sr-only">
                  {listing._source.field_rating[0]} out of 5 stars
                </p>
                <div className="flex items-center">
                  <span className="font-normal text-gray-500">
                    {listing._source.field_rating[0]}
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
                </p>
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel as="div" className="w-full pt-4">
            <Link
              href={`/business/entity%3Adispensary_entity%2F6029%3Aen`}
              passHref
            >
              <a>
                <button
                  type="button"
                  className="flex text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  Pickup Avaliable
                </button>
              </a>
            </Link>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
