import { ArrowLeftIcon, StarIcon } from '@heroicons/react/solid';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';

import AvatarIcon from '../../../../public/assets/icons/iconComponents/Avatar';
import { Dispensary } from '../../../interfaces/dispensary';
import RateCategorySlideOver from './RateCategorySlideOver';
import { Strain } from '@/interfaces/strain';

interface ReviewSlideOverProps {
  dispensary?: Dispensary;
  strain?: Strain;
  button?: Boolean;
}
export default function ReviewFormSlideOver(props: ReviewSlideOverProps) {
  const { dispensary, button } = props;
  const [myRating, setMyRating] = useState({
    general: 0,
    service: 0,
    value: 0,
    location: 0,
    accuracy: 0,
  });
  const [open, setOpen] = useState(false);
  const rating = [
    "I don't know",
    'It was bad',
    "Could've been better",
    'It was ok',
    'It was good',
    'It was great!',
  ];

  return (
    <div>
      <div>
        {!button ? (
          <div className="flex items-center pt-4">
            <AvatarIcon className="w-8 h-8 mr-4" />
            <button className="flex items-center" onClick={() => setOpen(true)}>
              {[0, 1, 2, 3, 4].map(rating => (
                <StarIcon
                  key={rating}
                  className={'text-gray-200 flex-shrink-0 h-8 w-8'}
                  aria-hidden="true"
                />
              ))}
            </button>
          </div>
        ) : (
          <button
            className="flex items-center bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-md"
            onClick={() => setOpen(true)}
          >
            <StarIcon className="w-6 h-6 p-1" />
            Write a Review
          </button>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

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
                    <div className="mt-6 relative flex-col h-auto  px-4 sm:px-6">
                      <Dialog.Title className="font-semibold text-gray-700 flex space-x-4">
                        <h2 className="text-2xl font-semibold text-gray-700">
                          How was your visit at {dispensary?._source.name} ?
                        </h2>
                      </Dialog.Title>
                      <div className="flex-col h-auto flex-grow">
                        <div className="pt-3 w-full">
                          <p className="text-green-400 font-semibold py-3">
                            {rating[myRating.general]}
                          </p>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  myRating.general > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                }
                                      flex-shrink-0 h-8 w-8`}
                                onClick={() =>
                                  setMyRating((prevState: any) => {
                                    return {
                                      ...prevState,
                                      general: rating + 1,
                                    };
                                  })
                                }
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Formik
                      initialValues={{
                        review: '',
                        recommended: undefined,
                        photos: [],
                        rating: {
                          general: 0,
                          service: 0,
                          value: 0,
                          location: 0,
                          accuracy: 0,
                        },
                      }}
                      onSubmit={() => {}}
                      enableReinitialize={true}
                    >
                      {({ values, setFieldValue }) => {
                        return (
                          <Form className="flex flex-wrap px-4 pt-6 pb-4 flex-grow">
                            <div className="pb-10 w-full">
                              <p className="text-lg text-gray-700 font-semibold py-3.5">
                                Write your review
                              </p>
                              <Field
                                className="border-gray-200 rounded-md focus:outline-none w-full focus:ring-green-400 focus:border-green-400 p-2 h-48"
                                placeholder="Express in words how you felt about your visit."
                                component={'textarea'}
                                name={'review'}
                                id={'review'}
                              />
                            </div>
                            <div className="w-full mt-auto">
                              <RateCategorySlideOver
                                values={values}
                                setFieldValue={setFieldValue}
                                setParent={setOpen}
                              />
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
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
