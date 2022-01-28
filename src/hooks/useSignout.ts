import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { useAxios } from '@/hooks/useAxios';
import { userLogout } from '@/actions/user';

export function useSignout() {
  const [dispatchAxios, { loading }] = useAxios();
  const { data: session } = useSession();

  const logout = (): void => {
    const provider = session?.provider;

    // Destroy token server-side if logged in via credentials.
    if (provider === 'social_auth_credentials' && !loading) {
      dispatchAxios(userLogout());
    }

    signOut();
  };

  return logout;
}
