import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/solid';
import PhotoOverview from './PhotoOverview';
import SubmitReview from './SubmitReview';

export default function AddPhotots(props: {
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean | undefined): void;
  };
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
}) {
  const [open, setOpen] = useState(false);
  const { values, setFieldValue, setParent } = props;

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
                    <section className="px-4 mt-6 flex-grow">
                      <h2 className="text-2xl font-semibold text-gray-700">
                        Add photos of your experience
                      </h2>
                      <p className="text-sm py-2">
                        Your photos help visitors imagine what it's like to
                        visit this place.
                      </p>
                      <PhotoOverview
                        values={values}
                        setFieldValue={setFieldValue}
                        setParent={setParent}
                      />
                    </section>

                    <div className="px-4 pb-4 w-full flex">
                      <SubmitReview
                        values={{
                          review: values.review,
                          recommended: values.recommended,
                          photos: values.photos,
                        }}
                        setParent={setParent}
                        skip={true}
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
