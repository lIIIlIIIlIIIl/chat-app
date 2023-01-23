import React, { useEffect } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Head from "next/head";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        router.push("/home");
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>채팅 프로그램</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
