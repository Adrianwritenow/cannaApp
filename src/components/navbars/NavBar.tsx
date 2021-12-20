import * as Yup from 'yup';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import AvatarMenu from '@/components/menus/AvatarMenu';
import { Disclosure } from '@headlessui/react';
import FilterMenu from '@/components/filter/FilterMenu';
import { HeaderRoutes } from '@/helpers/routes';
import Image from 'next/image';
import Link from 'next/link';
import { LocationMarkerIcon as LocationMarkerIconOutline } from '@heroicons/react/outline';
import { LocationMarkerIcon as LocationMarkerIconSolid } from '@heroicons/react/solid';
import Logo from '@/public/assets/logos/logo-text.png';
import { SearchField } from '@/components/forms/fields/SearchField';
import { SearchIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function NavBar() {
  const [focus, setFocus] = useState({ location: false, search: false });
  const [view, setView] = useState('list');
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchData, setSearchData] = useState([
    {
      value: 'Sour Diesel',
      type: 'strain',
      category: 'Strain',
    },
    {
      value: 'Sour O.G.',
      type: 'strain',
      category: 'Strain',
    },
    {
      value: 'Sour Tangie',
      type: 'strain',
      category: 'Strain',
    },
    {
      value: 'Sour Jack',
      type: 'strain',
      category: 'Strain',
    },
    {
      value: 'Sour',
      type: 'flavor',
      category: 'Strain',
    },
    {
      value: 'Sour Jack’s Ganja Shack',
      type: 'dispensary',
      category: 'Shops',
    },
  ]);

  const [locationData, setSearchLocationData] = useState([
    {
      value: 'Colorado Springs',
      area: 'CO',
    },
    {
      value: 'Colorado',
    },
    {
      value: 'Colorado River',
    },
    {
      value: 'Colorado State University',
      area: 'Fort Collins, CO',
    },
  ]);

  const schema = Yup.object().shape({
    search: Yup.object(),
    location: Yup.object(),
  });

  const initialValues = {
    search: '',
    location: '',
  };

  // Ref to toggle focus
  const otherRef = React.createRef<FieldAttributes<any>>();

  // Trigger Focus state for layout changes
  function handleFocus(id: string, value: boolean) {
    const focusUpdate: any = { ...focus };
    Object.keys(focusUpdate).forEach((id: string) => (focusUpdate[id] = false));
    focusUpdate[id] = value;
    setFocus(focusUpdate);
  }

  // Trigger Focus state for layout changes for location pin interaction
  function focusOnLocation() {
    otherRef.current.focus();
    handleFocus('location', true);
  }

  useEffect(() => {
    // After data is collected add a initial value for location
    const locationOptions = [...locationData];

    if (locationOptions[0].value != 'use my current location') {
      locationOptions.unshift({
        value: 'use my current location',
        area: '',
      });

      setSearchLocationData(locationOptions);
    }
  }, [focus, locationData, session]);

  function handleSubmit(values: any) {}

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center flex-wrap justify-between">
            <Formik
              validationSchema={schema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
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
                const toggleForm =
                  focus.location ||
                  focus.search ||
                  values.location ||
                  values.search;

                const hasValue = values.location || values.search;

                return (
                  <>
                    <div>
                      <div className="bg-white p-2">
                        <div className="grid grid-cols-11 px-2 relative">
                          <div className="col-span-4 flex items-center">
                            <Link href={'/'}>
                              <a className="flex items-center relative  h-6 w-auto">
                                <Image
                                  layout="intrinsic"
                                  src={Logo}
                                  alt="CannaPages"
                                />
                              </a>
                            </Link>

                            <div className="hidden lg:block lg:ml-6">
                              <div className="flex space-x-4 text-sm">
                                {Object.entries(HeaderRoutes).map(
                                  ([key, value], index) => {
                                    const href = value.href;
                                    return (
                                      <Link href={href} as={href} key={index}>
                                        <a className="text-gray-400 hover:text-green-500">
                                          {value.label}
                                        </a>
                                      </Link>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-start-10 col-span-2 flex justify-end align-center  ">
                            {!hasValue ? (
                              session?.accessToken || status === 'loading' ? (
                                <AvatarMenu />
                              ) : (
                                <Link href={'/login'}>
                                  <a>
                                    <button className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
                                      Log in
                                    </button>
                                  </a>
                                </Link>
                              )
                            ) : (
                              <button
                                className="h-6 w-6"
                                onClick={event => {
                                  resetForm();
                                }}
                              >
                                <XIcon className=" text-gray-500 h-6 w-6" />
                              </button>
                            )}
                          </div>
                        </div>
                        {!router.pathname.startsWith('/user') ? (
                          <Form className={'w-full'} onSubmit={handleSubmit}>
                            <div className="grid grid-cols-7 gap-1 pt-2">
                              <div
                                className={`${
                                  !toggleForm ? 'col-span-5' : 'col-span-7 '
                                }`}
                              >
                                <Field
                                  name={'search'}
                                  component={SearchField}
                                  options={searchData}
                                  id={'search'}
                                  handleFocus={handleFocus}
                                  onChange={handleChange}
                                  setFieldValue={setFieldValue}
                                  value={values.search}
                                  focus={focus.search}
                                  placeholder="dispensaries, strains..."
                                  icon={
                                    <SearchIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  }
                                  searchHelper="Find"
                                />
                              </div>
                              <div
                                className={`${
                                  !toggleForm ? 'flex' : 'hidden'
                                } items-center col-span-2 justify-center`}
                                onClick={() => {
                                  handleFocus('location', true);
                                  focusOnLocation();
                                }}
                              >
                                <LocationMarkerIconSolid className="text-green h-4 w-4" />
                                <span className="text-sm pl-1 font-semibold	 text-green">
                                  Denver, CO
                                </span>
                              </div>
                            </div>
                            <div
                              // innerRef={otherRef}
                              className={`pt-2 w-full ${
                                focus.location || hasValue ? 'flex' : 'hidden'
                              }`}
                            >
                              <Field
                                innerRef={otherRef}
                                name={'location'}
                                component={SearchField}
                                options={locationData}
                                id={'location'}
                                handleFocus={handleFocus}
                                onChange={handleChange}
                                setFieldValue={setFieldValue}
                                icon={
                                  <LocationMarkerIconOutline
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                }
                                searchHelper="Near"
                                focus={focus.location}
                                value={values.location}
                                placeholder="City, Street..."
                              />
                            </div>
                            <button
                              type="submit"
                              className={`${
                                toggleForm ? 'flex' : 'hidden'
                              } mt-2 w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green`}
                            >
                              Search
                            </button>
                          </Form>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </>
                );
              }}
            </Formik>
          </div>

          <Disclosure.Panel className="lg:hidden ">
            <div className="pt-2 pb-3 space-y-1">
              {Object.entries(HeaderRoutes).map(([key, value], index) => {
                const href = value.href;
                return (
                  <Link href={href} as={href} key={index}>
                    <a className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:text-green-500">
                      {value.label}
                    </a>
                  </Link>
                );
              })}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
