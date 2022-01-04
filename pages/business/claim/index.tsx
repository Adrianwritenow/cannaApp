import { ArrowLeftIcon } from '@heroicons/react/solid';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

import { Steps } from '@/components/forms/ClaimBusiness';
import { ClaimState } from '@/interfaces/claim';

const defaultState: ClaimState = {
  step: 'business',
  business: '',
  phone: '',
  website: '',
  categories: '',
  address: {
    line1: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
};

export default function ClaimDetail() {
  const [state, setState] = useState<ClaimState>(defaultState);
  const { width, height } = useWindowSize();

  const handleGoBack = (step: string) => {
    return () => {
      setState({
        ...state,
        step,
      });
    };
  };

  const handleSubmitChildForm = (step: string) => {
    return (key: string, value: any) => {
      setState({
        ...state,
        step,
        [key]: value,
      });
    };
  };

  let stepComponent;
  let backAction;

  switch (state.step) {
    case 'address':
      backAction = handleGoBack('categories');
      stepComponent = (
        <Steps.Address
          state={state}
          submitChildForm={handleSubmitChildForm('complete')}
        />
      );
      break;

    case 'business':
      backAction = null;
      stepComponent = (
        <Steps.Business
          state={state}
          submitChildForm={handleSubmitChildForm('phone')}
        />
      );
      break;

    case 'phone':
      backAction = handleGoBack('business');
      stepComponent = (
        <Steps.Phone
          state={state}
          submitChildForm={handleSubmitChildForm('website')}
        />
      );
      break;

    case 'website':
      backAction = handleGoBack('phone');
      stepComponent = (
        <Steps.Website
          state={state}
          submitChildForm={handleSubmitChildForm('categories')}
        />
      );
      break;

    case 'categories':
      backAction = handleGoBack('website');
      stepComponent = (
        <Steps.Categories
          state={state}
          submitChildForm={handleSubmitChildForm('address')}
        />
      );
      break;

    case 'complete':
      backAction = null;
      stepComponent = (
        <>
          <h1 className="text-4xl leading-10 font-extrabold pb-3">
            Congrats, CANNACADET
          </h1>
          <p className="text-lg leading-6 font-medium pb-5">
            You’ve successfully claimed {state.business}!
          </p>
          <p className="text-lg leading-6 font-medium pb-5">
            Why not go ahead and make sure your listing info is up-to-date?
          </p>

          <button className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base leading-6 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3">
            Manage My Listing
          </button>
          <button className="w-full bg-white text-green hover:bg-green-600 hover:text-white flex justify-center py-2 px-4 border border-green rounded-md shadow-sm text-base leading-6 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2">
            Back to CANNAPAGES
          </button>
          {typeof window !== 'undefined' && (
            <Confetti width={width} height={height} />
          )}
        </>
      );
      break;

    default:
      stepComponent = <div>Something has gone wrong</div>;
  }

  return (
    <div className="flex flex-col justify-start py-12 px-4 bg-white">
      <div className="mx-auto max-w-lg">
        {backAction && (
          <button
            onClick={backAction}
            className="inline-block text-lg leading-6 font-semibold text-gray-700 pb-8"
          >
            <ArrowLeftIcon className="h-6 inline pr-5" />
            Back
          </button>
        )}
        {stepComponent}
      </div>
    </div>
  );
}
