import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { CheckIcon } from '@heroicons/react/solid';
import ErrorsDisplay from '../../error/ErrorsDisplay';
import { InputField } from '../fields/InputField';
import { RootState } from '../../../reducers';
import { XIcon } from '@heroicons/react/outline';
import { updateUser } from '../../../actions/user';
import { useAxios } from '../../../hooks/useAxios';
import { useSelector } from 'react-redux';

export default function AccountSettingsForm() {
  const [dispatchAxios, { loading, error, success }] = useAxios();
  const { currentUser } = useSelector((root: RootState) => root.user);
  const [apiError, setApiError] = useState('');
  const [status, setStatus] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: '',
    mail: '',
    password: '',
  });

  const schema = Yup.object().shape({
    name: Yup.string(),
    mail: Yup.string(),
    password: Yup.string().required(),
  });

  useEffect(() => {
    const isEmpty = Object.values(initialValues).every(
      x => x === null || x === ''
    );
    if (isEmpty) {
      setInitialValues({
        name: currentUser.name[0]?.value || '',
        mail: currentUser.mail[0]?.value || '',
        password: '',
      });
    }

    if (error) {
      setApiError(error.response.data);
    }
  }, [initialValues, currentUser, apiError, error, status]);

  async function handleSubmit(values: any) {
    setApiError('');
    dispatchAxios(updateUser(currentUser.uid[0].value, values));

    setStatus(true);
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
      {({ values, handleBlur, handleChange, setFieldValue, errors }) => {
        const errorCount = Object.keys(errors).length;
        const errorList = Object.values(errors).map((error, i) => (
          <li className="text-red-700 font-normal" key={i}>
            {error}
          </li>
        ));
        return (
          <Form className="bg-white shadow">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 py-6 px-4 sm:px-6 desktop:py-12 desktop:px-8">
              <div className="sm:col-span-6">
                <p className="text-sm text-gray-500">
                  You can update your e-mail. You must use your current password
                  to save any changes.
                </p>
              </div>
              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="User Name"
                    id="name"
                    name="name"
                    type="text"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Field
                    label="E-mail"
                    id="mail"
                    name="mail"
                    type="mail"
                    component={InputField}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-1 flex rounded-md shadow-sm w-full">
                  <Field
                    label="Current Password *"
                    id="password"
                    name="password"
                    type="password"
                    component={InputField}
                  />
                </div>
              </div>
            </div>
            {errorCount || apiError ? (
              <div className="px-4">
                <ErrorsDisplay
                  apiError={apiError}
                  errorCount={errorCount}
                  errorList={errorList}
                />
              </div>
            ) : (
              ''
            )}
            <div className=" bg-gray-50  py-3 flex justify-end pr-4">
              {(error || success || errorCount) && status ? (
                <>
                  {(error || errorCount) && (
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        setStatus(false);
                      }}
                      className="w-16 rounded-full text-red-500 border border-red-500 flex items-center justify-center p-2"
                    >
                      <XIcon className="w-5 h-5 " />
                    </button>
                  )}
                  {success && (
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        setStatus(false);
                      }}
                      className="w-16 rounded-full text-green-300 border border-green-300 flex items-center justify-center p-2"
                    >
                      <CheckIcon className="w-5 h-5 " />
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                >
                  Save
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
