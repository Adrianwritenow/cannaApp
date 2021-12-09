import { AuthContext, logout } from "../../authentication/authContext";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import BusinessMenu from "./BusinessMenu";
import UserMenu from "./UserMenu";
import { useCurrentUser } from "../../hooks/user";
import { useRouter } from "next/router";

export default function AvatarMenu() {
  const authState = useContext(AuthContext);
  const router = useRouter();
  const [currentUser] = useCurrentUser(true);
  const [mounted, setMounted] = useState(false);

  const ref = React.createRef();
  const [menuType, setMenuType] = useState("user");

  const handleSignOut = async () => {
    const response = await logout(authState);
    router.push("/");
  };

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <div>
      {mounted && (
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
              <BusinessMenu ref={ref} handleSignOut={handleSignOut} />
            ) : (
              <UserMenu
                ref={ref}
                handleSignOut={handleSignOut}
                user={{
                  name: currentUser.name[0].value || "",
                  uid: "",
                }}
              />
            )}
          </Transition>
        </Menu>
      )}
    </div>
  );
}
