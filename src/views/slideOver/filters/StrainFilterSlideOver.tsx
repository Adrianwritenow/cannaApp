import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { AdjustmentsIcon } from '@heroicons/react/solid';
import DropdownFilter from '@/components/forms/fields/DropdownFilter';
import FilterStrainMenu from '@/components/filter/FIlterStrainMenu';
import { useRouter } from 'next/router';

export default function StrainFilterSlideOver(props: {
  handleFilter: Function;
}) {
  const { handleFilter } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState('Top Rated');
  const { type, category }: any = router.query;
  const [savedValues, setSavedValues]: any = useState({
    category: category || '',
    type: type || '',
    filters: {},
    sort: '',
    top_rated_effects: '',
  });
  const [sort, setSort] = useState(savedValues.sort);
  const [filterList, setFilterList]: any = useState([]);

  const initialValues: any = {
    filters: {},
    category: '',
    type: '',
    top_rated_effects: '',
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
      if (keyName === 'range') {
        stateCopy.filters[keyName] = [''];
      }
    }

    listCopy.splice(listCopy.indexOf(filter), 1);

    setFilterList(listCopy);
    setSavedValues(stateCopy);
    handleFilter(stateCopy.filters);
  }

  useEffect(() => {
    // Force values to array in order to check if they exist in case of multiple values
    const filters: any = {
      sort: [savedValues.sort],
      type: [savedValues.type],
      category: [savedValues.category],
      top_rated_effects: [savedValues.top_rated_effects],
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
      handleFilter(filters);
    }

    // update sort
    setSort(savedValues.sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedValues]);

  return (
    <div className="max-w-7xl mx-auto">
      <Formik
        initialValues={savedValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div>
                <FilterStrainMenu
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
                        className="bg-white rounded-md focus:outline-none "
                        onClick={() => setOpen(true)}
                      >
                        <span className="sr-only">Open filter</span>
                        <AdjustmentsIcon className="w-6 h-6 transform rotate-90" />
                      </button>
                    </div>
                    <div className="flex">
                      <div className="flex">
                        <DropdownFilter
                          setter={setRated}
                          options={['Top Rated', 'Lowest rated']}
                          current={rated}
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
                                    className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1 w-max"
                                  >
                                    <span className="capitalize">{filter}</span>
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
