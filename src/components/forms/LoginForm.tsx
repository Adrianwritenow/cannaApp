import * as Yup from "yup";

import AuthContext, { login } from "../../../stores/authContext";
import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import { InputField } from "./fields/InputField";
import React from "react";
import { signIn } from "next-auth/client";
import styles from "./Form.module.scss";
import { useRouter } from "next/router";

export default function LoginForm(csrfToken: any) {
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email address does not look complete")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  function handleSubmit(values: any) {
    const response = signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/`,
    });

    console.log(response);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleSubmit, errors, values }) => {
        const errorCount = Object.keys(errors).length;
        const errorList = Object.values(errors).map((error, i) => (
          <li className="text-red-700 font-normal" key={i}>
            {error}
          </li>
        ));

        return (
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <Field name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <div className="mt-1">
              <Field
                label="Email Address"
                id="email"
                name="email"
                type="email"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                label="Password"
                id="password"
                name="password"
                type="password"
                component={InputField}
              />
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
                <a href="#" className="font-medium text-green">
                  Forgot your password?
                </a>
              </div>
            </div>
            {errorCount || apiError ? (
              <div className="grid grid-cols-6  bg-red-50 block w-full rounded-md  sm:text-sm py-5 ">
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
                        There were {errorCount} errors with your submission
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

            <button
              type="submit"
              className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
            >
              Log in
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
