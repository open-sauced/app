import posthog from "posthog-js";

//Mission Start!

function initiatePostHog () {
  posthog.init(import.meta.env.VITE_POSTHOG_ID, { api_host: "https://app.posthog.com" });
}

function capturePostHogAnayltics (
  analyticsTitle: string,
  analyticsProperty: string,
  analyticsValue: string
) {
  const analyticsObject: Record<string, string> = {};

  analyticsObject[analyticsProperty] = analyticsValue;

  posthog.capture(analyticsTitle, analyticsObject);
}

export {
  initiatePostHog,
  capturePostHogAnayltics
};