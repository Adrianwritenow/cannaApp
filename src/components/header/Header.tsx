import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logos/logo-text.svg";
import MobileLogo from "../../../public/assets/logos/logo.svg";
import { Routes } from "../../helpers/routes";
import { SearchIcon } from "@heroicons/react/solid";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white shadow mb-1">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 block lg:hidden">
                  <Link href={"/"}>
                    <a>
                      <Image
                        className=" h-auto w-auto"
                        src={MobileLogo}
                        alt="CannaPages"
                      />
                    </a>
                  </Link>
                </div>
                <div className=" lg:hidden ml-4">
                  <Link href="/cart">
                    <a className="text-gray-500">
                      <ShoppingCartIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex-shrink-0 hidden lg:block h-8 w-auto">
                  <Link href={"/"}>
                    <a>
                      <Image className="" src={Logo} alt="CannaPages" />
                    </a>
                  </Link>
                </div>
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4 text-sm">
                    {Object.entries(Routes).map(([key, value], index) => {
                      const href = value.href;
                      return (
                        <Link href={href} as={href} key={index}>
                          <a className="text-gray-500 hover:text-green-500">
                            {value.label}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-green-500 focus:text-gray-900 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md text-gray shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>Sign In</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <Link href="/cart">
                  <a className="text-gray-500">
                    <ShoppingCartIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden ">
            <div className="pt-2 pb-3 space-y-1">
              {Object.entries(Routes).map(([key, value], index) => {
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
        </>
      )}
    </Disclosure>
  );
}
