import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useSession } from 'next-auth/react';

import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { getInitialState } from 'src/helpers/persist-state';
import { IAxiosReturn } from '@/interfaces/axios';
import { useAxios } from '@/hooks/useAxios';
import { updateBusiness, verifyClaim } from '@/actions/business';

const initialState = {
  complete: false,
  failed: false,
  error: '',
};

function transformClaimForDrupal(claim: ClaimState): any {
  return {
    field_phone_number: claim.phone,
    field_website: [
      {
        uri: claim.website,
      },
    ],
    // field_categories: claim.categories,
    field_address: [
      {
        address_line1: claim.address.line1,
        locality: claim.address.city,
        administrative_area: claim.address.state,
        postal_code: claim.address.zip,
        country_code: claim.address.country,
      },
    ],
  };
}

function Wrapper({ children }: { children: any }) {
  return (
    <div className="flex flex-col justify-start py-12 px-4 bg-white">
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  );
}

export default function Verify() {
  const { query } = useRouter();
  const { width, height } = useWindowSize();
  const [dispatchClaim] = useAxios();
  const [dispatchUpdate] = useAxios();
  const { data: session, status } = useSession();
  const [state, setState] = useState(initialState);
  const claimState: ClaimState | undefined = getInitialState('businessClaim');
  const loggedInMessage = 'You need to be logged in to complete verification';

  useEffect(() => {
    // Bail out if already completed or session is not ready yet.
    if (state.complete || typeof session === 'undefined') {
      return;
    }

    // Session is null when it's been loaded but the user isn't logged in.
    if (session === null) {
      setState({
        complete: true,
        failed: true,
        error: loggedInMessage,
      });
      return;
    }

    const { id, timestamp, hash } = query;
    if (id && timestamp && hash) {
      dispatchClaim(verifyClaim(id, timestamp, hash)).then(
        (status: IAxiosReturn) => {
          const finishedState = {
            complete: true,
            failed: false,
            error: '',
          };

          if (!status.success) {
            finishedState.failed = true;

            const errorResponse = status.error.response || {};
            const errorMessage = errorResponse?.data?.message || '';
            if (errorResponse.status === 403) {
              finishedState.error = loggedInMessage;
            } else {
              finishedState.error = errorMessage;
            }
          }

          // If there's a valid claim and verification succeeded, update the
          // business with any changes the user made before verification.
          if (status.success && claimState && claimState.business?.id == id) {
            dispatchUpdate(
              updateBusiness(id, transformClaimForDrupal(claimState))
            );
          }

          setState(finishedState);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, query, session]);

  // Still running, let the user know.
  if (!state.complete) {
    return <Wrapper>Verifying, please wait...</Wrapper>;
  }

  // Failed.
  if (state.failed) {
    return (
      <Wrapper>
        <p>Verification failed:</p>
        <ErrorsDisplay apiError={state.error} errorCount={0} errorList={[]} />
      </Wrapper>
    );
  }

  // Completed successfully.
  const businessName = claimState?.business?.name || 'a dispensary';
  return (
    <Wrapper>
      <h1 className="text-4xl leading-10 font-extrabold pb-3">
        Congrats, CANNACADET
      </h1>
      <p className="text-lg leading-6 font-medium pb-5">
        You’ve successfully claimed {businessName}!
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
    </Wrapper>
  );
}
