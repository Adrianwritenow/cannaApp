import {
  BadgeCheckIcon,
  CheckIcon,
  ChevronUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

import { BusinessProps } from "../../interfaces/props/businessProps";
import IconFacebook from "../../../public/assets/icons/iconComponents/IconFacebook";
import IconInsta from "../../../public/assets/icons/iconComponents/IconInsta";
import Image from "next/image";
import Map from "../../../public/assets/images/png/map-mock.png";
import SvgIconTwitter from "../../../public/assets/icons/iconComponents/IconTwitter";

export default function BusinessAbout(props: BusinessProps) {
  const [open, setOpen] = useState(false);
  const { business } = props;

  return (
    <div className="px-4 grid gap-7 grid-flow-row auto-rows-max ">
      <section aria-labelledby="business-about" className="pt-4">
        <h2 id="business-about" className="sr-only">
          About
        </h2>
        <h2
          id="business-about"
          className="text-lg text-gray-700 font-semibold py-2"
        >
          About Us
        </h2>
        <p className="text-base text-gray-700">{business.about}</p>
      </section>
      <section>
        <h2 id="business-verified" className="sr-only">
          Verified License
        </h2>
        <h2
          id="business-verified"
          className="text-lg text-gray-700 font-semibold py-2"
        >
          Verified License
        </h2>
        <div className="w-full grid grid-cols-5">
          <div className="col-span-4">
            <p>
              CannaPages has verified this businsess posesses a valid trade
              licesnse.
            </p>
          </div>
          <div className="col-span-1">
            <BadgeCheckIcon className="text-green w-full" />
          </div>
        </div>
        <div className="pt-5">
          <button
            onClick={() => setOpen(true)}
            className="py-4 w-full uppercase text-green text-xs font-bold border-t border-gray-200 tracking-widest"
          >
            See license information
          </button>
        </div>
      </section>

      {/* Socials */}

      <section>
        <h2 id="business-socilas" className="sr-only">
          Find us on Social Media
        </h2>
        <h2
          id="business-socilas"
          className="text-lg text-gray-700 font-semibold pt-3"
        >
          Find us on Social Media
        </h2>

        <div className=" grid grid-flow-row auto-rows-max ">
          <div className="pt-5 ">
            <button className="py-4 w-full text-gray-700 flex items-center justify-start ">
              <IconFacebook className="w-10 h-10 text-gray-400" />
              <span className="pl-4">{business.socials.facebook}</span>
            </button>
            <button className="py-4 w-full text-gray-700 flex items-center justify-start">
              <SvgIconTwitter className="w-10 h-10 text-gray-400" />
              <span className="pl-4">{business.socials.twitter}</span>
            </button>
            <button className="py-4 w-full text-gray-700 flex items-center justify-start   ">
              <IconInsta className="w-10 h-10 text-gray-400" />
              <span className="pl-4">{business.socials.instagram}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <h2 id="business-location" className="sr-only">
          Location
        </h2>

        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          <Image src={Map} layout="fill" objectFit={"cover"} />
        </div>

        <div className="text-lg text-gray-500 w-60 grid grid-flow-row auto-rows-max gap-2">
          <h2
            id="business-about"
            className="text-lg text-gray-700 font-semibold pt-3"
          >
            Location
          </h2>
          <p className="text-gray-700">{business.address}</p>
          <p>{business.distance} away</p>
        </div>
        <div className="pt-5 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest text-green">
            Get Directions
          </button>
        </div>
      </section>

      {/* Hours of Operation */}
      <section>
        <Disclosure>
          {({ open }) => (
            <div className="w-full">
              <Disclosure.Button className="flex items-center justify-between w-full focus:outline-none border-b border-gray-200 pb-3">
                <h2 id="business-hours" className="sr-only">
                  Opening Hours
                </h2>
                <h2
                  id="business-hours"
                  className="text-lg text-gray-700 font-semibold"
                >
                  Opening Hours
                </h2>
                {/*
              Use the `open` render prop to rotate the icon when the panel is open
            */}
                <ChevronUpIcon
                  className={`w-6 ${open ? "transform rotate-180" : ""}`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="text-gray-700">
                <p className="py-3 flex justify-between items-center">
                  Sunday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Monday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Tuesday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Wednesday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Thursday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Friday <span>8:00 AM-:00 PM</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Saturday <span>8:00 AM-:00 PM</span>
                </p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </section>

      {/* Amenities  */}
      <section>
        <h2 id="business-amenities" className="sr-only">
          Amenities
        </h2>
        <h2
          id="business-amenities"
          className="text-lg text-gray-700 font-semibold pt-3"
        >
          Amenities
        </h2>

        {/* General Amenities */}

        <div className="grid grid-flow-row auto-rows-max space-y-2">
          <div className="flex flex-wrap border-b border-gray-200">
            <h3 id="business-amenities-general" className="sr-only">
              General
            </h3>
            <h3
              id="business-amenities-general"
              className="text-sm text-green block pt-3"
            >
              General
            </h3>
            <div className="flex py-2">
              {business.amenities.map((amenity, index) => (
                <div key={`amenity-${index}`}>
                  <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                    <span className="text-green">
                      <CheckIcon className="w-4 mr-2" />
                    </span>
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Amenities */}

          <div className="flex flex-wrap border-b border-gray-200">
            <h3 id="business-amenities-service" className="sr-only">
              Service Options
            </h3>
            <h3
              id="business-amenities-service"
              className="text-sm text-green pt-3"
            >
              Service Options
            </h3>
            <div className="flex py-2">
              {business.amenities.map((amenity, index) => (
                <div key={`amenity-${index}`}>
                  <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                    <span className="text-green">
                      <CheckIcon className="w-4 mr-2" />
                    </span>
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Amenities */}

          <div className="flex flex-wrap border-b border-gray-200">
            <h3 id="business-amenities-payment" className="sr-only">
              Payment
            </h3>
            <h3
              id="business-amenities-payment"
              className="text-sm text-green pt-3"
            >
              Payment
            </h3>
            <div className="flex py-2">
              {business.amenities.map((amenity, index) => (
                <div key={`amenity-${index}`}>
                  <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                    <span className="text-green">
                      <CheckIcon className="w-4 mr-2" />
                    </span>
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Crowd Amenities */}

          <div className="flex flex-wrap border-b border-gray-200">
            <h3 id="business-amenities-crowd" className="sr-only">
              Crowd
            </h3>
            <h3
              id="business-amenities-crowd"
              className="text-sm text-green pt-3"
            >
              Crowd
            </h3>
            <div className="flex py-2">
              {business.amenities.map((amenity, index) => (
                <div key={`amenity-${index}`}>
                  <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                    <span className="text-green">
                      <CheckIcon className="w-4 mr-2" />
                    </span>
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Atmosphere Amenities */}

          <div className="flex flex-wrap border-b border-gray-200">
            <h3 id="business-amenities-atmosphere" className="sr-only">
              Atmosphere
            </h3>
            <h3
              id="business-amenities-atmosphere"
              className="text-sm text-green pt-3"
            >
              Atmosphere
            </h3>
            <div className="flex py-2">
              {business.amenities.map((amenity, index) => (
                <div key={`amenity-${index}`}>
                  <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                    <span className="text-green">
                      <CheckIcon className="w-4 mr-2" />
                    </span>
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Slideover */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          License Information
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full" aria-hidden="true">
                          <ul className="list-none">
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">License</p>
                              <p>0000000</p>
                            </li>
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">Issued by</p>
                              <p>0000000</p>
                            </li>
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">Trade</p>
                              <p>Dispensary</p>
                            </li>
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">
                                Verified by CannaPages
                              </p>
                              <time dateTime="2022-01-01">1/1/2022</time>
                            </li>
                            <li className="w-full flex items justify-between py-4 border-b border-gray-200">
                              <p className="text-gray-700">Expires</p>
                              <time dateTime="2022-01-01">1/1/2022</time>
                            </li>
                          </ul>
                          <p className="pt-8">
                            When you pick a business on CannaPages, we want you
                            to be confident in your decision. That is why we
                            give businesses the opportunity to participate in
                            our trade license verification process. CannaPages
                            confirmed the business's trade license as of the
                            verification date listed above. <br />
                            <br />
                            Businesses pay CannaPages for license verification.
                          </p>
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-full text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green mt-5"
                          >
                            Okay, got it!
                          </button>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
