import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import { InputField } from "../fields/InputField";
import React from "react";
import SelectDropdown from "../fields/SelectDropdown";
import { useRouter } from "next/router";

export default function UpdatePersonalForm() {
  const router = useRouter();
  const schema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().required("Email is required"),
    country: Yup.string(),
    state: Yup.string(),
    phone: Yup.string(),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    phone: "",
  };

  function handleSubmit(values: any) {
    console.log(values);
  }

  const countries = [
    { id: "US", label: "United States" },
    { id: "MX", label: "Mexico" },
    { id: "CA", label: "Canada" },
  ];

  const states = [
    { id: "FL", label: "Florida" },
    { id: "NY", label: "New York" },
    { id: "CA", label: "California" },
  ];

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleSubmit, errors, values, handleBlur, handleChange }) => {
        return (
          <Form className="space-y-8 bg-white shadow">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-gray-900">
                  Personal info
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Names and email addresses are NOT made publicly visible
                  anywhere, and we will NEVER sell this info. This info helps us
                  personalize CANNAPAGES content for you, and THAT’S IT!
                </p>
              </div>
              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="First name"
                    id="firstName"
                    name="firstName"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="Last name"
                    id="lastName"
                    name="lastName"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm w-full">
                  <Field
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="Country / Region"
                    id="country"
                    name="country"
                    type="text"
                    options={countries}
                    component={SelectDropdown}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="State / Province"
                    id="state"
                    name="state"
                    type="text"
                    options={states}
                    component={SelectDropdown}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="Phone"
                    id="phone"
                    name="phone"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values.phone}
                    mask="(111) 111-1111"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className=" bg-gray-50  py-3 flex justify-end pr-4">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
