import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logos/logo-text.png";
import { Menu } from "@headlessui/react";
import React from "react";

const BusinessMenu = React.forwardRef((props, ref: React.ForwardedRef<any>) => (
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
          <div className="flex items-center">
            <AvatarIcon className="w-8 h-8" />
            <div className="pl-3">
              <span className="text-base flex items-center">CANNABIZ</span>
              <div className="text-gray-500 text-sm">
                <span className="block">1400 Main St STE 420</span>
                <span className="block">Colorado Springs, CO</span>
              </div>
            </div>
          </div>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block w-full text-left text-sm "}>
              Edit business profile
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block w-full text-left text-sm 0"}>
              Sponsorships
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block w-full text-left text-sm "}>
              Manage inventory
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block w-full text-left text-sm "}>
              Business settings
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 flex justify-between text-sm "}>
              Switch businesses
              <ChevronRightIcon className="text-gray-500 w-4 h-4" />
            </a>
          </Link>
        )}
      </Menu.Item>
    </div>
    <div className="px-4  grid grid-flow-row auto-rows-max gap-5 pt-3">
      <Menu.Item>
        {({ active }) => (
          <div className="flex items-center ">
            <AvatarIcon className="w-8 h-8" />
            <div className="pl-3">
              <span className="text-base flex items-center">
                Fabricio Andrews
              </span>
              <div className="text-gray-500 text-sm">
                <span className="block">fabricio@cannabiz.com</span>
              </div>
            </div>
          </div>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block w-full text-left text-sm"}>
              My stash
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link href="#">
            <a className={"text-gray-900 block text-sm "}>Account & Profile</a>
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
));
BusinessMenu.displayName = "BusinessMenu";

export default BusinessMenu;
