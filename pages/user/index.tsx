import { KeyIcon, MailIcon } from '@heroicons/react/outline';

import AccountSettingsForm from '@/components/forms/Profile/AccountSettingsForm';
import ChangePasswordForm from '@/components/forms/Profile/ChangePasswordForm';
import React from 'react';
import { Tab } from '@headlessui/react';
import UpdateNotificationsForm from '@/components/forms/Profile/UpdateNotificationsForm';
import UpdatePersonalForm from '@/components/forms/Profile/UpdatePersonalForm';
import UpdateProfileForm from '@/components/forms/Profile/UpdateProfileForm';
import { UserCircleIcon } from '@heroicons/react/outline';
import { useCurrentUser } from '@/hooks/user';

const tabs = [
  {
    name: 'Profile',
    icon: <UserCircleIcon />,
  },
  {
    name: 'Account Settings',
    icon: <MailIcon />,
  },
  {
    name: 'Password',
    icon: <KeyIcon />,
  },
];

export default function UserProfile() {
  const [currentUser, loading] = useCurrentUser(true);

  return (
    <div className="bg-gray-100 ">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="w-full overflow-visible shadow-md flex flex-wrap shadow-none space-y-1 p-4">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `${selected ? 'text-green bg-white ' : 'text-gray-700'},
                   relative block rounded-lg bg-transparent p-3  w-full cursor-pointer  sm:justify-between focus:outline-none flex items-center`
              }
            >
              {({ selected }) => (
                <div className="w-full flex items-center">
                  <div
                    className={`${
                      selected ? 'text-green' : 'text-gray-500'
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
              <UpdateProfileForm />
              <UpdatePersonalForm />
              <UpdateNotificationsForm />
            </div>
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <div className="max-w-7xl mx-auto grid grid-flow-row gap-6 pb-6">
              <AccountSettingsForm />
            </div>
          </Tab.Panel>
          <Tab.Panel className="focus:outline-none">
            <div className="max-w-7xl mx-auto grid grid-flow-row gap-6 pb-6">
              <ChangePasswordForm />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
