//Idea came from this repo: https://github.com/brookslybrand/next-nested-layouts

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { SWRConfig } from "swr";
import NextNProgress from "nextjs-progressbar";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Faro, FaroErrorBoundary, withFaroProfiler } from "@grafana/faro-react";
import { TipProvider } from "components/atoms/Tooltip/tooltip";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { initiateAnalytics } from "lib/utils/analytics";
import { supabase } from "lib/utils/supabase";

import SEO from "layouts/SEO/SEO";
import { Toaster } from "components/molecules/Toaster/toaster";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import useSession from "lib/hooks/useSession";

import { FeatureFlag } from "lib/utils/server/feature-flags";
import { APP_CACHE_KEY } from "lib/utils/caching";
import { initGrafanaFaro } from "lib/utils/grafana";
import type { AppProps } from "next/app";

// Clear any service workers present
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      if (registration.active) {
        // eslint-disable-next-line no-console
        console.log(`Clearing service worker ${registration.scope}`);
        registration.unregister();
        document.location.reload();
      }
    }
  });
}

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID || "", {
    api_host: "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
    SEO?: SEOobject;
    updateSEO?: (SEO: SEOobject) => void;
  };
  pageProps: AppProps["pageProps"] & { featureFlags: Record<FeatureFlag, boolean> };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const faroRef = useRef<null | Faro>(null);

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL &&
      process.env.NEXT_PUBLIC_FARO_APP_ENVIRONMENT != "local" &&
      !faroRef.current
    ) {
      faroRef.current = initGrafanaFaro();
    }
  }, []);

  useSession(true);
  const router = useRouter();
  const [seo, updateSEO] = useState<SEOobject>(Component.SEO || {});
  const isMobile = useMediaQuery("(max-width: 640px)");
  Component.updateSEO = updateSEO;
  const [supabaseClient] = useState(() => supabase);

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
      // eslint-disable-next-line no-console
      console.log("You are on the browser");

      // When initializing, we restore the data from `localStorage` into a map.
      const map: Map<string, string> = new Map(JSON.parse(localStorage.getItem(APP_CACHE_KEY) || "[]"));

      // Before unloading the app, we write back all the data into `localStorage`.
      window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        try {
          localStorage.setItem(APP_CACHE_KEY, appCache);
        } catch (error) {
          if (error instanceof Error && error.name === "QuotaExceededError")
            // eslint-disable-next-line no-console
            return console.warn("⚠ local storage limit exceeded ⚠");

          throw error;
        }
      });

      // We still use the map for write & read for performance.
      return map;
    } else {
      // eslint-disable-next-line no-console
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
        <NextNProgress options={{ showSpinner: false }} color="hsla(19, 100%, 50%, 1)" height={4} />
        <Toaster />
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
          <PostHogProvider client={posthog}>
            <TipProvider>
              <FaroErrorBoundary>
                {Component.PageLayout ? (
                  <Component.PageLayout>
                    <Component {...pageProps} />
                  </Component.PageLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </FaroErrorBoundary>
            </TipProvider>
          </PostHogProvider>
        </SessionContextProvider>
      </SWRConfig>
    </>
  );
}

export default withFaroProfiler(MyApp);
