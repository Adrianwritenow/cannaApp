import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../stores/authContext";
import Footer from "../src/components/footer/Footer";
import { Navigation } from "../src/components/layouts/Navigation";
import React from "react";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}
