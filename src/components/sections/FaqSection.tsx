import { ArrowLeftIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';

import AvatarIcon from '../../../public/assets/icons/iconComponents/Avatar';
import { Faq } from '../../interfaces/faq';

interface FaqProps {
  faqs: Array<Faq>;
}
export default function FaqSection(props: FaqProps) {
  const { faqs } = props;
  const [open, setOpen] = useState(false);
  const initialValues = {
    question: '',
  };
  return (
    <div>
      <button
        className="w-full border border-gray-200 p-2 rounded-md flex items-center text-gray-500 my-4"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-5 h-5 mr-2" />
        <span>Ask a question</span>
      </button>

      <dl className="space-y-6 pb-4">
        {faqs.map(faq => (
          <div key={faq.id} className="text-sm text-gray-700">
            <dt className="font-semibold ">Q: {faq.question}</dt>
            <dd className="mt-1">
              <span className="font-semibold">A:</span> {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
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
                <div className="w-screen">
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
                        <Dialog.Title className="text-lg text-gray-900">
                          Ask a question
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      <Formik
                        initialValues={initialValues}
                        onSubmit={() => {}}
                        enableReinitialize={true}
                      >
                        {({ values, setFieldValue }) => {
                          return (
                            <Form className="flex flex-wrap">
                              <div className="flex flex-wrap py-6">
                                <AvatarIcon className="w-8 h-8 mr-4" />
                                <div>
                                  <h4 className="font-semibold text-gray-700 text-sm">
                                    Jon Doe
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    Posting Publicly
                                  </p>
                                </div>
                              </div>
                              <Field
                                className="border-gray-200 rounded-md focus:outline-none w-full focus:ring-green-400 focus:border-green-400 p-2 h-48"
                                placeholder="Ask a question or get advice from the owner and broader community"
                                component={'textarea'}
                                name={'review'}
                                id={'review'}
                              />
                              <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Post Question
                              </button>
                            </Form>
                          );
                        }}
                      </Formik>
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
