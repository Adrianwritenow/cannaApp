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

  const initialValues = {
    filters: {
      strains: [],
      category: "",
    },
    sort: "",
    price: {
      cost: "",
      min_price: "",
      max_price: "",
    },
    search: "",
  };
  const [savedValues, setSavedValues]: any = useState({
    filters: {
      strains: [],
      category: "",
    },
    sort: "",
    price: {
      cost: "",
      min_price: "",
      max_price: "",
    },
    search: "",
  });

  const [filterTabs, setFilterTabs]: any = useState([]);

  // Remove filters from list to be rendered and update the form state values

  function removeFilter(filter: string) {
    Object.keys(savedValues).map((key) => {
      const currentArray = savedValues[key];
      if (currentArray.includes(filter)) {
        currentArray.splice(currentArray.indexOf(filter), 1);
      }
      setSavedValues({ ...savedValues, currentArray });
    });
  }

  useEffect(() => {
    const price = savedValues.price;
    const filters: any = {
      strains: savedValues.filters.strains,
      category: [savedValues.filters.category],
      price: [savedValues.price.cost],
      price_range: [
        `${price.min_price ? "$" + price.min_price : ""}${
          price.min_price && price.max_price ? " - " : ""
        }${price.max_price ? "$" + price.max_price : ""}`,
      ],
    };

    const filter_data: string[] = Object.keys(filters).reduce(function (
      res,
      key
    ) {
      return res.concat(filters[key]);
    },
    []);

    console.log("XXX", filters);
    const filter_array = filter_data.filter(function (entry: string) {
      return entry.trim() != "";
    });

    var is_same =
      filter_array.length == filterTabs.length &&
      filter_array.every(function (element, index) {
        return element === filterTabs[index];
      });

    if (!is_same) {
      setSavedValues((prevState: any) => ({
        ...prevState,
        filters,
      }));
    }

    console.log("SAVED::", savedValues);

    setFilterTabs(filter_array);
  }, [savedValues]);

  return (
    <div>
      <Formik
        initialValues={savedValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, errors, setFieldValue, handleChange }) => {
          return (
            <Form>
              <div>
                <FilterMenu
                  open={open}
                  values={values}
                  setOpen={setOpen}
                  label="Filters"
                  setSavedValues={setSavedValues}
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
                        {filterTabs.map((filter: string, index: any) => (
                          <button
                            type="button"
                            key={`${filter}_${index}`}
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
