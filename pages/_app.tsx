//Idea came from this repo: https://github.com/brookslybrand/next-nested-layouts

import '../styles/globals.css'
import type { AppProps } from 'next/app'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<any>;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
  
}

export default MyApp
