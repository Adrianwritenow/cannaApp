import { Coordinates } from '@/interfaces/locationData';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import Link from 'next/link';
import { ListingProps } from '@/interfaces/listing';
import OpenIndicator from '@/helpers/OpenStatus';
import StarRating from '@/components/rating/StarRating';
import { useDistanceFrom } from '@/hooks/useDistanceFrom';

export default function ListingCard(data: ListingProps) {
  let endCoords: Coordinates | undefined = { lat: [data.lat], lon: [data.lon] };
  if (data.lat === 0 && data.lon === 0) {
    endCoords = undefined;
  }

  const distanceFrom = useDistanceFrom(endCoords);

  return (
    <div
      className={`relative w-full flex flex-wrap ${
        data.classNames ?? ''
      } rounded-t-lg overflow-hidden`}
      id={`listing-${data.id}`}
    >
      <div className="w-full focus:outline-none">
        <div className="w-full h-36 relative">
          <Link href={data.url}>
            <a>
              <ImageWithFallback
                src={data.image}
                alt={data.title}
                layout="fill"
                objectFit={'cover'}
              />
            </a>
          </Link>
          {data.discount && data.discount !== '0.00' && (
            <div className="absolute bottom-2 bg-blue-500 py-1 pl-2 pr-3 rounded-r-full text-white text-sm font-semibold">
              ${data.discount} OFF
            </div>
          )}
        </div>
        <div className="p-2 text-left text-sm w-full rounded-b-lg overflow-hidden border border-gray-200">
          <Link href={data.url} passHref>
            <a>
              {data.eyebrow && (
                <div className="text-sm leading-6 font-normal text-gray-900">
                  {data.eyebrow}
                </div>
              )}
              <div className="text-lg leading-6 font-semi-bold text-gray-700 line-clamp-1">
                {data.title}
              </div>
              {data.price && (
                <p>
                  <span className="text-sm leading-6 text-gray-700 font-bold">
                    ${data.price}&nbsp;
                  </span>
                  <span className="text-xs text-gray-900">
                    {data.price_label}
                  </span>
                </p>
              )}
            </a>
          </Link>
          <div className="flex flex-col items-start">
            {typeof data.rating !== 'undefined' && (
              <StarRating
                rating={data.rating}
                reviews_count={data.reviews_count}
              />
            )}
            {distanceFrom && (
              <p className="text-sm text-gray-500 font-normal">
                Dispensary
                {distanceFrom && (
                  <span className="px-2 text-normal">
                    &#8226; {distanceFrom}
                  </span>
                )}
              </p>
            )}
            {data.dispensary && <OpenIndicator dispensary={data.dispensary} />}
          </div>
        </div>
      </div>
    </div>
  );
}
