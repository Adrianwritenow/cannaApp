import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Footer from "../src/components/footer/Footer";
import { Navigation } from "../src/components/layouts/Navigation";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (
    !router.pathname.startsWith("/login") &&
    !router.pathname.startsWith("/register")
  ) {
    return (
      <>
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}
export default MyApp;
