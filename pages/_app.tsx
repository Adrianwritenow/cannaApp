import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../src/authentication/authContext";
import Footer from "../src/components/footer/Footer";
import { Navigation } from "../src/components/layouts/Navigation";
import PrivateRoute from "../src/components/PrivateRoute";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../src/store";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        {!router.pathname.startsWith("/login") &&
        !router.pathname.startsWith("/register") ? (
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
      </AuthContextProvider>
    </Provider>
  );
}
