import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import { ArrowLeftIcon } from "@heroicons/react/outline";
import { BusinessSlideoverProps } from "../../interfaces/props/businessSlideOverProps";
import FilterMenuTabs from "../../components/filter/FilterMenuTabs";
import ProductResultsSection from "../../components/sections/ProductsResultsSection";
import { products } from "../../helpers/mockData";

export default function BusinessMenuSlideOver(props: BusinessSlideoverProps) {
  const { dispensary } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ProductResultsSection
        products={products}
        sponsored={false}
        label={"Explore our Products"}
        buttonLabel={"See all Products"}
        stateFunction={setOpen}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4">
                      <div className="flex items-center justify-start">
                        <div className="flex items-center mr-9">
                          <button
                            type="button"
                            className="bg-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Back</span>
                            <ArrowLeftIcon className="text-gray-700 w-6 h-6" />
                          </button>
                        </div>
                        <Dialog.Title className="text-lg font-semibold text-gray-600">
                          {dispensary?._source.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1">
                      <section className="w-full">
                        <FilterMenuTabs products={products} />
                      </section>
                      <div className="px-4 grid grid-flow-row auto-rows-max gap-9"></div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
