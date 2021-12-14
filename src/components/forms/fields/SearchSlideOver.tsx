import { ArrowLeftIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, Ref, useEffect, useState } from "react";

import SearchDispensaryCard from "../../search/SearchDispensaryCard";
import { SearchHits } from "../../../interfaces/searchHits";
import SearchProductCard from "../../search/SearchProductCard";
import SearchStrainCard from "../../search/SearchStrainCard";
import { searchQuery } from "../../../actions/search";
import { useAxios } from "../../../hooks/useAxios";

export default function SearchSlideOver() {
  const [open, setOpen] = useState(false);
  const [dispatchAxios, { loading }] = useAxios();
  const [results, setResults]: any = useState([]);
  const [initialValues, setInitialValues] = useState({ search: "" });

  async function handleSubmit(search: any) {
    const hits: SearchHits = await searchQuery(search);
    setResults(hits.hits.hits);
    console.log(results);
  }
  function handleSearch(search: any) {
    handleSubmit(search);
  }

  useEffect(() => {}, [initialValues, results]);

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
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="">
                      <div className="inset-0">
                        <div className="shadow-md" aria-hidden="true">
                          <div className="flex mx-4 items-center">
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
                              enableReinitialize
                              onSubmit={() => {}}
                              validateOnChange={false}
                              validateOnBlur={true}
                            >
                              {({
                                handleSubmit,
                                values,
                                setFieldValue,
                                handleChange,
                                submitForm,
                                resetForm,
                              }) => {
                                return (
                                  <Form
                                    className={"w-full flex items-center"}
                                    onSubmit={handleSubmit}
                                  >
                                    <div className="grid grid-cols-7 gap-1 w-full">
                                      <div className={"col-span-7"}>
                                        <Field
                                          name={"search"}
                                          type={"text"}
                                          id={"search"}
                                          className="w-full border-none p-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            handleChange(e);
                                            handleSearch(e.target.value);
                                          }}
                                          placeholder="Search..."
                                        />
                                        {/* <Field
                                          name={"location"}
                                          type={"text"}
                                          id={"location"}
                                          className="w-full border-none px-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                          onChange={() => {}}
                                          value={values.location}
                                          placeholder="Location..."
                                        /> */}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-transparent"
                                      onClick={() => {
                                        resetForm;
                                        setOpen(false);
                                      }}
                                    >
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
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
                          </div>
                        </div>
                      </div>
                    </div>
                    {results.length ? (
                      <ul className="px-4 ">
                        {results.map((result: any, index: number) => {
                          switch (true) {
                            case result._id.includes("strain_entity"):
                              return (
                                <li key={`result-${index}`}>
                                  <SearchStrainCard data={result} />
                                </li>
                              );
                            case result._id.includes("product_entity"):
                              return (
                                <li key={`result-${index}`}>
                                  <SearchProductCard data={result} />
                                </li>
                              );
                            case result._id.includes("dispensary_entity"):
                              return (
                                <li key={`result-${index}`}>
                                  <SearchDispensaryCard data={result} />
                                </li>
                              );
                          }
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
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
