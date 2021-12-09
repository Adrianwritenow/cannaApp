import { AdjustmentsIcon, TagIcon } from "@heroicons/react/solid";
import { Field, Form, Formik } from "formik";
import React, { FormEvent, useEffect, useState } from "react";

import BusinessProductCard from "../products/BusinessProductCard";
import DropdownFilter from "../forms/fields/DropdownFilter";
import FilterMenu from "./FilterMenu";
import { Product } from "../../interfaces/product";
import { SearchBar } from "../forms/fields/SearchBar";
import { Tab } from "@headlessui/react";

interface FilterMenuTabsProps {
  products: Product[];
}

export default function FilterMenuTabs(props: FilterMenuTabsProps) {
  const { products } = props;
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState("Top Rated");
  const [pricing, setPricing] = useState("On Sale");
  const [view, setView] = useState(0);

  const tabs = ["Deals", "Flower", "Concentrates", "Edibles", "Topicals"];
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
              <div>
                <Tab.Group defaultIndex={view}>
                  <Tab.List className="w-full overflow-visible overflow-x-scroll border-b border-gray-200 flex">
                    {tabs.map((tab, index) => (
                      <Tab
                        key={tab}
                        className={({ selected }) =>
                          `${
                            selected
                              ? "border-green text-green"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                        }
                      >
                        <span className="px-4">{tab}</span>
                      </Tab>
                    ))}
                  </Tab.List>

                  <FilterMenu
                    open={open}
                    setFieldValue={setFieldValue}
                    values={values}
                    setOpen={setOpen}
                    setSavedValues={setSavedValues}
                    savedValues={savedValues}
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
                              className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1"
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
                  <div>
                    {/* Panels that control the view by index */}
                    <Tab.Panels className="focus:outline-none px-4">
                      <Tab.Panel className="focus:outline-none">
                        <section className="py-2">
                          <h2 id="business-deals" className="sr-only">
                            Deals
                          </h2>
                          <div className="flex items-center pb-1">
                            <TagIcon className="text-green w-6 h-6 mr-2" />
                            <h2
                              id="business-about"
                              className="text-2xl text-green text-gray-700 font-semibold"
                            >
                              Deals
                            </h2>
                          </div>

                          {products.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                      <Tab.Panel className="focus:outline-none">
                        <section>
                          <h2 id="business-flower" className="sr-only">
                            Flower
                          </h2>
                          <h2
                            id="business-flower"
                            className="text-2xl text-gray-700 font-semibold py-2"
                          >
                            Flower
                          </h2>
                          {products.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                      <Tab.Panel className="focus:outline-none">
                        <section>
                          <h2 id="business-concentrates" className="sr-only">
                            Concentrates
                          </h2>
                          <h2
                            id="business-concentrates"
                            className="text-2xl text-gray-700 font-semibold py-2"
                          >
                            Concentrates
                          </h2>
                          {products.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                      <Tab.Panel className="focus:outline-none">
                        <section>
                          <h2 id="business-edibles" className="sr-only">
                            Edibles
                          </h2>
                          <h2
                            id="business-edibles"
                            className="text-2xl text-gray-700 font-semibold py-2"
                          >
                            Edibles
                          </h2>
                          {products.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                      <Tab.Panel className="focus:outline-none">
                        <section>
                          <h2 id="business-topicals" className="sr-only">
                            Topicals
                          </h2>
                          <h2
                            id="business-topicals"
                            className="text-2xl text-gray-700 font-semibold py-2"
                          >
                            Topicals
                          </h2>
                          {products.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
