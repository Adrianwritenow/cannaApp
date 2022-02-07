import { formatImageWithFallback } from '@/helpers/formatters';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import React from 'react';
import StarRating from '@/components/rating/StarRating';

interface ProductProps {
  product: Product;
  deal?: string;
}

export default function ProductCard(data: ProductProps) {
  const { product, deal } = data;

  return (
    <Link href={`/product/${product._source.id}`} passHref>
      <a>
        <div
          className="relative w-full flex flex-wrap"
          id={`product-${product._id}`}
        >
          <div className="rounded-lg overflow-hidden w-full h-36 relative">
            <ImageWithFallback
              src={formatImageWithFallback(product._source.image)}
              alt={product._source?.name[0]}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm w-36">
            <p className="text-blue-500">
              {product._source?.manufacture
                ? product._source?.manufacture[0]
                : ''}
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
              {typeof product._source.rating !== 'undefined' && (
                <StarRating
                  rating={product._source.rating[0]}
                  reviews_count={
                    product._source.reviews_count
                      ? product._source.reviews_count[0]
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
