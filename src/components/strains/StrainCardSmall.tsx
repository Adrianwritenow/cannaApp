import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/strain';
import { Strain as StrainAlt } from '@/interfaces/strain';

interface StrainProps {
  strain: Strain;
  strainAlt?: StrainAlt;
}

export default function StrainCardSmall(data: StrainProps) {
  const { strain, strainAlt } = data;

  return (
    <Link href={`/strain/${encodeURIComponent(strain._id as string)}`} passHref>
      <a className="flex">
        <div className="w-full flex p-2 items-center">
          <div className="rounded-lg overflow-hidden w-12 h-12 relative flex-shrink-0 mr-3">
            <ImageWithFallback
              src={
                strain._source?.image ? strain._source?.image[0] : 'undefined'
              }
              alt={strain._source.name}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="text-left text-sm w-full">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-sm font-normal text-gray-700">
                {strain._source?.name}
              </h3>
            </div>
            <div className="flex flex-col items-start">
              <p className="sr-only">
                {strain._source?.rating ? strain._source?.rating[0] : 0}
                out of 5 stars
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
              <p className="text-sm text-gray-500">{strain._source?.type}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
