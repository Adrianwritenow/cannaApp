import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import IconShare from '../../../public/assets/icons/iconComponents/IconShare';
import Link from 'next/link';
import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function SocialShare() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const platforms = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/',
    },
    {
      name: 'Twitter',
      href: 'https://www.twitter.com/',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/',
    },
    { name: 'WhatsApp', href: 'https://www.whatsapp.com/' },
    {
      name: 'Reddit',
      href: 'https://www.reddit.com/',
    },
  ];

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconShare className="w-5 h-5 text-green-500" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle max-w-lg w-full sm:p-6">
                <div className="block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-bold font-medium text-gray-900 mb-6"
                    >
                      Share
                    </Dialog.Title>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="border-b-2 pb-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://www.cannapages.com${router.asPath}/`
                          );
                        }}
                      >
                        Copy Link
                      </button>
                    </div>
                    <Link
                      href={`mailto:?subject=Big%20News&body=Check out This Article: https://www.cannapages.com${router.asPath}`}
                      passHref
                    >
                      <a>
                        <div className="border-b-2 pb-4">Email</div>
                      </a>
                    </Link>
                    {platforms.map((platform, idx) => (
                      <div
                        key={platform.name}
                        className={`${
                          idx === platforms.length - 1
                            ? ' pb-5'
                            : 'border-b-2 pb-2'
                        } `}
                      >
                        <Link href={platform.href} passHref>
                          <a>Share on {platform.name}</a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
