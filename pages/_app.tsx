import '@/styles/main.scss';
import 'tailwindcss/tailwind.css';
import '@/styles/geocode.scss';

import type { AppProps } from 'next/app';
import CookieDisclaimer from '@/components/cookieConsent';
import Footer from '@/components/footer/Footer';
import { Navigation } from '@/components/layouts/Navigation';
import { NextQueryParamProvider } from 'next-query-params';
import PrivateRoute from '@/components/PrivateRoute';
import { Provider } from 'react-redux';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/store';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextQueryParamProvider>
        <Provider store={store}>
          {!router.pathname.startsWith('/login') &&
          !router.pathname.startsWith('/register') ? (
            <>
              <Navigation>
                <PrivateRoute>
                  <div className="">
                    <Component {...pageProps} />
                  </div>
                </PrivateRoute>
              </Navigation>
              <div className="pb-6 print:hidden">
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
      </NextQueryParamProvider>
    </SessionProvider>
  );
}
