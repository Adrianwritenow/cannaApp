import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useSession } from 'next-auth/react';

import { ClaimState } from '@/interfaces/claim';
import ErrorsDisplay from '@/components/error/ErrorsDisplay';
import { getInitialState } from 'src/helpers/persist-state';
import { useAxios } from '@/hooks/useAxios';
import { verifyClaim } from '@/actions/business';

function Wrapper({ children }) {
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
  const { data: session, status } = useSession();
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const claimState: ClaimState | undefined = getInitialState('businessClaim');

  // Handle verification once session is ready.
  useEffect(() => {
    if (complete || typeof session === 'undefined') {
      return;
    }

    // @TODO: Combine setStates.
    if (session === null) {
      setComplete(true);
      setFailed(true);
      setErrorMessage('Your need to be logged in to complete verification');
      return;
    }

    const { id, timestamp, hash } = query;
    if (id && timestamp && hash) {
      dispatchClaim(verifyClaim(id, timestamp, hash)).then(
        (status: IAxiosReturn) => {
          setComplete(true);

          if (status.success) {
            return;
          }

          setFailed(true);
          const errorRepsonse = status.error.response || {};
          const errorMessage = errorRepsonse?.data?.message || '';
          if (errorRepsonse.status === 403) {
            setErrorMessage(
              'You need to be logged in to complete verification'
            );
          } else {
            setErrorMessage(errorMessage);
          }
        }
      );
    }
  }, [complete, query, session]);

  if (complete) {
    if (failed) {
      return (
        <Wrapper>
          <p>Verification failed:</p>
          <ErrorsDisplay apiError={errorMessage} errorCount={0} />
        </Wrapper>
      );
    } else {
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
  }

  // If it gets this far the verification is still running.
  return <Wrapper>Verifying, please wait...</Wrapper>;
}
