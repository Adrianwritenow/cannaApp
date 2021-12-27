import * as Yup from "yup";

import { Field, Formik } from "formik";
import React, { useState } from "react";

import ErrorsDisplay from "../error/ErrorsDisplay";
import { InputField } from "./fields/InputField";
import { registerVerify, registerResendVerification } from "../../actions/register";
import { useRouter } from "next/router";

export default function RegisterVerifyForm(props: any) {
  const [apiError, setApiError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const { emailAddress } = props;

  const router = useRouter();
  const schema = Yup.object().shape({
    token: Yup.string()
      .length(6, "Code must be 6 digits.")
      .required("6 digit code is required"),
  });

  const initialValues = {
    token: '',
  };

  async function handleSubmit(values: any) {
    setApiError("");

    const response = await registerVerify(emailAddress, values.token);

    if (response.status == 200) {
      router.push("/register/complete");
    } else {
      setApiError(response.data.message);
    }
  }

  async function handleResend() {
    const response = await registerResendVerification(emailAddress);

    if (response.status == 200) {
      // Show success message
      setFormMessage(`A new passcode has been sent to ${emailAddress}`)
    } else {
      // Show failure message
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
      {({ handleSubmit, errors, values }) => {
        const errorCount = Object.keys(errors).length;
        const errorList = Object.values(errors).map((error, i) => (
          <li className="text-red-700 font-normal" key={i}>
            {error}
          </li>
        ));

        return (
          <form
            className="space-y-4"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >

            <div className="mt-1">
              <Field
                id="token"
                name="token"
                type="token"
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
              Verify E-mail
            </button>

            <button 
              onClick={handleResend}
              type="button"
              className="w-full bg-white text-green flex justify-center py-2 px-4 border border-transparent text-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:"
            >
              Resend Passcode
            </button>

            { formMessage !== '' && (
              <div className=" bg-green-50 bg-opacity-40 border border-green block w-full rounded-md py-2 ">
                <div className="justify-center px-6 py-2">
                  <p className="text-sm text-gray-900 font-normal">
                    { formMessage }
                  </p>
                </div>
              </div>
            )}
          </form>
        );
      }}
    </Formik>
  );
}
