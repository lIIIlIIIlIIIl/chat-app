import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>채팅 프로그램</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
