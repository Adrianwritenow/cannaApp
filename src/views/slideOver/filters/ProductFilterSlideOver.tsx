import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdjustmentsIcon } from '@heroicons/react/solid';
import CouponSlideOver from '../CouponsSlideOver';
import DropdownFilter from '../../../components/forms/fields/DropdownFilter';
import FilterProductMenu from '@/components/filter/FilterProductMenu';
import { Filters } from '../../../helpers/filters';
import { RootState } from '@/reducers';
import { SearchHits } from '@/interfaces/searchHits';
import { receiveResults } from '@/actions/search';
import { useRouter } from 'next/router';

export default function ProductFilterSlideOver(props: {
  setFilters: Function;
}) {
  const { setFilters } = props;
  const router = useRouter();
  const { type, category } = router.query;

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('Relevance');
  const [savedValues, setSavedValues]: any = useState({
    category: category || '',
    filters: {},
    sort: sort,
  });
  const [sortPricing, setSortPricing] = useState(savedValues.sort);
  const [filterList, setFilterList]: any = useState([]);

  const initialValues: any = {
    filters: {},
    category: '',
    sort: sort,
  };

  useEffect(() => {
    // Force values to array in order to check if they exist in case of multiple values
    const filters: any = {
      sort: [savedValues.sort],
      category: [savedValues.category],
    };

    const filter_data: string[] = Object.keys(filters).reduce(
      function (res, key) {
        return res.concat(filters[key]).flat(1);
      },

      []
    );

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
      setFilters(filters);
    }

    // update sort
    setSortPricing(savedValues.sort);
  }, [savedValues]);

  // Remove filters from list to be rendered and update the form state values

  function removeFilter(keyName: string, filter: string) {
    let stateCopy = Object.assign({}, savedValues);
    let listCopy = filterList;
    const isArray =
      Object.prototype.toString.call(savedValues[keyName]).indexOf('Array') > 1;

    if (isArray) {
      stateCopy[keyName].splice(stateCopy[keyName].indexOf(filter), 1);
    } else {
      stateCopy[keyName] = initialValues[keyName];
      stateCopy.filters[keyName] = [''];
    }

    listCopy.splice(listCopy.indexOf(filter), 1);

    setFilterList(listCopy);
    setSavedValues(stateCopy);
    setFilters(stateCopy.filters);
  }

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
                <FilterProductMenu
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
                          setter={setSortPricing}
                          id={'sort'}
                          options={Filters.sort.list.map(filter => {
                            return filter.value;
                          })}
                          current={sortPricing}
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
