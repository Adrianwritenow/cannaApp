import React, { useContext, useState } from "react";

import { AuthContext } from "../../src/authentication/authContext";
import { KeyIcon } from "@heroicons/react/outline";
import { NextPageContext } from "next";
import { RadioGroup } from "@headlessui/react";
import { RootState } from "../../src/reducers";
import UpdateNotificationsForm from "../../src/components/forms/Profile/UpdateNotificationsForm";
import UpdatePersonalForm from "../../src/components/forms/Profile/UpdatePersonalForm";
import UpdateProfileForm from "../../src/components/forms/Profile/UpdateProfileForm";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "../../src/hooks/user";
import { useSelector } from "react-redux";

const edits = [
  {
    name: "Edit my profile",
    icon: <UserCircleIcon />,
  },
  {
    name: "Update my password",
    icon: <KeyIcon />,
  },
];

export default function UserProfile() {
  const [selected, setSelected] = useState(edits[0]);
  const [currentUser] = useCurrentUser(true);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-gray-100">
      <RadioGroup
        value={selected}
        className="px-2 py-12"
        onChange={setSelected}
      >
        <RadioGroup.Label className="sr-only">
          Edit Profile or Password
        </RadioGroup.Label>
        <div className="space-y-4">
          {edits.map((edit) => (
            <RadioGroup.Option
              key={edit.name}
              value={edit}
              className={({ checked }) =>
                classNames(
                  checked ? "text-green bg-white " : "",
                  "relative block rounded-lg bg-transparent p-2  cursor-pointer  sm:flex sm:justify-between focus:outline-none"
                )
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label className="font-medium flex items-center	">
                        <div
                          className={`w-6 h-6 mr-3 ${
                            checked ? "text-green" : "text-gray-400"
                          }`}
                        >
                          {edit.icon}
                        </div>
                        {edit.name}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      "absolute -inset-px rounded-lg  pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="max-w-7xl mx-auto grid grid-flow-row gap-6 pb-6">
        <UpdateProfileForm />
        <UpdatePersonalForm />
        <UpdateNotificationsForm />
      </div>
    </div>
  );
}
