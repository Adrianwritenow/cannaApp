import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Strain } from "../../interfaces/strain";
import styles from "./StrainCard.module.scss";

interface StrainProps {
  strain: Strain;
}
export default function StrainCard(data: StrainProps) {
  const { strain } = data;

  return (
    <Link href="/strain/1" passHref>
      <a>
        <div
          key={strain.id}
          className="relative w-full flex flex-wrap min-w-36"
          id={`strain-${strain.id}`}
        >
          <div className="rounded-lg overflow-hidden relative w-full pb-full">
            <Image
              src={strain.images[0]}
              alt={strain.title}
              layout="fill"
              objectFit={"cover"}
              className={"w-full h-full"}
            />
          </div>
          <div className="pt-2 pb-6 text-left text-sm">
            <h3 className="text-sm font-normal text-gray-700">
              {strain.title}
            </h3>
            <div className="flex flex-col items-start">
              <p className="sr-only">{strain.rating} out of 5 stars</p>
              <div className="flex items-center">
                <span className="font-normal text-gray-500">
                  {strain.rating}
                </span>

                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`    ${
                      strain.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  flex-shrink-0 h-4 w-4`}
                    aria-hidden="true"
                  />
                ))}
                <p className="font-normal text-gray-500">
                  ({strain.reviewCount})
                </p>
              </div>
              <p className="text-sm text-gray-500">{strain.type}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
