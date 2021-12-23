import { ArrowLeftIcon, StarIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import { Dispensary } from "../../interfaces/searchDispensary";
import { Listing } from "../../interfaces/listing";

interface ReviewSlideOverProps {
  myRating: number;
  setMyRating: Function;
  dispensary?: Dispensary;
}
export default function ReviewFormSlideOver(props: ReviewSlideOverProps) {
  const { myRating, setMyRating, dispensary } = props;
  const [open, setOpen] = useState(false);
  const rating = [
    "I don't know",
    "It was bad",
    "Could've been better",
    "It was ok",
    "It was good",
    "It was great!",
  ];
  return (
    <div>
      <div>
        <div className="flex items-center pt-4">
          <AvatarIcon className="w-8 h-8 mr-4" />
          <button className="flex items-center" onClick={() => setOpen(true)}>
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={"text-gray-200 flex-shrink-0 h-8 w-8"}
                aria-hidden="true"
              />
            ))}
          </button>
        </div>
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
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4">
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
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      <Dialog.Title className="text-2xl font-semibold text-gray-700 leading-4">
                        How was your visit at <br />
                        <br />
                        {dispensary?._source.name}
                      </Dialog.Title>
                      <div>
                        <div className="pt-4">
                          <p className="text-green-400 font-semibold py-3">
                            {rating[myRating]}
                          </p>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={`${
                                  myRating > rating
                                    ? "text-yellow-400"
                                    : "text-gray-200"
                                }
                                      flex-shrink-0 h-8 w-8`}
                                onClick={() => setMyRating(rating + 1)}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <Formik
                            initialValues={{ review: "" }}
                            onSubmit={() => {}}
                            enableReinitialize={true}
                          >
                            {({ values }) => {
                              return (
                                <Form className="flex flex-wrap">
                                  <label className="text-lg text-gray-700 font-semibold py-3.5">
                                    Write your review
                                  </label>
                                  <Field
                                    className="border-gray-200 rounded-md focus:outline-none w-full focus:ring-green-400 focus:border-green-400 p-2 h-48"
                                    placeholder="Express in words how you felt about your visit."
                                    component={"textarea"}
                                    name={"review"}
                                    id={"review"}
                                  />
                                  <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Next
                                  </button>
                                </Form>
                              );
                            }}
                          </Formik>
                        </div>
                      </div>
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
