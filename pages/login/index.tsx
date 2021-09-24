import FacebookIcon from "../../public/assets/icons/icon-facebook.svg";
import GoogleIcon from "../../public/assets/icons/icon-google.svg";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/logos/logo.png";
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Image src={Logo} alt="CannaPages" layout={"responsive"} />
        </div>

        <a className="flex justify-end items-center col-span-5 font-normal	text-gray-500">
          No Account yet?
          <Link href="/register">
            <span className="canna-link pl-2 font-medium">Sign up</span>
          </Link>
        </a>
      </div>
      <div className="sm:mx-auto sm:max-w-md ">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log In</h2>
        <p className="text-base font-normal	text-gray-600 pt-2">
          Log in to your Cannapages account.
        </p>
      </div>

      <div className="py-8 ">
        <p className="text-sm font-medium	text-gray-900 py-1">Log in with</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Google</span>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <Image src={GoogleIcon} alt="Google" width={20} height={20} />
              </button>
            </a>
          </Link>
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Facebook</span>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
              Or continue with
            </span>
          </div>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-green focus:border-green sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium canna-link">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full button--main flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-default"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
