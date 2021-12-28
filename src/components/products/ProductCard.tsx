import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../interfaces/product';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

interface ProductProps {
  product: Product;
  deal?: string;
}

export default function ProductCard(data: ProductProps) {
  const { product, deal } = data;

  return (
    <Link href="/product/entity%3Aproduct_entity%2F101%3Aen" passHref>
      <a>
        <div
          className="relative w-full flex flex-wrap"
          id={`product-${product.id}`}
        >
          <div className="rounded-lg overflow-hidden w-full h-36 relative">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm w-36">
            <p className="text-blue-500">{product.vendor}</p>
            <h3 className="text-sm font-normal text-gray-700">
              {product.name}
            </h3>
            <p className="font-normal text-gray-500">{product.category}</p>

            {deal ? (
              <div className="flex items-center space-x-1">
                <p className=" text-base font-semibold text-red-800 ">{deal}</p>
                <p className="text-sm line-through text-gray-500">
                  {product.price}
                </p>
              </div>
            ) : (
              <p className=" text-base font-normal text-gray-700">
                {product.price}
              </p>
            )}

            <div className="flex flex-col items-start">
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {product.rating}
                </span>
                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({product.reviewCount})
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
