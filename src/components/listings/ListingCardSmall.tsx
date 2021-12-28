import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '../../interfaces/listing';
import React from 'react';

interface ListingProps {
  listing: Listing;
}
export default function ListingCardSmall(data: ListingProps) {
  const { listing } = data;

  return (
    <Disclosure
      as="div"
      key={listing.id}
      className="relative w-full flex flex-wrap p-4"
      id={`listing-${listing.id}`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full flex focus:outline-none">
            <div className="rounded-lg overflow-hidden w-20 h-20 relative flex-shrink-0 mr-3">
              <Image
                src={listing.image}
                alt={listing.name}
                layout="fill"
                objectFit={'cover'}
              />
            </div>
            <div className="text-left text-sm w-full">
              <div className="flex flex-wrap justify-between">
                <h3 className="text-lg font-semobold text-gray-700">
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

                  {[0, 1, 2, 3, 4].map(rating => (
                    <StarIcon
                      key={rating}
                      className={`    ${
                        listing.rating > rating
                          ? 'text-yellow-400'
                          : 'text-gray-200'
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
