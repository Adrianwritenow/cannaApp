import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="bg-white">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
export default MyApp;
