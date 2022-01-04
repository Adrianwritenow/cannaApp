import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { useSelector } from 'react-redux';

import { AutoCompleteInput } from '@/components/forms/fields/AutoCompleteInput';
import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { getBusinessAutocomplete } from '@/actions/business';
import { RootState } from '@/reducers';
import { useAxios } from '@/hooks/useAxios';

export function BusinessSearchForm({
  state,
  submitChildForm,
}: {
  state: ClaimState;
  submitChildForm: (key: string, value: any) => void;
}) {
  const { businesses } = useSelector((root: RootState) => root.autocomplete);
  const [dispatchAutocomplete] = useAxios();

  const schema = Yup.object().shape({
    business: Yup.string().required('Business name is required'),
  });

  function handleBusinessAutocomplete(value: any) {
    dispatchAutocomplete(getBusinessAutocomplete(value));
  }

  function handleSubmit(values: any) {
    // @TODO: We might need the business ID eventually. The autocomplete item
    // will need to pass that back here, probably via a passed in prop method
    // that leverages useState from this component.
    submitChildForm('business', values.business);
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
              What’s the name of your business?
            </h1>
            <p className="text-lg leading-6 font-normal">
              To find and manage your business, type in the name of your
              business below. Your business will appear if it is already listed.
            </p>

            <div className="mt-1">
              <Field
                type="text"
                id="business"
                name="business"
                options={businesses}
                placeholder="Your Business Name"
                onRequestOptions={handleBusinessAutocomplete}
                component={AutoCompleteInput}
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
