import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";

interface Filters {
  filters: Array<string>;
  label: string;
  values: any;
  id: string;
  handleFilter: Function;
  setFieldValue: Function;
}

export default function FilterForm(data: Filters) {
  const { filters, label, id, handleFilter, setFieldValue, values } = data;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-6 text-left flex font-semibold text-green text-base w-full"
        onClick={() => setOpen(true)}
      >
        {label}

        {values.length > 0 && <span>&nbsp;({values.length} applied)</span>}
        <ChevronRightIcon className="w-6 h-6 ml-auto text-gray-400 ml-auto" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <div className="absolute w-full h-full inset-0 overflow-hidden z-50">
          <div className="inset-y-0 right-0 max-w-full h-full flex">
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
                <div className="h-full flex flex-col pt-8 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {label}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1">
                    {/* Body content */}
                    <div className="h-full">
                      <div
                        className="h-full inset-0 flex flex-wrap content-between"
                        aria-hidden="true"
                      >
                        <div className="grid grid-flow-row auto-rows-max gap-4 px-4">
                          {filters.map((filter, index) => (
                            <div
                              className="flex items-center "
                              key={`${filter}-${index}`}
                            >
                              <Field
                                id={`${id}.${index}`}
                                name={`filters.${id}`}
                                value={`${filter}`}
                                type="checkbox"
                                className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded"
                                onChange={(event: Event) =>
                                  handleFilter(event, id, setFieldValue)
                                }
                              />
                              <div className="ml-4 text-base">
                                <label
                                  htmlFor="comments"
                                  className="font-medium text-gray-500"
                                >
                                  {filter}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center w-full border-t border-gray-200 ">
                          <button
                            className="px-4 py-6 text-left flex items-center font-semibold text-green text-sm"
                            onClick={() => setOpen(false)}
                          >
                            <ChevronLeftIcon className="w-6 h-6" />
                            back
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition.Root>
    </>
  );
}
