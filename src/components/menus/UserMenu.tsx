import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logos/logo-text.png";
import { Menu } from "@headlessui/react";
import React from "react";
import { XIcon } from "@heroicons/react/solid";

export const UserMenu = React.forwardRef(
  (props, ref: React.ForwardedRef<any>) => (
    <Menu.Items
      ref={ref}
      className="origin-top-right w-full absolute right-0 top-0 z-50  w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none pt-6 pb-5 divide-y divide-gray-200"
    >
      <div className="px-4  grid grid-flow-row auto-rows-max gap-5 pb-5">
        <div className="grid grid-cols-2 w-full">
          <div className="flex relative justify-start relative h-6 w-auto">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              src={Logo}
              alt="CannaPages"
            />
          </div>
          <div className="flex justify-end">
            <Menu.Button className=" bg-transparent focus:outline-none">
              <XIcon className=" text-black h-6 w-6" />
            </Menu.Button>
          </div>
        </div>
        <Menu.Item>
          {({ active }) => (
            <div className="flex">
              <AvatarIcon className="w-8 h-8" />
              <span className="pl-3 text-sm flex items-center text-gray-500">
                dwight@schrute.farm
              </span>
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block w-full text-left text-sm "}>
                My stash
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block w-full text-left text-sm"}>
                Account and profile
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block w-full text-left text-sm"}>
                Sign out
              </a>
            </Link>
          )}
        </Menu.Item>
      </div>
      <div className="px-4  grid grid-flow-row auto-rows-max gap-5 pt-5">
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block w-full text-left text-sm"}>
                Claim your business
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block text-sm "}>
                Advertise with us
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link href="#">
              <a className={"text-gray-900 block text-sm"}>Sign out</a>
            </Link>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  )
);
