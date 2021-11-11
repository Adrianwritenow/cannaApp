import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Strain } from "../../interfaces/strain";

interface StrainProps {
  strain: Strain;
}

export default function StrainCardSmall(data: StrainProps) {
  const { strain } = data;

  return (
    <div className="w-full flex p-4 items-center">
      <div className="rounded-lg overflow-hidden w-12 h-12 relative flex-shrink-0 mr-3">
        <Image
          src={strain.images[0]}
          alt={strain.title}
          layout="fill"
          objectFit={"cover"}
        />
      </div>
      <div className="text-left text-sm w-full">
        <div className="flex flex-wrap justify-between">
          <h3 className="text-sm font-normal text-gray-700">{strain.title}</h3>
        </div>
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
          <p className="text-sm text-gray-500">{strain.type}</p>
        </div>
      </div>
    </div>
  );
}
