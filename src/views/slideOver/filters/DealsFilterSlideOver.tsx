import { AdjustmentsIcon } from '@heroicons/react/solid';
import DropdownFilter from '@/components/forms/fields/DropdownFilter';
import { Form, Formik } from 'formik';
import FilterDealsMenu from '@/components/filter/FilterDealsMenu';
import { useState } from 'react';

export default function DealsFilterSlideOver(props: {
  categories: any;
  initialValues: any;
  filters: any;
  setFilters: Function;
}) {
  const { categories, initialValues, filters, setFilters } = props;
  const [open, setOpen] = useState(false);
  const [distance, setDistance] = useState(initialValues.distance);

  function removeFilter(keyName: string) {
    setFilters((prevState: any) => ({
      ...prevState,
      [keyName]: initialValues[keyName],
    }));
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div>
                <FilterDealsMenu
                  filters={filters}
                  categories={categories}
                  open={open}
                  values={values}
                  setOpen={setOpen}
                  label="Filters"
                  setSavedValues={setFilters}
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
                          setter={setDistance}
                          id={'distance'}
                          options={['5mi', '10mi', '50mi']}
                          current={distance}
                          label={'Distance'}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="flex">
                        {/* Tab filters rendered */}
                        {Object.keys(filters).map((keyName, i) => {
                          if (
                            filters[keyName] !== '' &&
                            keyName !== 'distance'
                          ) {
                            return (
                              <button
                                type="button"
                                key={`${keyName}`}
                                onClick={() => {
                                  removeFilter(keyName);
                                }}
                                className="flex rounded-full border-2 border-gray-200 items-center px-4 py-2   text-sm font-medium bg-white text-gray-900 mx-1 w-max"
                              >
                                <span>{filters[keyName]}</span>
                                <span className="sr-only">
                                  Remove filter for label
                                </span>
                              </button>
                            );
                          }
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
