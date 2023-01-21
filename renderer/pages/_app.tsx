import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Head from "next/head";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        // router.push("/home");
      }
    });
  }, []);
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
