import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import { BusinessMenu } from "./BusinessMenu";
import { UserMenu } from "./UserMenu";

export default function AvatarMenu() {
  const ref = React.createRef();
  const [menuType, setMenuType] = useState("business");

  return (
    <Menu as="div" className="inline-block text-left">
      <div className="flex items-center justify-center">
        <Menu.Button className="inline-flex justify-center w-full rounded-md  bg-transparent text-sm  font-medium text-green focus:outline-none">
          <AvatarIcon className="w-8 h-8" />
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
        {menuType === "business" ? (
          <BusinessMenu ref={ref} />
        ) : (
          <UserMenu ref={ref} />
        )}
      </Transition>
    </Menu>
  );
}
