import * as Yup from "yup";

import { Field, Formik } from "formik";

import { InputField } from "./fields/InputField";
import React from "react";
import { register } from "../../actions/register";
import styles from "./Form.module.scss";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email address does not look complete")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "That doesn't match your New Password"
    ),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(values: any) {
    console.log("bang");
    const response = register(values.email, values.password);
    router.push("/register/complete");
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

            <div className="mt-1">
              <Field
                label="Password"
                id="password"
                name="password"
                type="password"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                label="Retype password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                component={InputField}
              />
            </div>

            {errorCount ? (
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
                  <p className="text-red-800 font-medium">
                    There were {errorCount} errors with your submission
                  </p>
                  <ul className={styles.errorList}>{errorList}</ul>
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:"
            >
              Sign up
            </button>
          </form>
        );
      }}
    </Formik>
  );
}
