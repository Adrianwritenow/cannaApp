import { Dialog, Transition } from '@headlessui/react';
import React, { FormEvent, Fragment, useEffect, useState } from 'react';

import FilterGroup from './FilterGroup';
import FilterGroupPrice from './FilterGroupPrice';
import { Filters } from '../../helpers/filters';
import StrainsIcon from '../../../public/assets/icons/iconComponents/Strains';
import { XIcon } from '@heroicons/react/solid';

interface FilterMenuProps {
  open: boolean;
  values: any;
  setOpen: Function;
  setSavedValues: Function;
  icon?: boolean;
  label?: string;
  setFieldValue: Function;
}

export default function FilterStrainMenu(props: FilterMenuProps) {
  const { open, values, setOpen, icon, label, setSavedValues, setFieldValue } =
    props;

  // Add filters to list to be rendered and update the form state values
  useEffect(() => {
    setSavedValues(values);
  }, [values, setSavedValues]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={() => setOpen(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 max-w-full flex desktop:max-w-2xl">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full desktop:translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full desktop:translate-x-full"
            >
              <div className="w-screen z-50">
                <div className="h-full flex flex-col pt-6 bg-gray-50 overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <div className="flex">
                        {icon && <StrainsIcon className="w-7 h-7 mr-2" />}
                        <h2 className="text-xl font-bold text-gray-900">
                          {label ? label : 'Filter'}
                        </h2>
                      </div>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-gray-50 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close filter</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1">
                    {/* Body content */}
                    <div className="relative w-full h-full inset-0 flex flex-wrap content-between bg-gray-50">
                      <div className="grid w-full grid-flow-row auto-rows-max  px-4 pb-2 pt-12">
                        {/* // Field sets based on type of filter  if multiple nested filters then pass setFieldValue*/}
                        {/* Pass the filters ket of values to set Checked */}
                        <FilterGroup
                          filters={Filters.sortStrain.list}
                          label={'Sort By'}
                          id={'sort'}
                          type="radio"
                          values={values.filters.sort}
                          setFieldValue={setFieldValue}
                        />
                        <FilterGroup
                          filters={Filters.strains.list}
                          label={'Strain Type'}
                          id={'type'}
                          type="radio"
                          values={values.filters.type}
                          setFieldValue={setFieldValue}
                        />

                        <FilterGroup
                          filters={Filters.feelings.list}
                          label={'Feelings'}
                          id={'top_rated_effects'}
                          type="radio"
                          values={values.filters.top_rated_effects}
                          setFieldValue={setFieldValue}
                        />
                        <FilterGroup
                          filters={Filters.flavors.list}
                          label={'Flavors'}
                          id={'category'}
                          type="radio"
                          values={values.filters.category}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>
                    {/* /End Body */}
                  </div>
                </div>
              </div>
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
