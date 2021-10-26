import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../src/authentication/authContext";
import FacebookIcon from "../../public/assets/icons/icon-facebook.svg";
import GoogleIcon from "../../public/assets/icons/icon-google.svg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../src/components/forms/LoginForm";
import Logo from "../../public/assets/logos/logo.png";
import { useRouter } from "next/router";

export default function Login() {
  const authState = useContext(AuthContext);
  const [access_token, setAccessToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (authState) {
      const access_token = authState.state.session.access_token;
      setAccessToken(`${access_token}`);
    }
    if (authState.state.session.access_token) {
      // router.push("/");
    }
  }, [access_token, authState, router]);

  return (
    <div className="flex flex-col justify-start max-w-5xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Image src={Logo} alt="CannaPages" layout={"responsive"} />
        </div>

        <span className="flex justify-end items-center col-span-5 font-normal text-gray-500">
          No account yet?
          <Link href="/register">
            <a>
              <span className="text-green hover:text-green-700 pl-2 font-medium">
                Sign up
              </span>
            </a>
          </Link>
        </span>
      </div>
      <div className="max-w-md mr-auto">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in</h2>
        <p className="text-base font-normal	text-gray-600 pt-2">
          Log in to your CANNAPAGES account.
        </p>
      </div>

      <div className="pt-8 ">
        <p className="text-sm font-medium	text-gray-900 py-1">Log in with</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Google</span>
              <button
                onClick={() => {}}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green"
              >
                <Image src={GoogleIcon} alt="Google" width={20} height={20} />
              </button>
            </a>
          </Link>
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Facebook</span>
              <button
                onClick={() => {}}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green"
              >
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
        <LoginForm />
      </div>
    </div>
  );
}
