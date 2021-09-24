import "../src/styles/main.scss";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import Footer from "../src/components/footer/Footer";
import Head from "next/head";
import Header from "../src/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <div className="bg-white">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
export default MyApp;
