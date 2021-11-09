import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import Image from "next/image";
import { Product } from "../../interfaces/product";

interface ProductProps {
  product: Product;
}

export default function ProductCard(data: ProductProps) {
  const { product } = data;

  return (
    <div
      key={product.id}
      className="relative w-36 flex flex-wrap"
      id={`product-${product.id}`}
    >
      <div className="rounded-lg overflow-hidden w-36 h-36 relative">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          layout="fill"
          objectFit={"cover"}
        />
      </div>
      <div className="pt-2 pb-6 text-left text-sm w-36">
        <p className="text-blue-500">{product.vendor}</p>
        <h3 className="text-sm font-normal text-gray-700">{product.name}</h3>
        <p className="font-normal text-gray-500">{product.category}</p>
        <p className=" text-base font-normal text-gray-700">{product.price}</p>

        <div className="flex flex-col items-start">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            <span className="font-normal text-gray-500">{product.rating}</span>

            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`    ${
                  product.rating > rating ? "text-yellow-400" : "text-gray-200"
                }
                  flex-shrink-0 h-4 w-4`}
                aria-hidden="true"
              />
            ))}
            <p className="font-normal text-gray-500">({product.reviewCount})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
