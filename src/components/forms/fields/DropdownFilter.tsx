import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';
import { Dialog, Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

interface DropdownFilter {
  setter: Function;
  current: string;
  options: string[];
  label: string;
  preface?: string;
  id?: string;
  setFieldValue?: Function;
}

export default function DropdownFilter(data: DropdownFilter) {
  const { setter, current, options, label, preface, setFieldValue, id } = data;
  const [open, setOpen] = useState(false);

  useEffect(() => {}, [current]);
  return (
    <>
      <div className="">
        <button
          type="button"
          className="mx-1 flex rounded-full border-2 border-gray-200 items-center px-4 py-2 text-sm font-medium bg-white text-gray-900 whitespace-pre focus:outline-none relative"
          onClick={() => setOpen(true)}
        >
          <span className={'capitalize text-gray-600 text-sm'}>
            {preface && <span>{preface}&nbsp;</span>}
            {current ? current : label}
          </span>

          <ChevronDownIcon
            className={'h-5 w-5 transform text-gray-600'}
            aria-hidden="true"
          />
        </button>
        <div className="">
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-50 inset-0 overflow-y-auto"
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen text-center sm:p-0 ">
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

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-full ">
                    <div className="flex w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-gray-900"
                      >
                        {label}
                      </Dialog.Title>
                      <button
                        onClick={() => setOpen(false)}
                        className="ml-auto"
                      >
                        <XIcon className=" text-black h-6 w-6 " />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {options.map((option: string) => (
                        <button
                          className="w-full focus:outline-none"
                          onClick={() => {
                            setter(option);

                            if (setFieldValue) {
                              setFieldValue(id, option);
                            }
                          }}
                          key={`sort-method-${option}`}
                        >
                          <div className="flex items-center py-4">
                            <label
                              htmlFor={`sort-method-${option}`}
                              className="block text-sm font-normal text-gray-600 capitalize"
                            >
                              {option}
                            </label>
                            <input
                              id={`sort-method-${option}`}
                              name={`sort-method`}
                              type="radio"
                              readOnly
                              checked={current === option}
                              className="focus:ring-green h-4 w-4 text-green border-gray-300 ml-auto"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </>
  );
}
