import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

interface ProductProps {
  product: Product;
}

export default function BusinessProductCard(data: ProductProps) {
  const { product } = data;

  return (
    <Link href="/product/entity%3Aproduct_entity%2F101%3Aen/0" passHref>
      <a>
        <div
          className="relative w-full flex py-4 border-b border-gray-200"
          id={`product-${product._id}`}
        >
          <div className="pb-6 text-left text-sm w-full">
            <h3 className="text-sm font-normal text-gray-700">
              {product._source.name[0]}
            </h3>
            <p className=" text-base font-semibold text-gray-700">
              {product._source.price[0]}
            </p>

            <div className="flex flex-col items-start">
              <p className="sr-only">
                {product._source.rating[0]} out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {product._source.rating}
                </span>
                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      product._source.rating[0] > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-3.5 w-3.5`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({product._source.review_count})
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden w-25 h-25 relative flex-shrink-0">
            <ImageWithFallback
              src={`${process.env.API_URL}${
                product._source.url[0].includes('image_missing')
                  ? '#'
                  : product._source.url[0]
              }`}
              alt={product._source.name}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
        </div>
      </a>
    </Link>
  );
}
