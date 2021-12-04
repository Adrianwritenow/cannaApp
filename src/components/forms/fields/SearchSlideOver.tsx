import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, Ref, useState } from "react";

interface Props {
  options: any;
  id: string;
  innerRef: Ref<any>;
  onChange: any;
  handleFocus?: Function;
  setFieldValue: Function;
  handleSearch: Function;
  searchHelper?: string;
  focus?: boolean;
  icon?: React.ComponentProps<any>;
  placeholder: string;
}

export const SearchSlideOver = (SearchFieldpProps: Props) => {
  const [open, setOpen] = useState(false);

  const {
    id,
    handleFocus,
    innerRef,
    setFieldValue,
    icon,
    focus,
    searchHelper,
    placeholder,
    handleSearch,
    ...rest
  } = SearchFieldpProps;

  const initialValues = {
    search: "",
  };

  return (
    <div>
      <div className="w-full relative">
        <button
          type="button"
          placeholder="search"
          className="w-full items-center border-solid border border-gray-400 indent-sm rounded-md focus:outline-none focus:ring-0 shadow-sm flex px-4 py-2 text-gray-500"
          onClick={() => {
            setOpen(true);
          }}
        >
          {icon}
          Search
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={() => setOpen(false)}
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
                  <div className="h-full flex flex-col py-3 bg-white shadow-xl overflow-y-scroll">
                    <div className="mt-6 relative flex-1">
                      <div className="absolute inset-0">
                        <div className="h-full" aria-hidden="true">
                          <Formik
                            initialValues={initialValues}
                            onSubmit={() => {}}
                            validateOnChange={false}
                            validateOnBlur={true}
                          >
                            {({
                              handleSubmit,
                              values,
                              resetForm,
                              handleChange,
                              setFieldValue,
                            }) => {
                              return (
                                <Form className="border-b">
                                  <div className="flex mx-4">
                                    <button
                                      type="button"
                                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-transparent"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="sr-only">Back</span>
                                      <ArrowLeftIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <Field
                                      type="text"
                                      id="search"
                                      name="search"
                                      className="w-full border-none px-4"
                                      placeholder="Search..."
                                    />
                                    <button
                                      type="button"
                                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-transparent"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
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
    </div>
  );
};
