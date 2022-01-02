import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Product } from '@/interfaces/searchProduct';
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';

interface ProductProps {
  product: Product;
}

export default function ProductDealsCard(data: ProductProps) {
  const { product } = data;

  return (
    <Link href={`/deal/${encodeURIComponent(product._id as string)}`} passHref>
      <a>
        <div
          className="relative w-full flex py-4 space-x-4 "
          id={`product-${product._id}`}
        >
          <div className="rounded-lg overflow-hidden w-25 h-25 relative flex-shrink-0">
            <ImageWithFallback
              src={product._source.field_image[0]}
              alt={product._source.field_image[0]}
              layout="fill"
              objectFit={'cover'}
            />
          </div>
          <div className="text-left text-sm w-full">
            <div className="text-gray-500">
              <p className="text-blue-500">{product._source.field_brand[0]}</p>
              <h3 className="text-sm text-gray-700">
                {product._source.name_1[0]}
              </h3>
              <p className=" text-sm"> 10 mi away</p>
              <div className="flex items-center space-x-1">
                <p className=" text-base font-semibold text-red-800 ">
                  {product._source.field_price}
                </p>
                <p className="text-sm line-through">
                  {product._source.field_price[0]}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <p className="sr-only">
                {product._source.field_rating[0]} out of 5 stars
              </p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {product._source.field_rating[0]}
                </span>
                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      product._source.field_rating[0] > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200'
                    }
                  flex-shrink-0 h-3.5 w-3.5`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({product._source.field_review_count[0]})
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
    // <div className="relative w-36 flex flex-wrap" id={`product-${product.id}`}>
    //   <div className="rounded-lg overflow-hidden w-36 h-36 relative">
    //     <Image
    //       src={product.imageSrc}
    //       alt={product.imageAlt}
    //       layout="fill"
    //       objectFit={"cover"}
    //     />
    //   </div>
    //   <div className="pt-2 pb-6 text-left text-sm w-36">
    //     <p className="text-blue-500">{product.vendor}</p>
    //     <h3 className="text-sm font-normal text-gray-700">{product.name}</h3>
    //     <p className="font-normal text-gray-500">{product.category}</p>
    //     <p className=" text-base font-normal text-gray-700">{product.price}</p>

    //     <div className="flex flex-col items-start">
    //       <p className="sr-only">{product.rating} out of 5 stars</p>
    //       <div className="flex items-center">
    //         <span className="font-normal text-gray-500">{product.rating}</span>
    //         {[0, 1, 2, 3, 4].map((rating) => (
    //           <StarIcon
    //             key={rating}
    //             className={`    ${
    //               product.rating > rating ? "text-yellow-400" : "text-gray-200"
    //             }
    //               flex-shrink-0 h-4 w-4`}
    //             aria-hidden="true"
    //           />
    //         ))}
    //         <p className="font-normal text-gray-500">({product.reviewCount})</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
