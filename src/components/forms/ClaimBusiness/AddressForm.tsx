import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { InputField } from '@/components/forms/fields/InputField';

export function AddressForm({
  state,
  submitChildForm,
}: {
  state: ClaimState;
  submitChildForm: (key: string, value: any) => void;
}) {
  const schema = Yup.object().shape({
    line1: Yup.string().required('Address line one is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    country: Yup.string().required('Address line one is required'),
  });

  function handleSubmit(values: any) {
    submitChildForm('address', values);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={state.address}
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl leading-8 font-bold">
              What is your business address?
            </h1>
            <p className="text-lg leading-6 font-normal">
              Enter the address for where your customers can find you. To make
              sure we can verify your address, provide an address that customers
              can visit.
            </p>

            <div className="mt-1">
              <Field
                placeholder="Address"
                id="line1"
                name="line1"
                type="text"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                placeholder="City"
                id="city"
                name="city"
                type="text"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                placeholder="State / Province / Region"
                id="state"
                name="state"
                type="text"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                placeholder="Zip / Postal Code"
                id="zip"
                name="zip"
                type="text"
                component={InputField}
              />
            </div>

            <div className="mt-1">
              <Field
                placeholder="Country"
                id="country"
                name="country"
                type="text"
                component={InputField}
              />
            </div>

            {errorCount > 0 && (
              <ErrorsDisplay
                errorCount={errorCount}
                errorList={errorList}
                apiError={''}
              />
            )}

            <button
              type="submit"
              className="bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Next
            </button>
          </form>
        );
      }}
    </Formik>
  );
}
