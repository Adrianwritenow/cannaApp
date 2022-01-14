import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';

import { Steps } from '@/components/forms/ClaimBusiness';
import { BusinessState } from '@/interfaces/business';
import { ClaimVerificationMessage } from '@/components/business/ClaimVerificationMessage';
import { ClaimState } from '@/interfaces/claim';
import { updateBusinessClaim } from '@/actions/business';
import { RootState } from '@/reducers';

export default function ClaimDetail() {
  const dispatch = useDispatch();
  const { claim } = useSelector(
    (root: RootState): BusinessState => root.business
  );

  const handleGoBack = (step: string) => {
    return () => {
      dispatch(
        updateBusinessClaim({
          ...claim,
          step,
        })
      );
    };
  };

  const handleSubmitChildForm = (step: string) => {
    return (key: string, value: any) => {
      dispatch(
        updateBusinessClaim({
          ...claim,
          step,
          [key]: value,
        })
      );
    };
  };

  let stepComponent;
  let backAction;

  switch (claim.step) {
    case 'address':
      backAction = handleGoBack('categories');
      stepComponent = (
        <Steps.Address
          state={claim}
          submitChildForm={handleSubmitChildForm('verify')}
        />
      );
      break;

    case 'business':
      backAction = null;
      stepComponent = (
        <Steps.Business
          state={claim}
          submitChildForm={handleSubmitChildForm('phone')}
        />
      );
      break;

    case 'phone':
      backAction = handleGoBack('business');
      stepComponent = (
        <Steps.Phone
          state={claim}
          submitChildForm={handleSubmitChildForm('website')}
        />
      );
      break;

    case 'website':
      backAction = handleGoBack('phone');
      stepComponent = (
        <Steps.Website
          state={claim}
          submitChildForm={handleSubmitChildForm('categories')}
        />
      );
      break;

    case 'categories':
      backAction = handleGoBack('website');
      stepComponent = (
        <Steps.Categories
          state={claim}
          submitChildForm={handleSubmitChildForm('address')}
        />
      );
      break;

    case 'verify':
      backAction = null;
      stepComponent = <ClaimVerificationMessage state={claim} />;
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
