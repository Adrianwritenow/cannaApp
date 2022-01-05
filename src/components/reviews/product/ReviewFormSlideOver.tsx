import {
  ArrowLeftIcon,
  StarIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';

import AvatarIcon from '../../../../public/assets/icons/iconComponents/Avatar';
import { Dispensary } from '../../../interfaces/searchDispensary';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import { Product } from '@/interfaces/searchProduct';
import { RadioButton } from '@/components/forms/fields/RadioButton';
import { Strain } from '@/interfaces/strain';
import SubmitReview from './SubmitReview';

interface ReviewSlideOverProps {
  myRating: number;
  setMyRating: Function;
  dispensary?: Dispensary;
  product?: Product;
  strain?: Strain;
  button?: Boolean;
}
export default function ReviewFormSlideOver(props: ReviewSlideOverProps) {
  const { myRating, setMyRating, product, button } = props;
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
                      <Dialog.Title className="font-semibold text-gray-700 flex space-x-4 border-dashed border-b pb-4">
                        <div className="relative w-24 h-full rounded-lg overflow-hidden ">
                          <ImageWithFallback
                            src={product?._source.field_image}
                            alt={product?._source.name_1}
                            layout="fill"
                            objectFit={'cover'}
                          />
                        </div>
                        <span>{product?._source.name_1}</span>
                      </Dialog.Title>
                      <div className="flex-col h-auto flex-grow">
                        <div className="pt-3 w-full">
                          <p className="text-green-400 font-semibold py-3">
                            {rating[myRating]}
                          </p>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map(rating => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  myRating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                }
                                      flex-shrink-0 h-8 w-8`}
                                onClick={() => setMyRating(rating + 1)}
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
                      }}
                      onSubmit={() => {}}
                      enableReinitialize={true}
                    >
                      {({ values, setFieldValue }) => {
                        console.log(values);
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
                            <div className="w-full flex-1 flex-grow">
                              <p className="text-gray-700 font-semibold py-4">
                                Would you recommend this product?
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
                                  icon={
                                    <ThumbDownIcon className="w-5 h-5 p-1" />
                                  }
                                  label="No"
                                  currentValue={values.recommended}
                                  value={false}
                                />
                              </div>
                            </div>

                            <SubmitReview values={values} setParent={setOpen} />
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
