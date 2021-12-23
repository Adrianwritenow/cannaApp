import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

import { BusinessSlideoverProps } from "../../interfaces/props/businessSlideOverProps";

export default function AboutUsSlideOver(props: BusinessSlideoverProps) {
  const { dispensary } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <section aria-labelledby="business-about" className="pt-4">
        <h2 id="business-about" className="sr-only">
          About
        </h2>
        <h2
          id="business-about"
          className="text-lg text-gray-700 font-semibold py-2"
        >
          About Us
        </h2>
        <p className={"text-base text-gray-700 line-clamp-4"}>
          {dispensary?._source.description}
        </p>
        <div className="pt-5 ">
          <button
            onClick={() => setOpen(true)}
            className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
          >
            Learn more
          </button>
        </div>
      </section>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className=" z-50" onClose={setOpen}>
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
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      <section
                        aria-labelledby="business-about"
                        className="pt-4"
                      >
                        <h2 id="business-about" className="sr-only">
                          About
                        </h2>
                        <h2
                          id="business-about"
                          className="text-lg text-gray-700 font-semibold py-2"
                        >
                          About Us
                        </h2>
                        <p className={"text-base text-gray-700"}>
                          {dispensary?._source.description}
                        </p>
                      </section>
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
