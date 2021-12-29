import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/SearchStrain';

interface StrainProps {
  strain: Strain;
}
export default function StrainCard(data: StrainProps) {
  const { strain } = data;

  return (
    <Link href={`/strain/${encodeURIComponent(strain._id as string)}`} passHref>
      <a>
        <div
          key={strain._id}
          className="relative w-full flex flex-wrap min-w-36"
          id={`strain-${strain._id}`}
        >
          <div className="rounded-lg overflow-hidden relative w-full">
            <ImageWithFallback
              src={
                strain._source?.field_image
                  ? strain._source.field_image[0]
                  : 'undefined'
              }
              alt={strain._source?.name_2}
              layout="fill"
              objectFit={'cover'}
              className={'w-full h-full'}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm">
            <h3 className="text-sm font-normal text-gray-700">
              {strain._source?.name_2}
            </h3>
            <div className="flex flex-col items-start">
              <p className="sr-only">
                {strain._source?.field_rating
                  ? strain._source?.field_rating[0]
                  : 0}{' '}
                out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {strain._source?.field_rating
                    ? strain._source?.field_rating[0]
                    : 0}
                </span>

                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`${
                      strain._source?.field_rating
                        ? strain._source?.field_rating[0]
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
                  {strain._source?.field_review_count
                    ? strain._source?.field_review_count[0]
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
