import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../stores/authContext";
import Footer from "../src/components/footer/Footer";
import { Navigation } from "../src/components/layouts/Navigation";
import { Provider } from "next-auth/client";
import { useState } from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      {!router.pathname.startsWith("/login") &&
      !router.pathname.startsWith("/register") ? (
        <>
          <Navigation>
            <Component {...pageProps} />
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
    </Provider>
  );
}
