import * as Yup from "yup";

import { Field, Formik } from "formik";
import React, { useState } from "react";

import { InputField } from "./fields/InputField";
import { register } from "../../actions/register";
import styles from "./Form.module.scss";
import { useRouter } from "next/router";
import { InputCheckboxField } from "./fields/InputCheckboxField";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email address does not look complete")
      .required("Email address is required"),
  });

  const initialValues = {
    email: "",
    emailSubscribed: false,
  };



  async function handleSubmit(values: any) {
    const response = await register(values.email, values.password);
    if (response.status === 422) {
      setApiError("Email is already in use.");
    } else {
      router.push("/register/complete");
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ handleSubmit, errors }) => {
        const errorCount = Object.keys(errors).length;
        const errorList = Object.values(errors).map((error, i) => (
          <li className="text-red-700 font-normal" key={i}>
            {error}
          </li>
        ));

        return (
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="mt-1">
              <Field
                label="Email Address"
                id="email"
                name="email"
                type="email"
                component={InputField}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:"
            >
              Sign up
            </button>
            <Link href={"/login"} passHref>
              <a>
                <button className="mt-4 font-semibold w-full bg-white text-green-500 hover:bg-green-600 hover:text-white flex justify-center py-2 px-4 rounded-md shadow-sm text-sm border-2  border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Log In
                </button>
              </a>
            </Link>
            <div className="mt-1">
              <p className="font-normal text-sm leading-5 text-gray-500">
                By continuing, you are creating a CannaPages account, and accept
                to our{" "}
                <Link href="/terms-and-conditions" passHref>
                  <a className="text-green-500 underline">Terms of Use</a>
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" passHref>
                  <a className="text-green-500 underline">Privacy Policy</a>
                </Link>
              </p>
            </div>

            <div className="mt-1">
              <Field
                label="Please send me emails about deals, featured products and recommendations on CannaPages"
                labelStyles="text-gray-500 text-sm font-normal"
                id="emailSubscribed"
                name="emailSubscribed"
                type="checkbox"
                component={InputCheckboxField}
              />
            </div>

            {errorCount || apiError ? (
              <div className="grid grid-cols-6  bg-red-100 block w-full rounded-md  sm:text-sm py-5 ">
                <div className="col-span-1 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current text-red-400 mt-1"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="col-span-5">
                  {errorCount ? (
                    <>
                      <p className="text-red-800 font-medium">
                        There is an error with your submission
                      </p>
                      <ul className={styles.errorList}>{errorList}</ul>
                    </>
                  ) : (
                    <p className="text-red-800 font-medium mr-4">{apiError}</p>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        );
      }}
    </Formik>
  );
}
