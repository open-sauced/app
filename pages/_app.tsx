//Idea came from this repo: https://github.com/brookslybrand/next-nested-layouts

import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import GlobalState from "../context/global-state";
import { useRouter } from "next/router";
import changeCapitalization from "../lib/utils/change-capitalization";
import { supabase } from "../lib/utils/supabase";
import { SWRConfig } from "swr";
import apiFetcher from "../lib/hooks/useSWR";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const router = useRouter();

  const { filterName, toolName } = router.query;

  supabase.auth.onAuthStateChange((event, session) => {
    fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session })
    });
  });

  return (
    <>
      <Head>
        <title>Open Sauced Insights{filterName && ` - ${changeCapitalization(filterName.toString(), true)}`} {toolName && ` / ${changeCapitalization(toolName.toString(), true)}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: apiFetcher,
        }}
      >
        <GlobalState>
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </GlobalState>
      </SWRConfig>
    </>
  );

}

export default MyApp;
