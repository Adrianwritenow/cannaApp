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
        <div className="pb-6">
          <Footer />
        </div>
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
