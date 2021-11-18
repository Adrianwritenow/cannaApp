import { ArrowLeftIcon, StarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import BusinessAbout from "../../../src/views/business/BusinessAbout";
import BusinessMenu from "../../../src/views/business/BusinessMenu";
import BusinessOverview from "../../../src/views/business/BusinessOverview";
import BusinessReviews from "../../../src/views/business/BusinessReviews";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { listings } from "../../../src/helpers/mockData";
import { useRouter } from "next/router";

export default function StrainDetail() {
  const listing = listings[0];
  const [view, setView] = useState(0);
  const router = useRouter();

  const tabs = [
    { name: "Overview", current: false },
    {
      name: "Menu",
      current: false,
    },
    { name: "Reviews", current: false },
    { name: "About", current: false },
  ];

  return (
    <div className="bg-white">
      <div className="w-full h-64 relative">
        <Image src={listing.image} layout="fill" objectFit={"cover"} />
        <button
          onClick={() => router.back()}
          className="bg-white rounded-full shadow-sm absolute w-10 h-10 flex items-center justify-center left-0 top-0 z-30 m-4"
        >
          <ArrowLeftIcon className="text-gray-700 w-4" />
        </button>
      </div>
      <div className="p-4 pb-0">
        <section aria-labelledby="business-heading">
          <h2 id="business-heading" className="sr-only">
            {listing.name}
          </h2>
          <h2 className="text-gray-700 text-2xl font-semibold">
            {listing.name}
          </h2>
          <div className="grid gap-2 grid-flow-row auto-rows-max text-sm text-gray-500 pt-2">
            <div className="flex items-center ">
              <StarIcon
                className={`flex-shrink-0 h-5 w-5 text-yellow-400`}
                aria-hidden="true"
              />
              <p className="p">
                <span>{listing.rating.toFixed(1)}</span> ({listing.reviewCount})
                Reviews
              </p>
            </div>
            <div className="flex">
              <p>{listing.category}</p>
              <span className="px-1 text-normal">&#8226;</span>
              <p>{listing.distance}</p>
              <span className="px-1 text-normal">&#8226;</span>
              <p>$$$</p>
            </div>
            <div className="flex">
              <p className="text-normal text-blue-500">Open</p>
              <span className="px-1 text-normal">&#8226;</span>
              <p>Closes {listing.closeTime}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Tab Navigation */}
      <section>
        <Tab.Group defaultIndex={view}>
          <Tab.List className="w-full overflow-visible shadow-md overflow-x-scroll border-b border-gray-200 flex">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `${
                    selected
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                }
              >
                <span className="px-4">{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>
          {/* Panels that control the view by index */}
          <Tab.Panels className="focus:outline-none">
            <Tab.Panel className="focus:outline-none">
              {/* Overview */}
              <BusinessOverview business={listing} />
              {/* Overview */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Menu */}
              <BusinessMenu business={listing} />
              {/* Menu */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Reviews */}
              <BusinessReviews business={listing} />
              {/* Reviews */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* About */}
              <BusinessAbout business={listing} />
              {/* ABout */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </div>
  );
}
