import { signIn, useSession } from 'next-auth/react';
import IconFacebook from '@/public/assets/icons/iconComponents/IconFacebook';
import IconGoogle from '@/public/assets/icons/iconComponents/IconGoogle';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/forms/LoginForm';
import Logo from '@/public/assets/logos/logo.png';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className="flex flex-col justify-start max-w-3xl mx-auto py-12 bg-white px-4">
      <div className="grid grid-cols-6 gap-0">
        <div className="h-12 w-12 relative col-span-1">
          <Link href={'/'} passHref>
            <a>
              <Image
                src={Logo}
                alt="CannaPages"
                layout={'responsive'}
                unoptimized={true}
              />
            </a>
          </Link>
        </div>

        <span className="flex justify-end items-center col-span-5 font-normal text-gray-500">
          No account yet?
          <Link href="/register">
            <a>
              <span className="text-green hover:text-green-700 pl-2 font-medium">
                Sign up
              </span>
            </a>
          </Link>
        </span>
      </div>
      <div className="max-w-md mr-auto">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in</h2>
        <p className="text-base font-normal	text-gray-600 pt-2">
          Log in to your CANNAPAGES account.
        </p>
      </div>

      <div className="pt-8">
        <p className="text-sm font-medium	text-gray-900 py-1">Log in with</p>
        <div className="grid grid-cols-2 gap-3">
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Google</span>
              <button
                onClick={() => signIn('google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green"
              >
                <IconGoogle width={20} height={20} />
              </button>
            </a>
          </Link>
          <Link href="#">
            <a>
              <span className="sr-only">Sign in with Facebook</span>
              <button
                onClick={() => signIn('facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-green focus:border-green"
              >
                <IconFacebook width={20} height={20} />
              </button>
            </a>
          </Link>
        </div>
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
