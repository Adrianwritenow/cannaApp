import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";

import FaqSection from "../../components/sections/FaqSection";
import { listings } from "../../../src/helpers/mockData";
import { BusinessSlideoverProps } from "@/interfaces/props/businessSlideOverProps";

export default function FaqSlideOver(props: BusinessSlideoverProps) {
  const { dispensary } = props;
  const business = listings[0];

  const [open, setOpen] = useState(false);
  const initialValues = {
    search: "",
  };

  return (
    <section>
      <h2 className="sr-only">Question & Answer</h2>
      <h2
        id="business-faq"
        className="text-lg text-gray-700 font-semibold pt-3 pb-2"
      >
        Question & Answer
      </h2>
      {business?.faqs && <FaqSection faqs={business.faqs} />}
      <button
        onClick={() => setOpen(true)}
        className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
      >
        {`See all ${business?.faqs.length} Answers`}
      </button>
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
                <div className="w-screen max-w-md">
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
                          {business?.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {business?.faqs && <FaqSection faqs={business?.faqs} />}
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
