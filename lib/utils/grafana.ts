import { getWebInstrumentations, initializeFaro, ReactIntegration } from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

// Get the current, runtime version of the App to surface to Faro
import packageJson from "../../package.json";

export const initGrafanaFaro = () => {
  return initializeFaro({
    url: process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL,

    app: {
      name: process.env.NEXT_PUBLIC_FARO_APP_NAME,
      version: packageJson.version,
      environment: process.env.NEXT_PUBLIC_FARO_ENVIRONMENT,
    },

    instrumentations: [
      // load the mandatory web instrumentation
      ...getWebInstrumentations(),

      // add tracing instrumentation which should include the React Profiler
      new TracingInstrumentation(),

      new ReactIntegration({
        // In the future, we may choose to integrate with the router instrumentation to
        // get deeper metrics on matched routes, navigation types, etc.
        // Next/router doesn't seem to be supported which won't give us route metrics.
        //
        // Reference: https://github.com/grafana/faro-web-sdk/tree/main/packages/react
        //
        // router: {}
      }),
    ],
  });
};
