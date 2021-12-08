import { ArrowLeftIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, Ref, useState } from "react";

import schema from "yup/lib/schema";
import { searchQuery } from "../../../actions/search";
import { useAxios } from "../../../hooks/useAxios";

export default function SearchSlideOver() {
  const [open, setOpen] = useState(false);
  const [dispatchAxios, { loading }] = useAxios();

  const initialValues = {
    search: "",
    location: "",
  };

  const [searchData, setSearchData] = useState([
    {
      value: "Sour Diesel",
      type: "strain",
      category: "Strain",
    },
    {
      value: "Sour O.G.",
      type: "strain",
      category: "Strain",
    },
    {
      value: "Sour Tangie",
      type: "strain",
      category: "Strain",
    },
    {
      value: "Sour Jack",
      type: "strain",
      category: "Strain",
    },
    {
      value: "Sour",
      type: "flavor",
      category: "Strain",
    },
    {
      value: "Sour Jack’s Ganja Shack",
      type: "dispensary",
      category: "Shops",
    },
  ]);

  function handleSubmit(values: any) {
    dispatchAxios(searchQuery(values));
  }
  function handleChange(values: any) {
    const isEmpty = Object.values(values).every((x) => x === null || x === "");

    if (!isEmpty && !loading) {
      console.log("BBO");
      handleSubmit(values);
    }
  }

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
          <SearchIcon className="w-5 h-5" />
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
                            <Formik
                              initialValues={initialValues}
                              onSubmit={handleSubmit}
                              validateOnChange={false}
                              validateOnBlur={true}
                            >
                              {({
                                handleSubmit,
                                values,
                                setFieldValue,
                                submitForm,
                              }) => {
                                return (
                                  <Form
                                    className={"w-full"}
                                    onSubmit={handleSubmit}
                                  >
                                    <div className="grid grid-cols-7 gap-1 pt-2">
                                      <div className={"col-span-7"}>
                                        <Field
                                          name={"search"}
                                          type={"text"}
                                          id={"search"}
                                          className="w-full border-none px-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                          onChange={() => handleChange(values)}
                                          value={values.search}
                                          placeholder="Search..."
                                        />
                                        <Field
                                          name={"location"}
                                          type={"text"}
                                          id={"location"}
                                          className="w-full border-none px-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                          onChange={() => {}}
                                          value={values.location}
                                          placeholder="Location..."
                                        />
                                      </div>
                                    </div>
                                  </Form>
                                );
                              }}
                            </Formik>

                            {/* <input
                              type="text"
                              className="w-full border-none px-4 focus:border-0 focus:outline-none focus:ring-transparent"
                              placeholder={placeholder}
                              {...field}
                            /> */}
                            <button
                              type="button"
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-transparent"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
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
}
