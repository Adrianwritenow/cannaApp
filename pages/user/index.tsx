import { KeyIcon, MailIcon } from "@heroicons/react/outline";
import { RadioGroup, Tab } from "@headlessui/react";
import React, { useState } from "react";

import AccountSettingsForm from "../../src/components/forms/Profile/AccountSettingsForm";
import UpdateNotificationsForm from "../../src/components/forms/Profile/UpdateNotificationsForm";
import UpdatePersonalForm from "../../src/components/forms/Profile/UpdatePersonalForm";
import UpdateProfileForm from "../../src/components/forms/Profile/UpdateProfileForm";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "../../src/hooks/user";

const tabs = [
  {
    name: "Edit my profile",
    icon: <UserCircleIcon />,
  },
  {
    name: "Account Settings",
    icon: <MailIcon />,
  },
  {
    name: "Password",
    icon: <KeyIcon />,
  },
];

export interface UpdateFormProps {
  loading: boolean;
}

export default function UserProfile() {
  // const [selected, setSelected] = useState(edits[0]);
  const [currentUser, loading] = useCurrentUser(true);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-gray-100 ">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="w-full overflow-visible shadow-md flex flex-wrap shadow-none space-y-1 p-4">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `${selected ? "text-green bg-white " : "text-gray-700"},
                   relative block rounded-lg bg-transparent p-3  w-full cursor-pointer  sm:justify-between focus:outline-none flex items-center`
              }
            >
              {({ selected }) => (
                <div className="w-full flex items-center">
                  <div
                    className={`${
                      selected ? "text-green" : "text-gray-500"
                    }  mr-3 w-6 h-6`}
                  >
                    {tab.icon}
                  </div>
                  <span className="px-4">{tab.name}</span>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        {/* Panels that control the view by index */}
        <Tab.Panels className="focus:outline-none">
          <Tab.Panel className="focus:outline-none">
            <div className="max-w-7xl mx-auto grid grid-flow-row gap-6 pb-6">
              <UpdateProfileForm loading={loading} />
              <UpdatePersonalForm loading={loading} />
              <UpdateNotificationsForm loading={loading} />
            </div>
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <div className="max-w-7xl mx-auto grid grid-flow-row gap-6 pb-6">
              <AccountSettingsForm loading={loading} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
