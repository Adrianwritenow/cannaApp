import '../src/styles/main.scss';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Footer from '../src/components/footer/Footer';
import { Navigation } from '../src/components/layouts/Navigation';
import PrivateRoute from '../src/components/PrivateRoute';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../src/store';
import CookieDisclaimer from '../src/components/cookieConsent';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {!router.pathname.startsWith('/login') &&
        !router.pathname.startsWith('/register') ? (
          <>
            <Navigation>
              <PrivateRoute>
                <Component {...pageProps} />
              </PrivateRoute>
            </Navigation>
            <div className="pb-6">
              <Footer />
            </div>
          </>
        ) : (
          <>
            <Component {...pageProps} />
            <Footer />
          </>
        )}
        <CookieDisclaimer />
      </Provider>
    </SessionProvider>
  );
}
