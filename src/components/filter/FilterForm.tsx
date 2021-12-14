import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/solid";
import { Deals } from "../../../public/assets/icons/iconComponents";

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

  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full max-w-md">
          <div className="h-full flex flex-col pt-8">
            <div>
              <Disclosure.Button className="w-full flex justify-start focus:outline-none  ">
                <div
                  className={`w-full ${
                    open ? "border-b border-gray-200" : ""
                  } flex items-center`}
                >
                  <ChevronRightIcon
                    className={`w-6 h-6 text-gray-500 transition-transform duration-75 ease-in-out ${
                      open ? "transform rotate-90" : ""
                    }`}
                  />
                  <h3 className="text-sm font-semibold text-gray-700 text-left py-2 pl-4">
                    {label}
                  </h3>
                </div>
              </Disclosure.Button>
            </div>
            <div className="mt-6 relative flex-1">
              {/* Body content */}
              <Disclosure.Panel className="text-gray-500">
                <div className="h-full">
                  <div
                    className="h-full inset-0 flex flex-wrap content-between"
                    aria-hidden="true"
                  >
                    <div className="grid grid-flow-row auto-rows-max gap-4">
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
                            className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full"
                            onChange={(event: Event) =>
                              handleFilter(event, id, setFieldValue)
                            }
                          />
                          <div className="ml-2 text-base">
                            <label
                              htmlFor="comments"
                              className=" text-sm text-gray-900"
                            >
                              {filter}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {id === "price" && (
                      <div className="grid grid-cols-2 gap-4  pt-5">
                        <div className="relative">
                          <Field
                            className="rounded-md w-full pl-10 focus:ring-green focus:border-green "
                            placeholder="Min"
                            type="text"
                            name="range.min_price"
                          />
                          <Deals className="w-5 h-5 absolute left-3 top-0 bottom-0 mt-auto mb-auto" />
                        </div>
                        <div className="relative">
                          <Field
                            className="rounded-md w-full pl-10 focus:ring-green focus:border-green  "
                            placeholder="Max"
                            type="text"
                            name="range.max_price"
                          />
                          <Deals className="w-5 h-5 absolute left-3 top-0 bottom-0 mt-auto mb-auto" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>

              {/* /End replace */}
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
