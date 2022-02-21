import { AdjustmentsIcon, TagIcon } from '@heroicons/react/solid';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import BusinessProductCard from '../products/BusinessProductCard';
import DropdownFilter from '../forms/fields/DropdownFilter';
import FilterProductMenu from './FilterProductMenu';
import { Filters } from '@/helpers/filters';
import { Product } from '@/interfaces/product';
import { SearchBar } from '../forms/fields/SearchBar';
import { Tab } from '@headlessui/react';
import { filterFlatten } from '@/helpers/filterFlatten';

interface FilterMenuTabsProps {
  products: Product[];
}

export default function FilterMenuTabs(props: FilterMenuTabsProps) {
  const { products } = props;
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('Relevance');
  const [view, setView] = useState(0);
  const [productResults, setProductResults] = useState(products);
  const [filterList, setFilterList]: any = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const tabs = ['All', 'Flower', 'Concentrates', 'Edibles', 'Topicals'];

  const [savedValues, setSavedValues]: any = useState({
    category: '',
    filters: {
      category: [],
      sort: [],
    },
    sort: sort,
  });
  const initialValues: any = {
    filters: {
      category: [],
      sort: [],
    },
    category: '',
    sort: sort,
  };

  // List of filters from taxonomy to filter against in the quick filter view sub filters are grouped by parent
  const flowerFilters = filterFlatten(Filters.flower);
  const edibleFilters = filterFlatten(Filters.edibles);
  const topicalFilters = filterFlatten(Filters.topicals);
  const concentrateFilters = filterFlatten(Filters.concentrates);

  // Check values to see if they are empty
  const allEmpty = Object.keys(savedValues).every(function (key) {
    return savedValues[key].length === 0;
  });

  // Remove filters from list to be rendered and update the form state values
  function removeFilter(keyName: string, filter: string) {
    let stateCopy = Object.assign({}, savedValues);
    let listCopy = filterList;
    const isArray =
      Object.prototype.toString.call(initialValues[keyName]).indexOf('Array') >
      1;

    if (isArray) {
      stateCopy[keyName].splice(stateCopy[keyName].indexOf(filter), 1);
    } else {
      stateCopy[keyName] = initialValues[keyName];
      stateCopy.filters[keyName] = [''];
    }

    listCopy.splice(listCopy.indexOf(filter), 1);

    setFilterList(listCopy);
    setSavedValues(stateCopy);
  }

  // adds short delay to prevent search from firing until the user has stopped typing
  let timeout: ReturnType<typeof setTimeout>;
  function handleSearch(e: any) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      if (e.target.name === 'search') {
        searchThroughProducts(products, e.target.value);
        setSearchTerm(e.target.value);
      }
    }, 500);
  }

  // Local search function, flattens values from products array to be searchable
  function searchThroughProducts(products: Product[], term: string) {
    const searchResults = products.filter(function (product) {
      let product_values = Object.values(product._source).flat(1);
      return product_values.some(value =>
        value.toString().toLowerCase().includes(term.toLowerCase())
      );
    });

    const originalOrder = searchResults.slice();

    // Sort menu
    switch (sort) {
      case 'Relevance':
        setProductResults(originalOrder);
        break;
      case 'Price: Low to High':
        searchResults.sort(
          (a: Product, b: Product) =>
            (a._source.price ? a._source.price[0] : 99999) -
            (b._source.price ? b._source.price[0] : 99999)
        );
        setProductResults(searchResults);

        break;
      case 'Price: High to Low':
        searchResults.sort(
          (a: Product, b: Product) =>
            (b._source.price ? b._source.price[0] : 0) -
            (a._source.price ? a._source.price[0] : 0)
        );
        setProductResults(searchResults);
        break;
      case 'Rating':
        searchResults.sort(
          (a: Product, b: Product) =>
            (b._source.rating ? b._source.rating[0] : 0) -
            (a._source.rating ? a._source.rating[0] : 0)
        );
        setProductResults(searchResults);
        break;
      default:
    }

    // Set current list of products
  }

  useEffect(() => {
    // Force values to array in order to check if they exist in case of multiple values
    const filters: any = {
      sort: [savedValues.sort],
      category: [savedValues.category],
    };

    const filter_data: string[] = Object.keys(filters).reduce(function (
      res,
      key
    ) {
      return res.concat(filters[key]).flat(1);
    },
    []);

    // Remove initial empty values
    const filterArray = filter_data.filter(function (entry: string) {
      return entry.trim() != '';
    });
    setFilterList(filterArray);

    // Check to see if value is unique if not update
    const is_same =
      filterArray.length == filterList.length &&
      filterArray.every(function (element, index) {
        return element === filterList[index];
      });

    if (!is_same) {
      setSavedValues((prevState: any) => ({
        ...prevState,
        filters,
      }));
    }

    if (savedValues.filters.category[0]) {
      // If filter exists filter based on category provided
      const filtered = productResults.filter(
        product =>
          product._source.category[0].toLowerCase() ===
          savedValues.filters.category[0].toLowerCase()
      );
      setProductResults(filtered);
    } else {
      // If no tags reset the search based on term
      searchThroughProducts(products, searchTerm);
    }
    // update sort
    setSort(savedValues.sort);
  }, [savedValues, searchTerm]);

  return (
    <div>
      <Formik
        initialValues={!allEmpty ? savedValues : initialValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, handleChange }) => {
          return (
            <Form>
              <div className="px-4">
                <div className="w-full shadow-sm rounded-md border border-gray-200 overflow-hidden pl-4 ">
                  <Field
                    name={'search'}
                    component={SearchBar}
                    type={'text'}
                    placeholder="Search"
                    className={
                      'w-full border-none p-2 focus:border-0 focus:outline-none focus:ring-transparent'
                    }
                    id={'search'}
                    setFieldValue={setFieldValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      handleSearch(e);
                    }}
                  />
                </div>
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
                              ? 'border-green text-green'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                        }
                      >
                        <span className="px-4">{tab}</span>
                      </Tab>
                    ))}
                  </Tab.List>

                  <FilterProductMenu
                    open={open}
                    values={values}
                    setOpen={setOpen}
                    label="Filters"
                    setFieldValue={setFieldValue}
                  />
                  {/* Filter Tabs list */}
                  <div className="flex items-center py-3.5 relative overflow-x-scroll">
                    <div className="w-full flex">
                      <div className="ml-4 mr-2 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md focus:outline-none"
                          onClick={() => setOpen(true)}
                        >
                          <span className="sr-only">Open filter</span>
                          <AdjustmentsIcon className="w-6 h-6 transform rotate-90" />
                        </button>
                      </div>
                      <div className="flex">
                        <div className="flex">
                          <DropdownFilter
                            setter={setSort}
                            options={[
                              'Relevance',
                              'Price: Low to High',
                              'Price: High to Low',
                              'Rating',
                            ]}
                            current={sort}
                            id={'sort'}
                            label={'Sort by'}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className="flex">
                          {/* Tab filters rendered */}
                          {Object.keys(savedValues.filters).map((keyName, i) =>
                            savedValues.filters[keyName].map(
                              (filter: string, index: any) => {
                                if (
                                  savedValues.filters[keyName][index] !== '' &&
                                  keyName !== 'sort'
                                ) {
                                  return (
                                    <button
                                      type="button"
                                      key={`${keyName}_${index}`}
                                      onClick={() => {
                                        removeFilter(keyName, filter);
                                      }}
                                      className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1 w-max"
                                    >
                                      <span>{filter}</span>
                                      <span className="sr-only">
                                        Remove filter for label
                                      </span>
                                    </button>
                                  );
                                }
                              }
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-16">
                    {/* Panels that control the view by index */}
                    <Tab.Panels className="focus:outline-none px-4">
                      <Tab.Panel className="focus:outline-none">
                        <section className="py-2">
                          <h2 id="business-all" className="sr-only">
                            All
                          </h2>
                          <div className="flex items-center pb-1">
                            <h2
                              id="business-all"
                              className="text-2xl text-gray-700 font-semibold py-2"
                            >
                              All
                            </h2>
                          </div>

                          {productResults.map((product: Product, index) => (
                            <BusinessProductCard
                              product={product}
                              key={`pc-${index}`}
                            />
                          ))}
                        </section>
                      </Tab.Panel>
                      {/* <Tab.Panel className="focus:outline-none">
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
                      </Tab.Panel> */}
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
                          {productResults.map((product: Product, index) => {
                            const categoryMatches = flowerFilters.some(
                              filter => {
                                return flowerFilters.includes(
                                  product._source.category[0]
                                );
                              }
                            );

                            if (categoryMatches) {
                              return (
                                <BusinessProductCard
                                  product={product}
                                  key={`pc-${index}`}
                                />
                              );
                            }
                          })}
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
                          {productResults.map((product: Product, index) => {
                            const categoryMatches = concentrateFilters.some(
                              filter => {
                                return concentrateFilters.includes(
                                  product._source.category[0]
                                );
                              }
                            );

                            if (categoryMatches) {
                              return (
                                <BusinessProductCard
                                  product={product}
                                  key={`pc-${index}`}
                                />
                              );
                            }
                          })}
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
                          {productResults.map((product: Product, index) => {
                            const categoryMatches = edibleFilters.some(
                              filter => {
                                return edibleFilters.includes(
                                  product._source.category[0]
                                );
                              }
                            );

                            if (categoryMatches) {
                              return (
                                <BusinessProductCard
                                  product={product}
                                  key={`pc-${index}`}
                                />
                              );
                            }
                          })}
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
                          {productResults.map((product: Product, index) => {
                            const categoryMatches = topicalFilters.some(
                              filter => {
                                return topicalFilters.includes(
                                  product._source.category[0]
                                );
                              }
                            );

                            if (categoryMatches) {
                              return (
                                <BusinessProductCard
                                  product={product}
                                  key={`pc-${index}`}
                                />
                              );
                            }
                          })}
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
