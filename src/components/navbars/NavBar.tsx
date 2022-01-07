import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/assets/logos/logo-text.png';
import React from 'react';
import SearchSlideOver from '../forms/fields/SearchSlideOver';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center flex-wrap justify-between">
            <div className="bg-white px-4 w-full relative ">
              <div className="flex justify-center items-center w-full py-3.5">
                <div className="w-25 ml-auto mr-auto right-0 left-0 s">
                  <Link href={'/'}>
                    <a className="flex items-center relative  h-6 w-auto  ">
                      <Image
                        unoptimized
                        layout="intrinsic"
                        src={Logo}
                        alt="CannaPages"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              {!router.pathname.startsWith('/user') ? (
                <SearchSlideOver searchRoute={router.pathname} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
