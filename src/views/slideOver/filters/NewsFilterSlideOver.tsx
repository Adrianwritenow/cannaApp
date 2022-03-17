import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { AdjustmentsIcon } from '@heroicons/react/solid';
import DropdownFilter from '../../../components/forms/fields/DropdownFilter';
import FilterNewsMenu from '@/components/filter/FilterNewsMenu';
import { Filters } from '@/helpers/filters';

export default function NewsFilterSlideOver(props: {
  removeFilter: Function;
  setFilters: Function;
  filters: { description: string[]; sort: string[] };
}) {
  const { removeFilter, setFilters, filters: filterProps }: any = props;
  const [open, setOpen] = useState(false);
  const [savedValues, setSavedValues]: any = useState({
    description: [],
    sort: [],
  });
  const [sort, setSort] = useState(savedValues.sort);

  useEffect(() => {
    setSavedValues({
      sort: filterProps.sort ? filterProps.sort : [''],
      description: filterProps.description ? filterProps.description : [''],
    });
  }, [filterProps]);

  function updateFilter(values: any) {
    const description = Array.isArray(values.description)
      ? values.description
      : [values.description];
    const sort = Array.isArray(values.sort) ? values.sort : [values.sort];

    const filters: any = {
      sort: sort,
      description: description,
    };
    setFilters(filters);
  }

  useEffect(() => {}, [savedValues]);

  return (
    <div className="max-w-7xl mx-auto">
      <Formik
        initialValues={savedValues}
        onSubmit={() => {}}
        enableReinitialize={true}
        validate={updateFilter}
        validateOnChange={true}
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
                          current={filterProps.sort[0]}
                          label={'Sort by'}
                        />
                      </div>
                      <div className="flex">
                        {/* Tab filters rendered */}
                        {Object.keys(filterProps).map((keyName: any, i) => {
                          return filterProps[keyName].map(
                            (filter: string, index: any) => {
                              if (
                                keyName !== 'sort' &&
                                filterProps[keyName][index]
                              ) {
                                return (
                                  <button
                                    type="button"
                                    key={`${keyName}_${index}`}
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
                                );
                              }
                            }
                          );
                        })}
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
