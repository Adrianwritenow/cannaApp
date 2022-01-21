import { CheckIcon, StarIcon } from '@heroicons/react/solid';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { DispensaryProps } from '../../interfaces/listing';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';

export default function ListingCardSmall(props: DispensaryProps) {
  const { listing } = props;

  return (
    // <Disclosure
    //   as="div"
    //   key={listing._id}
    //   className=""
    //   id={`listing-${listing._id}`}
    // >
    //   {({ open }) => (
    <div className={`relative w-full flex p-4`}>
      <div className="rounded-lg overflow-hidden w-20 h-20 relative flex-shrink-0 mr-3">
        {/* <Disclosure.Button className="w-full flex focus:outline-none">
            <div className="rounded-lg overflow-hidden w-20 h-20 relative flex-shrink-0 mr-3"> */}
        <Link href={`/business/${encodeURIComponent(listing._id)}`} passHref>
          <a>
            <ImageWithFallback
              src={`${process.env.API_URL}${
                typeof listing._source.url === 'undefined'
                  ? '#'
                  : listing._source.url[0].includes('image_missing')
                  ? '#'
                  : listing._source.url[0]
              }`}
              alt={listing._source.name[0]}
              layout="fill"
              objectFit={'cover'}
            />{' '}
          </a>
        </Link>
      </div>
      <div className="text-left text-sm w-full">
        <div className="flex flex-wrap justify-between">
          <h3 className="text-lg font-semobold text-gray-700">
            <Link
              href={`/business/${encodeURIComponent(listing._id)}`}
              passHref
            >
              <a>{listing._source.name}</a>
            </Link>
          </h3>
          {/* Need favorites  */}
          {/* <BookmarkIcon className="w-6" /> */}
        </div>
        <div className="flex flex-col items-start">
          <p className="sr-only">
            {listing._source.rating &&
              `${listing._source.rating[0]} out of 5 stars`}
          </p>
          <div className="flex items-center">
            <span className="font-normal text-gray-500">
              {listing._source.rating ? `${listing._source.rating[0]}` : ''}
            </span>

            {listing._source.rating ? (
              [0, 1, 2, 3, 4].map(rating => (
                <StarIcon
                  key={rating}
                  className={`    ${
                    parseFloat(listing._source.rating[0]) > rating
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  }
                  flex-shrink-0 h-4 w-4`}
                  aria-hidden="true"
                />
              ))
            ) : (
              <em>No Reviews</em>
            )}
            <p className="font-normal text-gray-500">
              ({listing._source.reviews_count})
            </p>
          </div>
          <p className="text-sm text-gray-500 font-normal">
            {listing._source._type}
          </p>
        </div>
      </div>
    </div>
    // </Disclosure.Button>
    // <Disclosure.Panel as="div" className="w-full pt-4">
    //   <Link
    //     href={`/business/${encodeURIComponent(listing._id)}`}
    //     passHref
    //   >
    //     <a>
    //       <button
    //         type="button"
    //         className="flex text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none w-full"
    //       >
    //         Pickup Avaliable
    //       </button>
    //     </a>
    //   </Link>
    // </Disclosure.Panel>

    //   )}
    // </Disclosure>
  );
}
