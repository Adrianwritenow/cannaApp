import * as Yup from "yup";

import { AuthContext, login } from "../../authentication/authContext";
import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import Errors from "../error/errors";
import { InputField } from "./fields/InputField";
import { useRouter } from "next/router";

export default function LoginForm() {
  const authState = useContext(AuthContext);
  const [apiError, setApiError] = useState("");
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

  const handleSubmit = async (values: any) => {
    setApiError("");

    const response = await login(authState, values.email, values.password);

    if (response.status !== 200) {
      setApiError(response.data.message);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
          <Form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
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
              <Errors
                apiError={apiError}
                errorCount={errorCount}
                errorList={errorList}
              />
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
