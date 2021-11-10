import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";

import React from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Strain } from "../../interfaces/strain";
interface StrainProps {
  strain: Strain;
}
export default function StrainCardSmall(data: StrainProps) {
  const { strain } = data;

  return (
    <Disclosure
      as="div"
      key={strain.id}
      className="relative w-full flex flex-wrap p-4"
      id={`strain-${strain.id}`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full flex">
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
                <h3 className="text-sm text-gray-500 font-normal">
                  {strain.title}
                </h3>
              </div>
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
                <p className="text-sm text-gray-500 font-normal">
                  {strain.type}
                </p>
              </div>
            </div>
          </Disclosure.Button>

          <Disclosure.Panel as="div" className="w-full pt-4">
            <button
              type="button"
              className="flex text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
            >
              Pickup Avaliable
            </button>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
