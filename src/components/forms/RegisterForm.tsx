import * as Yup from "yup";

import { Field, Formik } from "formik";
import React, { useState } from "react";

import ErrorsDisplay from "../error/ErrorsDisplay";
import { InputField } from "./fields/InputField";
import { register } from "../../actions/register";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const [apiError, setApiError] = useState("");

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

  async function handleSubmit(values: any) {
    setApiError("");

    const response = await register(values.email, values.password);
    router.push("/register/complete");

    if (response.status !== 200) {
      setApiError(response.data.message);
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

            {errorCount || apiError ? (
              <ErrorsDisplay
                apiError={apiError}
                errorCount={errorCount}
                errorList={errorList}
              />
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
