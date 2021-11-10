import React from "react";
import SearchAll from "../../src/views/search/SearchAll";
import SearchDispensary from "../../src/views/search/SearchDispensary";
import SearchStrain from "../../src/views/search/SearchStrain";
import { Tab } from "@headlessui/react";

export default function Search() {
  const tabs = [
    { name: "All" },

    { name: "Dispensaries", href: "#", current: false },
    { name: "Strains", href: "#", current: false },
    { name: "Restauraunts", href: "#", current: false },
    { name: "Shops", href: "#", current: false },
  ];

  return (
    <div className="bg-gray-50 ">
      <div className="overflow-visible overflow-scroll border-b border-gray-200 bg-white ">
        <Tab.Group>
          <Tab.List className="w-full overflow-visible overflow-x-scroll border-b border-gray-200 flex">
            {tabs.map((tab) => (
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
              {/* Search All */}
              <SearchAll />
              {/* Search All */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Dispensery */}
              <SearchDispensary />
              {/* Search Dispensery */}
            </Tab.Panel>
            <Tab.Panel className="focus:outline-none">
              {/* Search Strain */}
              <SearchStrain />
              {/* Search Strain */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

    </div>
  );
}