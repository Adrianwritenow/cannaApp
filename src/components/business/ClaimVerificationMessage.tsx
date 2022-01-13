import { useEffect } from 'react';
import { ClaimState } from '@/interfaces/claim';
import { createClaim } from '@/actions/business';
import { persistState } from 'src/helpers/persist-state';
import { useAxios } from '@/hooks/useAxios';

export function ClaimVerificationMessage({ state }: { state: ClaimState }) {
  const [dispatchClaim, { loading }] = useAxios();

  function handleRecreateClaim() {
    // Make sure the request isn't already loading for some reason.
    if (loading) {
      return;
    }

    // This shouldn't ever happen but check anyway.
    if (!state.business?.id) {
      return;
    }

    // Load business and then proceed to the next step.
    dispatchClaim(createClaim(state.business.id)).then(
      (status: IAxiosReturn) => {
        if (!status.success) {
          // @TODO: Handle error.
          return;
        }

        persistState('businessClaim', state);
      }
    );
  }

  // Run once on load.
  useEffect(() => {
    handleRecreateClaim();
  }, []);

  return (
    <>
      <h1 className="text-4xl leading-10 font-extrabold pb-3">
        Verification Sent
      </h1>
      <p className="text-lg leading-6 font-medium pb-5">
        A verification email has been sent to the email on record for the
        business.
      </p>
      <p className="text-lg leading-6 font-medium pb-5">
        Click the link in the email to verify ownership and save any changes
        you've made to the business listing.
      </p>

      <button
        onClick={handleRecreateClaim}
        className="w-full bg-white text-green hover:bg-green-600 hover:text-white flex justify-center py-2 px-4 border border-green rounded-md shadow-sm text-base leading-6 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Resend verification email
      </button>
    </>
  );
}
