import * as Yup from "yup";

import { Field, FieldAttributes, Form, Formik } from "formik";
import {
  LocationMarkerIcon as LocationMarkerIconSolid,
  MenuIcon,
} from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../authentication/authContext";
import AvatarMenu from "../menus/AvatarMenu";
import { Disclosure } from "@headlessui/react";
import FilterMenu from "../filter/FilterMenu";
import { HeaderRoutes } from "../../helpers/routes";
import Image from "next/image";
import Link from "next/link";
import { LocationMarkerIcon as LocationMarkerIconOutline } from "@heroicons/react/outline";
import Logo from "../../../public/assets/logos/logo-text.png";
import { SearchField } from "../forms/fields/SearchField";
import { SearchIcon } from "@heroicons/react/solid";
import { SearchSlideOver } from "../forms/fields/SearchSlideOver";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function NavBar() {
  const [view, setView] = useState("list");
  const router = useRouter();
  const authState = useContext(AuthContext);

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

  const [locationData, setSearchLocationData] = useState([
    {
      value: "Colorado Springs",
      area: "CO",
    },
    {
      value: "Colorado",
    },
    {
      value: "Colorado River",
    },
    {
      value: "Colorado State University",
      area: "Fort Collins, CO",
    },
  ]);

  const schema = Yup.object().shape({
    search: Yup.object(),
    location: Yup.object(),
  });

  const initialValues = {
    search: "",
    location: "",
  };

  // Ref to toggle focus
  const otherRef = React.createRef<FieldAttributes<any>>();

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
                const hasValue = values.location || values.search;

                return (
                  <>
                    <div className="bg-white p-4 w-full relative">
                      <div className="flex justify-center items-center w-full">
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                        <div className="w-25 absolute ml-auto mr-auto right-0 left-0">
                          <Link href={"/"}>
                            <a className="flex items-center relative  h-6 w-auto">
                              <Image
                                layout="intrinsic"
                                src={Logo}
                                alt="CannaPages"
                              />
                            </a>
                          </Link>
                        </div>

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
                        <div className="flex justify-end align-center ml-auto">
                          {!token ? (
                            <Link href={"/login"}>
                              <a>
                                <button className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
                                  Sign in
                                </button>
                              </a>
                            </Link>
                          ) : (
                            <AvatarMenu />
                          )}
                        </div>
                      </div>
                      {!router.pathname.startsWith("/user") ? (
                        <Form className={"w-full"} onSubmit={handleSubmit}>
                          <div className="grid grid-cols-7 gap-1 pt-2">
                            <div className={"col-span-7"}>
                              <Field
                                name={"search"}
                                component={SearchSlideOver}
                                options={searchData}
                                id={"search"}
                                onChange={handleChange}
                                setFieldValue={setFieldValue}
                                value={values.search}
                                placeholder="Search"
                                icon={
                                  <SearchIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                }
                                searchHelper="Find"
                              />
                            </div>
                          </div>
                        </Form>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }}
            </Formik>
          </div>

          <Disclosure.Panel className="lg:hidden ">
            <div className="pt-2 pb-3 space-y-1 bg-white">
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
