import * as Yup from 'yup';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { InputField } from '@/components/forms/fields/InputField';
import Link from 'next/link';
import sureThing from '@/helpers/sureThing';

export default function LoginForm() {
  const [apiError, setApiError] = useState<any>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email address does not look complete')
      .required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (values: any) => {
    setApiError('');

    const response = await sureThing(
      signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
    );

    console.log('RES:::', response);

    // useEffect(() => {
    //   console.log(apiError);
    // }, [apiError]);

    console.log('RESPONSE', response);
    if (!response.result.ok) {
      switch (response.result.status) {
        case 401:
          setApiError(['Email or Password is Incorrect']);
          break;
        case 500:
          setApiError(["Can't send this request, Please try again later"]);
          break;
        default:
          setApiError(['Something went wrong, Please try again later']);
          break;
      }
    }
    console.log(apiError);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnBlur={true}
    >
      {({ handleSubmit, errors, values }) => {
        const errorCount = Object.keys(errors).length + apiError.length;
        const passwordError = Object.keys(errors).includes('password');
        const errorList = [
          Object.values(errors).map((error, i) => (
            <li className="text-red-700 font-normal" key={i}>
              {error}
            </li>
          )),
          Object.values(apiError).map((apiError, i) => (
            <li className="text-red-700 font-normal" key={`api_${i}`}>
              {apiError as string}
            </li>
          )),
        ].flat(1);

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

            <div className="mt-1 relative">
              <Field
                label="Password"
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                component={InputField}
              />
              <button
                role="switch"
                type="button"
                style={{
                  position: 'absolute',
                  bottom: '7.6px',
                  right: passwordError ? '35px' : '9.5px',
                }}
                aria-pressed={passwordVisible ? 'true' : 'false'}
                onClick={togglePasswordVisible}
                className={`cursor-default text-gray-500 w-6`}
              >
                {!passwordVisible ? (
                  <>
                    <span className="sr-only">Show Password</span>
                    <EyeIcon aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Hide Password</span>
                    <EyeOffIcon aria-hidden="true" />
                  </>
                )}
              </button>
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
                <Link href="/user/password">
                  <a className="font-medium text-green">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>
            {errorCount || apiError ? (
              <ErrorsDisplay
                apiError={apiError}
                errorCount={errorCount}
                errorList={errorList}
              />
            ) : (
              ''
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
