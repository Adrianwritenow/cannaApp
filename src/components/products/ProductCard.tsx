import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

interface ProductProps {
  product: Product;
  deal?: string;
}

export default function ProductCard(data: ProductProps) {
  const { product, deal } = data;

  return (
    <Link
      href={`/product/${encodeURIComponent(product._id as string)}`}
      passHref
    >
      <a>
        <div
          className="relative w-full flex flex-wrap"
          id={`product-${product._id}`}
        >
          <div className="rounded-lg overflow-hidden w-full h-36 relative">
            {/* Replace placeholder with */}
            <ImageWithFallback
              src={`${product._source?.image[0]}`}
              alt={product._source?.name[0]}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm w-36">
            <p className="text-blue-500">
              {product._source?.brand ? product._source?.brand[0] : 'Unknown'}
            </p>
            <h3 className="text-sm font-normal text-gray-700">
              {product._source?.name[0]}
            </h3>
            <p className="font-normal text-gray-500">
              {product._source?.category}
            </p>

            {deal ? (
              <div className="flex items-center space-x-1">
                <p className=" text-base font-semibold text-red-800 ">{deal}</p>
                <p className="text-sm line-through text-gray-500">
                  {product._source?.price[0]}
                </p>
              </div>
            ) : (
              <p className=" text-base font-normal text-gray-700">
                {product._source?.price
                  ? `$${product._source?.price[0].toFixed(2)}`
                  : 'Unknown'}
              </p>
            )}

            <div className="flex flex-col items-start">
              <p className="sr-only">
                {product._source?.rating ? product._source?.rating[0] : 'N/A'}
                out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {product._source?.rating ? product._source?.rating[0] : 0}
                </span>
                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`${
                      product._source?.rating
                        ? product._source?.rating[0]
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
                  {product._source?.review_count
                    ? product._source?.review_count[0]
                    : 0}
                  )
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
