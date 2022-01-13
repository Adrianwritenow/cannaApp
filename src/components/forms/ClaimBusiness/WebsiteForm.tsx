import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { InputField } from '@/components/forms/fields/InputField';
import { website } from '@/helpers/validation';

export function WebsiteForm({
  state,
  submitChildForm,
}: {
  state: ClaimState;
  submitChildForm: (key: string, value: any) => void;
}) {
  const schema = Yup.object().shape({
    website: Yup.string().matches(website, 'Website URL is not valid'),
  });

  function handleSubmit(values: any) {
    submitChildForm('website', values.website);
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={state}
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
              What’s your business website?
            </h1>
            <p className="text-lg leading-6 font-normal">
              Provide a web address for your customers to find more information
              about your business
            </p>

            <div className="mt-1">
              <Field
                placeholder="www.example.com"
                id="website"
                name="website"
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

            <div className="flex">
              <button
                type="submit"
                className="bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Next
              </button>
              <button
                type="submit"
                className="bg-white text-green flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                I don’t have a website
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
