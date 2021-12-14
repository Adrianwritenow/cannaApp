import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { AdjustmentsIcon } from "@heroicons/react/solid";
import { BusinessSlideoverProps } from "../../interfaces/props/businessSlideOverProps";
import DropdownFilter from "../../components/forms/fields/DropdownFilter";
import FilterMenu from "../../components/filter/FilterMenu";

export default function BrandFilterSlideOver(props: BusinessSlideoverProps) {
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState("Top Rated");
  const [pricing, setPricing] = useState("On Sale");
  const [view, setView] = useState(0);

  const tabs = ["Deals", "Flower", "Concentrates", "Edibles", "Topicals"];
  const initialValues = {
    filters: {
      types: [],
      strains: [],
      sort: [],
      price: [],
      concentrates: [],
      edibles: [],
      topicals: [],
    },
    range: {
      min_price: "",
      max_price: "",
    },
    search: "",
  };
  const [savedValues, setSavedValues]: any = useState({
    filters: {
      types: [],
      strains: [],
      sort: [],
      price: [],
      concentrates: [],
      edibles: [],
      topicals: [],
    },
    range: {
      min_price: "",
      max_price: "",
    },
    search: "",
  });
  const [filterTabs, setFilterTabs]: any = useState([]);
  const values = savedValues.filters;

  // Check values to see if they are empty
  const allEmpty = Object.keys(savedValues).every(function (key) {
    return savedValues[key].length === 0;
  });

  // Remove filters from list to be rendered and update the form state values

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
  }, [savedValues, open, values]);

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
              <div>
                <FilterMenu
                  open={open}
                  setFieldValue={setFieldValue}
                  values={values}
                  setOpen={setOpen}
                  setSavedValues={setSavedValues}
                  savedValues={savedValues}
                  label="Filters"
                />
                {/* Filter Tabs list */}
                <div className="flex items-center py-3.5 relative overflow-x-scroll">
                  <div className="w-full flex">
                    <div className="ml-4 mr-2 flex items-center">
                      <button
                        type="button"
                        className="bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setOpen(true)}
                      >
                        <span className="sr-only">Open filter</span>
                        <AdjustmentsIcon className="w-6 h-6 transform rotate-90" />
                      </button>
                    </div>
                    <div className="flex">
                      <div className="flex">
                        <DropdownFilter
                          setter={setPricing}
                          options={[
                            "Most Expensive",
                            "Least Expensive",
                            "On Sale",
                          ]}
                          current={pricing}
                          label={"Sort by"}
                        />
                        <DropdownFilter
                          setter={setRated}
                          options={[
                            "Most Reviewed",
                            "Top Rated",
                            "Lowest rated",
                          ]}
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
                            className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1 w-max"
                          >
                            <span>{filter}</span>
                            <span className="sr-only">
                              Remove filter for label
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
