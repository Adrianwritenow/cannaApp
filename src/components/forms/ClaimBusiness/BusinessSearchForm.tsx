import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { AutoCompleteInput } from '@/components/forms/fields/AutoCompleteInput';
import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { getClaimBusiness, getBusinessAutocomplete } from '@/actions/business';
import { IAxiosReturn } from '@/interface/axios';
import { RootState } from '@/reducers';
import { useAxios } from '@/hooks/useAxios';

export function BusinessSearchForm({
  state,
  submitChildForm,
}: {
  state: ClaimState;
  submitChildForm: (key: string, value: any) => void;
}) {
  const [businessId, setBusinessId] = useState<number>(0);
  const { businesses } = useSelector((root: RootState) => root.autocomplete);
  const [dispatchAutocomplete] = useAxios();
  const [dispatchBusiness] = useAxios();
  const initialValues = {
    business: state.business.label,
  };

  const schema = Yup.object().shape({
    business: Yup.string().required('Business name is required'),
  });

  function handleBusinessAutocomplete(value: any) {
    dispatchAutocomplete(getBusinessAutocomplete(value));
  }

  function handleSubmit(values: any) {
    if (!businessId) {
      // TODO: handle error.
      return;
    }

    // Load business and then proceed to the next step.
    dispatchBusiness(getClaimBusiness(businessId)).then(
      (status: IAxiosReturn) => {
        if (!status.success) {
          // @TODO: Handle error.
          return;
        }

        submitChildForm('business', {
          id: businessId,
          name: values.business,
        });
      }
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
                onHandleSelect={setBusinessId}
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
