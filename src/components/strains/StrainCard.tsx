import { Strain } from "../../interfaces/strain";
import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";

interface StrainProps {
  strain: Strain;
}
export default function StrainCard(data: StrainProps) {
  const { strain } = data;

  return (
    <div
      key={strain.id}
      className="relative w-36 flex flex-wrap"
      id={`strain-${strain.id}`}
    >
      <div className="rounded-lg overflow-hidden w-36 h-36 relative">
        <Image
          src={strain.images[0]}
          alt={strain.title}
          layout="fill"
          objectFit={"cover"}
        />
      </div>
      <div className="pt-2 pb-6 text-left text-sm w-36">
        <h3 className="text-sm font-normal text-gray-700">{strain.title}</h3>
        <div className="flex flex-col items-start">
          <p className="sr-only">{strain.rating} out of 5 stars</p>
          <div className="flex items-center">
            <span className="font-normal text-gray-500">{strain.rating}</span>

            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`    ${
                  strain.rating > rating ? "text-yellow-400" : "text-gray-200"
                }
                  flex-shrink-0 h-4 w-4`}
                aria-hidden="true"
              />
            ))}
            <p className="font-normal text-gray-500">({strain.reviewCount})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
