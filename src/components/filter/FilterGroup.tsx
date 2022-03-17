import { ChevronRightIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react';
import { Field } from 'formik';
import { Filters } from '@/interfaces/filter';

export default function FilterGroup(data: Filters) {
  const { filters, label, id, type, values, setFieldValue } = data;

  return (
    <Disclosure>
      {({ open }) => (
        <div className="w-full max-w-md">
          <div className="flex flex-col">
            <div>
              <Disclosure.Button className="w-full flex justify-start focus:outline-none  ">
                <div
                  className={`w-full ${
                    open ? 'border-b border-gray-200' : ''
                  } flex items-center`}
                >
                  <ChevronRightIcon
                    className={`w-6 h-6 text-gray-500 transition-transform duration-75 ease-in-out ${
                      open ? 'transform rotate-90' : ''
                    }`}
                  />
                  <h3 className="text-sm font-semibold text-gray-700 text-left py-2 pl-4">
                    {label}
                  </h3>
                </div>
              </Disclosure.Button>
            </div>
            {/* Body content */}
            <Disclosure.Panel className="text-gray-500">
              <div className="h-full py-5">
                <div
                  className="h-full inset-0 flex flex-wrap content-between"
                  aria-hidden="true"
                >
                  <div
                    role="group"
                    className="grid grid-flow-row auto-rows-max gap-4 w-full"
                  >
                    {filters.map((filter, index) => {
                      return (
                        <Disclosure key={`${filter}-${index}`}>
                          {({ open }) => (
                            <div className="w-full">
                              <div className="flex items-center">
                                {type ? (
                                  <label
                                    className=" text-sm text-gray-900 w-full flex items-center"
                                    onClick={() => {
                                      if (setFieldValue) {
                                        setFieldValue(id, filter.value);
                                      }
                                    }}
                                  >
                                    <Disclosure.Button
                                      className="flex items-center w-full focus:outline-none  "
                                      id={id}
                                    >
                                      <Field
                                        id={`${id}_${index}`}
                                        name={id}
                                        value={`[${filter.value}]`}
                                        checked={values?.includes(filter.value)}
                                        type={type}
                                        className={
                                          'focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full'
                                        }
                                      />
                                      <span className="ml-2 capitalize">
                                        {filter.value}
                                      </span>
                                    </Disclosure.Button>
                                  </label>
                                ) : (
                                  <Disclosure.Button
                                    className="flex items-center w-full focus:outline-none  "
                                    id={id}
                                  >
                                    <label className=" text-sm text-gray-900 w-full flex items-center">
                                      <Field
                                        id={`${id}_${index}`}
                                        name={id}
                                        value={`${filter.value}`}
                                        checked={values?.includes(filter.value)}
                                        type={'checkbox'}
                                        className={
                                          'focus:ring-green h-4 w-4 text-green border-gray-300 rounded-md'
                                        }
                                      />
                                      <span className="ml-2">
                                        {filter.value}
                                      </span>
                                    </label>
                                  </Disclosure.Button>
                                )}
                              </div>

                              {filter.subList && (
                                <Disclosure.Panel className="grid grid-flow-row auto-rows-max gap-4 w-full pt-4">
                                  {filter.subList.map((subFilter, index) => (
                                    <Disclosure key={`${id}_sub_${index}`}>
                                      {({ open: sub_open }) => (
                                        <div className="w-full">
                                          <div className="flex items-center ml-4 ">
                                            <label
                                              className=" text-sm text-gray-900 w-full flex items-center"
                                              onClick={() => {
                                                if (setFieldValue) {
                                                  setFieldValue(
                                                    id,
                                                    subFilter.value
                                                  );
                                                }
                                              }}
                                            >
                                              <Disclosure.Button className="flex justify-start focus:outline-none w-full ">
                                                <Field
                                                  id={`${id}_sub_${index}`}
                                                  name={id}
                                                  checked={values?.includes(
                                                    subFilter.value
                                                  )}
                                                  value={`${subFilter.value}`}
                                                  type={
                                                    type ? type : 'checkbox'
                                                  }
                                                  className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full"
                                                />
                                                <span className="ml-2">
                                                  {subFilter.value}
                                                </span>
                                              </Disclosure.Button>
                                            </label>
                                          </div>
                                          {subFilter.list && (
                                            <Disclosure.Panel className="grid grid-flow-row auto-rows-max gap-4 w-full pt-4">
                                              {subFilter.list.map(
                                                (tertiaryFilter, index) => (
                                                  <div
                                                    key={`${id}_tert_${index}`}
                                                  >
                                                    <div className="flex items-center ml-8">
                                                      <button className="flex justify-start focus:outline-none w-full flex">
                                                        <label className=" text-sm text-gray-900">
                                                          <Field
                                                            id={`${id}_tert_${index}`}
                                                            name={id}
                                                            value={`${tertiaryFilter.value}`}
                                                            checked={values?.includes(
                                                              tertiaryFilter.value
                                                            )}
                                                            type={
                                                              type
                                                                ? type
                                                                : 'checkbox'
                                                            }
                                                            className="focus:ring-green h-4 w-4 text-green border-gray-300 rounded-full"
                                                          />
                                                          <span className="ml-2">
                                                            {
                                                              tertiaryFilter.value
                                                            }
                                                          </span>
                                                        </label>
                                                      </button>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </Disclosure.Panel>
                                          )}
                                        </div>
                                      )}
                                    </Disclosure>
                                  ))}
                                </Disclosure.Panel>
                              )}
                            </div>
                          )}
                        </Disclosure>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>

            {/* /End replace */}
          </div>
        </div>
      )}
    </Disclosure>
  );
}
