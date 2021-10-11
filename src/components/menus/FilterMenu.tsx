import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md  bg-transparent text-sm  font-medium text-green focus:outline-none">
          Sort
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 z-50 right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none px-6 pt-4">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="#">
                  <a
                    className={classNames(
                      active ? "text-gray-900" : "text-gray-400",
                      "block text-sm pb-4"
                    )}
                  >
                    Most Popular
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="#">
                  <a
                    className={classNames(
                      active ? " text-gray-900" : "text-gray-400",
                      "block text-sm pb-4"
                    )}
                  >
                    Closest avaliable near you
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="#">
                  <a
                    className={classNames(
                      active ? " text-gray-900" : "text-gray-400",
                      "block text-sm pb-4"
                    )}
                  >
                    Highest rated
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="#">
                  <a
                    className={classNames(
                      active ? " text-gray-900" : "text-gray-400",
                      "block w-full text-left text-sm pb-4"
                    )}
                  >
                    Alphabetical
                  </a>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
