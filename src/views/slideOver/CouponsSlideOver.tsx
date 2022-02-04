import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Coupon } from '@/interfaces/coupon';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { SlideOverProps } from '@/interfaces/props/SlideOverProps';

export default function CouponSlideOver(props: {
  label: string;
  list: Coupon[];
}) {
  const { label, list } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ProductResultsSection
        list={list}
        sponsored={false}
        label={label ? label : 'Results'}
        buttonLabel={'See more'}
        hideButton={true}
        stateFunction={setOpen}
        type={'COUPON'}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
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
                      <div className="flex items-center justify-start">
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
                        <Dialog.Title className="text-lg font-semibold text-gray-600">
                          {label}
                        </Dialog.Title>
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
