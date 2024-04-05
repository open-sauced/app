import { getWebInstrumentations, initializeFaro, ReactIntegration } from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export const initGrafanaFaro = () => {
  const faro = initializeFaro({
    url: process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL,

    app: {
      name: process.env.NEXT_PUBLIC_FARO_APP_NAME,
      version: "1.0.0",
      environment: process.env.NEXT_PUBLIC_FARO_ENVIRONMENT,
    },

    instrumentations: [
      // load the mandatory web instrumentation
      ...getWebInstrumentations(),

      // add tracing instrumentation which should include the React Profiler
      new TracingInstrumentation(),

      new ReactIntegration({
        // In the future, we may choose to integrate with the router integration to
        // get deeper metrics on matched routes, navigation types, etc.
        // Reference: https://github.com/grafana/faro-web-sdk/tree/main/packages/react
        // router: {}
      }),
    ],
  });

  return faro;
};
