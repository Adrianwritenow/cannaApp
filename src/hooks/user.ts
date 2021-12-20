import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { RootState } from '@/reducers';
import { getCurrentUser } from '@/actions/user';
import { useAxios } from '@/hooks/useAxios';
import { useSelector } from 'react-redux';

export function useCurrentUser(hydrate: boolean = false) {
  const [dispatchAxios, { loading }] = useAxios();
  const { currentUser } = useSelector((root: RootState) => root.user);
  const { data: session } = useSession();

  useEffect(() => {
    if (hydrate && !loading && session?.accessToken) {
      const userData = session?.user;
      // API logins will have uid but facebook/google/etc will not.
      if (userData.uid) {
        dispatchAxios(getCurrentUser(userData.uid));
      } else {
        dispatchAxios(getCurrentUser('me'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return [currentUser, loading];
}
