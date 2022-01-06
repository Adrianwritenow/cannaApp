import {
  ArrowLeftIcon,
  StarIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, SetStateAction, useState } from 'react';

import AddPhotots from '../AddPhotos';
import { Field } from 'formik';
import { RadioButton } from '@/components/forms/fields/RadioButton';
import moment from 'moment';

export default function RateCategorySlideOver(props: {
  values: {
    review: string;
    recommended: boolean | undefined;
    rating: {
      general: number;
      service: number;
      value: number;
      location: number;
      accuracy: number;
    };
    photos: File[];
  };
  setParent: Function;
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean | undefined): void;
  };
}) {
  const [open, setOpen] = useState(false);
  const { values, setParent, setFieldValue } = props;
  const now = moment();

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full inline-flex items-center justify-center px-6 py-2 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Next
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0  max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col x bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 pt-6">
                      <div className="flex items-center justify-start border-b border-gray-200 pb-5">
                        <div className="flex items-center mr-9">
                          <button
                            type="button"
                            className="bg-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Back</span>
                            <ArrowLeftIcon className="text-gray-700 w-6 h-6" />
                          </button>
                        </div>
                        <span className="text-lg  text-gray-700">Back</span>
                      </div>
                    </div>
                    <section className="px-4 pt-6 flex-1 flex-grow">
                      <h2 className="text-2xl font-semibold text-gray-700">
                        Now, rate your experience in these categories
                      </h2>

                      <div className="grid grid-flow-row auto-rows-max gap-6 pt-6">
                        <div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-700">
                              Service
                            </h3>
                            <p className="text-sm text-gray-500">
                              How helpful were the staff and employees?
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  values.rating.service > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } flex-shrink-0 h-10 w-10 p-1`}
                                onClick={() =>
                                  setFieldValue('rating.service', rating + 1)
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-700">
                              Value
                            </h3>
                            <p className="text-sm text-gray-500">
                              Was the product or service worth it’s price?
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  values.rating.value > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } flex-shrink-0 h-10 w-10 p-1`}
                                onClick={() =>
                                  setFieldValue('rating.value', rating + 1)
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-700">
                              Location
                            </h3>
                            <p className="text-sm text-gray-500">
                              How appealing is surrounding the area?
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  values.rating.location > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } flex-shrink-0 h-10 w-10 p-1`}
                                onClick={() =>
                                  setFieldValue('rating.location', rating + 1)
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-700">
                              Accuracy
                            </h3>
                            <p className="text-sm text-gray-500">
                              Is this place exactly as described?
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  values.rating.accuracy > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                } flex-shrink-0 h-10 w-10 p-1`}
                                onClick={() =>
                                  setFieldValue('rating.accuracy', rating + 1)
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="px-4">
                      <div className="w-full flex-1 flex-grow">
                        <p className="text-gray-700 font-semibold py-4">
                          Would you recommend this place?
                        </p>
                        <div className="grid grid-cols-2 gap-6 w-full">
                          <Field
                            name="recommended"
                            component={RadioButton}
                            setFieldValue={setFieldValue}
                            icon={<ThumbUpIcon className="w-5 h-5 p-1" />}
                            label="Yes"
                            value={true}
                            currentValue={values.recommended}
                          />

                          <Field
                            name="recommended"
                            component={RadioButton}
                            setFieldValue={setFieldValue}
                            icon={<ThumbDownIcon className="w-5 h-5 p-1" />}
                            label="No"
                            currentValue={values.recommended}
                            value={false}
                          />
                        </div>
                      </div>
                    </section>

                    <div className="px-4 pb-4">
                      <AddPhotots
                        values={values}
                        setFieldValue={setFieldValue}
                        setParent={setParent}
                      />
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
