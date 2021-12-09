import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { InputField } from "../fields/InputField";
import { RootState } from "../../../reducers";
import SelectDropdown from "../fields/SelectDropdown";

import { updateUser } from "../../../actions/user";
import { useAxios } from "../../../hooks/useAxios";
import { useSelector } from "react-redux";

export default function UpdatePersonalForm() {
  const [initialValues, setInitialValues] = useState({

    field_first_name: "",
    field_last_name: "",
    mail: "",
    country: "",
    field_state: "",
    phone: "",
  });
  const [dispatchAxios, { loading }] = useAxios();
  const { currentUser } = useSelector((root: RootState) => root.user);

  const schema = Yup.object().shape({
    field_first_name: Yup.string(),
    field_last_name: Yup.string(),
    mail: Yup.string(),
    country: Yup.string(),
    field_state: Yup.string(),
    phone: Yup.string(),
  });

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

  useEffect(() => {
    const isEmpty = Object.values(initialValues).every(
      (x) => x === null || x === ""
    );
    if (isEmpty) {
      setInitialValues({
        field_first_name: currentUser.field_first_name[0]?.value || "",
        field_last_name: currentUser.field_last_name[0]?.value || "",
        mail: "" || "",
        country: "" || "",
        field_state: currentUser.field_state[0]?.value || "",
        phone: "" || "",
      });
    }
  }, [initialValues, currentUser]);

  async function handleSubmit(values: any) {
    dispatchAxios(updateUser(currentUser.uid[0].value, values));

  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={true}
      enableReinitialize
      validateOnBlur={true}
    >
      {({ values, handleBlur, handleChange, setFieldValue }) => {
        return (
          <Form className="bg-white shadow">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
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
                    id="field_first_name"
                    name="field_first_name"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="Last name"
                    id="field_last_name"
                    name="field_last_name"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm w-full">
                  <Field
                    label="Email"
                    id="mail"
                    name="mail"
                    type="mail"
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
                    value={values.field_state}
                    setFieldValue={setFieldValue}
                    component={SelectDropdown}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="State / Province"
                    id="field_state"
                    name="field_state"
                    type="text"
                    options={states}
                    value={values.field_state}
                    setFieldValue={setFieldValue}
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
                    mask="(###) ###-####"
                    type="text"
                    component={InputField}
                  />
                </div>
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
          </Form>
        );
      }}
    </Formik>
  );
}
