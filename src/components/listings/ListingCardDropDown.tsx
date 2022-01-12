import { CheckIcon, StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';

import { BookmarkIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';
import { DispensaryProps } from '../../interfaces/listing';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import OpenIndicator from '@/helpers/OpenStatus';
import getDistanceFrom from '@/helpers/getDistanceFrom';

export default function ListingCardDropdown(data: DispensaryProps) {
  const { listing, amenities, classNames, userCoords } = data;
  const [distanceFrom, setDistanceFrom] = useState('');

  useEffect(() => {
    if (userCoords && listing) {
      const isEmpty = Object.values(userCoords).every(
        x => x === null || x === undefined
      );
      if (!isEmpty) {
        const distance = getDistanceFrom(userCoords, {
          lat: listing._source.lat,
          lon: listing._source.lon,
        });
        setDistanceFrom(distance);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing]);

  return (
    // <Disclosure
    //   as="div"
    //   key={listing._id}
    //   className={``}
    //   id={`listing-${listing._id}`}
    // >
    //   {({ open }) => (
    //     <Disclosure.Button className="w-full focus:outline-none">
    <div className={`relative w-full flex flex-wrap ${classNames} pt-4`}>
      <div className="rounded-lg overflow-hidden w-full h-36 relative">
        <Link href={`/business/${encodeURIComponent(listing._id)}`} passHref>
          <a>
            <ImageWithFallback
              src={
                listing._source?.image ? listing._source?.image[0] : 'undefined'
              }
              alt={listing._source?.name}
              layout="fill"
              objectFit={'cover'}
            />
          </a>
        </Link>
      </div>
      <div className="pt-2.5 text-left text-sm w-full">
        <div className="flex flex-wrap justify-between">
          <h3 className=" font-bold text-base text-gray-700 leading-6">
            <Link
              href={`/business/${encodeURIComponent(listing._id)}`}
              passHref
            >
              <a>{listing._source?.name}</a>
            </Link>
          </h3>

          {/**** Need favorites functionality  *****/}
          {/* <BookmarkIcon className="w-6" /> */}
        </div>
        <div className="flex flex-col items-start">
          {listing._source.rating && (
            <>
              <p className="sr-only">
                {listing._source?.rating} out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {listing._source?.rating}
                </span>

                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      parseFloat(listing._source?.rating[0]) > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({listing._source?.reviews_count})
                </p>
              </div>
            </>
          )}
          <p className="text-normal text-gray-500 font-normal">
            Dispensary
            <span className="px-2 text-normal">&#8226;</span>
            {/* {listing.distance} */}
            {distanceFrom ? ` ${distanceFrom}` : ''}
          </p>
          {typeof listing?._source !== 'undefined' && (
            <OpenIndicator dispensary={listing} />
          )}
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
    </div>
    // <Disclosure.Panel as="div">
    //   <Link
    //     href={`/business/${encodeURIComponent(listing._id)}`}
    //     passHref
    //   >
    //     <a>
    //       <button
    //         type="button"
    //         className="flex text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green-600 hover:bg-green-800 focus:outline-none"
    //       >
    //         Start Your Order
    //       </button>
    //     </a>
    //   </Link>
    /* </Disclosure.Panel>
        </Disclosure.Button>
      )}
    </Disclosure> */
  );
}
