import FacebookIcon from "../../public/assets/icons/icon-facebook.svg";
import GoogleIcon from "../../public/assets/icons/icon-google.svg";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/logos/logo.png";
import React from "react";
import RegisterForm from "../../src/components/forms/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col justify-center max-w-5xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Image src={Logo} alt="CannaPages" layout={"responsive"} />
        </div>

        <span className="flex justify-end items-center col-span-5 font-normal text-gray-500">
          Got an account?
          <Link href="/login">
            <a>
              <span className="text-green hover:text-green-700 pl-2 font-medium">
                Log in
              </span>
            </a>
          </Link>
        </span>
      </div>
      <div className="max-w-md mr-auto">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="text-base font-normal	text-gray-600 pt-2">
          Join our community of CANNAcadets to get free access to exclusive
          deals, save your favorite listings, submit reviews, and more.
        </p>
      </div>

      <div className="pt-8 ">
        <p className="text-sm font-medium	text-gray-900 py-1">Sign up with</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Google</span>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green">
                <Image src={GoogleIcon} alt="Google" width={20} height={20} />
              </button>
            </a>
          </Link>
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Facebook</span>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green">
                <Image
                  src={FacebookIcon}
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </button>
            </a>
          </Link>
        </div>
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or sign up with email
            </span>
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
