import BusinessIcon from "../../../public/assets/icons/iconComponents/Business";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logos/logo.png";
import React from "react";
import styles from "./RegisterComplete.module.scss";

export default function RegisterComplete() {
  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Image src={Logo} alt="CannaPages" layout={"responsive"} />
        </div>
      </div>
      <div className="sm:mx-auto sm:max-w-md ">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome aboard, CANNAcadet!
        </h2>
        <p className="text-base font-normal	text-gray-600 pt-2">
          Now that you have a free account, you can:
        </p>
        <ul className={styles.checkList}>
          <li>save strains, shops, and deals</li>
          <li>give ratings and reviews</li>
          <li>comment in blogs and forums</li>
        </ul>
        <Link href="/">
          <a>
            <button className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 mt-5 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-default">
              Continue Browsing
            </button>
          </a>
        </Link>
        <div className=" bg-green-50 bg-opacity-40 mt-8  border border-green block w-full rounded-md py-5 ">
          <div className="justify-center p-8">
            <div className="flex">
              <BusinessIcon className="iconGreen" width={28} height={28} />
              <h3 className="text-green font-bold text-xl ml-2">Shop Owners</h3>
            </div>
            <p className="text-base text-gray-900 font-normal">
              Own a cannabis business, and want to manage your business profile
              or advertise with CANNAPAGES?
            </p>
            <button className="w-full bg-white text-green hover:bg-gray-50 flex justify-center py-2 px-4 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
              List or Claim My Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
