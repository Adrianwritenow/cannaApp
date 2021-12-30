import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { AdjustmentsIcon } from '@heroicons/react/solid';
import DropdownFilter from '../../../components/forms/fields/DropdownFilter';
import FilterNewsMenu from '@/components/filter/FIlterNewsMenu';
import { Filters } from '@/helpers/filters';

export default function NewsFilterSlideOver() {
  const [open, setOpen] = useState(false);
  const [savedValues, setSavedValues]: any = useState({
    categories: [],
    filters: {},
    sort: '',
  });
  const [filterList, setFilterList]: any = useState([]);
  const [sort, setSort] = useState(savedValues.sort);

  const initialValues: any = {
    categories: [],
    filters: {},
    sort: '',
  };

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

  useEffect(() => {
    // Force values to array in order to check if they exist in case of multiple values
    const filters: any = {
      sort: [savedValues.sort],
      categories: savedValues.categories,
    };

    const filter_data: string[] = Object.keys(filters).reduce(function (
      res,
      key
    ) {
      return res.concat(filters[key]);
    },
    []);

    // Remove initial empty values
    const filterArray = filter_data.filter(function (entry: string) {
      return entry.trim() != '';
    });

    setFilterList(filterArray);
    console.log('filterList', filterList);
    console.log('filterArray', filterArray);

    // Check to see if value is unique if not update
    const is_same =
      filterArray.length == filterList.length &&
      filterArray.every(function (element, index) {
        return element === filterList[index];
      });

    if (!is_same) {
      console.log('BANG', savedValues);
      setSavedValues((prevState: any) => ({
        ...prevState,
        filters,
      }));
    }
    setSort(savedValues.sort);
    console.log('savedVALS', savedValues);
    console.log('filters', filters);

    console.log('xxx', Object.keys(savedValues.filters));
  }, [savedValues]);

  return (
    <div>
      <Formik
        initialValues={savedValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div>
                <FilterNewsMenu
                  open={open}
                  values={values}
                  setOpen={setOpen}
                  label="Filters"
                  setSavedValues={setSavedValues}
                  setFieldValue={setFieldValue}
                />
                {/* Filter Tabs list */}
                <div className="flex items-center py-3.5 relative overflow-x-scroll">
                  <div className="w-full flex">
                    <div className="ml-4 mr-2 flex items-center">
                      <button
                        type="button"
                        className="bg-white rounded-md focus:outline-none Zfocus:ring-indigo-500 focus:outline-none "
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
                          options={Filters.sortNews.list.map(filter => {
                            return filter.value;
                          })}
                          current={sort}
                          label={'Sort by'}
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
                                    className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1 w-max focus:outline-none"
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
