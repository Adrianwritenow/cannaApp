import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/strain';

interface StrainProps {
  strain: Strain;
}
export default function StrainCard(data: StrainProps) {
  const { strain } = data;

  return (
    <Link href={`/strain/${strain._source.id}`} passHref>
      <a className="flex w-min">
        <div
          key={strain._id}
          className="relative w-full flex flex-wrap min-w-36"
          id={`strain-${strain._id}`}
        >
          <div className="rounded-lg overflow-hidden relative w-full">
            <ImageWithFallback
              src={
                strain._source?.image ? strain._source.image[0] : 'undefined'
              }
              alt={strain._source?.name}
              layout="fill"
              objectFit={'cover'}
              className={'w-full h-full'}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm">
            <h3 className="text-sm font-normal text-gray-700 line-clamp-1">
              {strain._source?.name}
            </h3>
            <div className="flex flex-col items-start">
              <p className="sr-only">
                {strain._source?.rating ? strain._source?.rating[0] : 0} out of
                5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {strain._source?.rating ? strain._source?.rating[0] : 0}
                </span>

                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`${
                      strain._source?.rating
                        ? strain._source?.rating[0]
                        : 0 > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  (
                  {strain._source?.review_count
                    ? strain._source?.review_count[0]
                    : 0}
                  )
                </p>
              </div>
              <p className="text-sm text-gray-500 capitalize">
                {strain._source?.type}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
