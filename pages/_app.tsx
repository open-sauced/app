//Idea came from this repo: https://github.com/brookslybrand/next-nested-layouts

import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import GlobalState from "../context/global-state";
import "./nav.css";
import useGetFilterName from "../lib/hooks/useGetFilterName";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const filterName = useGetFilterName();

  return (
    <>
      <Head>
        <title>Open Sauced Insights - {filterName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <GlobalState>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </GlobalState>
    </>
  );
  
}

export default MyApp;
