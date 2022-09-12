import posthog from "posthog-js";

function initiatePostHog () {
  //eslint-disable-next-line
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_ID as string, { api_host: "https://app.posthog.com" });
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