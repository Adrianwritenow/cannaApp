import {
  AdjustmentsIcon,
  ChevronLeftIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { FormEvent, Fragment, useEffect, useState } from "react";

import DropdownFilter from "../forms/fields/DropdownFilter";
import FilterForm from "./FilterForm";
import { Filters } from "../../helpers/filters";
import { SearchBar } from "../forms/fields/SearchBar";
import StrainsIcon from "../../../public/assets/icons/iconComponents/Strains";

export default function FilterMenu() {
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState("Top Rated");
  const [pricing, setPricing] = useState("On Sale");
  const initialValues = {
    filters: {
      types: [],
      strains: [],
    },
    search: "",
  };
  const [savedValues, setSavedValues]: any = useState({
    filters: {
      types: [],
      strains: [],
    },
    search: "",
  });
  const [filterTabs, setFilterTabs]: any = useState([]);
  const values = savedValues.filters;

  // Check values to see if they are empty
  const allEmpty = Object.keys(savedValues).every(function (key) {
    return savedValues[key].length === 0;
  });

  // Add filters to list to be rendered and update the form state values
  function handleFilter(
    event: FormEvent<HTMLFormElement>,
    id: string,
    setFieldValue: Function
  ) {
    const element = event.target as HTMLFormElement;
    const value = element.value;
    const currentFilters = savedValues;
    const filterField = currentFilters.filters[`${id}`];

    if (filterField.includes(value)) {
      filterField.splice(filterField.indexOf(value), 1);
    } else {
      filterField.push(value);
    }

    setSavedValues((prevState: any) => {
      return { ...prevState, [`${id}`]: filterField };
    });

    setFieldValue("filters", savedValues.filters);
  }

  // Removwe filters from list to be rendered and update the form state values

  function removeFilter(filter: string) {
    Object.keys(values).map((key) => {
      const currentArray = values[key];
      if (currentArray.includes(filter)) {
        currentArray.splice(currentArray.indexOf(filter), 1);
      }
      setSavedValues({ ...savedValues, currentArray });
    });
  }

  useEffect(() => {
    const filter_array = Object.keys(values).reduce(function (res, key) {
      return res.concat(values[key]);
    }, []);

    setFilterTabs(filter_array);
  }, [savedValues]);

  return (
    <div>
      <Formik
        initialValues={!allEmpty ? savedValues : initialValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="px-4">
                <Field
                  name={"search"}
                  component={SearchBar}
                  type={"text"}
                  placeholder="Search"
                  id={"search"}
                  setFieldValue={setFieldValue}
                />
              </div>
              <Transition.Root show={open} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 overflow-hidden z-50"
                  onClose={setOpen}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0" />

                    <div className="fixed inset-y-0 right-0 max-w-full flex">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                      >
                        <div className="w-screen max-w-md">
                          <div className="h-full flex flex-col pt-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                              <div className="flex items-start justify-between">
                                <div className="flex">
                                  <StrainsIcon className="w-7 h-7 mr-2" />

                                  <h2 className="text-xl font-bold text-gray-900">
                                    Strain Filter
                                  </h2>
                                </div>
                                <div className="ml-3 h-7 flex items-center">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    <span className="sr-only">
                                      Close filter
                                    </span>
                                    <XIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 relative flex-1">
                              {/* Body content */}
                              <div className="relative w-full h-full inset-0 flex flex-wrap content-between">
                                <div className="grid w-full grid-flow-row auto-rows-max border-t border-b divide-y divide-gray-200">
                                  {/* // Form Popover sets based on type of filter */}
                                  <FilterForm
                                    filters={Filters.type}
                                    label={"Product Type"}
                                    id={"types"}
                                    values={values.filters.types}
                                    handleFilter={handleFilter}
                                    setFieldValue={setFieldValue}
                                  />
                                  <FilterForm
                                    filters={Filters.strains}
                                    label={"Strain"}
                                    id={"strains"}
                                    values={values.filters.strains}
                                    handleFilter={handleFilter}
                                    setFieldValue={setFieldValue}
                                  />
                                </div>
                                <div className="flex items-center w-full border-t border-gray-200 ">
                                  <button
                                    className="px-4 py-6 text-left flex items-center font-semibold text-green text-sm"
                                    onClick={() => setOpen(false)}
                                  >
                                    <ChevronLeftIcon className="w-6 h-6" />
                                    see %NUM% results
                                  </button>
                                  <button
                                    onClick={() =>
                                      setSavedValues(initialValues)
                                    }
                                    className="px-4 ml-auto py-6 text-left flex font-semibold text-green text-sm"
                                  >
                                    clear all filters
                                  </button>
                                </div>
                              </div>
                              {/* /End Body */}
                            </div>
                          </div>
                        </div>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </Form>
          );
        }}
      </Formik>
      {/* Filter Tabs list */}
      <div className="flex items-center py-3.5 relative overflow-x-scroll">
        <div className="w-full flex">
          <div className="ml-4 mr-2 flex items-center">
            <button
              type="button"
              className="bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Close filter</span>
              <AdjustmentsIcon className="w-6 h-6 transform rotate-90" />
            </button>
          </div>
          <div className="flex">
            <div className="flex">
              <DropdownFilter
                setter={setPricing}
                options={["Most Expensive", "Least Expensive", "On Sale"]}
                current={pricing}
                label={"Sort by"}
              />
              <DropdownFilter
                setter={setRated}
                options={["Most Reviewed", "Top Rated", "Lowest rated"]}
                current={rated}
                label={"Sort by"}
              />
            </div>
            <div className="flex">
              {/* Tab filters rendered */}
              {filterTabs.map((filter: string) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => {
                    removeFilter(filter);
                  }}
                  className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1"
                >
                  <span>{filter}</span>
                  <span className="sr-only">Remove filter for label</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
