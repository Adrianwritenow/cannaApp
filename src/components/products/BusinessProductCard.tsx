import { formatImageWithFallback } from '@/helpers/formatters';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import React from 'react';
import StarRating from '@/components/rating/StarRating';

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
              ${product._source.price[0]}
            </p>

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
          <div className="rounded-lg overflow-hidden w-25 h-25 relative flex-shrink-0">
            <ImageWithFallback
              src={formatImageWithFallback(product._source.image)}
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
