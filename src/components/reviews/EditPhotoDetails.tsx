import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { PencilIcon, XIcon } from '@heroicons/react/solid';

import { Field } from 'formik';
import Image from 'next/image';

interface ReviewPhoto {
  src: string;
  index: number;
}

export default function EditPhotoDetails(props: ReviewPhoto) {
  const [open, setOpen] = useState(false);

  const { src, index } = props;

  return (
    <div>
      <div
        className="w-full pb-full overflow-hidden relative"
        key={`preview-${index}`}
      >
        <Image src={src} alt="Profile Photo" layout="fill" objectFit="cover" />
        <button
          className="bg-gray-100 rounded-full w-max h-max absolute z-50 right-0 top-0 mt-2 mr-2 p-1 shadow-md"
          onClick={event => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          <label
            htmlFor="photos"
            className="relative text-sm text-white pointer-events-none"
          >
            <span className="sr-only">Edit Photo Details</span>
            <PencilIcon className="w-5 h-5 text-gray-700" />
          </label>
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <div className="w-screen">
                  <div className="h-full flex flex-col x bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 pt-6">
                      <div className="flex items-center justify-start border-b border-gray-200 pb-5">
                        <div className="flex items-center mr-9">
                          <button
                            type="button"
                            className="bg-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Edit Photo</span>
                            <XIcon className="text-gray-700 w-6 h-6" />
                          </button>
                        </div>
                        <span className="text-lg  text-gray-700">
                          Edit Photo
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-2.5 ">
                      <div
                        className="w-full h-64 rounded-md overflow-hidden relative "
                        key={`preview-${index}`}
                      >
                        <Image
                          src={src}
                          alt="Profile Photo"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="pb-10 w-full pt-6">
                        <p className="text-lg text-gray-700 font-semibold py-3.5">
                          Caption
                        </p>
                        <Field
                          className="border-gray-200 rounded-md focus:outline-none w-full focus:ring-green-400 focus:border-green-400 p-2 h-48"
                          placeholder="Express in words how you felt about your visit."
                          component={'textarea'}
                          name={'#'}
                          id={'#'}
                        />
                      </div>
                    </div>
                    <div className="px-4 mt-auto pb-6">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-full inline-flex items-center justify-center px-6 py-2 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Next
                      </button>
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
