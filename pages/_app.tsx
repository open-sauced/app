//Idea came from this repo: https://github.com/brookslybrand/next-nested-layouts

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { SWRConfig } from "swr";
import posthog from "posthog-js";

import { TipProvider } from "components/atoms/Tooltip/tooltip";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { initiateAnalytics } from "lib/utils/analytics";
import { supabase } from "lib/utils/supabase";

import SEO from "layouts/SEO/SEO";
import { Toaster } from "components/molecules/Toaster/toaster";
import Script from "next/script";
import useSession from "lib/hooks/useSession";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID || "", {
    api_host: "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    }
  });
}

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
    SEO?: SEOobject;
    updateSEO?: (SEO: SEOobject) => void;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  useSession(true);
  const router = useRouter();
  const [seo, updateSEO] = useState<SEOobject>(Component.SEO || {});
  Component.updateSEO = updateSEO;

  useEffect(() => {
    updateSEO(Component.SEO || {});
  }, [Component]);

  // From documentation on using Posthog with Next.js: https://posthog.com/docs/integrate/third-party/next-js
  useEffect(() => {
    initiateAnalytics();

    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const { filterName, toolName } = router.query;

  function localStorageProvider() {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");

      // When initializing, we restore the data from `localStorage` into a map.
      const map: Map<string, string> = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

      // Before unloading the app, we write back all the data into `localStorage`.
      window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        try {
          localStorage.setItem("app-cache", appCache);
        } catch (error) {
          if (error instanceof Error && error.name === "QuotaExceededError")
            return console.warn("⚠ local storage limit exceeded ⚠");

          throw error;
        }
      });

      // We still use the map for write & read for performance.
      return map;
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage

      return new Map();
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SEO {...seo} />

      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
          fetcher: publicApiFetcher,
          provider: localStorageProvider,
        }}
      >
        {/* <Toaster position="top-center" /> */}
        <Toaster />
        <PostHogProvider client={posthog}>
          <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <TipProvider>
              {Component.PageLayout ? (
                <Component.PageLayout>
                  <Component {...pageProps} />
                </Component.PageLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </TipProvider>
            <Script id="siteGPT" type="text/javascript">
              {"d=document;s=d.createElement(\"script\");s.src=\"https://sitegpt.ai/widget/365440930125185604.js\";s.async=1;d.getElementsByTagName(\"head\")[0].appendChild(s);"}
            </Script>
          </SessionContextProvider>
        </PostHogProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
