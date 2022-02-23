import * as Yup from 'yup';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { Field, Formik } from 'formik';
import { IAxiosReturn } from '@/interfaces/axios';
import { InputField } from '@/components/forms/fields/InputField';
import Link from 'next/link';
import { userLostPasswordReset } from '@/actions/user';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PasswordReset() {
  const router = useRouter();
  const { name, temp_pass } = router.query;
  const [apiError, setApiError] = useState<any>('');
  const [dispatchAxios, { loading, success }] = useAxios();
  const initialValues = {
    password: '',
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .test('len', 'Must be exactly 8 or more characters', val =>
        val ? val?.length >= 8 : false
      )
      .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Must contain at least one Uppercase letter')
      .matches(/(?=.*[0-9])/, 'Must contain at least one Number')
      .matches(
        /(?=.*[@#$%^&+=])/,
        'Must contain at least one Special character'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      "That doesn't match your New Password"
    ),
  });

  function handleSubmit(values: any) {
    const data = {
      name,
      temp_pass,
      new_pass: values.password,
    };

    dispatchAxios(userLostPasswordReset(data)).then((status: IAxiosReturn) => {
      if (!status.success) {
        setApiError(['Password reset request failed, please try again later.']);
        return;
      }
    });
  }

  if (success) {
    return (
      <div className="flex flex-col justify-start py-12 px-4 bg-white">
        <div className="mx-auto max-w-lg">
          <div className="space-y-6">
            <h1 className="text-2xl leading-8 font-bold">Password Changed</h1>
            <p className="text-lg leading-6 font-normal">
              We have updated your password. You may now use it to log in to
              your account.
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
        const errorCount = Object.keys(errors).length + apiError.length;
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
          <div className="flex flex-col justify-start py-12 px-4 bg-white">
            <div className="mx-auto max-w-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <h1 className="text-2xl leading-8 font-bold">Reset Password</h1>
                <p className="text-lg leading-6 font-normal">
                  Choose a new password for your account.
                </p>

                <div className="mt-1">
                  <label
                    htmlFor="password"
                    className={'block text-sm font-medium text-gray-700'}
                  >
                    New Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
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
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
