import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import { InputCheckboxField } from "../fields/InputCheckboxField";
import React from "react";
import { useRouter } from "next/router";

export default function UpdateNotificationsForm() {
  const router = useRouter();
  const schema = Yup.object().shape({
    comments: Yup.boolean(),
    events: Yup.boolean(),
    newsletter: Yup.boolean(),
  });

  const initialValues = {
    comments: false,
    events: false,
    newsletter: false,
  };

  function handleSubmit(values: any) {
    console.log(values);
  }

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
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Notifications
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Decide which communications you'd like to receive.
                  </p>
                </div>
                <legend className="text-base font-medium text-gray-900">
                  Email
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-rows-auto gap-4">
                    <Field
                      name="comments"
                      id="comments"
                      label="Comments"
                      value={values.comments}
                      component={InputCheckboxField}
                      helperText={
                        "Get notified when someones replies to your posts."
                      }
                    />
                    <Field
                      name="events"
                      id="events"
                      label="Event invitations"
                      value={values.comments}
                      component={InputCheckboxField}
                      helperText={
                        "Get on the private, invitation-only guest lists for CANNAcadet and other cannabis events."
                      }
                    />
                    <Field
                      name="newsletter"
                      id="newsletter"
                      label="CANNAcadet newsletter"
                      value={values.comments}
                      component={InputCheckboxField}
                      helperText={"Get occasional CANNAPAGES news and updates."}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-green border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
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
