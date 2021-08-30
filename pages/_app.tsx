import "../src/scss/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="bg-gray-100">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
export default MyApp;
