import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  SearchIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import React, { Fragment, Ref, useEffect, useState } from 'react';
import { combinedSearchQuery, receiveResults, searchQuery } from '../../../actions/search';
import { getLocationByIP, setLocation } from '../../../actions/location';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/reducers';
import SearchDispensaryCard from '../../search/SearchDispensaryCard';
import { SearchHits } from '../../../interfaces/searchHits';
import { LocationData } from '../../../interfaces/locationData';
import SearchProductCard from '../../search/SearchProductCard';
import SearchStrainCard from '../../search/SearchStrainCard';
import { useAxios } from '../../../hooks/useAxios';
import { useRouter } from 'next/router';

export default function SearchSlideOver(props: {
  searchRoute?: string;
  root?: boolean;
}) {
  const { root } = props;
  const [open, setOpen] = useState(false);
  const { results, query } = useSelector((root: RootState) => root.search);
  const location = useSelector((root: RootState) => root.location);
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchRoute } = props;

  const [initialValues, setInitialValues] = useState({ search: '' });

   async function handleSubmit(search: any) {
     const hits: SearchHits = await combinedSearchQuery(search);
     dispatch(receiveResults({ search: search, data: hits.hits.hits }));
   }
  function handleSearch(search: any) {
    handleSubmit(search);
  }

  // Get initial location data based on Client IP
  useEffect(() => {
    async function getLocation () {
      const data: LocationData = await getLocationByIP();
      dispatch(setLocation(data));
    }

    if (! Object.keys(location).length) {
      getLocation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [initialValues, results]);

  return (
    <div>
      <div className="w-full relative pb-4">
        <div className="flex flex-row border-solid border border-gray-400 text-gray-500 rounded-md focus:outline-none focus:ring-0 shadow-sm items-center justify-center">
          {router.pathname === '/map' ? (
            <button
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeftIcon className="w-5 h-5 ml-3" />
            </button>
          ) : !root ? (
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              <SearchIcon className="w-5 h-5 ml-3" />
            </button>
          ) : null}
          <button
            type="button"
            placeholder="search"
            className="w-full items-center rounded-md flex py-2 text-gray-500 bg-white"
            onClick={() => {
              setOpen(true);
            }}
          >
            {root ? (
              <div className="flex items-center">
                <SearchIcon className=" w-5 h-5 text-green-500 ml-3" />
                <div className="w-full pl-2 shrink-0">
                  <span className="font-bold">Find</span> dispensaries, strains,
                  flower ...
                </div>
              </div>
            ) : (
              <>
                <span className="pl-2">{query ? query : 'Search'}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
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
                        <div aria-hidden="true">
                          <div className="flex items-center">
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
                                  <div className="w-full">
                                    <Form
                                      className={
                                        'w-full flex items-center shadow-md px-4 '
                                      }
                                      onSubmit={handleSubmit}
                                    >
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
                                      <div className="grid grid-cols-7 gap-1 w-full">
                                        <div className={'col-span-7'}>
                                          <Field
                                            name={'search'}
                                            type={'text'}
                                            id={'search'}
                                            className="w-full border-none p-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                              handleChange(e);
                                              handleSearch(e.target.value);
                                            }}
                                            placeholder={'Search...'}
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
                                    {results.length ? (
                                      <ul className="px-4 ">
                                        {results.map(
                                          (result: any, index: number) => {
                                            switch (true) {
                                              case result._id.includes(
                                                'strain_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchStrainCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                              case result._id.includes(
                                                'product_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchProductCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                              case result._id.includes(
                                                'dispensary_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchDispensaryCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                            }
                                          }
                                        )}
                                      </ul>
                                    ) : (
                                      ''
                                    )}
                                    <div
                                      key={`generalSearch`}
                                      onClick={() => {
                                        router.push(
                                          searchRoute === '/map'
                                            ? searchRoute
                                            : '/search'
                                        );
                                        setOpen(false);
                                      }}
                                      className="text-gray-700 w-full flex px-4 py-3"
                                    >
                                      <div className="w-6 h-6 flex items-center justify-center">
                                        <SearchIcon className="w-4 h-4" />
                                      </div>
                                      <span className="ml-2">
                                        Search for{' '}
                                        {values.search
                                          ? `${values.search}`
                                          : query}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }}
                            </Formik>
                          </div>
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
