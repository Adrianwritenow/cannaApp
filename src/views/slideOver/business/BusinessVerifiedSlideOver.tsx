import { BadgeCheckIcon, XIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import { BusinessSlideoverProps } from '@/interfaces/props/businessSlideOverProps';

export default function BusinessVerificationSlideOver(
  props: BusinessSlideoverProps
) {
  const { dispensary } = props;
  const [open, setOpen] = useState(false);
  return (
    <section className="max-w-7xl desktop:rounded-md desktop:bg-gray-50 mx-auto desktop:p-4 desktop:rounded-md relative">
      <div className="desktop:flex">
        <div className="hidden desktop:flex my-auto">
          <BadgeCheckIcon className="text-green w-full w-20 h-20" />
        </div>
        <div>
          <h2 id="business-verified" className="sr-only">
            Verified License
          </h2>
          <h2
            id="business-verified"
            className="text-lg text-gray-700 font-semibold py-2 desktop:text-2xl"
          >
            Verified License
          </h2>
          <div className="w-full grid grid-cols-5">
            <div className="col-span-4 desktop:col-span-5">
              <p>
                CannaPages has verified this business possesses a valid trade
                license.
              </p>
            </div>
            <div className="col-span-1 desktop:hidden">
              <BadgeCheckIcon className="text-green w-full" />
            </div>
          </div>
        </div>
        <div className="ml-auto hidden desktop:flex items-center">
          <button
            className="  p-4  rounded-md bg-green-100 w-max  text-green-600 text-sm font-semibold border-gray-200"
            onClick={() => setOpen(true)}
          >
            <span>See license information</span>
          </button>
        </div>
      </div>
      <div className="pt-5 desktop:hidden">
        <button
          onClick={() => setOpen(true)}
          className="py-4 w-full uppercase text-green text-xs font-semibold border-t border-gray-200 tracking-widest"
        >
          See license information
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 max-w-full flex  desktop:max-w-2xl ">
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
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          License Information
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none "
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full" aria-hidden="true">
                          {dispensary?._source.licenses ? (
                            <div>
                              {dispensary?._source.licenses.map(
                                (license: any, index) => {
                                  const value = license.split(':');

                                  return (
                                    <div
                                      className="py-4"
                                      key={`license-${index}`}
                                    >
                                      <ul className="list-none">
                                        <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                                          <p className="text-gray-700">
                                            License
                                          </p>
                                          <p>{value[1]}</p>
                                        </li>
                                        {/* Need Issuer info */}
                                        {/* <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                                          <p className="text-gray-700">
                                            Issued by
                                          </p>
                                          <p>{value[0]}</p>
                                        </li> */}
                                        <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                                          <p className="text-gray-700">Trade</p>
                                          <p>
                                            {dispensary._source.license_type
                                              ? dispensary._source
                                                  .license_type[0]
                                              : value[0]}
                                          </p>
                                        </li>
                                        {/* <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">
                                Verified by CannaPages
                              </p>
                              <time dateTime="2022-01-01">1/1/2022</time>
                            </li>
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">Expires</p>
                              <time dateTime="2022-01-01">1/1/2022</time>
                            </li> */}
                                      </ul>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                          <p className="pt-8">
                            When you pick a business on CannaPages, we want you
                            to be confident in your decision. That is why we
                            give businesses the opportunity to participate in
                            our trade license verification process. CannaPages
                            confirmed the business's trade license as of the
                            verification date listed above. <br />
                            <br />
                            Businesses pay CannaPages for license verification.
                          </p>
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-full text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green mt-5"
                          >
                            Okay, got it!
                          </button>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}
