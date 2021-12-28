import * as Yup from 'yup';

import AvatarMenu from '@/components/menus/AvatarMenu';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/assets/logos/logo-text.png';
import React from 'react';
import SearchSlideOver from '../forms/fields/SearchSlideOver';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center flex-wrap justify-between">
            <div className="bg-white p-4 w-full relative">
              <div className="flex justify-center items-center w-full pb-3">
                <div className="w-25 absolute ml-auto mr-auto right-0 left-0">
                  <Link href={'/'}>
                    <a className="flex items-center relative  h-6 w-auto">
                      <Image
                        unoptimized
                        layout="intrinsic"
                        src={Logo}
                        alt="CannaPages"
                      />
                    </a>
                  </Link>
                </div>

                <div className="flex justify-end align-center ml-auto">
                  {!session?.accessToken || status === 'loading' ? (
                    <Link href={'/login'}>
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
              {!router.pathname.startsWith('/user') ? <SearchSlideOver /> : ''}
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
