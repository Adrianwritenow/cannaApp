import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import OpenIndicator from '@/helpers/OpenStatus';
import getDistanceFrom from '@/helpers/getDistanceFrom';

export function MapResultCard({ listing, userCoords }: any) {
  const [favorited, setFavorited] = useState(false);
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
  }, [userCoords]);

  return (
    <div className="group relative bg-white rounded-lg h-full ">
      <div>
        <div className="h-28 relative rounded-t-lg overflow-hidden">
          <Image
            objectFit="cover"
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
            alt={`listing ${listing._id}`}
            layout="fill"
          />
        </div>
      </div>

      <div className="text-left text-sm leading-4 flex-col p-2">
        <div className="flex justify-between">
          <Link
            href={`/business/${encodeURIComponent(listing._id as string)}`}
            passHref
          >
            <h3 className="text-md underline font-semibold text-gray-700 mb-2">
              {listing._source.name}
            </h3>
          </Link>
          {/* <div>
            {' '}
            <button onClick={() => setFavorited(!favorited)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={`${favorited ? 'gold' : 'none'}`}
                viewBox="0 0 24 24"
                stroke={`${favorited ? 'gold' : 'black'}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div> */}
        </div>

        <div className="flex items-start w-full flex-col">
          <p className="sr-only">{listing._source.rating} out of 5 stars</p>
          <div className="flex items-center ">
            <div className="flex items-center">
              <span className="font-normal text-gray-500">
                {listing._source.rating}
              </span>

              {listing._source.reviews_count &&
                [0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`${
                      listing._source.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                            flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
            </div>
            <p className="font-normal text-gray-500">
              {listing._source.reviews_count ? (
                `(${listing._source.reviews_count}) `
              ) : (
                <>
                  <em>No Reviews </em>
                </>
              )}
            </p>
          </div>
          <p className="text-sm text-gray-500 font-normal">
            {listing.category ? ` ${listing.category} •` : ''}
            {distanceFrom}
          </p>
          {/* <p className="text-sm text-gray-500 font-normal"> */}
            <OpenIndicator dispensary={listing} />
          {/* </p> */}
        </div>
      </div>
    </div>
  );
}
