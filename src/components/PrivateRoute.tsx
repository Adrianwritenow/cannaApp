import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function PrivateRoute({ children }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const protectedRoutes = ['/user'];
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (status === 'loading' || !session) {
      return;
    }

    if (!session.accessToken && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push('/');
    }
  }, [session, status, pathIsProtected, router]);

  return children;
}
