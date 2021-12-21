import React, { useState } from "react";
import { products, strain } from "../../../src/helpers/mockData";

import Image from "next/image";
import ProductResultsSection from "../../../src/components/sections/ProductsResultsSection";
import { StarIcon } from "@heroicons/react/solid";

export default function StrainDetail() {
  const [myRating, setMyRating] = useState(0);

  return (
    <div className="bg-white">
      <div className="w-full h-64 relative">
        <Image
          src={strain.images[0]}
          layout="fill"
          objectFit={"cover"}
          alt={strain.title}
        />
      </div>
      <div className="p-4">
        <section
          aria-labelledby="strains-heading"
          className="border-gray-200 border-b pb-4"
        >
          <h2 id="strains-heading" className="sr-only">
            {strain.title}
          </h2>
          <h2 className="text-gray-700 text-3xl font-normal">{strain.title}</h2>
          <p className="text-base text-gray-500">{strain.type}</p>
          <div className="flex items-center pt-4">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`${
                  myRating > rating ? "text-yellow-400" : "text-gray-200"
                }
                  flex-shrink-0 h-6 w-6`}
                aria-hidden="true"
                onClick={() => setMyRating(rating + 1)}
              />
            ))}
          </div>
        </section>
        <section aria-labelledby="strains-about" className="pt-4">
          <h2 id="strains-about" className="sr-only">
            {strain.title}
          </h2>
          <p className="text-base text-gray-700">{strain.about}</p>
        </section>
      </div>
      <ProductResultsSection
        list={products}
        sponsored={true}
        label={"Shop %Query%"}
      />
    </div>
  );
}
