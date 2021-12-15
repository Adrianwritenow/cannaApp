import { ChevronRightIcon } from "@heroicons/react/solid";
import { Deals } from "../../../public/assets/icons/iconComponents";
import { Disclosure } from "@headlessui/react";
import { Field } from "formik";
import { FilterItem } from "../../interfaces/filter";
import { InputField } from "../forms/fields/InputField";
import React from "react";

interface Filters {
  filters: Array<FilterItem>;
  label: string;
  value: any;
  type?: string;
  id: string;
  handleFilter: Function;
  setFieldValue: Function;
}

export default function FilterForm(data: Filters) {
  const { filters, label, id, handleFilter, setFieldValue, value, type } = data;

  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full max-w-md">
          <div className="flex flex-col">
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
            {/* Body content */}
            <Disclosure.Panel className="text-gray-500">
              <div className="h-full py-5">
                <div
                  className="h-full inset-0 flex flex-wrap content-between"
                  aria-hidden="true"
                >
                  <div className="grid grid-flow-row auto-rows-max gap-4 w-full">
                    {filters.map((filter, index) => {
                      return (
                        <div className="w-full" key={`${filter}-${index}`}>
                          <div className="flex items-center">
                            <Field
                              id={`${id}_${index}`}
                              name={`filters.${id}`}
                              value={`${filter.value}`}
                              checked={filter.value == value}
                              type={type ? type : "checkbox"}
                              className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full"
                              onChange={(event: Event) => {
                                console.log("BANG");
                                handleFilter(event, id, setFieldValue);
                              }}
                            />
                            <div className="ml-2 text-base">
                              <label
                                htmlFor="comments"
                                className=" text-sm text-gray-900"
                              >
                                {filter.value}
                              </label>
                            </div>
                          </div>
                          {filter.subList && (
                            <div className="grid grid-flow-row auto-rows-max gap-4 w-full pt-4">
                              {filter.subList.map((subFilter, index) => (
                                <div
                                  className="w-full"
                                  key={`${id}_sub_${index}`}
                                >
                                  <div className="flex items-center ml-4 ">
                                    <Field
                                      id={`${id}_sub_${index}`}
                                      name={`filters.${id}`}
                                      value={`${subFilter.value}`}
                                      type={type ? type : "checkbox"}
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
                                        {subFilter.value}
                                      </label>
                                    </div>
                                  </div>
                                  {subFilter.list && (
                                    <div className="grid grid-flow-row auto-rows-max gap-4 w-full pt-4">
                                      {subFilter.list.map(
                                        (tertiaryFilter, index) => (
                                          <div key={`${id}_tert_${index}`}>
                                            <div className="flex items-center ml-8">
                                              <Field
                                                id={`${id}_tert_${index}`}
                                                name={`filters.${id}`}
                                                value={`${tertiaryFilter.value}`}
                                                type={type ? type : "checkbox"}
                                                className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full"
                                                onChange={(event: Event) =>
                                                  handleFilter(
                                                    event,
                                                    id,
                                                    setFieldValue
                                                  )
                                                }
                                              />
                                              <div className="ml-2 text-base">
                                                <label
                                                  htmlFor="comments"
                                                  className=" text-sm text-gray-900"
                                                >
                                                  {tertiaryFilter.value}
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {id === "price" && (
                      <div className="grid grid-cols-2 gap-4  pt-5">
                        <div className="relative">
                          <Field
                            id="min_price"
                            placeholder="Min"
                            type="text"
                            name="range.min_price"
                            styles="rounded-md w-full pl-10 focus:ring-green focus:border-green  "
                            mask="$######"
                            component={InputField}
                          />
                          <Deals className="w-5 h-5 absolute left-3 top-0 bottom-0 mt-auto mb-auto" />
                        </div>
                        <div className="relative">
                          <Field
                            id="max_price"
                            placeholder="Max"
                            type="text"
                            name="range.max_price"
                            styles="rounded-md w-full pl-10 focus:ring-green focus:border-green  "
                            mask="$######"
                            component={InputField}
                          />
                          <Deals className="w-5 h-5 absolute left-3 top-0 bottom-0 mt-auto mb-auto" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>

            {/* /End replace */}
          </div>
        </div>
      )}
    </Disclosure>
  );
}
