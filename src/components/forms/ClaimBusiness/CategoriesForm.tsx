import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { InputField } from '@/components/forms/fields/InputField';

export function CategoriesForm({
  state,
  submitChildForm,
}: {
  state: ClaimState;
  submitChildForm: (key: string, value: any) => void;
}) {
  const schema = Yup.object().shape({
    categories: Yup.string().required('Categories are required'),
  });

  function handleSubmit(values: any) {
    submitChildForm('categories', values.categories);
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
              What kind of business do you run?
            </h1>
            <p className="text-lg leading-6 font-normal">
              Pick what category best describes your product or service to help
              customers find your business.
            </p>

            <div className="mt-1">
              <Field
                placeholder="Business Categories"
                id="categories"
                name="categories"
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
