import * as Yup from 'yup';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { Field, Formik } from 'formik';
import { IAxiosReturn } from '@/interfaces/axios';
import { InputField } from '@/components/forms/fields/InputField';
import Link from 'next/link';
import { userLostPassword } from '@/actions/user';
import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';

export default function ForgotPassword() {
  const [apiError, setApiError] = useState('');
  const [dispatchAxios, { loading, success }] = useAxios();
  const initialValues = {
    email: '',
  };

  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
  });

  function handleSubmit(values: any) {
    dispatchAxios(userLostPassword(values.email)).then(
      (status: IAxiosReturn) => {
        if (!status.success) {
          setApiError('Password reset request failed, please try again later.');
          return;
        }
      }
    );
  }

  if (success) {
    return (
      <div className="flex flex-col justify-start py-12 px-4 bg-white">
        <div className="mx-auto max-w-lg">
          <div className="space-y-6">
            <h1 className="text-2xl leading-8 font-bold">
              Reset Instructions Sent
            </h1>
            <p className="text-lg leading-6 font-normal">
              We delivered instructions to your email to help you reset your
              password.
            </p>
            <Link href="/login">
              <a className="bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
                Back to Log In
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
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
          <div className="flex flex-col justify-start py-12 px-4 bg-white">
            <div className="mx-auto max-w-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h1 className="text-2xl leading-8 font-bold">
                  Forgot Your Password?
                </h1>
                <p className="text-lg leading-6 font-normal">
                  Enter the email associated with this account and we&apos;ll
                  send a password reset link.
                </p>

                <div className="mt-1">
                  <label
                    htmlFor="email"
                    className={'block text-sm font-medium text-gray-700'}
                  >
                    Your email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    component={InputField}
                  />
                </div>

                {(errorCount || apiError) && (
                  <ErrorsDisplay
                    apiError={apiError}
                    errorCount={errorCount}
                    errorList={errorList}
                  />
                )}

                <button
                  type="submit"
                  className="disabled:bg-gray-300 disabled:text-gray-500 w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading
                    ? 'Resetting Your Password...'
                    : 'Reset Your Password'}
                </button>

                <Link href="/login">
                  <a className="w-full bg-white text-green flex justify-center py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Back to Log In
                  </a>
                </Link>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
